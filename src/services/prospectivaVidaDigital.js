/**
 * prospectivaVidaDigital — Simulación prospectiva de la base del Digital
 * Quality of Life Index (celda de intervalos y trayectorias del cuaderno
 * "App_Vida_Digital").
 *
 * Los valores centrales del Excel se conservan exactamente en cada año;
 * la incertidumbre se modela como en el cuaderno: residuos a un paso de
 * una tendencia amortiguada ETS (α=0.50, β=0.30, φ=0.85) sobre el
 * histórico 2022–2025, volatilidad robusta (MAD) contraída hacia la
 * agrupada de los 37 países (30/70), calibrada (×0.36) y acotada
 * [0.0055, 0.0140]; innovaciones t de Student (7 gl, varianza
 * normalizada), persistencia de nivel (0.58) y de pendiente (0.38), y
 * recentrado de la mediana sobre el pronóstico central. De las 8000
 * corridas salen la banda del 95 %, 18 trayectorias de fondo y 24
 * escenarios representativos (cuantiles del nivel final, ordenados de
 * menor a mayor).
 *
 * ADAPTACIÓN CONSCIENTE (misma que la simulación de FNB, documentada en
 * el CHANGELOG): el generador de numpy no es reproducible fuera de
 * Python; aquí cada país usa el generador determinista del portal con
 * una semilla propia derivada de la del cuaderno (2030) y su posición,
 * así que histórico y proyección central son EXACTOS al Excel y las
 * cifras simuladas son estadísticamente equivalentes, no idénticas.
 *
 * Módulo COMPARTIDO entre normalizacionVidaDigital (navegador) y el
 * script de build: ambas vías producen el mismo resultado.
 */
import { crearNormal, crearUniforme, cuantil, escalaRobusta, mediana } from './simulacionDeterminista.js';

/** Parámetros del cuaderno. */
const SEMILLA_SIMULACION = 2030;
const NUMERO_SIMULACIONES = 8000;
const NUMERO_TRAYECTORIAS = 18;
export const NUMERO_ESCENARIOS = 24;

const ALFA = 0.5;
const BETA = 0.3;
const PHI = 0.85;
const PERSISTENCIA_NIVEL = 0.58;
const PERSISTENCIA_PENDIENTE = 0.38;
const SIGMA_MINIMO = 0.0055;
const SIGMA_MAXIMO = 0.014;

const acotar01 = (valor) => Math.min(1, Math.max(0, valor));

/** Residuos a un paso de la tendencia amortiguada aditiva del cuaderno. */
function residuosEts(historico) {
  if (historico.length < 3 || !historico.every((valor) => Number.isFinite(valor))) return [];
  let nivel = historico[0];
  let tendencia = historico[1] - historico[0];
  const residuos = [];
  for (let t = 1; t < historico.length; t += 1) {
    const pronostico = nivel + PHI * tendencia;
    const error = historico[t] - pronostico;
    residuos.push(error);
    const nivelNuevo = nivel + PHI * tendencia + ALFA * error;
    tendencia = PHI * tendencia + BETA * error;
    nivel = nivelNuevo;
  }
  return residuos;
}

/* Sigma robusta de una lista de residuos, con el respaldo del cuaderno
   (0.010 si no hay residuos). */
const sigmaRobusta = (residuos) => (residuos.length ? escalaRobusta(residuos, 0) : 0.01);

/* Banda del 95 %, 18 trayectorias de fondo, 24 escenarios
   representativos y los escenarios nombrados (pesimista P20 y optimista
   P80 del cierre; el tendencial es la proyección central del Excel) de
   una matriz de corridas. */
function resumirSims(sims, N, horizonte, uniforme) {
  const columna = new Float64Array(N);
  const bandaInferior = new Array(horizonte);
  const bandaSuperior = new Array(horizonte);
  for (let h = 0; h < horizonte; h += 1) {
    for (let i = 0; i < N; i += 1) columna[i] = sims[i * horizonte + h];
    const orden = Float64Array.from(columna).sort();
    bandaInferior[h] = cuantil(orden, 0.025);
    bandaSuperior[h] = cuantil(orden, 0.975);
  }

  const fila = (i) => Array.from({ length: horizonte }, (_, h) => sims[i * horizonte + h]);

  const elegidas = new Set();
  while (elegidas.size < Math.min(NUMERO_TRAYECTORIAS, N)) {
    elegidas.add(Math.floor(uniforme() * N));
  }
  const trayectorias = [...elegidas].map(fila);

  /* Escenarios: cuantiles del nivel final, de menor a mayor. */
  const ordenFinal = Array.from({ length: N }, (_, i) => i).sort(
    (x, y) => sims[x * horizonte + horizonte - 1] - sims[y * horizonte + horizonte - 1],
  );
  const escenarios = Array.from({ length: NUMERO_ESCENARIOS }, (_, e) => {
    const posicionOrden = Math.round((e * (N - 1)) / (NUMERO_ESCENARIOS - 1));
    return fila(ordenFinal[posicionOrden]);
  });

  /* Escenarios nombrados: la trayectoria completa cuyo cierre queda más
     cerca del percentil pedido (celda 5D del cuaderno). */
  const finales = new Float64Array(N);
  for (let i = 0; i < N; i += 1) finales[i] = sims[i * horizonte + horizonte - 1];
  const finalesOrdenados = Float64Array.from(finales).sort();
  const cercanaA = (percentil) => {
    const objetivo = cuantil(finalesOrdenados, percentil);
    let elegida = 0;
    for (let i = 1; i < N; i += 1) {
      if (Math.abs(finales[i] - objetivo) < Math.abs(finales[elegida] - objetivo)) elegida = i;
    }
    return fila(elegida);
  };

  return {
    bandaInferior,
    bandaSuperior,
    trayectorias,
    escenarios,
    pesimista: cercanaA(0.2),
    optimista: cercanaA(0.8),
  };
}

