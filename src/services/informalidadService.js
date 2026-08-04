/**
 * informalidadService — Puerto JavaScript del visualizador de informalidad.
 *
 * Reproduce 1:1 la figura del cuaderno de Colab "Tasa de Informalidad
 * Laboral — Colombia" (histórico DANE-GEIH 2007–2025, dato parcial 2026 y
 * proyección Lee-Carter 2026–2042 con banda de confianza del 95 %):
 * mismas trazas, anotaciones, líneas de referencia y textos. El selector
 * de ciudad del cuaderno no se porta porque en el portal esa función la
 * cumple el mapa (departamento → ciudad capital).
 *
 * Adaptaciones conscientes respecto al cuaderno (documentadas aquí; todo
 * lo demás es réplica exacta):
 * - Colores de marca Comfenalco en las series (Plotly no lee variables
 *   CSS): histórico verde oscuro, proyección verde medio, puente verde
 *   agua. El rojo del choque COVID y los neutros de ejes se conservan.
 * - Sin menú de ciudades (esa función la cumple el mapa del portal).
 * - Alto fijo de 560 px, ancho responsivo y tipografía Catamaran.
 * - La nota metodológica del pie NO va dentro del lienzo: se exporta como
 *   texto (NOTA_METODOLOGICA) y el componente la muestra como párrafo
 *   accesible bajo la gráfica — el gris de 8.5px del cuaderno no cumple
 *   el contraste AA que el portal exige. El margen inferior se reduce en
 *   consecuencia (112 → 76).
 * - Los rótulos de años (2042, Ene-Mar 2026, indicadores clave) se toman
 *   de la propia base, para tolerar archivos regenerados con más años.
 */

/* Colores de marca para las series. */
const COLOR_HISTORICO = '#005744';
const COLOR_PROYECCION = '#58b250';
const COLOR_BANDA_IC = 'rgba(88, 178, 80, 0.14)';
const COLOR_PUENTE = '#74c1a2';

/* Neutros del cuaderno para ejes, textos y anotaciones. */
const COLOR_TEXTO_EJES = '#37474F';
const COLOR_LINEA_EJES = '#CFD8DC';
const COLOR_ROJO_COVID = '#C62828';

const FUENTE_GRAFICA = "'Catamaran', 'Segoe UI', sans-serif";

/* Geometría interna del cuaderno adaptada al alto de la tarjeta (el
   margen inferior ya no reserva espacio para la nota metodológica). El
   alto se ajusta para que la tarjeta de la gráfica y la del mapa queden
   visualmente equilibradas. */
const ALTO_GRAFICA = 520;
const MARGEN_SUPERIOR = 68;
const MARGEN_INFERIOR = 76;
const ALTO_AREA = ALTO_GRAFICA - MARGEN_SUPERIOR - MARGEN_INFERIOR;
const Y_TITULO = 1 + (MARGEN_SUPERIOR - 32) / ALTO_AREA;

/**
 * Nota metodológica del cuaderno, palabra por palabra. El componente la
 * renderiza como párrafo bajo la gráfica (accesible y con contraste AA).
 */
export const NOTA_METODOLOGICA =
  'Fuente: DANE – GEIH. Histórico 2007–2024: anual; 2025: promedio ' +
  'trimestres móviles; 2026: dato parcial Ene-Mar. Proyección: Lee-Carter ' +
  '(1992), ARIMA(0,1,0) con deriva, var. SVD 99.1%, IC 95% Monte Carlo ' +
  '(10 000 réplicas).';

/* Estilo de los cuadros de anotación neutros (fondo blanco, borde gris). */
const ESTILO_ANOTACION = {
  bgcolor: 'rgba(255,255,255,0.94)',
  bordercolor: '#90A4AE',
  borderpad: 5,
  borderwidth: 1,
};

/**
 * Vectores de una ciudad tal como los usa la figura, o null si la serie
 * está incompleta. Réplica de `get_city_vectors` del cuaderno.
 */
