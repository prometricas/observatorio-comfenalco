/**
 * ModuloDesempenoAmbiental — Indicador "Desempeño ambiental".
 *
 * Misma vista en banda completa de los demás indicadores, con TRES
 * gráficas del cuaderno "App_Desempeño_Ambiental" alternadas por un
 * conmutador de botones (peticiones del cliente, 2026-08-14):
 *  1. "Trayectoria y escenarios": el visualizador para Colombia, todo
 *     visible y sin controles (la vista aprobada originalmente).
 *  2. "Explorador por entidad": la misma figura para cualquiera de las
 *     177 entidades o los promedios regional/global, con dos casillas
 *     destacadas (trayectorias intermedias / tres escenarios) y la
 *     leyenda abajo, más visible.
 *  3. "Estructura del EPI": el treemap de la arquitectura de pesos
 *     (hoja DICCIONARIO) con selector de objetivo y globito de
 *     información al pasar el puntero por cada caja. Se dibuja como
 *     cajas HTML propias (el paquete básico de Plotly no trae treemap),
 *     con su equivalente accesible en tabla.
 * Las dos primeras comparten el constructor de figura del servicio:
 * histórico armonizado 2000–2025, dato oficial del EPI 2026, escenarios
 * 2027–2050 con el corredor restrictivo–optimista y las cajas de
 * indicadores clave.
 *
 * El texto viene del documento propio del indicador
 * (desempeno-ambiental.docx).
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import Cargador from '../../components/Cargador/Cargador.jsx';
import GraficaOcde from '../../components/GraficaOcde/GraficaOcde.jsx';
import SelectorCampo from '../../components/SelectorCampo/SelectorCampo.jsx';
import { rutaExcelIndicador } from '../../data/indicadores.js';
import { ESTADO_TEXTO, obtenerTextoIndicador } from '../../services/docxService.js';
import {
  NOTA_FUENTE,
  OBJETIVO_TODOS,
  cargarBaseDesempenoAmbiental,
  construirFiguraDesempenoAmbiental,
  construirTreemapEpi,
  objetivosDeArquitectura,
} from '../../services/desempenoAmbientalService.js';
import './modulo-desempeno-ambiental.css';

/* Las tres gráficas del módulo; el conmutador muestra una a la vez. */
const VISTAS_GRAFICA = [
  { id: 'trayectoria', etiqueta: 'Trayectoria y escenarios' },
  { id: 'explorador', etiqueta: 'Explorador por entidad' },
  { id: 'estructura', etiqueta: 'Estructura del EPI' },
];

const SUBTITULOS_VISTA = {
  trayectoria: 'Trayectoria y escenarios',
  explorador: 'Explorador por entidad',
  estructura: 'Estructura del EPI',
};

/* Tabla accesible de una entidad: histórico, oficial y escenarios. */
function construirTablaEntidad(entidad) {
  const porAnio = new Map();
  const volcar = (puntos, columna) => {
    for (const punto of puntos) {
      if (!porAnio.has(punto.anio)) porAnio.set(punto.anio, {});
      porAnio.get(punto.anio)[columna] = punto.valor.toFixed(2);
    }
  };
  volcar(entidad.historico, 'Histórico');
  volcar([entidad.oficial], 'Oficial');
  volcar(entidad.restrictivo, 'Restrictivo');
  volcar(entidad.tendencial, 'Tendencial');
  volcar(entidad.optimista, 'Optimista');
  return {
    titulo: `Environmental Performance Index de ${entidad.nombre}: histórico armonizado, dato oficial 2026 y escenarios prospectivos por año`,
    columnas: ['Año', 'Histórico', 'Oficial', 'Restrictivo', 'Tendencial', 'Optimista'],
    filas: [...porAnio.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([anio, valores]) => [
        anio,
        valores['Histórico'] ?? '—',
        valores['Oficial'] ?? '—',
        valores['Restrictivo'] ?? '—',
        valores['Tendencial'] ?? '—',
        valores['Optimista'] ?? '—',
      ]),
  };
}

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

