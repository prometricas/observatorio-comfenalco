/**
 * ModuloFactoresCambio — Eje "Factores de cambio".
 *
 * Presenta el modelo prospectivo del Observatorio con contenido FIJO en
 * el código (`src/data/factores-cambio.js`, igual que las
 * tendencias-artículo) en dos disposiciones según el ancho:
 *
 *  - Escritorio (≥1100 px): rueda interactiva (RuedaFactores) a la
 *    izquierda y panel de detalle a la derecha, pegajoso bajo la
 *    cabecera con desplazamiento interior (el patrón de la tabla de
 *    contenido). Al elegir un elemento, el panel muestra su texto — para
 *    los factores, el resumen y la descripción del anexo del cliente.
 *  - Pantallas angostas (<1100 px): la rueda NO se muestra (ajuste del
 *    cliente: escalada deja de ser legible y la navegación
 *    rueda→panel resultaba confusa). En su lugar, la jerarquía completa
 *    se presenta como un ACORDEÓN de tres niveles — dimensión →
 *    componente → factor, el patrón de la Línea de tiempo — donde cada
 *    elemento despliega su texto EN EL SITIO: sin saltos de vista ni
 *    panel aparte. Plegado, solo las cinco dimensiones están en el
 *    orden de tabulación.
 */
import { useEffect, useId, useRef, useState } from 'react';
import RuedaFactores from './RuedaFactores.jsx';
import {
  DIMENSIONES_FACTORES,
  NOMBRES_TIPO,
  TOTAL_COMPONENTES,
  TOTAL_FACTORES,
  resolverNodo,
} from '../../data/factores-cambio.js';
import './modulo-factores-cambio.css';

/* Concordancia del anuncio para lectores de pantalla. */
const PARTICIPIO_TIPO = {
  dimension: 'seleccionada',
  componente: 'seleccionado',
  factor: 'seleccionado',
};

/* Ficha de contexto (dimensión o componente) dentro del panel: navega a
   ese elemento del modelo sin volver a la rueda. */
function FichaNodo({ id, nombre, idDimension, onSeleccionar }) {
  return (
    <button
      type="button"
      className="modulo-factores-cambio__ficha"
      onClick={() => onSeleccionar(id)}
    >
      <span
        className={`modulo-factores-cambio__punto modulo-factores-cambio__punto--${idDimension}`}
        aria-hidden="true"
      />
      {nombre}
    </button>
  );
}

