/**
 * precalculados — Carga de los archivos que el build deja junto a cada
 * base o documento pesado (scripts/precalcular-bases.mjs).
 *
 * La descarga intenta primero la variante comprimida (`.json.gz`,
 * descomprimida en el navegador con DecompressionStream: los archivos
 * grandes viajan a una cuarta parte de su peso aunque el servidor no
 * comprima nada) y cae a la variante plana si el navegador no soporta la
 * descompresión o el servidor no sirve el archivo.
 *
 * La validación es común a todos los consumidores: el registro solo vale
 * si el archivo de origen publicado pesa exactamente lo que pesaba al
 * generarlo (ver tamanoPublicado.js). Si no coincide —el cliente
 * reemplazó el archivo en el servidor—, quien llama sigue por su camino
 * de interpretación en el navegador.
 */
import { obtenerTamanoPublicado } from './tamanoPublicado.js';

/* Descarga un JSON tolerando 404 y servidores que respondan HTML. */
async function descargarJson(url) {
  const respuesta = await fetch(url);
  const tipoContenido = respuesta.headers.get('content-type') ?? '';
  if (!respuesta.ok || tipoContenido.includes('text/html')) return null;
  return respuesta.json();
}

/* Variante comprimida: bytes .gz → DecompressionStream → JSON. Algunos
   servidores anuncian el .gz como codificación HTTP (content-encoding);
   en ese caso el navegador ya lo descomprimió y el cuerpo es JSON. */
async function descargarJsonComprimido(url) {
  const respuesta = await fetch(url);
  const tipoContenido = respuesta.headers.get('content-type') ?? '';
  if (!respuesta.ok || tipoContenido.includes('text/html') || !respuesta.body) return null;
  if (respuesta.headers.get('content-encoding')) return respuesta.json();
  const flujo = respuesta.body.pipeThrough(new DecompressionStream('gzip'));
  const texto = await new Response(flujo).text();
  return JSON.parse(texto);
}

/**
 * Registro precalculado de un archivo publicado, validado contra su
 * tamaño, o null si no existe, no corresponde o no pasa la validación.
 * @param {string} urlOrigen     URL del archivo original (.xlsx o .docx)
 * @param {RegExp} extension     extensión a sustituir (p. ej. /\.xlsx$/)
 * @param {(registro: object, tamanoPublicado: number) => boolean} esValido
 * @param {Response|null} cabecerasPrevias respuesta HEAD ya disponible
 */
export async function cargarRegistroPrecalculado(
  urlOrigen,
  extension,
  esValido,
  cabecerasPrevias = null,
) {
  try {
    const tamanoPublicado = await obtenerTamanoPublicado(urlOrigen, cabecerasPrevias);
    if (tamanoPublicado === null) return null;

    const urlRegistro = urlOrigen.replace(extension, '.precalculado.json');

    let registro = null;
    if (typeof DecompressionStream === 'function') {
      try {
        registro = await descargarJsonComprimido(`${urlRegistro}.gz`);
      } catch {
        /* Sin variante comprimida utilizable: se intenta la plana. */
      }
    }
    registro = registro ?? (await descargarJson(urlRegistro));

    if (!registro || !esValido(registro, tamanoPublicado)) return null;
    return registro;
  } catch {
    return null;
  }
}
