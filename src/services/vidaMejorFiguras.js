/**
 * vidaMejorFiguras — Construcción de las figuras Plotly del Índice OCDE
 * para una Vida Mejor, portadas del cuaderno "App_Vida_Mejor".
 *
 * Se portan los cuatro bloques de consulta del cuaderno:
 *   1. Abanico por país (histórico + tres escenarios + banda entre el
 *      optimista y el restrictivo).
 *   2. Evolución de la posición en el ranking de la OCDE.
 *   3. Colombia frente al promedio OCDE (líneas + barras de la brecha).
 *   4. Comparador de países en un año dado.
 *
 * Adaptaciones conscientes respecto al cuaderno (lo demás es réplica):
 * - Paleta de marca Comfenalco en lugar del azul-verde corporativo del
 *   cuaderno: Plotly no lee variables CSS, así que los tonos van fijos
 *   aquí. Colombia se destaca siempre en verde oscuro de marca.
 * - El escenario restrictivo usa el naranja de marca, no rojo: el propio
 *   cuaderno evita el rojo para no leerse como alarma.
 * - Se conserva el control de rango inferior de la gráfica de abanico,
 *   pero NO los botones de rango rápido del cuaderno: Plotly solo los
 *   admite en ejes de tipo fecha y sobre un eje de años numéricos no
 *   llegaban a funcionar.
 * - Tipografía Catamaran y alto fijo por figura, con ancho responsivo.
 * - El pie de autoría del cuaderno se sustituye por la nota metodológica
 *   que el módulo muestra como texto accesible bajo cada gráfica.
 */
import { CAMPO_POSICION, PAIS_DESTACADO, serieEncadenada, serieHistorica } from './vidaMejorService.js';

/* Colores de marca por serie. */
const COLOR_HISTORICO = '#005744';
const COLOR_DESTACADO = '#005744';
const COLOR_RESTO = '#74c1a2';

const COLOR_ESCENARIO = {
  Tendencial: '#3399a3',
  Optimista: '#58b250',
  Restrictivo: '#ed7a3f',
};

const COLOR_BANDA = 'rgba(51, 153, 163, 0.12)';
const RELLENO_HISTORICO = 'rgba(0, 87, 68, 0.06)';

/* Tonos de marca para las series adicionales del ranking. */
const CICLO_PAISES = ['#3399a3', '#5eb2ae', '#f3bc52', '#ef9e52', '#58b250', '#ed7a3f', '#74c1a2'];

/* Neutros de interfaz para ejes, rejilla y textos de apoyo. */
const COLOR_TEXTO = '#22312c';
const COLOR_TEXTO_SUAVE = '#55655e';
const COLOR_REJILLA = 'rgba(0, 87, 68, 0.08)';

const FUENTE_GRAFICA = "'Catamaran', 'Segoe UI', sans-serif";

/** Alto de cada figura; el ancho siempre es fluido. */
export const ALTO_ABANICO = 480;
export const ALTO_RANKING = 520;
export const ALTO_BRECHA = 420;
export const ALTO_BRECHA_BARRAS = 300;

/* Estilo común a todas las figuras del módulo. Sin zoom ni paneo
   (decisión del cliente: los usuarios lo activaban sin querer y perdían
   la vista); el hover y la leyenda siguen funcionando — los ejes fijan
   su rango en ejeAnios/ejeValores. */
function estiloBase(alto, margen = {}) {
  return {
    height: alto,
    autosize: true,
    dragmode: false,
    font: { family: FUENTE_GRAFICA, size: 13, color: COLOR_TEXTO },
    plot_bgcolor: '#ffffff',
    paper_bgcolor: '#ffffff',
    hoverlabel: { bgcolor: '#ffffff', bordercolor: COLOR_HISTORICO, font: { family: FUENTE_GRAFICA, size: 12 } },
    legend: { orientation: 'h', yanchor: 'bottom', y: 1.02, xanchor: 'left', x: 0, bgcolor: 'rgba(0,0,0,0)' },
    margin: { t: 70, l: 62, r: 28, b: 56, ...margen },
  };
}

/* Eje X de años: sin rejilla vertical, como en el cuaderno. */
function ejeAnios(titulo = 'Año') {
  return {
    title: { text: titulo, font: { size: 12, color: COLOR_TEXTO_SUAVE } },
    showgrid: false,
    zeroline: false,
    tickformat: 'd',
    color: COLOR_TEXTO_SUAVE,
    fixedrange: true,
  };
}

