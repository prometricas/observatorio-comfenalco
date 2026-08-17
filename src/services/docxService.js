/**
 * docxService — Lectura de documentos Word (.docx) del portal.
 *
 * Descarga los documentos desde `public/data/` (la carpeta que el cliente
 * actualiza en su servidor sin recompilar), extrae SOLO el texto plano con
 * mammoth.js y lo divide en párrafos. La tipografía y los tamaños los pone
 * siempre el CSS del portal, nunca el archivo Word.
 *
 * Cuatro entradas, según cómo organice sus textos cada sección:
 * - `obtenerTextoDepartamento`: un .docx por departamento (tendencias
 *   como Envejecimiento).
 * - `obtenerSeccionDepartamento`: documento único con secciones tituladas
 *   "Ciudad (Departamento)" — o el territorio a secas, como "Bogotá" —
 *   del que se extrae la sección del departamento seleccionado.
 * - `obtenerSeccionIndicador`: sección de un indicador dentro del
 *   documento de resumen del eje, delimitada por títulos.
 * - `obtenerTextoIndicador`: documento propio de un indicador, completo.
 *
 * Orden de carga (común a todas):
 * 1. Un sondeo HEAD por documento descarta los inexistentes sin pedirlos
 *    ("en preparación" es un caso normal, no un error) y valida los
 *    párrafos precalculados que cada build deja junto al .docx — el
 *    camino normal: sin descarga del documento ni intérprete.
 * 2. Si el cliente reemplazó el Word en el servidor, la validación no
 *    coincide y se descarga e interpreta con mammoth (importado de forma
 *    diferida: su código solo viaja en este camino).
 * Caché en memoria por URL; los "en preparación" y los fallos no se
 * conservan, para que el contenido aparezca en cuanto el cliente suba el
 * archivo.
 */
import { DEPARTAMENTOS, normalizarNombre } from '../data/departamentos.js';
import { obtenerConfiguracionTendencia } from '../data/tendencias.js';
import { FORMATO_TEXTO, partirEnParrafos } from './normalizacionTexto.js';
import { cargarRegistroPrecalculado } from './precalculados.js';

/** Estados posibles del texto de un departamento. */
export const ESTADO_TEXTO = {
  DISPONIBLE: 'disponible',
  EN_PREPARACION: 'en-preparacion',
};

/* Caché en memoria: URL → promesa del resultado ya interpretado. */
const cacheTextos = new Map();

/* Carga diferida del intérprete de .docx. Se importa el paquete raíz para
   que el empaquetador aplique su campo "browser" (variantes de descompresión
   propias del navegador); el bundle preminificado que trae el paquete no
   funciona bajo la optimización de dependencias de Vite. */
let promesaMammoth = null;
const cargarMammoth = () => {
  if (!promesaMammoth) {
    promesaMammoth = import('mammoth')
      .then((modulo) => modulo.default ?? modulo)
      .catch((error) => {
        /* Si la descarga del intérprete falla, se libera la promesa para
           poder reintentarla; sin esto, un único fallo de red dejaría la
           lectura de documentos rota hasta recargar la página. */
        promesaMammoth = null;
        throw error;
      });
  }
  return promesaMammoth;
};

/* URL del documento respetando la base relativa del build (`base: './'`). */
const construirUrlDocumento = (slugTendencia, slugArchivo) =>
  `${import.meta.env.BASE_URL}data/tendencias/${slugTendencia}/textos/${slugArchivo}.docx`;

/**
 * Sondeo único del documento publicado. Una sola petición HEAD resuelve
 * dos preguntas: si el archivo existe (los departamentos sin Word son un
 * caso normal, no un error) y, cuando existe, aporta las cabeceras para
 * validar los párrafos precalculados del build (solo valen si el
 * documento publicado pesa exactamente lo que pesaba al generarlos; si el
 * cliente reemplazó el Word, se sigue con la descarga e interpretación).
 *
 * Antes la vía rápida y la de respaldo preguntaban por separado y cada
 * departamento sin documento producía DOS errores 404 en la consola del
 * navegador; con el sondeo, uno solo y sin descarga de respaldo.
 */
