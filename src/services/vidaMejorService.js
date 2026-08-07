/**
 * vidaMejorService — Lectura y normalización de la base del Índice OCDE
 * para una Vida Mejor (cuaderno "App_Vida_Mejor").
 *
 * A diferencia de las tendencias, esta base es POR PAÍS (los 38 de la OCDE,
 * Colombia incluida) y no por departamento: aquí no interviene el mapa ni
 * el catálogo de códigos DANE.
 *
 * El archivo pesa ~590 kB y se interpreta en medio segundo, así que —al
 * contrario que la base de población— no necesita worker ni caché en
 * IndexedDB: se descarga y se normaliza en el hilo principal, y el
 * resultado se guarda en una caché de promesas por URL para no repetir el
 * trabajo al volver a la sección.
 *
 * Robustez frente a archivos regenerados: nada se codifica por posición.
 * Las columnas se leen por nombre, el escenario histórico se deduce del
 * que contiene el año más antiguo (su etiqueta lleva guion largo, fácil de
 * perder al reescribir el Excel) y el año de corte sale del último año de
 * ese histórico. La hoja de comparación arrastra columnas sobrantes fuera
 * de la tabla; al leer por nombre quedan ignoradas por sí solas.
 */
import * as XLSX from 'xlsx';
import { nombreEsPais } from '../data/paises-ocde.js';

const HOJA_BASE = 'Base consolidada 2000-2050';
const HOJA_COMPARACION = 'Colombia vs OCDE 2000-2050';
const HOJA_METODOLOGIA = 'Metodología';

/* Las dos primeras filas del Excel son título y subtítulo: la fila de
   encabezados es la tercera (índice 2). */
const FILA_ENCABEZADOS = 2;

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

/* Caché de promesas por URL: una sola descarga e interpretación por
   sesión, compartida por todos los bloques del módulo. */
const cacheBases = new Map();

/** Convierte a número tolerando cadenas con espacios; null si no aplica. */
function aNumero(valor) {
  if (valor === null || valor === undefined || valor === '') return null;
  const numero = typeof valor === 'number' ? valor : Number(String(valor).trim());
  return Number.isFinite(numero) ? numero : null;
}

/**
 * Normaliza la hoja principal: filas con año y país válidos, agrupadas por
 * país y escenario para que las figuras no recorran las 3.838 filas en
 * cada repintado.
 */
function normalizarBase(hoja) {
  const filas = XLSX.utils
    .sheet_to_json(hoja, { range: FILA_ENCABEZADOS })
    .map((fila) => ({
      ...fila,
      anio: aNumero(fila['Año']),
      /* Nombre visible en español, resuelto por código ISO. Se reemplaza
         el del archivo para que TODA consulta posterior use el mismo. */
      'País': fila['Código'] ? nombreEsPais(fila['Código'], fila['País']) : fila['País'],
    }))
    .filter((fila) => fila.anio !== null && fila['País']);

  if (!filas.length) return null;

  /* El escenario que contiene el año más antiguo es el histórico. */
  const anioMin = Math.min(...filas.map((f) => f.anio));
  const escenarioHistorico = filas.find((f) => f.anio === anioMin)?.['Escenario'];

  const porPaisEscenario = new Map();
  const porEscenarioAnio = new Map();
  for (const fila of filas) {
    const claveSerie = `${fila['País']}|${fila['Escenario']}`;
    if (!porPaisEscenario.has(claveSerie)) porPaisEscenario.set(claveSerie, []);
    porPaisEscenario.get(claveSerie).push(fila);

    const claveAnio = `${fila['Escenario']}|${fila.anio}`;
    if (!porEscenarioAnio.has(claveAnio)) porEscenarioAnio.set(claveAnio, []);
    porEscenarioAnio.get(claveAnio).push(fila);
  }
  porPaisEscenario.forEach((lista) => lista.sort((a, b) => a.anio - b.anio));

  const historicas = filas.filter((f) => f['Escenario'] === escenarioHistorico);

  return {
    paises: [...new Set(filas.map((f) => f['País']))].sort((a, b) => a.localeCompare(b, 'es')),
    anioMin,
    anioMax: Math.max(...filas.map((f) => f.anio)),
    anioCorte: Math.max(...historicas.map((f) => f.anio)),
    escenarioHistorico,
    porPaisEscenario,
    porEscenarioAnio,
  };
}

/**
 * Normaliza la hoja "Colombia vs OCDE". Solo se conservan las columnas que
 * usan las figuras; el resto (incluidas las sobrantes del archivo) se
 * descarta al leer por nombre.
 */