/**
 * Simulación completa del cuaderno para todos los países y, si se pide,
 * para el promedio OCDE (que promedia las corridas país a país, como el
 * cuaderno: su banda es más estrecha que la de cualquier país).
 * @param {Array<{nombre: string, historico: number[], proyeccion: number[]}>} paises
 *   histórico 2022–2025 (4 valores) y proyección central 2026–2030 (5).
 * @param {{nombre: string, proyeccion: number[]}|null} promedio entidad
 *   promedio a construir con las corridas promediadas.
 * @returns {Map<string, {bandaInferior, bandaSuperior, trayectorias, escenarios}>}
 */
export function calcularProspectivaVidaDigital(paises, promedio = null) {
  /* Volatilidad agrupada de los residuos de todos los países. */
  const residuosPorPais = new Map(
    paises.map((pais) => [pais.nombre, residuosEts(pais.historico)]),
  );
  const sigmaAgrupada = sigmaRobusta([...residuosPorPais.values()].flat());

  const N = NUMERO_SIMULACIONES;
  const resultado = new Map();
  let sumaSims = null;

  paises.forEach((pais, posicion) => {
    const horizonte = pais.proyeccion.length;

    /* Contracción empírico-bayesiana hacia la volatilidad agrupada. */
    const propia = sigmaRobusta(residuosPorPais.get(pais.nombre));
    const combinada = Math.sqrt(0.3 * propia ** 2 + 0.7 * sigmaAgrupada ** 2);
    const sigma = Math.min(SIGMA_MAXIMO, Math.max(SIGMA_MINIMO, 0.36 * combinada));

    /* Semilla propia por país: independiente del orden de la base. */
    const uniforme = crearUniforme(SEMILLA_SIMULACION * 1000 + posicion);
    const normal = crearNormal(uniforme);
    /* t de Student con 7 grados: normal / sqrt(chi²₇/7), normalizada a
       varianza 1 dividiendo por sqrt(7/5), como el cuaderno. */
    const studentT = () => {
      let chi = 0;
      for (let k = 0; k < 7; k += 1) {
        const g = normal();
        chi += g * g;
      }
      return normal() / Math.sqrt(chi / 7) / Math.sqrt(7 / 5);
    };

    const sims = new Float64Array(N * horizonte);
    const desviacion = new Float64Array(N);
    const pendiente = new Float64Array(N);
    for (let h = 0; h < horizonte; h += 1) {
      const factor = sigma * Math.sqrt(1 + 0.1 * h);
      for (let i = 0; i < N; i += 1) {
        const eps = studentT() * factor;
        pendiente[i] = PERSISTENCIA_PENDIENTE * pendiente[i] + 0.28 * eps;
        desviacion[i] = PERSISTENCIA_NIVEL * desviacion[i] + pendiente[i] + eps;
        sims[i * horizonte + h] = acotar01(pais.proyeccion[h] + desviacion[i]);
      }
    }

    /* Recentrado exacto de la mediana sobre el pronóstico del Excel. */
    const columna = new Float64Array(N);
    for (let h = 0; h < horizonte; h += 1) {
      for (let i = 0; i < N; i += 1) columna[i] = sims[i * horizonte + h];
      const ajuste = pais.proyeccion[h] - mediana(columna);
      for (let i = 0; i < N; i += 1) {
        sims[i * horizonte + h] = acotar01(sims[i * horizonte + h] + ajuste);
      }
    }

    if (promedio) {
      if (!sumaSims) sumaSims = new Float64Array(N * horizonte);
      for (let k = 0; k < sims.length; k += 1) sumaSims[k] += sims[k];
    }

    resultado.set(pais.nombre, resumirSims(sims, N, horizonte, uniforme));
  });

  if (promedio && sumaSims && paises.length) {
    const horizonte = promedio.proyeccion.length;
    const simsPromedio = new Float64Array(N * horizonte);
    for (let k = 0; k < sumaSims.length; k += 1) simsPromedio[k] = sumaSims[k] / paises.length;

    /* Recentrado sobre la proyección central del promedio. */
    const columna = new Float64Array(N);
    for (let h = 0; h < horizonte; h += 1) {
      for (let i = 0; i < N; i += 1) columna[i] = simsPromedio[i * horizonte + h];
      const ajuste = promedio.proyeccion[h] - mediana(columna);
      for (let i = 0; i < N; i += 1) {
        simsPromedio[i * horizonte + h] = acotar01(simsPromedio[i * horizonte + h] + ajuste);
      }
    }

    const uniformePromedio = crearUniforme(SEMILLA_SIMULACION * 1000 + 999991);
    resultado.set(promedio.nombre, resumirSims(simsPromedio, N, horizonte, uniformePromedio));
  }

  return resultado;
}
