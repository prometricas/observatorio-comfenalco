/**
 * tamanoPublicado — Tamaño en bytes de un archivo publicado en el
 * servidor, obtenido sin descargarlo.
 *
 * Es la pieza que valida los archivos precalculados del build (la usa
 * precalculados.js, el cargador común de todos los servicios de datos):
 * el precalculado solo vale si el archivo publicado pesa exactamente lo
 * que pesaba al generarlo.
 *
 * Dos intentos, del más barato al más compatible:
 *  1. `content-length` de una petición HEAD (o de unas cabeceras ya
 *     obtenidas). Algunos servidores lo omiten cuando comprimen la
 *     respuesta.
 *  2. Petición del primer byte con cabecera `Range`: la respuesta 206
 *     declara el tamaño total en `content-range`.
 *
 * Si ninguno da un tamaño utilizable devuelve null y quien llama sigue
 * por el camino sin precalculado. Nota: un servidor que comprima el
 * archivo puede reportar el tamaño comprimido; entonces la validación no
 * coincide y el portal simplemente reinterpreta el original — más lento,
 * nunca incorrecto.
 */

/**
 * @param {string} url archivo publicado
 * @param {Response|null} cabecerasPrevias respuesta HEAD ya disponible
 * @returns {Promise<number|null>}
 */
export async function obtenerTamanoPublicado(url, cabecerasPrevias = null) {
  try {
    let contentLength;
    if (cabecerasPrevias) {
      /* Con cabeceras ya obtenidas no se repite el HEAD: si no traen
         content-length, otro HEAD tampoco lo traería. */
      contentLength = cabecerasPrevias.headers.get('content-length');
    } else {
      /* Un servidor que rechace HEAD (405/501) no invalida la vía: el
         intento por rango de más abajo sigue disponible. Un 404, en
         cambio, la cierra del todo: el rango y la descarga darían el
         mismo 404 y solo sumarían ruido a la consola. */
      const cabeceras = await fetch(url, { method: 'HEAD' });
      if (cabeceras.status === 404) return null;
      if (cabeceras.ok) contentLength = cabeceras.headers.get('content-length');
    }
    const tamano = Number(contentLength);
    if (Number.isFinite(tamano) && tamano > 0) return tamano;

    const rango = await fetch(url, { headers: { Range: 'bytes=0-0' } });
    if (rango.status === 206) {
      const total = Number((rango.headers.get('content-range') ?? '').split('/')[1]);
      if (Number.isFinite(total) && total > 0) return total;
    }
    return null;
  } catch {
    return null;
  }
}
