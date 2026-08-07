/**
 * GraficaOcde — Envoltorio de figura Plotly para el módulo del Índice OCDE.
 *
 * Los cuatro bloques del módulo comparten el mismo tratamiento, así que en
 * lugar de un componente por gráfica se usa este, parametrizado con la
 * figura ya construida por `vidaMejorFiguras`:
 *   - la figura se expone como imagen etiquetada y, junto a ella, una tabla
 *     oculta visualmente entrega los mismos datos a lectores de pantalla;
 *   - en pantallas angostas la figura conserva su composición y se recorre
 *     con desplazamiento horizontal dentro de su tarjeta, con aviso de
 *     texto y barra de marca visibles;
 *   - el envoltorio es enfocable, de modo que ese recorrido también se
 *     puede hacer con el teclado.
 */
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist-min';
import './grafica-ocde.css';

const Plot = createPlotlyComponent(Plotly);

function GraficaOcde({ figura, etiquetaAccesible, tabla }) {
  const alto = figura.layout.height;

  return (
    <div className="grafica-ocde">
      <p className="grafica-ocde__indicacion">
        Desplace la gráfica hacia los lados para verla completa.
      </p>

      <div
        className="grafica-ocde__envoltorio"
        style={{ height: alto }}
        role="img"
        aria-label={`${etiquetaAccesible}; los datos detallados están en la tabla siguiente`}
        tabIndex={0}
      >
        <Plot
          className="grafica-ocde__figura"
          data={figura.data}
          layout={figura.layout}
          config={{ displayModeBar: false, responsive: true }}
          useResizeHandler
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Equivalente accesible de la figura. El envoltorio oculto es un div
          porque las tablas tratan su ancho como mínimo y desbordarían el
          documento. */}
      <div className="oculto-accesible">
        <table>
          <caption>{tabla.titulo}</caption>
          <thead>
            <tr>
              {tabla.columnas.map((columna) => (
                <th key={columna} scope="col">
                  {columna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tabla.filas.map((fila) => (
              <tr key={String(fila[0])}>
                <th scope="row">{fila[0]}</th>
                {fila.slice(1).map((celda, indice) => (
                  <td key={`${fila[0]}-${tabla.columnas[indice + 1]}`}>{celda}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GraficaOcde;
