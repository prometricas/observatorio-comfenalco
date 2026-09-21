/**
 * BannerInicio — Franja de bienvenida con carrusel de fotografías de fondo.
 *
 * Patrón del portal institucional de Comfenalco Antioquia (petición del
 * cliente 2026-09-21): fotografías de los servicios en las subregiones,
 * oscurecidas con un velo verde para que el título y el lema (que llegan
 * como `children` desde ModuloInicio) conserven contraste AA, rotando
 * solas cada INTERVALO_MS con fundido y con flechas y puntos para cambiar
 * a mano. Esquinas inferiores redondeadas como el banner de Comfenalco.
 *
 * Decisiones:
 * - Las DOCE fotos (0.42.0: parques, biblioteca, agencia de empleo,
 *   hoteles, gimnasio, formación, estimulación temprana…) se importan del
 *   código (hash + caché inmutable) en WebP a 1920×1080 más una variante de
 *   960 px para pantallas angostas (srcset).
 * - Carga por VENTANA: solo se montan las fotos ya vistas y sus vecinas
 *   (la siguiente y la anterior), así la portada descarga tres fotos y no
 *   doce; la siguiente siempre está lista antes del fundido.
 * - Las fotos montadas van apiladas y solo cambia la opacidad de la
 *   activa: el fundido no necesita JavaScript ni provoca parpadeos.
 * - La rotación automática (0.44.0) corre SIEMPRE, también con
 *   `prefers-reduced-motion` (ahí solo se suprime el fundido: la foto cambia
 *   en seco). Antes la desactivaba y en Windows con "mostrar animaciones"
 *   apagado —que activa esa preferencia— el banner quedaba estático
 *   (reporte del cliente). Se detiene con el botón de pausa (el control
 *   explícito que pide WCAG 2.2.2), mientras un control del banner tiene
 *   foco de TECLADO (no al hacer clic con el ratón) y con la pestaña
 *   oculta; cada cambio manual reinicia el temporizador. Pasar el puntero
 *   ya no pausa: se percibía como "no cambia".
 * - Accesibilidad: región con `aria-roledescription="carrusel"`, fotos
 *   decorativas (alt vacío: el lugar se anuncia en el pie de foto, que es
 *   una región viva), botón de pausa/reanudación (aria-pressed), flechas y
 *   puntos de 44 px con nombre accesible y flechas del teclado dentro de
 *   los controles.
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
import foto05 from '../../assets/inicio/banner-05-acuaparque-ditaires.webp';
import foto05Movil from '../../assets/inicio/banner-05-acuaparque-ditaires-movil.webp';
import foto06 from '../../assets/inicio/banner-06-agencia-empleo-rionegro.webp';
import foto06Movil from '../../assets/inicio/banner-06-agencia-empleo-rionegro-movil.webp';
import foto07 from '../../assets/inicio/banner-07-recinto-quirama.webp';
import foto07Movil from '../../assets/inicio/banner-07-recinto-quirama-movil.webp';
import foto08 from '../../assets/inicio/banner-08-piedras-blancas.webp';
import foto08Movil from '../../assets/inicio/banner-08-piedras-blancas-movil.webp';
import foto09 from '../../assets/inicio/banner-09-lago-piedras-blancas.webp';
import foto09Movil from '../../assets/inicio/banner-09-lago-piedras-blancas-movil.webp';
import foto10 from '../../assets/inicio/banner-10-gimnasio-la-playa.webp';
import foto10Movil from '../../assets/inicio/banner-10-gimnasio-la-playa-movil.webp';
import foto11 from '../../assets/inicio/banner-11-biblioteca-la-playa.webp';
import foto11Movil from '../../assets/inicio/banner-11-biblioteca-la-playa-movil.webp';
import foto12 from '../../assets/inicio/banner-12-sede-educativa-girardot.webp';
import foto12Movil from '../../assets/inicio/banner-12-sede-educativa-girardot-movil.webp';
import './banner-inicio.css';

/* Fotografías del banner (biblioteca del cliente, 2026-09), ordenadas
   alternando temas (parques, cultura, empleo, familia, hoteles, deporte,
   formación). Para cambiar una foto: reemplazar el par de archivos WebP y
   ajustar el lugar. */
const FOTOS_BANNER = [
  {
    id: 'tamarindos',
    imagen: foto01,
    imagenMovil: foto01Movil,
    lugar: 'Parque Los Tamarindos, Occidente antioqueño',
  },
  {
    id: 'biblioteca-la-playa',
    imagen: foto11,
    imagenMovil: foto11Movil,
    lugar: 'Biblioteca Héctor González Mejía, sede La Playa (Medellín)',
  },
  {
    id: 'acuaparque-ditaires',
    imagen: foto05,
    imagenMovil: foto05Movil,
    lugar: 'Acuaparque Ditaires, Itagüí (Valle de Aburrá)',
  },
  {
    id: 'agencia-empleo-rionegro',
    imagen: foto06,
    imagenMovil: foto06Movil,
    lugar: 'Agencia de Gestión y Colocación de Empleo, Rionegro (Oriente)',
  },
  {
    id: 'estimulacion-temprana',
    imagen: foto02,
    imagenMovil: foto02Movil,
    lugar: 'Estimulación temprana, Puerto Berrío (Magdalena Medio)',
  },
  {
    id: 'recinto-quirama',
    imagen: foto07,
    imagenMovil: foto07Movil,
    lugar: 'Hotel Recinto Quirama, El Carmen de Viboral (Oriente)',
  },
  {
    id: 'patinaje',
    imagen: foto04,
    imagenMovil: foto04Movil,
    lugar: 'Escuela de patinaje, Bajo Cauca',
  },
  {
    id: 'gimnasio-la-playa',
    imagen: foto10,
    imagenMovil: foto10Movil,
    lugar: 'Gimnasio de la sede La Playa, Medellín',
  },
  {
    id: 'piedras-blancas',
    imagen: foto08,
    imagenMovil: foto08Movil,
    lugar: 'Hotel y Parque Ecológico Piedras Blancas, Guarne (Oriente)',
  },
  {
    id: 'sede-educativa-girardot',
    imagen: foto12,
    imagenMovil: foto12Movil,
    lugar: 'Formación para el trabajo, Sede Educativa Girardot (Medellín)',
  },
  {
    id: 'parque-caucasia',
    imagen: foto03,
    imagenMovil: foto03Movil,
    lugar: 'Parque recreativo de Caucasia, Bajo Cauca',
  },
  {
    id: 'lago-piedras-blancas',
    imagen: foto09,
    imagenMovil: foto09Movil,
    lugar: 'Lago del Parque Ecológico Piedras Blancas, Guarne (Oriente)',
  },
];

