/**
 * normalizacionPoblacion — Interpretación de la base de población.
 *
 * Convierte el Excel de población (hoja Panel_Colombia_1985_2050) en la
 * estructura compacta que consumen las pirámides: filas de área Total
 * indexadas por código DANE y año, con la población por edad simple.
 *
 * Vive en un módulo propio porque la usan DOS consumidores que deben
 * producir resultados idénticos:
 *  - excelWorker, cuando el navegador interpreta un Excel recién
 *    reemplazado por el cliente;
 *  - scripts/precalcular-bases.mjs, que en cada build deja junto al Excel
 *    un archivo ya interpretado para que la primera visita no pague los
 *    ~40 segundos de lectura.
 */
import * as XLSX from 'xlsx';

/**
 * Versión del formato de la estructura normalizada. La comparten la caché
 * IndexedDB y los archivos precalculados: si la estructura cambia, subir
 * este número invalida ambos a la vez y el portal reinterpreta el Excel.
 */
export const FORMATO_DATOS = 2;

const NOMBRE_HOJA_PANEL = 'Panel_Colombia_1985_2050';
const EDAD_MAXIMA = 100;

/**
 * Nombres de columna tomados de la fila de ENCABEZADOS real de la hoja
 * (no de la primera fila de datos: sheet_to_json omite celdas en blanco y
 * una celda vacía en la primera fila haría desaparecer su columna).
 */
function obtenerClavesReales(hoja) {
  const rango = XLSX.utils.decode_range(hoja['!ref']);
  const rangoEncabezado = XLSX.utils.encode_range({
    s: { r: rango.s.r, c: rango.s.c },
    e: { r: rango.s.r, c: rango.e.c },
  });
  const [encabezados] = XLSX.utils.sheet_to_json(hoja, {
    header: 1,
    range: rangoEncabezado,
  });
  return new Map(
    (encabezados ?? [])
      .filter((clave) => typeof clave === 'string')
      .map((clave) => [clave.trim(), clave]),
  );
}

/* Fila cruda → arreglos de población por edad simple y total general. */
function compactarFila(filaCruda, clavesReales) {
  const valor = (nombreLogico) => {
    const claveReal = clavesReales.get(nombreLogico);
    return claveReal === undefined ? 0 : Number(filaCruda[claveReal]) || 0;
  };

  const hombres = [];
  const mujeres = [];
  for (let edad = 0; edad < EDAD_MAXIMA; edad += 1) {
    hombres.push(valor(`Hombres_${edad}`));
    mujeres.push(valor(`Mujeres_${edad}`));
  }
  hombres.push(valor('Hombres_100 y más'));
  mujeres.push(valor('Mujeres_100 y más'));

  return {
    codigoDane: valor('DP'),
    anio: valor('AÑO'),
    hombres,
    mujeres,
    totalGeneral: valor('Total General'),
  };
}

/**
 * Normaliza el contenido del Excel de población.
 * @param {ArrayBuffer|Buffer} contenido bytes del archivo .xlsx
 * @returns {{disponible: boolean, datos: {anios: number[], filas: Map}|null}}
 */
export function normalizarPoblacion(contenido) {
  const libro = XLSX.read(contenido, {
    dense: true,
    sheets: NOMBRE_HOJA_PANEL,
    cellText: false,
    cellHTML: false,
    cellNF: false,
    cellFormula: false,
  });

  const hoja = libro.Sheets[NOMBRE_HOJA_PANEL];
  if (!hoja) return { disponible: false, datos: null };

  const filasCrudas = XLSX.utils.sheet_to_json(hoja);
  const clavesReales = obtenerClavesReales(hoja);
  const claveArea = clavesReales.get('ÁREA GEOGRÁFICA');

  /* Solo filas de área Total, indexadas por código DANE y año (regla del
     proyecto: búsquedas por código, nunca por nombre). */
  const filas = new Map();
  const conjuntoAnios = new Set();
  for (const filaCruda of filasCrudas) {
    if (String(filaCruda[claveArea] ?? '').trim() !== 'Total') continue;
    const fila = compactarFila(filaCruda, clavesReales);
    filas.set(`${fila.codigoDane}-${fila.anio}`, fila);
    conjuntoAnios.add(fila.anio);
  }

  if (filas.size === 0) return { disponible: false, datos: null };

  return {
    disponible: true,
    datos: { anios: [...conjuntoAnios].sort((a, b) => a - b), filas },
  };
}
