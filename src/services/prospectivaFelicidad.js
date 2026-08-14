/**
 * prospectivaFelicidad — Simulación prospectiva de la base de Felicidad
 * Nacional Bruta (celda de simulaciones del cuaderno
 * "App_Felicidad_Nacional").
 *
 * Genera, a partir del histórico y del escenario tendencial del Excel,
 * los insumos de las figuras prospectivas: escenarios pesimista y
 * optimista representativos, banda simulada del 95 % y trayectorias
 * intermedias de fondo. El algoritmo es el del cuaderno, paso a paso:
 * volatilidad robusta (mediana/MAD) de los cambios históricos de los
 * componentes, correlación regularizada con choque común y colas t de
 * Student, persistencia de la desviación, recentrado alrededor del
 * tendencial y selección de escenarios por percentiles del resultado
 * terminal (20 y 80). El índice simulado conserva su identidad contable:
 * promedio de los cinco componentes.
 *
 * ADAPTACIÓN CONSCIENTE (documentada también en el CHANGELOG): el
 * cuaderno usa el generador aleatorio de numpy (PCG64), que no es
 * reproducible bit a bit fuera de Python. Aquí se usa un generador
 * determinista propio (sfc32 sembrado con la MISMA semilla 2050 y las
 * mismas 7000 corridas): el histórico y el tendencial son EXACTOS al
 * Excel, y las cifras simuladas (escenarios alternativos, banda y
 * trayectorias) son estadísticamente equivalentes a las del cuaderno,
 * no idénticas — el propio cuaderno las rotula como simulaciones
 * ilustrativas, no proyecciones oficiales.
 *
 * Es módulo COMPARTIDO: lo usan normalizacionFelicidad (navegador y
 * script de build) para que ambas vías produzcan el mismo resultado.
 */

/** Parámetros del cuaderno. */
export const SEMILLA_SIMULACION = 2050;
export const NUMERO_SIMULACIONES = 7000;
export const NUMERO_TRAYECTORIAS = 18;

/* ── Generador determinista ──────────────────────────────────────── */

/* sfc32 con estado inicial derivado de la semilla por splitmix32:
   secuencia idéntica en cada build y en cada navegador. */
