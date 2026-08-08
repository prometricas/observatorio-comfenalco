/**
 * felicidadService — Lectura de la base de Felicidad Nacional Bruta y
 * construcción de su figura (cuaderno "App_Felicidad_Nacional").
 *
 * La base es una sola hoja con la serie de Colombia 2015–2050: cinco
 * componentes y el índice FNB adaptado (0–100), con el histórico marcado
 * como VH y el escenario tendencial del propio Excel como ET.
 *
 * Se porta la vista del explorador multiindicador del cuaderno: histórico
 * con puntos, escenario tendencial con rombos, corte histórico/proyección
 * y caja con los valores a 2050. Las cuatro series de la vista por
 * defecto del cuaderno arrancan visibles; las otras dos se activan desde
 * la leyenda. Las trayectorias simuladas y los escenarios pesimista y
 * optimista del cuaderno NO se portan: son construcciones estadísticas de
 * análisis (Monte Carlo sobre la volatilidad histórica), no datos de la
 * base — mismo criterio que el constructor de escenarios de la OCDE.
 *
 * Robustez frente a archivos regenerados, como el propio cuaderno: la
 * fila de encabezados se localiza buscando "Año | Clasificación" (no por
 * posición), la tabla principal termina en la columna del índice FNB, y
 * el año de corte sale del último año marcado VH. La nota metodológica se
 * toma de la fila que la contiene, si existe.
 */
import * as XLSX from 'xlsx';
import { normalizarNombre } from '../data/departamentos.js';
import { marcaDeCorte } from './vidaMejorFiguras.js';

/* Colores de marca por componente; el índice es el protagonista. */
const COLORES_POR_CLAVE = [
  { clave: 'indice fnb', color: '#005744', grosor: 3.4 },
  { clave: 'salud', color: '#74c1a2', grosor: 2.4 },
  { clave: 'educacion', color: '#58b250', grosor: 2.4 },
  { clave: 'ecologica', color: '#5eb2ae', grosor: 2.4 },
  { clave: 'pobre', color: '#3399a3', grosor: 2.4 },
  { clave: 'vivienda', color: '#ed7a3f', grosor: 2.4 },
];

/* Claves de las series visibles al abrir (vista por defecto del cuaderno,
   la de la imagen aprobada): índice, educación, no pobreza y vivienda. */
const CLAVES_VISIBLES = ['indice fnb', 'educacion', 'pobre', 'vivienda'];

const COLOR_TEXTO = '#22312c';
const COLOR_TEXTO_SUAVE = '#55655e';
const COLOR_REJILLA = 'rgba(0, 87, 68, 0.08)';
const FUENTE_GRAFICA = "'Catamaran', 'Segoe UI', sans-serif";

/** Alto de la figura; el ancho es fluido. */
export const ALTO_FIGURA_FNB = 520;

/* Caché de promesas por URL: una lectura por sesión. */
const cacheBases = new Map();

function aNumero(valor) {
  if (valor === null || valor === undefined || valor === '') return null;
  const numero = typeof valor === 'number' ? valor : Number(String(valor).trim());
  return Number.isFinite(numero) ? numero : null;
}

/* Etiqueta corta de un encabezado: sin unidades y con separador medio.
   "Salud: afiliación al SGSSS (%)" → "Salud · afiliación al SGSSS". */
function etiquetaCorta(encabezado) {
  return String(encabezado)
    .replace(/\s*\((%|0–100|0-100)\)\s*$/u, '')
    .replace(/:\s+/, ' · ')
    .trim();
}

/* Color y grosor de un indicador según la clave que contenga su nombre. */
function estiloDeIndicador(campo) {
  const nombre = normalizarNombre(campo);
  return (
    COLORES_POR_CLAVE.find((entrada) => nombre.includes(entrada.clave)) ?? {
      color: '#55655e',
      grosor: 2.4,
    }
  );
}

