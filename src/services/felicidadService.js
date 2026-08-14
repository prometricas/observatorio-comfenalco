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
 * Cuatro figuras portadas del cuaderno (las cuatro vistas del módulo):
 * 1. Explorador multiindicador: histórico con puntos, tendencial con
 *    rombos, corte histórico/proyección y caja de valores a 2050.
 * 2. Panel de escenarios por indicador (a pedido del cliente,
 *    2026-08-12): histórico, tres escenarios con banda simulada del 95 %
 *    y trayectorias intermedias opcionales, con las cajas de cifras del
 *    cuaderno. Los insumos simulados vienen precalculados en la
 *    estructura (`prospectivaFelicidad`, ver su adaptación documentada).
 * 3. Radar de estructura del índice: los cinco componentes en un año y
 *    escenario elegidos. El paquete básico de Plotly no trae trazas
 *    polares, así que el radar se dibuja en coordenadas cartesianas
 *    (anillos y radios como formas; el polígono, como traza scatter) —
 *    mismo aspecto, sin cambiar de paquete.
 * 4. Comparador lineal multiindicador (a pedido del cliente, 2026-08-14):
 *    de dos a tres indicadores superpuestos en su evolución completa, con
 *    la referencia proxy de la OCDE opcional y actualización automática
 *    (sin el botón del cuaderno).
 * Las curvas prospectivas se suavizan con la misma interpolación PCHIP
 * monótona del cuaderno, densificada aquí (no viaja en el JSON).
 */
import { normalizarNombre } from '../data/departamentos.js';
import { FORMATO_FELICIDAD, normalizarFelicidad } from './normalizacionFelicidad.js';
import { cargarRegistroPrecalculado } from './precalculados.js';
import { marcaDeCorte } from './vidaMejorFiguras.js';

/* Claves de las series visibles al abrir (vista por defecto del cuaderno,
   la de la imagen aprobada): índice, educación, no pobreza y vivienda. */
const CLAVES_VISIBLES = ['indice fnb', 'educacion', 'pobre', 'vivienda'];

/* Colores estándar de escenarios del portal (manual de figuras). */
const COLOR_ESCENARIO_FNB = {
  Tendencial: '#3399a3',
  Optimista: '#58b250',
  Pesimista: '#ed7a3f',
};
const TRAZO_ESCENARIO_FNB = { Tendencial: 'dash', Optimista: 'solid', Pesimista: 'dot' };
const COLOR_HISTORICO_FNB = '#005744';
const COLOR_BANDA_FNB = 'rgba(51, 153, 163, 0.12)';
const COLOR_BORDE_BANDA_FNB = 'rgba(51, 153, 163, 0.45)';
const COLOR_TRAYECTORIAS_FNB = 'rgba(51, 153, 163, 0.20)';

/** Los tres escenarios de las vistas prospectivas, en orden de lectura. */
export const ESCENARIOS_FNB = ['Pesimista', 'Tendencial', 'Optimista'];

/** Años consultables del radar (los hitos del cuaderno). */
export const ANIOS_RADAR_FNB = [2015, 2020, 2025, 2030, 2040, 2050];

/**
 * Referencia proxy de la OCDE del comparador (73/100). Es la del
 * cuaderno: una referencia VISUAL, no un equivalente metodológico del
 * índice FNB adaptado — la nota bajo la figura lo aclara.
 */
export const PROXY_OCDE_FNB = 73;

/** Máximo de indicadores comparables a la vez (petición del cliente). */
export const MAXIMO_COMPARADOR_FNB = 3;

const COLOR_TEXTO = '#22312c';
const COLOR_TEXTO_SUAVE = '#55655e';
const COLOR_REJILLA = 'rgba(0, 87, 68, 0.08)';
const FUENTE_GRAFICA = "'Catamaran', 'Segoe UI', sans-serif";

/* Alto de la figura; el ancho es fluido. */
const ALTO_FIGURA_FNB = 520;

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

    const tipoContenido = respuesta.headers.get('content-type') ?? '';
    if (tipoContenido.includes('text/html')) {
      throw new Error('El servidor no entregó la base de datos del indicador.');
    }

    const [XLSX, contenido] = await Promise.all([
      import('xlsx'),
      respuesta.arrayBuffer(),
    ]);
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

