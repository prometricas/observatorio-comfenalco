/**
 * Cargador — Indicador circular de carga del portal.
 *
 * Componente único que señala cualquier espera del portal (descarga de un
 * módulo, lectura de un Excel, interpretación de un documento Word), para
 * que en conexiones lentas o equipos modestos la persona usuaria sepa que
 * el contenido está en camino.
 *
 * Accesibilidad: el conjunto es una región de estado (`role="status"`), de
 * modo que los lectores de pantalla anuncian el mensaje sin interrumpir; el
 * círculo es decorativo y el texto porta el significado. La animación se
 * ralentiza cuando el sistema pide movimiento reducido.
 *
 * @param {string} mensaje Texto visible junto al círculo.
 * @param {'pequeno'|'mediano'|'grande'} tamano Tamaño del círculo.
 * @param {boolean} enBloque Centra el cargador en el espacio disponible,
 *        para cuando ocupa el lugar de un contenido completo.
 */
import './cargador.css';

function Cargador({ mensaje = 'Cargando…', tamano = 'mediano', enBloque = false }) {
  return (
    <div className={`cargador${enBloque ? ' cargador--bloque' : ''}`} role="status">
      <span
        className={`cargador__circulo cargador__circulo--${tamano}`}
        aria-hidden="true"
      />
      <span className="cargador__mensaje">{mensaje}</span>
    </div>
  );
}

export default Cargador;
