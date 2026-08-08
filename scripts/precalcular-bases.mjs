/**
 * precalcular-bases — Interpretación anticipada de las bases pesadas.
 *
 * Se ejecuta automáticamente antes de cada build (`prebuild` en
 * package.json). Recorre las bases de Excel de las tendencias y, para las
 * que tienen la hoja de población, deja junto al .xlsx un archivo
 * `.precalculado.json` con la estructura ya interpretada y el tamaño en
 * bytes del Excel de origen.
 *
 * En el navegador, el portal compara ese tamaño con el del Excel
 * publicado (petición HEAD): si coinciden usa el precalculado y la
 * primera visita carga en segundos; si el cliente reemplazó el Excel en
 * el servidor, no coinciden y el portal lo interpreta en el navegador
 * como siempre — el reemplazo sin recompilar sigue funcionando, solo
 * pierde la vía rápida hasta el siguiente build.
 *
 * Usa la MISMA normalización que el worker del navegador
 * (src/services/normalizacionPoblacion.js): un solo código, un solo
 * resultado posible.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FORMATO_DATOS, normalizarPoblacion } from '../src/services/normalizacionPoblacion.js';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const carpetaTendencias = path.join(raiz, 'public', 'data', 'tendencias');

let generados = 0;

for (const tendencia of fs.readdirSync(carpetaTendencias, { withFileTypes: true })) {
  if (!tendencia.isDirectory()) continue;
  const carpetaExcel = path.join(carpetaTendencias, tendencia.name, 'excel');
  if (!fs.existsSync(carpetaExcel)) continue;

  for (const archivo of fs.readdirSync(carpetaExcel)) {
    if (!archivo.endsWith('.xlsx')) continue;
    const rutaExcel = path.join(carpetaExcel, archivo);
    const contenido = fs.readFileSync(rutaExcel);

    /* Solo las bases con la hoja de población se precalculan; las demás
       (como la de informalidad, que se interpreta en menos de un segundo)
       se saltan sin considerarlo un error. */
    const resultado = normalizarPoblacion(contenido);
    if (!resultado.disponible) continue;

    const rutaSalida = rutaExcel.replace(/\.xlsx$/, '.precalculado.json');
    const registro = {
      formato: FORMATO_DATOS,
      tipo: 'poblacion',
      tamanoOrigen: contenido.length,
      datos: {
        anios: resultado.datos.anios,
        /* El Map no es serializable: viaja como lista de pares y el
           portal lo reconstruye con `new Map(...)`. */
        filas: [...resultado.datos.filas.entries()],
      },
    };
    fs.writeFileSync(rutaSalida, JSON.stringify(registro));

    const kb = Math.round(fs.statSync(rutaSalida).size / 1024);
    console.log(
      `Precalculado ${tendencia.name}/${archivo} → ${path.basename(rutaSalida)} (${kb} KB)`,
    );
    generados += 1;
  }
}

console.log(
  generados > 0
    ? `Listo: ${generados} base(s) precalculada(s).`
    : 'Ninguna base requería precálculo.',
);