/* ── Interpolación PCHIP (la del cuaderno) ───────────────────────── */

/**
 * Densifica una serie anual con interpolación cúbica monótona (PCHIP),
 * como hacen los cuadernos con scipy: curvas suaves sin sobreimpulsos.
 * El hover vive en los marcadores anuales, no en la curva densa. Se
 * exporta porque también la usan las figuras de Calidad de vida digital
 * (mismo patrón que `marcaDeCorte` en vidaMejorFiguras).
 */
export function densificarPchip(xs, ys, puntos = 420) {
  const n = xs.length;
  if (n < 2) return { x: [...xs], y: [...ys] };

  const pasos = [];
  const secantes = [];
  for (let i = 0; i < n - 1; i += 1) {
    pasos.push(xs[i + 1] - xs[i]);
    secantes.push((ys[i + 1] - ys[i]) / pasos[i]);
  }

  /* Derivadas interiores por media armónica ponderada (Fritsch–Butland);
     ceros donde la serie cambia de sentido, para no sobrepasar. */
  const derivadas = new Array(n).fill(0);
  for (let i = 1; i < n - 1; i += 1) {
    if (secantes[i - 1] * secantes[i] > 0) {
      const w1 = 2 * pasos[i] + pasos[i - 1];
      const w2 = pasos[i] + 2 * pasos[i - 1];
      derivadas[i] = (w1 + w2) / (w1 / secantes[i - 1] + w2 / secantes[i]);
    }
  }
  const extremo = (paso0, paso1, secante0, secante1) => {
    let derivada = ((2 * paso0 + paso1) * secante0 - paso0 * secante1) / (paso0 + paso1);
    if (derivada * secante0 <= 0) derivada = 0;
    else if (secante0 * secante1 <= 0 && Math.abs(derivada) > 3 * Math.abs(secante0)) {
      derivada = 3 * secante0;
    }
    return derivada;
  };
  derivadas[0] = extremo(pasos[0], pasos[1] ?? pasos[0], secantes[0], secantes[1] ?? secantes[0]);
  derivadas[n - 1] = extremo(
    pasos[n - 2],
    pasos[n - 3] ?? pasos[n - 2],
    secantes[n - 2],
    secantes[n - 3] ?? secantes[n - 2],
  );

  const densoX = [];
  const densoY = [];
  for (let k = 0; k < puntos; k += 1) {
    const x = xs[0] + ((xs[n - 1] - xs[0]) * k) / (puntos - 1);
    let i = n - 2;
    for (let s = 0; s < n - 1; s += 1) {
      if (x <= xs[s + 1]) {
        i = s;
        break;
      }
    }
    const t = (x - xs[i]) / pasos[i];
    const h00 = (1 + 2 * t) * (1 - t) * (1 - t);
    const h10 = t * (1 - t) * (1 - t);
    const h01 = t * t * (3 - 2 * t);
    const h11 = t * t * (t - 1);
    densoX.push(x);
    densoY.push(
      h00 * ys[i] + h10 * pasos[i] * derivadas[i] + h01 * ys[i + 1] + h11 * pasos[i] * derivadas[i + 1],
    );
  }
  return { x: densoX, y: densoY };
}

/* ── Vista 2: panel de escenarios por indicador ──────────────────── */

/**
 * Valor de un indicador en un año y escenario. Antes del corte es el
 * dato histórico (exacto); después, el tendencial del Excel o el
 * escenario simulado correspondiente. Devuelve null si no existe.
 */
export function valorFnbEnAnio(datos, campo, anio, escenario = 'Tendencial') {
  const serie = datos.series.find((s) => s.campo === campo);
  if (!serie) return null;
  if (anio <= datos.anioCorte) {
    return serie.historico.find((punto) => punto.anio === anio)?.valor ?? null;
  }
  if (escenario === 'Tendencial') {
    return serie.tendencial.find((punto) => punto.anio === anio)?.valor ?? null;
  }
  const prospectiva = datos.prospectiva?.porCampo?.[campo];
  const posicion = datos.prospectiva?.aniosProyeccion?.indexOf(anio) ?? -1;
  if (!prospectiva || posicion === -1) return null;
  return prospectiva[escenario === 'Pesimista' ? 'pesimista' : 'optimista'][posicion];
}

