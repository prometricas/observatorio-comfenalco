/**
 * vidaMejorService — Carga de la base del Índice OCDE para una Vida
 * Mejor (cuaderno "App_Vida_Mejor").
 *
 * A diferencia de las tendencias, esta base es POR PAÍS (los 38 de la
 * OCDE, Colombia incluida) y no por departamento: aquí no interviene el
 * mapa ni el catálogo de códigos DANE.
 *
 * Orden de carga (del camino más rápido al más lento):
 * 1. Archivo precalculado que cada build deja junto al Excel: un JSON
 *    compacto (comprimido si el navegador lo soporta) con la estructura
 *    lista — sin descargar el Excel ni el intérprete SheetJS.
 * 2. Descarga completa + interpretación en el navegador, con SheetJS
 *    importado bajo demanda: es el camino cuando el cliente reemplazó el
 *    Excel en el servidor sin recompilar. La normalización es la MISMA
 *    del build (normalizacionVidaMejor.js).
 * En memoria se cachea una sola promesa por URL.
 */
import { FORMATO_VIDA_MEJOR, aNumero, normalizarVidaMejor } from './normalizacionVidaMejor.js';
import { cargarRegistroPrecalculado } from './precalculados.js';

/** Nombre del país que el portal destaca en todas las figuras. */
export const PAIS_DESTACADO = 'Colombia';

/**
 * Los ocho indicadores de la base, en el orden del cuaderno. `inverso`
 * marca aquellos en los que un valor MENOR es mejor: de ello dependen el
 * sentido del ranking y el del comparador.
 */
export const INDICADORES_OCDE = [
  { campo: 'Puntaje bienestar (0-10)', etiqueta: 'Puntaje de bienestar', unidad: 'puntos (0-10)', decimales: 2 },
  { campo: 'Esperanza de vida (años)', etiqueta: 'Esperanza de vida', unidad: 'años', decimales: 1 },
  { campo: 'Empleo (%)', etiqueta: 'Empleo', unidad: '%', decimales: 1 },
  {
    campo: 'Desempleo de larga duración (%)',
    etiqueta: 'Desempleo de larga duración',
    unidad: '%',
    decimales: 2,
    inverso: true,
  },
  {
    campo: 'Ingreso disponible ajustado per cápita',
    etiqueta: 'Ingreso disponible per cápita',
    unidad: 'USD',
    decimales: 0,
  },
  { campo: 'Educación secundaria superior (%)', etiqueta: 'Educación secundaria superior', unidad: '%', decimales: 1 },
  { campo: 'Homicidios por 100.000', etiqueta: 'Homicidios', unidad: 'por 100.000 hab.', decimales: 2, inverso: true },
  { campo: 'PM2.5 (µg/m³)', etiqueta: 'Material particulado PM2.5', unidad: 'µg/m³', decimales: 2, inverso: true },
];

/** Los tres escenarios de proyección, en el orden del cuaderno. */
export const ESCENARIOS_PROYECCION = ['Tendencial', 'Optimista', 'Restrictivo'];

/** Columna con la posición de cada país en el ranking del año. */
export const CAMPO_POSICION = 'Posición OCDE';

/* Caché de promesas por URL: una sola carga por sesión. */
const cacheBases = new Map();

/**
 * Construye el panel de consulta sobre la estructura serializable (la
 * del precalculado o la recién interpretada: son idénticas).
 */
function armarPanel(estructura) {
  const porPaisEscenario = new Map(estructura.seriesPaisEscenario);
  const porEscenarioAnio = new Map(estructura.filasEscenarioAnio);
  const comparacion = estructura.comparacion;

  return {
    paises: estructura.paises,
    anioMin: estructura.anioMin,
    anioMax: estructura.anioMax,
    anioCorte: estructura.anioCorte,
    escenarioHistorico: estructura.escenarioHistorico,
    metodologia: estructura.metodologia,

    /* Serie de un país en un escenario, ordenada por año. */
    serie(pais, escenario) {
      return porPaisEscenario.get(`${pais}|${escenario}`) ?? [];
    },

    /* Todas las filas de un año y escenario (para el comparador). */
    filasDeAnio(escenario, anio) {
      return porEscenarioAnio.get(`${escenario}|${anio}`) ?? [];
    },

    /* Serie de la hoja de comparación para un escenario, precedida del
       tramo histórico, tal como la encadena el cuaderno. */
    serieComparacion(escenario) {
      if (!comparacion) return [];
      return comparacion.filas
        .filter((f) => f.periodo === comparacion.periodoHistorico || f.periodo === escenario)
        .sort((a, b) => a.anio - b.anio);
    },
  };
}

/**
 * Descarga (precalculado o Excel) e interpreta la base. Lanza un error
 * descriptivo si el archivo falta o no tiene la estructura esperada,
 * para que el módulo muestre el aviso correspondiente.
 */
export function cargarBaseVidaMejor(url) {
  if (cacheBases.has(url)) return cacheBases.get(url);

  const promesa = (async () => {
    /* 1. Vía rápida: el precalculado del build. */
    const registro = await cargarRegistroPrecalculado(
      url,
      /\.xlsx$/,
      (r, tamanoPublicado) =>
        r.formato === FORMATO_VIDA_MEJOR &&
        r.tipo === 'vida-mejor' &&
        r.tamanoOrigen === tamanoPublicado &&
        Boolean(r.estructura),
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
    const resultado = normalizarVidaMejor(XLSX, contenido);
    if (!resultado.disponible) {
      throw new Error('El archivo no tiene la estructura esperada de la base OCDE.');
    }
    return armarPanel(resultado.estructura);
  })();

  /* Un fallo no debe quedar cacheado: así un reintento vuelve a cargar. */
  promesa.catch(() => cacheBases.delete(url));
  cacheBases.set(url, promesa);
  return promesa;
}

/**
 * Encadena el tramo histórico con el de proyección repitiendo el último
 * punto histórico, para que la línea no aparezca partida en el año de
 * corte (mismo empalme que hace el cuaderno con `pd.concat`).
 */
export function serieEncadenada(datos, pais, escenario, campo) {
  const historico = datos.serie(pais, datos.escenarioHistorico);
  const proyeccion = datos.serie(pais, escenario);
  const ultimoHistorico = historico[historico.length - 1];
  const puente = ultimoHistorico ? [ultimoHistorico] : [];
  return [...puente, ...proyeccion]
    .map((fila) => ({ anio: fila.anio, valor: aNumero(fila[campo]) }))
    .filter((punto) => punto.valor !== null);
}

/** Puntos (año, valor) del tramo histórico de un país. */
export function serieHistorica(datos, pais, campo) {
  return datos
    .serie(pais, datos.escenarioHistorico)
    .map((fila) => ({ anio: fila.anio, valor: aNumero(fila[campo]) }))
    .filter((punto) => punto.valor !== null);
}

