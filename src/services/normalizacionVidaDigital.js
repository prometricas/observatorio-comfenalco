/**
 * normalizacionVidaDigital — Interpretación de la base del Digital
 * Quality of Life Index (cuaderno "App_Vida_Digital").
 *
 * La hoja Panel_DQL_2030 trae un panel ancho: una fila por país miembro
 * de la OCDE con su ranking mundial 2025, el histórico oficial Surfshark
 * 2022–2025 y el pronóstico econométrico 2026–2030 (suavizamiento
 * exponencial de tendencia amortiguada, documentado en las notas
 * metodológicas al pie de la misma hoja). La fila de encabezados se
 * localiza por su primera celda ("País") y los años por búsqueda en los
 * nombres de columna, no por posición.
 *
 * La estructura conserva los países con serie completa 2022–2030 (los
 * que el cuaderno usa para simular y promediar), ordenados por ranking,
 * más el "Promedio OCDE" al final; cada uno lleva su prospectiva
 * simulada (banda del 95 %, trayectorias de fondo y 24 escenarios
 * representativos, calculados en `prospectivaVidaDigital`). Valores a 4
 * decimales, los mismos que muestran las figuras.
 *
 * Vive en un módulo propio porque la usan DOS consumidores que deben
 * producir resultados idénticos: vidaDigitalService (fallback en el
 * navegador, con SheetJS bajo demanda) y scripts/precalcular-bases.mjs.
 * El módulo XLSX llega como argumento para no arrastrar SheetJS al
 * paquete del navegador.
 */
import { calcularProspectivaVidaDigital } from './prospectivaVidaDigital.js';

/** Versión del formato de la estructura serializada. */
export const FORMATO_VIDA_DIGITAL = 2;

/** Nombre de la entidad promedio, el mismo del cuaderno. */
const PROMEDIO_OCDE_DQL = 'Promedio OCDE';

function aNumero(valor) {
  if (valor === null || valor === undefined || valor === '') return null;
  const numero = typeof valor === 'number' ? valor : Number(String(valor).trim());
  return Number.isFinite(numero) ? numero : null;
}

const normalizarTexto = (valor) =>
  String(valor ?? '')
    .trim()
    .toLowerCase()
    .replace('í', 'i')
    .replace('á', 'a');

const redondear = (valor) => Math.round(valor * 10000) / 10000;
const redondearSerie = (valores) => valores.map(redondear);

/**
 * Normaliza el contenido del Excel del DQL.
 * @param {object} XLSX módulo SheetJS
 * @param {ArrayBuffer|Buffer} contenido bytes del archivo .xlsx
 * @returns {{disponible: boolean, estructura: object|null}}
 */
export function normalizarVidaDigital(XLSX, contenido) {
  const libro = XLSX.read(contenido, {
    dense: true,
    cellDates: false,
    cellStyles: false,
    cellHTML: false,
  });
  const hoja = libro.Sheets[libro.SheetNames[0]];
  if (!hoja) return { disponible: false, estructura: null };

  const filas = XLSX.utils.sheet_to_json(hoja, { header: 1, blankrows: false });

  /* Fila de encabezados: su primera celda es "País". */
  const filaEncabezados = filas.findIndex((fila) => normalizarTexto(fila?.[0]) === 'pais');
  if (filaEncabezados === -1) return { disponible: false, estructura: null };
  const encabezados = filas[filaEncabezados].map((celda) => String(celda ?? '').trim());

  /* Columnas por año (búsqueda en el nombre) y columna del ranking. La
     base debe cubrir el panel completo 2022–2030 del cuaderno. */
  const columnasPorAnio = new Map();
  encabezados.forEach((encabezado, columna) => {
    const coincidencia = /\b(20\d{2})\b/.exec(encabezado);
    if (coincidencia) columnasPorAnio.set(Number(coincidencia[1]), columna);
  });
  const aniosHistoricos = [2022, 2023, 2024, 2025];
  const aniosProyeccion = [2026, 2027, 2028, 2029, 2030];
  if (![...aniosHistoricos, ...aniosProyeccion].every((anio) => columnasPorAnio.has(anio))) {
    return { disponible: false, estructura: null };
  }
  /* La identidad de la base: sus columnas de años hablan del DQL. */
  if (!encabezados.some((encabezado) => encabezado.toUpperCase().includes('DQL'))) {
    return { disponible: false, estructura: null };
  }
  const columnaRanking = encabezados.findIndex((encabezado) =>
    encabezado.toLowerCase().includes('ranking'),
  );

  /* Filas de países: hasta las notas metodológicas del pie. */
  const paises = [];
  for (const fila of filas.slice(filaEncabezados + 1)) {
    const nombre = String(fila?.[0] ?? '').trim();
    if (!nombre) continue;
    if (normalizarTexto(nombre).includes('notas metodol')) break;

    const historico = aniosHistoricos.map((anio) => aNumero(fila[columnasPorAnio.get(anio)]));
    const proyeccion = aniosProyeccion.map((anio) => aNumero(fila[columnasPorAnio.get(anio)]));
    /* Solo series completas: son las que el cuaderno simula y promedia. */
    if ([...historico, ...proyeccion].some((valor) => valor === null)) continue;

    paises.push({
      nombre,
      ranking: columnaRanking !== -1 ? aNumero(fila[columnaRanking]) : null,
      historico,
      proyeccion,
    });
  }
  if (!paises.length) return { disponible: false, estructura: null };

  /* Orden del selector del cuaderno: por ranking, sin ranking al final. */
  paises.sort((a, b) => {
    if (a.ranking === null && b.ranking === null) return a.nombre.localeCompare(b.nombre, 'es');
    if (a.ranking === null) return 1;
    if (b.ranking === null) return -1;
    return a.ranking - b.ranking;
  });

  /* Promedio OCDE: media anual de los países completos. */
  const promedio = {
    nombre: PROMEDIO_OCDE_DQL,
    ranking: null,
    historico: aniosHistoricos.map(
      (_, i) => paises.reduce((suma, pais) => suma + pais.historico[i], 0) / paises.length,
    ),
    proyeccion: aniosProyeccion.map(
      (_, i) => paises.reduce((suma, pais) => suma + pais.proyeccion[i], 0) / paises.length,
    ),
  };

  /* Prospectiva simulada por país y para el promedio. */
  const prospectiva = calcularProspectivaVidaDigital(paises, promedio);

  const compactar = (pais, esPromedio) => {
    const simulada = prospectiva.get(pais.nombre);
    return {
      nombre: pais.nombre,
      esPromedio,
      ranking: pais.ranking,
      historico: redondearSerie(pais.historico),
      proyeccion: redondearSerie(pais.proyeccion),
      bandaInferior: redondearSerie(simulada.bandaInferior),
      bandaSuperior: redondearSerie(simulada.bandaSuperior),
      trayectorias: simulada.trayectorias.map(redondearSerie),
      escenarios: simulada.escenarios.map(redondearSerie),
      pesimista: redondearSerie(simulada.pesimista),
      optimista: redondearSerie(simulada.optimista),
    };
  };

  return {
    disponible: true,
    estructura: {
      aniosHistoricos,
      aniosProyeccion,
      paisPrincipal: paises.some((pais) => pais.nombre === 'Colombia')
        ? 'Colombia'
        : paises[0].nombre,
      paises: [
        ...paises.map((pais) => compactar(pais, false)),
        compactar(promedio, true),
      ],
    },
  };
}
