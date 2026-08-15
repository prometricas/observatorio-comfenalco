/**
 * ModuloFelicidad — Indicador "Felicidad nacional bruta".
 *
 * Misma vista en banda completa del indicador de la OCDE, con CUATRO
 * gráficas del cuaderno "App_Felicidad_Nacional" alternadas por un
 * conmutador de botones (peticiones del cliente, 2026-08-12 y 14):
 *  1. "Índice y componentes": el explorador multiindicador (la leyenda es
 *     el selector de series).
 *  2. "Escenarios por indicador": histórico + tres escenarios simulados
 *     con banda del 95 % y trayectorias intermedias, con desplegable de
 *     indicador y dos casillas (trayectorias / tres escenarios).
 *  3. "Estructura del índice": radar de los cinco componentes, con
 *     desplegables de año y escenario.
 *  4. "Comparador de indicadores": de dos a tres series superpuestas
 *     (píldoras conmutables, una por indicador) con la referencia proxy
 *     OCDE opcional y actualización automática, sin el botón del
 *     cuaderno.
 * Las vistas prospectivas usan la simulación precalculada en la
 * estructura; si la base reemplazada no alcanza para simular, lo indican
 * sin romper la vista principal. El texto viene del documento propio del
 * indicador, no del resumen del eje.
 */
import { useEffect, useMemo, useState } from 'react';
import Cargador from '../../components/Cargador/Cargador.jsx';
import GraficaOcde from '../../components/GraficaOcde/GraficaOcde.jsx';
import SelectorCampo from '../../components/SelectorCampo/SelectorCampo.jsx';
import { rutaExcelIndicador } from '../../data/indicadores.js';
import { ESTADO_TEXTO, obtenerTextoIndicador } from '../../services/docxService.js';
import {
  ANIOS_RADAR_FNB,
  ESCENARIOS_FNB,
  MAXIMO_COMPARADOR_FNB,
  PROXY_OCDE_FNB,
  cargarBaseFelicidad,
  construirFiguraComparadorFnb,
  construirFiguraEscenariosFnb,
  construirFiguraFnb,
  construirFiguraRadarFnb,
  valorFnbEnAnio,
} from '../../services/felicidadService.js';
import './modulo-felicidad.css';

/* Estados de la carga de la base de datos. */
const ESTADO_DATOS = {
  CARGANDO: 'cargando',
  LISTO: 'listo',
  ERROR: 'error',
};

/* Estados de la carga del texto (además de los del servicio de textos). */
const ESTADO_CARGA_TEXTO = {
  CARGANDO: 'cargando',
  ERROR: 'error',
};

/* Las cuatro gráficas del módulo; el conmutador muestra una a la vez. */
const VISTAS_GRAFICA = [
  { id: 'componentes', etiqueta: 'Índice y componentes' },
  { id: 'escenarios', etiqueta: 'Escenarios por indicador' },
  { id: 'estructura', etiqueta: 'Estructura del índice' },
  { id: 'comparador', etiqueta: 'Comparador de indicadores' },
];

const SUBTITULOS_VISTA = {
  componentes: 'Índice y componentes',
  escenarios: 'Escenarios por indicador',
  estructura: 'Estructura del índice',
  comparador: 'Comparador de indicadores',
};