async function sondearDocumento(url) {
  let cabeceras;
  try {
    cabeceras = await fetch(url, { method: 'HEAD' });
  } catch {
    /* Sin red para sondear: que lo resuelva la descarga completa. */
    return { existe: true, parrafos: null };
  }

  const tipoContenido = cabeceras.headers.get('content-type') ?? '';
  /* Solo el 404 y las páginas HTML con 200 (rewrites del hosting) valen
     como "sin documento"; un error 5xx con página HTML es un fallo del
     servidor y debe llegar a la interfaz como error, no como "en
     preparación". */
  if (cabeceras.status === 404 || (cabeceras.ok && tipoContenido.includes('text/html'))) {
    return { existe: false, parrafos: null };
  }

  const registro = await cargarRegistroPrecalculado(
    url,
    /\.docx$/,
    (r, tamanoPublicado) =>
      r.formato === FORMATO_TEXTO &&
      r.tamanoOrigen === tamanoPublicado &&
      Array.isArray(r.parrafos),
    cabeceras.ok ? cabeceras : null,
  );
  return { existe: true, parrafos: registro ? registro.parrafos : null };
}

/**
 * Descarga e interpreta un documento; devuelve el estado y sus párrafos.
 * Un 404 —o un servidor que responda HTML en lugar del .docx— se trata
 * como contenido aún no disponible; cualquier otro fallo del servidor se
 * lanza como error para que la interfaz lo distinga.
 */
