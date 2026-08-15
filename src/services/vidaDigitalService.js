/**
 * vidaDigitalService — Carga de la base del Digital Quality of Life
 * Index y construcción de su figura (cuaderno "App_Vida_Digital").
 *
 * Orden de carga (del camino más rápido al más lento):
 * 1. Archivo precalculado que cada build deja junto al Excel — con la
 *    simulación prospectiva ya resuelta (prospectivaVidaDigital).
 * 2. Descarga completa + interpretación en el navegador, con SheetJS
 *    importado bajo demanda (Excel reemplazado por el cliente). La
 *    normalización es la MISMA del build (normalizacionVidaDigital.js).
 *
 * La figura reúne los tres exploradores del cuaderno en una sola vista
 * parametrizada (petición del cliente):
 * - Un país: el visualizador individual — histórico oficial 2022–2025,
 *   proyección central 2026–2030, banda de predicción del 95 %
 *   (conmutable), 18 trayectorias simuladas de fondo, cajas de
 *   indicadores clave; con un escenario elegido, la trayectoria
 *   destacada y su caja de lectura (explorador de escenarios del
 *   cuaderno, sin el botón Play: el desplegable lo reemplaza).
 * - De dos a tres países (tope MAXIMO_PAISES_DQL pedido por el cliente;
 *   el cuaderno admite seis): comparación con histórico, central y el
 *   mismo escenario representativo por país, bandas conmutables.
 * Curvas PCHIP densificadas aquí (no viajan en el JSON); leyenda abajo
 * y ejes fijos sin zoom, como el resto del portal.
 */
import { FORMATO_VIDA_DIGITAL, normalizarVidaDigital } from './normalizacionVidaDigital.js';
import { NUMERO_ESCENARIOS } from './prospectivaVidaDigital.js';
import { cargarRegistroPrecalculado } from './precalculados.js';
import { densificarPchip } from './felicidadService.js';
import { escaparTextoFigura } from './textoFigura.js';

/* Colores de marca (Plotly no lee variables CSS). El escenario destacado
   usa el naranja de marca: aquí no carga el sentido pesimista que tiene
   en los módulos de escenarios con jerarquía. */
const COLOR_HISTORICO = '#005744';
const COLOR_CENTRAL = '#3399a3';
const COLOR_BANDA = 'rgba(51, 153, 163, 0.14)';
const COLOR_BORDE_BANDA = 'rgba(51, 153, 163, 0.5)';
const COLOR_TRAYECTORIAS = 'rgba(51, 153, 163, 0.22)';
const COLOR_DESTACADO = '#ed7a3f';
const COLOR_FONDO_PROYECCION = 'rgba(51, 153, 163, 0.035)';

/* Ciclo de color para la comparación multipaís; trae un color más que
   el tope actual (3) por si el cliente vuelve a subirlo. */
const CICLO_PAISES_DQL = ['#005744', '#3399a3', '#ed7a3f', '#58b250'];

const COLOR_TEXTO = '#22312c';
const COLOR_TEXTO_SUAVE = '#55655e';
const COLOR_REJILLA = 'rgba(0, 87, 68, 0.08)';
const FUENTE_GRAFICA = "'Catamaran', 'Segoe UI', sans-serif";

/** Máximo de países comparables a la vez (petición del cliente,
    reducido de 4 a 3 el 2026-08-14). */
export const MAXIMO_PAISES_DQL = 3;

/** Opciones del selector de escenario: la central y las 24 simuladas. */
export const OPCIONES_ESCENARIO_DQL = [
  { valor: 0, etiqueta: 'Proyección central' },
  ...Array.from({ length: NUMERO_ESCENARIOS }, (_, i) => ({
    valor: i + 1,
    etiqueta: `Escenario simulado ${i + 1}`,
  })),
];

/**
 * Escenarios nombrados del comparador (celda 5D del cuaderno): pesimista
 * (trayectoria completa próxima al percentil 20 del cierre 2030),
 * tendencial (la proyección central del Excel) y optimista (percentil
 * 80). Trazos del cuaderno; colores estándar de escenarios del portal.
 */
