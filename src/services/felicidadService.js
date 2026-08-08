/**
 * felicidadService — Carga de la base de Felicidad Nacional Bruta y
 * construcción de su figura (cuaderno "App_Felicidad_Nacional").
 *
 * La base es una sola hoja con la serie de Colombia 2015–2050: cinco
 * componentes y el índice FNB adaptado (0–100), con el histórico marcado
 * como VH y el escenario tendencial del propio Excel como ET.
 *
 * Orden de carga (del camino más rápido al más lento):
 * 1. Archivo precalculado que cada build deja junto al Excel — sin
 *    descargar el Excel ni el intérprete SheetJS.
 * 2. Descarga completa + interpretación en el navegador, con SheetJS
 *    importado bajo demanda (Excel reemplazado por el cliente). La
 *    normalización es la MISMA del build (normalizacionFelicidad.js).
 *
 * Se porta la vista del explorador multiindicador del cuaderno: histórico
 * con puntos, escenario tendencial con rombos, corte histórico/proyección
 * y caja con los valores a 2050. Las cuatro series de la vista por
 * defecto del cuaderno arrancan visibles; las otras dos se activan desde
 * la leyenda. Las trayectorias simuladas y los escenarios pesimista y
 * optimista del cuaderno NO se portan: son construcciones estadísticas de
 * análisis, no datos de la base.
 */
import { normalizarNombre } from '../data/departamentos.js';
import { FORMATO_FELICIDAD } from './normalizacionFelicidad.js';
import { cargarRegistroPrecalculado } from './precalculados.js';
import { marcaDeCorte } from './vidaMejorFiguras.js';

/* Claves de las series visibles al abrir (vista por defecto del cuaderno,
   la de la imagen aprobada): índice, educación, no pobreza y vivienda. */
const CLAVES_VISIBLES = ['indice fnb', 'educacion', 'pobre', 'vivienda'];

const COLOR_TEXTO = '#22312c';
const COLOR_TEXTO_SUAVE = '#55655e';
const COLOR_REJILLA = 'rgba(0, 87, 68, 0.08)';
const FUENTE_GRAFICA = "'Catamaran', 'Segoe UI', sans-serif";

/** Alto de la figura; el ancho es fluido. */
export const ALTO_FIGURA_FNB = 520;

/* Caché de promesas por URL: una carga por sesión. */
const cacheBases = new Map();

/**
 * Descarga (precalculado o Excel) e interpreta la base. Lanza un error
 * descriptivo si el archivo falta o no tiene la estructura esperada.
 */
