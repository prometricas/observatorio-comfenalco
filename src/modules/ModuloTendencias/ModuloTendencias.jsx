/**
 * ModuloTendencias — Portada del eje "Tendencias".
 *
 * Presenta el eje con el panal interactivo del marco PESTEL
 * (PanalPestel): al elegir una dimensión, el panel lateral muestra su
 * descripción y los ACCESOS DIRECTOS a las tendencias que agrupa
 * (asignación del cliente en `src/data/pestel-tendencias.js`); cada
 * acceso navega a la sección viva de esa tendencia mediante el estado
 * interno de la App (prop onNavegar, el mismo contrato de Tanques de
 * pensamiento). Un segundo clic en la dimensión deselecciona.
 *
 * En pantallas angostas el panel queda debajo del panal; al seleccionar,
 * se desplaza a la vista si hace falta (suave, salvo con movimiento
 * reducido). El panel anuncia su contenido con aria-live.
 */
import { useEffect, useRef, useState } from 'react';
import PanalPestel from './PanalPestel.jsx';
import { DIMENSIONES_PESTEL, etiquetaTendencia } from '../../data/pestel-tendencias.js';
import './modulo-tendencias.css';

function ModuloTendencias({ onNavegar }) {
  const [seleccionId, setSeleccionId] = useState(null);
  const panelRef = useRef(null);

  const dimension = seleccionId
    ? DIMENSIONES_PESTEL.find((d) => d.id === seleccionId)
    : null;

  /* En angosto (panal y panel apilados), la dimensión elegida podría
     dejar el panel fuera de la vista: se acerca lo mínimo necesario. */
  useEffect(() => {
    if (!seleccionId) return;
    if (window.matchMedia('(min-width: 900px)').matches) return;
    const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    panelRef.current?.scrollIntoView({
      block: 'nearest',
      behavior: prefiereQuieto ? 'auto' : 'smooth',
    });
  }, [seleccionId]);

  const manejarSeleccion = (id) => {
    setSeleccionId((previa) => (previa === id ? null : id));
  };

  return (
    <section className="modulo-tendencias" aria-labelledby="titulo-tendencias">
      <header className="modulo-tendencias__encabezado">
        <p className="modulo-tendencias__contexto">Ejes temáticos</p>
        <h1 id="titulo-tendencias" className="modulo-tendencias__titulo">
          Tendencias
        </h1>
        <p className="modulo-tendencias__descripcion-eje">
          Fenómenos sociales y económicos cuyo comportamiento permite anticipar el futuro de la
          región. El Observatorio las organiza con el marco PESTEL: elija una dimensión del panal
          para conocer sus tendencias y entrar a cada una.
        </p>
      </header>

      <div className="modulo-tendencias__contenido">
        <PanalPestel seleccionId={seleccionId} onSeleccionar={manejarSeleccion} />

        {/* Panel de la dimensión elegida: descripción y accesos directos */}
        <aside
          ref={panelRef}
          className="modulo-tendencias__panel"
          aria-label="Tendencias de la dimensión seleccionada"
          aria-live="polite"
          style={
            dimension
              ? { '--pt-color': dimension.color, '--pt-texto': dimension.colorTexto }
              : undefined
          }
        >
          {dimension ? (
            <>
              <p className="modulo-tendencias__panel-contexto">Dimensión del marco PESTEL</p>
              <h2 className="modulo-tendencias__panel-titulo">{dimension.nombre}</h2>
              <p className="modulo-tendencias__panel-descripcion">{dimension.descripcion}</p>
              <h3 className="modulo-tendencias__panel-subtitulo">
                {dimension.tendencias.length === 1
                  ? 'Tendencia de esta dimensión'
                  : 'Tendencias de esta dimensión'}
              </h3>
              <ul className="modulo-tendencias__accesos">
                {dimension.tendencias.map((idTendencia) => (
                  <li key={idTendencia}>
                    <button
                      type="button"
                      className="modulo-tendencias__acceso"
                      onClick={() => onNavegar(idTendencia)}
                    >
                      {etiquetaTendencia(idTendencia)}
                      <span className="modulo-tendencias__acceso-flecha" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h2 className="modulo-tendencias__panel-titulo">Recorra el marco</h2>
              <p className="modulo-tendencias__panel-descripcion">
                Seleccione una dimensión del panal — política, económica, social, tecnológica,
                ecológica o legal — para ver aquí su descripción y los accesos directos a las
                tendencias que agrupa.
              </p>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

export default ModuloTendencias;