export const ESCENARIOS_NOMBRADOS_DQL = ['Pesimista', 'Tendencial', 'Optimista'];
const TRAZO_ESCENARIO_NOMBRADO = { Pesimista: 'dot', Tendencial: 'dash', Optimista: 'solid' };

/**
 * Nota del pie de la figura, la del cuaderno. El módulo la muestra como
 * párrafo accesible bajo la gráfica.
 */
export const NOTA_FUENTE_DQL =
  'Fuente histórica: Surfshark, DQL 2022–2025. Proyección central 2026–2030: ' +
  'pronóstico econométrico de la base. Banda sombreada: intervalo de ' +
  'predicción al 95 %. Las trayectorias finas y los escenarios simulados ' +
  'son ilustrativos y no sustituyen el pronóstico central. Curvas PCHIP: ' +
  'interpolación visual entre valores anuales.';

/* Caché de promesas por URL: una carga por sesión. */
const cacheBases = new Map();

/* Panel de consulta sobre la estructura serializada. */
function armarPanel(estructura) {
  const indice = new Map(estructura.paises.map((pais) => [pais.nombre, pais]));
  return {
    nombres: estructura.paises.map((pais) => pais.nombre),
    paisPrincipal: estructura.paisPrincipal,
    aniosHistoricos: estructura.aniosHistoricos,
    aniosProyeccion: estructura.aniosProyeccion,
    pais: (nombre) => indice.get(nombre) ?? null,
  };
}

/**
 * Descarga (precalculado o Excel) e interpreta la base; devuelve el
 * panel de países. Lanza un error descriptivo si el archivo falta o no
 * tiene la estructura esperada.
 */
export function cargarBaseVidaDigital(url) {
  if (cacheBases.has(url)) return cacheBases.get(url);

  const promesa = (async () => {
    const registro = await cargarRegistroPrecalculado(
      url,
      /\.xlsx$/,
      (r, tamanoPublicado) =>
        r.formato === FORMATO_VIDA_DIGITAL &&
        r.tipo === 'vida-digital' &&
        r.tamanoOrigen === tamanoPublicado &&
        Array.isArray(r.estructura?.paises),
    );
    if (registro) return armarPanel(registro.estructura);

    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`No se encontró la base de datos del indicador (${respuesta.status}).`);
    }
    const tipoContenido = respuesta.headers.get('content-type') ?? '';
    if (tipoContenido.includes('text/html')) {
      throw new Error('El servidor no entregó la base de datos del indicador.');
    }

    const [XLSX, contenido] = await Promise.all([import('xlsx'), respuesta.arrayBuffer()]);
    const resultado = normalizarVidaDigital(XLSX, contenido);
    if (!resultado.disponible) {
      throw new Error('El archivo no tiene la estructura esperada de la base del DQL.');
    }
    return armarPanel(resultado.estructura);
  })();

  promesa.catch(() => cacheBases.delete(url));
  cacheBases.set(url, promesa);
  return promesa;
}

/* Serie de proyección con el puente en el último año histórico. */
function proyeccionConPuente(panel, pais, valores) {
  return {
    x: [panel.aniosHistoricos.at(-1), ...panel.aniosProyeccion],
    y: [pais.historico.at(-1), ...valores],
  };
}

