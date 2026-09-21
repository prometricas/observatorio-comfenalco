/**
 * App.jsx — Componente raíz y estado global de navegación.
 *
 * El portal navega por estado interno de React (decisión de arquitectura:
 * sin React Router, para priorizar velocidad de carga y permitir el deploy
 * en servidor propio sin reescrituras de rutas). `seccionActiva` guarda el
 * id de la sección seleccionada y determina qué módulo se renderiza dentro
 * del contenedor principal.
 */
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import Cargador from './components/Cargador/Cargador.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import FondoModulo from './components/FondoModulo/FondoModulo.jsx';
import LimiteDeError from './components/LimiteDeError/LimiteDeError.jsx';
import ModuloInicio from './modules/ModuloInicio/ModuloInicio.jsx';
import ModuloEnConstruccion from './modules/ModuloEnConstruccion/ModuloEnConstruccion.jsx';
import ModuloNoEncontrado from './modules/ModuloNoEncontrado/ModuloNoEncontrado.jsx';
import {
  INDICADORES,
  SECCION_INICIO,
  TENDENCIAS,
  existeSeccion,
  obtenerEtiquetaSeccion,
} from './data/navegacion.js';
import { obtenerConfiguracionIndicador } from './data/indicadores.js';
import './app.css';

/* Los módulos con contenido pesado (mapa, Plotly) se cargan bajo demanda
   para no engordar el paquete inicial del portal; los intérpretes de
   Excel y Word viajan en fragmentos aparte que solo se descargan si hay
   que leer un archivo reemplazado en el servidor. */
const ModuloTendencia = lazy(() => import('./modules/ModuloTendencia/ModuloTendencia.jsx'));
const ModuloVidaMejor = lazy(() => import('./modules/ModuloVidaMejor/ModuloVidaMejor.jsx'));
const ModuloFelicidad = lazy(() => import('./modules/ModuloFelicidad/ModuloFelicidad.jsx'));
const ModuloCapitalHumano = lazy(
  () => import('./modules/ModuloCapitalHumano/ModuloCapitalHumano.jsx'),
);
const ModuloDesempenoAmbiental = lazy(
  () => import('./modules/ModuloDesempenoAmbiental/ModuloDesempenoAmbiental.jsx'),
);
const ModuloVidaDigital = lazy(() => import('./modules/ModuloVidaDigital/ModuloVidaDigital.jsx'));
/* Ligero (sin Plotly ni lecturas de archivos), pero diferido igual que el
   resto: cada sección viaja en su propio paquete de pocos kilobytes. */
const ModuloLineaTiempo = lazy(() => import('./modules/ModuloLineaTiempo/ModuloLineaTiempo.jsx'));
/* Rueda interactiva del modelo de factores de cambio (contenido fijo). */
const ModuloFactoresCambio = lazy(
  () => import('./modules/ModuloFactoresCambio/ModuloFactoresCambio.jsx'),
);
/* Portada del eje Tendencias: panal PESTEL con accesos directos. */
const ModuloTendencias = lazy(() => import('./modules/ModuloTendencias/ModuloTendencias.jsx'));
/* Portada del eje Indicadores: tablero de medidores simbólicos. */
const ModuloIndicadores = lazy(
  () => import('./modules/ModuloIndicadores/ModuloIndicadores.jsx'),
);
/* IBIM (menú fijo): artículo del Índice de Bienestar Multidimensional. */
const ModuloIbim = lazy(() => import('./modules/ModuloIbim/ModuloIbim.jsx'));
const ModuloPublicaciones = lazy(
  () => import('./modules/ModuloPublicaciones/ModuloPublicaciones.jsx'),
);
/* Benchmarking (menú fijo): artículo comparativo con contenido fijo. */
const ModuloBenchmarking = lazy(
  () => import('./modules/ModuloBenchmarking/ModuloBenchmarking.jsx'),
);
/* Tanques de pensamiento (menú fijo): cronología de los talleres. */
const ModuloTanquesPensamiento = lazy(
  () => import('./modules/ModuloTanquesPensamiento/ModuloTanquesPensamiento.jsx'),
);
/* El Observatorio (menú fijo): texto conceptual con contenido fijo. */
const ModuloElObservatorio = lazy(
  () => import('./modules/ModuloElObservatorio/ModuloElObservatorio.jsx'),
);
/* Artículos con contenido fijo en el código (sin Excel ni Word). */
const ModuloGastoSocial = lazy(() => import('./modules/ModuloGastoSocial/ModuloGastoSocial.jsx'));
const ModuloEstructuraFamiliar = lazy(
  () => import('./modules/ModuloEstructuraFamiliar/ModuloEstructuraFamiliar.jsx'),
);
const ModuloNormatividadLaboral = lazy(
  () => import('./modules/ModuloNormatividadLaboral/ModuloNormatividadLaboral.jsx'),
);
const ModuloEconomiaCircular = lazy(
  () => import('./modules/ModuloEconomiaCircular/ModuloEconomiaCircular.jsx'),
);
const ModuloHiperPersonalizacion = lazy(
  () => import('./modules/ModuloHiperPersonalizacion/ModuloHiperPersonalizacion.jsx'),
);
const ModuloRegulacionesAmbientales = lazy(
  () => import('./modules/ModuloRegulacionesAmbientales/ModuloRegulacionesAmbientales.jsx'),
);

