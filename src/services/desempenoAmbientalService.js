/**
 * desempenoAmbientalService — Carga de la base del Environmental
 * Performance Index y construcción de su figura (cuaderno
 * "App_Desempeño_Ambiental").
 *
 * Orden de carga (del camino más rápido al más lento):
 * 1. Archivo precalculado que cada build deja junto al Excel — sin
 *    descargar el Excel ni el intérprete SheetJS.
 * 2. Descarga completa + interpretación en el navegador, con SheetJS
 *    importado bajo demanda (Excel reemplazado por el cliente). La
 *    normalización es la MISMA del build
 *    (normalizacionDesempenoAmbiental.js).
 *
 * Se porta el visualizador individual del cuaderno para Colombia: el
 * histórico armonizado 2000–2025, la estrella del dato oficial del EPI
 * 2026, los tres escenarios anuales 2027–2050 con el corredor
 * restrictivo–optimista sombreado, las trayectorias intermedias dentro
 * del corredor y las cajas de indicadores clave y del cierre 2050. Las
 * demás figuras del cuaderno (exploradores animados, comparadores y
 * arquitectura del EPI) no se portan en esta entrega.
 */
import {
  FORMATO_DESEMPENO_AMBIENTAL,
  normalizarDesempenoAmbiental,
} from './normalizacionDesempenoAmbiental.js';
import { cargarRegistroPrecalculado } from './precalculados.js';

/* Colores de marca (Plotly no lee variables CSS): histórico y escenarios
   con los mismos tonos del resto de indicadores; el dato oficial usa el
   amarillo de marca. */
const COLOR_HISTORICO = '#005744';
const COLOR_OFICIAL = '#f3bc52';
const COLOR_ESCENARIO = {
  Tendencial: '#3399a3',
  Optimista: '#58b250',
  Restrictivo: '#ed7a3f',
};
const COLOR_CORREDOR = 'rgba(88, 178, 80, 0.13)';
const COLOR_CORREDOR_BORDE = 'rgba(88, 178, 80, 0.55)';
const COLOR_TRAYECTORIAS = 'rgba(88, 178, 80, 0.24)';
const COLOR_FONDO_PROYECCION = 'rgba(0, 87, 68, 0.025)';

const COLOR_TEXTO = '#22312c';
const COLOR_TEXTO_SUAVE = '#55655e';
const COLOR_REJILLA = 'rgba(0, 87, 68, 0.08)';
const FUENTE_GRAFICA = "'Catamaran', 'Segoe UI', sans-serif";

/* Alto de la figura; el ancho es fluido. */
const ALTO_FIGURA = 520;

/* Trayectorias intermedias del corredor: posiciones relativas entre el
   restrictivo (−1) y el optimista (+1), como el abanico del cuaderno
   (17 posiciones equidistantes, sin las casi coincidentes con el
   tendencial). */
const POSICIONES_TRAYECTORIAS = (() => {
  const posiciones = [];
  for (let i = 0; i < 17; i += 1) {
    const posicion = -0.92 + (1.84 * i) / 16;
    if (Math.abs(posicion) > 0.08) posiciones.push(posicion);
  }
  return posiciones;
})();

/**
 * Nota metodológica del pie de la figura, palabra por palabra del
 * cuaderno. El módulo la muestra como párrafo accesible bajo la gráfica.
 */
export const NOTA_FUENTE =
  '2000–2025: histórico armonizado. 2026: dato oficial. 2027–2050: ' +
  'valores anuales explícitos del Excel. La banda es un corredor de ' +
  'escenarios, no un intervalo de confianza.';

/* Caché de promesas por URL: una carga por sesión. */
const cacheBases = new Map();

/**
 * Descarga (precalculado o Excel) e interpreta la base. Lanza un error
 * descriptivo si el archivo falta o no tiene la estructura esperada.
 */
export function cargarBaseDesempenoAmbiental(url) {
  if (cacheBases.has(url)) return cacheBases.get(url);

  const promesa = (async () => {
    /* 1. Vía rápida: el precalculado del build. */
    const registro = await cargarRegistroPrecalculado(
      url,
      /\.xlsx$/,
      (r, tamanoPublicado) =>
        r.formato === FORMATO_DESEMPENO_AMBIENTAL &&
        r.tipo === 'desempeno-ambiental' &&
        r.tamanoOrigen === tamanoPublicado &&
        Boolean(r.estructura),
    );
    if (registro) return registro.estructura;

    /* 2. Interpretación en el navegador (Excel reemplazado por el
       cliente); SheetJS se descarga solo en este camino. */
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`No se encontró la base de datos del indicador (${respuesta.status}).`);
    }
    const tipoContenido = respuesta.headers.get('content-type') ?? '';
    if (tipoContenido.includes('text/html')) {
      throw new Error('El servidor no entregó la base de datos del indicador.');
    }

    const [XLSX, contenido] = await Promise.all([
      import('xlsx'),
      respuesta.arrayBuffer(),
    ]);
    const resultado = normalizarDesempenoAmbiental(XLSX, contenido);
    if (!resultado.disponible) {
      throw new Error('El archivo no tiene la estructura esperada de la base del EPI.');
    }
    return resultado.estructura;
  })();

  promesa.catch(() => cacheBases.delete(url));
  cacheBases.set(url, promesa);
  return promesa;
}

