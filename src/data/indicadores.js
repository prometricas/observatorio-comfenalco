/**
 * indicadores.js — Configuración de contenido de cada indicador.
 *
 * Homólogo de `tendencias.js` para el eje "Indicadores". A diferencia de
 * las tendencias, que comparten un único módulo parametrizado, cada
 * indicador puede tener su propio módulo: sus bases no son comparables
 * entre sí (la de la OCDE es por país y no por departamento, de modo que
 * el mapa de Colombia no interviene).
 *
 * Por eso este catálogo indica, para cada slug, qué módulo lo atiende y
 * de qué archivo se alimenta. Los indicadores que aún no tienen datos no
 * aparecen aquí: el portal los resuelve como sección en construcción.
 */

/**
 * Comienzos de los títulos de sección del documento de resumen del eje
 * ("Resumen de indicadores Observatorio"). Cada indicador toma su sección
 * y corta donde empieza cualquiera de las demás (o las referencias). Se
 * comparan sin tildes ni signos, así que toleran retoques menores del
 * documento; si el cliente renombra una sección entera, debe actualizarse
 * aquí.
 */
export const TITULOS_RESUMEN_INDICADORES = [
  'Índice para una Vida Mejor',
  'Felicidad Nacional Bruta',
  'Capital humano',
  'Desempeño ambiental',
  'Calidad de vida digital',
  'Referencias',
];

/* Nombre del documento de resumen compartido por los cinco índices. */
const ARCHIVO_RESUMEN = 'resumen-indicadores.docx';

const CONFIGURACION_INDICADORES = {
  'vida-mejor-ocde': {
    modulo: 'vida-mejor',
    archivoExcel: 'base-vida-mejor.xlsx',
    archivoTexto: ARCHIVO_RESUMEN,
    tituloSeccion: 'Índice para una Vida Mejor',
  },
  'felicidad-nacional-bruta': {
    modulo: 'felicidad-nacional',
    archivoExcel: 'base-felicidad-nacional.xlsx',
    /* Documento propio del indicador (no una sección del resumen). */
    archivoTexto: 'felicidad-nacional-bruta.docx',
  },
  'capital-humano-wb': {
    modulo: 'capital-humano',
    archivoExcel: 'base-capital-humano.xlsx',
    /* Documento propio del indicador (no una sección del resumen). */
    archivoTexto: 'capital-humano.docx',
  },
  'desempeno-ambiental': {
    modulo: 'desempeno-ambiental',
    archivoExcel: 'base-desempeno-ambiental.xlsx',
    /* Documento propio del indicador (no una sección del resumen). */
    archivoTexto: 'desempeno-ambiental.docx',
  },
};

/** Ruta de la base de datos de un indicador dentro de public/data. */
export function rutaExcelIndicador(slugIndicador, archivoExcel) {
  return `${import.meta.env.BASE_URL}data/indicadores/${slugIndicador}/excel/${archivoExcel}`;
}

/** Configuración de un indicador a partir de su slug, o null si aún no tiene. */
export function obtenerConfiguracionIndicador(slugIndicador) {
  return CONFIGURACION_INDICADORES[slugIndicador] ?? null;
}