async function descargarYExtraer(url) {
  /* Sondeo único: descarta los documentos inexistentes sin pedirlos y
     entrega la vía rápida del build (sin .docx ni intérprete). */
  const sondeo = await sondearDocumento(url);
  if (!sondeo.existe) {
    return { estado: ESTADO_TEXTO.EN_PREPARACION, parrafos: [] };
  }
  if (sondeo.parrafos) {
    return sondeo.parrafos.length > 0
      ? { estado: ESTADO_TEXTO.DISPONIBLE, parrafos: sondeo.parrafos }
      : { estado: ESTADO_TEXTO.EN_PREPARACION, parrafos: [] };
  }

  /* El intérprete y el documento se descargan en paralelo. */
  const promesaInterprete = cargarMammoth();

  const respuesta = await fetch(url);
  const tipoContenido = respuesta.headers.get('content-type') ?? '';

  if (respuesta.status === 404 || (respuesta.ok && tipoContenido.includes('text/html'))) {
    return { estado: ESTADO_TEXTO.EN_PREPARACION, parrafos: [] };
  }
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió ${respuesta.status} al pedir ${url}`);
  }

  const [arrayBuffer, mammoth] = await Promise.all([
    respuesta.arrayBuffer(),
    promesaInterprete,
  ]);
  const resultado = await mammoth.extractRawText({ arrayBuffer });

  /* mammoth separa los párrafos con líneas en blanco (normalización
     compartida con el precálculo del build). */
  const parrafos = partirEnParrafos(resultado.value);

  /* Un documento sin texto equivale a contenido aún no disponible (no se
     conserva en caché, para reflejarlo en cuanto el cliente lo complete). */
  if (parrafos.length === 0) {
    return { estado: ESTADO_TEXTO.EN_PREPARACION, parrafos: [] };
  }

  return { estado: ESTADO_TEXTO.DISPONIBLE, parrafos };
}

/**
 * Obtiene el texto de un departamento para una tendencia.
 * @param {string} slugTendencia p. ej. 'envejecimiento'
 * @param {string} slugArchivo   p. ej. 'norte-de-santander'
 * @returns {Promise<{estado: string, parrafos: string[]}>}
 */
export function obtenerTextoDepartamento(slugTendencia, slugArchivo) {
  const url = construirUrlDocumento(slugTendencia, slugArchivo);

  if (!cacheTextos.has(url)) {
    const promesa = descargarYExtraer(url);
    cacheTextos.set(url, promesa);

    /* Solo los documentos interpretados permanecen en caché: los "en
       preparación" y los errores se descartan para poder reintentar. */
    promesa
      .then((resultado) => {
        if (resultado.estado !== ESTADO_TEXTO.DISPONIBLE) cacheTextos.delete(url);
      })
      .catch(() => cacheTextos.delete(url));
  }

  return cacheTextos.get(url);
}

/* ── Documento único con secciones por departamento ──────────────── */

/* Caché en memoria: URL del documento único → promesa de sus secciones. */
const cacheSecciones = new Map();

/**
 * Detecta si un párrafo corto es el título de la sección de un
 * departamento. Dos formas válidas, ambas con comparación insensible a
 * tildes y signos (los documentos del cliente traen variaciones como
 * "Atlantico" o "Armenía"):
 *
 * 1. "Ciudad (Departamento)" — se exige que el paréntesis nombre un
 *    departamento del catálogo y, si la tendencia define su catálogo de
 *    ciudades, que la parte anterior sea la capital de ese departamento
 *    (doble llave: un pie de figura como "Tasa (Meta)" no abre sección).
 *    Se tolera puntuación final ("Medellín (Antioquia).").
 * 2. Un título de la lista explícita `titulosDirectos` de la tendencia
 *    (p. ej. "Bogotá") y, si la tendencia activa `departamentosASecas`,
 *    cualquier nombre de departamento del catálogo a secas (documentos
 *    cuyas secciones se titulan "Antioquia", "Boyacá"…). Las tendencias
 *    SIN esa bandera nunca aceptan un nombre suelto, para que palabras
 *    como "Meta" o "Sucre" en una celda o lista no se roben la sección
 *    vigente.
 *
 * @returns {number|null} código DANE del departamento titulado
 */
function detectarTituloDeSeccion(parrafo, detector) {
  if (parrafo.length > 70) return null;

  const conParentesis = parrafo.match(/^(.{2,60}?)\s*\((.{3,60})\)\s*[.:;]?$/);

  /* Forma 2: título a secas — lista explícita y, con la bandera, los
     nombres del catálogo de departamentos. */
  if (!conParentesis) {
    const clave = normalizarNombre(parrafo);
    const directo = detector.titulosDirectos.get(clave);
    if (directo !== undefined) return directo;
    if (detector.departamentosASecas) {
      const departamento = DEPARTAMENTOS.find(
        (candidato) => normalizarNombre(candidato.nombre) === clave,
      );
      return departamento?.codigoDane ?? null;
    }
    return null;
  }

  /* Forma 1: "Ciudad (Departamento)". */
  const claveDepartamento = normalizarNombre(conParentesis[2]);
  if (claveDepartamento.length < 4) return null;

  for (const departamento of DEPARTAMENTOS) {
    if (normalizarNombre(departamento.nombre) !== claveDepartamento) continue;

    if (detector.ciudadPorDepartamento) {
      const ciudadEsperada = detector.ciudadPorDepartamento.get(departamento.codigoDane);
      if (!ciudadEsperada) return null;
      const coincideCiudad =
        normalizarNombre(conParentesis[1]) === normalizarNombre(ciudadEsperada);
      return coincideCiudad ? departamento.codigoDane : null;
    }
    return departamento.codigoDane;
  }
  return null;
}

/**
 * Descarga el documento único y lo divide en secciones por departamento:
 * cada título abre una sección que acumula los párrafos hasta el título
 * siguiente. El contenido previo al primer título (introducción,
 * referencias) no pertenece a ningún departamento.
 *
 * `cacheable` distingue las causas: un documento descargado y leído (aun
 * sin secciones) se conserva en caché durante la sesión; un 404 o una
 * respuesta HTML se reintentan en la próxima consulta.
 */
async function descargarYSeccionar(url, detector) {
  /* La división en secciones es barata y ocurre siempre en el navegador;
     lo costoso es obtener los párrafos, y ahí entra la vía rápida. */
  const seccionar = (parrafos) => {
    const secciones = new Map();
    let codigoActual = null;
    for (const parrafo of parrafos) {
      const codigoTitulado = detectarTituloDeSeccion(parrafo, detector);
      if (codigoTitulado !== null) {
        codigoActual = codigoTitulado;
        if (!secciones.has(codigoActual)) secciones.set(codigoActual, []);
        continue;
      }
      if (codigoActual !== null) secciones.get(codigoActual).push(parrafo);
    }
    return {
      estado: secciones.size > 0 ? ESTADO_TEXTO.DISPONIBLE : ESTADO_TEXTO.EN_PREPARACION,
      secciones,
      cacheable: true,
    };
  };

  /* Sondeo único: descarta el documento inexistente sin pedirlo y
     entrega la vía rápida del build (sin .docx ni intérprete). */
  const sondeo = await sondearDocumento(url);
  if (!sondeo.existe) {
    return { estado: ESTADO_TEXTO.EN_PREPARACION, secciones: new Map(), cacheable: false };
  }
  if (sondeo.parrafos) return seccionar(sondeo.parrafos);

  const promesaInterprete = cargarMammoth();

  const respuesta = await fetch(url);
  const tipoContenido = respuesta.headers.get('content-type') ?? '';

  if (respuesta.status === 404 || (respuesta.ok && tipoContenido.includes('text/html'))) {
    return { estado: ESTADO_TEXTO.EN_PREPARACION, secciones: new Map(), cacheable: false };
  }
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió ${respuesta.status} al pedir ${url}`);
  }

  const [arrayBuffer, mammoth] = await Promise.all([
    respuesta.arrayBuffer(),
    promesaInterprete,
  ]);
  const resultado = await mammoth.extractRawText({ arrayBuffer });

  return seccionar(partirEnParrafos(resultado.value));
}

