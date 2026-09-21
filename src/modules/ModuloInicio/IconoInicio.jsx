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
 * Los trazos viven en el catálogo compartido `Pictogramas` (también los
 * usa el fondo de cada módulo); aquí solo se componen con el círculo.
 * Decorativo (aria-hidden): el nombre de la sección ya va en el título.
 */
import { TRAZOS_PICTOGRAMAS } from '../../components/Pictogramas/Pictogramas.jsx';
import './icono-inicio.css';

function IconoInicio({ id }) {
  const trazo = TRAZOS_PICTOGRAMAS[id];
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
