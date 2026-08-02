/**
 * navegacion.js — Catálogo de navegación del portal.
 *
 * Define en un solo lugar las secciones de los dos menús (fijo y
 * desplegable) y las nueve tendencias. La navegación funciona por estado
 * interno de React (sin rutas), por lo que cada sección se identifica con
 * un id único que la App usa para decidir qué módulo renderizar.
 *
 * Nota: "Publicaciones" existe en ambos menús y comparte el mismo id a
 * propósito: son dos puntos de entrada a la misma sección.
 */

/** Id de la sección inicial que se muestra al cargar el portal. */
export const SECCION_INICIO = 'inicio';

/** Opciones del menú fijo (barra institucional superior). */
export const OPCIONES_NAV_FIJO = [
  { id: 'el-observatorio', etiqueta: 'El Observatorio' },
  { id: 'linea-de-tiempo', etiqueta: 'Línea de tiempo' },
  { id: 'ibim', etiqueta: 'IBIM' },
  { id: 'publicaciones', etiqueta: 'Publicaciones' },
  { id: 'benchmarking', etiqueta: 'Benchmarking' },
  { id: 'tanques-de-pensamiento', etiqueta: 'Tanques de pensamiento' },
];

/**
 * Las nueve tendencias del menú desplegable. El `slug` (kebab-case, sin
 * tildes) nombra la carpeta de datos en `public/data/tendencias/<slug>/`.
 */
export const TENDENCIAS = [
  { id: 'tendencias-envejecimiento', etiqueta: 'Envejecimiento', slug: 'envejecimiento' },
  { id: 'tendencias-informalidad-laboral', etiqueta: 'Informalidad laboral', slug: 'informalidad-laboral' },
  { id: 'tendencias-gasto-social', etiqueta: 'Gasto social', slug: 'gasto-social' },
  { id: 'tendencias-estructura-familiar', etiqueta: 'Estructura familiar', slug: 'estructura-familiar' },
  { id: 'tendencias-normatividad-laboral', etiqueta: 'Normatividad laboral', slug: 'normatividad-laboral' },
  { id: 'tendencias-economia-circular', etiqueta: 'Economía circular', slug: 'economia-circular' },
  {
    id: 'tendencias-hiper-personalizacion-de-servicios',
    etiqueta: 'Hiper-personalización de servicios',
    slug: 'hiper-personalizacion-de-servicios',
  },
  { id: 'tendencias-regulaciones-ambientales', etiqueta: 'Regulaciones ambientales', slug: 'regulaciones-ambientales' },
  { id: 'tendencias-cambios-estructura-familiar', etiqueta: 'Cambios estructura familiar', slug: 'cambios-estructura-familiar' },
];

/** Opciones del menú desplegable (ejes temáticos del Observatorio). */
export const OPCIONES_NAV_DESPLEGABLE = [
  { id: 'tendencias', etiqueta: 'Tendencias', subOpciones: TENDENCIAS },
  { id: 'indicadores', etiqueta: 'Indicadores' },
  { id: 'factores-de-cambio', etiqueta: 'Factores de cambio' },
  { id: 'riesgos-y-oportunidades', etiqueta: 'Riesgos y oportunidades' },
  { id: 'publicaciones', etiqueta: 'Publicaciones' },
  { id: 'innovacion', etiqueta: 'Innovación' },
];

/* Índice id → etiqueta con todas las secciones, para consultar títulos. */
const ETIQUETAS_SECCIONES = new Map([[SECCION_INICIO, 'Inicio']]);
OPCIONES_NAV_FIJO.forEach((opcion) => ETIQUETAS_SECCIONES.set(opcion.id, opcion.etiqueta));
OPCIONES_NAV_DESPLEGABLE.forEach((opcion) => {
  ETIQUETAS_SECCIONES.set(opcion.id, opcion.etiqueta);
  opcion.subOpciones?.forEach((sub) => ETIQUETAS_SECCIONES.set(sub.id, sub.etiqueta));
});

/**
 * Devuelve la etiqueta legible de una sección a partir de su id.
 * Si el id no existe en el catálogo, devuelve el propio id como respaldo.
 */
export function obtenerEtiquetaSeccion(idSeccion) {
  return ETIQUETAS_SECCIONES.get(idSeccion) ?? idSeccion;
}
