/**
 * ModuloFactoresCambio — Eje "Factores de cambio".
 *
 * Presenta el modelo prospectivo del Observatorio con contenido FIJO en
 * el código (`src/data/factores-cambio.js`, igual que las
 * tendencias-artículo) en dos disposiciones según el ancho:
 *
 *  - Escritorio (≥1100 px): una LÍNEA DE MIGAS informativa sobre la
 *    rejilla ("Dimensión: … › Componente estratégico: … › Factor: …",
 *    ajuste del cliente 2026-09-19: dice en qué punto del modelo se está;
 *    sin selección muestra los tres niveles a secas y en anchos justos el
 *    rótulo pasa a "Componente" por CSS para no superar un renglón), la
 *    rueda interactiva (RuedaFactores) a la izquierda y el panel de
 *    detalle a la derecha, pegajoso bajo la cabecera con desplazamiento interior (el
 *    patrón de la tabla de contenido). Al elegir un elemento, el panel
 *    muestra su texto — la ruta dimensión › componente como texto
 *    informativo y, para los factores, la tipificación, el resumen y la
 *    descripción del anexo del cliente. El panel es SOLO descriptivo, sin
 *    fichas ni listas navegables (ajuste del cliente 2026-09-19): se
 *    navega desde la rueda — y, si es un factor, bajo la
 *    rejilla se abre a ancho completo su CARACTERIZACIÓN prospectiva
 *    (CaracterizacionFactor: pasado, presente y futuro por agrupación
 *    regional, síntesis y fuentes), con un botón en el panel que lleva a
 *    ella.
 *  - Pantallas angostas (<1100 px): la rueda NO se muestra (ajuste del
 *    cliente: escalada deja de ser legible y la navegación
 *    rueda→panel resultaba confusa). En su lugar, la jerarquía completa
 *    se presenta como un ACORDEÓN de tres niveles — dimensión →
 *    componente → factor, el patrón de la Línea de tiempo — donde cada
 *    elemento despliega su texto EN EL SITIO: los factores incluyen su
 *    caracterización en la variante compacta. Plegado, solo las cinco
 *    dimensiones están en el orden de tabulación.
 *
 * La caracterización (340 KB de texto) viaja en un fragmento DIFERIDO
 * (`caracterizacion-factores.js`) que se importa al montar el módulo: la
 * rueda y el catálogo base pintan primero y el texto llega en segundo
 * plano; si aún no está al elegir un factor, se muestra el cargador. La
 * agrupación regional elegida se conserva al cambiar de factor.
 */
import { useEffect, useId, useRef, useState } from 'react';
import Cargador from '../../components/Cargador/Cargador.jsx';
import CaracterizacionFactor from './CaracterizacionFactor.jsx';
import RuedaFactores from './RuedaFactores.jsx';
import { DIMENSIONES_FACTORES, NOMBRES_TIPO, TOTAL_COMPONENTES, TOTAL_FACTORES, resolverNodo } from '../../data/factores-cambio.js';
import './modulo-factores-cambio.css';

/* Concordancia del anuncio para lectores de pantalla. */
const PARTICIPIO_TIPO = {
  dimension: 'seleccionada',
  componente: 'seleccionado',
  factor: 'seleccionado',
};

/* Agrupación regional con la que abre la caracterización: la del
   territorio del Observatorio. */
const REGION_INICIAL = 'antioquia';

/* Id del título de la sección de caracterización (destino del botón del
   panel y del foco). */
const ID_TITULO_CARACTERIZACION = 'titulo-caracterizacion-factor';

/* Carga diferida del catálogo de caracterización: una sola promesa por
   sesión; un fallo la libera para poder reintentar. */
let promesaCatalogo = null;
function cargarCatalogoCaracterizacion() {
  if (!promesaCatalogo) {
    promesaCatalogo = import('../../data/caracterizacion-factores.js').catch((error) => {
      promesaCatalogo = null;
      throw error;
    });
  }
  return promesaCatalogo;
}

