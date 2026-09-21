/**
 * PublicacionesInicio — Franja "Publicaciones" de la portada (0.43.0).
 *
 * Patrón del observatorio del Ceplan (petición del cliente): barra de
 * título con icono, carrusel horizontal de portadas con su título y
 * flechas para desplazarlo, y enlace "Ver más publicaciones" al módulo.
 * Toma las publicaciones del catálogo `src/data/publicaciones.js`; al
 * pulsar una portada se solicita esa publicación y se navega al módulo,
 * que la abre en su visor.
 *
 * El carrusel es una lista con desplazamiento nativo (scroll-snap): las
 * flechas solo llaman a scrollBy, así que funciona igual con rueda, con
 * el dedo y con teclado (las tarjetas son botones normales, con foco).
 */
import { useRef } from 'react';
import { PUBLICACIONES, solicitarPublicacion } from '../../data/publicaciones.js';
import './publicaciones-inicio.css';

function PublicacionesInicio({ onNavegar }) {
  const listaRef = useRef(null);

  /* Desplaza el carrusel el ancho de una tarjeta (con su separación) */
  const desplazar = (sentido) => {
    const lista = listaRef.current;
    if (!lista) return;
    const tarjeta = lista.querySelector('.publicaciones-inicio__elemento');
    const paso = tarjeta ? tarjeta.getBoundingClientRect().width + 24 : lista.clientWidth * 0.8;
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    lista.scrollBy({ left: sentido * paso, behavior: reducido ? 'auto' : 'smooth' });
  };

  const abrir = (id) => {
    solicitarPublicacion(id);
    onNavegar('publicaciones');
  };

  return (
    <section className="publicaciones-inicio" aria-labelledby="titulo-publicaciones-inicio">
      <div className="publicaciones-inicio__barra">
        <h2 id="titulo-publicaciones-inicio" className="publicaciones-inicio__titulo">
          <svg
            className="publicaciones-inicio__icono"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M4 10v4a1 1 0 0 0 1 1h3l5 4V5L8 9H5a1 1 0 0 0-1 1zM8 15l1 5h3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M16 9a3 3 0 0 1 0 6M18.5 6.5a7 7 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Publicaciones
        </h2>
      </div>

      <div className="publicaciones-inicio__carrusel">
        <button
          type="button"
          className="publicaciones-inicio__flecha publicaciones-inicio__flecha--anterior"
          aria-label="Publicaciones anteriores"
          onClick={() => desplazar(-1)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <ul ref={listaRef} className="publicaciones-inicio__lista">
          {PUBLICACIONES.map((publicacion) => (
            <li key={publicacion.id} className="publicaciones-inicio__elemento">
              <button
                type="button"
                className="publicaciones-inicio__tarjeta"
                onClick={() => abrir(publicacion.id)}
              >
                <span className="publicaciones-inicio__marco">
                  <img
                    className="publicaciones-inicio__portada"
                    src={publicacion.portada}
                    alt=""
                    width={publicacion.portadaAncho}
                    height={publicacion.portadaAlto}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="publicaciones-inicio__nombre">{publicacion.titulo}</span>
                <span className="publicaciones-inicio__tipo">{publicacion.tipo}</span>
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="publicaciones-inicio__flecha publicaciones-inicio__flecha--siguiente"
          aria-label="Publicaciones siguientes"
          onClick={() => desplazar(1)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <p className="publicaciones-inicio__mas">
        <button
          type="button"
          className="publicaciones-inicio__enlace"
          onClick={() => onNavegar('publicaciones')}
        >
          Ver más publicaciones
          <span aria-hidden="true"> →</span>
        </button>
      </p>
    </section>
  );
}

export default PublicacionesInicio;