function crearUniforme(semilla) {
  let estado = semilla >>> 0;
  const siguiente = () => {
    estado = (estado + 0x9e3779b9) | 0;
    let t = estado ^ (estado >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t ^= t >>> 15;
    t = Math.imul(t, 0x735a2d97);
    t ^= t >>> 15;
    return t >>> 0;
  };
  let a = siguiente();
  let b = siguiente();
  let c = siguiente();
  let d = siguiente();
  return function uniforme() {
    const t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = ((c << 21) | (c >>> 11)) | 0;
    d = (d + 1) | 0;
    const r = (t + d) | 0;
    c = (c + r) | 0;
    return (r >>> 0) / 4294967296;
  };
}

/* Normal estándar por Box-Muller, con reserva del segundo valor. */
function crearNormal(uniforme) {
  let reserva = null;
  return function normal() {
    if (reserva !== null) {
      const valor = reserva;
      reserva = null;
      return valor;
    }
    let u;
    do {
      u = uniforme();
    } while (u <= 1e-12);
    const radio = Math.sqrt(-2 * Math.log(u));
    const angulo = 2 * Math.PI * uniforme();
    reserva = radio * Math.sin(angulo);
    return radio * Math.cos(angulo);
  };
}

/* ── Estadística auxiliar ────────────────────────────────────────── */

function mediana(valores) {
  const orden = [...valores].sort((x, y) => x - y);
  const n = orden.length;
  if (!n) return 0;
  const mitad = Math.floor(n / 2);
  return n % 2 ? orden[mitad] : (orden[mitad - 1] + orden[mitad]) / 2;
}

/* Cuantil con interpolación lineal (el mismo por defecto de numpy). */
function cuantil(valoresOrdenados, q) {
  const n = valoresOrdenados.length;
  if (!n) return 0;
  const posicion = q * (n - 1);
  const base = Math.floor(posicion);
  const resto = posicion - base;
  if (base + 1 >= n) return valoresOrdenados[n - 1];
  return valoresOrdenados[base] + resto * (valoresOrdenados[base + 1] - valoresOrdenados[base]);
}

/* Escala robusta de una serie de cambios: 1.4826·MAD con los respaldos
   del cuaderno (desviación típica muestral; magnitud del único dato). */
function escalaRobusta(valores) {
  const finitos = valores.filter((v) => Number.isFinite(v));
  if (!finitos.length) return 1;
  const med = mediana(finitos);
  const mad = mediana(finitos.map((v) => Math.abs(v - med)));
  if (mad > 0) return 1.4826 * mad;
  if (finitos.length > 1) {
    const media = finitos.reduce((s, v) => s + v, 0) / finitos.length;
    const varianza = finitos.reduce((s, v) => s + (v - media) ** 2, 0) / (finitos.length - 1);
    return Math.sqrt(varianza);
  }
  return Math.max(Math.abs(finitos[0]), 0.5);
}

/* Autovalores y autovectores de una matriz simétrica pequeña (método de
   Jacobi): suficiente y exacto para la matriz 5×5 de correlaciones. */
function autoSimetrica(matriz) {
  const n = matriz.length;
  const a = matriz.map((fila) => [...fila]);
  const v = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  );
  for (let barrido = 0; barrido < 100; barrido += 1) {
    let p = 0;
    let q = 1;
    let mayor = 0;
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) {
        if (Math.abs(a[i][j]) > mayor) {
          mayor = Math.abs(a[i][j]);
          p = i;
          q = j;
        }
      }
    }
    if (mayor < 1e-12) break;
    const theta = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const cos = Math.cos(theta);
    const sen = Math.sin(theta);
    for (let k = 0; k < n; k += 1) {
      const akp = a[k][p];
      const akq = a[k][q];
      a[k][p] = cos * akp - sen * akq;
      a[k][q] = sen * akp + cos * akq;
    }
    for (let k = 0; k < n; k += 1) {
      const apk = a[p][k];
      const aqk = a[q][k];
      a[p][k] = cos * apk - sen * aqk;
      a[q][k] = sen * apk + cos * aqk;
    }
    for (let k = 0; k < n; k += 1) {
      const vkp = v[k][p];
      const vkq = v[k][q];
      v[k][p] = cos * vkp - sen * vkq;
      v[k][q] = sen * vkp + cos * vkq;
    }
  }
  return { valores: a.map((fila, i) => fila[i]), vectores: v };
}

/* Descomposición de Cholesky de una matriz definida positiva. */
function cholesky(matriz) {
  const n = matriz.length;
  const l = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j <= i; j += 1) {
      let suma = matriz[i][j];
      for (let k = 0; k < j; k += 1) suma -= l[i][k] * l[j][k];
      if (i === j) {
        l[i][j] = Math.sqrt(Math.max(suma, 1e-12));
      } else {
        l[i][j] = suma / l[j][j];
      }
    }
  }
  return l;
}

const acotar = (valor) => Math.min(100, Math.max(0, valor));

/* ── Simulación principal ────────────────────────────────────────── */

/**
 * Ejecuta la simulación del cuaderno.
 * @param {number[][]} historicoComponentes matriz [componente][añoHistórico]
 * @param {number[][]} tendencialComponentes matriz [componente][añoProyectado] (solo ET)
 * @param {number[]} tendencialIndice serie ET del índice compuesto
 * @returns {{componentes: object[], indice: object}|null} por indicador:
 *   pesimista, optimista, bandaInferior, bandaSuperior (por año proyectado)
 *   y trayectorias intermedias; null si la base no alcanza para simular.
 */
