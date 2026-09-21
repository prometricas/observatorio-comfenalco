/**
 * IconoPictograma — Pictograma de una sección con su círculo de fondo.
 *
 * Estilo de los accesos del portal institucional de Comfenalco Antioquia
 * (petición del cliente 2026-09-21): dibujo de línea sobre un círculo de
 * fondo gris desplazado abajo-izquierda; al pasar el puntero o enfocar la
 * tarjeta que lo contiene, el círculo pasa a verde pistacho claro y el
 * trazo a verde oscuro (dos tonos de verde). El cambio de color lo dicta
 * el contenedor a través de las variables `--icono-pictograma-fondo` y
 * `--icono-pictograma-trazo` (contrato en el CSS de cada tarjeta), así el
 * icono no conoce a quien lo usa. Lo usan las tarjetas del inicio y el
 * tablero de la portada de Indicadores (0.44.0; antes IconoInicio).
 *
 * Los trazos viven en el catálogo compartido `Pictogramas` (también los
 * usa el fondo de cada módulo). Decorativo (aria-hidden): el nombre de la
 * sección ya va en el título de la tarjeta.
 */
import { TRAZOS_PICTOGRAMAS } from './Pictogramas.jsx';
import './icono-pictograma.css';

function IconoPictograma({ id }) {
  const trazo = TRAZOS_PICTOGRAMAS[id];
  if (!trazo) return null;

  return (
    <span className="icono-pictograma" aria-hidden="true">
      <svg className="icono-pictograma__dibujo" viewBox="0 0 64 64" focusable="false">
        <circle className="icono-pictograma__fondo" cx="26" cy="40" r="22" />
        <g
          className="icono-pictograma__trazo"
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

export default IconoPictograma;
