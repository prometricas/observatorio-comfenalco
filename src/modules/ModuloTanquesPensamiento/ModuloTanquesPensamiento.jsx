/**
 * ModuloTanquesPensamiento — Sección "Tanques de pensamiento" del menú fijo.
 *
 * Crónica de los espacios (talleres) del Tanque de Pensamiento
 * Prospectivo, con contenido FIJO en el código (Word del cliente,
 * transcripción literal). A diferencia de los artículos, el contenido es
 * una serie de eventos con estructura repetida, así que se compone como
 * CRONOLOGÍA de tarjetas (diseño aprobado por el cliente): espina
 * vertical con insignia numerada por espacio y, dentro de cada tarjeta,
 * la fecha, las fotografías del taller como ancla visual, el objetivo,
 * los temas abordados y los cuestionamientos claves como bloques de
 * pregunta destacados (una versión con estas secciones en acordeón se
 * probó y se REVIRTIÓ el 2026-08-29 a pedido del usuario). Para moverse
 * entre espacios, una barra PEGAJOSA de píldoras "Espacio N" bajo la
 * introducción desplaza a cada tarjeta descontando la cabecera fija y
 * enfoca su título (patrón de la tabla de contenido); la píldora del
 * espacio a la vista se marca activa. Las 5 fotografías van como WebP
 * calidad 82 con carga perezosa.
 *
 * Dos temas del Espacio 2 ENLAZAN a sus secciones vivas del portal
 * (Benchmarking y Factores de cambio) mediante la navegación por estado
 * interno (prop onNavegar, como las tarjetas del inicio).
 *
 * Ajustes de composición documentados: las etiquetas estructurales del
 * Word ("Fecha de desarrollo", "Fotografías") se convierten en la
 * propia interfaz (la fecha va en la insignia y las fotos se presentan
 * solas al inicio de la tarjeta); el objetivo del Espacio 2 viene en
 * negrita accidental completa y se compone en peso normal; y los
 * estilos de viñeta mezclados del documento se uniforman en listas.
 * Erratas transcritas tal cual (avisadas al cliente): "las realidades
 * moderna", "¿Porque se caracterizarán?" y el "Se realizó se realizó"
 * del Espacio 3.
 *
 * Cambios del contenido = editar este código y recompilar. Un espacio
 * nuevo = agregar una entrada a ESPACIOS (y sus fotos en assets).
 */
import { useEffect, useRef, useState } from 'react';
import './modulo-tanques-pensamiento.css';

import foto01 from '../../assets/tanques-pensamiento/foto-01.webp';
import foto02 from '../../assets/tanques-pensamiento/foto-02.webp';
import foto03 from '../../assets/tanques-pensamiento/foto-03.webp';
import foto04 from '../../assets/tanques-pensamiento/foto-04.webp';
import foto05 from '../../assets/tanques-pensamiento/foto-05.webp';

/* Catálogo de los espacios desarrollados, en orden cronológico. Los
   campos admiten JSX para conservar énfasis y enlaces del documento. */
