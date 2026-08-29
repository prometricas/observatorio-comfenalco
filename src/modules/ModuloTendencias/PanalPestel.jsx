/**
 * PanalPestel — Panal hexagonal del marco PESTEL (portada del eje
 * Tendencias).
 *
 * Seis hexágonos de punta arriba dispuestos en anillo alrededor de un
 * centro vacío (composición del referente del cliente), uno por dimensión
 * del marco. Cada hexágono es un BOTÓN nativo posicionado por porcentaje
 * dentro de un contenedor con relación de aspecto fija, así el panal
 * escala completo en cualquier ancho sin recalcular geometría. La figura
 * interior es un SVG decorativo (borde discontinuo y relleno tenue del
 * color de la dimensión, con trazo de grosor constante); el nombre va en
 * un rótulo HTML superpuesto con el color AA de la dimensión.
 *
 * La selección se comporta como en la rueda de factores: un clic
 * selecciona (aria-pressed), el segundo deselecciona, y las dimensiones
 * no seleccionadas se atenúan. El orden del DOM —y de tabulación— es el
 * del acrónimo PESTEL, no el visual del anillo.
 */
import { DIMENSIONES_PESTEL } from '../../data/pestel-tendencias.js';

/* Lienzo de referencia del panal: 100 unidades de ancho × 108 de alto
   (la relación de aspecto del contenedor). Hexágono de punta arriba:
   alto = ancho / (√3/2). */
const ANCHO_HEX = 34;
const ALTO_LIENZO = 108;
const ALTO_HEX = ANCHO_HEX / 0.866;

/* Centro de cada hexágono en el lienzo: anillo alrededor del centro
   (50, 54), con Social arriba y Tecnológica abajo como en el referente. */
const CENTROS = {
  social: [50, 23],
  ecologica: [76.8, 38.5],
  economica: [76.8, 69.5],
  tecnologica: [50, 85],
  politica: [23.2, 69.5],
  legal: [23.2, 38.5],
};

/* Vértices del hexágono de punta arriba (viewBox 866×1000, con margen
   interior para que el trazo no se recorte). */
const PUNTOS_HEXAGONO = '433,10 856,254 856,746 433,990 10,746 10,254';

function PanalPestel({ seleccionId, onSeleccionar }) {
  return (
    <div
      className="modulo-tendencias__panal"
      role="group"
      aria-label="Dimensiones del marco PESTEL"
    >
      {DIMENSIONES_PESTEL.map((dimension) => {
        const [cx, cy] = CENTROS[dimension.id];
        const activa = seleccionId === dimension.id;
        const atenuada = Boolean(seleccionId) && !activa;
        return (
          <button
            key={dimension.id}
            type="button"
            className={`modulo-tendencias__hex${
              activa ? ' modulo-tendencias__hex--activo' : ''
            }${atenuada ? ' modulo-tendencias__hex--atenuado' : ''}`}
            style={{
              '--pt-color': dimension.color,
              '--pt-texto': dimension.colorTexto,
              left: `${cx - ANCHO_HEX / 2}%`,
              top: `${((cy - ALTO_HEX / 2) / ALTO_LIENZO) * 100}%`,
              width: `${ANCHO_HEX}%`,
              height: `${(ALTO_HEX / ALTO_LIENZO) * 100}%`,
            }}
            aria-pressed={activa}
            onClick={() => onSeleccionar(dimension.id)}
          >
            <svg
              className="modulo-tendencias__hex-figura"
              viewBox="0 0 866 1000"
              aria-hidden="true"
              focusable="false"
            >
              <polygon
                className="modulo-tendencias__hex-borde"
                points={PUNTOS_HEXAGONO}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="modulo-tendencias__hex-nombre">{dimension.nombre}</span>
          </button>
        );
      })}
      {/* Rótulo decorativo del centro del anillo */}
      <span className="modulo-tendencias__panal-centro" aria-hidden="true">
        PESTEL
      </span>
    </div>
  );
}

export default PanalPestel;
