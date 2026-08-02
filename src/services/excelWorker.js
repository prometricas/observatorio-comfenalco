/**
 * excelWorker — Interpretación del Excel de población en un hilo aparte.
 *
 * La lectura del libro con SheetJS es costosa (decenas de segundos para el
 * panel de 6.205 × 250 celdas), así que se ejecuta en este Web Worker para
 * que la interfaz nunca se congele. Recibe el ArrayBuffer del archivo,
 * interpreta SOLO la hoja del panel, filtra las filas de área "Total" y
 * devuelve la estructura compacta indexada por código DANE y año.
 *
 * Protocolo: recibe { arrayBuffer } y responde
 *   { ok: true, disponible: boolean, anios: number[], filas: Map }
 *   { ok: false, mensaje: string } ante cualquier error.
 */
import * as XLSX from 'xlsx';

/** Nombre de la hoja principal del Excel de población. */
const NOMBRE_HOJA_PANEL = 'Panel_Colombia_1985_2050';

/** Edad máxima individual; el índice 100 acumula "100 y más". */
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

/**
 * Convierte una fila cruda de SheetJS en la estructura compacta del panel:
 * arreglos de población por edad simple (índices 0–99 y 100 = "100 y más")
 * y el total general, todo en números.
 */
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

self.onmessage = (evento) => {
  try {
    const { arrayBuffer } = evento.data;

    /* Solo se interpreta la hoja del panel, en modo denso y sin extras:
       es sensiblemente más rápido que leer el libro completo. */
    const libro = XLSX.read(arrayBuffer, {
      dense: true,
      sheets: NOMBRE_HOJA_PANEL,
      cellText: false,
      cellHTML: false,
      cellNF: false,
      cellFormula: false,
    });

    const hoja = libro.Sheets[NOMBRE_HOJA_PANEL];
    if (!hoja) {
      /* La hoja esperada no existe: se informa como no disponible (el
         cliente pudo renombrarla al editar el archivo). */
      self.postMessage({ ok: true, disponible: false, anios: [], filas: new Map() });
      return;
    }

    const filasCrudas = XLSX.utils.sheet_to_json(hoja);
    const clavesReales = obtenerClavesReales(hoja);
    const claveArea = clavesReales.get('ÁREA GEOGRÁFICA');

    /* Solo filas de área Total, compactadas e indexadas por DP y año
       (regla del proyecto: búsquedas por código DANE, nunca por nombre). */
    const filas = new Map();
    const conjuntoAnios = new Set();
    for (const filaCruda of filasCrudas) {
      if (String(filaCruda[claveArea] ?? '').trim() !== 'Total') continue;
      const fila = compactarFila(filaCruda, clavesReales);
      filas.set(`${fila.codigoDane}-${fila.anio}`, fila);
      conjuntoAnios.add(fila.anio);
    }

    /* Un panel sin filas útiles equivale a datos aún no disponibles
       (columna de área renombrada, hoja con otra estructura, etc.). */
    const disponible = filas.size > 0;
    const anios = [...conjuntoAnios].sort((a, b) => a - b);

    self.postMessage({ ok: true, disponible, anios, filas });
  } catch (error) {
    self.postMessage({ ok: false, mensaje: String(error?.message ?? error) });
  }
};
