/**
 * normalizacionDesempenoAmbiental — Interpretación de la base del
 * Environmental Performance Index (cuaderno "App_Desempeño_Ambiental").
 *
 * La hoja BASE_MODELO trae, para 177 países, el histórico armonizado
 * 2000–2025, el dato oficial del EPI 2026 y los tres escenarios anuales
 * 2027–2050 (restrictivo, tendencial, optimista) con sus oscilaciones ya
 * incluidas. El portal usa la serie de Colombia; el ranking 2026 se
 * deriva del dato oficial de TODOS los países, como hace el cuaderno.
 *
 * Vive en un módulo propio porque la usan DOS consumidores que deben
 * producir resultados idénticos: desempenoAmbientalService (fallback en
 * el navegador, con SheetJS bajo demanda) y
 * scripts/precalcular-bases.mjs. El módulo XLSX llega como argumento
 * para no arrastrar SheetJS al paquete del navegador.
 */

/** Versión del formato de la estructura serializada. */
export const FORMATO_DESEMPENO_AMBIENTAL = 1;

/* País cuya serie consume el portal. */
const PAIS = 'Colombia';

const HOJA_BASE = 'BASE_MODELO';

function aNumero(valor) {
  if (valor === null || valor === undefined || valor === '') return null;
  const numero = typeof valor === 'number' ? valor : Number(String(valor).trim());
  return Number.isFinite(numero) ? numero : null;
}

/**
 * Normaliza el contenido del Excel del EPI.
 * @param {object} XLSX módulo SheetJS
 * @param {ArrayBuffer|Buffer} contenido bytes del archivo .xlsx
 * @returns {{disponible: boolean, estructura: object|null}}
 */
export function normalizarDesempenoAmbiental(XLSX, contenido) {
  const libro = XLSX.read(contenido, {
    dense: true,
    sheets: [HOJA_BASE],
    cellDates: false,
    cellStyles: false,
    cellHTML: false,
  });
  const hoja = libro.Sheets[HOJA_BASE];
  if (!hoja) return { disponible: false, estructura: null };

  const crudas = XLSX.utils.sheet_to_json(hoja);
  if (!crudas.length) return { disponible: false, estructura: null };

  const columnas = Object.keys(crudas[0]);
  const requeridas = ['pais', 'anio', 'escenario', 'valor_epi'];
  if (!requeridas.every((columna) => columnas.includes(columna))) {
    return { disponible: false, estructura: null };
  }

  /* Filas válidas con el escenario normalizado a minúsculas. */
  const filas = [];
  for (const fila of crudas) {
    const anio = aNumero(fila.anio);
    const valor = aNumero(fila.valor_epi);
    if (anio === null || valor === null || !fila.pais) continue;
    filas.push({
      pais: String(fila.pais).trim(),
      anio,
      valor,
      escenario: String(fila.escenario ?? '').trim().toLowerCase(),
      calidad: String(fila.calidad_modelo ?? '').trim(),
    });
  }

  /* Ranking 2026: posición del país entre los datos oficiales de todos
     (empates con la misma posición, como el rank 'min' del cuaderno). */
  const oficiales = filas.filter((fila) => fila.escenario === 'oficial' && fila.anio === 2026);
  const oficialPais = oficiales.find((fila) => fila.pais === PAIS);
  const ranking = oficialPais
    ? {
        posicion: 1 + oficiales.filter((fila) => fila.valor > oficialPais.valor).length,
        total: oficiales.length,
      }
    : null;

  /* Series de Colombia, ordenadas por año. */
  const serieDe = (escenario) =>
    filas
      .filter((fila) => fila.pais === PAIS && fila.escenario === escenario)
      .sort((a, b) => a.anio - b.anio);

  const historico = serieDe('historico');
  const proyecciones = {
    tendencial: serieDe('tendencial'),
    optimista: serieDe('optimista'),
    restrictivo: serieDe('restrictivo'),
  };
  if (!historico.length || !oficialPais || !proyecciones.tendencial.length) {
    return { disponible: false, estructura: null };
  }

  /* Cada escenario futuro se encadena al dato oficial 2026, tal como el
     cuaderno arma sus series de proyección. */
  const puntoOficial = { anio: oficialPais.anio, valor: oficialPais.valor };
  const aPuntos = (lista) => lista.map((fila) => ({ anio: fila.anio, valor: fila.valor }));

  const calidad = filas.find((fila) => fila.pais === PAIS && fila.calidad)?.calidad ?? '';

  return {
    disponible: true,
    estructura: {
      pais: PAIS,
      historico: aPuntos(historico),
      oficial: puntoOficial,
      tendencial: [puntoOficial, ...aPuntos(proyecciones.tendencial)],
      optimista: [puntoOficial, ...aPuntos(proyecciones.optimista)],
      restrictivo: [puntoOficial, ...aPuntos(proyecciones.restrictivo)],
      ranking,
      /* "alta" → "Alta", como presenta el cuaderno. */
      calidad: calidad ? calidad[0].toUpperCase() + calidad.slice(1).toLowerCase() : '',
    },
  };
}