function normalizarComparacion(hoja) {
  const filas = XLSX.utils
    .sheet_to_json(hoja, { range: FILA_ENCABEZADOS })
    .map((fila) => ({
      anio: aNumero(fila['Año']),
      periodo: fila['Periodo / escenario'],
      puntajeColombia: aNumero(fila['Puntaje Colombia']),
      promedioOcde: aNumero(fila['Promedio OCDE']),
      brecha: aNumero(fila['Brecha Colombia - OCDE']),
      posicionColombia: aNumero(fila['Posición Colombia']),
    }))
    .filter((fila) => fila.anio !== null && fila.periodo);

  if (!filas.length) return null;

  const anioMin = Math.min(...filas.map((f) => f.anio));
  const periodoHistorico = filas.find((f) => f.anio === anioMin)?.periodo;

  return { filas, periodoHistorico };
}

/** Filas de la hoja de metodología como pares elemento/descripción. */
function normalizarMetodologia(hoja) {
  if (!hoja) return [];
  return XLSX.utils
    .sheet_to_json(hoja, { header: 1, blankrows: false })
    .slice(1)
    .filter((fila) => fila[0] && fila[1])
    .map((fila) => ({ elemento: String(fila[0]).trim(), descripcion: String(fila[1]).trim() }));
}

/**
 * Descarga e interpreta la base. Devuelve un objeto con los catálogos ya
 * resueltos y funciones de consulta que las figuras usan directamente.
 * Lanza un error descriptivo si el archivo falta o no tiene la estructura
 * esperada, para que el módulo muestre el aviso correspondiente.
 */
export function cargarBaseVidaMejor(url) {
  if (cacheBases.has(url)) return cacheBases.get(url);

  const promesa = (async () => {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`No se encontró la base de datos del indicador (${respuesta.status}).`);
    }

    const libro = XLSX.read(await respuesta.arrayBuffer(), {
      dense: true,
      sheets: [HOJA_BASE, HOJA_COMPARACION, HOJA_METODOLOGIA],
      cellDates: false,
      cellStyles: false,
      cellHTML: false,
    });

    if (!libro.Sheets[HOJA_BASE]) {
      throw new Error(`El archivo no contiene la hoja "${HOJA_BASE}".`);
    }

    const base = normalizarBase(libro.Sheets[HOJA_BASE]);
    if (!base) throw new Error('La hoja principal no contiene filas con año y país.');

    const comparacion = libro.Sheets[HOJA_COMPARACION]
      ? normalizarComparacion(libro.Sheets[HOJA_COMPARACION])
      : null;

    return {
      paises: base.paises,
      anioMin: base.anioMin,
      anioMax: base.anioMax,
      anioCorte: base.anioCorte,
      escenarioHistorico: base.escenarioHistorico,
      metodologia: normalizarMetodologia(libro.Sheets[HOJA_METODOLOGIA]),
      tieneComparacion: Boolean(comparacion),

      /* Serie de un país en un escenario, ordenada por año. */
      serie(pais, escenario) {
        return base.porPaisEscenario.get(`${pais}|${escenario}`) ?? [];
      },

      /* Todas las filas de un año y escenario (para el comparador). */
      filasDeAnio(escenario, anio) {
        return base.porEscenarioAnio.get(`${escenario}|${anio}`) ?? [];
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
  })();

  /* Un fallo no debe quedar cacheado: así un reintento vuelve a descargar. */
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

/**
 * Las cuatro cifras de las tarjetas del cuaderno: último valor histórico,
 * proyección tendencial y optimista al horizonte, y posición en el ranking
 * del año de corte.
 */
export function calcularKpis(datos, pais, campo) {
  const historico = datos.serie(pais, datos.escenarioHistorico);
  const ultimo = historico[historico.length - 1];
  const valorEn = (escenario) => {
    const fila = datos.serie(pais, escenario).find((f) => f.anio === datos.anioMax);
    return fila ? aNumero(fila[campo]) : null;
  };

  return {
    anioBase: ultimo?.anio ?? null,
    valorBase: ultimo ? aNumero(ultimo[campo]) : null,
    anioHorizonte: datos.anioMax,
    valorTendencial: valorEn('Tendencial'),
    valorOptimista: valorEn('Optimista'),
    posicion: ultimo ? aNumero(ultimo[CAMPO_POSICION]) : null,
    totalPaises: datos.paises.length,
  };
}

/** Formatea un valor con los decimales propios de su indicador. */
export function formatearValor(valor, indicador) {
  if (valor === null || valor === undefined) return '—';
  return valor.toLocaleString('es-CO', {
    minimumFractionDigits: indicador.decimales,
    maximumFractionDigits: indicador.decimales,
  });
}