/**
 * Figura del panel de escenarios de un indicador: histórico, escenarios
 * con banda simulada del 95 %, trayectorias intermedias opcionales y las
 * cajas de cifras del cuaderno. Leyenda ABAJO, legible (petición del
 * cliente), y ejes fijos sin zoom como el resto del portal.
 */
export function construirFiguraEscenariosFnb(datos, campo, mostrarTrayectorias, mostrarTresEscenarios) {
  const serie = datos.series.find((s) => s.campo === campo);
  const prospectiva = datos.prospectiva.porCampo[campo];
  const aniosProyeccion = datos.prospectiva.aniosProyeccion;

  const historicoX = serie.historico.map((p) => p.anio);
  const historicoY = serie.historico.map((p) => p.valor);
  const ancla = historicoY[historicoY.length - 1];
  const inicioProyeccion = aniosProyeccion[0];

  /* Ejes anuales de la proyección, con el puente en el año de corte. */
  const proyeccionX = [datos.anioCorte, ...aniosProyeccion];
  const bandaInferior = [ancla, ...prospectiva.bandaInferior];
  const bandaSuperior = [ancla, ...prospectiva.bandaSuperior];

  const bandaInferiorDensa = densificarPchip(proyeccionX, bandaInferior);
  const bandaSuperiorDensa = densificarPchip(proyeccionX, bandaSuperior);
  const historicoDenso = densificarPchip(historicoX, historicoY);

  const data = [
    /* Corredor simulado: borde superior punteado y relleno al inferior. */
    {
      x: bandaSuperiorDensa.x,
      y: bandaSuperiorDensa.y,
      type: 'scatter',
      mode: 'lines',
      line: { color: COLOR_BORDE_BANDA_FNB, width: 0.9, dash: 'dot' },
      hoverinfo: 'skip',
      showlegend: false,
    },
    {
      x: bandaInferiorDensa.x,
      y: bandaInferiorDensa.y,
      type: 'scatter',
      mode: 'lines',
      fill: 'tonexty',
      fillcolor: COLOR_BANDA_FNB,
      line: { color: COLOR_BORDE_BANDA_FNB, width: 0.9, dash: 'dot' },
      hoverinfo: 'skip',
      name: 'Intervalo simulado 95 %',
    },
  ];

  if (mostrarTrayectorias) {
    prospectiva.trayectorias.forEach((trayectoria, posicion) => {
      const densa = densificarPchip(proyeccionX, [ancla, ...trayectoria]);
      data.push({
        x: densa.x,
        y: densa.y,
        type: 'scatter',
        mode: 'lines',
        line: { color: COLOR_TRAYECTORIAS_FNB, width: 0.85 },
        hoverinfo: 'skip',
        showlegend: posicion === 0,
        name: 'Trayectorias intermedias',
      });
    });
  }

  /* Histórico: curva suave sin hover + marcadores anuales con hover. */
  data.push(
    {
      x: historicoDenso.x,
      y: historicoDenso.y,
      type: 'scatter',
      mode: 'lines',
      name: 'Histórico',
      line: { color: COLOR_HISTORICO_FNB, width: 2.7 },
      hoverinfo: 'skip',
    },
    {
      x: historicoX,
      y: historicoY,
      type: 'scatter',
      mode: 'markers',
      showlegend: false,
      marker: { size: 5.8, color: COLOR_HISTORICO_FNB, line: { color: '#ffffff', width: 1 } },
      hovertemplate: `%{x}: <b>%{y:.2f}</b><extra>${serie.etiqueta} · histórico</extra>`,
    },
  );

  const escenarios = mostrarTresEscenarios ? ESCENARIOS_FNB : ['Tendencial'];
  const finales = {};
  for (const escenario of escenarios) {
    const valores =
      escenario === 'Tendencial'
        ? aniosProyeccion.map((anio) => valorFnbEnAnio(datos, campo, anio, 'Tendencial'))
        : prospectiva[escenario === 'Pesimista' ? 'pesimista' : 'optimista'];
    const completos = [ancla, ...valores];
    finales[escenario] = completos[completos.length - 1];
    const densa = densificarPchip(proyeccionX, completos);
    data.push(
      {
        x: densa.x,
        y: densa.y,
        type: 'scatter',
        mode: 'lines',
        name: `Escenario ${escenario.toLowerCase()}`,
        line: {
          color: COLOR_ESCENARIO_FNB[escenario],
          width: escenario === 'Tendencial' ? 2.8 : 2.4,
          dash: TRAZO_ESCENARIO_FNB[escenario],
        },
        hoverinfo: 'skip',
      },
      {
        x: proyeccionX,
        y: completos,
        type: 'scatter',
        mode: 'markers',
        showlegend: false,
        marker: {
          size: 5.2,
          color: COLOR_ESCENARIO_FNB[escenario],
          symbol: 'diamond',
          line: { color: '#ffffff', width: 0.9 },
        },
        hovertemplate: `%{x}: <b>%{y:.2f}</b><extra>${serie.etiqueta} · ${escenario.toLowerCase()}</extra>`,
      },
    );
  }

  /* Cifras de las cajas del cuaderno (histórico y tendencial exactos). */
  const valor2025 = ancla;
  const valor2026 = valorFnbEnAnio(datos, campo, inicioProyeccion, 'Tendencial');
  const valor2030 = valorFnbEnAnio(datos, campo, 2030, 'Tendencial');
  const valorFinal = valorFnbEnAnio(datos, campo, datos.anioMax, 'Tendencial');
  const pendiente = datos.pendientes?.[campo];

  const annotations = [
    {
      x: inicioProyeccion,
      y: valor2026,
      xref: 'x',
      yref: 'y',
      text: `Inicio de la proyección ${inicioProyeccion}`,
      showarrow: true,
      arrowhead: 2,
      arrowcolor: '#c9a23f',
      arrowsize: 1,
      ax: -52,
      ay: -40,
      font: { size: 10, color: '#8a5f00' },
      bgcolor: 'rgba(255,247,224,0.97)',
      bordercolor: '#e6c979',
      borderpad: 4,
      borderwidth: 1,
    },
    {
      x: datos.anioMax,
      y: valorFinal,
      xref: 'x',
      yref: 'y',
      text:
        `<b>${datos.anioMax} tendencial: ${valorFinal?.toFixed(2)}</b><br>` +
        `95 %: [${prospectiva.bandaInferior.at(-1).toFixed(2)} – ${prospectiva.bandaSuperior.at(-1).toFixed(2)}]`,
      showarrow: true,
      arrowhead: 2,
      arrowcolor: COLOR_TEXTO_SUAVE,
      arrowsize: 1,
      ax: 14,
      ay: -48,
      font: { size: 10, color: COLOR_TEXTO },
      bgcolor: 'rgba(255,255,255,0.97)',
      bordercolor: '#b0bec5',
      borderpad: 6,
      borderwidth: 1,
    },
    {
      x: 0.012,
      y: 0.03,
      xref: 'paper',
      yref: 'paper',
      xanchor: 'left',
      yanchor: 'bottom',
      align: 'left',
      showarrow: false,
      text:
        '<b>Indicadores clave</b><br>' +
        `Colombia · ${serie.etiqueta}<br>` +
        `${datos.anioCorte} histórico: ${valor2025.toFixed(2)}<br>` +
        `${inicioProyeccion} tendencial: ${valor2026?.toFixed(2)}<br>` +
        `2030 tendencial: ${valor2030?.toFixed(2)}<br>` +
        `${datos.anioMax} tendencial: ${valorFinal?.toFixed(2)}<br>` +
        `Δ ${datos.anioCorte}–${datos.anioMax}: <b>${(valorFinal - valor2025 >= 0 ? '+' : '') + (valorFinal - valor2025).toFixed(2)} pp</b>` +
        (typeof pendiente === 'number'
          ? `<br>Pendiente documentada: ${(pendiente >= 0 ? '+' : '') + pendiente.toFixed(3)}`
          : ''),
      font: { size: 10.8, color: COLOR_TEXTO },
      bgcolor: 'rgba(255,255,255,0.96)',
      bordercolor: '#b0bec5',
      borderpad: 8,
      borderwidth: 1,
    },
  ];

  if (mostrarTresEscenarios) {
    annotations.push({
      x: 0.985,
      y: 0.9,
      xref: 'paper',
      yref: 'paper',
      xanchor: 'right',
      yanchor: 'top',
      align: 'right',
      showarrow: false,
      text:
        `<b>${datos.anioMax} pesimista:</b> ${finales.Pesimista.toFixed(2)}<br>` +
        `<b>${datos.anioMax} tendencial:</b> ${finales.Tendencial.toFixed(2)}<br>` +
        `<b>${datos.anioMax} optimista:</b> ${finales.Optimista.toFixed(2)}`,
      font: { size: 10.1, color: COLOR_TEXTO },
      bgcolor: 'rgba(255,255,255,0.94)',
      bordercolor: '#cfd8dc',
      borderpad: 6,
      borderwidth: 1,
    });
  }

  /* Rango vertical ceñido a lo dibujado, como el cuaderno. */
  const minimos = [...historicoY, ...bandaInferior];
  const maximos = [...historicoY, ...bandaSuperior];
  const minimo = Math.min(...minimos);
  const maximo = Math.max(...maximos);
  const holgura = Math.max(2, (maximo - minimo) * 0.18);

  return {
    data,
    layout: {
      height: 560,
      autosize: true,
      dragmode: false,
      font: { family: FUENTE_GRAFICA, size: 13, color: COLOR_TEXTO },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      hoverlabel: { bgcolor: '#ffffff', bordercolor: COLOR_HISTORICO_FNB, font: { family: FUENTE_GRAFICA, size: 12 } },
      /* Leyenda ABAJO, con aire propio para que sus etiquetas se lean
         completas (petición del cliente sobre la figura del cuaderno,
         donde quedaban montadas sobre la nota de fuente — aquí la nota
         va fuera del lienzo, como en todo el portal). */
      legend: {
        orientation: 'h',
        x: 0.5,
        xanchor: 'center',
        y: -0.09,
        yanchor: 'top',
        font: { size: 11.5 },
        bgcolor: 'rgba(255,255,255,0.95)',
      },
      margin: { t: 30, l: 62, r: 28, b: 96 },
      xaxis: {
        showgrid: false,
        zeroline: false,
        tickformat: 'd',
        dtick: 5,
        color: COLOR_TEXTO_SUAVE,
        fixedrange: true,
        range: [datos.anioMin - 0.6, datos.anioMax + 0.7],
      },
      yaxis: {
        title: { text: 'Valor del indicador (0–100)', font: { size: 12, color: COLOR_TEXTO_SUAVE } },
        gridcolor: COLOR_REJILLA,
        zeroline: false,
        color: COLOR_TEXTO_SUAVE,
        fixedrange: true,
        range: [Math.max(0, minimo - holgura), Math.min(103, maximo + holgura)],
      },
      shapes: [
        {
          type: 'line',
          x0: inicioProyeccion,
          x1: inicioProyeccion,
          yref: 'paper',
          y0: 0,
          y1: 1,
          line: { color: '#d8c26b', width: 1.4, dash: 'dashdot' },
          layer: 'below',
        },
        {
          type: 'rect',
          x0: inicioProyeccion,
          x1: datos.anioMax + 0.7,
          yref: 'paper',
          y0: 0,
          y1: 1,
          fillcolor: 'rgba(51, 153, 163, 0.03)',
          line: { width: 0 },
          layer: 'below',
        },
      ],
      annotations,
    },
  };
}

