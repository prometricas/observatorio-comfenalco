/**
 * excelService — Lectura de la base de población en Excel (.xlsx).
 *
 * Orquesta la carga del `base-poblacion.xlsx` de cada tendencia desde
 * `public/data/` (la carpeta que el cliente actualiza en su servidor sin
 * recompilar):
 *
 * 1. La interpretación con SheetJS ocurre en un Web Worker (excelWorker):
 *    el archivo es grande y su lectura tarda decenas de segundos, pero la
 *    interfaz nunca se congela.
 * 2. El resultado compacto se guarda en IndexedDB con la firma del archivo
 *    (tamaño + fecha de modificación). En visitas posteriores basta una
 *    petición HEAD para validar la firma y cargar al instante; si el
 *    cliente reemplaza el Excel, la firma cambia y se reinterpreta.
 * 3. En memoria se cachea una sola promesa por tendencia.
 *
 * ⚠️ Regla del proyecto: toda búsqueda se hace por código DANE (DP),
 * NUNCA por nombre (DPNOM trae variantes inconsistentes).
 */

/** Estados posibles de la base de datos de una tendencia. */
export const ESTADO_PANEL = {
  DISPONIBLE: 'disponible',
  EN_PREPARACION: 'en-preparacion',
};

/* Caché en memoria: URL del Excel → promesa del panel normalizado. */
const cachePaneles = new Map();

/* URL del Excel respetando la base relativa del build (`base: './'`). */
const construirUrlExcel = (slugTendencia) =>
  `${import.meta.env.BASE_URL}data/tendencias/${slugTendencia}/excel/base-poblacion.xlsx`;

/* ── Caché persistente (IndexedDB) ───────────────────────────────── */

const NOMBRE_BASE_DATOS = 'observatorio-comfenalco';
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

/* Firma del archivo publicado, para detectar reemplazos del cliente. */
const construirFirma = (respuesta) => {
  const tamano = respuesta.headers.get('content-length') ?? '';
  const modificado = respuesta.headers.get('last-modified') ?? '';
  return tamano || modificado ? `${tamano}|${modificado}` : '';
};

/* ── Interpretación en el Web Worker ─────────────────────────────── */

/* Envía el archivo al worker y espera la estructura compacta. */
function interpretarEnWorker(arrayBuffer) {
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
    worker.postMessage({ arrayBuffer }, [arrayBuffer]);
  });
}

/* ── Construcción del panel ──────────────────────────────────────── */

const PANEL_NO_DISPONIBLE = {
  estado: ESTADO_PANEL.EN_PREPARACION,
  anios: [],
  obtenerFila: () => null,
};

const construirPanel = (anios, filas) => ({
  estado: ESTADO_PANEL.DISPONIBLE,
  /** Años disponibles en el Excel, ordenados (detectados dinámicamente). */
  anios,
  /** Fila de población de un departamento y año, o null si no existe. */
  obtenerFila: (codigoDane, anio) => filas.get(`${Number(codigoDane)}-${Number(anio)}`) ?? null,
});

/**
 * Descarga (o recupera de la caché persistente) y normaliza el panel.
 */
async function cargarPanel(url) {
  /* 1. Caché persistente validada con una petición HEAD barata. */
  const registro = await leerRegistroPersistente(url);
  if (registro?.firma) {
    try {
      const cabeceras = await fetch(url, { method: 'HEAD' });
      if (cabeceras.ok && construirFirma(cabeceras) === registro.firma) {
        return construirPanel(registro.anios, registro.filas);
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
  const resultado = await interpretarEnWorker(arrayBuffer);
  if (!resultado.disponible) {
    return PANEL_NO_DISPONIBLE;
  }

  /* 4. Se persiste el resultado compacto para las próximas visitas. */
  if (firma) {
    await guardarRegistroPersistente(url, {
      firma,
      anios: resultado.anios,
      filas: resultado.filas,
    });
  }

  return construirPanel(resultado.anios, resultado.filas);
}

/**
 * Obtiene el panel de población de una tendencia (una sola lectura por
 * tendencia; las siguientes llamadas reutilizan el resultado en caché).
 * @param {string} slugTendencia p. ej. 'envejecimiento'
 */
export function obtenerPanelPoblacion(slugTendencia) {
  const url = construirUrlExcel(slugTendencia);

  if (!cachePaneles.has(url)) {
    const promesa = cargarPanel(url);
    cachePaneles.set(url, promesa);

    /* Solo los paneles disponibles permanecen en la caché de memoria: los
       "en preparación" y los errores se descartan para poder reintentar. */
    promesa
      .then((panel) => {
        if (panel.estado !== ESTADO_PANEL.DISPONIBLE) cachePaneles.delete(url);
      })
      .catch(() => cachePaneles.delete(url));
  }

  return cachePaneles.get(url);
}
