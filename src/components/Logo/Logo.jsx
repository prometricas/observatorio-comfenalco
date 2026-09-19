/**
 * Logo — Imagotipo oficial de Comfenalco Antioquia.
 *
 * Componente aislado a propósito: es el ÚNICO lugar del portal que conoce
 * el archivo del imagotipo, así que un cambio de marca se resuelve aquí
 * sin tocar el resto. La imagen es el imagotipo entregado por el cliente
 * (2026-09-19), preparado como WebP sin pérdida con fondo transparente a
 * 1600 px de ancho (nítido en pantallas de alta densidad); viaja con hash
 * en el nombre, así que el navegador lo cachea de forma inmutable.
 *
 * Reglas del manual de marca: no distorsionar, no rotar, no cambiar
 * colores, sin degradados ni sombras. Por eso el CSS fija solo la ALTURA
 * y deja el ancho automático (`width`/`height` intrínsecos declarados para
 * reservar el espacio sin saltos de maquetación), y en la cabecera el
 * contenedor lleva `flex-shrink: 0`.
 */
import imagotipo from '../../assets/logo/comfenalco-antioquia.webp';
import './logo.css';

function Logo() {
  return (
    <span className="logo">
      <img
        className="logo__imagen"
        src={imagotipo}
        alt="Comfenalco Antioquia"
        width="1600"
        height="542"
        decoding="async"
      />
    </span>
  );
}

export default Logo;
