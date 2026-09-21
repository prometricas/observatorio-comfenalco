/**
 * publicaciones.js — Catálogo de publicaciones del Observatorio.
 *
 * Cada publicación es un PDF en `public/data/publicaciones/<archivo>` (el
 * cliente puede añadir más archivos copiándolos ahí y registrándolos en
 * este catálogo) con su portada en WebP en `src/assets/publicaciones/`
 * (primera página del PDF a 480 px de ancho; se genera con el script del
 * scratchpad publicaciones/portadas.mjs). El portal las muestra en la
 * franja "Publicaciones" del inicio y en el módulo Publicaciones, donde el
 * PDF se lee EN LÍNEA (visor del navegador dentro de un iframe) sin
 * obligar a descargarlo.
 *
 * Orden del catálogo = orden de aparición. Campos:
 *   id          identificador estable (kebab-case)
 *   titulo      título de la publicación
 *   tipo        rótulo corto (E-book, Cartilla, Informe…)
 *   entidad     autor institucional
 *   descripcion resumen de una o dos frases
 *   archivo     nombre del PDF dentro de public/data/publicaciones/
 *   paginas     número de páginas (informativo)
 *   tamanoMb    peso aproximado (aviso al usuario antes de abrirlo)
 *   portada     import de la portada WebP + sus dimensiones intrínsecas
 */
import portadaEbook from '../assets/publicaciones/portada-ebook-inn-comfe.webp';
import portadaCartilla from '../assets/publicaciones/portada-cartilla-memorias-innovacion-social.webp';

export const PUBLICACIONES = [
  {
    id: 'ebook-herramientas-para-innovar',
    titulo: 'E-book de herramientas para innovar',
    tipo: 'E-book',
    entidad: 'Laboratorio Innóvate · Comfenalco Antioquia',
    descripcion:
      'Caja de herramientas para innovar en el día a día: técnicas para observar, idear, decidir y estructurar el trabajo con creatividad e inteligencia artificial como aliadas.',
    archivo: 'ebook-inn-comfe.pdf',
    paginas: 53,
    tamanoMb: 61,
    portada: portadaEbook,
    portadaAncho: 480,
    portadaAlto: 672,
  },
  {
    id: 'memorias-de-innovacion-social',
    titulo: 'Memorias de innovación social',
    tipo: 'Cartilla',
    entidad: 'Laboratorio Innóvate · Comfenalco Antioquia',
    descripcion:
      'Cartilla que recoge las experiencias y aprendizajes de innovación social del Laboratorio Innóvate de Comfenalco Antioquia.',
    archivo: 'cartilla-memorias-innovacion-social.pdf',
    paginas: 20,
    tamanoMb: 5.3,
    portada: portadaCartilla,
    portadaAncho: 480,
    portadaAlto: 765,
  },
];

/** Ruta pública del PDF de una publicación (respeta la base relativa). */
export function rutaPublicacion(archivo) {
  return `${import.meta.env.BASE_URL}data/publicaciones/${archivo}`;
}

/** Publicación por id, o null. */
export function obtenerPublicacion(id) {
  return PUBLICACIONES.find((publicacion) => publicacion.id === id) ?? null;
}

/* Entrega entre módulos: la franja del inicio anota qué publicación se
   pidió y el módulo Publicaciones la abre al montarse. La navegación del
   portal solo transporta el id de sección, por eso este puente mínimo. */
let publicacionSolicitada = null;

export function solicitarPublicacion(id) {
  publicacionSolicitada = id;
}

export function consumirPublicacionSolicitada() {
  const id = publicacionSolicitada;
  publicacionSolicitada = null;
  return id;
}