const estiloBase = (leyendaTamano = 11.5) => ({
  height: 560,
  autosize: true,
  dragmode: false,
  font: { family: FUENTE_GRAFICA, size: 13, color: COLOR_TEXTO },
  plot_bgcolor: '#ffffff',
  paper_bgcolor: '#ffffff',
  hoverlabel: {
    bgcolor: '#ffffff',
    bordercolor: COLOR_HISTORICO,
    font: { family: FUENTE_GRAFICA, size: 12 },
  },
  /* Leyenda abajo y legible, la convención de las vistas nuevas. */
  legend: {
    orientation: 'h',
    x: 0.5,
    xanchor: 'center',
    y: -0.1,
    yanchor: 'top',
    font: { size: leyendaTamano },
    bgcolor: 'rgba(255,255,255,0.95)',
  },
  margin: { t: 30, l: 66, r: 28, b: 100 },
  xaxis: {
    showgrid: false,
    zeroline: false,
    tickformat: 'd',
    dtick: 1,
    range: [2021.7, 2030.45],
    color: COLOR_TEXTO_SUAVE,
    fixedrange: true,
  },
  yaxis: {
    title: { text: 'Índice DQL (0–1)', font: { size: 12, color: COLOR_TEXTO_SUAVE } },
    tickformat: '.2f',
    gridcolor: COLOR_REJILLA,
    zeroline: false,
    color: COLOR_TEXTO_SUAVE,
    fixedrange: true,
  },
  shapes: [
    {
      type: 'line',
      x0: 2026,
      x1: 2026,
      yref: 'paper',
      y0: 0,
      y1: 1,
      line: { color: '#d8c26b', width: 1.4, dash: 'dashdot' },
      layer: 'below',
    },
    {
      type: 'rect',
      x0: 2026,
      x1: 2030.45,
      yref: 'paper',
      y0: 0,
      y1: 1,
      fillcolor: COLOR_FONDO_PROYECCION,
      line: { width: 0 },
      layer: 'below',
    },
  ],
});

/* Anotación del arranque de la proyección, común a las dos vistas. */
function anotacionInicio(valor2026) {
  return {
    x: 2026,
    y: valor2026,
    xref: 'x',
    yref: 'y',
    text: 'Inicio de la proyección',
    showarrow: true,
    arrowhead: 2,
    arrowcolor: '#c9a23f',
    arrowsize: 1,
    ax: -50,
    ay: -45,
    font: { size: 10, color: '#8a5f00' },
    bgcolor: 'rgba(255,247,224,0.97)',
    bordercolor: '#e6c979',
    borderpad: 4,
    borderwidth: 1,
  };
}

/**
 * Figura del explorador DQL. `nombres` trae de 1 a MAXIMO_PAISES_DQL
 * países; `escenario`
 * es 0 (solo la proyección central) o el número del escenario simulado
 * destacado; `mostrarIntervalo` conmuta la banda del 95 %.
 */
