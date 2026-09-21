/**
 * navegacion.js — Catálogo de navegación del portal.
 *
 * Define en un solo lugar las secciones de los dos menús (fijo y
 * desplegable), las nueve tendencias y los cinco indicadores. La navegación
 * funciona por estado interno de React (sin rutas), por lo que cada sección
 * se identifica con un id único que la App usa para decidir qué módulo
 * renderizar.
 *
 * Nota: "Publicaciones" vive SOLO en el menú fijo (0.41.0, ajuste del
 * cliente: estaba repetida en las dos barras).
 */

/** Id de la sección inicial que se muestra al cargar el portal. */
export const SECCION_INICIO = 'inicio';

/** Opciones del menú fijo (barra institucional superior). "Inicio" abre
    la portada del portal (petición del cliente 2026-08-29, como en el
    observatorio del Ceplan). */
export const OPCIONES_NAV_FIJO = [
  { id: SECCION_INICIO, etiqueta: 'Inicio' },
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

/**
 * Los índices del eje "Indicadores". Misma estructura que las tendencias:
 * el `slug` nombrará su carpeta en `public/data/indicadores/<slug>/`.
 */
export const INDICADORES = [
  { id: 'indicadores-vida-mejor-ocde', etiqueta: 'Una vida mejor OCDE', slug: 'vida-mejor-ocde' },
  {
    id: 'indicadores-felicidad-nacional-bruta',
    etiqueta: 'Felicidad nacional bruta',
    slug: 'felicidad-nacional-bruta',
  },
  { id: 'indicadores-capital-humano-wb', etiqueta: 'Capital humano (WB)', slug: 'capital-humano-wb' },
  { id: 'indicadores-desempeno-ambiental', etiqueta: 'Desempeño ambiental', slug: 'desempeno-ambiental' },
  { id: 'indicadores-calidad-vida-digital', etiqueta: 'Calidad vida digital', slug: 'calidad-vida-digital' },
];

/** Opciones del menú desplegable (ejes temáticos del Observatorio). */
export const OPCIONES_NAV_DESPLEGABLE = [
  { id: 'tendencias', etiqueta: 'Tendencias', subOpciones: TENDENCIAS },
  { id: 'indicadores', etiqueta: 'Indicadores', subOpciones: INDICADORES },
  { id: 'factores-de-cambio', etiqueta: 'Factores de cambio' },
  { id: 'riesgos-y-oportunidades', etiqueta: 'Riesgos y oportunidades' },
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

/**
 * Indica si un id corresponde a una sección del portal. Permite mostrar
 * el módulo 404 ante cualquier sección desconocida.
 */
export function existeSeccion(idSeccion) {
  return ETIQUETAS_SECCIONES.has(idSeccion);
}