/** Tiempo que permanece cada fotografía antes de pasar a la siguiente
    (0.44.0: 4 s a pedido del cliente; el fundido dura 0,7 s). */
const INTERVALO_MS = 4000;

const TOTAL = FOTOS_BANNER.length;
const circular = (i) => ((i % TOTAL) + TOTAL) % TOTAL;

/* Estado del carrusel: foto activa + conjunto de fotos montadas en el DOM
   (las ya vistas y las dos vecinas de la activa, para que el siguiente
   fundido en cualquier sentido encuentre la imagen descargada). Van
   juntos para actualizarse en una sola transición de estado. */
const ESTADO_INICIAL = { indice: 0, montadas: new Set([0, 1, TOTAL - 1]) };

function moverA(estado, nuevo) {
  const indice = circular(nuevo);
  const montadas = new Set(estado.montadas);
  [indice, circular(indice + 1), circular(indice - 1)].forEach((i) => montadas.add(i));
  return { indice, montadas };
}

function BannerInicio({ children }) {
  const [{ indice, montadas }, setEstado] = useState(ESTADO_INICIAL);
  /* Pausa explícita (botón) y pausa mientras un control tiene foco de teclado */
  const [pausadoPorUsuario, setPausadoPorUsuario] = useState(false);
  const [pausadoPorFoco, setPausadoPorFoco] = useState(false);
  const pausado = pausadoPorUsuario || pausadoPorFoco;

  /* Rotación automática. `indice` va en las dependencias a propósito: así
     cada cambio (manual o automático) reinicia el temporizador y una foto
     recién elegida a mano no se reemplaza a los pocos instantes. */
  useEffect(() => {
    if (pausado) return undefined;
    const temporizador = window.setInterval(() => {
      if (document.visibilityState === 'hidden') return;
      setEstado((actual) => moverA(actual, actual.indice + 1));
    }, INTERVALO_MS);
    return () => window.clearInterval(temporizador);
  }, [pausado, indice]);

  const irA = (nuevo) => setEstado((actual) => moverA(actual, nuevo));
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

  /* Pausa solo con foco de TECLADO (:focus-visible): un clic de ratón en
     una flecha no debe dejar el banner detenido. Se reanuda al salir. */
  const manejarFoco = (evento) => {
    if (evento.target.matches(':focus-visible')) setPausadoPorFoco(true);
  };
  const manejarSalidaFoco = (evento) => {
    if (!evento.currentTarget.contains(evento.relatedTarget)) setPausadoPorFoco(false);
  };

  const fotoActiva = FOTOS_BANNER[indice];

  return (
    <section
      className="banner-inicio"
      aria-roledescription="carrusel"
      aria-label="Fotografías de los servicios de Comfenalco Antioquia"
      onFocus={manejarFoco}
      onBlur={manejarSalidaFoco}
    >
      {/* Fotografías apiladas (solo las montadas); la activa es la visible */}
      <div className="banner-inicio__fotos">
        {FOTOS_BANNER.map((foto, i) =>
          montadas.has(i) ? (
            <img
              key={foto.id}
              className={`banner-inicio__foto${i === indice ? ' banner-inicio__foto--activa' : ''}`}
              src={foto.imagen}
              srcSet={`${foto.imagenMovil} 960w, ${foto.imagen} 1920w`}
              sizes="100vw"
              alt=""
              width="1920"
              height="1080"
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding="async"
              draggable={false}
            />
          ) : null,
        )}
      </div>
      {/* Velo verde: garantiza el contraste del texto sobre cualquier foto */}
      <div className="banner-inicio__velo" aria-hidden="true" />

      <div className="banner-inicio__contenido">{children}</div>

      <div className="banner-inicio__controles" onKeyDown={manejarTecla}>
        {/* Pie de foto: región viva que anuncia el cambio de fotografía */}
        <p className="banner-inicio__lugar" aria-live="polite" aria-atomic="true">
          <span className="oculto-accesible">
            Foto {indice + 1} de {TOTAL}:{' '}
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
          <button
            type="button"
            className="banner-inicio__flecha banner-inicio__flecha--pausa"
            aria-label={pausadoPorUsuario ? 'Reanudar la rotación de fotos' : 'Pausar la rotación de fotos'}
            aria-pressed={pausadoPorUsuario}
            onClick={() => setPausadoPorUsuario((valor) => !valor)}
          >
            {pausadoPorUsuario ? (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                <path d="M8 5l11 7-11 7z" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default BannerInicio;