function ejeValores(titulo) {
  return {
    title: { text: titulo, font: { size: 12, color: COLOR_TEXTO_SUAVE } },
    gridcolor: COLOR_REJILLA,
    zeroline: false,
    color: COLOR_TEXTO_SUAVE,
    fixedrange: true,
  };
}

/**
 * Línea vertical punteada que separa el tramo observado del proyectado,
 * con su rótulo. Se dibuja medio año después del corte para que caiga
 * entre el último dato real y el primero proyectado. Con `rotuloDentro`,
 * el rótulo baja al interior del área de dibujo (sobre fondo blanco):
 * lo usan las figuras cuya franja superior ya la ocupa la leyenda.
 * Se exporta porque es común a todas las figuras de indicadores con
 * horizonte de proyección (también la usa felicidadService).
 */
export function marcaDeCorte(anioCorte, rotuloDentro = false) {
  const x = anioCorte + 0.5;
  return {
    forma: {
      type: 'line',
      x0: x,
      x1: x,
      yref: 'paper',
      y0: 0,
      y1: 1,
      line: { color: COLOR_TEXTO_SUAVE, width: 1.4, dash: 'dot' },
    },
    rotulo: {
      x,
      y: rotuloDentro ? 0.99 : 1.04,
      yref: 'paper',
      xanchor: 'center',
      yanchor: rotuloDentro ? 'top' : 'auto',
      showarrow: false,
      text: 'Observado  |  Proyectado',
      font: { size: 11, color: COLOR_TEXTO_SUAVE },
      bgcolor: rotuloDentro ? 'rgba(255,255,255,0.92)' : 'rgba(0,0,0,0)',
    },
  };
}

/** Plantilla de hover con los decimales propios del indicador. */
function plantillaHover(indicador, nombre) {
  return `%{x}: <b>%{y:.${indicador.decimales}f}</b> ${indicador.unidad}<extra>${nombre}</extra>`;
}

/**
 * Bloque 1 — Abanico de un país: la serie observada y los tres escenarios,
 * con la banda de incertidumbre entre el optimista y el restrictivo.
 */
export function construirFiguraAbanico(datos, pais, indicador) {
  const historico = serieHistorica(datos, pais, indicador.campo);
  const escenarios = {
    Tendencial: serieEncadenada(datos, pais, 'Tendencial', indicador.campo),
    Optimista: serieEncadenada(datos, pais, 'Optimista', indicador.campo),
    Restrictivo: serieEncadenada(datos, pais, 'Restrictivo', indicador.campo),
  };

  const corte = marcaDeCorte(datos.anioCorte);

  /* La banda se dibuja primero para quedar por debajo de las líneas: una
     traza invisible marca el borde superior y la siguiente rellena hasta
     ella (mismo recurso `fill: tonexty` del cuaderno). */
  const data = [
    {
      x: escenarios.Optimista.map((p) => p.anio),
      y: escenarios.Optimista.map((p) => p.valor),
      type: 'scatter',
      mode: 'lines',
      line: { width: 0 },
      showlegend: false,
      hoverinfo: 'skip',
    },
    {
      x: escenarios.Restrictivo.map((p) => p.anio),
      y: escenarios.Restrictivo.map((p) => p.valor),
      type: 'scatter',
      mode: 'lines',
      line: { width: 0 },
      fill: 'tonexty',
      fillcolor: COLOR_BANDA,
      showlegend: false,
      hoverinfo: 'skip',
    },
    {
      x: historico.map((p) => p.anio),
      y: historico.map((p) => p.valor),
      type: 'scatter',
      mode: 'lines',
      name: `Observado ${datos.anioMin}–${datos.anioCorte}`,
      line: { color: COLOR_HISTORICO, width: 3 },
      fill: 'tozeroy',
      fillcolor: RELLENO_HISTORICO,
      hovertemplate: plantillaHover(indicador, 'Observado'),
    },
  ];

  for (const escenario of ['Tendencial', 'Optimista', 'Restrictivo']) {
    data.push({
      x: escenarios[escenario].map((p) => p.anio),
      y: escenarios[escenario].map((p) => p.valor),
      type: 'scatter',
      mode: 'lines',
      name: escenario,
      line: {
        color: COLOR_ESCENARIO[escenario],
        width: 2.6,
        dash: escenario === 'Tendencial' ? 'solid' : 'dash',
      },
      hovertemplate: plantillaHover(indicador, escenario),
    });
  }

  return {
    data,
    layout: {
      ...estiloBase(ALTO_ABANICO, { b: 74 }),
      title: {
        text: `<b>${indicador.etiqueta}</b> · ${pais}`,
        font: { family: FUENTE_GRAFICA, size: 17, color: COLOR_HISTORICO },
        x: 0.01,
        xanchor: 'left',
      },
      xaxis: {
        ...ejeAnios(),
        rangeslider: { visible: true, thickness: 0.07, bgcolor: '#f2f6f1' },
      },
      yaxis: ejeValores(indicador.unidad),
      shapes: [corte.forma],
      annotations: [corte.rotulo],
    },
  };
}

