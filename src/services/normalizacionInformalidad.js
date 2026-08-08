/**
 * normalizacionInformalidad — Interpretación de la base de informalidad
 * laboral (serie histórica + proyección por ciudad, con intervalos de
 * confianza del 95 %).
 *
 * Vive en un módulo propio porque la usan DOS consumidores que deben
 * producir resultados idénticos:
 *  - excelWorker, cuando el navegador interpreta un Excel recién
 *    reemplazado por el cliente;
 *  - scripts/precalcular-bases.mjs, que en cada build deja junto al
 *    Excel la estructura ya interpretada — así el visitante no descarga
 *    ni el archivo ni el intérprete.
 *
 * Importa SheetJS de forma estática: sus únicos consumidores son el
 * chunk del worker y el script de build, nunca el paquete principal.
 */
import * as XLSX from 'xlsx';

const NOMBRE_HOJA_TASAS = 'Tasas_Informalidad_2007-2042';
const NOMBRE_HOJA_IC = 'IC_95pct';

/* Filas fijas de la hoja de tasas: la fila índice 5 trae los años y las
   ciudades empiezan en la índice 6 (una por fila, hasta la primera vacía).
   Las COLUMNAS se detectan dinámicamente: la frontera entre histórico y
   proyección es el año que aparece repetido (el año parcial abre la
   proyección), así el portal tolera bases regeneradas con más años. */
const FILA_ANIOS = 5;
const FILA_PRIMERA_CIUDAD = 6;

/* Normalización local de nombres (este módulo no importa el catálogo del
   hilo principal para mantener liviano el chunk del worker):
   "Bogotá D.C." → "bogota dc". */
const normalizarClave = (nombre) =>
  String(nombre ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9ñ ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/* Celda → número finito o null. Sin esta normalización, una celda vacía
   produciría NaN en el worker pero null en el precalculado (JSON no
   representa NaN) y las dos vías de carga divergirían; null es el valor
   canónico en ambas. */
const aNumeroONulo = (valor) => {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
};

/**
 * Normaliza el contenido del Excel de informalidad.
 * @param {ArrayBuffer|Buffer} contenido bytes del archivo .xlsx
 * @returns {{disponible: boolean, datos: {anios: object, ciudades: Map}|null}}
 */
export function normalizarInformalidad(contenido) {
  const libro = XLSX.read(contenido, {
    dense: true,
    sheets: [NOMBRE_HOJA_TASAS, NOMBRE_HOJA_IC],
    cellText: false,
    cellHTML: false,
    cellNF: false,
    cellFormula: false,
  });

  const hojaTasas = libro.Sheets[NOMBRE_HOJA_TASAS];
  const hojaIc = libro.Sheets[NOMBRE_HOJA_IC];
  if (!hojaTasas || !hojaIc) return { disponible: false, datos: null };

  const filas = XLSX.utils.sheet_to_json(hojaTasas, { header: 1 });
  const filaAnios = (filas[FILA_ANIOS] ?? []).map(Number);

  /* Última columna con año válido (las celdas posteriores están vacías). */
  let columnaFin = 1;
  while (columnaFin + 1 < filaAnios.length && Number.isFinite(filaAnios[columnaFin + 1])) {
    columnaFin += 1;
  }

  /* Frontera histórico/proyección: el año repetido en columnas contiguas
     (el dato parcial y el arranque de la proyección comparten año). Si la
     estructura no trae esa marca, la base se reporta como no disponible
     en lugar de interpretar mal las series. */
  let columnaParcial = -1;
  for (let columna = 2; columna < columnaFin; columna += 1) {
    if (filaAnios[columna] === filaAnios[columna + 1]) {
      columnaParcial = columna;
      break;
    }
  }
  if (columnaParcial === -1) return { disponible: false, datos: null };

  const aniosHistoricos = filaAnios.slice(1, columnaParcial);
  const anioParcial = filaAnios[columnaParcial];
  const aniosProyeccion = filaAnios.slice(columnaParcial + 1, columnaFin + 1);

  /* Ciudades indexadas por clave normalizada (tolera variaciones de
     tildes entre archivos); el nombre original viaja en el valor. */
  const ciudades = new Map();
  for (let i = FILA_PRIMERA_CIUDAD; i < filas.length; i += 1) {
    const fila = filas[i] ?? [];
    const nombre = String(fila[0] ?? '').trim();
    if (!nombre) break;
    ciudades.set(normalizarClave(nombre), {
      nombre,
      historico: fila.slice(1, columnaParcial).map(aNumeroONulo),
      parcial: aNumeroONulo(fila[columnaParcial]),
      proyeccion: fila.slice(columnaParcial + 1, columnaFin + 1).map(aNumeroONulo),
      ic: { inferior: [], superior: [] },
    });
  }

  /* Intervalos de confianza del 95 % por ciudad y año de proyección. */
  const filasIc = XLSX.utils.sheet_to_json(hojaIc, { header: 1 });
  const intervalos = new Map();
  for (const fila of filasIc) {
    const ciudad = String(fila?.[0] ?? '').trim();
    const anio = Number(fila?.[1]);
    if (!ciudad || ciudad === 'Ciudad' || !Number.isFinite(anio)) continue;
    const clave = normalizarClave(ciudad);
    if (!intervalos.has(clave)) intervalos.set(clave, []);
    intervalos.get(clave).push({
      anio,
      inferior: aNumeroONulo(fila[3]),
      superior: aNumeroONulo(fila[4]),
    });
  }
  for (const [clave, registros] of intervalos) {
    const ciudad = ciudades.get(clave);
    if (!ciudad) continue;
    registros.sort((a, b) => a.anio - b.anio);
    ciudad.ic = {
      inferior: registros.map((registro) => registro.inferior),
      superior: registros.map((registro) => registro.superior),
    };
  }

  if (ciudades.size === 0 || aniosProyeccion.length === 0) {
    return { disponible: false, datos: null };
  }

  return {
    disponible: true,
    datos: {
      anios: { historicos: aniosHistoricos, anioParcial, proyeccion: aniosProyeccion },
      ciudades,
    },
  };
}
