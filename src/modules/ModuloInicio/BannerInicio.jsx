/**
 * BannerInicio — Franja de bienvenida con carrusel de fotografías de fondo.
 *
 * Patrón del portal institucional de Comfenalco Antioquia (petición del
 * cliente 2026-09-21): fotografías de los servicios en las subregiones,
 * oscurecidas con un velo verde para que el título y el lema (que llegan
 * como `children` desde ModuloInicio) conserven contraste AA, rotando
 * solas cada INTERVALO_MS con fundido y con flechas y puntos para cambiar
 * a mano.
 *
 * Decisiones:
 * - Las seis fotos se importan del código (hash + caché inmutable) en WebP
 *   a 1920×1080 más una variante de 960 px para pantallas angostas
 *   (srcset). La primera carga con prioridad alta; las demás, perezosas.
 * - Todas las fotos están apiladas en el DOM y solo cambia la opacidad de
 *   la activa: el fundido no necesita JavaScript ni provoca parpadeos.
 * - La rotación automática se detiene al pasar el puntero, mientras hay
 *   foco dentro del banner, con la pestaña oculta y para quien pide
 *   movimiento reducido (en ese caso tampoco hay fundido; las flechas
 *   siguen funcionando). Cada cambio manual reinicia el temporizador.
 * - Accesibilidad: región con `aria-roledescription="carrusel"`, fotos
 *   decorativas (alt vacío: el lugar se anuncia en el pie de foto, que es
 *   una región viva), flechas y puntos de 44 px con nombre accesible y
 *   flechas del teclado dentro de los controles.
 */
import { useEffect, useState } from 'react';
import foto01 from '../../assets/inicio/banner-01-tamarindos.webp';
import foto01Movil from '../../assets/inicio/banner-01-tamarindos-movil.webp';
import foto02 from '../../assets/inicio/banner-02-estimulacion-temprana.webp';
import foto02Movil from '../../assets/inicio/banner-02-estimulacion-temprana-movil.webp';
import foto03 from '../../assets/inicio/banner-03-parque-caucasia.webp';
import foto03Movil from '../../assets/inicio/banner-03-parque-caucasia-movil.webp';
import foto04 from '../../assets/inicio/banner-04-patinaje.webp';
import foto04Movil from '../../assets/inicio/banner-04-patinaje-movil.webp';
import foto05 from '../../assets/inicio/banner-05-paseo-caucasia.webp';
import foto05Movil from '../../assets/inicio/banner-05-paseo-caucasia-movil.webp';
import foto06 from '../../assets/inicio/banner-06-camping-tamarindos.webp';
import foto06Movil from '../../assets/inicio/banner-06-camping-tamarindos-movil.webp';
import './banner-inicio.css';

/* Fotografías del banner (biblioteca del cliente, 2026-09). Para cambiar
   una foto: reemplazar el par de archivos WebP y ajustar el lugar. */
const FOTOS_BANNER = [
  {
    id: 'tamarindos',
    imagen: foto01,
    imagenMovil: foto01Movil,
    lugar: 'Parque Los Tamarindos, Occidente antioqueño',
  },
  {
    id: 'estimulacion-temprana',
    imagen: foto02,
    imagenMovil: foto02Movil,
    lugar: 'Estimulación temprana, Puerto Berrío (Magdalena Medio)',
  },
  {
    id: 'parque-caucasia',
    imagen: foto03,
    imagenMovil: foto03Movil,
    lugar: 'Parque recreativo de Caucasia, Bajo Cauca',
  },
  {
    id: 'patinaje',
    imagen: foto04,
    imagenMovil: foto04Movil,
    lugar: 'Escuela de patinaje, Bajo Cauca',
  },
  {
    id: 'paseo-caucasia',
    imagen: foto05,
    imagenMovil: foto05Movil,
    lugar: 'Parque recreativo de Caucasia, Bajo Cauca',
  },
  {
    id: 'camping-tamarindos',
    imagen: foto06,
    imagenMovil: foto06Movil,
    lugar: 'Zona de camping del Parque Los Tamarindos, Occidente antioqueño',
  },
];

/** Tiempo que permanece cada fotografía antes de pasar a la siguiente. */
const INTERVALO_MS = 7000;

