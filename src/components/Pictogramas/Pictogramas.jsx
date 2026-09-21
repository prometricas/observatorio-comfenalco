/**
 * Pictogramas — Trazos SVG de las secciones del portal.
 *
 * Un solo catálogo de dibujos de línea (lienzo 64×64, trazo con el stroke
 * del contenedor) que comparten tres usos:
 *   - `IconoPictograma`: icono pequeño con círculo de fondo (tarjetas del
 *     inicio y tablero de la portada de Indicadores).
 *   - `FondoModulo`: el mismo pictograma, gigante y muy claro, como marca
 *     de agua de fondo de la sección activa (0.42.0).
 * Estilo de los accesos del portal institucional de Comfenalco Antioquia:
 * líneas redondeadas, sin rellenos, sobre un círculo de fondo desplazado.
 *
 * Las claves son ids del catálogo de navegación (`src/data/navegacion.js`).
 * Los cinco indicadores tienen pictograma PROPIO (0.44.0: globo, caras
 * sonrientes, birrete, árbol, teléfono con señal); las demás subsecciones
 * (tendencias-*) heredan el de su eje a través de `resolverPictograma`.
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
  /* Globo terráqueo: bienestar comparado entre países (OCDE) */
  'indicadores-vida-mejor-ocde': (
    <>
      <circle cx="36" cy="32" r="20" />
      <ellipse cx="36" cy="32" rx="8.5" ry="20" />
      <path d="M16 32h40M19.5 22h33M19.5 42h33" />
    </>
  ),
  /* Caras sonrientes: felicidad nacional bruta */
  'indicadores-felicidad-nacional-bruta': (
    <>
      <circle cx="30" cy="28" r="15" />
      <circle cx="25" cy="25" r="1.6" />
      <circle cx="35" cy="25" r="1.6" />
      <path d="M23 33q7 7 14 0" />
      <circle cx="52" cy="44" r="8" />
      <circle cx="49.5" cy="42.5" r="1.1" />
      <circle cx="54.5" cy="42.5" r="1.1" />
      <path d="M48.5 46.5q3.5 3.5 7 0" />
    </>
  ),
  /* Birrete: capital humano (salud y educación) */
  'indicadores-capital-humano-wb': (
    <>
      <path d="M36 13l24 10-24 10-24-10z" />
      <path d="M22 27v10c0 4.5 6.5 8 14 8s14-3.5 14-8V27" />
      <path d="M60 23v13" />
      <circle cx="60" cy="38.5" r="2.5" />
    </>
  ),
  /* Árbol: desempeño ambiental */
  'indicadores-desempeno-ambiental': (
    <>
      <path d="M36 10c-10 0-17 8-17 17 0 6 3.5 10.5 9 12.5h16c5.5-2 9-6.5 9-12.5 0-9-7-17-17-17z" />
      <path d="M36 54V30M36 38l-6-5M36 34l6-5" />
      <path d="M24 54h24" />
    </>
  ),
  /* Teléfono con señal: calidad de vida digital */
  'indicadores-calidad-vida-digital': (
    <>
      <rect x="20" y="8" width="24" height="46" rx="4" />
      <path d="M29 14h6" />
      <circle cx="32" cy="47" r="2" />
      <path d="M50 24a9 9 0 0 1 0 14M55 19a15 15 0 0 1 0 24" />
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
};

/**
 * Devuelve la clave del pictograma de una sección, o null si no tiene
 * (p. ej. el inicio, que ya lleva el banner). Las subsecciones sin dibujo
 * propio (`tendencias-envejecimiento`…) heredan el pictograma del eje.
 */
export function resolverPictograma(idSeccion) {
  if (!idSeccion) return null;
  if (TRAZOS_PICTOGRAMAS[idSeccion]) return idSeccion;
  const raiz = idSeccion.split('-')[0];
  return TRAZOS_PICTOGRAMAS[raiz] ? raiz : null;
}
