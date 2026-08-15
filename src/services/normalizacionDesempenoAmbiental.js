/**
 * normalizacionDesempenoAmbiental — Interpretación de la base del
 * Environmental Performance Index (cuaderno "App_Desempeño_Ambiental").
 *
 * La hoja BASE_MODELO trae, para 177 países, el histórico armonizado
 * 2000–2025, el dato oficial del EPI 2026 y los tres escenarios anuales
 * 2027–2050 (restrictivo, tendencial, optimista) con sus oscilaciones ya
 * incluidas. Desde el formato 2, la estructura conserva TODAS las
 * entidades del cuaderno —los países, un promedio por región (si la base
 * trae la columna region) y el promedio global— para el explorador por
 * entidad; el ranking 2026 de cada país se deriva del dato oficial de
 * todos, como hace el cuaderno (rank 'min': empates comparten posición).
 *
 * Las series viajan compactas (arreglos de valores alineados a las
 * listas de años compartidas, redondeados a 2 decimales — los mismos que
 * muestran las figuras); el servicio las rehidrata a puntos {anio,
 * valor} al cargar.
 *
 * Desde el formato 3, la estructura incluye además la ARQUITECTURA del
 * índice (hoja DICCIONARIO): objetivo, categoría, peso, código, unidad,
 * polaridad y cobertura de cada indicador, para el treemap de pesos del
 * cuaderno. Si la hoja falta, `arquitectura` llega null y esa vista lo
 * indica sin afectar a las demás.
 *
 * Vive en un módulo propio porque la usan DOS consumidores que deben
 * producir resultados idénticos: desempenoAmbientalService (fallback en
 * el navegador, con SheetJS bajo demanda) y
 * scripts/precalcular-bases.mjs. El módulo XLSX llega como argumento
 * para no arrastrar SheetJS al paquete del navegador.
 */

/** Versión del formato de la estructura serializada. */
export const FORMATO_DESEMPENO_AMBIENTAL = 3;

/** Entidad que abre las dos primeras vistas del módulo. */
const PAIS_PRINCIPAL = 'Colombia';

const HOJA_BASE = 'BASE_MODELO';
const HOJA_DICCIONARIO = 'DICCIONARIO';
const ESCENARIOS_FUTUROS = ['tendencial', 'optimista', 'restrictivo'];

function aNumero(valor) {
  if (valor === null || valor === undefined || valor === '') return null;
  const numero = typeof valor === 'number' ? valor : Number(String(valor).trim());
  return Number.isFinite(numero) ? numero : null;
}

const redondear = (valor) => Math.round(valor * 100) / 100;

/* "alta" → "Alta", como presenta el cuaderno. */
const capitalizar = (texto) =>
  texto ? texto[0].toUpperCase() + texto.slice(1).toLowerCase() : '';

/**
 * Normaliza el contenido del Excel del EPI.
 * @param {object} XLSX módulo SheetJS
 * @param {ArrayBuffer|Buffer} contenido bytes del archivo .xlsx
 * @returns {{disponible: boolean, estructura: object|null}}
 */