export function construirFiguraVidaDigital(panel, nombres, escenario, mostrarIntervalo) {
  const individual = nombres.length === 1;
  const data = [];
  const annotations = [];

  nombres.forEach((nombre, posicion) => {
    const pais = panel.pais(nombre);
    if (!pais) return;
    /* El nombre del país sale del Excel: se escapa antes de entrar en el
       pseudo-HTML de Plotly (nombres de traza en la leyenda y hover). */
    const nombreSeguro = escaparTextoFigura(nombre);
    const color = individual ? COLOR_CENTRAL : CICLO_PAISES_DQL[posicion % CICLO_PAISES_DQL.length];
    const colorHistorico = individual ? COLOR_HISTORICO : color;

    const central = proyeccionConPuente(panel, pais, pais.proyeccion);
    const centralDensa = densificarPchip(central.x, central.y, 180);
    const bandaInferior = proyeccionConPuente(panel, pais, pais.bandaInferior);
    const bandaSuperior = proyeccionConPuente(panel, pais, pais.bandaSuperior);

    /* Banda del 95 %: rellena en la vista individual, solo bordes
       punteados en la comparación (como el cuaderno). */
    if (mostrarIntervalo) {
      const superiorDensa = densificarPchip(bandaSuperior.x, bandaSuperior.y, 180);
      const inferiorDensa = densificarPchip(bandaInferior.x, bandaInferior.y, 180);
      data.push(
        {
          x: superiorDensa.x,
          y: superiorDensa.y,
          type: 'scatter',
          mode: 'lines',
          line: { color: individual ? COLOR_BORDE_BANDA : color, width: individual ? 1.2 : 0.8, dash: 'dot' },
          hoverinfo: 'skip',
          showlegend: false,
        },
        {
          x: inferiorDensa.x,
          y: inferiorDensa.y,
          type: 'scatter',
          mode: 'lines',
          ...(individual ? { fill: 'tonexty', fillcolor: COLOR_BANDA } : {}),
          line: { color: individual ? COLOR_BORDE_BANDA : color, width: individual ? 1.2 : 0.8, dash: 'dot' },
          hoverinfo: 'skip',
          name: individual ? 'Intervalo de predicción 95 %' : `${nombreSeguro} · intervalo 95 %`,
          showlegend: individual,
        },
      );
    }

    /* Trayectorias simuladas de fondo, solo en la vista individual. */
    if (individual) {
      pais.trayectorias.forEach((trayectoria, indice) => {
        const completa = proyeccionConPuente(panel, pais, trayectoria);
        const densa = densificarPchip(completa.x, completa.y, 180);
        data.push({
          x: densa.x,
          y: densa.y,
          type: 'scatter',
          mode: 'lines',
          line: { color: COLOR_TRAYECTORIAS, width: 1.15 },
          hoverinfo: 'skip',
          showlegend: indice === 0,
          name: 'Trayectorias simuladas',
        });
      });
    }

    /* Histórico oficial (suave, con marcadores anuales con hover). */
    const historicoDenso = densificarPchip(panel.aniosHistoricos, pais.historico, 120);
    data.push(
      {
        x: historicoDenso.x,
        y: historicoDenso.y,
        type: 'scatter',
        mode: 'lines',
        name: individual ? 'Histórico oficial' : `${nombreSeguro} · histórico`,
        line: { color: colorHistorico, width: individual ? 3 : 2.4 },
        hoverinfo: 'skip',
      },
      {
        x: panel.aniosHistoricos,
        y: pais.historico,
        type: 'scatter',
        mode: 'markers',
        showlegend: false,
        marker: { size: individual ? 8 : 6, color: colorHistorico, line: { color: '#ffffff', width: 1.2 } },
        hovertemplate: `%{x}: <b>%{y:.4f}</b><extra>${nombreSeguro} · histórico (Surfshark)</extra>`,
      },
    );

    /* Proyección central del Excel (guiones + rombos anuales). */
    data.push(
      {
        x: centralDensa.x,
        y: centralDensa.y,
        type: 'scatter',
        mode: 'lines',
        name: individual ? 'Proyección estimada' : `${nombreSeguro} · proyección central`,
        line: { color, width: individual ? 3.2 : 2.3, dash: 'dash' },
        hoverinfo: 'skip',
      },
      {
        x: central.x,
        y: central.y,
        type: 'scatter',
        mode: 'markers',
        showlegend: false,
        marker: {
          size: individual ? 8 : 6.5,
          color,
          symbol: 'diamond',
          line: { color: '#ffffff', width: 1.2 },
        },
        hovertemplate: central.x.map((anio, i) =>
          anio <= panel.aniosHistoricos.at(-1)
            ? `${anio}: <b>${central.y[i].toFixed(4)}</b><extra>${nombreSeguro} · observado</extra>`
            : `${anio}: <b>${central.y[i].toFixed(4)}</b><br>95 %: [${bandaInferior.y[i].toFixed(4)} – ${bandaSuperior.y[i].toFixed(4)}]<extra>${nombreSeguro} · proyección central</extra>`,
        ),
      },
    );

    /* Escenario simulado destacado. */
    if (escenario > 0) {
      const trayectoria = pais.escenarios[Math.min(escenario, pais.escenarios.length) - 1];
      const completa = proyeccionConPuente(panel, pais, trayectoria);
      const densa = densificarPchip(completa.x, completa.y, 180);
      const colorEscenario = individual ? COLOR_DESTACADO : color;
      data.push(
        {
          x: densa.x,
          y: densa.y,
          type: 'scatter',
          mode: 'lines',
          name: individual ? 'Escenario simulado destacado' : `${nombreSeguro} · escenario ${escenario}`,
          line: { color: colorEscenario, width: individual ? 2.8 : 3.2 },
          hoverinfo: 'skip',
        },
        {
          x: completa.x,
          y: completa.y,
          type: 'scatter',
          mode: 'markers',
          showlegend: false,
          marker: {
            size: 7,
            color: colorEscenario,
            symbol: 'square',
            line: { color: '#ffffff', width: 1.1 },
          },
          hovertemplate: `%{x}: <b>%{y:.4f}</b><extra>${nombreSeguro} · escenario simulado ${escenario}</extra>`,
        },
      );

      if (individual) {
        annotations.push(
          {
            x: 2030,
            y: trayectoria.at(-1),
            xref: 'x',
            yref: 'y',
            text: `<b>Escenario ${escenario}</b><br>2030: ${trayectoria.at(-1).toFixed(4)}<br>Δ vs central: ${(trayectoria.at(-1) - pais.proyeccion.at(-1) >= 0 ? '+' : '') + (trayectoria.at(-1) - pais.proyeccion.at(-1)).toFixed(4)}`,
            showarrow: true,
            arrowhead: 2,
            arrowcolor: COLOR_DESTACADO,
            ax: 16,
            ay: -52,
            font: { size: 10, color: '#a34a12' },
            bgcolor: 'rgba(255,255,255,0.96)',
            bordercolor: COLOR_DESTACADO,
            borderpad: 5,
            borderwidth: 1,
          },
          {
            x: 0.01,
            y: 0.03,
            xref: 'paper',
            yref: 'paper',
            xanchor: 'left',
            yanchor: 'bottom',
            align: 'left',
            showarrow: false,
            text:
              '<b>Lectura del escenario destacado</b><br>' +
              `Escenario: ${escenario} de ${pais.escenarios.length}<br>` +
              `2030 central: ${pais.proyeccion.at(-1).toFixed(4)}<br>` +
              `2030 escenario: ${trayectoria.at(-1).toFixed(4)}<br>` +
              `Banda 95 % en 2030: [${pais.bandaInferior.at(-1).toFixed(4)} – ${pais.bandaSuperior.at(-1).toFixed(4)}]`,
            font: { size: 11, color: COLOR_TEXTO },
            bgcolor: 'rgba(255,255,255,0.96)',
            bordercolor: '#b0bec5',
            borderpad: 8,
            borderwidth: 1,
          },
        );
      }
    }

    /* Cajas del visualizador individual del cuaderno. */
    if (individual) {
      annotations.push(anotacionInicio(pais.proyeccion[0]));
      if (escenario === 0) {
        annotations.push(
          {
            x: 2030,
            y: pais.proyeccion.at(-1),
            xref: 'x',
            yref: 'y',
            text:
              `<b>2030: ${pais.proyeccion.at(-1).toFixed(4)}</b><br>` +
              `95 %: [${pais.bandaInferior.at(-1).toFixed(4)} – ${pais.bandaSuperior.at(-1).toFixed(4)}]`,
            showarrow: true,
            arrowhead: 2,
            arrowcolor: COLOR_TEXTO_SUAVE,
            ax: 10,
            ay: -50,
            font: { size: 10, color: COLOR_TEXTO },
            bgcolor: 'rgba(255,255,255,0.96)',
            bordercolor: '#b0bec5',
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
            align: 'left',
            showarrow: false,
            text:
              '<b>Indicadores clave</b><br>' +
              (pais.ranking !== null ? `Ranking mundial 2025: ${pais.ranking}<br>` : '') +
              `2022: ${pais.historico[0].toFixed(4)}<br>` +
              `2025: ${pais.historico.at(-1).toFixed(4)}<br>` +
              `2030 (proy.): ${pais.proyeccion.at(-1).toFixed(4)}<br>` +
              `Δ 2025–2030: <b>${(pais.proyeccion.at(-1) - pais.historico.at(-1) >= 0 ? '+' : '') + (pais.proyeccion.at(-1) - pais.historico.at(-1)).toFixed(4)}</b>`,
            font: { size: 11, color: COLOR_TEXTO },
            bgcolor: 'rgba(255,255,255,0.96)',
            bordercolor: '#b0bec5',
            borderpad: 8,
            borderwidth: 1,
          },
        );
      }
    }
  });

  if (!individual) {
    const primero = panel.pais(nombres[0]);
    if (primero) annotations.push(anotacionInicio(primero.proyeccion[0]));
  }

  return {
    data,
    layout: {
      ...estiloBase(individual ? 11.5 : 10.5),
      annotations,
    },
  };
}