function ModuloDesempenoAmbiental({ indicadorSeccion, config }) {
  /* ── Base de datos de la figura ────────────────────────────────── */
  const [estadoDatos, setEstadoDatos] = useState(ESTADO_DATOS.CARGANDO);
  const [datos, setDatos] = useState(null);
  const [reintentosDatos, setReintentosDatos] = useState(0);

  /* ── Gráfica visible y controles del explorador ────────────────── */
  const [vistaGrafica, setVistaGrafica] = useState('trayectoria');
  const [entidadElegida, setEntidadElegida] = useState(null);
  const [mostrarTrayectorias, setMostrarTrayectorias] = useState(true);
  const [mostrarTresEscenarios, setMostrarTresEscenarios] = useState(true);

  /* ── Controles del treemap de la estructura ────────────────────── */
  const [objetivoElegido, setObjetivoElegido] = useState(OBJETIVO_TODOS);
  /* Globito de información de la caja bajo el puntero: {x, y, hoja}. */
  const [globito, setGlobito] = useState(null);
  const treemapRef = useRef(null);
  /* Cuadro de animación pendiente del globito (ver manejarGlobito). */
  const cuadroGlobitoRef = useRef(0);

  /* ── Texto del indicador ───────────────────────────────────────── */
  const [texto, setTexto] = useState({ estado: ESTADO_CARGA_TEXTO.CARGANDO, titulo: null, parrafos: [] });
  const [reintentosTexto, setReintentosTexto] = useState(0);

  useEffect(() => {
    let vigente = true;
    cargarBaseDesempenoAmbiental(rutaExcelIndicador(indicadorSeccion.slug, config.archivoExcel))
      .then((base) => {
        if (!vigente) return;
        /* El explorador abre con la entidad principal (Colombia). */
        setEntidadElegida((entidad) => entidad ?? base.paisPrincipal);
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

  /* Vista principal: la entidad principal (Colombia), todo visible. */
  const entidadPrincipal = useMemo(
    () => (datos ? datos.entidad(datos.paisPrincipal) : null),
    [datos],
  );
  const figura = useMemo(
    () => (entidadPrincipal ? construirFiguraDesempenoAmbiental(entidadPrincipal) : null),
    [entidadPrincipal],
  );
  const tabla = useMemo(
    () => (entidadPrincipal ? construirTablaEntidad(entidadPrincipal) : null),
    [entidadPrincipal],
  );

  /* Explorador: la entidad elegida con las casillas del cuaderno. */
  const entidadExplorada = useMemo(
    () => (datos && entidadElegida ? datos.entidad(entidadElegida) : null),
    [datos, entidadElegida],
  );
  const figuraExplorador = useMemo(
    () =>
      entidadExplorada
        ? construirFiguraDesempenoAmbiental(entidadExplorada, {
            mostrarTrayectorias,
            mostrarTresEscenarios,
            leyendaAbajo: true,
          })
        : null,
    [entidadExplorada, mostrarTrayectorias, mostrarTresEscenarios],
  );
  const tablaExplorador = useMemo(
    () => (entidadExplorada ? construirTablaEntidad(entidadExplorada) : null),
    [entidadExplorada],
  );

  /* Treemap de la arquitectura, con su equivalente accesible. */
  const treemap = useMemo(
    () => (datos?.arquitectura ? construirTreemapEpi(datos.arquitectura, objetivoElegido) : null),
    [datos, objetivoElegido],
  );
  const objetivos = useMemo(
    () => (datos?.arquitectura ? objetivosDeArquitectura(datos.arquitectura) : []),
    [datos],
  );

  /* Globito: posición del puntero relativa al lienzo del treemap. El
     volteo cerca del borde derecho se decide aquí, donde el rectángulo
     del lienzo está disponible (leer la ref durante el render está
     prohibido por las reglas de hooks). El estado se actualiza como
     mucho una vez por cuadro de animación: sin el límite, cada mousemove
     re-renderizaría el módulo entero decenas de veces por segundo. */
  const manejarGlobito = (evento, hoja) => {
    const { clientX, clientY } = evento;
    cancelAnimationFrame(cuadroGlobitoRef.current);
    cuadroGlobitoRef.current = requestAnimationFrame(() => {
      const lienzo = treemapRef.current?.getBoundingClientRect();
      if (!lienzo) return;
      const x = clientX - lienzo.left;
      setGlobito({
        x,
        y: clientY - lienzo.top,
        voltear: x > lienzo.width * 0.6,
        hoja,
      });
    });
  };

  /* Un cuadro pendiente no debe dispararse tras desmontar el módulo. */
  useEffect(() => () => cancelAnimationFrame(cuadroGlobitoRef.current), []);

  /* ── Panel de la gráfica según el estado de la base ────────────── */
  const renderizarPanelGrafica = () => {
    if (estadoDatos === ESTADO_DATOS.CARGANDO) {
      return <Cargador mensaje="Leyendo la base de datos del indicador…" tamano="grande" enBloque />;
    }
    if (estadoDatos === ESTADO_DATOS.ERROR) {
      return (
        <div className="modulo-desempeno-ambiental__aviso" role="alert">
          <p>No fue posible leer la base de datos del indicador.</p>
          <button
            type="button"
            className="modulo-desempeno-ambiental__reintentar"
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
    return (
      <>
        {/* Conmutador de gráfica: una a la vez, a pedido del cliente */}
        <div
          className="modulo-desempeno-ambiental__conmutador"
          role="group"
          aria-label="Gráfica mostrada"
        >
          {VISTAS_GRAFICA.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              className={`modulo-desempeno-ambiental__conmutador-boton${
                vistaGrafica === opcion.id
                  ? ' modulo-desempeno-ambiental__conmutador-boton--activo'
                  : ''
              }`}
              aria-pressed={vistaGrafica === opcion.id}
              onClick={() => setVistaGrafica(opcion.id)}
            >
              {opcion.etiqueta}
            </button>
          ))}
        </div>

        {vistaGrafica === 'trayectoria' && (
          <GraficaOcde
            figura={figura}
            etiquetaAccesible={`Environmental Performance Index de ${datos.paisPrincipal}: histórico armonizado, dato oficial 2026 y escenarios prospectivos con su corredor`}
            tabla={tabla}
          />
        )}

        {vistaGrafica === 'explorador' && entidadExplorada && (
          <>
            <div className="modulo-desempeno-ambiental__controles">
              <SelectorCampo
                etiqueta="Entidad"
                valor={entidadExplorada.nombre}
                opciones={datos.nombres}
                onCambiar={setEntidadElegida}
              />
              {/* Casillas destacadas del cuaderno; la figura responde al
                  instante y el estilo llama a usarlas */}
              <div
                className="modulo-desempeno-ambiental__casillas"
                role="group"
                aria-label="Elementos visibles de la figura"
              >
                <label
                  className={`modulo-desempeno-ambiental__casilla${
                    mostrarTrayectorias ? ' modulo-desempeno-ambiental__casilla--marcada' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    className="modulo-desempeno-ambiental__casilla-control"
                    checked={mostrarTrayectorias}
                    onChange={(evento) => setMostrarTrayectorias(evento.target.checked)}
                  />
                  Mostrar trayectorias intermedias
                </label>
                <label
                  className={`modulo-desempeno-ambiental__casilla${
                    mostrarTresEscenarios ? ' modulo-desempeno-ambiental__casilla--marcada' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    className="modulo-desempeno-ambiental__casilla-control"
                    checked={mostrarTresEscenarios}
                    onChange={(evento) => setMostrarTresEscenarios(evento.target.checked)}
                  />
                  Mostrar los tres escenarios
                </label>
              </div>
            </div>

            <GraficaOcde
              figura={figuraExplorador}
              etiquetaAccesible={`Environmental Performance Index de ${entidadExplorada.nombre}: histórico armonizado, dato oficial 2026 y escenarios prospectivos con su corredor`}
              tabla={tablaExplorador}
            />
          </>
        )}

        {vistaGrafica === 'estructura' &&
          (treemap ? (
            <>
              <div className="modulo-desempeno-ambiental__controles">
                <SelectorCampo
                  etiqueta="Objetivo"
                  valor={objetivoElegido}
                  opciones={objetivos}
                  onCambiar={setObjetivoElegido}
                />
              </div>

              <div className="modulo-desempeno-ambiental__treemap-envoltorio">
                {/* Lienzo del treemap: cajas absolutas sobre proporción
                    fija; el globito sigue al puntero sobre las hojas */}
                <div
                  className="modulo-desempeno-ambiental__treemap"
                  ref={treemapRef}
                  role="img"
                  aria-label={`Arquitectura de pesos del EPI (${objetivoElegido === OBJETIVO_TODOS ? 'índice completo' : objetivoElegido}); los datos detallados están en la tabla siguiente`}
                  onMouseLeave={() => {
                    /* También el cuadro pendiente: sin esto, un rAF en
                       vuelo re-mostraría el globito tras salir. */
                    cancelAnimationFrame(cuadroGlobitoRef.current);
                    setGlobito(null);
                  }}
                >
                  {treemap.marcos.map((marco) => (
                    <div
                      key={`${marco.nivel}|${marco.nombre}`}
                      className={`modulo-desempeno-ambiental__treemap-marco modulo-desempeno-ambiental__treemap-marco--${marco.nivel}`}
                      style={{
                        left: `${marco.x}%`,
                        top: `${marco.y}%`,
                        width: `${marco.w}%`,
                        height: `${marco.h}%`,
                        backgroundColor: marco.color,
                      }}
                    >
                      {marco.colorTexto && marco.w > 8 && (
                        <span
                          className="modulo-desempeno-ambiental__treemap-rotulo"
                          style={{ color: marco.colorTexto }}
                        >
                          {marco.nombre}
                        </span>
                      )}
                    </div>
                  ))}
                  {treemap.hojas.map((hoja) => (
                    <div
                      key={`${hoja.codigo}|${hoja.nombre}`}
                      className="modulo-desempeno-ambiental__treemap-hoja"
                      style={{
                        left: `${hoja.x}%`,
                        top: `${hoja.y}%`,
                        width: `${hoja.w}%`,
                        height: `${hoja.h}%`,
                        backgroundColor: hoja.color,
                      }}
                      onMouseEnter={(evento) => manejarGlobito(evento, hoja)}
                      onMouseMove={(evento) => manejarGlobito(evento, hoja)}
                    >
                      {hoja.colorTexto && hoja.w > 6 && hoja.h > 4 && (
                        <span
                          className="modulo-desempeno-ambiental__treemap-etiqueta"
                          style={{ color: hoja.colorTexto }}
                        >
                          {hoja.nombre}
                        </span>
                      )}
                    </div>
                  ))}
                  {globito && (
                    <div
                      className="modulo-desempeno-ambiental__treemap-globito"
                      aria-hidden="true"
                      style={{
                        left: globito.x,
                        top: globito.y + 14,
                        transform: globito.voltear ? 'translateX(-100%)' : 'translateX(14px)',
                      }}
                    >
                      <strong>{globito.hoja.nombre}</strong>
                      <br />
                      Peso EPI: {globito.hoja.pesoPct.toFixed(3)}%
                      <br />
                      Código: {globito.hoja.codigo || '—'}
                      <br />
                      Unidad: {globito.hoja.unidad || '—'}
                      <br />
                      Polaridad: {globito.hoja.polaridad || '—'}
                      <br />
                      Cobertura: {globito.hoja.cobertura}
                    </div>
                  )}
                </div>

                {/* Rampa de referencia del color por peso */}
                <div className="modulo-desempeno-ambiental__treemap-rampa" aria-hidden="true">
                  <span className="modulo-desempeno-ambiental__treemap-rampa-titulo">
                    Peso (%)
                  </span>
                  <span>{treemap.rampa.maxPct.toFixed(1)}</span>
                  <div
                    className="modulo-desempeno-ambiental__treemap-rampa-barra"
                    style={{
                      background: `linear-gradient(to top, ${treemap.rampa.colorInicio}, ${treemap.rampa.colorFin})`,
                    }}
                  />
                  <span>{treemap.rampa.minPct.toFixed(1)}</span>
                </div>
              </div>

              {/* Resumen de pesos por objetivo (la tabla del cuaderno) */}
              <p className="modulo-desempeno-ambiental__advertencia">
                Pesos por objetivo:{' '}
                {treemap.resumen
                  .map((fila) => `${fila.objetivo} ${fila.pesoPct.toFixed(1)} %`)
                  .join(' · ')}
                . Pase el puntero sobre una caja para ver la ficha del indicador.
              </p>

              {/* Equivalente accesible del treemap */}
              <div className="oculto-accesible">
                <table>
                  <caption>
                    Arquitectura de pesos del EPI: indicadores con su objetivo, categoría y peso
                  </caption>
                  <thead>
                    <tr>
                      {['Indicador', 'Objetivo', 'Categoría', 'Peso (%)', 'Código', 'Unidad', 'Polaridad', 'Cobertura'].map(
                        (columna) => (
                          <th key={columna} scope="col">
                            {columna}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {datos.arquitectura.indicadores.map((fila) => (
                      <tr key={`${fila.codigo}|${fila.indicador}`}>
                        <th scope="row">{fila.indicador}</th>
                        <td>{fila.objetivo}</td>
                        <td>{fila.categoria}</td>
                        <td>{(fila.peso * 100).toFixed(3)}</td>
                        <td>{fila.codigo || '—'}</td>
                        <td>{fila.unidad || '—'}</td>
                        <td>{fila.polaridad || '—'}</td>
                        <td>
                          {fila.anioBase !== null && fila.anioReciente !== null
                            ? `${fila.anioBase}–${fila.anioReciente}`
                            : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="modulo-desempeno-ambiental__aviso" role="status">
              La base publicada no trae la hoja DICCIONARIO con la arquitectura
              del índice; las otras dos vistas siguen disponibles.
            </p>
          ))}

        {vistaGrafica !== 'estructura' && (
          <p className="modulo-desempeno-ambiental__advertencia">{NOTA_FUENTE}</p>
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
        <div className="modulo-desempeno-ambiental__aviso" role="alert">
          <p>No fue posible leer el documento del análisis.</p>
          <button
            type="button"
            className="modulo-desempeno-ambiental__reintentar"
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
        <p className="modulo-desempeno-ambiental__aviso" role="status">
          Contenido en preparación para este indicador.
        </p>
      );
    }
    return (
      <>
        {texto.titulo && (
          <h3 className="modulo-desempeno-ambiental__texto-titulo">{texto.titulo}</h3>
        )}
        <div
          className="modulo-desempeno-ambiental__texto-contenido"
          role="region"
          aria-label={`Análisis del indicador ${indicadorSeccion.etiqueta}`}
          tabIndex={0}
        >
          {/* Índice como clave: lista estática que solo cambia completa
              (dos párrafos del Word pueden empezar idéntico). */}
          {texto.parrafos.map((parrafo, indice) => (
            <p key={indice} className="modulo-desempeno-ambiental__parrafo">
              {parrafo}
            </p>
          ))}
        </div>
      </>
    );
  };

  return (
    <section className="modulo-desempeno-ambiental" aria-labelledby="titulo-desempeno-ambiental">
      <header className="modulo-desempeno-ambiental__encabezado">
        <h1 id="titulo-desempeno-ambiental" className="modulo-desempeno-ambiental__titulo">
          {indicadorSeccion.etiqueta}
        </h1>
        {datos && (
          <p className="modulo-desempeno-ambiental__descripcion">
            Environmental Performance Index (EPI) de Colombia: histórico armonizado 2000–2025,
            dato oficial 2026 y escenarios prospectivos a 2050 dentro del corredor
            restrictivo–optimista.
          </p>
        )}
      </header>

      <div className="modulo-desempeno-ambiental__contenido">
        <article className="modulo-desempeno-ambiental__panel modulo-desempeno-ambiental__panel--grafica">
          <h2 className="modulo-desempeno-ambiental__subtitulo">
            {SUBTITULOS_VISTA[vistaGrafica]}
          </h2>
          {renderizarPanelGrafica()}
        </article>

        <article className="modulo-desempeno-ambiental__panel modulo-desempeno-ambiental__panel--texto">
          <h2 className="modulo-desempeno-ambiental__subtitulo">Análisis</h2>
          {renderizarPanelTexto()}
        </article>
      </div>
    </section>
  );
}

export default ModuloDesempenoAmbiental;