const ESPACIOS = [
  {
    numero: 1,
    fecha: '24 de abril de 2026',
    fotos: [
      {
        imagen: foto01,
        alt: 'Grupo de expertos del primer taller prospectivo reunido en un salón de Comfenalco mientras el facilitador expone de pie',
      },
      {
        imagen: foto02,
        alt: 'Participantes del primer taller atendiendo la presentación "La Prospectiva Estratégica en Comfenalco"',
      },
    ],
    objetivo: [
      'Con el fin de dar inicio al proceso de realizar el análisis estructural se llevó a cabo el primer espacio de pensamiento participativo de prospectiva, con la participación de 14 expertos internos, donde el espacio de pensamiento, permitió reorientar el foco del observatorio prospectivo, pasando de la observación netamente de la compensación familiar a abordar el tema del bienestar integral como un ecosistema integrado centrado en el ser humano y su ciclo vital.',
    ],
    temasIntro:
      'Se desarrolló un espacio de análisis y conversación enfocado en la transformación de Comfenalco Antioquia (Taller prospectivo número 1); en el cual el propósito central fue trazar la ruta para transitar hacia un ecosistema integrado, centrado en el ser humano y adaptado a las realidades moderna, por lo que el abordaje estratégico priorizó cinco ejes:',
    temas: [
      { texto: 'Hitos Históricos y Cimientos' },
      { texto: 'Redefinición del Bienestar' },
      { texto: 'Desafíos Estratégicos y Sostenibilidad' },
      { texto: 'Futuro, Tecnología y Nuevas Realidades' },
      { texto: 'Metodología para la Acción (Prospectiva)' },
    ],
    preguntasIntro: 'Se abordaron algunas preguntas como:',
    preguntas: [
      '¿Qué hechos del pasado/presente destacan como grandes elementos estructurales? y ¿Como se expresan hoy en la consolidación del bienestar?',
      '¿Qué tendencias impactarán el bienestar? Y ¿Porque se caracterizarán?',
    ],
  },
  {
    numero: 2,
    fecha: '01 de junio de 2026',
    fotos: [
      {
        imagen: foto03,
        alt: 'Expertos del segundo taller trabajando en grupos durante el ejercicio de análisis estructural',
      },
      {
        imagen: foto04,
        alt: 'Participantes del segundo taller calificando las relaciones entre factores de cambio',
      },
    ],
    objetivo: [
      'En este espacio se desarrolló el ejercicio de análisis estructural, mediante la metodología MICMAC, que permitió identificar los factores de cambio más relevantes, evaluar sus interrelaciones, reconocer las variables estratégicas del sistema y definir prioridades y líneas de acción para la construcción de escenarios prospectivos; es así que este proceso fortalece la capacidad del Observatorio para generar conocimiento estratégico y apoyar la formulación de decisiones con visión de largo plazo.',
    ],
    temasIntro:
      'Con el objetivo de validar la estructura prospectiva mediante análisis estructural y avanzar en la implementación técnica del Observatorio, se realizó el espacio de pensamiento -Taller del Observatorio Prospectivo de Comfenalco Antioquia número 2-, con el grupo de expertos internos de la caja de compensación, donde se llevó a cabo el análisis estructural con un total de 23 participantes y se abordaron temas como:',
    temas: [
      { texto: 'Resultados del primer ejercicio' },
      { texto: 'Concepción del bienestar – Benchmarking', seccion: 'benchmarking' },
      { texto: 'Factores de cambio', seccion: 'factores-de-cambio' },
      {
        texto:
          'Taller análisis estructural – MICMAC; donde se reciben las calificaciones realizadas de los participantes.',
      },
    ],
    preguntasIntro: 'Se abordaron algunas preguntas como:',
    preguntas: [
      '"Cuál es el nivel de influencia del factor de la fila analizado con respecto al factor de la columna para el Bienestar Humano Integral generado por Comfenalco Antioquia".',
    ],
  },
  {
    numero: 3,
    fecha: '15 de julio de 2026',
    fotos: [
      {
        imagen: foto05,
        alt: 'Expertos del tercer taller construyendo escenarios prospectivos del bienestar en el salón de Comfenalco',
      },
    ],
    objetivo: [
      <>
        En el tercer espacio de pensamiento se desarrolló el ejercicio de construcción de
        escenarios prospectivos mediante la metodología de los <strong>Ejes de Schwartz</strong>,
        con el propósito de transformar los resultados del análisis estructural en imágenes de
        futuro que permitieran explorar diferentes trayectorias posibles para el bienestar en
        Comfenalco Antioquia.
      </>,
      'Este ejercicio fortaleció la capacidad institucional para anticipar escenarios alternativos, comprender las implicaciones estratégicas de las principales incertidumbres y orientar la evolución de las líneas estratégicas del Observatorio hacia una visión de largo plazo, soportada en la inteligencia colectiva y la gobernanza anticipatoria.',
    ],
    temasIntro: [
      'Se realizó se realizó el espacio de pensamiento - Tercer Taller del Observatorio Prospectivo del Bienestar-, en el que participaron 21 expertos institucionales para desarrollar un ejercicio colaborativo de prospectiva orientado a interpretar las principales incertidumbres estratégicas y proyectar posibles configuraciones del bienestar hacia el largo plazo.',
      'Durante el espacio se abordaron los siguientes temas:',
    ],
    temas: [
      { texto: 'Socialización de los resultados del análisis estructural – MICMAC' },
      { texto: 'Socialización de los resultados del mapeo de actores -MACTOR' },
      { texto: 'Fundamentos conceptuales de la construcción de escenarios prospectivos.' },
      { texto: 'Eventos de futuro y su papel en la anticipación estratégica.' },
      {
        texto:
          'Definición de los ejes de Schwartz a partir de las principales incertidumbres del sistema.',
      },
      { texto: 'Construcción de escenarios prospectivos del bienestar.' },
      { texto: 'Evolución de las líneas estratégicas bajo cada escenario.' },
      {
        texto:
          'Identificación de acciones estratégicas, actores, temporalidades y programas necesarios para materializar los escenarios deseables.',
      },
      {
        texto:
          'Reflexión sobre la transición del Observatorio hacia un modelo de inteligencia estratégica para el bienestar.',
      },
    ],
    preguntasIntro:
      'Durante el desarrollo del taller se promovió la reflexión colectiva alrededor de preguntas orientadoras como:',
    preguntas: [
      '¿Cuáles son las incertidumbres críticas que definirán la evolución del bienestar en las próximas décadas?',
      '¿Qué eventos de futuro podrían transformar el sistema de bienestar?',
      '¿Qué escenarios plausibles emergen al combinar las principales incertidumbres estratégicas mediante los Ejes de Schwartz?',
      '¿Cómo deberían evolucionar las líneas estratégicas del Observatorio para responder a cada escenario?',
      '¿Qué actores, acciones estratégicas y programas serán determinantes para construir el escenario de bienestar deseado hacia el 2050?',
    ],
  },
];

