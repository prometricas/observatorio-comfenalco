/**
 * ModuloPublicaciones — Sección "Publicaciones" del menú fijo (0.43.0).
 *
 * Catálogo de documentos (PDF) del Observatorio y de Comfenalco Antioquia
 * con lectura EN LÍNEA: al elegir una publicación, el PDF se abre en un
 * visor embebido (iframe con el visor del navegador) encima del catálogo,
 * sin obligar a descargarlo (petición del cliente). Se ofrece además
 * abrirlo en una pestaña nueva para quien prefiera el visor completo.
 *
 * Decisiones:
 * - Los PDF viven en `public/data/publicaciones/` y el catálogo en
 *   `src/data/publicaciones.js`: añadir una publicación = copiar el PDF,
 *   generar su portada y registrar una entrada (sin tocar este módulo).
 * - El iframe se monta solo cuando hay una publicación elegida (los PDF
 *   pesan; el e-book, 61 MB) y avisa del peso antes de abrirlo.
 * - Al abrir una publicación, la vista se desplaza al visor y enfoca su
 *   título (tabIndex -1) para lectores de pantalla y teclado.
 * - La franja del inicio puede pedir que se abra una publicación concreta
 *   (`consumirPublicacionSolicitada`).
 */
import { useEffect, useRef, useState } from 'react';
import {
  PUBLICACIONES,
  consumirPublicacionSolicitada,
  obtenerPublicacion,
  rutaPublicacion,
} from '../../data/publicaciones.js';
import './modulo-publicaciones.css';

const formatearPeso = (mb) => (mb >= 10 ? `${Math.round(mb)} MB` : `${mb.toLocaleString('es-CO')} MB`);

function ModuloPublicaciones() {
  const [idAbierta, setIdAbierta] = useState(() => consumirPublicacionSolicitada());
  const tituloVisorRef = useRef(null);
  const abierta = obtenerPublicacion(idAbierta);

  /* Con una publicación abierta, lleva la vista al visor y enfoca su
     título. La App ya desplazó la página al tope al navegar. */
  useEffect(() => {
    if (!abierta || !tituloVisorRef.current) return;
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    tituloVisorRef.current.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' });
    tituloVisorRef.current.focus({ preventScroll: true });
  }, [abierta]);

  return (
    <section className="modulo-publicaciones" aria-labelledby="titulo-publicaciones">
      <header className="modulo-publicaciones__encabezado">
        <h1 id="titulo-publicaciones" className="modulo-publicaciones__titulo">
          Publicaciones
        </h1>
        <p className="modulo-publicaciones__intro">
          Documentos del Observatorio y de Comfenalco Antioquia para leer en línea. Elija una
          publicación y recórrala aquí mismo; si prefiere el visor completo de su navegador,
          ábrala en una pestaña nueva.
        </p>
      </header>

      {abierta && (
        <section className="modulo-publicaciones__visor" aria-label={`Lectura de ${abierta.titulo}`}>
          <div className="modulo-publicaciones__visor-cabecera">
            <div>
              <p className="modulo-publicaciones__visor-tipo">{abierta.tipo}</p>
              <h2 ref={tituloVisorRef} tabIndex={-1} className="modulo-publicaciones__visor-titulo">
                {abierta.titulo}
              </h2>
              <p className="modulo-publicaciones__visor-meta">
                {abierta.entidad} · {abierta.paginas} páginas · {formatearPeso(abierta.tamanoMb)}
              </p>
            </div>
            <div className="modulo-publicaciones__visor-acciones">
              <a
                className="modulo-publicaciones__accion modulo-publicaciones__accion--secundaria"
                href={rutaPublicacion(abierta.archivo)}
                target="_blank"
                rel="noreferrer"
              >
                Abrir en una pestaña nueva
              </a>
              <button
                type="button"
                className="modulo-publicaciones__accion"
                onClick={() => setIdAbierta(null)}
              >
                Cerrar el visor
              </button>
            </div>
          </div>

          {/* Visor del navegador; #view=FitH ajusta al ancho al abrir */}
          <iframe
            key={abierta.id}
            className="modulo-publicaciones__documento"
            src={`${rutaPublicacion(abierta.archivo)}#view=FitH`}
            title={`Documento: ${abierta.titulo}`}
          />
          <p className="modulo-publicaciones__nota">
            El documento pesa {formatearPeso(abierta.tamanoMb)} y puede tardar unos segundos en
            mostrarse. Si su navegador no lo presenta aquí, use «Abrir en una pestaña nueva».
          </p>
        </section>
      )}

      <h2 className="modulo-publicaciones__subtitulo">Catálogo</h2>
      <ul className="modulo-publicaciones__lista">
        {PUBLICACIONES.map((publicacion) => {
          const esAbierta = publicacion.id === idAbierta;
          return (
            <li
              key={publicacion.id}
              className={`modulo-publicaciones__tarjeta${esAbierta ? ' modulo-publicaciones__tarjeta--abierta' : ''}`}
            >
              <img
                className="modulo-publicaciones__portada"
                src={publicacion.portada}
                alt={`Portada: ${publicacion.titulo}`}
                width={publicacion.portadaAncho}
                height={publicacion.portadaAlto}
                loading="lazy"
                decoding="async"
              />
              <div className="modulo-publicaciones__cuerpo">
                <p className="modulo-publicaciones__tipo">{publicacion.tipo}</p>
                <h3 className="modulo-publicaciones__tarjeta-titulo">{publicacion.titulo}</h3>
                <p className="modulo-publicaciones__entidad">{publicacion.entidad}</p>
                <p className="modulo-publicaciones__descripcion">{publicacion.descripcion}</p>
                <p className="modulo-publicaciones__meta">
                  {publicacion.paginas} páginas · PDF de {formatearPeso(publicacion.tamanoMb)}
                </p>
                <button
                  type="button"
                  className="modulo-publicaciones__leer"
                  aria-pressed={esAbierta}
                  onClick={() => setIdAbierta(publicacion.id)}
                >
                  {esAbierta ? 'Abierta en el visor' : 'Leer en línea'}
                  <span className="modulo-publicaciones__leer-flecha" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ModuloPublicaciones;