/* Contenido del panel según el tipo de elemento seleccionado. */
function DetalleSeleccion({ seleccion, onSeleccionar }) {
  const { tipo, nodo, dimension, componente } = seleccion;

  return (
    <>
      <p className="modulo-factores-cambio__panel-contexto">
        {NOMBRES_TIPO[tipo]}{' '}
        {tipo === 'dimension' && `${nodo.nro} de ${DIMENSIONES_FACTORES.length}`}
        {tipo === 'componente' && `${nodo.nro} de ${TOTAL_COMPONENTES}`}
        {tipo === 'factor' && `${nodo.nro} de ${TOTAL_FACTORES}`}
      </p>
      {/* Enfocable por código: recibe el foco cuando la activación de una
          ficha desmonta el botón que lo tenía (ver el efecto del módulo). */}
      <h2 className="modulo-factores-cambio__panel-titulo" tabIndex={-1}>
        {nodo.nombre}
      </h2>

      {/* Ruta del elemento dentro del modelo (fichas navegables) */}
      {tipo !== 'dimension' && (
        <p className="modulo-factores-cambio__ruta">
          <FichaNodo
            id={dimension.id}
            nombre={dimension.nombre}
            idDimension={dimension.id}
            onSeleccionar={onSeleccionar}
          />
          {tipo === 'factor' && (
            <>
              <span className="modulo-factores-cambio__ruta-separador" aria-hidden="true">
                ›
              </span>
              <FichaNodo
                id={componente.id}
                nombre={componente.nombre}
                idDimension={dimension.id}
                onSeleccionar={onSeleccionar}
              />
            </>
          )}
        </p>
      )}

      {tipo === 'factor' ? (
        <>
          <p className="modulo-factores-cambio__resumen">{nodo.resumen}</p>
          <p className="modulo-factores-cambio__descripcion">{nodo.descripcion}</p>
        </>
      ) : (
        <p className="modulo-factores-cambio__descripcion">{nodo.definicion}</p>
      )}

      {/* Descendientes navegables del elemento elegido */}
      {tipo === 'dimension' && (
        <>
          <h3 className="modulo-factores-cambio__panel-subtitulo">
            Componentes estratégicos de esta dimensión
          </h3>
          <ul className="modulo-factores-cambio__fichas">
            {nodo.componentes.map((componenteHijo) => (
              <li key={componenteHijo.id}>
                <FichaNodo
                  id={componenteHijo.id}
                  nombre={componenteHijo.nombre}
                  idDimension={nodo.id}
                  onSeleccionar={onSeleccionar}
                />
              </li>
            ))}
          </ul>
        </>
      )}
      {tipo === 'componente' && (
        <>
          <h3 className="modulo-factores-cambio__panel-subtitulo">
            Factores de cambio de este componente
          </h3>
          <ul className="modulo-factores-cambio__fichas">
            {nodo.factores.map((factorHijo) => (
              <li key={factorHijo.id}>
                <FichaNodo
                  id={factorHijo.id}
                  nombre={`${factorHijo.nro}. ${factorHijo.nombre}`}
                  idDimension={dimension.id}
                  onSeleccionar={onSeleccionar}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

/* ── Acordeón de pantallas angostas ──────────────────────────────────
   Patrón de la Línea de tiempo: el encabezado conserva su jerarquía
   (h2/h3/h4) y el botón interior abre y cierra; el contenido plegado no
   se renderiza, así que no entra al orden de tabulación. Cada
   desplegable es independiente (varios pueden quedar abiertos). */

function Cheuron({ abierto }) {
  return (
    <span
      className={`modulo-factores-cambio__acordeon-cheuron${
        abierto ? ' modulo-factores-cambio__acordeon-cheuron--abierto' : ''
      }`}
      aria-hidden="true"
    />
  );
}

function AcordeonFactor({ factor }) {
  const [abierto, setAbierto] = useState(false);
  const idContenido = useId();

  return (
    <li className="modulo-factores-cambio__acordeon-factor">
      <h4 className="modulo-factores-cambio__acordeon-titulo">
        <button
          type="button"
          className="modulo-factores-cambio__acordeon-boton modulo-factores-cambio__acordeon-boton--factor"
          aria-expanded={abierto}
          aria-controls={idContenido}
          onClick={() => setAbierto((estado) => !estado)}
        >
          <span className="modulo-factores-cambio__acordeon-rotulo">
            {factor.nro}. {factor.nombre}
          </span>
          <Cheuron abierto={abierto} />
        </button>
      </h4>
      {abierto && (
        <div id={idContenido} className="modulo-factores-cambio__acordeon-detalle">
          <p className="modulo-factores-cambio__resumen">{factor.resumen}</p>
          <p className="modulo-factores-cambio__descripcion">{factor.descripcion}</p>
        </div>
      )}
    </li>
  );
}

function AcordeonComponente({ componente }) {
  const [abierto, setAbierto] = useState(false);
  const idContenido = useId();

  return (
    <div className="modulo-factores-cambio__acordeon-componente">
      <h3 className="modulo-factores-cambio__acordeon-titulo">
        <button
          type="button"
          className="modulo-factores-cambio__acordeon-boton modulo-factores-cambio__acordeon-boton--componente"
          aria-expanded={abierto}
          aria-controls={idContenido}
          onClick={() => setAbierto((estado) => !estado)}
        >
          <span className="modulo-factores-cambio__acordeon-rotulo">{componente.nombre}</span>
          <Cheuron abierto={abierto} />
        </button>
      </h3>
      {abierto && (
        <div id={idContenido} className="modulo-factores-cambio__acordeon-cuerpo">
          <p className="modulo-factores-cambio__acordeon-definicion">{componente.definicion}</p>
          <ul className="modulo-factores-cambio__acordeon-factores">
            {componente.factores.map((factor) => (
              <AcordeonFactor key={factor.id} factor={factor} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function AcordeonDimension({ dimension }) {
  const [abierta, setAbierta] = useState(false);
  const idContenido = useId();

  return (
    <div className="modulo-factores-cambio__acordeon-grupo">
      <h2 className="modulo-factores-cambio__acordeon-titulo">
        <button
          type="button"
          className="modulo-factores-cambio__acordeon-boton modulo-factores-cambio__acordeon-boton--dimension"
          aria-expanded={abierta}
          aria-controls={idContenido}
          onClick={() => setAbierta((estado) => !estado)}
        >
          <span
            className={`modulo-factores-cambio__punto modulo-factores-cambio__punto--${dimension.id}`}
            aria-hidden="true"
          />
          <span className="modulo-factores-cambio__acordeon-rotulo">{dimension.nombre}</span>
          <Cheuron abierto={abierta} />
        </button>
      </h2>
      {abierta && (
        <div id={idContenido} className="modulo-factores-cambio__acordeon-despliegue">
          <p className="modulo-factores-cambio__acordeon-definicion">{dimension.definicion}</p>
          {dimension.componentes.map((componente) => (
            <AcordeonComponente key={componente.id} componente={componente} />
          ))}
        </div>
      )}
    </div>
  );
}

function ModuloFactoresCambio() {
  const [seleccionId, setSeleccionId] = useState(null);
  const panelRef = useRef(null);
  const raizRef = useRef(null);

  const seleccion = resolverNodo(seleccionId);

  /* Altura real de la cabecera pegajosa, para anclar el panel de
     escritorio (mismo patrón de la tabla de contenido). */
  useEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return undefined;
    const medir = () => {
      const cabecera = document.querySelector('.header');
      raiz.style.setProperty('--alto-cabecera', `${(cabecera?.offsetHeight ?? 0) + 16}px`);
    };
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, []);

  /* Al cambiar la selección (solo ocurre en escritorio: la rueda y las
     fichas son sus únicos disparadores): (1) el panel vuelve al inicio
     de su desplazamiento interior, que conservaría la posición del
     detalle anterior; (2) si la activación desmontó el botón que tenía
     el foco (las fichas del panel se reemplazan al navegar), el foco
     pasa al título del detalle para que Tab continúe allí. */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.scrollTop = 0;
    if (seleccionId && document.activeElement === document.body) {
      panel
        .querySelector('.modulo-factores-cambio__panel-titulo')
        ?.focus({ preventScroll: true });
    }
  }, [seleccionId]);

  const manejarSeleccion = (id) => {
    setSeleccionId((previa) => (previa === id ? null : id));
  };

  return (
    <section
      ref={raizRef}
      className="modulo-factores-cambio"
      aria-labelledby="titulo-factores-cambio"
    >
      <header className="modulo-factores-cambio__encabezado">
        <p className="modulo-factores-cambio__contexto">Ejes temáticos</p>
        <h1 id="titulo-factores-cambio" className="modulo-factores-cambio__titulo">
          Factores de cambio
        </h1>
        <p className="modulo-factores-cambio__descripcion-eje">
          Fuerzas que impulsan transformaciones en el entorno social y económico. El modelo del
          Observatorio las organiza en {DIMENSIONES_FACTORES.length} dimensiones,{' '}
          {TOTAL_COMPONENTES} componentes estratégicos y {TOTAL_FACTORES} factores de cambio:
          recorra el modelo y elija cualquier elemento para conocer su detalle.
        </p>
      </header>

      <div className="modulo-factores-cambio__contenido">
        <div className="modulo-factores-cambio__columna-rueda">
          {/* Rueda + leyenda: solo en escritorio (en angosto la rueda
              escalada no es legible y el acordeón la reemplaza) */}
          <div className="modulo-factores-cambio__grafica">
            <RuedaFactores seleccionId={seleccionId} onSeleccionar={manejarSeleccion} />
            <p className="modulo-factores-cambio__leyenda">
              Anillo interior: <strong>dimensiones</strong> · banda intermedia:{' '}
              <strong>componentes estratégicos</strong> · anillo exterior:{' '}
              <strong>factores de cambio</strong>.
            </p>
          </div>

          {/* Acordeón de pantallas angostas: dimensión → componente →
              factor, con el texto desplegándose en el sitio */}
          <div className="modulo-factores-cambio__acordeon">
            {DIMENSIONES_FACTORES.map((dimension) => (
              <AcordeonDimension key={dimension.id} dimension={dimension} />
            ))}
          </div>
        </div>

        {/* Panel de detalle del elemento seleccionado (solo escritorio) */}
        <aside
          ref={panelRef}
          className="modulo-factores-cambio__panel"
          aria-label="Detalle del elemento seleccionado"
        >
          {seleccion ? (
            <DetalleSeleccion seleccion={seleccion} onSeleccionar={manejarSeleccion} />
          ) : (
            <div className="modulo-factores-cambio__panel-vacio">
              <h2 className="modulo-factores-cambio__panel-titulo">Recorra el modelo</h2>
              <p className="modulo-factores-cambio__descripcion">
                Seleccione un elemento de la rueda para ver aquí su detalle: las dimensiones del
                anillo interior y los componentes estratégicos de la banda intermedia muestran su
                definición; los factores de cambio del anillo exterior, su resumen y su
                descripción.
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* Anuncio de la selección para lectores de pantalla */}
      <p className="oculto-accesible" aria-live="polite">
        {seleccion
          ? `${NOMBRES_TIPO[seleccion.tipo]} ${PARTICIPIO_TIPO[seleccion.tipo]}: ${seleccion.nodo.nombre}`
          : ''}
      </p>
    </section>
  );
}

export default ModuloFactoresCambio;