/* Etiqueta de tipificación del factor (tipo + justificación del anexo). */
function Tipificacion({ tipificacion }) {
  return (
    <p className="modulo-factores-cambio__tipificacion">
      <span className="modulo-factores-cambio__tipificacion-chip">{tipificacion.tipo}</span>
      <span className="modulo-factores-cambio__tipificacion-texto">{tipificacion.justificacion}</span>
    </p>
  );
}

/* Estado de la caracterización cuando el catálogo aún no está: cargador
   o aviso de error con reintento (regla del portal). */
function EstadoCaracterizacion({ contexto, compacto = false }) {
  if (contexto.errorCatalogo) {
    return (
      <div className="modulo-factores-cambio__aviso" role="alert">
        <p>No fue posible cargar la caracterización del factor.</p>
        <button
          type="button"
          className="modulo-factores-cambio__reintentar"
          onClick={contexto.onReintentar}
        >
          Reintentar
        </button>
      </div>
    );
  }
  return (
    <Cargador
      mensaje="Cargando la caracterización…"
      tamano={compacto ? 'pequeno' : 'mediano'}
      enBloque={!compacto}
    />
  );
}

/* Línea de migas de la selección, sobre la rejilla: dimensión ›
   componente › factor del elemento elegido en la rueda, hasta el nivel
   seleccionado; sin selección, los tres niveles a secas. Es informativa
   (texto, sin navegación). El rótulo del componente lleva una variante
   corta que el CSS muestra en anchos justos, para que la línea nunca pase
   de un renglón. */
function MigasSeleccion({ seleccion }) {
  const niveles = [
    { rotulo: 'Dimensión', valor: seleccion?.dimension.nombre },
    {
      rotulo: 'Componente estratégico',
      corto: 'Componente',
      valor: seleccion?.componente?.nombre,
    },
    { rotulo: 'Factor', valor: seleccion?.tipo === 'factor' ? seleccion.nodo.nombre : undefined },
  ];
  /* Con selección se muestran solo los niveles hasta el elegido. */
  const visibles = seleccion ? niveles.filter((nivel) => nivel.valor) : niveles;

  return (
    <p className="modulo-factores-cambio__migas" aria-label="Ubicación en el modelo">
      {visibles.map((nivel, indice) => (
        <span key={nivel.rotulo} className="modulo-factores-cambio__migas-nivel">
          {indice > 0 && (
            <span className="modulo-factores-cambio__migas-separador" aria-hidden="true">
              ›
            </span>
          )}
          {nivel.corto ? (
            <>
              <span className="modulo-factores-cambio__migas-rotulo--largo">{nivel.rotulo}</span>
              <span className="modulo-factores-cambio__migas-rotulo--corto">{nivel.corto}</span>
            </>
          ) : (
            nivel.rotulo
          )}
          {nivel.valor && (
            <>
              : <span className="modulo-factores-cambio__migas-valor">{nivel.valor}</span>
            </>
          )}
        </span>
      ))}
    </p>
  );
}

/* Contenido del panel según el tipo de elemento seleccionado: solo
   descripción (la navegación es de la rueda). */