export function obtenerVectoresCiudad(panel, nombreCiudad) {
  const ciudad = panel?.obtenerCiudad?.(nombreCiudad);
  const anios = panel?.anios;
  if (!ciudad || !anios) return null;

  const { historico, parcial, proyeccion, ic } = ciudad;
  if (historico.length === 0 || proyeccion.length === 0) return null;

  return {
    aniosHistoricos: anios.historicos,
    anioParcial: anios.anioParcial,
    aniosProyeccion: anios.proyeccion,
    historico,
    /* Una celda parcial vacía en un Excel regenerado no debe pintar "NaN%":
       sin dato parcial, la figura omite ese marcador y su anotación. */
    parcial: Number.isFinite(parcial) ? parcial : null,
    proyeccion,
    icInferior: ic.inferior,
    icSuperior: ic.superior,
    /* Segmento puente: del último dato histórico al primer proyectado. */
    puenteX: [anios.historicos[anios.historicos.length - 1], anios.proyeccion[0]],
    puenteY: [historico[historico.length - 1], proyeccion[0]],
  };
}

/* Textos de hover del histórico (con el choque COVID en 2020). */
const construirHoverHistorico = (ciudad, anios, valores) =>
  anios.map(
    (anio, indice) =>
      `<b>${ciudad}</b><br>Año: ${anio}<br>Informalidad: <b>${valores[indice].toFixed(1)}%</b><br>` +
      (anio === 2020 ? '<b style="color:#C62828">⚡ Choque COVID-19</b><br>' : '') +
      '<span style="color:#90A4AE"><i>Fuente: DANE – GEIH</i></span><extra></extra>',
  );

/* Textos de hover de la proyección (con su intervalo de confianza). */
const construirHoverProyeccion = (ciudad, anios, valores, inferior, superior) =>
  anios.map(
    (anio, indice) =>
      `<b>${ciudad}</b><br>Año: ${anio}<br>` +
      `Proyección central: <b>${valores[indice].toFixed(2)}%</b><br>` +
      `IC 95%: [${(inferior[indice] ?? 0).toFixed(2)}% – ${(superior[indice] ?? 0).toFixed(2)}%]<br>` +
      '<span style="color:#90A4AE"><i>Lee-Carter · ARIMA(0,1,0) con deriva</i></span>' +
      '<extra></extra>',
  );

