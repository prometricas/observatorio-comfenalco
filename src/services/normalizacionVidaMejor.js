/**
 * normalizacionVidaMejor — Interpretación de la base del Índice OCDE
 * para una Vida Mejor.
 *
 * Convierte el Excel en una estructura serializable (solo arreglos y
 * objetos planos, sin Maps): la consumen el archivo precalculado del
 * build y el servicio del navegador, que reconstruye sobre ella sus
 * funciones de consulta. Vive en un módulo propio porque la usan DOS
 * consumidores que deben producir resultados idénticos:
 *  - vidaMejorService, cuando el navegador interpreta un Excel recién
 *    reemplazado por el cliente (SheetJS se importa bajo demanda);
 *  - scripts/precalcular-bases.mjs, en cada build.
 *
 * El módulo XLSX llega como argumento: el script lo importa de forma
 * estática y el servicio de forma diferida, y así esta normalización no
 * arrastra SheetJS al paquete del navegador.
 */
import { nombreEsPais } from '../data/paises-ocde.js';

/** Versión del formato de la estructura serializada. */
export const FORMATO_VIDA_MEJOR = 1;

const HOJA_BASE = 'Base consolidada 2000-2050';
const HOJA_COMPARACION = 'Colombia vs OCDE 2000-2050';
const HOJA_METODOLOGIA = 'Metodología';

/* Las dos primeras filas del Excel son título y subtítulo: la fila de
   encabezados es la tercera (índice 2). */
const FILA_ENCABEZADOS = 2;

/** Convierte a número tolerando cadenas con espacios; null si no aplica. */
export function aNumero(valor) {
  if (valor === null || valor === undefined || valor === '') return null;
  const numero = typeof valor === 'number' ? valor : Number(String(valor).trim());
  return Number.isFinite(numero) ? numero : null;
}

/* Hoja principal → catálogos y series agrupadas (como listas de pares). */
function normalizarBase(XLSX, hoja) {
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
    seriesPaisEscenario: [...porPaisEscenario.entries()],
    filasEscenarioAnio: [...porEscenarioAnio.entries()],
  };
}

/* Hoja "Colombia vs OCDE" → filas con solo las columnas usadas. */
function normalizarComparacion(XLSX, hoja) {
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

/* Hoja de metodología → pares elemento/descripción. */
function normalizarMetodologia(XLSX, hoja) {
  if (!hoja) return [];
  return XLSX.utils
    .sheet_to_json(hoja, { header: 1, blankrows: false })
    .slice(1)
    .filter((fila) => fila[0] && fila[1])
    .map((fila) => ({ elemento: String(fila[0]).trim(), descripcion: String(fila[1]).trim() }));
}

/**
 * Normaliza el contenido del Excel de la base OCDE.
 * @param {object} XLSX módulo SheetJS (estático en el script, diferido en el navegador)
 * @param {ArrayBuffer|Buffer} contenido bytes del archivo .xlsx
 * @returns {{disponible: boolean, estructura: object|null}}
 */
export function normalizarVidaMejor(XLSX, contenido) {
  const libro = XLSX.read(contenido, {
    dense: true,
    sheets: [HOJA_BASE, HOJA_COMPARACION, HOJA_METODOLOGIA],
    cellDates: false,
    cellStyles: false,
    cellHTML: false,
  });

  if (!libro.Sheets[HOJA_BASE]) return { disponible: false, estructura: null };

  const base = normalizarBase(XLSX, libro.Sheets[HOJA_BASE]);
  if (!base) return { disponible: false, estructura: null };

  return {
    disponible: true,
    estructura: {
      ...base,
      comparacion: libro.Sheets[HOJA_COMPARACION]
        ? normalizarComparacion(XLSX, libro.Sheets[HOJA_COMPARACION])
        : null,
      metodologia: normalizarMetodologia(XLSX, libro.Sheets[HOJA_METODOLOGIA]),
    },
  };
}
