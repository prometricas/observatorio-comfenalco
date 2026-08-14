/**
 * normalizacionFelicidad — Interpretación de la base de Felicidad
 * Nacional Bruta.
 *
 * Convierte el Excel en la estructura serializable que consumen las
 * figuras (arreglos y objetos planos), incluida la prospectiva simulada
 * (escenarios pesimista/optimista, banda 95 % y trayectorias intermedias,
 * calculada en `prospectivaFelicidad`). Vive en un módulo propio porque
 * la usan DOS consumidores que deben producir resultados idénticos:
 *  - felicidadService, cuando el navegador interpreta un Excel recién
 *    reemplazado por el cliente (SheetJS se importa bajo demanda);
 *  - scripts/precalcular-bases.mjs, en cada build.
 *
 * El módulo XLSX llega como argumento para que esta normalización no
 * arrastre SheetJS al paquete del navegador.
 */
import { normalizarNombre } from '../data/departamentos.js';
import { calcularProspectivaFnb } from './prospectivaFelicidad.js';

/** Versión del formato de la estructura serializada. */
export const FORMATO_FELICIDAD = 2;

/* Colores de marca por componente; el índice es el protagonista. */
const COLORES_POR_CLAVE = [
  { clave: 'indice fnb', color: '#005744', grosor: 3.4 },
  { clave: 'salud', color: '#74c1a2', grosor: 2.4 },
  { clave: 'educacion', color: '#58b250', grosor: 2.4 },
  { clave: 'ecologica', color: '#5eb2ae', grosor: 2.4 },
  { clave: 'pobre', color: '#3399a3', grosor: 2.4 },
  { clave: 'vivienda', color: '#ed7a3f', grosor: 2.4 },
];

function aNumero(valor) {
  if (valor === null || valor === undefined || valor === '') return null;
  const numero = typeof valor === 'number' ? valor : Number(String(valor).trim());
  return Number.isFinite(numero) ? numero : null;
}

/* Etiqueta corta de un encabezado: sin unidades y con separador medio. */
function etiquetaCorta(encabezado) {
  return String(encabezado)
    .replace(/\s*\((%|0–100|0-100)\)\s*$/u, '')
    .replace(/:\s+/, ' · ')
    .trim();
}

/* Color y grosor de un indicador según la clave que contenga su nombre. */
function estiloDeIndicador(campo) {
  const nombre = normalizarNombre(campo);
  return (
    COLORES_POR_CLAVE.find((entrada) => nombre.includes(entrada.clave)) ?? {
      color: '#55655e',
      grosor: 2.4,
    }
  );
}

/**
 * Normaliza el contenido del Excel de Felicidad Nacional Bruta.
 * @param {object} XLSX módulo SheetJS
 * @param {ArrayBuffer|Buffer} contenido bytes del archivo .xlsx
 * @returns {{disponible: boolean, estructura: object|null}}
 */
