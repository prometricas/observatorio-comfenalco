/**
 * ModuloTendencia — Módulo parametrizado de las tendencias del Observatorio.
 *
 * Es el ÚNICO módulo de tendencia: las nueve comparten este layout y el
 * mismo mapa croquis de Colombia. Lo que muestra cada una lo define su
 * configuración (src/data/tendencias.js):
 *
 *  - Gráficas 'piramides' (Envejecimiento): dos pirámides poblacionales
 *    comparativas con selector de año (por defecto 2018 frente a 2050).
 *  - Gráfica 'serie-ciudades' (Informalidad laboral): una serie histórica
 *    + proyección de la ciudad capital del departamento, en tarjeta amplia.
 *  - Texto por departamento (un .docx por departamento) o documento único
 *    (secciones "Ciudad (Departamento)"), en banda completa debajo.
 *
 * En móvil el mapa va arriba y el contenido debajo, con desplazamiento
 * automático al panel al seleccionar.
 */
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import MapaColombia from '../../components/MapaColombia/MapaColombia.jsx';
import SelectorAnio from '../../components/SelectorAnio/SelectorAnio.jsx';
import SelectorCiudad from '../../components/SelectorCiudad/SelectorCiudad.jsx';
import TextoDepartamento from '../../components/TextoDepartamento/TextoDepartamento.jsx';
import { obtenerDepartamentoPorCodigo } from '../../data/departamentos.js';
import {
  obtenerCiudadDeDepartamento,
  obtenerDepartamentoDeCiudad,
} from '../../data/informalidad.js';
import { obtenerConfiguracionTendencia } from '../../data/tendencias.js';
import {
  ESTADO_PANEL,
  obtenerPanelInformalidad,
  obtenerPanelPoblacion,
} from '../../services/excelService.js';
import './modulo-tendencia.css';

/* Las gráficas (y con ellas el chunk de Plotly) se cargan bajo demanda:
   solo viajan al navegador cuando hay un departamento seleccionado. */
const PiramidePoblacional = lazy(
  () => import('../../components/PiramidePoblacional/PiramidePoblacional.jsx'),
);
const GraficaInformalidad = lazy(
  () => import('../../components/GraficaInformalidad/GraficaInformalidad.jsx'),
);

/* Vista comparativa por defecto aprobada para las pirámides. */
const ANIO_INICIAL_IZQUIERDO = 2018;
const ANIO_INICIAL_DERECHO = 2050;

/* Estados de la carga de la base de datos (Excel de la tendencia). */
const ESTADO_DATOS = {
  CARGANDO: 'cargando',
  LISTO: 'listo',
  SIN_DATOS: 'sin-datos',
  ERROR: 'error',
};