export function calcularProspectivaFnb(historicoComponentes, tendencialComponentes, tendencialIndice) {
  const nComp = historicoComponentes.length;
  const nHist = nComp ? historicoComponentes[0].length : 0;
  const horizonte = nComp ? tendencialComponentes[0].length : 0;
  if (!nComp || nHist < 3 || !horizonte) return null;

  const uniforme = crearUniforme(SEMILLA_SIMULACION);
  const normal = crearNormal(uniforme);

  /* Volatilidad robusta de los cambios anuales históricos. */
  const cambios = Array.from({ length: nComp }, (_, j) =>
    Array.from({ length: nHist - 1 }, (_, t) => historicoComponentes[j][t + 1] - historicoComponentes[j][t]),
  );
  const escalasCrudas = cambios.map(escalaRobusta);
  const sigmas = escalasCrudas.map((e) => Math.min(2.2, Math.max(0.25, 0.28 * e)));

  /* Correlación regularizada de los cambios estandarizados. */
  const estandarizados = cambios.map((fila, j) =>
    fila.map((v) => v / (escalasCrudas[j] > 1e-9 ? escalasCrudas[j] : 1)),
  );
  const medias = estandarizados.map((fila) => fila.reduce((s, v) => s + v, 0) / fila.length);
  const correlacion = Array.from({ length: nComp }, () => new Array(nComp).fill(0));
  for (let i = 0; i < nComp; i += 1) {
    for (let j = i; j < nComp; j += 1) {
      let cov = 0;
      let vi = 0;
      let vj = 0;
      for (let t = 0; t < nHist - 1; t += 1) {
        const di = estandarizados[i][t] - medias[i];
        const dj = estandarizados[j][t] - medias[j];
        cov += di * dj;
        vi += di * di;
        vj += dj * dj;
      }
      const den = Math.sqrt(vi * vj);
      const r = den > 0 ? cov / den : 0;
      correlacion[i][j] = Number.isFinite(r) ? r : 0;
      correlacion[j][i] = correlacion[i][j];
    }
  }
  let regularizada = correlacion.map((fila, i) =>
    fila.map((r, j) => 0.35 * r + 0.65 * (i === j ? 1 : 0)),
  );
  /* Reparación espectral y renormalización, como el cuaderno. */
  const { valores, vectores } = autoSimetrica(regularizada);
  const positivos = valores.map((v) => Math.max(v, 1e-6));
  regularizada = Array.from({ length: nComp }, (_, i) =>
    Array.from({ length: nComp }, (_, j) => {
      let suma = 0;
      for (let k = 0; k < nComp; k += 1) suma += vectores[i][k] * positivos[k] * vectores[j][k];
      return suma;
    }),
  );
  const diagonal = regularizada.map((fila, i) => Math.sqrt(fila[i]));
  regularizada = regularizada.map((fila, i) => fila.map((v, j) => v / (diagonal[i] * diagonal[j])));
  const factorCholesky = cholesky(
    regularizada.map((fila, i) => fila.map((v, j) => v + (i === j ? 1e-8 : 0))),
  );

  /* Corridas: choque común + choque correlacionado, colas t (chi²/8),
     pendiente y desviación con persistencia, acotado a 0–100. */
  const N = NUMERO_SIMULACIONES;
  const simsComp = new Float64Array(N * horizonte * nComp);
  const desviacion = new Float64Array(N * nComp);
  const desviacionPendiente = new Float64Array(N * nComp);
  const z = new Float64Array(nComp);
  const zCorrelacionado = new Float64Array(nComp);

  for (let h = 0; h < horizonte; h += 1) {
    const factorHorizonte = Math.sqrt(1 + 0.015 * h);
    for (let i = 0; i < N; i += 1) {
      for (let j = 0; j < nComp; j += 1) z[j] = normal();
      for (let j = 0; j < nComp; j += 1) {
        let suma = 0;
        for (let k = 0; k <= j; k += 1) suma += factorCholesky[j][k] * z[k];
        zCorrelacionado[j] = suma;
      }
      const comun = normal();
      let chi = 0;
      for (let k = 0; k < 8; k += 1) {
        const g = normal();
        chi += g * g;
      }
      const escalaColas = 1 / Math.sqrt(chi / 8);
      for (let j = 0; j < nComp; j += 1) {
        const choque = (0.35 * comun + 0.65 * zCorrelacionado[j]) * escalaColas;
        const eps = choque * sigmas[j] * factorHorizonte;
        const idx = i * nComp + j;
        desviacionPendiente[idx] = 0.38 * desviacionPendiente[idx] + 0.22 * eps;
        desviacion[idx] = 0.62 * desviacion[idx] + desviacionPendiente[idx] + eps;
        simsComp[(i * horizonte + h) * nComp + j] = acotar(
          tendencialComponentes[j][h] + desviacion[idx],
        );
      }
    }
  }

  /* Recentrado: la mediana simulada de cada horizonte vuelve a coincidir
     con el escenario tendencial del Excel. */
  const columna = new Float64Array(N);
  for (let h = 0; h < horizonte; h += 1) {
    for (let j = 0; j < nComp; j += 1) {
      for (let i = 0; i < N; i += 1) columna[i] = simsComp[(i * horizonte + h) * nComp + j];
      const ajuste = tendencialComponentes[j][h] - mediana(columna);
      for (let i = 0; i < N; i += 1) {
        const idx = (i * horizonte + h) * nComp + j;
        simsComp[idx] = acotar(simsComp[idx] + ajuste);
      }
    }
  }

  /* Índice simulado: promedio de los componentes en cada corrida. */
  const simsIndice = new Float64Array(N * horizonte);
  for (let i = 0; i < N; i += 1) {
    for (let h = 0; h < horizonte; h += 1) {
      let suma = 0;
      for (let j = 0; j < nComp; j += 1) suma += simsComp[(i * horizonte + h) * nComp + j];
      simsIndice[i * horizonte + h] = suma / nComp;
    }
  }

  /* Resumen por indicador: banda 95 %, trayectorias representativas y
     escenarios elegidos por percentiles del resultado terminal. */
  const resumir = (valorEn, central) => {
    const bandaInferior = new Array(horizonte);
    const bandaSuperior = new Array(horizonte);
    for (let h = 0; h < horizonte; h += 1) {
      const orden = new Float64Array(N);
      for (let i = 0; i < N; i += 1) orden[i] = valorEn(i, h);
      orden.sort();
      bandaInferior[h] = cuantil(orden, 0.025);
      bandaSuperior[h] = cuantil(orden, 0.975);
    }

    const puntuacion = new Float64Array(N);
    for (let i = 0; i < N; i += 1) {
      let suma = 0;
      for (let h = 0; h < horizonte; h += 1) suma += valorEn(i, h) - central[h];
      puntuacion[i] = suma / horizonte;
    }
    const orden = Array.from({ length: N }, (_, i) => i).sort(
      (x, y) => puntuacion[x] - puntuacion[y],
    );

    const trayectorias = Array.from({ length: NUMERO_TRAYECTORIAS }, (_, t) => {
      const posicion = Math.round(
        (0.08 + (0.84 * t) / (NUMERO_TRAYECTORIAS - 1)) * (N - 1),
      );
      const sim = orden[posicion];
      return Array.from({ length: horizonte }, (_, h) => valorEn(sim, h));
    });

    const terminal = new Float64Array(N);
    for (let i = 0; i < N; i += 1) terminal[i] = valorEn(i, horizonte - 1) - central[horizonte - 1];
    const terminalOrdenada = Float64Array.from(terminal).sort();
    const q20 = cuantil(terminalOrdenada, 0.2);
    const q80 = cuantil(terminalOrdenada, 0.8);
    let simPesimista = 0;
    let simOptimista = 0;
    for (let i = 1; i < N; i += 1) {
      if (Math.abs(terminal[i] - q20) < Math.abs(terminal[simPesimista] - q20)) simPesimista = i;
      if (Math.abs(terminal[i] - q80) < Math.abs(terminal[simOptimista] - q80)) simOptimista = i;
    }

    return {
      bandaInferior,
      bandaSuperior,
      trayectorias,
      pesimista: Array.from({ length: horizonte }, (_, h) => valorEn(simPesimista, h)),
      optimista: Array.from({ length: horizonte }, (_, h) => valorEn(simOptimista, h)),
    };
  };

  return {
    componentes: Array.from({ length: nComp }, (_, j) =>
      resumir((i, h) => simsComp[(i * horizonte + h) * nComp + j], tendencialComponentes[j]),
    ),
    indice: resumir((i, h) => simsIndice[i * horizonte + h], tendencialIndice),
  };
}