function ModuloFelicidad({ indicadorSeccion, config }) {
  /* ── Base de datos de la figura ────────────────────────────────── */
  const [estadoDatos, setEstadoDatos] = useState(ESTADO_DATOS.CARGANDO);
  const [datos, setDatos] = useState(null);
  const [reintentosDatos, setReintentosDatos] = useState(0);

  /* ── Gráfica visible y controles de las vistas prospectivas ────── */
  const [vistaGrafica, setVistaGrafica] = useState('componentes');
  const [campoEscenarios, setCampoEscenarios] = useState(null);
  const [mostrarTrayectorias, setMostrarTrayectorias] = useState(true);
  const [mostrarTresEscenarios, setMostrarTresEscenarios] = useState(true);
  const [anioRadar, setAnioRadar] = useState(2025);
  const [escenarioRadar, setEscenarioRadar] = useState('Tendencial');
  const [camposComparador, setCamposComparador] = useState(null);
  const [mostrarOcdeProxy, setMostrarOcdeProxy] = useState(false);

  /* ── Texto del indicador ───────────────────────────────────────── */
  const [texto, setTexto] = useState({ estado: ESTADO_CARGA_TEXTO.CARGANDO, titulo: null, parrafos: [] });
  const [reintentosTexto, setReintentosTexto] = useState(0);

  useEffect(() => {
    let vigente = true;
    cargarBaseFelicidad(rutaExcelIndicador(indicadorSeccion.slug, config.archivoExcel))
      .then((base) => {
        if (!vigente) return;
        /* La vista de escenarios abre con el índice compuesto; el
           comparador, con el índice y los dos primeros componentes. */
        setCampoEscenarios(
          (campo) => campo ?? base.series.find((serie) => serie.esIndice)?.campo ?? base.series[0]?.campo,
        );
        setCamposComparador(
          (campos) =>
            campos ??
            [
              base.series.find((serie) => serie.esIndice)?.campo,
              ...base.series.filter((serie) => !serie.esIndice).map((serie) => serie.campo),
            ]
              .filter(Boolean)
              .slice(0, MAXIMO_COMPARADOR_FNB),
        );
        setDatos(base);
        setEstadoDatos(ESTADO_DATOS.LISTO);
      })
      .catch(() => {
        if (vigente) setEstadoDatos(ESTADO_DATOS.ERROR);
      });
    return () => {
      vigente = false;
    };
  }, [indicadorSeccion.slug, config.archivoExcel, reintentosDatos]);

  /* El módulo se remonta por indicador (key en la App): el efecto solo se
     re-dispara al reintentar, y el botón repone el estado "cargando". */
  useEffect(() => {
    let vigente = true;
    obtenerTextoIndicador(indicadorSeccion.slug, config.archivoTexto)
      .then((resultado) => {
        if (vigente) setTexto(resultado);
      })
      .catch(() => {
        if (vigente) setTexto({ estado: ESTADO_CARGA_TEXTO.ERROR, titulo: null, parrafos: [] });
      });
    return () => {
      vigente = false;
    };
  }, [indicadorSeccion.slug, config.archivoTexto, reintentosTexto]);

  const figura = useMemo(() => (datos ? construirFiguraFnb(datos) : null), [datos]);

  /* Serie elegida en la vista de escenarios (respaldo al índice). */
  const serieEscenarios = useMemo(
    () => datos?.series.find((serie) => serie.campo === campoEscenarios) ?? null,
    [datos, campoEscenarios],
  );

  const figuraEscenarios = useMemo(
    () =>
      datos?.prospectiva && serieEscenarios
        ? construirFiguraEscenariosFnb(
            datos,
            serieEscenarios.campo,
            mostrarTrayectorias,
            mostrarTresEscenarios,
          )
        : null,
    [datos, serieEscenarios, mostrarTrayectorias, mostrarTresEscenarios],
  );

  /* Años consultables del radar: los hitos del cuaderno que la base
     realmente cubre. */
  const aniosRadar = useMemo(() => {
    if (!datos) return ANIOS_RADAR_FNB;
    return ANIOS_RADAR_FNB.filter((anio) => anio >= datos.anioMin && anio <= datos.anioMax);
  }, [datos]);

  /* Si una base reemplazada deja el año elegido fuera de los hitos
     disponibles, el radar cae al último año cubierto en lugar de
     dibujarse en ceros con el selector en blanco. */
  const anioRadarValido = aniosRadar.includes(anioRadar)
    ? anioRadar
    : (aniosRadar[aniosRadar.length - 1] ?? anioRadar);

  const figuraRadar = useMemo(
    () => (datos?.prospectiva ? construirFiguraRadarFnb(datos, anioRadarValido, escenarioRadar) : null),
    [datos, anioRadarValido, escenarioRadar],
  );

  /* Tabla accesible de la vista de escenarios. */
  const tablaEscenarios = useMemo(() => {
    if (!datos?.prospectiva || !serieEscenarios) return null;
    const prospectiva = datos.prospectiva.porCampo[serieEscenarios.campo];
    const filas = [
      ...serieEscenarios.historico.map((punto) => [
        punto.anio,
        punto.valor.toFixed(2),
        '—',
        '—',
        '—',
      ]),
      ...datos.prospectiva.aniosProyeccion.map((anio, posicion) => [
        anio,
        '—',
        valorFnbEnAnio(datos, serieEscenarios.campo, anio, 'Tendencial')?.toFixed(2) ?? '—',
        prospectiva.pesimista[posicion].toFixed(2),
        prospectiva.optimista[posicion].toFixed(2),
      ]),
    ];
    return {
      titulo: `${serieEscenarios.etiqueta}: serie histórica y escenarios tendencial, pesimista y optimista por año`,
      columnas: ['Año', 'Histórico', 'Tendencial', 'Pesimista', 'Optimista'],
      filas,
    };
  }, [datos, serieEscenarios]);

  /* Tabla accesible del radar: los componentes del año y escenario. */
  const tablaRadar = useMemo(() => {
    if (!datos?.prospectiva) return null;
    return {
      titulo: `Componentes del índice FNB adaptado en ${anioRadarValido}, escenario ${escenarioRadar.toLowerCase()}`,
      columnas: ['Componente', 'Valor'],
      filas: datos.series.map((serie) => [
        serie.etiqueta,
        valorFnbEnAnio(datos, serie.campo, anioRadarValido, escenarioRadar)?.toFixed(2) ?? '—',
      ]),
    };
  }, [datos, anioRadarValido, escenarioRadar]);

  /* Series elegidas del comparador (mínimo dos para dibujar). */
  const seriesComparador = useMemo(
    () =>
      datos && camposComparador
        ? datos.series.filter((serie) => camposComparador.includes(serie.campo))
        : [],
    [datos, camposComparador],
  );

  const figuraComparador = useMemo(
    () =>
      datos && seriesComparador.length >= 2
        ? construirFiguraComparadorFnb(
            datos,
            seriesComparador.map((serie) => serie.campo),
            mostrarOcdeProxy,
          )
        : null,
    [datos, seriesComparador, mostrarOcdeProxy],
  );

  /* Tabla accesible del comparador: años × indicadores elegidos. */
  const tablaComparador = useMemo(() => {
    if (!datos || seriesComparador.length < 2) return null;
    const porAnio = new Map();
    seriesComparador.forEach((serie) => {
      [...serie.historico, ...serie.tendencial.slice(1)].forEach((punto) => {
        if (!porAnio.has(punto.anio)) porAnio.set(punto.anio, {});
        porAnio.get(punto.anio)[serie.campo] = punto.valor.toFixed(2);
      });
    });
    const columnas = ['Año', ...seriesComparador.map((serie) => serie.etiqueta)];
    if (mostrarOcdeProxy) columnas.push('OCDE proxy');
    return {
      titulo: 'Comparación de indicadores por año: evolución histórica y tendencial',
      columnas,
      filas: [...porAnio.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([anio, valores]) => {
          const fila = [anio, ...seriesComparador.map((serie) => valores[serie.campo] ?? '—')];
          if (mostrarOcdeProxy) fila.push(PROXY_OCDE_FNB.toFixed(2));
          return fila;
        }),
    };
  }, [datos, seriesComparador, mostrarOcdeProxy]);

  /* Tabla accesible: todas las series por año, con su clasificación. */
  const tabla = useMemo(() => {
    if (!datos) return null;
    const porAnio = new Map();
    datos.series.forEach((serie) => {
      serie.historico.forEach((punto) => {
        if (!porAnio.has(punto.anio)) porAnio.set(punto.anio, { tipo: 'Histórico' });
        porAnio.get(punto.anio)[serie.campo] = punto.valor.toFixed(2);
      });
      serie.tendencial.forEach((punto) => {
        if (!porAnio.has(punto.anio)) porAnio.set(punto.anio, { tipo: 'Tendencial' });
        porAnio.get(punto.anio)[serie.campo] = punto.valor.toFixed(2);
      });
    });
    return {
      titulo:
        'Índice FNB adaptado y sus cinco componentes por año: serie histórica y escenario tendencial',
      columnas: ['Año', 'Serie', ...datos.series.map((serie) => serie.etiqueta)],
      filas: [...porAnio.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([anio, valores]) => [
          anio,
          valores.tipo,
          ...datos.series.map((serie) => valores[serie.campo] ?? '—'),
        ]),
    };
  }, [datos]);

  /* ── Panel de la gráfica según el estado de la base ────────────── */
  const renderizarPanelGrafica = () => {
    if (estadoDatos === ESTADO_DATOS.CARGANDO) {
      return <Cargador mensaje="Leyendo la base de datos del indicador…" tamano="grande" enBloque />;
    }
    if (estadoDatos === ESTADO_DATOS.ERROR) {
      return (
        <div className="modulo-felicidad__aviso" role="alert">
          <p>No fue posible leer la base de datos del indicador.</p>
          <button
            type="button"
            className="modulo-felicidad__reintentar"
            onClick={() => {
              setEstadoDatos(ESTADO_DATOS.CARGANDO);
              setReintentosDatos((total) => total + 1);
            }}
          >
            Reintentar
          </button>
        </div>
      );
    }
    /* Aviso común de las vistas prospectivas cuando la base reemplazada
       no alcanza para simular (celdas vacías o histórico muy corto). */
    const avisoSinProspectiva = (
      <p className="modulo-felicidad__aviso" role="status">
        La base publicada no permite construir los escenarios prospectivos;
        la vista "Índice y componentes" sigue disponible.
      </p>
    );

    return (
      <>
        {/* Conmutador de gráfica: una a la vez, a pedido del cliente */}
        <div className="modulo-felicidad__conmutador" role="group" aria-label="Gráfica mostrada">
          {VISTAS_GRAFICA.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              className={`modulo-felicidad__conmutador-boton${
                vistaGrafica === opcion.id ? ' modulo-felicidad__conmutador-boton--activo' : ''
              }`}
              aria-pressed={vistaGrafica === opcion.id}
              onClick={() => setVistaGrafica(opcion.id)}
            >
              {opcion.etiqueta}
            </button>
          ))}
        </div>

        {vistaGrafica === 'componentes' && (
          <>
            {/* La leyenda es el selector de series: se hace explícito porque
                esa interacción de Plotly no es evidente a primera vista. */}
            <p className="modulo-felicidad__ayuda">
              Pulse una serie en la leyenda para mostrarla u ocultarla; Salud y
              Resiliencia ecológica arrancan ocultas.
            </p>

            <GraficaOcde
              figura={figura}
              etiquetaAccesible="Índice FNB adaptado y sus componentes: serie histórica y escenario tendencial a 2050"
              tabla={tabla}
            />
          </>
        )}

        {vistaGrafica === 'escenarios' &&
          (figuraEscenarios ? (
            <>
              <div className="modulo-felicidad__controles">
                <SelectorCampo
                  etiqueta="Indicador"
                  valor={serieEscenarios.campo}
                  opciones={datos.series.map((serie) => ({
                    valor: serie.campo,
                    etiqueta: serie.etiqueta,
                  }))}
                  onCambiar={setCampoEscenarios}
                />
                {/* Casillas del cuaderno; la figura se actualiza al vuelo */}
                <div
                  className="modulo-felicidad__casillas"
                  role="group"
                  aria-label="Elementos visibles de la figura"
                >
                  <label className="modulo-felicidad__casilla">
                    <input
                      type="checkbox"
                      className="modulo-felicidad__casilla-control"
                      checked={mostrarTrayectorias}
                      onChange={(evento) => setMostrarTrayectorias(evento.target.checked)}
                    />
                    Mostrar trayectorias intermedias
                  </label>
                  <label className="modulo-felicidad__casilla">
                    <input
                      type="checkbox"
                      className="modulo-felicidad__casilla-control"
                      checked={mostrarTresEscenarios}
                      onChange={(evento) => setMostrarTresEscenarios(evento.target.checked)}
                    />
                    Mostrar los tres escenarios
                  </label>
                </div>
              </div>

              <GraficaOcde
                figura={figuraEscenarios}
                etiquetaAccesible={`${serieEscenarios.etiqueta}: serie histórica y escenarios prospectivos con banda simulada del 95 %`}
                tabla={tablaEscenarios}
              />

              <p className="modulo-felicidad__advertencia">
                Los escenarios pesimista y optimista, la banda del 95 % y las
                trayectorias intermedias son simulaciones estadísticas derivadas
                de la volatilidad histórica de los componentes; no son
                proyecciones oficiales. El histórico y el escenario tendencial
                provienen directamente de la base.
              </p>
            </>
          ) : (
            avisoSinProspectiva
          ))}

        {vistaGrafica === 'estructura' &&
          (figuraRadar ? (
            <>
              <div className="modulo-felicidad__controles">
                <SelectorCampo
                  etiqueta="Año"
                  valor={anioRadarValido}
                  opciones={aniosRadar}
                  onCambiar={(anio) => setAnioRadar(Number(anio))}
                />
                <SelectorCampo
                  etiqueta="Escenario"
                  valor={escenarioRadar}
                  opciones={ESCENARIOS_FNB}
                  onCambiar={setEscenarioRadar}
                />
              </div>

              <GraficaOcde
                figura={figuraRadar}
                etiquetaAccesible={`Estructura del índice FNB adaptado en ${anioRadarValido}: valor de cada componente en el escenario ${escenarioRadar.toLowerCase()}`}
                tabla={tablaRadar}
              />

              <p className="modulo-felicidad__advertencia">
                Hasta {datos.anioCorte} los valores son históricos y no cambian
                con el escenario; desde {datos.anioCorte + 1}, el tendencial
                proviene de la base y los escenarios alternativos son
                simulaciones estadísticas ilustrativas.
              </p>
            </>
          ) : (
            avisoSinProspectiva
          ))}

        {vistaGrafica === 'comparador' && (
          <>
            {/* Píldoras conmutables en lugar del selector múltiple
                (ajuste de experiencia de uso aprobado por el cliente,
                2026-08-14): con solo seis opciones y tope de tres, cada
                indicador se marca con un clic o un toque — sin Ctrl —
                con el mismo lenguaje visual del conmutador. Al llegar al
                tope, las píldoras restantes se deshabilitan hasta soltar
                una. */}
            <div className="modulo-felicidad__controles">
              <div className="modulo-felicidad__pildoras-campo">
                <span className="modulo-felicidad__pildoras-titulo" id="titulo-comparar-fnb">
                  Comparar
                </span>
                <div
                  className="modulo-felicidad__pildoras"
                  role="group"
                  aria-labelledby="titulo-comparar-fnb"
                >
                  {datos.series.map((serie) => {
                    const activa = camposComparador?.includes(serie.campo) ?? false;
                    const bloqueada =
                      !activa && (camposComparador?.length ?? 0) >= MAXIMO_COMPARADOR_FNB;
                    return (
                      <button
                        key={serie.campo}
                        type="button"
                        className={`modulo-felicidad__pildora${
                          activa ? ' modulo-felicidad__pildora--activa' : ''
                        }`}
                        aria-pressed={activa}
                        disabled={bloqueada}
                        onClick={() =>
                          setCamposComparador((actuales) =>
                            activa
                              ? (actuales ?? []).filter((campo) => campo !== serie.campo)
                              : [...(actuales ?? []), serie.campo],
                          )
                        }
                      >
                        {serie.etiqueta}
                      </button>
                    );
                  })}
                </div>
                <span className="modulo-felicidad__pildoras-ayuda">
                  Marque de 2 a {MAXIMO_COMPARADOR_FNB} indicadores.
                </span>
              </div>
              <div
                className="modulo-felicidad__casillas"
                role="group"
                aria-label="Elementos visibles de la figura"
              >
                <label className="modulo-felicidad__casilla">
                  <input
                    type="checkbox"
                    className="modulo-felicidad__casilla-control"
                    checked={mostrarOcdeProxy}
                    onChange={(evento) => setMostrarOcdeProxy(evento.target.checked)}
                  />
                  Comparar con el promedio OCDE (proxy)
                </label>
              </div>
            </div>

            {figuraComparador ? (
              <>
                <GraficaOcde
                  figura={figuraComparador}
                  etiquetaAccesible={`Comparación de ${seriesComparador
                    .map((serie) => serie.etiqueta)
                    .join(', ')}: evolución histórica y tendencial 2015–2050`}
                  tabla={tablaComparador}
                />

                <p className="modulo-felicidad__advertencia">
                  Las curvas muestran la evolución completa (histórica y del
                  escenario tendencial) de los indicadores elegidos.
                  {mostrarOcdeProxy &&
                    ` La línea punteada gris es una referencia proxy de la OCDE (${PROXY_OCDE_FNB}/100) y no equivale metodológicamente al índice FNB adaptado.`}
                </p>
              </>
            ) : (
              <p className="modulo-felicidad__aviso" role="status">
                Seleccione al menos dos indicadores para compararlos.
              </p>
            )}
          </>
        )}

        {datos.nota && vistaGrafica === 'componentes' && (
          <p className="modulo-felicidad__advertencia">{datos.nota}</p>
        )}
      </>
    );
  };

  /* ── Panel del texto según el estado del documento ─────────────── */
  const renderizarPanelTexto = () => {
    if (texto.estado === ESTADO_CARGA_TEXTO.CARGANDO) {
      return <Cargador mensaje="Leyendo el documento del análisis…" tamano="mediano" enBloque />;
    }
    if (texto.estado === ESTADO_CARGA_TEXTO.ERROR) {
      return (
        <div className="modulo-felicidad__aviso" role="alert">
          <p>No fue posible leer el documento del análisis.</p>
          <button
            type="button"
            className="modulo-felicidad__reintentar"
            onClick={() => {
              setTexto({ estado: ESTADO_CARGA_TEXTO.CARGANDO, titulo: null, parrafos: [] });
              setReintentosTexto((total) => total + 1);
            }}
          >
            Reintentar
          </button>
        </div>
      );
    }
    if (texto.estado === ESTADO_TEXTO.EN_PREPARACION) {
      return (
        <p className="modulo-felicidad__aviso" role="status">
          Contenido en preparación para este indicador.
        </p>
      );
    }
    return (
      <>
        {texto.titulo && <h3 className="modulo-felicidad__texto-titulo">{texto.titulo}</h3>}
        <div
          className="modulo-felicidad__texto-contenido"
          role="region"
          aria-label={`Análisis del indicador ${indicadorSeccion.etiqueta}`}
          tabIndex={0}
        >
          {/* Índice como clave: lista estática que solo cambia completa
              (dos párrafos del Word pueden empezar idéntico). */}
          {texto.parrafos.map((parrafo, indice) => (
            <p key={indice} className="modulo-felicidad__parrafo">
              {parrafo}
            </p>
          ))}
        </div>
      </>
    );
  };

  return (
    <section className="modulo-felicidad" aria-labelledby="titulo-felicidad">
      <header className="modulo-felicidad__encabezado">
        <h1 id="titulo-felicidad" className="modulo-felicidad__titulo">
          {indicadorSeccion.etiqueta}
        </h1>
        {datos && (
          <p className="modulo-felicidad__descripcion">
            Índice de Felicidad Nacional Bruta adaptado a Colombia: serie histórica {datos.anioMin}–
            {datos.anioCorte} y escenario tendencial {datos.anioCorte + 1}–{datos.anioMax}, con sus
            cinco componentes de bienestar en escala de 0 a 100.
          </p>
        )}
      </header>

      <div className="modulo-felicidad__contenido">
        <article className="modulo-felicidad__panel modulo-felicidad__panel--grafica">
          <h2 className="modulo-felicidad__subtitulo">{SUBTITULOS_VISTA[vistaGrafica]}</h2>
          {renderizarPanelGrafica()}
        </article>

        <article className="modulo-felicidad__panel modulo-felicidad__panel--texto">
          <h2 className="modulo-felicidad__subtitulo">Análisis</h2>
          {renderizarPanelTexto()}
        </article>
      </div>
    </section>
  );
}

export default ModuloFelicidad;