/* Anotaciones que dependen de la ciudad (título, COVID, hitos y resumen). */
function construirAnotaciones(ciudad, vectores) {
  const { historico, proyeccion, parcial, icInferior, icSuperior } = vectores;
  const { aniosHistoricos, aniosProyeccion } = vectores;
  const finalInferior = icInferior[icInferior.length - 1] ?? 0;
  const finalSuperior = icSuperior[icSuperior.length - 1] ?? 0;

  /* Años de referencia tomados de la propia base (no de posiciones fijas),
     para tolerar archivos regenerados con más años históricos. */
  const anioInicial = aniosHistoricos[0];
  const anioUltimoHistorico = aniosHistoricos[aniosHistoricos.length - 1];
  const anioFinalProyeccion = aniosProyeccion[aniosProyeccion.length - 1];
  const indicePreCovid = aniosHistoricos.indexOf(2019);
  const indiceCovid = aniosHistoricos.indexOf(2020);
  const valorFinalProyeccion = proyeccion[proyeccion.length - 1];
  const deltaTotal = valorFinalProyeccion - historico[0];

  const anotaciones = [
    {
      x: 0,
      y: Y_TITULO,
      xref: 'paper',
      yref: 'paper',
      xanchor: 'left',
      yanchor: 'top',
      showarrow: false,
      text:
        `<b style="font-size:18px;color:${COLOR_HISTORICO}">` +
        `Tasa de Informalidad Laboral — ${ciudad}</b>`,
    },
    {
      x: aniosProyeccion[0],
      y: proyeccion[0],
      xref: 'x',
      yref: 'y',
      text: 'Inicio<br>proyección',
      showarrow: true,
      arrowhead: 2,
      arrowcolor: '#546E7A',
      arrowsize: 1.1,
      ax: -52,
      ay: -34,
      font: { size: 10, color: COLOR_TEXTO_EJES },
      ...ESTILO_ANOTACION,
    },
    {
      x: anioFinalProyeccion,
      y: valorFinalProyeccion,
      xref: 'x',
      yref: 'y',
      text:
        `<b>${anioFinalProyeccion}: ${valorFinalProyeccion.toFixed(1)}%</b><br>` +
        `[${finalInferior.toFixed(1)}% – ${finalSuperior.toFixed(1)}%]`,
      showarrow: true,
      arrowhead: 2,
      arrowcolor: '#546E7A',
      arrowsize: 1.1,
      ax: 10,
      ay: -46,
      font: { size: 10, color: COLOR_TEXTO_EJES },
      ...ESTILO_ANOTACION,
    },
  ];

  /* Choque COVID: solo si la base trae los años 2019 y 2020. */
  if (indiceCovid !== -1) {
    anotaciones.push({
      x: 2020,
      y: historico[indiceCovid],
      xref: 'x',
      yref: 'y',
      text: '⚡ COVID-19',
      showarrow: true,
      arrowhead: 2,
      arrowcolor: COLOR_ROJO_COVID,
      arrowsize: 1.2,
      ax: 36,
      ay: -44,
      font: { size: 10, color: COLOR_ROJO_COVID },
      bgcolor: 'rgba(255,235,238,0.94)',
      bordercolor: '#EF9A9A',
      borderpad: 4,
      borderwidth: 1,
    });
  }

  /* Dato parcial: solo si la celda del Excel trae un valor. */
  if (parcial !== null) {
    anotaciones.push({
      x: vectores.anioParcial,
      y: parcial,
      xref: 'x',
      yref: 'y',
      text: `Dato parcial<br>Ene-Mar ${vectores.anioParcial}:<br>${parcial.toFixed(1)}%`,
      showarrow: true,
      arrowhead: 2,
      arrowcolor: '#546E7A',
      arrowsize: 1,
      ax: 52,
      ay: -48,
      font: { size: 9, color: COLOR_TEXTO_EJES },
      ...ESTILO_ANOTACION,
    });
  }

  /* Cuadro de indicadores clave; las líneas de COVID solo si hay datos. */
  const lineasIndicadores = [
    '<b>Indicadores clave</b>',
    `${anioInicial}: ${historico[0].toFixed(1)}%`,
  ];
  if (indicePreCovid !== -1) {
    lineasIndicadores.push(`2019 (pre-COVID): ${historico[indicePreCovid].toFixed(1)}%`);
  }
  if (indiceCovid !== -1 && indicePreCovid !== -1) {
    const choqueCovid = historico[indiceCovid] - historico[indicePreCovid];
    lineasIndicadores.push(
      `2020 (COVID): ${historico[indiceCovid].toFixed(1)}% ` +
        `<b>(${choqueCovid >= 0 ? '+' : ''}${choqueCovid.toFixed(1)} pp)</b>`,
    );
  }
  lineasIndicadores.push(
    `${anioUltimoHistorico}: ${historico[historico.length - 1].toFixed(1)}%`,
    `${anioFinalProyeccion} (proyec.): ${valorFinalProyeccion.toFixed(1)}%`,
    `Δ ${anioInicial}–${anioFinalProyeccion}: ` +
      `<b>${deltaTotal >= 0 ? '+' : ''}${deltaTotal.toFixed(1)} pp</b>`,
  );

  anotaciones.push({
    x: 0.01,
    y: 0.02,
    xref: 'paper',
    yref: 'paper',
    xanchor: 'left',
    yanchor: 'bottom',
    showarrow: false,
    align: 'left',
    text: lineasIndicadores.join('<br>'),
    font: { size: 11, color: '#000000' },
    bgcolor: 'rgba(255,255,255,0.95)',
    bordercolor: '#B0BEC5',
    borderpad: 8,
    borderwidth: 1,
  });

  return anotaciones;
}

/**
 * Construye los traces y el layout Plotly de la serie de informalidad de
 * una ciudad, con la misma composición del cuaderno.
 * @returns {{data: object[], layout: object}}
 */
