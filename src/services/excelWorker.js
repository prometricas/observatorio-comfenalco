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
 *                     departamento y año; normalización compartida en
 *                     normalizacionPoblacion.js).
 *  - 'informalidad':  hojas Tasas_Informalidad_2007-2042 e IC_95pct
 *                     (serie histórica + proyección por ciudad).
 *
 * Protocolo: recibe { arrayBuffer, tipo } y responde
 *   { ok: true, disponible: boolean, tipo, datos }
 *   { ok: false, mensaje: string } ante cualquier error.
 */
import { normalizarInformalidad } from './normalizacionInformalidad.js';
import { normalizarPoblacion } from './normalizacionPoblacion.js';

/* Las normalizaciones viven en módulos propios (normalizacionPoblacion,
   normalizacionInformalidad): las comparten con el script de precálculo
   del build, que debe producir exactamente el mismo resultado que este
   worker. */

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