/** Cifras clave que muestran las cajas de la figura. */
export function calcularIndicadoresClave(datos) {
  const en = (serie, anio) => serie.find((punto) => punto.anio === anio)?.valor ?? null;
  const final = datos.tendencial[datos.tendencial.length - 1];
  return {
    ranking: datos.ranking,
    oficial2026: datos.oficial.valor,
    tendencial2030: en(datos.tendencial, 2030),
    tendencial2040: en(datos.tendencial, 2040),
    anioFinal: final.anio,
    restrictivoFinal: datos.restrictivo[datos.restrictivo.length - 1].valor,
    tendencialFinal: final.valor,
    optimistaFinal: datos.optimista[datos.optimista.length - 1].valor,
    cambioTendencial: final.valor - datos.oficial.valor,
    calidad: datos.calidad,
  };
}

/**
 * Figura del visualizador individual: corredor, trayectorias
 * intermedias, histórico, dato oficial y los tres escenarios.
 */
export function construirFiguraDesempenoAmbiental(datos) {
  const anios = (serie) => serie.map((punto) => punto.anio);
  const valores = (serie) => serie.map((punto) => punto.valor);
  const cifras = calcularIndicadoresClave(datos);

  /* Corredor exacto restrictivo–optimista (bordes punteados finos). */
  const data = [
    {
      x: anios(datos.optimista),
      y: valores(datos.optimista),
      type: 'scatter',
      mode: 'lines',
      line: { color: COLOR_CORREDOR_BORDE, width: 1.2, dash: 'dot' },
      showlegend: false,
      hoverinfo: 'skip',
    },
    {
      x: anios(datos.restrictivo),
      y: valores(datos.restrictivo),
      type: 'scatter',
      mode: 'lines',
      fill: 'tonexty',
      fillcolor: COLOR_CORREDOR,
      line: { color: COLOR_CORREDOR_BORDE, width: 1.2, dash: 'dot' },
      name: 'Corredor restrictivo–optimista',
      hoverinfo: 'skip',
    },
  ];

  /* Trayectorias intermedias: interpolación entre el tendencial y cada
     borde del corredor (fórmula del cuaderno). */
  POSICIONES_TRAYECTORIAS.forEach((posicion, indice) => {
    const borde = posicion < 0 ? datos.restrictivo : datos.optimista;
    const peso = Math.abs(posicion);
    data.push({
      x: anios(datos.tendencial),
      y: datos.tendencial.map(
        (punto, i) => punto.valor + peso * (borde[i].valor - punto.valor),
      ),
      type: 'scatter',
      mode: 'lines',
      line: { color: COLOR_TRAYECTORIAS, width: 1.05 },
      name: 'Trayectorias intermedias',
      showlegend: indice === 0,
      hoverinfo: 'skip',
    });
  });

  /* Histórico armonizado 2000–2025. */
  data.push({
    x: anios(datos.historico),
    y: valores(datos.historico),
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Histórico armonizado',
    line: { color: COLOR_HISTORICO, width: 2.7 },
    marker: { color: COLOR_HISTORICO, size: 5, line: { color: '#ffffff', width: 0.7 } },
    hovertemplate: 'Año: %{x}<br>EPI histórico: <b>%{y:.2f}</b><extra></extra>',
  });

  /* Dato oficial 2026 (estrella). */
  data.push({
    x: [datos.oficial.anio],
    y: [datos.oficial.valor],
    type: 'scatter',
    mode: 'markers',
    name: `EPI oficial ${datos.oficial.anio}`,
    marker: {
      color: COLOR_OFICIAL,
      size: 12,
      symbol: 'star',
      line: { color: '#ffffff', width: 1.3 },
    },
    hovertemplate: `${datos.oficial.anio} oficial: <b>%{y:.2f}</b><extra></extra>`,
  });

  /* Los tres escenarios, con los estilos de línea del cuaderno. */
  const escenarios = [
    ['Pesimista / restrictivo', datos.restrictivo, COLOR_ESCENARIO.Restrictivo, 'dot'],
    ['Tendencial', datos.tendencial, COLOR_ESCENARIO.Tendencial, 'dash'],
    ['Optimista', datos.optimista, COLOR_ESCENARIO.Optimista, 'solid'],
  ];
  for (const [nombre, serie, color, guiones] of escenarios) {
    data.push({
      x: anios(serie),
      y: valores(serie),
      type: 'scatter',
      mode: 'lines+markers',
      name: nombre,
      line: { color, width: 3, dash: guiones },
      marker: { size: 4.8, color, symbol: 'diamond', line: { color: '#ffffff', width: 0.6 } },
      hovertemplate: `Año: %{x}<br>${nombre}: <b>%{y:.2f}</b><extra></extra>`,
    });
  }

  const rangoInicio = datos.historico[0].anio;
  const rangoFin = cifras.anioFinal;

  /* Cajas y rótulos de la figura del cuaderno. */
  const rankingTexto = cifras.ranking
    ? `Ranking 2026: ${cifras.ranking.posicion} de ${cifras.ranking.total}<br>`
    : '';
  const annotations = [
    {
      x: datos.oficial.anio,
      y: datos.oficial.valor,
      xref: 'x',
      yref: 'y',
      text: `EPI oficial ${datos.oficial.anio}`,
      showarrow: true,
      arrowhead: 2,
      arrowcolor: COLOR_OFICIAL,
      ax: -48,
      ay: -48,
      font: { size: 10, color: '#8a6500' },
      bgcolor: 'rgba(255,248,220,0.97)',
      bordercolor: '#e4c55c',
      borderpad: 4,
      borderwidth: 1,
    },
    {
      x: rangoFin,
      y: cifras.tendencialFinal,
      xref: 'x',
      yref: 'y',
      text:
        `<b>${cifras.anioFinal} tendencial: ${cifras.tendencialFinal.toFixed(2)}</b><br>` +
        `Corredor: ${cifras.restrictivoFinal.toFixed(2)}–${cifras.optimistaFinal.toFixed(2)}`,
      showarrow: true,
      arrowhead: 2,
      arrowcolor: COLOR_ESCENARIO.Tendencial,
      ax: -25,
      ay: -58,
      font: { size: 10, color: COLOR_TEXTO },
      bgcolor: 'rgba(255,255,255,0.96)',
      bordercolor: '#90A4AE',
      borderpad: 6,
      borderwidth: 1,
    },
    {
      x: 0.01,
      y: 0.03,
      xref: 'paper',
      yref: 'paper',
      xanchor: 'left',
      yanchor: 'bottom',
      showarrow: false,
      align: 'left',
      text:
        '<b>Indicadores clave</b><br>' +
        rankingTexto +
        `2026 oficial/agregado: ${cifras.oficial2026.toFixed(2)}<br>` +
        `2030 tendencial: ${cifras.tendencial2030?.toFixed(2) ?? '—'}<br>` +
        `2040 tendencial: ${cifras.tendencial2040?.toFixed(2) ?? '—'}<br>` +
        `${cifras.anioFinal} R/T/O: ${cifras.restrictivoFinal.toFixed(2)} / ${cifras.tendencialFinal.toFixed(2)} / ${cifras.optimistaFinal.toFixed(2)}<br>` +
        `Cambio tendencial 2026–${cifras.anioFinal}: ${cifras.cambioTendencial >= 0 ? '+' : ''}${cifras.cambioTendencial.toFixed(2)}<br>` +
        `Calidad del modelo: ${cifras.calidad || '—'}`,
      font: { size: 10.5, color: COLOR_TEXTO },
      bgcolor: 'rgba(255,255,255,0.96)',
      bordercolor: '#90A4AE',
      borderpad: 8,
      borderwidth: 1,
    },
  ];

  return {
    data,
    layout: {
      height: ALTO_FIGURA,
      autosize: true,
      /* Sin zoom ni paneo (regla del portal); hover y leyenda siguen. */
      dragmode: false,
      font: { family: FUENTE_GRAFICA, size: 13, color: COLOR_TEXTO },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      hoverlabel: { bgcolor: '#ffffff', bordercolor: COLOR_HISTORICO, font: { family: FUENTE_GRAFICA, size: 12 } },
      /* Sin título interno: el encabezado lo pone la tarjeta del módulo,
         y la leyenda (siete entradas) necesita la franja superior. */
      legend: { orientation: 'h', yanchor: 'bottom', y: 1.02, xanchor: 'left', x: 0, bgcolor: 'rgba(0,0,0,0)' },
      margin: { t: 84, l: 66, r: 28, b: 56 },
      xaxis: {
        title: { text: 'Año', font: { size: 12, color: COLOR_TEXTO_SUAVE } },
        showgrid: false,
        zeroline: false,
        tickformat: 'd',
        dtick: 5,
        range: [rangoInicio - 0.8, rangoFin + 0.8],
        color: COLOR_TEXTO_SUAVE,
        fixedrange: true,
      },
      yaxis: {
        title: { text: 'Puntaje EPI (0–100)', font: { size: 12, color: COLOR_TEXTO_SUAVE } },
        gridcolor: COLOR_REJILLA,
        zeroline: false,
        color: COLOR_TEXTO_SUAVE,
        fixedrange: true,
      },
      shapes: [
        /* Línea vertical del dato oficial y sombreado de la fase
           proyectada, como en el cuaderno. */
        {
          type: 'line',
          x0: datos.oficial.anio,
          x1: datos.oficial.anio,
          y0: 0,
          y1: 1,
          xref: 'x',
          yref: 'paper',
          line: { color: '#d7b33e', width: 1.5, dash: 'dashdot' },
          layer: 'below',
        },
        {
          type: 'rect',
          x0: datos.oficial.anio + 1,
          x1: rangoFin + 0.8,
          y0: 0,
          y1: 1,
          xref: 'x',
          yref: 'paper',
          fillcolor: COLOR_FONDO_PROYECCION,
          line: { width: 0 },
          layer: 'below',
        },
      ],
      annotations,
    },
  };
}