/**
 * Descarga e interpreta la base. Devuelve los catálogos y series listos
 * para la figura y la tabla accesible.
 */
export function cargarBaseFelicidad(url) {
  if (cacheBases.has(url)) return cacheBases.get(url);

  const promesa = (async () => {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`No se encontró la base de datos del indicador (${respuesta.status}).`);
    }

    const libro = XLSX.read(await respuesta.arrayBuffer(), {
      dense: true,
      cellDates: false,
      cellStyles: false,
      cellHTML: false,
    });
    const hoja = libro.Sheets[libro.SheetNames[0]];
    if (!hoja) throw new Error('El archivo no contiene hojas.');

    const filas = XLSX.utils.sheet_to_json(hoja, { header: 1, blankrows: false });

    /* Fila de encabezados: "Año | Clasificación | …" (búsqueda, no posición). */
    const filaEncabezados = filas.findIndex(
      (fila) =>
        normalizarNombre(fila?.[0]) === 'ano' && normalizarNombre(fila?.[1]).includes('clasificacion'),
    );
    if (filaEncabezados === -1) {
      throw new Error('No se encontró la fila de encabezados "Año | Clasificación".');
    }

    /* La tabla principal termina en la columna del índice FNB adaptado. */
    const encabezados = filas[filaEncabezados];
    const columnaIndice = encabezados.findIndex((celda) =>
      normalizarNombre(celda).includes('indice fnb adaptado'),
    );
    if (columnaIndice === -1) {
      throw new Error('No se encontró la columna "Índice FNB adaptado".');
    }

    const indicadores = [];
    for (let columna = 2; columna <= columnaIndice; columna += 1) {
      const campo = String(encabezados[columna]).trim();
      indicadores.push({
        campo,
        columna,
        etiqueta: etiquetaCorta(campo),
        ...estiloDeIndicador(campo),
        esIndice: columna === columnaIndice,
      });
    }

    /* Filas anuales VH (histórico) y ET (escenario tendencial del Excel). */
    const anuales = filas
      .slice(filaEncabezados + 1)
      .map((fila) => ({
        anio: aNumero(fila?.[0]),
        clasificacion: String(fila?.[1] ?? '').trim().toUpperCase(),
        valores: fila,
      }))
      .filter((fila) => fila.anio !== null && (fila.clasificacion === 'VH' || fila.clasificacion === 'ET'))
      .sort((a, b) => a.anio - b.anio);
    if (!anuales.length) throw new Error('La tabla principal no contiene filas anuales.');

    const historicas = anuales.filter((fila) => fila.clasificacion === 'VH');
    if (!historicas.length) throw new Error('La base no contiene filas históricas (VH).');
    const anioCorte = historicas[historicas.length - 1].anio;

    /* Nota metodológica de la propia base (si el archivo la trae). */
    const filaNota = filas
      .slice(filaEncabezados + 1)
      .find((fila) => normalizarNombre(fila?.[0]).startsWith('nota metodologica'));
    const nota = filaNota ? String(filaNota[0]).trim() : null;

    /* Series por indicador, con el puente histórico→tendencial ya hecho. */
    const series = indicadores.map((indicador) => {
      const puntos = (lista) =>
        lista
          .map((fila) => ({ anio: fila.anio, valor: aNumero(fila.valores[indicador.columna]) }))
          .filter((punto) => punto.valor !== null);
      const historico = puntos(anuales.filter((f) => f.clasificacion === 'VH'));
      const tendencial = puntos(anuales.filter((f) => f.clasificacion === 'ET'));
      const ultimo = historico[historico.length - 1];
      return {
        ...indicador,
        historico,
        tendencial: ultimo ? [ultimo, ...tendencial] : tendencial,
        valorFinal: tendencial.length ? tendencial[tendencial.length - 1].valor : null,
      };
    });

    return {
      anioMin: anuales[0].anio,
      anioMax: anuales[anuales.length - 1].anio,
      anioCorte,
      nota,
      series,
    };
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
