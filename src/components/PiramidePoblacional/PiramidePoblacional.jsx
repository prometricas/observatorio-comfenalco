/**
 * PiramidePoblacional — Gráfica de pirámide poblacional relativa.
 *
 * Wrapper de react-plotly.js ligado al bundle básico de Plotly.js (los
 * tipos de gráfica necesarios, mucho más liviano que el completo). Plotly
 * de Python y Plotly.js comparten motor de renderizado, así que esta
 * gráfica es la misma del cuaderno original de Colab.
 *
 * Recibe la fila del panel de población ya cargada (búsqueda por código
 * DANE hecha por el módulo padre) y delega el cálculo de rangos etarios y
 * la construcción de la figura en piramideService. Si el año no tiene
 * datos válidos para el departamento, muestra un aviso en lugar de la
 * gráfica.
 *
 * Accesibilidad: la gráfica se expone como imagen etiquetada y, junto a
 * ella, una tabla oculta visualmente entrega los mismos porcentajes por
 * rango etario a los lectores de pantalla.
 */
import { useMemo } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist-min';
import {
  agruparEdadesRelativas,
  construirFiguraPiramide,
} from '../../services/piramideService.js';
import './piramide-poblacional.css';

/* Componente Plot ligado al bundle básico de Plotly. */
const Plot = createPlotlyComponent(Plotly);

function PiramidePoblacional({ fila, nombreDepartamento, anio }) {
  /* Grupos etarios y figura; solo se reconstruyen si cambian los datos.
     null cuando no hay fila o el total del Excel no es válido. */
  const resultado = useMemo(() => {
    const grupos = agruparEdadesRelativas(fila);
    if (!grupos) return null;
    return { grupos, figura: construirFiguraPiramide(grupos, nombreDepartamento, anio) };
  }, [fila, nombreDepartamento, anio]);

  /* Año sin datos válidos para el departamento (caso borde del Excel). */
  if (!resultado) {
    return (
      <p className="piramide-poblacional__aviso" role="status">
        Sin datos de población para {nombreDepartamento} en {anio}.
      </p>
    );
  }

  return (
    <div className="piramide-poblacional">
      <div
        className="piramide-poblacional__grafica-envoltorio"
        role="img"
        aria-label={`Pirámide poblacional relativa de ${nombreDepartamento} en ${anio}; los datos detallados están en la tabla siguiente`}
      >
        <Plot
          className="piramide-poblacional__grafica"
          data={resultado.figura.data}
          layout={resultado.figura.layout}
          config={{ displayModeBar: false, responsive: true }}
          useResizeHandler
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Equivalente accesible de la gráfica para lectores de pantalla.
          El envoltorio oculto es un div porque las tablas tratan el ancho
          como mínimo y desbordarían el documento. */}
      <div className="oculto-accesible">
        <table>
          <caption>
            Pirámide poblacional relativa de {nombreDepartamento} en {anio},
            porcentajes sobre la población total
          </caption>
          <thead>
            <tr>
              <th scope="col">Rango de edad</th>
              <th scope="col">Hombres</th>
              <th scope="col">Mujeres</th>
            </tr>
          </thead>
          <tbody>
            {resultado.grupos.map((grupo) => (
              <tr key={grupo.rango}>
                <th scope="row">{grupo.rango}</th>
                <td>{grupo.hombresPorcentaje.toFixed(2)}%</td>
                <td>{grupo.mujeresPorcentaje.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PiramidePoblacional;