/**
 * Obtiene la sección de un departamento dentro del documento único de una
 * tendencia. El documento se descarga e interpreta UNA sola vez; cada
 * departamento toma su sección del resultado cacheado.
 * @param {string} slugTendencia p. ej. 'informalidad-laboral'
 * @param {string} nombreArchivo p. ej. 'articulo-informalidad.docx'
 * @param {number} codigoDane    departamento seleccionado en el mapa
 * @returns {Promise<{estado: string, parrafos: string[]}>}
 */
export function obtenerSeccionDepartamento(slugTendencia, nombreArchivo, codigoDane) {
  const url = `${import.meta.env.BASE_URL}data/tendencias/${slugTendencia}/textos/${nombreArchivo}`;

  if (!cacheSecciones.has(url)) {
    /* Reglas de detección de títulos definidas por la tendencia. */
    const config = obtenerConfiguracionTendencia(slugTendencia);
    const detector = {
      titulosDirectos: new Map(
        (config.titulosDirectos ?? []).map((titulo) => [
          normalizarNombre(titulo.titulo),
          titulo.codigoDane,
        ]),
      ),
      ciudadPorDepartamento: config.ciudadPorDepartamento ?? null,
      departamentosASecas: config.titulosDepartamentoASecas ?? false,
    };

    const promesa = descargarYSeccionar(url, detector);
    cacheSecciones.set(url, promesa);

    /* Solo se desalojan los resultados que ameritan reintento (archivo
       ausente o error); un documento leído sin secciones queda cacheado
       durante la sesión para no re-descargarlo en cada selección. */
    promesa
      .then((resultado) => {
        if (!resultado.cacheable) cacheSecciones.delete(url);
      })
      .catch(() => cacheSecciones.delete(url));
  }

  return cacheSecciones.get(url).then((resultado) => {
    const parrafos = resultado.secciones.get(Number(codigoDane)) ?? [];
    return {
      estado:
        resultado.estado === ESTADO_TEXTO.DISPONIBLE && parrafos.length > 0
          ? ESTADO_TEXTO.DISPONIBLE
          : ESTADO_TEXTO.EN_PREPARACION,
      parrafos,
    };
  });
}

/* ── Documento de indicadores con secciones por título ───────────── */

/* Caché del documento de indicadores ya interpretado: URL → promesa de
   sus párrafos. Los cinco índices comparten el mismo archivo, así que se
   descarga e interpreta una sola vez. */
