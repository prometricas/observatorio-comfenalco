/**
 * ModuloTendencia — Módulo parametrizado de las tendencias del Observatorio.
 *
 * Es el ÚNICO módulo de tendencia: se parametriza con la tendencia activa
 * (las nueve comparten este mismo layout y el mismo mapa). Estructura:
 * mapa croquis de Colombia a la izquierda y panel derecho que se renderiza
 * al seleccionar un departamento, con las dos pirámides poblacionales del
 * Excel arriba (selector de año propio; por defecto 2018 frente a 2050) y
 * el cuadro de texto del documento Word del departamento debajo. En móvil
 * el mapa va arriba y el panel debajo.
 */
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import MapaColombia from '../../components/MapaColombia/MapaColombia.jsx';
import SelectorAnio from '../../components/SelectorAnio/SelectorAnio.jsx';
import TextoDepartamento from '../../components/TextoDepartamento/TextoDepartamento.jsx';
import { obtenerDepartamentoPorCodigo } from '../../data/departamentos.js';
import { ESTADO_PANEL, obtenerPanelPoblacion } from '../../services/excelService.js';
import './modulo-tendencia.css';

/* La gráfica (y con ella el chunk de Plotly) se carga bajo demanda: solo
   viaja al navegador cuando hay un departamento seleccionado. */
const PiramidePoblacional = lazy(
  () => import('../../components/PiramidePoblacional/PiramidePoblacional.jsx'),
);

/* Vista comparativa por defecto aprobada: 2018 frente a 2050. */
const ANIO_INICIAL_IZQUIERDO = 2018;
const ANIO_INICIAL_DERECHO = 2050;

/* Estados de la carga del panel de población (Excel de la tendencia). */
const ESTADO_DATOS = {
  CARGANDO: 'cargando',
  LISTO: 'listo',
  SIN_DATOS: 'sin-datos',
  ERROR: 'error',
};

function ModuloTendencia({ tendencia }) {
  /* Código DANE del departamento seleccionado en el mapa (null = ninguno). */
  const [codigoSeleccionado, setCodigoSeleccionado] = useState(null);
  const departamento = obtenerDepartamentoPorCodigo(codigoSeleccionado);

  /* Panel de población de la tendencia y años elegidos por cada pirámide. */
  const [panel, setPanel] = useState(null);
  const [estadoDatos, setEstadoDatos] = useState(ESTADO_DATOS.CARGANDO);
  const [anioIzquierdo, setAnioIzquierdo] = useState(ANIO_INICIAL_IZQUIERDO);
  const [anioDerecho, setAnioDerecho] = useState(ANIO_INICIAL_DERECHO);
  const [reintentosDatos, setReintentosDatos] = useState(0);

  /* El Excel se pide al entrar al módulo (una sola lectura por tendencia,
     cacheada): así los datos suelen estar listos antes del primer clic en
     el mapa. Los años por defecto se ajustan a los realmente disponibles. */
  useEffect(() => {
    let vigente = true;

    obtenerPanelPoblacion(tendencia.slug)
      .then((panelCargado) => {
        if (!vigente) return;
        if (panelCargado.estado === ESTADO_PANEL.DISPONIBLE) {
          setPanel(panelCargado);
          setAnioIzquierdo((anio) =>
            panelCargado.anios.includes(anio) ? anio : panelCargado.anios[0],
          );
          setAnioDerecho((anio) =>
            panelCargado.anios.includes(anio)
              ? anio
              : panelCargado.anios[panelCargado.anios.length - 1],
          );
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
  }, [tendencia.slug, reintentosDatos]);

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

      <div className="modulo-tendencia__contenido">
        {/* Columna izquierda: croquis interactivo (común a las 9 tendencias) */}
        <div className="modulo-tendencia__mapa">
          <MapaColombia
            codigoSeleccionado={codigoSeleccionado}
            onSelectDepartamento={setCodigoSeleccionado}
          />
        </div>

        {/* Panel derecho: se renderiza con el departamento seleccionado.
            El anuncio para lectores de pantalla lo hace el elemento oculto
            de abajo; el panel no es región viva para no leer el documento
            completo en cada selección. */}
        <div className="modulo-tendencia__panel" ref={panelRef}>
          {/* Anuncio breve de la selección y de los años mostrados (solo
              lectores de pantalla; la región persiste entre cambios) */}
          <p className="oculto-accesible" aria-live="polite">
            {departamento
              ? `Mostrando información de ${departamento.nombre}${
                  estadoDatos === ESTADO_DATOS.LISTO
                    ? `; pirámides de ${anioIzquierdo} y ${anioDerecho}`
                    : ''
                }`
              : ''}
          </p>
          {departamento ? (
            <>
              <h2 className="modulo-tendencia__departamento">{departamento.nombre}</h2>

              {/* Las dos pirámides poblacionales del Excel (Reto 3), con
                  selector de año propio; por defecto 2018 frente a 2050 */}
              {estadoDatos === ESTADO_DATOS.LISTO ? (
                <div className="modulo-tendencia__graficas">
                  {[
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
                  ))}
                </div>
              ) : (
                <div className="modulo-tendencia__estado-datos">
                  {estadoDatos === ESTADO_DATOS.CARGANDO && (
                    <p className="modulo-tendencia__pendiente" role="status">
                      Cargando datos de población…
                    </p>
                  )}
                  {estadoDatos === ESTADO_DATOS.SIN_DATOS && (
                    <p className="modulo-tendencia__pendiente" role="status">
                      Datos de población en preparación para esta tendencia.
                    </p>
                  )}
                  {estadoDatos === ESTADO_DATOS.ERROR && (
                    <div
                      className="modulo-tendencia__pendiente modulo-tendencia__pendiente--error"
                      role="alert"
                    >
                      <p className="modulo-tendencia__mensaje-error">
                        No fue posible cargar los datos de población.
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
                  Preparando la base de datos de población… (solo tarda la
                  primera visita)
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cuadro de texto: contenido del documento Word del departamento
          (Reto 2), en banda completa bajo las tres tarjetas para una
          lectura cómoda */}
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
          />
        </article>
      )}
    </section>
  );
}

export default ModuloTendencia;
