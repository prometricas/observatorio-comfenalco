/**
 * precalcular-bases — Interpretación anticipada de bases y textos.
 *
 * Se ejecuta automáticamente antes de cada build (`prebuild` en
 * package.json) y deja junto a cada archivo pesado un
 * `.precalculado.json` con el contenido ya interpretado y el tamaño en
 * bytes del archivo de origen:
 *  - Bases de Excel de tendencias e indicadores: población (pirámides),
 *    informalidad (serie por ciudad), Índice OCDE y Felicidad Nacional
 *    Bruta — cada una reconocida por su propia estructura (arreglo
 *    INTERPRETES_EXCEL).
 *  - Documentos Word (todas las carpetas textos/ de tendencias e
 *    indicadores): sus párrafos ya extraídos, para que el navegador no
 *    descargue el .docx ni el intérprete mammoth.
 *
 * En el navegador, el portal compara ese tamaño con el del archivo
 * publicado (petición HEAD): si coinciden usa el precalculado y la carga
 * es inmediata; si el cliente reemplazó el archivo en el servidor, no
 * coinciden y el portal lo interpreta en el navegador como siempre — el
 * reemplazo sin recompilar sigue funcionando, solo pierde la vía rápida
 * hasta el siguiente build.
 *
 * Usa las MISMAS normalizaciones que el navegador (los módulos
 * src/services/normalizacion*.js): un solo código, un solo resultado
 * posible.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import {
  FORMATO_CAPITAL_HUMANO,
  normalizarCapitalHumano,
} from '../src/services/normalizacionCapitalHumano.js';
import {
  FORMATO_DESEMPENO_AMBIENTAL,
  normalizarDesempenoAmbiental,
} from '../src/services/normalizacionDesempenoAmbiental.js';
import { normalizarInformalidad } from '../src/services/normalizacionInformalidad.js';
import { FORMATO_DATOS, normalizarPoblacion } from '../src/services/normalizacionPoblacion.js';
import { FORMATO_TEXTO, partirEnParrafos } from '../src/services/normalizacionTexto.js';
import { FORMATO_VIDA_MEJOR, normalizarVidaMejor } from '../src/services/normalizacionVidaMejor.js';
import { FORMATO_FELICIDAD, normalizarFelicidad } from '../src/services/normalizacionFelicidad.js';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const carpetaDatos = path.join(raiz, 'public', 'data');

/* A partir de este tamaño se publica también la variante comprimida
   (.json.gz): el portal la prefiere y el archivo viaja a una fracción del
   peso aunque el servidor no comprima nada. */
const UMBRAL_COMPRIMIR = 50 * 1024;

let generados = 0;

/* Carpetas de contenido de primer nivel: tendencias e indicadores. */
const carpetasContenido = fs
  .readdirSync(carpetaDatos, { withFileTypes: true })
  .filter((entrada) => entrada.isDirectory())
  .map((entrada) => path.join(carpetaDatos, entrada.name));

/**
 * Intérpretes de Excel en orden de prueba: cada base se reconoce por su
 * propia estructura; un archivo que no corresponda a ninguno se reporta
 * y se salta (el portal lo interpretaría en el navegador).
 */
const INTERPRETES_EXCEL = [
  {
    interpretar: (contenido) => normalizarPoblacion(contenido),
    registro: (resultado, tamanoOrigen) => ({
      formato: FORMATO_DATOS,
      tipo: 'poblacion',
      tamanoOrigen,
      datos: {
        anios: resultado.datos.anios,
        /* El Map no es serializable: viaja como lista de pares y el
           portal lo reconstruye con `new Map(...)`. */
        filas: [...resultado.datos.filas.entries()],
      },
    }),
  },
  {
    interpretar: (contenido) => normalizarInformalidad(contenido),
    registro: (resultado, tamanoOrigen) => ({
      formato: FORMATO_DATOS,
      tipo: 'informalidad',
      tamanoOrigen,
      datos: {
        anios: resultado.datos.anios,
        /* El Map de ciudades viaja como lista de pares. */
        ciudades: [...resultado.datos.ciudades.entries()],
      },
    }),
  },
  {
    interpretar: (contenido) => normalizarVidaMejor(XLSX, contenido),
    registro: (resultado, tamanoOrigen) => ({
      formato: FORMATO_VIDA_MEJOR,
      tipo: 'vida-mejor',
      tamanoOrigen,
      estructura: resultado.estructura,
    }),
  },
  {
    interpretar: (contenido) => normalizarFelicidad(XLSX, contenido),
    registro: (resultado, tamanoOrigen) => ({
      formato: FORMATO_FELICIDAD,
      tipo: 'felicidad',
      tamanoOrigen,
      estructura: resultado.estructura,
    }),
  },
  {
    interpretar: (contenido) => normalizarDesempenoAmbiental(XLSX, contenido),
    registro: (resultado, tamanoOrigen) => ({
      formato: FORMATO_DESEMPENO_AMBIENTAL,
      tipo: 'desempeno-ambiental',
      tamanoOrigen,
      estructura: resultado.estructura,
    }),
  },
  /* Capital humano se reconoce por sus columnas genéricas: va al final
     para que las bases con hoja o fila propia se identifiquen primero. */
  {
    interpretar: (contenido) => normalizarCapitalHumano(XLSX, contenido),
    registro: (resultado, tamanoOrigen) => ({
      formato: FORMATO_CAPITAL_HUMANO,
      tipo: 'capital-humano',
      tamanoOrigen,
      estructura: resultado.estructura,
    }),
  },
];

