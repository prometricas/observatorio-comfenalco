/**
 * excelService — Lectura de las bases de datos en Excel del portal.
 *
 * Orquesta la carga de los .xlsx de cada tendencia desde `public/data/`
 * (la carpeta que el cliente actualiza en su servidor sin recompilar):
 *
 * 1. La interpretación con SheetJS ocurre en un Web Worker (excelWorker):
 *    los archivos son grandes y su lectura puede tardar, pero la interfaz
 *    nunca se congela. El worker normaliza según el tipo de base
 *    ('poblacion' para las pirámides, 'informalidad' para la serie por
 *    ciudad).
 * 2. El resultado compacto se guarda en IndexedDB con la firma del archivo
 *    (tamaño + fecha de modificación). En visitas posteriores basta una
 *    petición HEAD para validar la firma y cargar al instante; si el
 *    cliente reemplaza el Excel, la firma cambia y se reinterpreta.
 * 3. En memoria se cachea una sola promesa por archivo.
 *
 * ⚠️ Regla del proyecto: toda búsqueda de departamentos se hace por código
 * DANE (DP), NUNCA por nombre (DPNOM trae variantes inconsistentes).
 */
import { normalizarNombre } from '../data/departamentos.js';
import { obtenerConfiguracionTendencia } from '../data/tendencias.js';

/** Estados posibles de la base de datos de una tendencia. */
export const ESTADO_PANEL = {
  DISPONIBLE: 'disponible',
  EN_PREPARACION: 'en-preparacion',
};

/* Caché en memoria: URL del Excel → promesa del panel normalizado. */
const cachePaneles = new Map();

/* URL del Excel de una tendencia respetando la base relativa del build. */
const construirUrlExcel = (slugTendencia, nombreArchivo) =>
  `${import.meta.env.BASE_URL}data/tendencias/${slugTendencia}/excel/${nombreArchivo}`;

/* ── Caché persistente (IndexedDB) ───────────────────────────────── */

const NOMBRE_BASE_DATOS = 'observatorio-comfenalco';
/* Nombre heredado de la primera base (0.4.0); hoy este almacén guarda los
   paneles de TODAS las bases ('poblacion', 'informalidad'…), diferenciados
   por el campo `tipo` del registro. Renombrarlo exigiría migrar la base
   local de cada usuario, así que se conserva. */
const ALMACEN_PANELES = 'paneles-poblacion';

/* Abre (o crea) la base local; si IndexedDB falla, la caché se omite. */
function abrirBaseDatos() {
  return new Promise((resolver, rechazar) => {
    const solicitud = indexedDB.open(NOMBRE_BASE_DATOS, 1);
    solicitud.onupgradeneeded = () => {
      solicitud.result.createObjectStore(ALMACEN_PANELES);
    };
    solicitud.onsuccess = () => resolver(solicitud.result);
    solicitud.onerror = () => rechazar(solicitud.error);
  });
}

async function leerRegistroPersistente(url) {
  try {
    const baseDatos = await abrirBaseDatos();
    return await new Promise((resolver) => {
      const transaccion = baseDatos.transaction(ALMACEN_PANELES, 'readonly');
      const solicitud = transaccion.objectStore(ALMACEN_PANELES).get(url);
      solicitud.onsuccess = () => resolver(solicitud.result ?? null);
      solicitud.onerror = () => resolver(null);
    });
  } catch {
    return null;
  }
}

async function guardarRegistroPersistente(url, registro) {
  try {
    const baseDatos = await abrirBaseDatos();
    await new Promise((resolver) => {
      const transaccion = baseDatos.transaction(ALMACEN_PANELES, 'readwrite');
      transaccion.objectStore(ALMACEN_PANELES).put(registro, url);
      transaccion.oncomplete = () => resolver();
      transaccion.onerror = () => resolver();
    });
  } catch {
    /* La caché persistente es opcional: si falla, solo se pierde rapidez. */
  }
}

/* Versión del formato de los registros persistidos: si la estructura
   normalizada cambia entre versiones del portal, los registros con otro
   formato se descartan y el archivo se reinterpreta. */
const FORMATO_REGISTRO = 2;

/* Firma del archivo publicado, para detectar reemplazos del cliente. */
const construirFirma = (respuesta) => {
  const tamano = respuesta.headers.get('content-length') ?? '';
  const modificado = respuesta.headers.get('last-modified') ?? '';
  return tamano || modificado ? `${tamano}|${modificado}` : '';
};

/* ── Interpretación en el Web Worker ─────────────────────────────── */

/* Envía el archivo y su tipo al worker y espera la estructura compacta. */
function interpretarEnWorker(arrayBuffer, tipo) {
  return new Promise((resolver, rechazar) => {
    const worker = new Worker(new URL('./excelWorker.js', import.meta.url), {
      type: 'module',
    });
    worker.onmessage = (evento) => {
      worker.terminate();
      if (evento.data.ok) resolver(evento.data);
      else rechazar(new Error(evento.data.mensaje));
    };
    worker.onerror = (evento) => {
      worker.terminate();
      rechazar(new Error(evento.message ?? 'Fallo del intérprete de Excel'));
    };
    /* El buffer se transfiere (sin copia) al hilo del worker. */
    worker.postMessage({ arrayBuffer, tipo }, [arrayBuffer]);
  });
}