export function cargarBaseFelicidad(url) {
  if (cacheBases.has(url)) return cacheBases.get(url);

  const promesa = (async () => {
    /* 1. Vía rápida: el precalculado del build. */
    const registro = await cargarRegistroPrecalculado(
      url,
      /\.xlsx$/,
      (r, tamanoPublicado) =>
        r.formato === FORMATO_FELICIDAD &&
        r.tipo === 'felicidad' &&
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

    const [XLSX, contenido] = await Promise.all([
      import('xlsx'),
      respuesta.arrayBuffer(),
    ]);
    const { normalizarFelicidad } = await import('./normalizacionFelicidad.js');
    const resultado = normalizarFelicidad(XLSX, contenido);
    if (!resultado.disponible) {
      throw new Error('El archivo no tiene la estructura esperada de la base FNB.');
    }
    return resultado.estructura;
  })();

  promesa.catch(() => cacheBases.delete(url));
  cacheBases.set(url, promesa);
  return promesa;
}

/**
 * Figura del explorador multiindicador: una pareja de trazas por serie
 * (histórico con puntos y tendencial con rombos) agrupadas en la leyenda,
 * el corte observado/proyectado y la caja de valores al horizonte.
 */
export function construirFiguraFnb(datos) {
  const corte = marcaDeCorte(datos.anioCorte, true);
  const data = [];

  for (const serie of datos.series) {
    const visible = CLAVES_VISIBLES.some((clave) => normalizarNombre(serie.campo).includes(clave))
      ? true
      : 'legendonly';

    data.push({
      x: serie.historico.map((p) => p.anio),
      y: serie.historico.map((p) => p.valor),
      type: 'scatter',
      mode: 'lines+markers',
      name: serie.etiqueta,
      legendgroup: serie.campo,
      visible,
      line: { color: serie.color, width: serie.grosor },
      marker: { size: 5.5, color: serie.color },
      hovertemplate: `%{x}: <b>%{y:.2f}</b><extra>${serie.etiqueta} · histórico</extra>`,
    });
    data.push({
      x: serie.tendencial.map((p) => p.anio),
      y: serie.tendencial.map((p) => p.valor),
      type: 'scatter',
      mode: 'lines+markers',
      name: `${serie.etiqueta} · tendencial`,
      legendgroup: serie.campo,
      showlegend: false,
      visible,
      line: { color: serie.color, width: serie.grosor, dash: 'dash' },
      marker: { size: 5.5, color: serie.color, symbol: 'diamond', line: { color: '#ffffff', width: 0.8 } },
      hovertemplate: `%{x}: <b>%{y:.2f}</b><extra>${serie.etiqueta} · tendencial</extra>`,
    });
  }

  /* Caja con los valores del escenario tendencial al horizonte, para las
     series de la vista por defecto (réplica de la caja del cuaderno). */
  const visiblesFinal = datos.series.filter(
    (serie) =>
      serie.valorFinal !== null &&
      CLAVES_VISIBLES.some((clave) => normalizarNombre(serie.campo).includes(clave)),
  );
  const cajaValores = {
    x: 0.01,
    y: 0.03,
    xref: 'paper',
    yref: 'paper',
    xanchor: 'left',
    yanchor: 'bottom',
    align: 'left',
    showarrow: false,
    text:
      `<b>Escenario tendencial a ${datos.anioMax}</b><br>` +
      visiblesFinal.map((serie) => `${serie.etiqueta}: ${serie.valorFinal.toFixed(2)}`).join('<br>'),
    font: { size: 11, color: COLOR_TEXTO },
    bgcolor: 'rgba(255,255,255,0.96)',
    bordercolor: '#90A4AE',
    borderwidth: 1,
    borderpad: 7,
  };

  return {
    data,
    layout: {
      height: ALTO_FIGURA_FNB,
      autosize: true,
      /* Sin zoom ni paneo (decisión del cliente: los usuarios lo
         activaban sin querer y perdían la vista); el hover y la leyenda
         siguen funcionando. */
      dragmode: false,
      font: { family: FUENTE_GRAFICA, size: 13, color: COLOR_TEXTO },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      hoverlabel: { bgcolor: '#ffffff', bordercolor: '#005744', font: { family: FUENTE_GRAFICA, size: 12 } },
      /* Sin título interno: el encabezado lo pone la tarjeta del módulo, y
         con seis series la leyenda necesita toda la franja superior (se
         envuelve en varias filas según el ancho). */
      legend: { orientation: 'h', yanchor: 'bottom', y: 1.02, xanchor: 'left', x: 0, bgcolor: 'rgba(0,0,0,0)' },
      margin: { t: 84, l: 62, r: 28, b: 56 },
      xaxis: {
        title: { text: 'Año', font: { size: 12, color: COLOR_TEXTO_SUAVE } },
        showgrid: false,
        zeroline: false,
        tickformat: 'd',
        dtick: 5,
        color: COLOR_TEXTO_SUAVE,
        fixedrange: true,
      },
      yaxis: {
        title: { text: 'Valor del indicador (0–100)', font: { size: 12, color: COLOR_TEXTO_SUAVE } },
        range: [0, 103],
        gridcolor: COLOR_REJILLA,
        zeroline: false,
        color: COLOR_TEXTO_SUAVE,
        fixedrange: true,
      },
      shapes: [corte.forma],
      annotations: [corte.rotulo, cajaValores],
    },
  };
}
