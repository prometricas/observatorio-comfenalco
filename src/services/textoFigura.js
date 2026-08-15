/**
 * textoFigura — Escape de texto para las figuras de Plotly.
 *
 * Plotly interpreta un subconjunto de pseudo-HTML en los textos de hover,
 * anotaciones, nombres de traza (leyenda) y títulos de eje: además de
 * `<b>`, `<i>` y `<br>`, admite `<a href>` (enlaces clicables) y
 * `<span style>` (CSS inline). Las etiquetas se convierten en nodos de
 * texto SVG, así que NO hay ejecución de JavaScript —Plotly bloquea el
 * protocolo `javascript:` en los href—, pero una cadena que venga de un
 * archivo del cliente (los .xlsx que se reemplazan en el servidor sin
 * recompilar) sí podría colar un enlace de phishing o texto con estilos
 * arbitrarios dentro de una figura del portal.
 *
 * Este escape neutraliza los delimitadores de etiqueta ANTES de
 * interpolar cualquier cadena de origen externo (nombres de país o
 * entidad, encabezados de columna, unidades) en un texto de figura.
 * Plotly vuelve a mostrar `&lt;`/`&gt;`/`&amp;` como los caracteres
 * literales, de modo que un nombre legítimo se ve intacto; lo único que
 * cambia es que un `<a …>` incrustado se muestra como texto inerte en
 * lugar de convertirse en enlace.
 *
 * Se escapa en el punto de interpolación de la figura (no en la
 * normalización) para que los mismos nombres, cuando React los pinta en
 * los desplegables y tablas, conserven sus signos `&` sin doble escape.
 * El orden (primero `&`) evita que un `&lt;` ya presente en el archivo
 * se decodifique después a un `<` activo.
 */
export const escaparTextoFigura = (valor) =>
  String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
