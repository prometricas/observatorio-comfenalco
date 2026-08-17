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
    texto: 'documento-unico',
    archivoTextoUnico: 'articulo-envejecimiento.docx',
    /* En este documento cada sección se titula con el nombre del
       departamento a secas ("Antioquia", "Boyacá"…): el detector acepta
       los 33 nombres del catálogo como títulos directos. */
    titulosDepartamentoASecas: true,
    /* Nombres del documento que difieren del catálogo del portal. */
    titulosDirectos: [{ titulo: 'Archipiélago de San Andrés', codigoDane: 88 }],
    /* El texto de cada sección sigue el formato de artículo del portal:
       título propio, línea de fuente y referencias con enlaces. */
    formatoArticulo: true,
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
    /* Cada sección del artículo sigue la plantilla de artículo del
       portal: título propio y bloque de referencias (mismo formato de
       Envejecimiento y Gasto social). */
    formatoArticulo: true,
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
