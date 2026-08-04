/**
 * App.jsx — Componente raíz y estado global de navegación.
 *
 * El portal navega por estado interno de React (decisión de arquitectura:
 * sin React Router, para priorizar velocidad de carga y permitir el deploy
 * en servidor propio sin reescrituras de rutas). `seccionActiva` guarda el
 * id de la sección seleccionada y determina qué módulo se renderiza dentro
 * del contenedor principal.
 */
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import ModuloInicio from './modules/ModuloInicio/ModuloInicio.jsx';
import ModuloEnConstruccion from './modules/ModuloEnConstruccion/ModuloEnConstruccion.jsx';
import { SECCION_INICIO, TENDENCIAS, obtenerEtiquetaSeccion } from './data/navegacion.js';
import './app.css';

/* El módulo de tendencias (con el mapa) se carga bajo demanda para no
   engordar el paquete inicial del portal. */
const ModuloTendencia = lazy(() => import('./modules/ModuloTendencia/ModuloTendencia.jsx'));

/* Tendencias con contenido habilitado en la entrega actual. */
const TENDENCIAS_HABILITADAS = ['envejecimiento', 'informalidad-laboral'];

const TITULO_PORTAL = 'Observatorio Comfenalco Antioquia';

function App() {
  /* Id de la sección visible; el portal siempre abre en el inicio. */
  const [seccionActiva, setSeccionActiva] = useState(SECCION_INICIO);

  /* Referencias para la gestión de foco al navegar entre secciones. */
  const principalRef = useRef(null);
  const esPrimeraCarga = useRef(true);

  /* Cada cambio de sección reproduce lo que haría una navegación entre
     páginas: actualiza el título de la pestaña, vuelve al inicio del
     documento y lleva el foco al contenido para que los lectores de
     pantalla anuncien la nueva sección. En la carga inicial no se toca
     ni el desplazamiento ni el foco. */
  useEffect(() => {
    document.title =
      seccionActiva === SECCION_INICIO
        ? TITULO_PORTAL
        : `${obtenerEtiquetaSeccion(seccionActiva)} — ${TITULO_PORTAL}`;

    if (esPrimeraCarga.current) {
      esPrimeraCarga.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    principalRef.current?.focus({ preventScroll: true });
  }, [seccionActiva]);

  /**
   * Decide el módulo a mostrar en el contenedor principal.
   * Inicio y las tendencias habilitadas tienen módulo propio; el resto de
   * secciones muestra un aviso discreto de construcción hasta que las
   * próximas fases o entregas les den contenido.
   */
  const renderizarModulo = () => {
    if (seccionActiva === SECCION_INICIO) {
      return <ModuloInicio onNavegar={setSeccionActiva} />;
    }

    const tendencia = TENDENCIAS.find((t) => t.id === seccionActiva);
    if (tendencia && TENDENCIAS_HABILITADAS.includes(tendencia.slug)) {
      return (
        <Suspense fallback={<p className="app__cargando">Cargando…</p>}>
          {/* key por tendencia: al cambiar de tendencia se reinicia la
              selección de departamento del módulo compartido */}
          <ModuloTendencia key={tendencia.id} tendencia={tendencia} />
        </Suspense>
      );
    }

    return <ModuloEnConstruccion nombreSeccion={obtenerEtiquetaSeccion(seccionActiva)} />;
  };

  return (
    <div className="app">
      {/* Enlace de salto para lectores de pantalla y navegación por teclado */}
      <a className="app__salto-contenido" href="#contenido-principal">
        Saltar al contenido principal
      </a>

      <Header seccionActiva={seccionActiva} onNavegar={setSeccionActiva} />

      {/* Módulo principal: contenedor único donde se renderiza cada sección.
          tabIndex -1 permite enfocarlo por código al cambiar de sección. */}
      <main
        id="contenido-principal"
        className="app__principal"
        ref={principalRef}
        tabIndex={-1}
      >
        {renderizarModulo()}
      </main>

      <Footer onNavegar={setSeccionActiva} />
    </div>
  );
}

export default App;