/* Tendencias con módulo PROPIO (artículos de contenido fijo); las demás
   habilitadas usan el módulo compartido de mapa y gráficas. */
const MODULOS_TENDENCIA_PROPIOS = {
  'gasto-social': ModuloGastoSocial,
  'estructura-familiar': ModuloEstructuraFamiliar,
  'normatividad-laboral': ModuloNormatividadLaboral,
  'economia-circular': ModuloEconomiaCircular,
  'hiper-personalizacion-de-servicios': ModuloHiperPersonalizacion,
  'regulaciones-ambientales': ModuloRegulacionesAmbientales,
};

/* Módulo que atiende cada tipo declarado en la configuración de
   indicadores; los tipos sin módulo caen al aviso de construcción. */
const MODULOS_INDICADOR = {
  'vida-mejor': ModuloVidaMejor,
  'felicidad-nacional': ModuloFelicidad,
  'capital-humano': ModuloCapitalHumano,
  'desempeno-ambiental': ModuloDesempenoAmbiental,
  'vida-digital': ModuloVidaDigital,
};

/* Tendencias con contenido habilitado en la entrega actual. */
const TENDENCIAS_HABILITADAS = [
  'envejecimiento',
  'informalidad-laboral',
  'gasto-social',
  'estructura-familiar',
  'normatividad-laboral',
  'economia-circular',
  'hiper-personalizacion-de-servicios',
  'regulaciones-ambientales',
];

const TITULO_PORTAL = 'Observatorio Comfenalco Antioquia';

/* Clave de sessionStorage con la sección visible: el estado sobrevive a
   una recarga (F5) pero muere al cerrar la pestaña, que es exactamente
   el comportamiento pedido por el cliente (2026-08-29) — recargar no
   pierde la lectura; una visita nueva siempre abre en el inicio. */
const CLAVE_SECCION_GUARDADA = 'observatorio-seccion-activa';

/** Sección con la que abre el portal: la guardada en la sesión del
    navegador si sigue existiendo en el catálogo; si no, el inicio.
    sessionStorage puede fallar (modo privado antiguo, datos de sitio
    bloqueados): ante cualquier error se abre en el inicio. */
function seccionInicial() {
  try {
    const guardada = window.sessionStorage.getItem(CLAVE_SECCION_GUARDADA);
    if (guardada && existeSeccion(guardada)) return guardada;
  } catch {
    /* sin almacenamiento de sesión: comportamiento original */
  }
  return SECCION_INICIO;
}

