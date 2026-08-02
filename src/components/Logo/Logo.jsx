/**
 * Logo — Marcador de posición del imagotipo de Comfenalco Antioquia.
 *
 * Componente aislado a propósito: cuando Comfenalco entregue el SVG oficial
 * del imagotipo, el reemplazo se hace únicamente en este archivo sin tocar
 * el resto del portal. Mientras tanto muestra un símbolo genérico con los
 * dos verdes de marca y el nombre de la caja.
 *
 * Reglas de marca a respetar cuando llegue el oficial: no distorsionar,
 * no rotar, no cambiar colores, sin degradados ni sombras.
 */
import './logo.css';

function Logo() {
  return (
    <span className="logo">
      {/* Símbolo genérico provisional (dos círculos con los verdes de marca) */}
      <svg
        className="logo__simbolo"
        viewBox="0 0 48 48"
        aria-hidden="true"
        focusable="false"
      >
        <circle className="logo__circulo-pistacho" cx="19" cy="24" r="13" />
        <circle className="logo__circulo-verde" cx="32" cy="24" r="11" />
      </svg>

      {/* Nombre de la caja de compensación junto al símbolo */}
      <span className="logo__texto">
        <span className="logo__nombre">Comfenalco</span>
        <span className="logo__region">Antioquia</span>
      </span>
    </span>
  );
}

export default Logo;