/* ── Carga genérica de un panel ──────────────────────────────────── */

const PANEL_NO_DISPONIBLE = { estado: ESTADO_PANEL.EN_PREPARACION, datos: null };

/**
 * Descarga (o recupera de la caché persistente) y normaliza un panel.
 * Devuelve { estado, datos } con la estructura del tipo pedido.
 */
async function cargarPanelExcel(url, tipo) {
  /* 1. Caché persistente validada con una petición HEAD barata. */
  const registro = await leerRegistroPersistente(url);
  if (
    registro?.firma &&
    registro?.tipo === tipo &&
    registro?.formato === FORMATO_REGISTRO &&
    registro?.datos
  ) {
    try {
      const cabeceras = await fetch(url, { method: 'HEAD' });
      if (cabeceras.ok && construirFirma(cabeceras) === registro.firma) {
        return { estado: ESTADO_PANEL.DISPONIBLE, datos: registro.datos };
      }
    } catch {
      /* Sin red para validar: se sigue con la descarga completa. */
    }
  }

  /* 2. Descarga completa del archivo. */
  const respuesta = await fetch(url);
  const tipoContenido = respuesta.headers.get('content-type') ?? '';

  if (respuesta.status === 404 || tipoContenido.includes('text/html')) {
    return PANEL_NO_DISPONIBLE;
  }
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió ${respuesta.status} al pedir ${url}`);
  }

  const firma = construirFirma(respuesta);
  const arrayBuffer = await respuesta.arrayBuffer();

  /* 3. Interpretación en el worker (la interfaz sigue respondiendo). */
  const resultado = await interpretarEnWorker(arrayBuffer, tipo);
  if (!resultado.disponible) {
    return PANEL_NO_DISPONIBLE;
  }

  /* 4. Se persiste el resultado compacto para las próximas visitas. */
  if (firma) {
    await guardarRegistroPersistente(url, {
      firma,
      tipo,
      formato: FORMATO_REGISTRO,
      datos: resultado.datos,
    });
  }

  return { estado: ESTADO_PANEL.DISPONIBLE, datos: resultado.datos };
}

/* Una sola promesa por archivo; los fallos no se conservan en caché. */
function obtenerPanel(url, tipo, construirPanel) {
  if (!cachePaneles.has(url)) {
    const promesa = cargarPanelExcel(url, tipo).then((resultado) =>
      resultado.estado === ESTADO_PANEL.DISPONIBLE
        ? construirPanel(resultado.datos)
        : { ...construirPanel(null), estado: ESTADO_PANEL.EN_PREPARACION },
    );
    cachePaneles.set(url, promesa);

    promesa
      .then((panel) => {
        if (panel.estado !== ESTADO_PANEL.DISPONIBLE) cachePaneles.delete(url);
      })
      .catch(() => cachePaneles.delete(url));
  }

  return cachePaneles.get(url);
}

/* ── Paneles públicos por tipo de base ───────────────────────────── */

/**
 * Panel de población de una tendencia (pirámides por departamento y año).
 * @param {string} slugTendencia p. ej. 'envejecimiento'
 */
export function obtenerPanelPoblacion(slugTendencia) {
  const config = obtenerConfiguracionTendencia(slugTendencia);
  const url = construirUrlExcel(slugTendencia, config.archivoExcel);

  return obtenerPanel(url, 'poblacion', (datos) => ({
    estado: ESTADO_PANEL.DISPONIBLE,
    /** Años disponibles en el Excel, ordenados (detectados dinámicamente). */
    anios: datos?.anios ?? [],
    /** Fila de población de un departamento y año, o null si no existe. */
    obtenerFila: (codigoDane, anio) =>
      datos?.filas.get(`${Number(codigoDane)}-${Number(anio)}`) ?? null,
  }));
}

/**
 * Panel de informalidad de una tendencia (serie histórica + proyección
 * por ciudad, con intervalos de confianza del 95 %).
 * @param {string} slugTendencia p. ej. 'informalidad-laboral'
 */
export function obtenerPanelInformalidad(slugTendencia) {
  const config = obtenerConfiguracionTendencia(slugTendencia);
  const url = construirUrlExcel(slugTendencia, config.archivoExcel);

  return obtenerPanel(url, 'informalidad', (datos) => ({
    estado: ESTADO_PANEL.DISPONIBLE,
    /** Años del histórico, dato parcial y proyección de la base. */
    anios: datos?.anios ?? null,
    /** Nombres de las ciudades presentes en la base, en orden alfabético. */
    ciudades: datos
      ? [...datos.ciudades.values()]
          .map((ciudad) => ciudad.nombre)
          .sort((a, b) => a.localeCompare(b, 'es'))
      : [],
    /** Serie completa de una ciudad, o null si no está en la base. La
        búsqueda ignora tildes y signos (el Excel puede traer variantes). */
    obtenerCiudad: (nombreCiudad) =>
      datos?.ciudades.get(normalizarNombre(nombreCiudad)) ?? null,
  }));
}