/**
 * Bloque 2 — Evolución de la posición en el ranking. El eje vertical va
 * invertido porque la posición 1 es la mejor.
 */
export function construirFiguraRanking(datos, paises, escenario, anioInicio, anioFin) {
  const corte = marcaDeCorte(datos.anioCorte, true);

  const data = paises.map((pais, indice) => {
    const historico = datos
      .serie(pais, datos.escenarioHistorico)
      .filter((f) => f.anio >= anioInicio && f.anio <= Math.min(datos.anioCorte, anioFin));
    const proyeccion = datos
      .serie(pais, escenario)
      .filter((f) => f.anio >= anioInicio && f.anio <= anioFin);
    const serie = [...historico, ...proyeccion];
    const esDestacado = pais === PAIS_DESTACADO;

    return {
      x: serie.map((f) => f.anio),
      y: serie.map((f) => f[CAMPO_POSICION]),
      type: 'scatter',
      mode: 'lines+markers',
      name: pais,
      line: {
        color: esDestacado ? COLOR_DESTACADO : CICLO_PAISES[indice % CICLO_PAISES.length],
        width: esDestacado ? 3.6 : 1.8,
      },
      marker: { size: esDestacado ? 7 : 4 },
      hovertemplate: `%{x}: posición <b>%{y}</b><extra>${pais}</extra>`,
    };
  });

  return {
    data,
    layout: {
      /* Leyenda horizontal sobre la figura (no en columna a la derecha):
         la gráfica comparte fila con el texto del indicador y necesita
         todo su ancho como área de dibujo. */
      ...estiloBase(ALTO_RANKING, { t: 92 }),
      title: {
        text: `<b>Posición en el ranking de la OCDE</b> · escenario ${escenario.toLowerCase()}`,
        font: { family: FUENTE_GRAFICA, size: 17, color: COLOR_HISTORICO },
        x: 0.01,
        xanchor: 'left',
      },
      xaxis: ejeAnios(),
      yaxis: { ...ejeValores(`Posición (1 = mejor de ${datos.paises.length})`), autorange: 'reversed' },
      shapes: [corte.forma],
      annotations: [corte.rotulo],
    },
  };
}

/**
 * Bloque 3a — Puntaje de Colombia frente al promedio de la OCDE. El área
 * entre ambas líneas hace visible la brecha.
 */
export function construirFiguraBrecha(datos, escenario) {
  const serie = datos.serieComparacion(escenario);
  const corte = marcaDeCorte(datos.anioCorte);
  const anios = serie.map((f) => f.anio);

  return {
    data: [
      {
        x: anios,
        y: serie.map((f) => f.puntajeColombia),
        type: 'scatter',
        mode: 'lines',
        name: PAIS_DESTACADO,
        line: { color: COLOR_DESTACADO, width: 3 },
        hovertemplate: `%{x}: <b>%{y:.2f}</b> puntos<extra>${PAIS_DESTACADO}</extra>`,
      },
      {
        x: anios,
        y: serie.map((f) => f.promedioOcde),
        type: 'scatter',
        mode: 'lines',
        name: 'Promedio OCDE',
        line: { color: COLOR_ESCENARIO.Tendencial, width: 3 },
        fill: 'tonexty',
        fillcolor: COLOR_BANDA,
        hovertemplate: '%{x}: <b>%{y:.2f}</b> puntos<extra>Promedio OCDE</extra>',
      },
    ],
    layout: {
      ...estiloBase(ALTO_BRECHA),
      title: {
        text: `<b>${PAIS_DESTACADO} frente al promedio de la OCDE</b> · escenario ${escenario.toLowerCase()}`,
        font: { family: FUENTE_GRAFICA, size: 17, color: COLOR_HISTORICO },
        x: 0.01,
        xanchor: 'left',
      },
      xaxis: ejeAnios(),
      yaxis: ejeValores('Puntaje de bienestar (0-10)'),
      shapes: [corte.forma],
      annotations: [corte.rotulo],
    },
  };
}

