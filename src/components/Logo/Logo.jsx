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
 * Desde 0.41.0 el imagotipo es un ENLACE al portal institucional de
 * Comfenalco Antioquia (petición del cliente), que se abre en una pestaña
 * nueva para no sacar al visitante del Observatorio; el texto oculto se
 * lo anuncia a los lectores de pantalla.
 *
 * Reglas del manual de marca: no distorsionar, no rotar, no cambiar
 * colores, sin degradados ni sombras. Por eso el CSS fija solo la ALTURA
 * y deja el ancho automático (`width`/`height` intrínsecos declarados para
 * reservar el espacio sin saltos de maquetación), y en la cabecera el
 * contenedor lleva `flex-shrink: 0`.
 */
import imagotipo from '../../assets/logo/comfenalco-antioquia.webp';
import './logo.css';

/** Portal institucional al que enlaza el imagotipo. */
export const URL_COMFENALCO_ANTIOQUIA = 'https://www.comfenalcoantioquia.com.co/personas';

function Logo() {
  return (
    <a className="logo" href={URL_COMFENALCO_ANTIOQUIA} target="_blank" rel="noreferrer">
      <img
        className="logo__imagen"
        src={imagotipo}
        alt="Comfenalco Antioquia"
        width="1600"
        height="542"
        decoding="async"
      />
      <span className="oculto-accesible">
        Ir al portal de Comfenalco Antioquia (se abre en una pestaña nueva)
      </span>
    </a>
  );
}

export default Logo;
