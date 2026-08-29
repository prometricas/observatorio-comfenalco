/**
 * tablero-indicadores.js — Catálogo del tablero de medidores del eje
 * Indicadores (portada del eje).
 *
 * Una entrada por indicador del portal: id de sección del catálogo de
 * navegación, nombre, colores y descripción corta. Los medidores son
 * SIMBÓLICOS (decisión del usuario 2026-08-29): no representan ningún
 * dato — la primera versión marcaba cifras reales de Colombia extraídas
 * de los precalculados, pero se retiró para que el mantenimiento futuro
 * del portal no exija actualizar cifras quemadas; la aguja reposa en una
 * posición fija y se mueve al pasar el puntero, como guiño visual.
 *
 * Colores: acento decorativo del manual de marca por tarjeta y variante
 * de TEXTO oscurecida al mínimo para AA 4,5:1 sobre blanco (misma pareja
 * validada del panal PESTEL; el original queda anotado).
 */

/** Tarjetas del tablero, en el orden del menú de Indicadores. */
export const TABLERO_INDICADORES = [
  {
    id: 'indicadores-vida-mejor-ocde',
    nombre: 'Una vida mejor OCDE',
    color: '#005744',
    colorTexto: '#005744',
    descripcion: 'Ranking de países y abanico de escenarios del bienestar a 2050.',
  },
  {
    id: 'indicadores-felicidad-nacional-bruta',
    nombre: 'Felicidad nacional bruta',
    color: '#3399a3',
    colorTexto: '#2b818a' /* marca: #3399a3 */,
    descripcion: 'Explorador del índice adaptado de Bután y sus escenarios simulados.',
  },
  {
    id: 'indicadores-capital-humano-wb',
    nombre: 'Capital humano (WB)',
    color: '#f3bc52',
    colorTexto: '#9e6c0b' /* marca: #f3bc52 */,
    descripcion: 'Escenarios prospectivos de los indicadores del Banco Mundial.',
  },
  {
    id: 'indicadores-desempeno-ambiental',
    nombre: 'Desempeño ambiental',
    color: '#58b250',
    colorTexto: '#41853b' /* marca: #58b250 */,
    descripcion: 'Trayectorias, explorador por entidad y estructura del índice EPI.',
  },
  {
    id: 'indicadores-calidad-vida-digital',
    nombre: 'Calidad vida digital',
    color: '#5eb2ae',
    colorTexto: '#3e817e' /* marca: #5eb2ae */,
    descripcion: 'Trayectorias simuladas y comparador de escenarios a 2030.',
  },
];