/* ── Vista 3: radar de estructura del índice ─────────────────────── */

/* rgba de un color hexadecimal, para el relleno del polígono. */
function rgbaDeHex(hex, alfa) {
  const limpio = hex.replace('#', '');
  const r = parseInt(limpio.slice(0, 2), 16);
  const g = parseInt(limpio.slice(2, 4), 16);
  const b = parseInt(limpio.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alfa})`;
}

/**
 * Radar de los cinco componentes en un año y escenario. Dibujado en
 * coordenadas cartesianas (el paquete básico de Plotly no trae trazas
 * polares): anillos y radios como formas, polígono como traza scatter
 * con hover en los vértices, y el valor del índice al centro.
 */
export function construirFiguraRadarFnb(datos, anio, escenario) {
  const componentes = datos.series.filter((serie) => !serie.esIndice);
  const indice = datos.series.find((serie) => serie.esIndice);
  const color = COLOR_ESCENARIO_FNB[escenario] ?? COLOR_HISTORICO_FNB;

  /* Un vértice por componente, desde el este y en sentido antihorario
     (la misma disposición del cuaderno). */
  const vertices = componentes.map((serie, posicion) => {
    const angulo = (2 * Math.PI * posicion) / componentes.length;
    const valor = valorFnbEnAnio(datos, serie.campo, anio, escenario) ?? 0;
    return { serie, angulo, valor, x: (valor / 100) * Math.cos(angulo), y: (valor / 100) * Math.sin(angulo) };
  });

  const cerrado = [...vertices, vertices[0]];
  const valorIndice = indice ? valorFnbEnAnio(datos, indice.campo, anio, escenario) : null;

  /* Anillos de la retícula (20–100) y un radio por componente. */
  const shapes = [20, 40, 60, 80, 100].map((nivel) => ({
    type: 'circle',
    x0: -nivel / 100,
    y0: -nivel / 100,
    x1: nivel / 100,
    y1: nivel / 100,
    line: { color: '#dde3d8', width: 1 },
    layer: 'below',
  }));
  vertices.forEach(({ angulo }) => {
    shapes.push({
      type: 'line',
      x0: 0,
      y0: 0,
      x1: Math.cos(angulo),
      y1: Math.sin(angulo),
      line: { color: '#e7ece8', width: 1 },
      layer: 'below',
    });
  });

  /* Rótulos de componente (fuera del anillo) y de la escala radial. */
  const annotations = vertices.map(({ serie, angulo }) => {
    const cos = Math.cos(angulo);
    return {
      x: 1.2 * cos,
      y: 1.2 * Math.sin(angulo),
      showarrow: false,
      text: serie.etiqueta.replace(' · ', '<br>'),
      font: { size: 12, color: COLOR_TEXTO },
      xanchor: cos > 0.35 ? 'left' : cos < -0.35 ? 'right' : 'center',
      align: cos > 0.35 ? 'left' : cos < -0.35 ? 'right' : 'center',
    };
  });
  [20, 40, 60, 80, 100].forEach((nivel) => {
    annotations.push({
      x: nivel / 100,
      y: -0.055,
      showarrow: false,
      text: String(nivel),
      font: { size: 10, color: COLOR_TEXTO_SUAVE },
    });
  });
  if (valorIndice !== null) {
    annotations.push({
      x: 0,
      y: 0,
      showarrow: false,
      text: `<b>Índice FNB</b><br>${valorIndice.toFixed(2)}`,
      font: { size: 14, color: COLOR_HISTORICO_FNB },
      bgcolor: 'rgba(255,255,255,0.9)',
      bordercolor: '#b0bec5',
      borderwidth: 1,
      borderpad: 7,
    });
  }

  return {
    data: [
      {
        x: cerrado.map((v) => v.x),
        y: cerrado.map((v) => v.y),
        type: 'scatter',
        mode: 'lines+markers',
        fill: 'toself',
        fillcolor: rgbaDeHex(color, 0.14),
        line: { color, width: 2.8 },
        marker: { size: 7, color, line: { color: '#ffffff', width: 1 } },
        text: cerrado.map((v) => `${v.serie.etiqueta}: ${v.valor.toFixed(2)}`),
        hovertemplate: '%{text}<extra></extra>',
        showlegend: false,
      },
    ],
    layout: {
      height: 560,
      autosize: true,
      dragmode: false,
      font: { family: FUENTE_GRAFICA, size: 13, color: COLOR_TEXTO },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      hoverlabel: { bgcolor: '#ffffff', bordercolor: COLOR_HISTORICO_FNB, font: { family: FUENTE_GRAFICA, size: 12 } },
      margin: { t: 30, l: 30, r: 30, b: 30 },
      /* Ejes ocultos con escala 1:1 — el radar necesita círculos reales. */
      xaxis: { visible: false, range: [-1.75, 1.75], fixedrange: true },
      yaxis: { visible: false, range: [-1.4, 1.4], fixedrange: true, scaleanchor: 'x', scaleratio: 1 },
      shapes,
      annotations,
    },
  };
}

/* ── Vista 4: comparador lineal multiindicador ───────────────────── */

/**
 * Comparador lineal del cuaderno: superpone la evolución completa
 * (histórico + tendencial, 2015–2050) de los indicadores elegidos, con
 * la referencia proxy de la OCDE opcional. Cada indicador conserva su
 * color de la vista principal; curvas PCHIP suaves con el hover en los
 * marcadores anuales. Leyenda abajo y ejes fijos sin zoom, como las
 * demás vistas del módulo.
 */
export function construirFiguraComparadorFnb(datos, campos, mostrarOcdeProxy) {
  const inicioProyeccion = datos.anioCorte + 1;
  const data = [];

  for (const campo of campos) {
    const serie = datos.series.find((s) => s.campo === campo);
    if (!serie) continue;

    /* Serie anual completa: histórico + tendencial sin el año puente
       repetido (el tendencial de la estructura arranca con él). */
    const completa = [...serie.historico, ...serie.tendencial.slice(1)];
    const anios = completa.map((punto) => punto.anio);
    const valores = completa.map((punto) => punto.valor);
    const densa = densificarPchip(anios, valores);

    data.push(
      {
        x: densa.x,
        y: densa.y,
        type: 'scatter',
        mode: 'lines',
        name: serie.etiqueta,
        line: { color: serie.color, width: 3.1 },
        hoverinfo: 'skip',
      },
      {
        x: anios,
        y: valores,
        type: 'scatter',
        mode: 'markers',
        showlegend: false,
        marker: { size: 4.5, color: serie.color, line: { color: '#ffffff', width: 0.7 } },
        hovertemplate: `%{x}: <b>%{y:.2f}</b><extra>${serie.etiqueta}</extra>`,
      },
    );
  }

  if (mostrarOcdeProxy) {
    data.push({
      x: [datos.anioMin, datos.anioMax],
      y: [PROXY_OCDE_FNB, PROXY_OCDE_FNB],
      type: 'scatter',
      mode: 'lines',
      name: `OCDE proxy (${PROXY_OCDE_FNB}/100)`,
      line: { color: COLOR_TEXTO_SUAVE, width: 2, dash: 'dot' },
      hovertemplate: `Referencia proxy OCDE: <b>${PROXY_OCDE_FNB.toFixed(2)}</b><extra></extra>`,
    });
  }

  return {
    data,
    layout: {
      height: 560,
      autosize: true,
      dragmode: false,
      font: { family: FUENTE_GRAFICA, size: 13, color: COLOR_TEXTO },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      hoverlabel: { bgcolor: '#ffffff', bordercolor: COLOR_HISTORICO_FNB, font: { family: FUENTE_GRAFICA, size: 12 } },
      /* Leyenda abajo y legible, como en las otras vistas nuevas. */
      legend: {
        orientation: 'h',
        x: 0.5,
        xanchor: 'center',
        y: -0.09,
        yanchor: 'top',
        font: { size: 11.5 },
        bgcolor: 'rgba(255,255,255,0.95)',
      },
      margin: { t: 30, l: 62, r: 28, b: 96 },
      xaxis: {
        showgrid: false,
        zeroline: false,
        tickformat: 'd',
        dtick: 5,
        color: COLOR_TEXTO_SUAVE,
        fixedrange: true,
        range: [datos.anioMin - 0.6, datos.anioMax + 0.7],
      },
      yaxis: {
        title: { text: 'Valor del indicador (0–100)', font: { size: 12, color: COLOR_TEXTO_SUAVE } },
        range: [0, 103],
        gridcolor: COLOR_REJILLA,
        zeroline: false,
        color: COLOR_TEXTO_SUAVE,
        fixedrange: true,
      },
      shapes: [
        {
          type: 'line',
          x0: inicioProyeccion,
          x1: inicioProyeccion,
          yref: 'paper',
          y0: 0,
          y1: 1,
          line: { color: '#d8c26b', width: 1.4, dash: 'dashdot' },
          layer: 'below',
        },
        {
          type: 'rect',
          x0: inicioProyeccion,
          x1: datos.anioMax + 0.7,
          yref: 'paper',
          y0: 0,
          y1: 1,
          fillcolor: 'rgba(51, 153, 163, 0.03)',
          line: { width: 0 },
          layer: 'below',
        },
      ],
    },
  };
}