const cacheResumen = new Map();

function obtenerDocumentoResumen(url) {
  if (!cacheResumen.has(url)) {
    const promesa = descargarYExtraer(url);
    cacheResumen.set(url, promesa);

    /* Solo el documento interpretado permanece en caché: el "en
       preparación" y los errores se descartan para poder reintentar. */
    promesa
      .then((resultado) => {
        if (resultado.estado !== ESTADO_TEXTO.DISPONIBLE) cacheResumen.delete(url);
      })
      .catch(() => cacheResumen.delete(url));
  }
  return cacheResumen.get(url);
}

/**
 * Obtiene el texto completo del documento propio de un indicador (los que
 * traen su .docx dedicado en lugar de una sección del resumen del eje).
 * Si el primer párrafo es corto se interpreta como título del análisis;
 * el resto son los párrafos del cuerpo.
 * @param {string} slugIndicador p. ej. 'felicidad-nacional-bruta'
 * @param {string} nombreArchivo p. ej. 'felicidad-nacional-bruta.docx'
 * @returns {Promise<{estado: string, titulo: string|null, parrafos: string[]}>}
 */
export function obtenerTextoIndicador(slugIndicador, nombreArchivo) {
  const url = `${import.meta.env.BASE_URL}data/indicadores/${slugIndicador}/textos/${nombreArchivo}`;

  return obtenerDocumentoResumen(url).then((documento) => {
    if (documento.estado !== ESTADO_TEXTO.DISPONIBLE) {
      return { estado: documento.estado, titulo: null, parrafos: [] };
    }
    const [primero, ...resto] = documento.parrafos;
    const tieneTitulo = primero.length < 90 && resto.length > 0;
    return {
      estado: ESTADO_TEXTO.DISPONIBLE,
      titulo: tieneTitulo ? primero : null,
      parrafos: tieneTitulo ? resto : documento.parrafos,
    };
  });
}

/**
 * Obtiene la sección de un indicador dentro del documento de resumen del
 * eje. La sección empieza en el párrafo cuyo texto comienza por
 * `tituloSeccion` (comparación sin tildes ni signos, como el resto del
 * portal) y termina donde arranca cualquiera de los `titulosLimite` (las
 * demás secciones y las referencias).
 * @param {string} slugIndicador  p. ej. 'vida-mejor-ocde'
 * @param {string} nombreArchivo  p. ej. 'resumen-indicadores.docx'
 * @param {string} tituloSeccion  comienzo del título de la sección
 * @param {string[]} titulosLimite comienzos de título donde cortar
 * @returns {Promise<{estado: string, titulo: string|null, parrafos: string[]}>}
 */
export function obtenerSeccionIndicador(slugIndicador, nombreArchivo, tituloSeccion, titulosLimite) {
  const url = `${import.meta.env.BASE_URL}data/indicadores/${slugIndicador}/textos/${nombreArchivo}`;

  return obtenerDocumentoResumen(url).then((documento) => {
    if (documento.estado !== ESTADO_TEXTO.DISPONIBLE) {
      return { estado: documento.estado, titulo: null, parrafos: [] };
    }

    const empiezaCon = (parrafo, titulo) =>
      normalizarNombre(parrafo).startsWith(normalizarNombre(titulo));

    const inicio = documento.parrafos.findIndex((parrafo) => empiezaCon(parrafo, tituloSeccion));
    if (inicio === -1) {
      return { estado: ESTADO_TEXTO.EN_PREPARACION, titulo: null, parrafos: [] };
    }

    const parrafos = [];
    for (let indice = inicio + 1; indice < documento.parrafos.length; indice += 1) {
      const parrafo = documento.parrafos[indice];
      if (titulosLimite.some((titulo) => empiezaCon(parrafo, titulo))) break;
      parrafos.push(parrafo);
    }

    return {
      estado: parrafos.length > 0 ? ESTADO_TEXTO.DISPONIBLE : ESTADO_TEXTO.EN_PREPARACION,
      titulo: documento.parrafos[inicio],
      parrafos,
    };
  });
}
