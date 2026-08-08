/**
 * normalizacionCapitalHumano — Interpretación de la base de capital
 * humano del Banco Mundial (cuaderno "App_Capital_Humano").
 *
 * La base es una tabla larga: una fila por país, indicador, año y tipo de
 * dato (Observado, Base prospectiva, Proyectado interpolado, Proyectado).
 * El portal usa las series de Colombia y construye, con las MISMAS
 * fórmulas del cuaderno, los escenarios optimista y pesimista alrededor
 * de la trayectoria tendencial:
 *   separación = (|valor − ancla| · 0,35 + |ancla| · 0,015 · progreso) · progreso
 * donde el ancla es el último dato observado (o la base prospectiva si no
 * hay observados), el progreso avanza de 0 a 1 hasta el horizonte, el
 * signo favorable se invierte en los indicadores donde bajar es mejorar,
 * y el resultado se acota a la escala declarada por la propia base.
 *
 * Vive en un módulo propio porque la usan DOS consumidores que deben
 * producir resultados idénticos: capitalHumanoService (fallback en el
 * navegador, con SheetJS bajo demanda) y scripts/precalcular-bases.mjs.
 * El módulo XLSX llega como argumento para no arrastrar SheetJS al
 * paquete del navegador.
 */

/** Versión del formato de la estructura serializada. */
export const FORMATO_CAPITAL_HUMANO = 1;

/* País cuyas series consume el portal. */
const PAIS = 'Colombia';

/* Indicadores en los que un valor MENOR es mejorar: el escenario
   optimista se separa hacia abajo (lista del cuaderno). */
const INVERSOS = new Set([
  'Mortalidad en menores de cinco años',
  'Brecha de género en capital humano ampliado',
  'Brecha frente al valor máximo de capital humano ampliado',
]);

/* Nombres cortos para el selector y las leyendas (lista del cuaderno). */
const ETIQUETAS_CORTAS = {
  'Esperanza de vida al nacer': 'Esperanza de vida',
  'Mortalidad en menores de cinco años': 'Mortalidad en menores de 5 años',
  'Puntaje total de capital humano ampliado': 'Puntaje total',
  'Pilar de educación': 'Educación',
  'Pilar de empleo y aprendizaje continuo': 'Empleo y aprendizaje',
  'Pilar de salud y nutrición': 'Salud y nutrición',
  'Capital humano ampliado de las mujeres': 'Capital humano · mujeres',
  'Capital humano ampliado de los hombres': 'Capital humano · hombres',
  'Índice equivalente de capital humano ampliado': 'Índice equivalente',
  'Índice tradicional de capital humano': 'Índice tradicional',
  'Brecha de género en capital humano ampliado': 'Brecha de género',
  'Brecha frente al valor máximo de capital humano ampliado': 'Brecha frente al máximo',
};

/* Indicador que abre el módulo (el de la vista aprobada). */
const INDICADOR_INICIAL = 'Índice equivalente de capital humano ampliado';

const AMPLITUD = 0.35;
const PISO_RELATIVO = 0.015;

function aNumero(valor) {
  if (valor === null || valor === undefined || valor === '') return null;
  const numero = typeof valor === 'number' ? valor : Number(String(valor).trim());
  return Number.isFinite(numero) ? numero : null;
}

/* "0-1" | "0-325" → [0, 1] | [0, 325]; sin tope reconocible → [0, null].
   Tolera guion corto, medio y largo (réplica de limites_escala). */
function limitesDeEscala(escala) {
  const texto = String(escala ?? '').replace(/[–—]/g, '-').trim();
  const partes = texto.split('-');
  if (partes.length === 2) {
    const inferior = Number(partes[0]);
    const superior = Number(partes[1]);
    if (Number.isFinite(inferior) && Number.isFinite(superior)) return [inferior, superior];
  }
  return [0, null];
}

/* Punto compacto de una fila anual. */
const aPunto = (fila) => ({ anio: fila.anio, valor: fila.valor, tipoDato: fila['Tipo_dato'] });

/**
 * Normaliza el contenido del Excel de capital humano.
 * @param {object} XLSX módulo SheetJS
 * @param {ArrayBuffer|Buffer} contenido bytes del archivo .xlsx
 * @returns {{disponible: boolean, estructura: object|null}}
 */
