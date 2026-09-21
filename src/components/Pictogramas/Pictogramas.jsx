/**
 * Pictogramas — Trazos SVG de las secciones del portal.
 *
 * Un solo catálogo de dibujos de línea (lienzo 64×64, trazo con
 * `currentColor`/stroke del contenedor) que comparten dos usos:
 *   - `IconoInicio`: el icono pequeño de cada tarjeta de la portada.
 *   - `FondoModulo`: el mismo pictograma, gigante y muy claro, como marca
 *     de agua de fondo de la sección activa (0.42.0).
 * Estilo de los accesos del portal institucional de Comfenalco Antioquia:
 * líneas redondeadas, sin rellenos, sobre un círculo de fondo desplazado.
 *
 * Las claves son ids del catálogo de navegación (`src/data/navegacion.js`).
 * Las subsecciones (tendencias-*, indicadores-*) heredan el pictograma de
 * su eje a través de `resolverPictograma`.
 */

export const TRAZOS_PICTOGRAMAS = {
  /* Línea de tendencia ascendente con flecha */
  tendencias: (
    <>
      <path d="M14 14v36h38" />
      <path d="M20 42l9-11 8 7 15-17" />
      <path d="M44 21h8v8" />
    </>
  ),
  /* Medidor semicircular con aguja */
  indicadores: (
    <>
      <path d="M16 46a20 20 0 0 1 40 0" />
      <path d="M20 34l3 1.5M36 22v3.5M52 34l-3 1.5" />
      <path d="M36 46l10-13" />
      <circle cx="36" cy="46" r="3" />
    </>
  ),
  /* Rueda de tres anillos (dimensiones, componentes, factores) */
  'factores-de-cambio': (
    <>
      <circle cx="36" cy="32" r="20" />
      <circle cx="36" cy="32" r="13" />
      <circle cx="36" cy="32" r="5" />
      <path d="M36 12v7M36 45v7M16 32h7M49 32h7" />
    </>
  ),
  /* Cronología: eje con tres hitos */
  'linea-de-tiempo': (
    <>
      <path d="M12 34h48" />
      <circle cx="21" cy="34" r="4" />
      <circle cx="36" cy="34" r="4" />
      <circle cx="51" cy="34" r="4" />
      <path d="M21 30v-9h9M36 38v9h9M51 30v-9h5" />
    </>
  ),
  /* Barras comparativas sobre una base */
  benchmarking: (
    <>
      <path d="M14 52h44" />
      <rect x="19" y="30" width="9" height="22" rx="1.5" />
      <rect x="32" y="18" width="9" height="34" rx="1.5" />
      <rect x="45" y="38" width="9" height="14" rx="1.5" />
      <path d="M19 24l9-5 9 3 9-8" />
    </>
  ),
  /* Bombilla: ideas del Tanque de pensamiento */
  'tanques-de-pensamiento': (
    <>
      <path d="M36 12a12 12 0 0 1 7 21.7c-1.5 1.3-2.5 3.3-2.5 5.3h-9c0-2-1-4-2.5-5.3A12 12 0 0 1 36 12z" />
      <path d="M31.5 44h9M32.5 48.5h7" />
      <path d="M36 4v3M20 13l2 2M52 13l-2 2M14 28h3M55 28h3" />
    </>
  ),
  /* Ojo: la mirada del Observatorio */
  'el-observatorio': (
    <>
      <path d="M12 32c6-10 14-15 24-15s18 5 24 15c-6 10-14 15-24 15S18 42 12 32z" />
      <circle cx="36" cy="32" r="7" />
      <circle cx="36" cy="32" r="2.5" />
    </>
  ),
  /* Marcador de lugar: lectura territorial del IBIM */
  ibim: (
    <>
      <path d="M36 50c-8-9-13-15-13-22a13 13 0 0 1 26 0c0 7-5 13-13 22z" />
      <circle cx="36" cy="28" r="5" />
      <path d="M22 54h28" />
    </>
  ),
  /* Libro abierto: publicaciones */
  publicaciones: (
    <>
      <path d="M14 16h16c3 0 6 2 6 5v31c0-3-3-5-6-5H14z" />
      <path d="M58 16H42c-3 0-6 2-6 5v31c0-3 3-5 6-5h16z" />
    </>
  ),
  /* Balanza: riesgos y oportunidades */
  'riesgos-y-oportunidades': (
    <>
      <path d="M36 12v40M22 52h28M18 22h36" />
      <path d="M18 22l-8 16h16zM54 22l-8 16h16z" />
    </>
  ),
  /* Destello: innovación */
  innovacion: (
    <>
      <path d="M34 10l4 14 14 4-14 4-4 14-4-14-14-4 14-4z" />
      <path d="M52 40l1.5 5 5 1.5-5 1.5-1.5 5-1.5-5-5-1.5 5-1.5z" />
    </>
  ),
};

/**
 * Devuelve la clave del pictograma de una sección, o null si no tiene
 * (p. ej. el inicio, que ya lleva el banner). Las subsecciones de un eje
 * (`tendencias-envejecimiento`, `indicadores-vida-mejor-ocde`…) heredan
 * el pictograma del eje.
 */
export function resolverPictograma(idSeccion) {
  if (!idSeccion) return null;
  if (TRAZOS_PICTOGRAMAS[idSeccion]) return idSeccion;
  const raiz = idSeccion.split('-')[0];
  return TRAZOS_PICTOGRAMAS[raiz] ? raiz : null;
}