/**
 * Comparador multipaís por escenario nombrado (celda 5D del cuaderno):
 * para cada país elegido, el histórico oficial y la trayectoria del
 * escenario (color por país, trazo por escenario), con los límites del
 * 95 % conmutables como bordes punteados y la caja "Valores 2030".
 */
export function construirFiguraComparadorEscenarioDql(panel, nombres, escenario, mostrarIntervalo) {
  const data = [];
  const valores2030 = [];

  nombres.forEach((nombre, posicion) => {
    const pais = panel.pais(nombre);
    if (!pais) return;
    /* Nombre de país del Excel escapado para el pseudo-HTML de Plotly. */
    const nombreSeguro = escaparTextoFigura(nombre);
    const color = CICLO_PAISES_DQL[posicion % CICLO_PAISES_DQL.length];

    /* Límites del 95 % como bordes punteados finos (sin relleno). */
    if (mostrarIntervalo) {
      for (const limites of [pais.bandaSuperior, pais.bandaInferior]) {
        const completa = proyeccionConPuente(panel, pais, limites);
        const densa = densificarPchip(completa.x, completa.y, 180);
        data.push({
          x: densa.x,
          y: densa.y,
          type: 'scatter',
          mode: 'lines',
          line: { color, width: 0.8, dash: 'dot' },
          hoverinfo: 'skip',
          showlegend: false,
        });
      }
    }

    /* Histórico oficial del país. */
    const historicoDenso = densificarPchip(panel.aniosHistoricos, pais.historico, 120);
    data.push(
      {
        x: historicoDenso.x,
        y: historicoDenso.y,
        type: 'scatter',
        mode: 'lines',
        name: `${nombreSeguro} · histórico`,
        line: { color, width: 2.4 },
        hoverinfo: 'skip',
      },
      {
        x: panel.aniosHistoricos,
        y: pais.historico,
        type: 'scatter',
        mode: 'markers',
        showlegend: false,
        marker: { size: 6, color, line: { color: '#ffffff', width: 1 } },
        hovertemplate: `%{x}: <b>%{y:.4f}</b><extra>${nombreSeguro} · histórico (Surfshark)</extra>`,
      },
    );

    /* Trayectoria del escenario elegido. */
    const valores =
      escenario === 'Tendencial'
        ? pais.proyeccion
        : pais[escenario === 'Pesimista' ? 'pesimista' : 'optimista'];
    const completa = proyeccionConPuente(panel, pais, valores);
    const densa = densificarPchip(completa.x, completa.y, 180);
    data.push(
      {
        x: densa.x,
        y: densa.y,
        type: 'scatter',
        mode: 'lines',
        name: `${nombreSeguro} · ${escenario.toLowerCase()}`,
        line: { color, width: 3, dash: TRAZO_ESCENARIO_NOMBRADO[escenario] },
        hoverinfo: 'skip',
      },
      {
        x: completa.x,
        y: completa.y,
        type: 'scatter',
        mode: 'markers',
        showlegend: false,
        marker: { size: 7, color, symbol: 'diamond', line: { color: '#ffffff', width: 1.1 } },
        hovertemplate: `Escenario ${escenario.toLowerCase()}<br>%{x}: <b>%{y:.4f}</b><extra>${nombreSeguro}</extra>`,
      },
    );

    valores2030.push(`${nombreSeguro}: ${valores.at(-1).toFixed(4)}`);
  });

  const primero = panel.pais(nombres[0]);
  const annotations = [];
  if (primero) annotations.push(anotacionInicio(primero.proyeccion[0]));
  if (valores2030.length) {
    annotations.push({
      x: 0.01,
      y: 0.03,
      xref: 'paper',
      yref: 'paper',
      xanchor: 'left',
      yanchor: 'bottom',
      align: 'left',
      showarrow: false,
      text: `<b>Valores 2030 · ${escenario.toLowerCase()}</b><br>${valores2030.join('<br>')}`,
      font: { size: 11, color: COLOR_TEXTO },
      bgcolor: 'rgba(255,255,255,0.96)',
      bordercolor: '#b0bec5',
      borderpad: 8,
      borderwidth: 1,
    });
  }

  return {
    data,
    layout: {
      ...estiloBase(10.5),
      annotations,
    },
  };
}