export function construirFiguraInformalidad(vectores, nombreCiudad) {
  const {
    aniosHistoricos,
    anioParcial,
    aniosProyeccion,
    historico,
    parcial,
    proyeccion,
    icInferior,
    icSuperior,
    puenteX,
    puenteY,
  } = vectores;

  const data = [
    {
      x: aniosProyeccion,
      y: icSuperior,
      mode: 'lines',
      line: { width: 0 },
      showlegend: false,
      hoverinfo: 'skip',
      name: '_ic_superior',
    },
    {
      x: aniosProyeccion,
      y: icInferior,
      mode: 'lines',
      fill: 'tonexty',
      fillcolor: COLOR_BANDA_IC,
      line: { width: 0 },
      name: 'IC 95%',
      hoverinfo: 'skip',
      showlegend: true,
      legendrank: 3,
    },
    {
      x: aniosHistoricos,
      y: historico,
      mode: 'lines+markers',
      name: 'Histórico DANE-GEIH',
      line: { color: COLOR_HISTORICO, width: 2.8, shape: 'spline', smoothing: 0.3 },
      marker: {
        color: COLOR_HISTORICO,
        size: 6,
        line: { color: 'white', width: 1.5 },
        symbol: 'circle',
      },
      hovertemplate: construirHoverHistorico(nombreCiudad, aniosHistoricos, historico),
      showlegend: true,
      legendrank: 1,
    },
    {
      x: puenteX,
      y: puenteY,
      mode: 'lines',
      name: '_puente',
      line: { color: COLOR_PUENTE, width: 1.5, dash: 'dot' },
      showlegend: false,
      hoverinfo: 'skip',
    },
    {
      x: aniosProyeccion,
      y: proyeccion,
      mode: 'lines+markers',
      name: 'Proyección Lee-Carter',
      line: { color: COLOR_PROYECCION, width: 2.8, dash: 'dash' },
      marker: {
        color: COLOR_PROYECCION,
        size: 6,
        line: { color: 'white', width: 1.5 },
        symbol: 'diamond',
      },
      hovertemplate: construirHoverProyeccion(
        nombreCiudad,
        aniosProyeccion,
        proyeccion,
        icInferior,
        icSuperior,
      ),
      showlegend: true,
      legendrank: 2,
    },
  ];

  /* Marcador del dato parcial: solo si la celda del Excel trae un valor. */
  if (parcial !== null) {
    data.splice(3, 0, {
      x: [anioParcial],
      y: [parcial],
      mode: 'markers',
      marker: {
        color: 'white',
        size: 11,
        line: { color: '#546E7A', width: 2.5 },
        symbol: 'circle-open',
      },
      hovertemplate:
        `<b>${nombreCiudad}</b><br>Obs. parcial Ene-Mar ${anioParcial}<br>` +
        `Tasa: <b>${parcial.toFixed(1)}%</b><br><i>No es promedio anual</i><extra></extra>`,
      showlegend: false,
      name: '_parcial',
    });
  }

  const layout = {
    title: null,
    paper_bgcolor: 'white',
    plot_bgcolor: 'white',
    height: ALTO_GRAFICA,
    margin: {
      t: MARGEN_SUPERIOR,
      b: MARGEN_INFERIOR,
      l: 72,
      r: 50,
    },
    font: { family: FUENTE_GRAFICA },
    xaxis: {
      title: null,
      showgrid: false,
      showline: true,
      linecolor: COLOR_LINEA_EJES,
      linewidth: 1,
      range: [2005.5, 2043.5],
      tickmode: 'linear',
      dtick: 2,
      tickfont: { size: 11, color: COLOR_TEXTO_EJES },
      zeroline: false,
    },
    yaxis: {
      title: { text: 'Tasa de informalidad (%)', font: { size: 13, color: COLOR_TEXTO_EJES } },
      showgrid: false,
      showline: true,
      linecolor: COLOR_LINEA_EJES,
      linewidth: 1,
      ticksuffix: '%',
      tickfont: { size: 11, color: COLOR_TEXTO_EJES },
      zeroline: false,
    },
    legend: {
      orientation: 'h',
      x: 0.5,
      xanchor: 'center',
      y: -0.092,
      yanchor: 'top',
      font: { size: 11 },
      bgcolor: 'rgba(255,255,255,0.92)',
      bordercolor: '#E0E0E0',
      borderwidth: 1,
      itemsizing: 'constant',
      itemwidth: 40,
    },
    shapes: [
      {
        type: 'line',
        x0: 2020,
        x1: 2020,
        y0: 0,
        y1: 1,
        xref: 'x',
        yref: 'paper',
        line: { color: '#FFCDD2', width: 1.4, dash: 'dot' },
        layer: 'below',
      },
      {
        type: 'line',
        x0: aniosProyeccion[0],
        x1: aniosProyeccion[0],
        y0: 0,
        y1: 1,
        xref: 'x',
        yref: 'paper',
        line: { color: '#B0BEC5', width: 1.4, dash: 'dashdot' },
        layer: 'below',
      },
      {
        type: 'rect',
        x0: aniosProyeccion[0],
        x1: 2042.5,
        y0: 0,
        y1: 1,
        xref: 'x',
        yref: 'paper',
        fillcolor: 'rgba(88,178,80,0.05)',
        line: { width: 0 },
        layer: 'below',
      },
    ],
    annotations: construirAnotaciones(nombreCiudad, vectores),
    hoverlabel: {
      bgcolor: 'white',
      bordercolor: COLOR_LINEA_EJES,
      font: { size: 12, color: '#212121' },
      namelength: 0,
    },
    hovermode: 'closest',
  };

  return { data, layout };
}