export function normalizarCapitalHumano(XLSX, contenido) {
  const libro = XLSX.read(contenido, {
    dense: true,
    cellDates: false,
    cellStyles: false,
    cellHTML: false,
  });
  const hoja = libro.Sheets[libro.SheetNames[0]];
  if (!hoja) return { disponible: false, estructura: null };

  const crudas = XLSX.utils.sheet_to_json(hoja);
  if (!crudas.length) return { disponible: false, estructura: null };

  /* La base se reconoce por sus columnas obligatorias (validar_base). */
  const columnas = Object.keys(crudas[0]);
  const requeridas = ['País', 'Indicador', 'Año', 'Valor', 'Tipo_dato', 'Unidad', 'Escala'];
  if (!requeridas.every((columna) => columnas.includes(columna))) {
    return { disponible: false, estructura: null };
  }

  /* Filas válidas del país, sin duplicados (la última aparición gana,
     como el cuaderno) y ordenadas por indicador y año. */
  const porClave = new Map();
  for (const fila of crudas) {
    if (fila['País'] !== PAIS) continue;
    const anio = aNumero(fila['Año']);
    const valor = aNumero(fila['Valor']);
    if (anio === null || valor === null || !fila['Indicador']) continue;
    porClave.set(`${fila['Indicador']}|${anio}|${fila['Tipo_dato']}`, { ...fila, anio, valor });
  }
  const filas = [...porClave.values()].sort(
    (a, b) => a['Indicador'].localeCompare(b['Indicador'], 'es') || a.anio - b.anio,
  );
  if (!filas.length) return { disponible: false, estructura: null };

  /* Indicadores en orden de aparición en la base original. */
  const ordenIndicadores = [];
  for (const fila of crudas) {
    if (fila['Indicador'] && !ordenIndicadores.includes(fila['Indicador'])) {
      ordenIndicadores.push(fila['Indicador']);
    }
  }

  const indicadores = [];
  for (const indicador of ordenIndicadores) {
    const serie = filas.filter((fila) => fila['Indicador'] === indicador);
    if (!serie.length) continue;

    const observado = serie.filter((fila) => fila['Tipo_dato'] === 'Observado');
    const futuro = serie.filter((fila) => fila['Tipo_dato'] !== 'Observado');
    /* Sin trayectoria futura no hay escenarios: el indicador se omite,
       como hace el cuaderno (p. ej. el índice tradicional). */
    if (!futuro.length) continue;

    /* Ancla: último observado o, en su defecto, la base prospectiva. */
    const base = futuro.filter((fila) => fila['Tipo_dato'] === 'Base prospectiva');
    const ancla = observado[observado.length - 1] ?? base[0] ?? futuro[0];
    const valorAncla = ancla.valor;
    const anioAncla = ancla.anio;
    const horizonte = Math.max(1, futuro[futuro.length - 1].anio - anioAncla);
    const favorable = INVERSOS.has(indicador) ? -1 : 1;
    const [inferior, superior] = limitesDeEscala(serie[0]['Escala']);

    /* Escenario desplazado alrededor del tendencial (fórmula del
       cuaderno); el ancla del histórico abre cada serie futura. */
    const escenario = (signo) =>
      futuro.map((fila) => {
        const progreso = Math.min(1, Math.max(0, (fila.anio - anioAncla) / horizonte));
        const desviacion = Math.abs(fila.valor - valorAncla);
        const separacion =
          (desviacion * AMPLITUD + Math.abs(valorAncla) * PISO_RELATIVO * progreso) * progreso;
        let valor = fila.valor + signo * favorable * separacion;
        valor = Math.max(inferior, valor);
        if (superior !== null) valor = Math.min(superior, valor);
        return { anio: fila.anio, valor, tipoDato: fila['Tipo_dato'] };
      });

    const puente = observado.length ? [aPunto(observado[observado.length - 1])] : [];
    const anios = serie.map((fila) => fila.anio);

    indicadores.push({
      campo: indicador,
      etiqueta: ETIQUETAS_CORTAS[indicador] ?? indicador,
      unidad: String(serie[0]['Unidad'] ?? ''),
      inverso: INVERSOS.has(indicador),
      rango: [Math.min(...anios), Math.max(...anios)],
      historico: observado.map(aPunto),
      tendencial: [...puente, ...futuro.map(aPunto)],
      optimista: [...puente, ...escenario(1)],
      pesimista: [...puente, ...escenario(-1)],
    });
  }

  if (!indicadores.length) return { disponible: false, estructura: null };

  return {
    disponible: true,
    estructura: {
      indicadores,
      indicadorInicial: indicadores.some((i) => i.campo === INDICADOR_INICIAL)
        ? INDICADOR_INICIAL
        : indicadores[0].campo,
    },
  };
}