function DetalleSeleccion({ seleccion, contexto, onVerCaracterizacion }) {
  const { tipo, nodo, dimension, componente } = seleccion;
  const caracterizacion = tipo === 'factor' ? contexto.catalogo?.CARACTERIZACION_FACTORES[nodo.id] : null;

  return (
    <>
      <p className="modulo-factores-cambio__panel-contexto">{NOMBRES_TIPO[tipo]}</p>
      <h2 className="modulo-factores-cambio__panel-titulo">{nodo.nombre}</h2>

      {caracterizacion && <Tipificacion tipificacion={caracterizacion.tipificacion} />}

      {/* Ruta del elemento dentro del modelo: texto informativo, no
          navegable (el punto lleva el color de la dimensión) */}
      {tipo !== 'dimension' && (
        <p className="modulo-factores-cambio__ruta">
          <span className="modulo-factores-cambio__ruta-nodo">
            <span
              className={`modulo-factores-cambio__punto modulo-factores-cambio__punto--${dimension.id}`}
              aria-hidden="true"
            />
            {dimension.nombre}
          </span>
          {tipo === 'factor' && (
            <>
              <span className="modulo-factores-cambio__ruta-separador" aria-hidden="true">
                ›
              </span>
              <span className="modulo-factores-cambio__ruta-nodo">{componente.nombre}</span>
            </>
          )}
        </p>
      )}

      {tipo === 'factor' ? (
        <>
          <p className="modulo-factores-cambio__resumen">{nodo.resumen}</p>
          <p className="modulo-factores-cambio__descripcion">{nodo.descripcion}</p>
          {/* La caracterización vive bajo la rejilla, a ancho completo:
              el botón lleva hasta ella y deja el foco en su título. */}
          <button
            type="button"
            className="modulo-factores-cambio__ver-caracterizacion"
            onClick={onVerCaracterizacion}
          >
            Ver la caracterización
            <span className="modulo-factores-cambio__ver-caracterizacion-flecha" aria-hidden="true">
              ↓
            </span>
          </button>
        </>
      ) : (
        <p className="modulo-factores-cambio__descripcion">{nodo.definicion}</p>
      )}
    </>
  );
}

/* ── Acordeón de pantallas angostas ──────────────────────────────────
   Patrón de la Línea de tiempo: el encabezado conserva su jerarquía
   (h2/h3/h4) y el botón interior abre y cierra; el contenido plegado no
   se renderiza, así que no entra al orden de tabulación. Cada
   desplegable es independiente (varios pueden quedar abiertos). El
   `contexto` (catálogo de caracterización, agrupación elegida y sus
   manejadores) baja por los tres niveles hasta el factor. */

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

function AcordeonFactor({ factor, contexto }) {
  const [abierto, setAbierto] = useState(false);
  const idContenido = useId();
  const caracterizacion = contexto.catalogo?.CARACTERIZACION_FACTORES[factor.id];

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
          {caracterizacion && <Tipificacion tipificacion={caracterizacion.tipificacion} />}
          <p className="modulo-factores-cambio__resumen">{factor.resumen}</p>
          <p className="modulo-factores-cambio__descripcion">{factor.descripcion}</p>
          <h5 className="modulo-factores-cambio__acordeon-subtitulo">Caracterización prospectiva</h5>
          {contexto.catalogo ? (
            <CaracterizacionFactor
              catalogo={contexto.catalogo}
              factorId={factor.id}
              regionId={contexto.regionId}
              onCambiarRegion={contexto.onCambiarRegion}
              compacta
            />
          ) : (
            <EstadoCaracterizacion contexto={contexto} compacto />
          )}
        </div>
      )}
    </li>
  );
}

function AcordeonComponente({ componente, contexto }) {
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
              <AcordeonFactor key={factor.id} factor={factor} contexto={contexto} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function AcordeonDimension({ dimension, contexto }) {
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
            <AcordeonComponente key={componente.id} componente={componente} contexto={contexto} />
          ))}
        </div>
      )}
    </div>
  );
}

