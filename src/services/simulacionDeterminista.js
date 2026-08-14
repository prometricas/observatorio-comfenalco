/**
 * simulacionDeterminista — Utilidades compartidas de las simulaciones
 * prospectivas del portal (Felicidad Nacional Bruta y Calidad de vida
 * digital).
 *
 * Los cuadernos originales usan el generador aleatorio de numpy (PCG64),
 * que no es reproducible bit a bit fuera de Python. El portal usa este
 * generador determinista propio (sfc32 sembrado con splitmix32): con la
 * misma semilla produce la misma secuencia en cada build y en cada
 * navegador, de modo que los precalculados y el fallback del navegador
 * coinciden siempre. Las cifras simuladas son estadísticamente
 * equivalentes a las de los cuadernos, no idénticas (documentado en el
 * CHANGELOG de cada módulo).
 */

/** Uniforme [0,1) determinista: sfc32 con estado inicial de splitmix32. */
export function crearUniforme(semilla) {
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

/** Normal estándar por Box-Muller, con reserva del segundo valor. */
export function crearNormal(uniforme) {
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

/** Mediana de una lista (no exige orden previo). */
export function mediana(valores) {
  const orden = [...valores].sort((x, y) => x - y);
  const n = orden.length;
  if (!n) return 0;
  const mitad = Math.floor(n / 2);
  return n % 2 ? orden[mitad] : (orden[mitad - 1] + orden[mitad]) / 2;
}

/** Cuantil con interpolación lineal (el mismo por defecto de numpy). */
export function cuantil(valoresOrdenados, q) {
  const n = valoresOrdenados.length;
  if (!n) return 0;
  const posicion = q * (n - 1);
  const base = Math.floor(posicion);
  const resto = posicion - base;
  if (base + 1 >= n) return valoresOrdenados[n - 1];
  return valoresOrdenados[base] + resto * (valoresOrdenados[base + 1] - valoresOrdenados[base]);
}

/**
 * Escala robusta de una serie: 1.4826·MAD, con los respaldos de los
 * cuadernos (desviación típica muestral; magnitud del único dato, nunca
 * menor que `minimoUnico`).
 */
export function escalaRobusta(valores, minimoUnico = 0.5) {
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
  return Math.max(Math.abs(finitos[0]), minimoUnico);
}