function ModuloTendencia({ tendencia }) {
  /* Qué gráfica y qué modo de texto usa esta tendencia. */
  const config = obtenerConfiguracionTendencia(tendencia.slug);

  /* Código DANE del departamento seleccionado en el mapa (null = ninguno). */
  const [codigoSeleccionado, setCodigoSeleccionado] = useState(null);
  const departamento = obtenerDepartamentoPorCodigo(codigoSeleccionado);

  /* Ciudad capital del departamento en la base de informalidad (si aplica). */
  const esSerieCiudades = config.grafica === 'serie-ciudades';
  const nombreCiudad =
    esSerieCiudades && codigoSeleccionado !== null
      ? obtenerCiudadDeDepartamento(codigoSeleccionado)
      : null;

  /* El selector de ciudad mueve la selección del mapa: ambos controles
     representan el mismo estado (el departamento activo). */
  const manejarCambioCiudad = (ciudad) => {
    const codigo = obtenerDepartamentoDeCiudad(ciudad);
    if (codigo !== null) setCodigoSeleccionado(codigo);
  };

  /* Panel de datos de la tendencia y años elegidos por cada pirámide. */
  const [panel, setPanel] = useState(null);
  const [estadoDatos, setEstadoDatos] = useState(ESTADO_DATOS.CARGANDO);
  const [anioIzquierdo, setAnioIzquierdo] = useState(ANIO_INICIAL_IZQUIERDO);
  const [anioDerecho, setAnioDerecho] = useState(ANIO_INICIAL_DERECHO);
  const [reintentosDatos, setReintentosDatos] = useState(0);

  /* El Excel se pide al entrar al módulo (una sola lectura por tendencia,
     cacheada): así los datos suelen estar listos antes del primer clic en
     el mapa. En las pirámides, los años por defecto se ajustan a los
     realmente disponibles en el archivo. */
  useEffect(() => {
    let vigente = true;
    const cargaSerie = config.grafica === 'serie-ciudades';
    const cargarPanel = cargaSerie ? obtenerPanelInformalidad : obtenerPanelPoblacion;

    cargarPanel(tendencia.slug)
      .then((panelCargado) => {
        if (!vigente) return;
        if (panelCargado.estado === ESTADO_PANEL.DISPONIBLE) {
          setPanel(panelCargado);
          if (!cargaSerie) {
            setAnioIzquierdo((anio) =>
              panelCargado.anios.includes(anio) ? anio : panelCargado.anios[0],
            );
            setAnioDerecho((anio) =>
              panelCargado.anios.includes(anio)
                ? anio
                : panelCargado.anios[panelCargado.anios.length - 1],
            );
          }
          setEstadoDatos(ESTADO_DATOS.LISTO);
        } else {
          setEstadoDatos(ESTADO_DATOS.SIN_DATOS);
        }
      })
      .catch(() => {
        if (vigente) setEstadoDatos(ESTADO_DATOS.ERROR);
      });

    return () => {
      vigente = false;
    };
  }, [tendencia.slug, config.grafica, reintentosDatos]);

  /* Reintento tras un error de carga del Excel (no queda en caché). */
  const manejarReintentoDatos = () => {
    setEstadoDatos(ESTADO_DATOS.CARGANDO);
    setReintentosDatos((total) => total + 1);
  };

  /* Referencia al panel derecho para el desplazamiento en móvil. */
  const panelRef = useRef(null);

  /* En el layout apilado (< 900px) el panel queda bajo el pliegue: al
     seleccionar un departamento se desplaza a la vista para que se note
     que apareció contenido, respetando la preferencia de movimiento
     reducido del sistema. */
  useEffect(() => {
    if (codigoSeleccionado === null) return;
    if (window.matchMedia('(max-width: 899px)').matches) {
      /* 'instant' (y no 'auto') garantiza el salto sin animación cuando el
         sistema pide movimiento reducido, aunque el CSS global use
         scroll-behavior smooth. */
      const comportamiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth';
      panelRef.current?.scrollIntoView({ behavior: comportamiento, block: 'start' });
    }
  }, [codigoSeleccionado]);

  /* Complemento del anuncio accesible según el contenido mostrado. */
  const complementoAnuncio =
    estadoDatos === ESTADO_DATOS.LISTO
      ? esSerieCiudades
        ? nombreCiudad
          ? `; tasa de informalidad de ${nombreCiudad}`
          : ''
        : `; pirámides de ${anioIzquierdo} y ${anioDerecho}`
      : '';

  return (
    <section className="modulo-tendencia">
      {/* Encabezado de la tendencia activa */}
      <header className="modulo-tendencia__encabezado">
        <p className="modulo-tendencia__contexto">Tendencias</p>
        <h1 className="modulo-tendencia__titulo">{tendencia.etiqueta}</h1>
        <p className="modulo-tendencia__instruccion">
          Seleccione un departamento en el mapa para consultar su información.
        </p>
      </header>

      {/* La rejilla se adapta al contenido: tres columnas iguales para las
          dos pirámides, o mapa + gráfica amplia para la serie por ciudad */}
      <div
        className={`modulo-tendencia__contenido${
          esSerieCiudades ? ' modulo-tendencia__contenido--serie' : ''
        }`}
      >
        {/* Columna izquierda: croquis interactivo (común a las 9 tendencias) */}
        <div className="modulo-tendencia__mapa">
          <MapaColombia
            codigoSeleccionado={codigoSeleccionado}
            onSelectDepartamento={setCodigoSeleccionado}
          />
        </div>

        {/* Panel derecho: se renderiza con el departamento seleccionado.
            El anuncio para lectores de pantalla lo hace el elemento oculto
            de abajo; el panel no es región viva para no leer el contenido
            completo en cada selección. */}
        <div
          className={`modulo-tendencia__panel${
            esSerieCiudades ? ' modulo-tendencia__panel--columna-unica' : ''
          }`}
          ref={panelRef}
        >
          {/* Anuncio breve de la selección (solo lectores de pantalla;
              la región persiste entre cambios) */}
          <p className="oculto-accesible" aria-live="polite">
            {departamento
              ? `Mostrando información de ${departamento.nombre}${complementoAnuncio}`
              : ''}
          </p>
          {departamento ? (
            <>
              <h2 className="modulo-tendencia__departamento">{departamento.nombre}</h2>

              {/* Gráficas de la tendencia según su configuración */}
              {estadoDatos === ESTADO_DATOS.LISTO ? (
                <div className="modulo-tendencia__graficas">
                  {esSerieCiudades ? (
                    /* Una sola serie por ciudad, en tarjeta amplia */
                    <article className="modulo-tendencia__grafica modulo-tendencia__grafica--amplia">
                      <div className="modulo-tendencia__grafica-encabezado">
                        <h3 className="modulo-tendencia__grafica-titulo modulo-tendencia__grafica-titulo--compacto">
                          Tasa de informalidad laboral
                        </h3>
                        {/* Selector del cuaderno original, sincronizado con
                            el mapa en ambos sentidos */}
                        <SelectorCiudad
                          ciudades={panel.ciudades}
                          valor={nombreCiudad}
                          onCambio={manejarCambioCiudad}
                        />
                      </div>
                      <Suspense
                        fallback={
                          <p className="modulo-tendencia__pendiente">Cargando gráfica…</p>
                        }
                      >
                        <GraficaInformalidad
                          panel={panel}
                          nombreCiudad={nombreCiudad}
                          nombreDepartamento={departamento.nombre}
                        />
                      </Suspense>
                    </article>
                  ) : (
                    /* Dos pirámides comparativas con selector de año propio */
                    [
                      {
                        clave: 'izquierda',
                        anio: anioIzquierdo,
                        onCambio: setAnioIzquierdo,
                        contextoSelector: 'de la primera pirámide',
                      },
                      {
                        clave: 'derecha',
                        anio: anioDerecho,
                        onCambio: setAnioDerecho,
                        contextoSelector: 'de la segunda pirámide',
                      },
                    ].map((lado) => (
                      <article key={lado.clave} className="modulo-tendencia__grafica">
                        <div className="modulo-tendencia__grafica-encabezado">
                          <h3 className="modulo-tendencia__grafica-titulo modulo-tendencia__grafica-titulo--compacto">
                            Pirámide {lado.anio}
                          </h3>
                          <SelectorAnio
                            etiqueta="Año"
                            etiquetaOculta={lado.contextoSelector}
                            anios={panel.anios}
                            valor={lado.anio}
                            onCambio={lado.onCambio}
                          />
                        </div>
                        <Suspense
                          fallback={
                            <p className="modulo-tendencia__pendiente">Cargando gráfica…</p>
                          }
                        >
                          <PiramidePoblacional
                            fila={panel.obtenerFila(codigoSeleccionado, lado.anio)}
                            nombreDepartamento={departamento.nombre}
                            anio={lado.anio}
                          />
                        </Suspense>
                      </article>
                    ))
                  )}
                </div>
              ) : (
                <div className="modulo-tendencia__estado-datos">
                  {estadoDatos === ESTADO_DATOS.CARGANDO && (
                    <p className="modulo-tendencia__pendiente" role="status">
                      Cargando datos…
                    </p>
                  )}
                  {estadoDatos === ESTADO_DATOS.SIN_DATOS && (
                    <p className="modulo-tendencia__pendiente" role="status">
                      Datos en preparación para esta tendencia.
                    </p>
                  )}
                  {estadoDatos === ESTADO_DATOS.ERROR && (
                    <div
                      className="modulo-tendencia__pendiente modulo-tendencia__pendiente--error"
                      role="alert"
                    >
                      <p className="modulo-tendencia__mensaje-error">
                        No fue posible cargar los datos.
                      </p>
                      <button
                        type="button"
                        className="modulo-tendencia__reintentar"
                        onClick={manejarReintentoDatos}
                      >
                        Reintentar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Estado inicial: aún no hay departamento seleccionado */
            <div className="modulo-tendencia__vacio">
              <svg
                className="modulo-tendencia__vacio-icono"
                viewBox="0 0 64 64"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  className="modulo-tendencia__vacio-cursor"
                  d="M24 12 L44 30 L34 32 L40 46 L34 49 L28 35 L20 42 Z"
                />
              </svg>
              <p className="modulo-tendencia__vacio-mensaje">
                Seleccione un departamento del mapa para ver sus gráficas y su
                análisis.
              </p>
              {/* La base de datos se prepara en segundo plano al entrar al
                  módulo; se avisa por si el usuario selecciona muy pronto */}
              {estadoDatos === ESTADO_DATOS.CARGANDO && (
                <p className="modulo-tendencia__vacio-nota" role="status">
                  Preparando la base de datos… (solo tarda la primera visita)
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cuadro de texto: contenido del documento Word del departamento
          (Reto 2), en banda completa bajo las tarjetas para una lectura
          cómoda */}
      {departamento && (
        <article className="modulo-tendencia__texto">
          <h3
            id="titulo-analisis-departamento"
            className="modulo-tendencia__texto-titulo"
          >
            Análisis de {departamento.nombre}
          </h3>
          {/* key por tendencia+departamento: cada selección monta una
              instancia limpia del cuadro de texto */}
          <TextoDepartamento
            key={`${tendencia.slug}-${departamento.slugArchivo}`}
            slugTendencia={tendencia.slug}
            departamento={departamento}
            idTitulo="titulo-analisis-departamento"
            modoTexto={config.texto}
            archivoTextoUnico={config.archivoTextoUnico}
          />
        </article>
      )}
    </section>
  );
}

export default ModuloTendencia;
