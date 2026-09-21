/**
 * FondoModulo — Fondo decorativo del portal según la sección activa.
 *
 * Capa FIJA detrás de todo el contenido (0.42.0, petición del cliente: los
 * fondos planos en blanco se sentían pobres): un degradado muy leve de
 * blanco a verde tenue —guiño al portal de Comfenalco Antioquia— con un
 * halo pistacho arriba a la derecha, y encima el pictograma de la sección
 * activa, gigante y muy claro, como marca de agua (mismo catálogo
 * `Pictogramas` que los iconos de la portada). El inicio no lleva
 * pictograma: su banner ya carga la identidad visual.
 *
 * Decisiones:
 * - `position: fixed` + `z-index: -1` (en el contexto raíz) en vez de un
 *   fondo en `main`: así no hace falta `overflow: hidden` en el contenedor
 *   principal, que rompería los paneles pegajosos (tabla de contenido,
 *   panel de la rueda de factores).
 * - `key` en el SVG: al cambiar de sección el pictograma vuelve a entrar
 *   con un fundido corto; con movimiento reducido aparece sin animación.
 * - Es puramente decorativo (aria-hidden, sin eventos de puntero) y el
 *   texto conserva su contraste: el trazo va al 8 % de opacidad.
 */
import { resolverPictograma, TRAZOS_PICTOGRAMAS } from '../Pictogramas/Pictogramas.jsx';
import './fondo-modulo.css';

function FondoModulo({ seccion }) {
  const idPictograma = resolverPictograma(seccion);

  return (
    <div className="fondo-modulo" aria-hidden="true">
      {idPictograma && (
        <svg
          key={idPictograma}
          className="fondo-modulo__pictograma"
          viewBox="0 0 64 64"
          focusable="false"
        >
          <circle className="fondo-modulo__circulo" cx="26" cy="40" r="22" />
          <g
            className="fondo-modulo__trazo"
            fill="none"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {TRAZOS_PICTOGRAMAS[idPictograma]}
          </g>
        </svg>
      )}
    </div>
  );
}

export default FondoModulo;