export function normalizarDesempenoAmbiental(XLSX, contenido) {
  const libro = XLSX.read(contenido, {
    dense: true,
    sheets: [HOJA_BASE, HOJA_DICCIONARIO],
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

  /* Filas válidas agrupadas por país, con el escenario en minúsculas. */
  const porPais = new Map();
  for (const fila of crudas) {
    const anio = aNumero(fila.anio);
    const valor = aNumero(fila.valor_epi);
    if (anio === null || valor === null || !fila.pais) continue;
    const nombre = String(fila.pais).trim();
    if (!porPais.has(nombre)) porPais.set(nombre, []);
    porPais.get(nombre).push({
      anio,
      valor,
      escenario: String(fila.escenario ?? '').trim().toLowerCase(),
      calidad: String(fila.calidad_modelo ?? '').trim(),
      region: String(fila.region ?? '').trim(),
    });
  }
  if (!porPais.size) return { disponible: false, estructura: null };

  /* Años canónicos: los del país principal (o el primero disponible). */
  const canon = porPais.get(PAIS_PRINCIPAL) ?? porPais.values().next().value;
  const aniosDe = (filas, escenario) =>
    filas
      .filter((fila) => fila.escenario === escenario)
      .map((fila) => fila.anio)
      .sort((a, b) => a - b);
  const aniosHistoricos = aniosDe(canon, 'historico');
  const aniosProyeccion = aniosDe(canon, 'tendencial');
  const anioOficial = canon.find((fila) => fila.escenario === 'oficial')?.anio ?? null;
  if (!aniosHistoricos.length || !aniosProyeccion.length || anioOficial === null) {
    return { disponible: false, estructura: null };
  }

  /* Arma cada país alineado a los años canónicos; un país con series
     incompletas se descarta (el cuaderno exige cobertura completa). */
  const armarPais = (nombre, filas) => {
    const porEscenario = new Map();
    for (const fila of filas) {
      porEscenario.set(`${fila.escenario}|${fila.anio}`, fila.valor);
    }
    const alinear = (escenario, anios) => {
      const valores = anios.map((anio) => porEscenario.get(`${escenario}|${anio}`));
      return valores.every((valor) => valor !== undefined) ? valores : null;
    };
    const historico = alinear('historico', aniosHistoricos);
    const oficial = porEscenario.get(`oficial|${anioOficial}`);
    const series = ESCENARIOS_FUTUROS.map((escenario) => alinear(escenario, aniosProyeccion));
    if (!historico || oficial === undefined || series.some((serie) => serie === null)) {
      return null;
    }
    return {
      nombre,
      tipo: 'pais',
      calidad: capitalizar(filas.find((fila) => fila.calidad)?.calidad ?? ''),
      region: filas.find((fila) => fila.region)?.region ?? '',
      historico,
      oficial,
      tendencial: series[0],
      optimista: series[1],
      restrictivo: series[2],
    };
  };

  const paises = [...porPais.entries()]
    .map(([nombre, filas]) => armarPais(nombre, filas))
    .filter(Boolean)
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  if (!paises.length) return { disponible: false, estructura: null };

  /* Ranking 2026 sobre los datos oficiales de todos los países. */
  for (const pais of paises) {
    pais.ranking = 1 + paises.filter((otro) => otro.oficial > pais.oficial).length;
  }

  /* Promedios regionales y global, como las entidades del cuaderno. */
  const promediar = (miembros, nombre, tipo) => ({
    nombre,
    tipo,
    calidad: 'Agregada',
    ranking: null,
    historico: aniosHistoricos.map((_, i) =>
      miembros.reduce((suma, pais) => suma + pais.historico[i], 0) / miembros.length,
    ),
    oficial: miembros.reduce((suma, pais) => suma + pais.oficial, 0) / miembros.length,
    ...Object.fromEntries(
      ESCENARIOS_FUTUROS.map((escenario) => [
        escenario,
        aniosProyeccion.map((_, i) =>
          miembros.reduce((suma, pais) => suma + pais[escenario][i], 0) / miembros.length,
        ),
      ]),
    ),
  });

  const regiones = [...new Set(paises.map((pais) => pais.region).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, 'es'),
  );
  const agregadas = [
    ...regiones.map((region) =>
      promediar(
        paises.filter((pais) => pais.region === region),
        `Promedio regional · ${region}`,
        'region',
      ),
    ),
    promediar(paises, 'Promedio global', 'global'),
  ];

  /* Serialización compacta: valores redondeados, sin la región (solo se
     usa para armar los promedios). */
  const compactar = (entidad) => ({
    nombre: entidad.nombre,
    tipo: entidad.tipo,
    calidad: entidad.calidad,
    ranking: entidad.ranking ?? null,
    historico: entidad.historico.map(redondear),
    oficial: redondear(entidad.oficial),
    tendencial: entidad.tendencial.map(redondear),
    optimista: entidad.optimista.map(redondear),
    restrictivo: entidad.restrictivo.map(redondear),
  });

  return {
    disponible: true,
    estructura: {
      aniosHistoricos,
      anioOficial,
      aniosProyeccion,
      paisPrincipal: paises.some((pais) => pais.nombre === PAIS_PRINCIPAL)
        ? PAIS_PRINCIPAL
        : paises[0].nombre,
      totalPaises: paises.length,
      entidades: [...paises, ...agregadas].map(compactar),
      arquitectura: extraerArquitectura(XLSX, libro),
    },
  };
}

/**
 * Extrae la hoja DICCIONARIO: un registro por indicador del índice, con
 * su objetivo, categoría, peso (fracción de 1) y la ficha que muestra el
 * globito del treemap. Devuelve null si la hoja falta o no tiene la
 * estructura del cuaderno.
 */
function extraerArquitectura(XLSX, libro) {
  const hoja = libro.Sheets[HOJA_DICCIONARIO];
  if (!hoja) return null;

  const crudas = XLSX.utils.sheet_to_json(hoja);
  if (!crudas.length) return null;
  const requeridas = ['codigo', 'indicador', 'objetivo', 'categoria', 'peso_epi'];
  if (!requeridas.every((columna) => columna in crudas[0])) return null;

  const indicadores = crudas
    .map((fila) => ({
      codigo: String(fila.codigo ?? '').trim(),
      indicador: String(fila.indicador ?? '').trim(),
      objetivo: String(fila.objetivo ?? '').trim(),
      categoria: String(fila.categoria ?? '').trim(),
      peso: aNumero(fila.peso_epi),
      unidad: String(fila.unidad_raw ?? '').trim(),
      polaridad: String(fila.polaridad ?? '').trim(),
      anioBase: aNumero(fila.anio_base),
      anioReciente: aNumero(fila.anio_mas_reciente),
    }))
    .filter(
      (fila) => fila.indicador && fila.objetivo && fila.categoria && fila.peso !== null,
    )
    .map((fila) => ({ ...fila, peso: Math.round(fila.peso * 1e6) / 1e6 }));

  return indicadores.length ? { indicadores } : null;
}
