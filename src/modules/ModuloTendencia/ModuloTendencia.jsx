/**
 * ModuloTendencia — Módulo parametrizado de las tendencias del Observatorio.
 *
 * Es el ÚNICO módulo de tendencia: se parametriza con la tendencia activa
 * (las nueve comparten este mismo layout y el mismo mapa). Estructura:
 * mapa croquis de Colombia a la izquierda y panel derecho que se renderiza
 * al seleccionar un departamento, con las dos gráficas de pirámide
 * poblacional arriba y el cuadro de texto abajo. En esta fase el panel
 * reserva los espacios; las gráficas reales (Excel) y el texto (Word)
 * se conectan en las Fases 3 y 4. En móvil el mapa va arriba y el panel
 * debajo.
 */
import { useEffect, useRef, useState } from 'react';
import MapaColombia from '../../components/MapaColombia/MapaColombia.jsx';
import TextoDepartamento from '../../components/TextoDepartamento/TextoDepartamento.jsx';
import { obtenerDepartamentoPorCodigo } from '../../data/departamentos.js';
import './modulo-tendencia.css';

function ModuloTendencia({ tendencia }) {
  /* Código DANE del departamento seleccionado en el mapa (null = ninguno). */
  const [codigoSeleccionado, setCodigoSeleccionado] = useState(null);
  const departamento = obtenerDepartamentoPorCodigo(codigoSeleccionado);

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
          {/* Anuncio breve del cambio de selección (solo lectores de pantalla) */}
          <p className="oculto-accesible" aria-live="polite">
            {departamento ? `Mostrando información de ${departamento.nombre}` : ''}
          </p>
          {departamento ? (
            <>
              <h2 className="modulo-tendencia__departamento">{departamento.nombre}</h2>

              {/* Espacios de las dos pirámides poblacionales (Fase 3) */}
              <div className="modulo-tendencia__graficas">
                <article className="modulo-tendencia__grafica">
                  <h3 className="modulo-tendencia__grafica-titulo">Pirámide 2018</h3>
                  <p className="modulo-tendencia__pendiente">
                    Gráfica en preparación
                  </p>
                </article>
                <article className="modulo-tendencia__grafica">
                  <h3 className="modulo-tendencia__grafica-titulo">Pirámide 2050</h3>
                  <p className="modulo-tendencia__pendiente">
                    Gráfica en preparación
                  </p>
                </article>
              </div>

              {/* Cuadro de texto: contenido del documento Word del
                  departamento (Reto 2), leído en el navegador */}
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ModuloTendencia;
