/**
 * tendencias.js — Configuración de contenido de cada tendencia.
 *
 * El portal usa UN solo módulo de tendencia (ModuloTendencia) parametrizado;
 * este catálogo define QUÉ muestra cada tendencia: el tipo de gráfica, la
 * base de Excel que la alimenta y cómo se organizan sus textos Word.
 *
 * Tipos de gráfica:
 *  - 'piramides':      dos pirámides poblacionales comparativas con selector
 *                      de año (Envejecimiento).
 *  - 'serie-ciudades': una serie histórica + proyección por ciudad capital
 *                      (Informalidad laboral).
 *
 * Modos de texto:
 *  - 'documento-por-departamento': un archivo .docx por departamento en
 *    textos/ (antioquia.docx, huila.docx…).
 *  - 'documento-unico': un solo .docx con secciones tituladas
 *    "Ciudad (Departamento)"; el portal extrae la sección del departamento
 *    seleccionado.
 */

import { CIUDAD_POR_DEPARTAMENTO } from './informalidad.js';

const CONFIGURACION_TENDENCIAS = {
  envejecimiento: {
    grafica: 'piramides',
    archivoExcel: 'base-poblacion.xlsx',
    texto: 'documento-por-departamento',
  },
  'informalidad-laboral': {
    grafica: 'serie-ciudades',
    archivoExcel: 'base-informalidad.xlsx',
    texto: 'documento-unico',
    archivoTextoUnico: 'articulo-informalidad.docx',
    /* Títulos del documento único que van SIN paréntesis, con su código
       DANE (solo estos se aceptan a secas, para que un nombre de
       departamento suelto en el texto no abra secciones por error). */
    titulosDirectos: [
      { titulo: 'Bogotá', codigoDane: 11 },
      { titulo: 'Bogotá D.C.', codigoDane: 11 },
    ],
    /* Con este catálogo, los títulos "Ciudad (Departamento)" se validan
       por partida doble: la ciudad debe ser la capital del departamento. */
    ciudadPorDepartamento: CIUDAD_POR_DEPARTAMENTO,
  },
};

/* Configuración de respaldo para tendencias aún sin definición propia. */
const CONFIGURACION_POR_DEFECTO = {
  grafica: 'piramides',
  archivoExcel: 'base-poblacion.xlsx',
  texto: 'documento-por-departamento',
};

/** Configuración de contenido de una tendencia a partir de su slug. */
export function obtenerConfiguracionTendencia(slugTendencia) {
  return CONFIGURACION_TENDENCIAS[slugTendencia] ?? CONFIGURACION_POR_DEFECTO;
}
