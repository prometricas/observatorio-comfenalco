/**
 * docxService — Lectura de documentos Word (.docx) del portal.
 *
 * Descarga el documento del departamento desde `public/data/` (la carpeta
 * que el cliente actualiza en su servidor sin recompilar), extrae SOLO el
 * texto plano con mammoth.js y lo divide en párrafos. La tipografía y los
 * tamaños los pone siempre el CSS del portal, nunca el archivo Word.
 *
 * - Caché en memoria por URL: re-seleccionar un departamento no vuelve a
 *   descargar ni a interpretar el documento.
 * - Si el archivo no existe (404), se informa "en preparación" y NO se
 *   guarda en caché, para que el contenido aparezca en cuanto el cliente
 *   lo suba al servidor.
 * - mammoth se carga de forma diferida: su código solo viaja al navegador
 *   cuando se consulta el primer texto.
 */

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
 * Descarga e interpreta un documento; devuelve el estado y sus párrafos.
 * Un 404 —o un servidor que responda HTML en lugar del .docx— se trata
 * como contenido aún no disponible; cualquier otro fallo del servidor se
 * lanza como error para que la interfaz lo distinga.
 */
async function descargarYExtraer(url) {
  /* El intérprete y el documento se descargan en paralelo. */
  const promesaInterprete = cargarMammoth();

  const respuesta = await fetch(url);
  const tipoContenido = respuesta.headers.get('content-type') ?? '';

  if (respuesta.status === 404 || tipoContenido.includes('text/html')) {
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

  /* mammoth separa los párrafos con líneas en blanco; se normaliza el
     espaciado interno y se descartan los párrafos vacíos. */
  const parrafos = resultado.value
    .split(/\n{2,}/)
    .map((parrafo) => parrafo.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

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
