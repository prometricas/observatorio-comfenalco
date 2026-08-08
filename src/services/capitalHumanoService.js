/**
 * capitalHumanoService — Carga de la base de capital humano del Banco
 * Mundial y construcción de su figura (cuaderno "App_Capital_Humano").
 *
 * Orden de carga (del camino más rápido al más lento):
 * 1. Archivo precalculado que cada build deja junto al Excel — sin
 *    descargar el Excel ni el intérprete SheetJS.
 * 2. Descarga completa + interpretación en el navegador, con SheetJS
 *    importado bajo demanda (Excel reemplazado por el cliente). La
 *    normalización es la MISMA del build (normalizacionCapitalHumano.js).
 *
 * Se porta la figura de escenarios prospectivos del cuaderno: para el
 * indicador elegido, la banda entre los escenarios optimista y pesimista
 * alrededor de la trayectoria tendencial, con el histórico observado en
 * punteado cuando existe. Las otras figuras del cuaderno (evolución
 * comparada y comparación internacional) no se portan en esta entrega.
 */
import {
  FORMATO_CAPITAL_HUMANO,
  normalizarCapitalHumano,
} from './normalizacionCapitalHumano.js';
import { cargarRegistroPrecalculado } from './precalculados.js';
import { marcaDeCorte } from './vidaMejorFiguras.js';

/* Colores de marca por serie (Plotly no lee variables CSS): mismos tonos
   de escenarios que el ranking OCDE del portal. */
const COLOR_ESCENARIO = {
  Historico: '#005744',
  Tendencial: '#3399a3',
  Optimista: '#58b250',
  Pesimista: '#ed7a3f',
};
const COLOR_BANDA = 'rgba(88, 178, 80, 0.14)';

const COLOR_TEXTO = '#22312c';
const COLOR_TEXTO_SUAVE = '#55655e';
const COLOR_REJILLA = 'rgba(0, 87, 68, 0.08)';
const FUENTE_GRAFICA = "'Catamaran', 'Segoe UI', sans-serif";

/* Alto de la figura; el ancho es fluido. */
const ALTO_FIGURA = 520;

/**
 * Nota de fuente de la figura, palabra por palabra del cuaderno. El
 * módulo la muestra como párrafo accesible bajo la gráfica.
 */
export const NOTA_FUENTE =
  'Fuente: Banco Mundial, Human Capital Index Plus (HCI+) 2026 y Human ' +
  'Capital Index (HCI), para los datos observados y valores base ' +
  'incorporados en el cuaderno. Escenarios optimista, tendencial y ' +
  'pesimista: elaboración propia a partir de la trayectoria prospectiva ' +
  'disponible.';

/* Caché de promesas por URL: una carga por sesión. */
const cacheBases = new Map();

/**
 * Descarga (precalculado o Excel) e interpreta la base. Lanza un error
 * descriptivo si el archivo falta o no tiene la estructura esperada.
 */
export function cargarBaseCapitalHumano(url) {
  if (cacheBases.has(url)) return cacheBases.get(url);

  const promesa = (async () => {
    /* 1. Vía rápida: el precalculado del build. */
    const registro = await cargarRegistroPrecalculado(
      url,
      /\.xlsx$/,
      (r, tamanoPublicado) =>
        r.formato === FORMATO_CAPITAL_HUMANO &&
        r.tipo === 'capital-humano' &&
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
    const resultado = normalizarCapitalHumano(XLSX, contenido);
    if (!resultado.disponible) {
      throw new Error('El archivo no tiene la estructura esperada de la base de capital humano.');
    }
    return resultado.estructura;
  })();

  promesa.catch(() => cacheBases.delete(url));
  cacheBases.set(url, promesa);
  return promesa;
}

/* Traza de línea de un escenario, con las suavizadas del cuaderno. */
function trazaEscenario(puntos, nombre, extras = {}) {
  return {
    x: puntos.map((p) => p.anio),
    y: puntos.map((p) => p.valor),
    type: 'scatter',
    mode: 'lines',
    name: nombre,
    line: {
      shape: 'spline',
      smoothing: 0.65,
      ...extras.line,
    },
    hovertemplate: `%{x}: <b>%{y:.3f}</b><extra>${nombre}</extra>`,
    ...extras.resto,
  };
}

/**
 * Figura de escenarios prospectivos del indicador elegido: banda entre
 * el optimista y el pesimista, tendencial destacado e histórico punteado.
 */
export function construirFiguraCapitalHumano(datos, campoIndicador) {
  const indicador =
    datos.indicadores.find((i) => i.campo === campoIndicador) ?? datos.indicadores[0];

  /* La banda se dibuja primero para quedar bajo las líneas: el pesimista
     marca un borde y el optimista rellena hasta él (orden del cuaderno). */
  const data = [
    trazaEscenario(indicador.pesimista, 'Pesimista', {
      line: { color: COLOR_ESCENARIO.Pesimista, width: 2.7 },
    }),
    trazaEscenario(indicador.optimista, 'Optimista', {
      line: { color: COLOR_ESCENARIO.Optimista, width: 2.7 },
      resto: { fill: 'tonexty', fillcolor: COLOR_BANDA },
    }),
    trazaEscenario(indicador.tendencial, 'Tendencial', {
      line: { color: COLOR_ESCENARIO.Tendencial, width: 3.8 },
    }),
  ];

  const anotaciones = [];
  const formas = [];
  if (indicador.historico.length > 0) {
    data.push(
      trazaEscenario(indicador.historico, 'Histórico', {
        line: { color: COLOR_ESCENARIO.Historico, width: 3, dash: 'dot', smoothing: 0.55 },
      }),
    );
    /* Con histórico, el corte observado/proyectado se marca como en el
       resto de figuras del portal (rótulo dentro: la leyenda ocupa la
       franja superior). */
    const anioCorte = indicador.historico[indicador.historico.length - 1].anio;
    const corte = marcaDeCorte(anioCorte, true);
    formas.push(corte.forma);
    anotaciones.push(corte.rotulo);
  }

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
      hoverlabel: { bgcolor: '#ffffff', bordercolor: '#005744', font: { family: FUENTE_GRAFICA, size: 12 } },
      /* Sin título interno: el encabezado lo pone la tarjeta del módulo. */
      legend: { orientation: 'h', yanchor: 'bottom', y: 1.02, xanchor: 'left', x: 0, bgcolor: 'rgba(0,0,0,0)' },
      margin: { t: 56, l: 66, r: 28, b: 56 },
      xaxis: {
        title: { text: 'Año', font: { size: 12, color: COLOR_TEXTO_SUAVE } },
        showgrid: false,
        zeroline: false,
        tickformat: 'd',
        range: [indicador.rango[0] - 0.4, indicador.rango[1] + 0.4],
        color: COLOR_TEXTO_SUAVE,
        fixedrange: true,
      },
      yaxis: {
        title: { text: indicador.unidad, font: { size: 12, color: COLOR_TEXTO_SUAVE } },
        gridcolor: COLOR_REJILLA,
        zeroline: false,
        color: COLOR_TEXTO_SUAVE,
        fixedrange: true,
      },
      shapes: formas,
      annotations: anotaciones,
    },
  };
}