export function normalizarFelicidad(XLSX, contenido) {
  const libro = XLSX.read(contenido, {
    dense: true,
    cellDates: false,
    cellStyles: false,
    cellHTML: false,
  });
  const hoja = libro.Sheets[libro.SheetNames[0]];
  if (!hoja) return { disponible: false, estructura: null };

  const filas = XLSX.utils.sheet_to_json(hoja, { header: 1, blankrows: false });

  /* Fila de encabezados: "Año | Clasificación | …" (búsqueda, no posición). */
  const filaEncabezados = filas.findIndex(
    (fila) =>
      normalizarNombre(fila?.[0]) === 'ano' && normalizarNombre(fila?.[1]).includes('clasificacion'),
  );
  if (filaEncabezados === -1) return { disponible: false, estructura: null };

  /* La tabla principal termina en la columna del índice FNB adaptado. */
  const encabezados = filas[filaEncabezados];
  const columnaIndice = encabezados.findIndex((celda) =>
    normalizarNombre(celda).includes('indice fnb adaptado'),
  );
  if (columnaIndice === -1) return { disponible: false, estructura: null };

  const indicadores = [];
  for (let columna = 2; columna <= columnaIndice; columna += 1) {
    const campo = String(encabezados[columna]).trim();
    indicadores.push({
      campo,
      columna,
      etiqueta: etiquetaCorta(campo),
      ...estiloDeIndicador(campo),
      esIndice: columna === columnaIndice,
    });
  }

  /* Filas anuales VH (histórico) y ET (escenario tendencial del Excel). */
  const anuales = filas
    .slice(filaEncabezados + 1)
    .map((fila) => ({
      anio: aNumero(fila?.[0]),
      clasificacion: String(fila?.[1] ?? '').trim().toUpperCase(),
      valores: fila,
    }))
    .filter((fila) => fila.anio !== null && (fila.clasificacion === 'VH' || fila.clasificacion === 'ET'))
    .sort((a, b) => a.anio - b.anio);
  if (!anuales.length) return { disponible: false, estructura: null };

  const historicas = anuales.filter((fila) => fila.clasificacion === 'VH');
  if (!historicas.length) return { disponible: false, estructura: null };
  const anioCorte = historicas[historicas.length - 1].anio;

  /* Nota metodológica de la propia base (si el archivo la trae). */
  const filaNota = filas
    .slice(filaEncabezados + 1)
    .find((fila) => normalizarNombre(fila?.[0]).startsWith('nota metodologica'));

  /* Series por indicador, con el puente histórico→tendencial ya hecho. */
  const series = indicadores.map((indicador) => {
    const puntos = (lista) =>
      lista
        .map((fila) => ({ anio: fila.anio, valor: aNumero(fila.valores[indicador.columna]) }))
        .filter((punto) => punto.valor !== null);
    const historico = puntos(anuales.filter((f) => f.clasificacion === 'VH'));
    const tendencial = puntos(anuales.filter((f) => f.clasificacion === 'ET'));
    const ultimo = historico[historico.length - 1];
    return {
      ...indicador,
      historico,
      tendencial: ultimo ? [ultimo, ...tendencial] : tendencial,
      valorFinal: tendencial.length ? tendencial[tendencial.length - 1].valor : null,
    };
  });

  /* Pendientes documentadas al pie del Excel (sal:/edu:/eco:/nvp:/viv:),
     en el orden de los cinco componentes, como las lee el cuaderno. */
  const PREFIJOS_PENDIENTE = ['sal:', 'edu:', 'eco:', 'nvp:', 'viv:'];
  const componentes = indicadores.filter((indicador) => !indicador.esIndice);
  const pendientes = {};
  for (const fila of filas) {
    const rotulo = normalizarNombre(fila?.[0]);
    const valor = aNumero(fila?.[1]);
    if (!rotulo || valor === null) continue;
    const posicion = PREFIJOS_PENDIENTE.findIndex((prefijo) => rotulo.startsWith(prefijo));
    if (posicion !== -1 && componentes[posicion]) {
      pendientes[componentes[posicion].campo] = valor;
    }
  }

  /* Prospectiva simulada: requiere las matrices completas (sin celdas
     vacías) del histórico y del tendencial; si la base no alcanza, las
     vistas prospectivas del módulo lo indican sin romper nada. */
  const prospectiva = construirProspectiva(anuales, indicadores);

  return {
    disponible: true,
    estructura: {
      anioMin: anuales[0].anio,
      anioMax: anuales[anuales.length - 1].anio,
      anioCorte,
      nota: filaNota ? String(filaNota[0]).trim() : null,
      series,
      pendientes,
      prospectiva,
    },
  };
}

/* Redondeo compacto para el JSON precalculado (4 decimales bastan: la
   figura muestra 2). */
const redondear = (valor) => Math.round(valor * 10000) / 10000;
const redondearSerie = (valores) => valores.map(redondear);

/**
 * Arma las matrices del cuaderno (componentes × años) y ejecuta la
 * simulación prospectiva. Devuelve null si alguna celda necesaria falta.
 */
function construirProspectiva(anuales, indicadores) {
  const componentes = indicadores.filter((indicador) => !indicador.esIndice);
  const indice = indicadores.find((indicador) => indicador.esIndice);
  if (!componentes.length || !indice) return null;

  const filasHistoricas = anuales.filter((fila) => fila.clasificacion === 'VH');
  const filasTendenciales = anuales.filter((fila) => fila.clasificacion === 'ET');
  if (filasHistoricas.length < 3 || !filasTendenciales.length) return null;

  const matriz = (lista, columna) => {
    const valores = lista.map((fila) => aNumero(fila.valores[columna]));
    return valores.every((valor) => valor !== null) ? valores : null;
  };

  const historicoComponentes = [];
  const tendencialComponentes = [];
  for (const componente of componentes) {
    const historico = matriz(filasHistoricas, componente.columna);
    const tendencial = matriz(filasTendenciales, componente.columna);
    if (!historico || !tendencial) return null;
    historicoComponentes.push(historico);
    tendencialComponentes.push(tendencial);
  }
  const tendencialIndice = matriz(filasTendenciales, indice.columna);
  if (!tendencialIndice) return null;

  const resultado = calcularProspectivaFnb(
    historicoComponentes,
    tendencialComponentes,
    tendencialIndice,
  );
  if (!resultado) return null;

  const compactar = (resumen) => ({
    pesimista: redondearSerie(resumen.pesimista),
    optimista: redondearSerie(resumen.optimista),
    bandaInferior: redondearSerie(resumen.bandaInferior),
    bandaSuperior: redondearSerie(resumen.bandaSuperior),
    trayectorias: resumen.trayectorias.map(redondearSerie),
  });

  const porCampo = {};
  componentes.forEach((componente, posicion) => {
    porCampo[componente.campo] = compactar(resultado.componentes[posicion]);
  });
  porCampo[indice.campo] = compactar(resultado.indice);

  return {
    aniosProyeccion: filasTendenciales.map((fila) => fila.anio),
    porCampo,
  };
}