function App() {
  /* Id de la sección visible; abre en la sección guardada de la sesión
     (recarga) o en el inicio (visita nueva). */
  const [seccionActiva, setSeccionActiva] = useState(seccionInicial);

  /* Referencias para la gestión de foco al navegar entre secciones. */
  const principalRef = useRef(null);
  const esPrimeraCarga = useRef(true);

  /* Precarga en segundo plano de los módulos pesados (arrastran el
     chunk de Plotly): cuando el navegador queda ocioso tras pintar el
     inicio, los descarga en silencio para que la primera navegación a
     una tendencia o indicador se sienta inmediata. Un fallo aquí es
     irrelevante: la carga diferida normal lo reintenta al navegar. */
  useEffect(() => {
    const precargar = () => {
      import('./modules/ModuloTendencia/ModuloTendencia.jsx').catch(() => {});
      import('./modules/ModuloVidaMejor/ModuloVidaMejor.jsx').catch(() => {});
      import('./modules/ModuloFelicidad/ModuloFelicidad.jsx').catch(() => {});
      import('./modules/ModuloCapitalHumano/ModuloCapitalHumano.jsx').catch(() => {});
      import('./modules/ModuloDesempenoAmbiental/ModuloDesempenoAmbiental.jsx').catch(() => {});
      import('./modules/ModuloVidaDigital/ModuloVidaDigital.jsx').catch(() => {});
    };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(precargar, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(precargar, 2500);
    return () => window.clearTimeout(id);
  }, []);

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

    /* Guarda la sección para sobrevivir a una recarga (ver
       CLAVE_SECCION_GUARDADA); si el almacenamiento falla, se navega
       igual, solo que la recarga volverá al inicio. */
    try {
      window.sessionStorage.setItem(CLAVE_SECCION_GUARDADA, seccionActiva);
    } catch {
      /* sin almacenamiento de sesión */
    }

    if (esPrimeraCarga.current) {
      esPrimeraCarga.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    principalRef.current?.focus({ preventScroll: true });
  }, [seccionActiva]);

  /* Regreso al inicio, usado por el módulo 404 y por el límite de error. */
  const volverAlInicio = useCallback(() => setSeccionActiva(SECCION_INICIO), []);

  /**
   * Decide el módulo a mostrar en el contenedor principal.
   * Inicio y las tendencias habilitadas tienen módulo propio; las secciones
   * previstas pero aún sin contenido muestran el aviso de construcción, y
   * cualquier sección desconocida termina en el módulo 404.
   */
  const renderizarModulo = () => {
    if (seccionActiva === SECCION_INICIO) {
      return <ModuloInicio onNavegar={setSeccionActiva} />;
    }

    if (!existeSeccion(seccionActiva)) {
      return <ModuloNoEncontrado onVolver={volverAlInicio} />;
    }

    /* Línea de tiempo (menú fijo): cronología del bienestar integral. */
    if (seccionActiva === 'linea-de-tiempo') {
      return (
        <Suspense
          fallback={<Cargador mensaje="Cargando el módulo…" tamano="grande" enBloque />}
        >
          <ModuloLineaTiempo />
        </Suspense>
      );
    }

    /* El Observatorio (menú fijo): concepto y funciones del Observatorio. */
    if (seccionActiva === 'el-observatorio') {
      return (
        <Suspense
          fallback={<Cargador mensaje="Cargando el módulo…" tamano="grande" enBloque />}
        >
          <ModuloElObservatorio />
        </Suspense>
      );
    }

    /* Tanques de pensamiento (menú fijo): cronología de los espacios;
       recibe la navegación para enlazar temas a sus secciones vivas. */
    if (seccionActiva === 'tanques-de-pensamiento') {
      return (
        <Suspense
          fallback={<Cargador mensaje="Cargando el módulo…" tamano="grande" enBloque />}
        >
          <ModuloTanquesPensamiento onNavegar={setSeccionActiva} />
        </Suspense>
      );
    }

    /* Publicaciones (menú fijo): catálogo de PDF con visor en línea. */
    if (seccionActiva === 'publicaciones') {
      return (
        <Suspense
          fallback={<Cargador mensaje="Cargando el módulo…" tamano="grande" enBloque />}
        >
          <ModuloPublicaciones />
        </Suspense>
      );
    }

    /* IBIM (menú fijo): lectura territorial del Índice de Bienestar
       Multidimensional en Antioquia. */
    if (seccionActiva === 'ibim') {
      return (
        <Suspense
          fallback={<Cargador mensaje="Cargando el módulo…" tamano="grande" enBloque />}
        >
          <ModuloIbim />
        </Suspense>
      );
    }

    /* Benchmarking (menú fijo): análisis comparativo del bienestar. */
    if (seccionActiva === 'benchmarking') {
      return (
        <Suspense
          fallback={<Cargador mensaje="Cargando el módulo…" tamano="grande" enBloque />}
        >
          <ModuloBenchmarking />
        </Suspense>
      );
    }

    /* Factores de cambio (menú desplegable): rueda del modelo. */
    if (seccionActiva === 'factores-de-cambio') {
      return (
        <Suspense
          fallback={<Cargador mensaje="Cargando el módulo…" tamano="grande" enBloque />}
        >
          <ModuloFactoresCambio />
        </Suspense>
      );
    }

    /* Portada del eje Indicadores (menú desplegable): tablero de
       medidores simbólicos con acceso a cada indicador. */
    if (seccionActiva === 'indicadores') {
      return (
        <Suspense
          fallback={<Cargador mensaje="Cargando el módulo…" tamano="grande" enBloque />}
        >
          <ModuloIndicadores onNavegar={setSeccionActiva} />
        </Suspense>
      );
    }

    /* Portada del eje Tendencias (menú desplegable): panal PESTEL con
       accesos directos a las tendencias de cada dimensión. */
    if (seccionActiva === 'tendencias') {
      return (
        <Suspense
          fallback={<Cargador mensaje="Cargando el módulo…" tamano="grande" enBloque />}
        >
          <ModuloTendencias onNavegar={setSeccionActiva} />
        </Suspense>
      );
    }

    const tendencia = TENDENCIAS.find((t) => t.id === seccionActiva);
    if (tendencia && TENDENCIAS_HABILITADAS.includes(tendencia.slug)) {
      /* Las tendencias-artículo tienen módulo propio; el resto comparte
         el módulo de mapa y gráficas. */
      const ModuloPropio = MODULOS_TENDENCIA_PROPIOS[tendencia.slug];
      const Modulo = ModuloPropio ?? ModuloTendencia;
      return (
        <Suspense
          fallback={<Cargador mensaje="Cargando el módulo…" tamano="grande" enBloque />}
        >
          {/* key por tendencia: al cambiar de tendencia se reinicia la
              selección de departamento del módulo compartido */}
          <Modulo key={tendencia.id} tendencia={tendencia} />
        </Suspense>
      );
    }

    /* Indicadores: cada uno declara su módulo en la configuración; los que
       aún no tienen datos caen al aviso de construcción. */
    const indicador = INDICADORES.find((i) => i.id === seccionActiva);
    const configIndicador = indicador ? obtenerConfiguracionIndicador(indicador.slug) : null;
    const ModuloIndicador = configIndicador ? MODULOS_INDICADOR[configIndicador.modulo] : null;
    if (indicador && ModuloIndicador) {
      return (
        <Suspense
          fallback={<Cargador mensaje="Cargando el módulo…" tamano="grande" enBloque />}
        >
          <ModuloIndicador
            key={indicador.id}
            indicadorSeccion={indicador}
            config={configIndicador}
          />
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

      {/* Fondo decorativo fijo (degradado + pictograma de la sección) */}
      <FondoModulo seccion={seccionActiva} />

      <Header seccionActiva={seccionActiva} onNavegar={setSeccionActiva} />

      {/* Módulo principal: contenedor único donde se renderiza cada sección.
          tabIndex -1 permite enfocarlo por código al cambiar de sección. */}
      <main
        id="contenido-principal"
        className="app__principal"
        ref={principalRef}
        tabIndex={-1}
      >
        {/* Si el módulo falla al cargarse, el límite muestra el 404 en vez
            de dejar el portal en blanco; la key lo reinicia al navegar. */}
        <LimiteDeError key={seccionActiva} onVolver={volverAlInicio}>
          {renderizarModulo()}
        </LimiteDeError>
      </main>

      <Footer onNavegar={setSeccionActiva} />
    </div>
  );
}

export default App;
