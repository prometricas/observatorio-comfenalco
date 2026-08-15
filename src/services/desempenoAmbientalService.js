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
 * Se porta el visualizador individual del cuaderno: el histórico
 * armonizado 2000–2025, la estrella del dato oficial del EPI 2026, los
 * tres escenarios anuales 2027–2050 con el corredor restrictivo–optimista
 * sombreado, las trayectorias intermedias dentro del corredor y las
 * cajas de indicadores clave y del cierre 2050. La figura es la misma
 * para las dos vistas del módulo: "Trayectoria y escenarios" (Colombia,
 * todo visible) y el "Explorador por entidad" (a pedido del cliente,
 * 2026-08-14: cualquiera de las 177 entidades más los promedios regional
 * y global, con casillas para las trayectorias y los tres escenarios, y
 * la leyenda abajo, más visible). Las demás figuras del cuaderno
 * (exploradores animados, comparadores y arquitectura del EPI) no se
 * portan en esta entrega.
 *
 * La estructura viaja compacta (formato 2) y aquí se rehidrata a un
 * panel con las entidades como puntos {anio, valor}, la misma forma que
 * consumía la figura cuando solo existía Colombia.
 */
import {
  FORMATO_DESEMPENO_AMBIENTAL,
  normalizarDesempenoAmbiental,
} from './normalizacionDesempenoAmbiental.js';
import { cargarRegistroPrecalculado } from './precalculados.js';
import { escaparTextoFigura } from './textoFigura.js';

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
 * Rehidrata la estructura compacta a un panel de consulta: nombres de
 * entidad en el orden del cuaderno (países, promedios regionales y
 * global) y `entidad(nombre)`, que arma bajo demanda —con caché— la
 * forma de puntos {anio, valor} que consumen la figura y las tablas,
 * con cada escenario futuro encadenado al dato oficial.
 */
function armarPanel(estructura) {
  const indice = new Map(estructura.entidades.map((entidad) => [entidad.nombre, entidad]));
  const cacheEntidades = new Map();
  const puntos = (anios, valores) =>
    anios.map((anio, posicion) => ({ anio, valor: valores[posicion] }));

  return {
    nombres: estructura.entidades.map((entidad) => entidad.nombre),
    paisPrincipal: estructura.paisPrincipal,
    totalPaises: estructura.totalPaises,
    arquitectura: estructura.arquitectura ?? null,
    entidad(nombre) {
      if (cacheEntidades.has(nombre)) return cacheEntidades.get(nombre);
      const compacta = indice.get(nombre);
      if (!compacta) return null;
      const oficial = { anio: estructura.anioOficial, valor: compacta.oficial };
      const encadenar = (valores) => [oficial, ...puntos(estructura.aniosProyeccion, valores)];
      const armada = {
        nombre: compacta.nombre,
        tipo: compacta.tipo,
        calidad: compacta.calidad,
        ranking:
          compacta.ranking !== null
            ? { posicion: compacta.ranking, total: estructura.totalPaises }
            : null,
        historico: puntos(estructura.aniosHistoricos, compacta.historico),
        oficial,
        tendencial: encadenar(compacta.tendencial),
        optimista: encadenar(compacta.optimista),
        restrictivo: encadenar(compacta.restrictivo),
      };
      cacheEntidades.set(nombre, armada);
      return armada;
    },
  };
}