/**
 * Bloque 3b — Barras de la brecha año a año. El color distingue el signo
 * sin depender solo de él: el eje y el rótulo ya indican la magnitud.
 */
export function construirFiguraBrechaBarras(datos, escenario) {
  const serie = datos.serieComparacion(escenario);
  const corte = marcaDeCorte(datos.anioCorte);

  return {
    data: [
      {
        x: serie.map((f) => f.anio),
        y: serie.map((f) => f.brecha),
        type: 'bar',
        marker: {
          color: serie.map((f) => (f.brecha < 0 ? COLOR_ESCENARIO.Restrictivo : COLOR_ESCENARIO.Optimista)),
        },
        hovertemplate: '%{x}: <b>%{y:.2f}</b> puntos<extra>Brecha</extra>',
      },
    ],
    layout: {
      ...estiloBase(ALTO_BRECHA_BARRAS, { t: 56 }),
      showlegend: false,
      title: {
        text: `<b>Brecha ${PAIS_DESTACADO} − promedio OCDE</b>`,
        font: { family: FUENTE_GRAFICA, size: 15, color: COLOR_HISTORICO },
        x: 0.01,
        xanchor: 'left',
      },
      xaxis: ejeAnios(),
      yaxis: ejeValores('Diferencia en puntos'),
      shapes: [corte.forma],
    },
  };
}

/**
 * Bloque 4 — Comparador de países en un año. Ordena de mejor a peor
 * teniendo en cuenta que en algunos indicadores conviene el valor bajo.
 */
export function construirFiguraComparador(datos, escenario, indicador, anio, cuantos) {
  /* Antes del año de corte los datos son observados: el escenario elegido
     solo aplica al tramo proyectado. */
  const escenarioAplicado = anio <= datos.anioCorte ? datos.escenarioHistorico : escenario;

  const ordenadas = datos
    .filasDeAnio(escenarioAplicado, anio)
    .map((fila) => ({ pais: fila['País'], valor: fila[indicador.campo] }))
    .filter((fila) => typeof fila.valor === 'number')
    .sort((a, b) => (indicador.inverso ? a.valor - b.valor : b.valor - a.valor))
    .slice(0, cuantos)
    /* Plotly apila las barras horizontales de abajo arriba: se invierte el
       orden para que el primer puesto quede arriba. */
    .reverse();

  const esObservado = anio <= datos.anioCorte;

  return {
    data: [
      {
        x: ordenadas.map((f) => f.valor),
        y: ordenadas.map((f) => f.pais),
        type: 'bar',
        orientation: 'h',
        marker: {
          color: ordenadas.map((f) => (f.pais === PAIS_DESTACADO ? COLOR_DESTACADO : COLOR_RESTO)),
        },
        text: ordenadas.map((f) => f.valor.toFixed(indicador.decimales)),
        textposition: 'outside',
        cliponaxis: false,
        hovertemplate: `%{y}: <b>%{x:.${indicador.decimales}f}</b> ${indicador.unidad}<extra></extra>`,
      },
    ],
    layout: {
      ...estiloBase(Math.max(420, 26 * ordenadas.length + 130), { l: 150, r: 70 }),
      showlegend: false,
      title: {
        text:
          `<b>${indicador.etiqueta}</b> · ${anio}<br>` +
          `<span style="font-size:12px;color:${COLOR_TEXTO_SUAVE}">` +
          `${esObservado ? 'Dato observado' : `Escenario ${escenario.toLowerCase()}`} · ` +
          `${ordenadas.length} países${indicador.inverso ? ' · valor bajo es mejor' : ''}</span>`,
        font: { family: FUENTE_GRAFICA, size: 17, color: COLOR_HISTORICO },
        x: 0.01,
        xanchor: 'left',
      },
      xaxis: { ...ejeValores(indicador.unidad), showgrid: true },
      yaxis: { ...ejeValores(''), showgrid: false, automargin: true },
    },
  };
}