function ModuloFactoresCambio() {
  const [seleccionId, setSeleccionId] = useState(null);
  const [regionId, setRegionId] = useState(REGION_INICIAL);
  const [catalogo, setCatalogo] = useState(null);
  const [errorCatalogo, setErrorCatalogo] = useState(false);
  const [reintentosCatalogo, setReintentosCatalogo] = useState(0);
  const panelRef = useRef(null);
  const raizRef = useRef(null);

  const seleccion = resolverNodo(seleccionId);

  /* Catálogo de caracterización, diferido: se pide al montar (o al
     reintentar) para que esté listo antes del primer clic en un factor. */
  useEffect(() => {
    let vigente = true;
    cargarCatalogoCaracterizacion()
      .then((modulo) => {
        if (vigente) setCatalogo(modulo);
      })
      .catch(() => {
        if (vigente) setErrorCatalogo(true);
      });
    return () => {
      vigente = false;
    };
  }, [reintentosCatalogo]);

  const reintentarCatalogo = () => {
    setErrorCatalogo(false);
    setReintentosCatalogo((total) => total + 1);
  };

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

  /* Al cambiar la selección (solo ocurre en escritorio: la rueda es su
     único disparador) el panel vuelve al inicio de su desplazamiento
     interior, que conservaría la posición del detalle anterior. */
  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
  }, [seleccionId]);

  const manejarSeleccion = (id) => {
    setSeleccionId((previa) => (previa === id ? null : id));
  };

  /* Desplaza a la sección de caracterización descontando la cabecera
     fija y deja el foco en su título (suave salvo movimiento reducido). */
  const irACaracterizacion = () => {
    const titulo = document.getElementById(ID_TITULO_CARACTERIZACION);
    if (!titulo) return;
    const cabecera = document.querySelector('.header');
    const margen = (cabecera?.offsetHeight ?? 0) + 24;
    const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: titulo.getBoundingClientRect().top + window.scrollY - margen,
      behavior: prefiereQuieto ? 'auto' : 'smooth',
    });
    titulo.focus({ preventScroll: true });
  };

  const contexto = {
    catalogo,
    regionId,
    onCambiarRegion: setRegionId,
    errorCatalogo,
    onReintentar: reintentarCatalogo,
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

      {/* Línea de migas: en qué punto del modelo se está (solo
          escritorio, donde la selección es de la rueda) */}
      <MigasSeleccion seleccion={seleccion} />

      <div className="modulo-factores-cambio__contenido">
        <div className="modulo-factores-cambio__columna-rueda">
          {/* Rueda: solo en escritorio; en angosto la rueda escalada no
              es legible y el acordeón la reemplaza */}
          <div className="modulo-factores-cambio__grafica">
            <RuedaFactores seleccionId={seleccionId} onSeleccionar={manejarSeleccion} />
          </div>

          {/* Acordeón de pantallas angostas: dimensión → componente →
              factor, con el texto desplegándose en el sitio */}
          <div className="modulo-factores-cambio__acordeon">
            {DIMENSIONES_FACTORES.map((dimension) => (
              <AcordeonDimension key={dimension.id} dimension={dimension} contexto={contexto} />
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
            <DetalleSeleccion
              seleccion={seleccion}
              contexto={contexto}
              onVerCaracterizacion={irACaracterizacion}
            />
          ) : (
            <div className="modulo-factores-cambio__panel-vacio">
              <h2 className="modulo-factores-cambio__panel-titulo">Recorra el modelo</h2>
              <p className="modulo-factores-cambio__descripcion">
                Seleccione un elemento de la rueda para ver aquí su detalle: las dimensiones del
                anillo interior y los componentes estratégicos de la banda intermedia muestran su
                definición; los factores de cambio del anillo exterior, su resumen y su
                descripción, y debajo de la rueda su caracterización prospectiva.
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* Caracterización del factor elegido, a ancho completo bajo la
          rejilla (solo escritorio: en angosto va dentro del acordeón) */}
      {seleccion?.tipo === 'factor' && (
        <section
          className="modulo-factores-cambio__caracterizacion"
          aria-labelledby={ID_TITULO_CARACTERIZACION}
        >
          <p className="modulo-factores-cambio__panel-contexto">Caracterización prospectiva</p>
          <h2
            id={ID_TITULO_CARACTERIZACION}
            className="modulo-factores-cambio__caracterizacion-titulo"
            tabIndex={-1}
          >
            {seleccion.nodo.nombre}
          </h2>
          <p className="modulo-factores-cambio__caracterizacion-ayuda">
            Pasado, presente y futuro del factor según la agrupación regional elegida.
          </p>
          {catalogo ? (
            <CaracterizacionFactor
              catalogo={catalogo}
              factorId={seleccion.nodo.id}
              regionId={regionId}
              onCambiarRegion={setRegionId}
            />
          ) : (
            <EstadoCaracterizacion contexto={contexto} />
          )}
        </section>
      )}

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
