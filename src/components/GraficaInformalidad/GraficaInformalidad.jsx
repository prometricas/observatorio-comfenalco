/**
 * GraficaInformalidad — Serie de tasa de informalidad laboral por ciudad.
 *
 * Wrapper de react-plotly.js (bundle básico) para la figura del cuaderno
 * de informalidad: histórico DANE-GEIH 2007–2025, dato parcial 2026 y
 * proyección Lee-Carter 2026–2042 con banda de confianza del 95 %. La
 * construcción de la figura vive en informalidadService.
 *
 * La base cubre las 23 ciudades principales: recibe la ciudad que
 * corresponde al departamento seleccionado (catálogo de informalidad) y,
 * si el departamento no tiene ciudad en la base, lo informa con un aviso.
 *
 * Accesibilidad: la gráfica se expone como imagen etiquetada y, junto a
 * ella, una tabla oculta visualmente entrega la serie completa (año, tasa
 * e intervalo de confianza) a los lectores de pantalla.
 */
import { useMemo } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist-min';
import {
  construirFiguraInformalidad,
  NOTA_METODOLOGICA,
  obtenerVectoresCiudad,
} from '../../services/informalidadService.js';
import './grafica-informalidad.css';

/* Componente Plot ligado al bundle básico de Plotly. */
const Plot = createPlotlyComponent(Plotly);

function GraficaInformalidad({ panel, nombreCiudad, nombreDepartamento }) {
  /* Vectores y figura; solo se reconstruyen si cambia la ciudad o el panel. */
  const resultado = useMemo(() => {
    if (!nombreCiudad) return null;
    const vectores = obtenerVectoresCiudad(panel, nombreCiudad);
    if (!vectores) return null;
    return { vectores, figura: construirFiguraInformalidad(vectores, nombreCiudad) };
  }, [panel, nombreCiudad]);

  /* Departamento sin ciudad en la base, o ciudad sin serie completa. */
  if (!resultado) {
    return (
      <p className="grafica-informalidad__aviso" role="status">
        {nombreCiudad
          ? `Sin datos de informalidad para ${nombreCiudad}.`
          : `La base de informalidad cubre las 23 ciudades principales del país y aún no incluye datos para ${nombreDepartamento}.`}
      </p>
    );
  }

  const { vectores } = resultado;

  return (
    <div className="grafica-informalidad">
      {/* En pantallas angostas la figura conserva su composición y se
          recorre con desplazamiento horizontal dentro de la tarjeta;
          tabIndex permite recorrerla también con teclado. */}
      <div
        className="grafica-informalidad__envoltorio"
        role="img"
        aria-label={`Tasa de informalidad laboral de ${nombreCiudad}: histórico, dato parcial y proyección; los datos detallados están en la tabla siguiente`}
        tabIndex={0}
      >
        <Plot
          className="grafica-informalidad__grafica"
          data={resultado.figura.data}
          layout={resultado.figura.layout}
          config={{ displayModeBar: false, responsive: true }}
          useResizeHandler
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Nota metodológica del cuaderno, como texto legible y accesible
          (fuera del lienzo para cumplir el contraste AA del portal) */}
      <p className="grafica-informalidad__nota">{NOTA_METODOLOGICA}</p>

      {/* Equivalente accesible de la gráfica para lectores de pantalla.
          El envoltorio oculto es un div porque las tablas tratan el ancho
          como mínimo y desbordarían el documento. */}
      <div className="oculto-accesible">
        <table>
          <caption>
            Tasa de informalidad laboral de {nombreCiudad}: serie histórica,
            dato parcial y proyección con intervalo de confianza del 95 %
          </caption>
          <thead>
            <tr>
              <th scope="col">Año</th>
              <th scope="col">Tasa</th>
              <th scope="col">Serie</th>
              <th scope="col">IC 95 % inferior</th>
              <th scope="col">IC 95 % superior</th>
            </tr>
          </thead>
          <tbody>
            {vectores.aniosHistoricos.map((anio, indice) => (
              <tr key={anio}>
                <th scope="row">{anio}</th>
                <td>{vectores.historico[indice].toFixed(1)}%</td>
                <td>Histórico</td>
                <td>—</td>
                <td>—</td>
              </tr>
            ))}
            {vectores.parcial !== null && (
              <tr>
                <th scope="row">{vectores.anioParcial}</th>
                <td>{vectores.parcial.toFixed(1)}%</td>
                <td>Dato parcial enero a marzo</td>
                <td>—</td>
                <td>—</td>
              </tr>
            )}
            {vectores.aniosProyeccion.map((anio, indice) => (
              <tr key={`proyeccion-${anio}`}>
                <th scope="row">{anio}</th>
                <td>{vectores.proyeccion[indice].toFixed(2)}%</td>
                <td>Proyección</td>
                <td>{(vectores.icInferior[indice] ?? 0).toFixed(2)}%</td>
                <td>{(vectores.icSuperior[indice] ?? 0).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GraficaInformalidad;