const CONSULTA_MOVIMIENTO_REDUCIDO = '(prefers-reduced-motion: reduce)';

function BannerInicio({ children }) {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [movimientoReducido, setMovimientoReducido] = useState(false);

  /* Quien pide movimiento reducido no recibe rotación automática. */
  useEffect(() => {
    const consulta = window.matchMedia(CONSULTA_MOVIMIENTO_REDUCIDO);
    const actualizar = () => setMovimientoReducido(consulta.matches);
    actualizar();
    consulta.addEventListener('change', actualizar);
    return () => consulta.removeEventListener('change', actualizar);
  }, []);

  /* Rotación automática. `indice` va en las dependencias a propósito: así
     cada cambio (manual o automático) reinicia el temporizador y una foto
     recién elegida a mano no se reemplaza a los pocos instantes. */
  useEffect(() => {
    if (pausado || movimientoReducido) return undefined;
    const temporizador = window.setInterval(() => {
      if (document.visibilityState === 'hidden') return;
      setIndice((actual) => (actual + 1) % FOTOS_BANNER.length);
    }, INTERVALO_MS);
    return () => window.clearInterval(temporizador);
  }, [pausado, movimientoReducido, indice]);

  const irA = (nuevo) => setIndice((nuevo + FOTOS_BANNER.length) % FOTOS_BANNER.length);
  const anterior = () => irA(indice - 1);
  const siguiente = () => irA(indice + 1);

  /* Flechas del teclado sobre los controles (además de los botones). */
  const manejarTecla = (evento) => {
    if (evento.key === 'ArrowLeft') {
      evento.preventDefault();
      anterior();
    } else if (evento.key === 'ArrowRight') {
      evento.preventDefault();
      siguiente();
    }
  };

  /* Pausa mientras el foco está dentro del banner; se reanuda al salir. */
  const manejarSalidaFoco = (evento) => {
    if (!evento.currentTarget.contains(evento.relatedTarget)) setPausado(false);
  };

  const fotoActiva = FOTOS_BANNER[indice];

  return (
    <section
      className="banner-inicio"
      aria-roledescription="carrusel"
      aria-label="Fotografías de los servicios de Comfenalco Antioquia"
      onPointerEnter={() => setPausado(true)}
      onPointerLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={manejarSalidaFoco}
    >
      {/* Fotografías apiladas; solo la activa es visible */}
      <div className="banner-inicio__fotos">
        {FOTOS_BANNER.map((foto, i) => (
          <img
            key={foto.id}
            className={`banner-inicio__foto${i === indice ? ' banner-inicio__foto--activa' : ''}`}
            src={foto.imagen}
            srcSet={`${foto.imagenMovil} 960w, ${foto.imagen} 1920w`}
            sizes="100vw"
            alt=""
            width="1920"
            height="1080"
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : undefined}
            decoding="async"
            draggable={false}
          />
        ))}
      </div>
      {/* Velo verde: garantiza el contraste del texto sobre cualquier foto */}
      <div className="banner-inicio__velo" aria-hidden="true" />

      <div className="banner-inicio__contenido">{children}</div>

      <div className="banner-inicio__controles" onKeyDown={manejarTecla}>
        {/* Pie de foto: región viva que anuncia el cambio de fotografía */}
        <p className="banner-inicio__lugar" aria-live="polite" aria-atomic="true">
          <span className="oculto-accesible">
            Foto {indice + 1} de {FOTOS_BANNER.length}:{' '}
          </span>
          {fotoActiva.lugar}
        </p>

        <div className="banner-inicio__navegacion">
          <div className="banner-inicio__puntos">
            {FOTOS_BANNER.map((foto, i) => (
              <button
                key={foto.id}
                type="button"
                className={`banner-inicio__punto${i === indice ? ' banner-inicio__punto--activo' : ''}`}
                aria-label={`Foto ${i + 1}: ${foto.lugar}`}
                aria-current={i === indice ? 'true' : undefined}
                onClick={() => irA(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="banner-inicio__flecha"
            aria-label="Fotografía anterior"
            onClick={anterior}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="banner-inicio__flecha"
            aria-label="Fotografía siguiente"
            onClick={siguiente}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default BannerInicio;
