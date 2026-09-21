/**
 * IconoInicio — Pictogramas de las tarjetas de la portada.
 *
 * Estilo de los accesos del portal institucional de Comfenalco Antioquia
 * (petición del cliente 2026-09-21): dibujo de línea sobre un círculo de
 * fondo gris desplazado abajo-izquierda; al pasar el puntero o enfocar la
 * tarjeta, el círculo pasa a verde pistacho claro y el trazo a verde
 * oscuro (dos tonos de verde). El cambio de color lo dicta la tarjeta a
 * través de las variables `--icono-inicio-fondo` y `--icono-inicio-trazo`
 * (contrato en modulo-inicio.css), así el icono no conoce a su contenedor.
 *
 * Los seis dibujos son SVG propios (sin librerías) en un lienzo de 64×64,
 * decorativos (aria-hidden): el nombre de la sección ya va en el título de
 * la tarjeta.
 */
import './icono-inicio.css';

/* Trazos de cada pictograma, por id de sección del catálogo de navegación */
const TRAZOS = {
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
};

function IconoInicio({ id }) {
  const trazo = TRAZOS[id];
  if (!trazo) return null;

  return (
    <span className="icono-inicio" aria-hidden="true">
      <svg className="icono-inicio__dibujo" viewBox="0 0 64 64" focusable="false">
        <circle className="icono-inicio__fondo" cx="26" cy="40" r="22" />
        <g
          className="icono-inicio__trazo"
          fill="none"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {trazo}
        </g>
      </svg>
    </span>
  );
}

export default IconoInicio;