/* Tarjeta de un espacio de pensamiento dentro de la cronología. */
function TarjetaEspacio({ espacio, onNavegar }) {
  return (
    <li className="modulo-tanques-pensamiento__hito">
      {/* Insignia numerada sobre la espina de la cronología */}
      <span className="modulo-tanques-pensamiento__insignia" aria-hidden="true">
        {espacio.numero}
      </span>

      <article
        className="modulo-tanques-pensamiento__tarjeta"
        aria-labelledby={`tanques-espacio-${espacio.numero}`}
      >
        <header className="modulo-tanques-pensamiento__cabecera-tarjeta">
          {/* tabIndex -1: recibe el foco al llegar desde la barra de
              navegación entre espacios */}
          <h2
            id={`tanques-espacio-${espacio.numero}`}
            className="modulo-tanques-pensamiento__nombre-espacio"
            tabIndex={-1}
          >
            Espacio {espacio.numero}
          </h2>
          <p className="modulo-tanques-pensamiento__fecha">{espacio.fecha}</p>
        </header>

        {/* Fotografías del taller: el ancla visual de la tarjeta */}
        <div
          className={`modulo-tanques-pensamiento__fotos${
            espacio.fotos.length > 1 ? ' modulo-tanques-pensamiento__fotos--par' : ''
          }`}
        >
          {espacio.fotos.map((foto) => (
            <img
              key={foto.imagen}
              className="modulo-tanques-pensamiento__foto"
              src={foto.imagen}
              alt={foto.alt}
              loading="lazy"
            />
          ))}
        </div>

        <h3 className="modulo-tanques-pensamiento__subtitulo-tarjeta">
          Objetivo y Contribución al fortalecimiento institucional
        </h3>
        {espacio.objetivo.map((parrafo, indice) => (
          /* El catálogo es fijo: la posición identifica al párrafo */
          <p
            key={`objetivo-${espacio.numero}-${indice}`}
            className="modulo-tanques-pensamiento__parrafo"
          >
            {parrafo}
          </p>
        ))}

        <h3 className="modulo-tanques-pensamiento__subtitulo-tarjeta">Temas abordados</h3>
        {(Array.isArray(espacio.temasIntro) ? espacio.temasIntro : [espacio.temasIntro]).map(
          (parrafo) => (
            <p key={parrafo} className="modulo-tanques-pensamiento__parrafo">
              {parrafo}
            </p>
          ),
        )}
        <ul className="modulo-tanques-pensamiento__temas">
          {espacio.temas.map((tema) => (
            <li key={tema.texto} className="modulo-tanques-pensamiento__tema">
              {tema.seccion ? (
                /* Tema con sección viva en el portal: navega a ella */
                <button
                  type="button"
                  className="modulo-tanques-pensamiento__tema-enlace"
                  onClick={() => onNavegar(tema.seccion)}
                >
                  {tema.texto}
                </button>
              ) : (
                tema.texto
              )}
            </li>
          ))}
        </ul>

        <h3 className="modulo-tanques-pensamiento__subtitulo-tarjeta">Cuestionamientos claves</h3>
        <p className="modulo-tanques-pensamiento__parrafo">{espacio.preguntasIntro}</p>
        <ul className="modulo-tanques-pensamiento__preguntas">
          {espacio.preguntas.map((pregunta) => (
            <li key={pregunta} className="modulo-tanques-pensamiento__pregunta">
              {pregunta}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}

function ModuloTanquesPensamiento({ onNavegar }) {
  const raizRef = useRef(null);
  const barraRef = useRef(null);

  /* Espacio a la vista, para marcar su píldora en la barra. */
  const [espacioActivo, setEspacioActivo] = useState(ESPACIOS[0].numero);

  /* Altura real de la cabecera fija: ancla la barra pegajosa justo
     debajo (patrón de la tabla de contenido). */
  useEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return undefined;
    const medir = () => {
      const cabecera = document.querySelector('.header');
      raiz.style.setProperty('--alto-cabecera', `${(cabecera?.offsetHeight ?? 0) + 12}px`);
    };
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, []);

  /* Marca como activo el último espacio cuyo título ya pasó bajo la
     cabecera (comparación directa: son solo tres títulos). */
  useEffect(() => {
    const actualizar = () => {
      const cabecera = document.querySelector('.header');
      const margen = (cabecera?.offsetHeight ?? 0) + (barraRef.current?.offsetHeight ?? 0) + 40;
      let activo = ESPACIOS[0].numero;
      ESPACIOS.forEach((espacio) => {
        const titulo = document.getElementById(`tanques-espacio-${espacio.numero}`);
        if (titulo && titulo.getBoundingClientRect().top <= margen) {
          activo = espacio.numero;
        }
      });
      setEspacioActivo(activo);
    };
    actualizar();
    window.addEventListener('scroll', actualizar, { passive: true });
    window.addEventListener('resize', actualizar);
    return () => {
      window.removeEventListener('scroll', actualizar);
      window.removeEventListener('resize', actualizar);
    };
  }, []);

  /* Desplaza a la tarjeta del espacio descontando la cabecera y la
     barra pegajosa, y enfoca su título (suave salvo movimiento
     reducido). */
  const irAEspacio = (numero) => {
    const titulo = document.getElementById(`tanques-espacio-${numero}`);
    if (!titulo) return;
    const cabecera = document.querySelector('.header');
    const descuento =
      (cabecera?.offsetHeight ?? 0) + (barraRef.current?.offsetHeight ?? 0) + 28;
    const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: titulo.getBoundingClientRect().top + window.scrollY - descuento,
      behavior: prefiereQuieto ? 'auto' : 'smooth',
    });
    titulo.focus({ preventScroll: true });
  };

  /* Aparición progresiva de las tarjetas al desplazarse (patrón de la
     Línea de tiempo): el modificador `--animado` se añade por código
     ANTES de observar, así que sin script, sin IntersectionObserver o
     con movimiento reducido todo queda visible de inmediato. */
  useEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return undefined;

    const hitos = raiz.querySelectorAll('.modulo-tanques-pensamiento__hito');
    const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefiereQuieto || typeof window.IntersectionObserver !== 'function') {
      return undefined;
    }

    raiz.classList.add('modulo-tanques-pensamiento--animado');
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('modulo-tanques-pensamiento__hito--visible');
            observador.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    hitos.forEach((hito) => observador.observe(hito));

    return () => {
      observador.disconnect();
      raiz.classList.remove('modulo-tanques-pensamiento--animado');
    };
  }, []);

  return (
    <section
      ref={raizRef}
      className="modulo-tanques-pensamiento"
      aria-labelledby="titulo-tanques-pensamiento"
    >
      <header className="modulo-tanques-pensamiento__encabezado">
        <h1 id="titulo-tanques-pensamiento" className="modulo-tanques-pensamiento__titulo">
          Tanques de pensamiento
        </h1>
      </header>

      <p className="modulo-tanques-pensamiento__intro">
        El Tanque de Pensamiento Prospectivo del Observatorio constituye un espacio permanente de
        análisis estratégico, construcción colectiva de conocimiento y diálogo interdisciplinario,
        en el que expertos institucionales participan en procesos de reflexión orientados a
        identificar tendencias, analizar factores de cambio, anticipar escenarios y comprender las
        dinámicas que configurarán el futuro del bienestar. Como nodo articulador de conocimiento
        y evidencia, integra múltiples perspectivas para generar inteligencia prospectiva que
        apoye la toma de decisiones de largo plazo.
      </p>
      <p className="modulo-tanques-pensamiento__intro">
        A través del acompañamiento de un consultor experto en prospectiva, durante el 2026 se han
        desarrollado talleres especializados, estudios prospectivos, notas técnicas y espacios de
        conversación, en aras de fortalecer la capacidad institucional para anticipar
        transformaciones, construir escenarios y formular recomendaciones estratégicas que
        orienten el desarrollo sostenible del bienestar.
      </p>

      <p className="modulo-tanques-pensamiento__leyenda">
        Espacios de desarrollo de los tanques de pensamiento:
      </p>

      {/* Barra pegajosa para moverse entre los tres espacios */}
      <nav
        ref={barraRef}
        className="modulo-tanques-pensamiento__navegacion"
        aria-label="Ir a un espacio de pensamiento"
      >
        <ul className="modulo-tanques-pensamiento__navegacion-lista">
          {ESPACIOS.map((espacio) => (
            <li key={espacio.numero}>
              <button
                type="button"
                className={`modulo-tanques-pensamiento__navegacion-boton${
                  espacioActivo === espacio.numero
                    ? ' modulo-tanques-pensamiento__navegacion-boton--activo'
                    : ''
                }`}
                aria-current={espacioActivo === espacio.numero ? 'true' : undefined}
                onClick={() => irAEspacio(espacio.numero)}
              >
                Espacio {espacio.numero}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Cronología de espacios: espina vertical con tarjetas numeradas */}
      <ol className="modulo-tanques-pensamiento__cronologia">
        {ESPACIOS.map((espacio) => (
          <TarjetaEspacio key={espacio.numero} espacio={espacio} onNavegar={onNavegar} />
        ))}
      </ol>
    </section>
  );
}

export default ModuloTanquesPensamiento;
