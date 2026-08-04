/**
 * excelWorker — Interpretación de las bases de Excel en un hilo aparte.
 *
 * La lectura con SheetJS es costosa (decenas de segundos en la base de
 * población), así que ocurre en este Web Worker para que la interfaz nunca
 * se congele. Recibe el ArrayBuffer del archivo y el tipo de base, y
 * devuelve la estructura compacta que consume el portal.
 *
 * Tipos de base:
 *  - 'poblacion':     hoja Panel_Colombia_1985_2050 (pirámides por
 *                     departamento y año, filas de área Total).
 *  - 'informalidad':  hojas Tasas_Informalidad_2007-2042 e IC_95pct
 *                     (serie histórica + proyección por ciudad).
 *
 * Protocolo: recibe { arrayBuffer, tipo } y responde
 *   { ok: true, disponible: boolean, tipo, datos }
 *   { ok: false, mensaje: string } ante cualquier error.
 */
import * as XLSX from 'xlsx';

/* ── Base de población (pirámides) ───────────────────────────────── */

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

function normalizarPoblacion(arrayBuffer) {
  const libro = XLSX.read(arrayBuffer, {
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

/* ── Base de informalidad (serie por ciudad) ─────────────────────── */

const NOMBRE_HOJA_TASAS = 'Tasas_Informalidad_2007-2042';
const NOMBRE_HOJA_IC = 'IC_95pct';

/* Filas fijas de la hoja de tasas: la fila índice 5 trae los años y las
   ciudades empiezan en la índice 6 (una por fila, hasta la primera vacía).
   Las COLUMNAS se detectan dinámicamente: la frontera entre histórico y
   proyección es el año que aparece repetido (el año parcial abre la
   proyección), así el portal tolera bases regeneradas con más años. */
const FILA_ANIOS = 5;
const FILA_PRIMERA_CIUDAD = 6;

/* Normalización local de nombres (el worker no importa el catálogo del
   hilo principal para mantener liviano su chunk): "Bogotá D.C." → "bogota dc". */
const normalizarClave = (nombre) =>
  String(nombre ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9ñ ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function normalizarInformalidad(arrayBuffer) {
  const libro = XLSX.read(arrayBuffer, {
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
      historico: fila.slice(1, columnaParcial).map(Number),
      parcial: Number(fila[columnaParcial]),
      proyeccion: fila.slice(columnaParcial + 1, columnaFin + 1).map(Number),
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
      inferior: Number(fila[3]),
      superior: Number(fila[4]),
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

/* ── Despacho de mensajes ────────────────────────────────────────── */

self.onmessage = (evento) => {
  try {
    const { arrayBuffer, tipo } = evento.data;
    const resultado =
      tipo === 'informalidad'
        ? normalizarInformalidad(arrayBuffer)
        : normalizarPoblacion(arrayBuffer);

    self.postMessage({ ok: true, tipo, ...resultado });
  } catch (error) {
    self.postMessage({ ok: false, mensaje: String(error?.message ?? error) });
  }
};