/**
 * Descarga (precalculado o Excel) e interpreta la base; devuelve el
 * panel de entidades. Lanza un error descriptivo si el archivo falta o
 * no tiene la estructura esperada.
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
        Array.isArray(r.estructura?.entidades),
    );
    if (registro) return armarPanel(registro.estructura);

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
    return armarPanel(resultado.estructura);
  })();

  promesa.catch(() => cacheBases.delete(url));
  cacheBases.set(url, promesa);
  return promesa;
}

/** Cifras clave que muestran las cajas de la figura. */
function calcularIndicadoresClave(datos) {
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

/* ── Treemap de la arquitectura de pesos (hoja DICCIONARIO) ──────── */

/** Opción del selector de objetivo que muestra el índice completo. */
export const OBJETIVO_TODOS = 'Todos';

/* Lienzo virtual del treemap; el módulo lo renderiza con coordenadas en
   porcentaje conservando esta proporción. */
const LIENZO_ANCHO = 1000;
const LIENZO_ALTO = 640;
const RELLENO_MARCO = 5;
const FRANJA_ROTULO = 26;

/* Rampa de color por peso, del verde claro al azul petróleo profundo
   (adaptación de marca de la escala del cuaderno). */
const RAMPA_INICIO = '#dcefe6';
const RAMPA_FIN = '#16697a';

const hexACanales = (hex) =>
  [1, 3, 5].map((posicion) => parseInt(hex.slice(posicion, posicion + 2), 16));

function interpolarRampa(proporcion) {
  const inicio = hexACanales(RAMPA_INICIO);
  const fin = hexACanales(RAMPA_FIN);
  const canales = inicio.map((canal, i) => Math.round(canal + (fin[i] - canal) * proporcion));
  return `#${canales.map((canal) => canal.toString(16).padStart(2, '0')).join('')}`;
}

/* Texto negro-verdoso o blanco según cuál contraste mejor con el fondo;
   null si ninguno alcanza AA (la caja queda sin rótulo y el globito y la
   tabla accesible conservan la información). */
function colorTextoSobre(fondo) {
  const lineal = (canal) => {
    const c = canal / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = hexACanales(fondo).map(lineal);
  const luminancia = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  /* 0.0772 = luminancia relativa de #22312c (0.0272) + 0.05. */
  const contrasteClaro = (luminancia + 0.05) / 0.0772;
  const contrasteBlanco = 1.05 / (luminancia + 0.05);
  const mejor = Math.max(contrasteClaro, contrasteBlanco);
  if (mejor < 4.5) return null;
  return contrasteClaro >= contrasteBlanco ? '#22312c' : '#ffffff';
}

/**
 * Treemap cuadrificado (algoritmo de Bruls et al., el de Plotly): las
 * cajas se reparten en filas que mantienen proporciones cercanas al
 * cuadrado. `elementos` traen `valor`; devuelve copias con x/y/w/h.
 */
function repartirTreemap(elementos, x, y, ancho, alto) {
  const resultado = [];
  const total = elementos.reduce((suma, elemento) => suma + elemento.valor, 0);
  if (total <= 0 || ancho <= 0 || alto <= 0) return resultado;

  const pendientes = [...elementos]
    .sort((a, b) => b.valor - a.valor)
    .map((elemento) => ({ ...elemento, area: (elemento.valor / total) * ancho * alto }));

  let restoX = x;
  let restoY = y;
  let restoAncho = ancho;
  let restoAlto = alto;
  let fila = [];

  const peorProporcion = (candidata) => {
    const lado = Math.min(restoAncho, restoAlto) || 1;
    const suma = candidata.reduce((s, elemento) => s + elemento.area, 0);
    const grosor = suma / lado;
    let peor = 0;
    for (const elemento of candidata) {
      const largo = elemento.area / grosor;
      peor = Math.max(peor, grosor / largo, largo / grosor);
    }
    return peor;
  };

  const volcarFila = () => {
    const suma = fila.reduce((s, elemento) => s + elemento.area, 0);
    const enVertical = restoAncho >= restoAlto;
    const lado = enVertical ? restoAlto : restoAncho;
    const grosor = suma / lado;
    let avance = 0;
    for (const elemento of fila) {
      const largo = elemento.area / grosor;
      resultado.push(
        enVertical
          ? { ...elemento, x: restoX, y: restoY + avance, w: grosor, h: largo }
          : { ...elemento, x: restoX + avance, y: restoY, w: largo, h: grosor },
      );
      avance += largo;
    }
    if (enVertical) {
      restoX += grosor;
      restoAncho -= grosor;
    } else {
      restoY += grosor;
      restoAlto -= grosor;
    }
    fila = [];
  };

  for (const elemento of pendientes) {
    if (!fila.length || peorProporcion([...fila, elemento]) <= peorProporcion(fila)) {
      fila.push(elemento);
    } else {
      volcarFila();
      fila.push(elemento);
    }
  }
  if (fila.length) volcarFila();
  return resultado;
}

/**
 * Arma el treemap de la arquitectura del EPI para un objetivo (o el
 * índice completo): marcos de objetivo y categoría, hojas por indicador
 * con su color por peso y la ficha del globito, la rampa de referencia y
 * el resumen de pesos por objetivo del cuaderno. Coordenadas en
 * porcentaje del lienzo.
 */
export function construirTreemapEpi(arquitectura, objetivo) {
  const todos = arquitectura.indicadores;
  const visibles =
    objetivo === OBJETIVO_TODOS ? todos : todos.filter((fila) => fila.objetivo === objetivo);

  /* Rampa sobre los pesos visibles, como recalcula el cuaderno. */
  const pesosPct = visibles.map((fila) => fila.peso * 100);
  const minPct = Math.min(...pesosPct);
  const maxPct = Math.max(...pesosPct);
  const proporcionDe = (pesoPct) =>
    maxPct > minPct ? (pesoPct - minPct) / (maxPct - minPct) : 0.5;

  const marcos = [];
  const hojas = [];
  const aPorcentaje = (caja) => ({
    x: (caja.x / LIENZO_ANCHO) * 100,
    y: (caja.y / LIENZO_ALTO) * 100,
    w: (caja.w / LIENZO_ANCHO) * 100,
    h: (caja.h / LIENZO_ALTO) * 100,
  });

  const agrupar = (filas, clave) => {
    const grupos = new Map();
    for (const fila of filas) {
      if (!grupos.has(fila[clave])) grupos.set(fila[clave], []);
      grupos.get(fila[clave]).push(fila);
    }
    return [...grupos.entries()];
  };

  const pesoPromedio = (filas) =>
    filas.reduce((suma, fila) => suma + fila.peso * 100 * fila.peso, 0) /
    filas.reduce((suma, fila) => suma + fila.peso, 0);

  const marcosObjetivo = repartirTreemap(
    agrupar(visibles, 'objetivo').map(([nombre, filas]) => ({
      nombre,
      filas,
      valor: filas.reduce((suma, fila) => suma + fila.peso, 0),
    })),
    0,
    0,
    LIENZO_ANCHO,
    LIENZO_ALTO,
  );

  for (const marcoObjetivo of marcosObjetivo) {
    const colorObjetivo = interpolarRampa(proporcionDe(pesoPromedio(marcoObjetivo.filas)));
    marcos.push({
      nivel: 'objetivo',
      nombre: marcoObjetivo.nombre,
      color: colorObjetivo,
      colorTexto: colorTextoSobre(colorObjetivo),
      ...aPorcentaje(marcoObjetivo),
    });

    const interiorObjetivo = {
      x: marcoObjetivo.x + RELLENO_MARCO,
      y: marcoObjetivo.y + FRANJA_ROTULO,
      w: marcoObjetivo.w - 2 * RELLENO_MARCO,
      h: marcoObjetivo.h - FRANJA_ROTULO - RELLENO_MARCO,
    };
    if (interiorObjetivo.w <= 2 || interiorObjetivo.h <= 2) continue;

    const marcosCategoria = repartirTreemap(
      agrupar(marcoObjetivo.filas, 'categoria').map(([nombre, filas]) => ({
        nombre,
        filas,
        valor: filas.reduce((suma, fila) => suma + fila.peso, 0),
      })),
      interiorObjetivo.x,
      interiorObjetivo.y,
      interiorObjetivo.w,
      interiorObjetivo.h,
    );

    for (const marcoCategoria of marcosCategoria) {
      const colorCategoria = interpolarRampa(proporcionDe(pesoPromedio(marcoCategoria.filas)));
      marcos.push({
        nivel: 'categoria',
        nombre: marcoCategoria.nombre,
        color: colorCategoria,
        colorTexto: colorTextoSobre(colorCategoria),
        ...aPorcentaje(marcoCategoria),
      });

      const interiorCategoria = {
        x: marcoCategoria.x + RELLENO_MARCO,
        y: marcoCategoria.y + FRANJA_ROTULO,
        w: marcoCategoria.w - 2 * RELLENO_MARCO,
        h: marcoCategoria.h - FRANJA_ROTULO - RELLENO_MARCO,
      };
      if (interiorCategoria.w <= 2 || interiorCategoria.h <= 2) continue;

      for (const hoja of repartirTreemap(
        marcoCategoria.filas.map((fila) => ({ ...fila, valor: fila.peso })),
        interiorCategoria.x,
        interiorCategoria.y,
        interiorCategoria.w,
        interiorCategoria.h,
      )) {
        const pesoPct = hoja.peso * 100;
        const color = interpolarRampa(proporcionDe(pesoPct));
        hojas.push({
          nombre: hoja.indicador,
          codigo: hoja.codigo,
          unidad: hoja.unidad,
          polaridad: hoja.polaridad,
          cobertura:
            hoja.anioBase !== null && hoja.anioReciente !== null
              ? `${hoja.anioBase}–${hoja.anioReciente}`
              : '—',
          pesoPct,
          color,
          colorTexto: colorTextoSobre(color),
          ...aPorcentaje(hoja),
        });
      }
    }
  }

  /* Resumen de pesos por objetivo (la tabla del cuaderno), siempre del
     índice completo. */
  const resumen = agrupar(todos, 'objetivo')
    .map(([nombre, filas]) => ({
      objetivo: nombre,
      pesoPct: filas.reduce((suma, fila) => suma + fila.peso, 0) * 100,
    }))
    .sort((a, b) => b.pesoPct - a.pesoPct);

  return {
    marcos,
    hojas,
    rampa: { minPct, maxPct, colorInicio: RAMPA_INICIO, colorFin: RAMPA_FIN },
    resumen,
  };
}

/**
 * Objetivos disponibles para el selector: el índice completo y cada uno
 * de los objetivos del diccionario, en orden alfabético.
 */
export function objetivosDeArquitectura(arquitectura) {
  const nombres = [...new Set(arquitectura.indicadores.map((fila) => fila.objetivo))].sort(
    (a, b) => a.localeCompare(b, 'es'),
  );
  return [OBJETIVO_TODOS, ...nombres];
}

/**
 * Figura del visualizador individual: corredor, trayectorias
 * intermedias, histórico, dato oficial y los tres escenarios. `datos` es
 * una entidad del panel; las opciones sirven al explorador (casillas del
 * cuaderno y leyenda inferior más visible, a pedido del cliente).
 */
export function construirFiguraDesempenoAmbiental(datos, opciones = {}) {
  const {
    mostrarTrayectorias = true,
    mostrarTresEscenarios = true,
    leyendaAbajo = false,
  } = opciones;
  const anios = (serie) => serie.map((punto) => punto.anio);
  const valores = (serie) => serie.map((punto) => punto.valor);
  const cifras = calcularIndicadoresClave(datos);
  /* El nombre de la entidad y la "calidad" vienen del Excel: se escapan
     antes de entrar en el pseudo-HTML de Plotly (hover y anotación). */
  const nombreSeguro = escaparTextoFigura(datos.nombre);

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
  if (mostrarTrayectorias) {
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
  }

  /* Histórico armonizado 2000–2025. */
  data.push({
    x: anios(datos.historico),
    y: valores(datos.historico),
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Histórico armonizado',
    line: { color: COLOR_HISTORICO, width: 2.7 },
    marker: { color: COLOR_HISTORICO, size: 5, line: { color: '#ffffff', width: 0.7 } },
    hovertemplate: `<b>${nombreSeguro}</b><br>Año: %{x}<br>EPI histórico: <b>%{y:.2f}</b><extra></extra>`,
  });

  /* Puente sutil histórico→oficial (ajuste del cliente, 2026-08-14): un
     segmento fino punteado une el último punto armonizado con el dato
     oficial para que la trayectoria no se vea cortada. Las series siguen
     siendo distintas — la nota al pie conserva la aclaración — y el
     cuaderno original NO trae este segmento (allí el hueco es de diseño). */
  const ultimoHistorico = datos.historico[datos.historico.length - 1];
  data.push({
    x: [ultimoHistorico.anio, datos.oficial.anio],
    y: [ultimoHistorico.valor, datos.oficial.valor],
    type: 'scatter',
    mode: 'lines',
    line: { color: COLOR_HISTORICO, width: 1.6, dash: 'dot' },
    showlegend: false,
    hoverinfo: 'skip',
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
    hovertemplate: `<b>${nombreSeguro}</b><br>${datos.oficial.anio} oficial: <b>%{y:.2f}</b><extra></extra>`,
  });

  /* Los escenarios, con los estilos de línea del cuaderno; sin la
     casilla de los tres, solo el tendencial (el corredor se conserva). */
  const escenarios = [
    ['Pesimista / restrictivo', datos.restrictivo, COLOR_ESCENARIO.Restrictivo, 'dot'],
    ['Tendencial', datos.tendencial, COLOR_ESCENARIO.Tendencial, 'dash'],
    ['Optimista', datos.optimista, COLOR_ESCENARIO.Optimista, 'solid'],
  ].filter(([nombre]) => mostrarTresEscenarios || nombre === 'Tendencial');
  for (const [nombre, serie, color, guiones] of escenarios) {
    data.push({
      x: anios(serie),
      y: valores(serie),
      type: 'scatter',
      mode: 'lines+markers',
      name: nombre,
      line: { color, width: 3, dash: guiones },
      marker: { size: 4.8, color, symbol: 'diamond', line: { color: '#ffffff', width: 0.6 } },
      hovertemplate: `<b>${nombreSeguro}</b><br>Año: %{x}<br>${nombre}: <b>%{y:.2f}</b><extra></extra>`,
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
        `Calidad del modelo: ${escaparTextoFigura(cifras.calidad || '—')}`,
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
      /* Sin título interno: el encabezado lo pone la tarjeta del módulo.
         La vista principal lleva la leyenda arriba (siete entradas en la
         franja superior); el explorador la lleva ABAJO, con letra mayor
         y aire propio (petición del cliente: etiquetas más visibles). */
      legend: leyendaAbajo
        ? {
            orientation: 'h',
            x: 0.5,
            xanchor: 'center',
            y: -0.12,
            yanchor: 'top',
            font: { size: 11.5 },
            bgcolor: 'rgba(255,255,255,0.95)',
          }
        : { orientation: 'h', yanchor: 'bottom', y: 1.02, xanchor: 'left', x: 0, bgcolor: 'rgba(0,0,0,0)' },
      margin: leyendaAbajo ? { t: 30, l: 66, r: 28, b: 108 } : { t: 84, l: 66, r: 28, b: 56 },
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