function escribirPrecalculado(rutaOrigen, extension, registro, etiqueta) {
  const rutaSalida = rutaOrigen.replace(extension, '.precalculado.json');
  const contenidoJson = JSON.stringify(registro);
  fs.writeFileSync(rutaSalida, contenidoJson);

  /* Variante comprimida para los archivos grandes. */
  let notaGz = '';
  if (contenidoJson.length >= UMBRAL_COMPRIMIR) {
    const comprimido = zlib.gzipSync(Buffer.from(contenidoJson), { level: 9 });
    fs.writeFileSync(`${rutaSalida}.gz`, comprimido);
    notaGz = ` + .gz (${Math.round(comprimido.length / 1024)} KB)`;
  } else if (fs.existsSync(`${rutaSalida}.gz`)) {
    fs.rmSync(`${rutaSalida}.gz`);
  }

  const kb = Math.round(fs.statSync(rutaSalida).size / 1024);
  console.log(`Precalculado ${etiqueta} → ${path.basename(rutaSalida)} (${kb} KB${notaGz})`);
  generados += 1;
}

for (const carpetaContenido of carpetasContenido) {
  for (const tema of fs.readdirSync(carpetaContenido, { withFileTypes: true })) {
    if (!tema.isDirectory()) continue;
    const etiquetaTema = `${path.basename(carpetaContenido)}/${tema.name}`;

    /* ── Excel: cada base se interpreta con el primer intérprete que la
       reconozca; las que no correspondan a ninguno se saltan. ── */
    const carpetaExcel = path.join(carpetaContenido, tema.name, 'excel');
    if (fs.existsSync(carpetaExcel)) {
      for (const archivo of fs.readdirSync(carpetaExcel)) {
        if (!archivo.endsWith('.xlsx')) continue;
        const rutaExcel = path.join(carpetaExcel, archivo);
        const contenido = fs.readFileSync(rutaExcel);

        let interpretado = false;
        for (const interprete of INTERPRETES_EXCEL) {
          const resultado = interprete.interpretar(contenido);
          if (!resultado.disponible) continue;
          escribirPrecalculado(
            rutaExcel,
            /\.xlsx$/,
            interprete.registro(resultado, contenido.length),
            `${etiquetaTema}/${archivo}`,
          );
          interpretado = true;
          break;
        }
        if (!interpretado) {
          console.log(
            `Aviso: ${etiquetaTema}/${archivo} no corresponde a ninguna base conocida; sin precalculado.`,
          );
        }
      }
    }

    /* ── Word: los párrafos de todos los documentos de textos/. ── */
    const carpetaTextos = path.join(carpetaContenido, tema.name, 'textos');
    if (fs.existsSync(carpetaTextos)) {
      for (const archivo of fs.readdirSync(carpetaTextos)) {
        if (!archivo.endsWith('.docx')) continue;
        const rutaDocx = path.join(carpetaTextos, archivo);
        const contenido = fs.readFileSync(rutaDocx);
        const resultado = await mammoth.extractRawText({ buffer: contenido });

        escribirPrecalculado(
          rutaDocx,
          /\.docx$/,
          {
            formato: FORMATO_TEXTO,
            tamanoOrigen: contenido.length,
            parrafos: partirEnParrafos(resultado.value),
          },
          `${etiquetaTema}/${archivo}`,
        );
      }
    }
  }
}

console.log(
  generados > 0
    ? `Listo: ${generados} archivo(s) precalculado(s).`
    : 'Ningún archivo requería precálculo.',
);
