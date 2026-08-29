/**
 * pestel-tendencias.js — Catálogo del panal PESTEL del eje Tendencias.
 *
 * Las seis dimensiones del marco PESTEL (Política, Económica, Social,
 * Tecnológica, Ecológica y Legal) con las tendencias del portal que cada
 * una agrupa, según la asignación del cliente (2026-08-29). El panal de la
 * portada del eje pinta un hexágono por dimensión y el panel de accesos
 * directos navega a la sección de cada tendencia por su id del catálogo
 * de navegación.
 *
 * Colores: cada dimensión usa un color del manual de marca para el borde
 * y el relleno del hexágono (decorativos) y una variante oscurecida al
 * mínimo —mismo tono, menos luminosidad— para el TEXTO, que sí debe
 * cumplir el contraste AA (4,5:1) sobre blanco; el color de marca
 * original queda anotado junto a cada ajuste. La dimensión Política usa
 * el verde oscuro de marca, que cumple AA tal cual (8,58:1).
 */
import { TENDENCIAS } from './navegacion.js';

/* Etiqueta legible de cada tendencia, por su id de navegación. */
const ETIQUETAS_TENDENCIAS = new Map(TENDENCIAS.map((t) => [t.id, t.etiqueta]));

/**
 * Dimensiones en el orden del acrónimo PESTEL (también es el orden de
 * tabulación del panal). `tendencias` lista ids del catálogo de
 * navegación; `color` es el acento decorativo y `colorTexto` la variante
 * AA para textos sobre blanco.
 */
export const DIMENSIONES_PESTEL = [
  {
    id: 'politica',
    nombre: 'Política',
    color: '#005744',
    colorTexto: '#005744',
    descripcion:
      'Las decisiones y los programas públicos que orientan la inversión en el bienestar de la población.',
    tendencias: ['tendencias-gasto-social'],
  },
  {
    id: 'economica',
    nombre: 'Económica',
    color: '#f3bc52',
    colorTexto: '#9e6c0b' /* marca: #f3bc52 */,
    descripcion:
      'Las dinámicas del empleo, el ingreso y los modelos de producción y consumo de la región.',
    tendencias: ['tendencias-informalidad-laboral', 'tendencias-economia-circular'],
  },
  {
    id: 'social',
    nombre: 'Social',
    color: '#ed7a3f',
    colorTexto: '#c85013' /* marca: #ed7a3f */,
    descripcion:
      'Las transformaciones demográficas y de los hogares que redefinen las necesidades de bienestar.',
    tendencias: ['tendencias-envejecimiento', 'tendencias-estructura-familiar'],
  },
  {
    id: 'tecnologica',
    nombre: 'Tecnológica',
    color: '#3399a3',
    colorTexto: '#2b818a' /* marca: #3399a3 */,
    descripcion:
      'Las tecnologías que transforman la manera de diseñar y prestar los servicios a las personas.',
    tendencias: ['tendencias-hiper-personalizacion-de-servicios'],
  },
  {
    id: 'ecologica',
    nombre: 'Ecológica',
    color: '#58b250',
    colorTexto: '#41853b' /* marca: #58b250 */,
    descripcion:
      'Las presiones ambientales y las respuestas regulatorias para la sostenibilidad del territorio.',
    tendencias: ['tendencias-regulaciones-ambientales'],
  },
  {
    id: 'legal',
    nombre: 'Legal',
    color: '#5eb2ae',
    colorTexto: '#3e817e' /* marca: #5eb2ae */,
    descripcion:
      'El marco normativo que regula el trabajo y la protección social de los trabajadores.',
    tendencias: ['tendencias-normatividad-laboral'],
  },
];

/** Etiqueta legible de una tendencia a partir de su id de navegación. */
export function etiquetaTendencia(idTendencia) {
  return ETIQUETAS_TENDENCIAS.get(idTendencia) ?? idTendencia;
}
