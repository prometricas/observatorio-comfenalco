/**
 * ModuloFactoresCambio — Eje "Factores de cambio".
 *
 * Presenta el modelo prospectivo del Observatorio como una rueda
 * interactiva (RuedaFactores) acompañada de un panel de detalle: al
 * elegir una dimensión, un componente estratégico o un factor de cambio,
 * el panel muestra su texto — para los factores, el resumen y la
 * descripción del anexo del cliente, con contenido FIJO en el código
 * (`src/data/factores-cambio.js`), igual que las tendencias-artículo.
 *
 * Disposición: en escritorio la rueda queda a la izquierda y el panel a
 * la derecha, pegajoso bajo la cabecera con desplazamiento interior (el
 * patrón de la tabla de contenido). En pantallas angostas los rótulos de
 * los factores no serían legibles dentro de la rueda, así que debajo de
 * ella aparece la jerarquía COMPLETA (dimensiones, componentes y
 * factores) como lista de botones de 44 px y el panel pasa al final; al
 * elegir, la vista baja hasta el panel y el foco pasa a su título.
 */
import { useEffect, useRef, useState } from 'react';
import RuedaFactores from './RuedaFactores.jsx';
import {
  DIMENSIONES_FACTORES,
  NOMBRES_TIPO,
  TOTAL_COMPONENTES,
  TOTAL_FACTORES,
  resolverNodo,
} from '../../data/factores-cambio.js';
import './modulo-factores-cambio.css';

/* Umbral de la disposición angosta; debe coincidir con el CSS. Coincide
   con el de la tabla de contenido: por debajo, la rueda no tendría ancho
   para rótulos legibles junto al panel. */
const ANCHO_ESCRITORIO = 1100;

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

function ModuloFactoresCambio() {
  const [seleccionId, setSeleccionId] = useState(null);
  const panelRef = useRef(null);
  const raizRef = useRef(null);

  const seleccion = resolverNodo(seleccionId);

  /* Altura real de la cabecera pegajosa, para anclar el panel en
     escritorio y descontarla al desplazarse hasta él en angosto (mismo
     patrón de la tabla de contenido de los artículos). */
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

  /* Al cambiar la selección: (1) el panel vuelve al inicio de su
     desplazamiento interior (en escritorio es el contenedor de scroll y
     conservaría la posición del detalle anterior, mostrando el nuevo a
     media lectura); (2) si la activación desmontó el botón que tenía el
     foco (las fichas del panel se reemplazan al navegar) o estamos en la
     disposición angosta (el panel queda lejos del control usado), el
     foco pasa al título del detalle para que Tab continúe allí. */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.scrollTop = 0;
    if (
      seleccionId &&
      (document.activeElement === document.body || window.innerWidth < ANCHO_ESCRITORIO)
    ) {
      panel
        .querySelector('.modulo-factores-cambio__panel-titulo')
        ?.focus({ preventScroll: true });
    }
  }, [seleccionId]);

  const manejarSeleccion = (id) => {
    const siguiente = seleccionId === id ? null : id;
    setSeleccionId(siguiente);

    /* En la disposición angosta el panel queda debajo de la lista: al
       elegir, la vista baja hasta el detalle (suave salvo con movimiento
       reducido; scroll-margin-top descuenta la cabecera). */
    if (siguiente && window.innerWidth < ANCHO_ESCRITORIO) {
      const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      panelRef.current?.scrollIntoView({
        behavior: prefiereQuieto ? 'auto' : 'smooth',
        block: 'start',
      });
    }
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
          recorra la rueda y elija cualquier elemento para conocer su detalle.
        </p>
      </header>

      <div className="modulo-factores-cambio__contenido">
        <div className="modulo-factores-cambio__columna-rueda">
          <RuedaFactores seleccionId={seleccionId} onSeleccionar={manejarSeleccion} />
          <p className="modulo-factores-cambio__leyenda">
            Anillo interior: <strong>dimensiones</strong> · banda intermedia:{' '}
            <strong>componentes estratégicos</strong> · anillo exterior:{' '}
            <strong>factores de cambio</strong>.
          </p>

          {/* Selector en lista para pantallas angostas (los rótulos del
              anillo exterior no serían legibles a ese tamaño). Incluye
              los COMPONENTES: en la rueda su banda queda de ~15 px al
              escalar, muy por debajo del objetivo táctil mínimo, así que
              la lista es su control equivalente de 44 px. */}
          <nav className="modulo-factores-cambio__lista" aria-label="Modelo de factores de cambio por dimensión">
            {DIMENSIONES_FACTORES.map((dimension) => (
              <div key={dimension.id} className="modulo-factores-cambio__lista-grupo">
                <button
                  type="button"
                  className={`modulo-factores-cambio__lista-dimension${
                    seleccionId === dimension.id
                      ? ' modulo-factores-cambio__lista-dimension--activa'
                      : ''
                  }`}
                  aria-pressed={seleccionId === dimension.id}
                  onClick={() => manejarSeleccion(dimension.id)}
                >
                  <span
                    className={`modulo-factores-cambio__punto modulo-factores-cambio__punto--${dimension.id}`}
                    aria-hidden="true"
                  />
                  {dimension.nombre}
                </button>
                {dimension.componentes.map((componente) => (
                  <div key={componente.id} className="modulo-factores-cambio__lista-subgrupo">
                    <button
                      type="button"
                      className={`modulo-factores-cambio__lista-componente${
                        seleccionId === componente.id
                          ? ' modulo-factores-cambio__lista-componente--activo'
                          : ''
                      }`}
                      aria-pressed={seleccionId === componente.id}
                      onClick={() => manejarSeleccion(componente.id)}
                    >
                      {componente.nombre}
                    </button>
                    <ul className="modulo-factores-cambio__lista-factores">
                      {componente.factores.map((factor) => (
                        <li key={factor.id}>
                          <button
                            type="button"
                            className={`modulo-factores-cambio__lista-factor${
                              seleccionId === factor.id
                                ? ' modulo-factores-cambio__lista-factor--activo'
                                : ''
                            }`}
                            aria-pressed={seleccionId === factor.id}
                            onClick={() => manejarSeleccion(factor.id)}
                          >
                            {factor.nro}. {factor.nombre}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </nav>
        </div>

        {/* Panel de detalle del elemento seleccionado */}
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
