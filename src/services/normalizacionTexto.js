/**
 * normalizacionTexto — Conversión del texto crudo de un Word a párrafos.
 *
 * mammoth entrega el texto plano con los párrafos separados por líneas en
 * blanco; aquí se parte, se normaliza el espaciado interno y se descartan
 * los vacíos. Vive en un módulo propio porque la usan DOS consumidores
 * que deben producir resultados idénticos:
 *  - docxService, cuando el navegador interpreta un Word recién
 *    reemplazado por el cliente;
 *  - scripts/precalcular-bases.mjs, que en cada build deja junto a cada
 *    .docx sus párrafos ya extraídos para que el portal no descargue ni
 *    interprete el documento completo.
 */

/**
 * Versión del formato de los párrafos precalculados: si esta lógica
 * cambia, subir el número invalida los archivos de builds anteriores.
 */
export const FORMATO_TEXTO = 1;

/** Texto crudo de mammoth → lista de párrafos limpios. */
export function partirEnParrafos(textoCrudo) {
  return String(textoCrudo ?? '')
    .split(/\n{2,}/)
    .map((parrafo) => parrafo.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}
