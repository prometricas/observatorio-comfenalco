/**
 * MedidorIndicador — Medidor semicircular decorativo del tablero de
 * Indicadores.
 *
 * SVG de 180° con pista gris, arco de acento y aguja pivotada en el
 * centro. Es SIMBÓLICO y DECORATIVO (aria-hidden): no representa ningún
 * dato — la aguja reposa en una posición fija y se mueve al pasar el
 * puntero sobre la tarjeta (todo en la hoja de estilos). Sin script o
 * con movimiento reducido, el medidor aparece en su estado de reposo.
 */

/* Longitud del arco de 180° con radio 80 (π·r), para el dasharray. */
export const LARGO_ARCO = Math.PI * 80;

function MedidorIndicador() {
  return (
    <svg
      className="modulo-indicadores__medidor-figura"
      viewBox="0 0 200 116"
      aria-hidden="true"
      focusable="false"
    >
      {/* Pista completa del medidor */}
      <path
        className="modulo-indicadores__medidor-pista"
        d="M 20 100 A 80 80 0 0 1 180 100"
      />
      {/* Arco de acento: se llena hasta la fracción del indicador */}
      <path
        className="modulo-indicadores__medidor-arco"
        d="M 20 100 A 80 80 0 0 1 180 100"
        strokeDasharray={LARGO_ARCO}
      />
      {/* Aguja: dibujada hacia la izquierda (0 de la escala) y girada
          por CSS hasta la fracción */}
      <g className="modulo-indicadores__medidor-aguja">
        <line x1="100" y1="100" x2="46" y2="100" />
      </g>
      <circle className="modulo-indicadores__medidor-pivote" cx="100" cy="100" r="7" />
    </svg>
  );
}

export default MedidorIndicador;
