/**
 * ModuloVidaDigital — Indicador "Calidad vida digital".
 *
 * Misma vista en banda completa de los demás indicadores, con DOS
 * gráficas del cuaderno "App_Vida_Digital" alternadas por un conmutador
 * de botones (peticiones del cliente, 2026-08-14):
 *  1. "Trayectoria y escenarios simulados": países por cápsulas
 *     removibles + desplegable "Agregar país" (1–3; con uno, el
 *     visualizador individual completo; con varios, la comparación),
 *     selector de escenario (central + 24 simulados, reemplaza al
 *     deslizador con Play del cuaderno) y casilla del intervalo del
 *     95 %.
 *  2. "Comparador por escenario": de dos a tres países (mismas
 *     cápsulas) bajo un mismo escenario nombrado (pesimista P20 /
 *     tendencial central del Excel / optimista P80), con la caja
 *     "Valores 2030" y los límites del 95 % conmutables.
 *
 * El tope de selección vive en MAXIMO_PAISES_DQL (el cliente lo bajó de
 * 4 a 3 el 2026-08-14).
 *
 * El panel del texto de análisis está DESACTIVADO a pedido del cliente
 * (2026-08-14): aún no se define si el indicador llevará texto. Todo su
 * código permanece comentado en los bloques marcados como "ANÁLISIS
 * DESACTIVADO" (imports, estado, efecto, render y tarjeta); para
 * reactivarlo basta descomentarlos — leería el documento propio
 * `calidad-vida-digital.docx` con el sondeo único de siempre.
 */
import { useEffect, useMemo, useState } from 'react';
import Cargador from '../../components/Cargador/Cargador.jsx';
import GraficaOcde from '../../components/GraficaOcde/GraficaOcde.jsx';
import SelectorCampo from '../../components/SelectorCampo/SelectorCampo.jsx';
import { rutaExcelIndicador } from '../../data/indicadores.js';
/* ANÁLISIS DESACTIVADO (cliente por definir):
import { ESTADO_TEXTO, obtenerTextoIndicador } from '../../services/docxService.js';
*/
import {
  ESCENARIOS_NOMBRADOS_DQL,
  MAXIMO_PAISES_DQL,
  NOTA_FUENTE_DQL,
  OPCIONES_ESCENARIO_DQL,
  cargarBaseVidaDigital,
  construirFiguraComparadorEscenarioDql,
  construirFiguraVidaDigital,
} from '../../services/vidaDigitalService.js';
import './modulo-vida-digital.css';

/* Las dos gráficas del módulo; el conmutador muestra una a la vez. */
const VISTAS_GRAFICA = [
  { id: 'trayectoria', etiqueta: 'Trayectoria y escenarios' },
  { id: 'comparador', etiqueta: 'Comparador por escenario' },
];

const SUBTITULOS_VISTA = {
  trayectoria: 'Trayectoria y escenarios simulados',
  comparador: 'Comparador por escenario',
};

/* Selección inicial del comparador: la lista de preferencia del cuaderno
   (4 países), que al abrir se recorta al tope vigente MAXIMO_PAISES_DQL —
   hoy 3, así que Costa Rica solo entra si falta alguno de los primeros. */
const PAISES_COMPARADOR_INICIALES = ['Colombia', 'Chile', 'Mexico', 'Costa Rica'];

/**
 * Selección de países (ajuste de experiencia de uso aprobado por el
 * cliente, 2026-08-14): un desplegable "Agregar país" que suma de a uno
 * y las cápsulas removibles de los elegidos, en la misma fila del panel
 * de controles. Reemplaza al selector múltiple con Ctrl + clic: la
 * selección queda siempre visible y el tope se autoexplica (al llegar,
 * el desplegable espera a que se quite una cápsula). Con 38 países las
 * píldoras conmutables del FNB no son viables; este es el patrón para
 * listas largas.
 */
function CapsulasPaises({ nombres, seleccion, maximo, onCambiar }) {
  const disponibles = nombres.filter((nombre) => !seleccion.includes(nombre));
  const enTope = seleccion.length >= maximo;

  return (
    <>
      <SelectorCampo
        etiqueta="Agregar país"
        valor=""
        opciones={[
          { valor: '', etiqueta: enTope ? 'Tope alcanzado' : 'Elegir…' },
          ...disponibles,
        ]}
        deshabilitado={enTope}
        onCambiar={(nombre) => {
          if (nombre) onCambiar([...seleccion, nombre]);
        }}
      />
      <div className="modulo-vida-digital__capsulas">
        {seleccion.map((nombre) => (
          <button
            key={nombre}
            type="button"
            className="modulo-vida-digital__capsula"
            aria-label={`Quitar ${nombre} de la selección`}
            onClick={() => onCambiar(seleccion.filter((otro) => otro !== nombre))}
          >
            {nombre}
            <span className="modulo-vida-digital__capsula-equis" aria-hidden="true">
              ×
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

/* Estados de la carga de la base de datos. */
const ESTADO_DATOS = {
  CARGANDO: 'cargando',
  LISTO: 'listo',
  ERROR: 'error',
};

/* ANÁLISIS DESACTIVADO (cliente por definir) — estados de la carga del
   texto, además de los del servicio de textos:
const ESTADO_CARGA_TEXTO = {
  CARGANDO: 'cargando',
  ERROR: 'error',
};
*/

function ModuloVidaDigital({ indicadorSeccion, config }) {
  /* ── Base de datos de la figura ────────────────────────────────── */
  const [estadoDatos, setEstadoDatos] = useState(ESTADO_DATOS.CARGANDO);
  const [datos, setDatos] = useState(null);
  const [reintentosDatos, setReintentosDatos] = useState(0);

  /* ── Gráfica visible y controles de cada vista ─────────────────── */
  const [vistaGrafica, setVistaGrafica] = useState('trayectoria');
  const [paisesElegidos, setPaisesElegidos] = useState(null);
  const [escenario, setEscenario] = useState(0);
  const [mostrarIntervalo, setMostrarIntervalo] = useState(true);
  const [paisesComparador, setPaisesComparador] = useState(null);
  const [escenarioNombrado, setEscenarioNombrado] = useState('Tendencial');
  /* El cuaderno abre el comparador con los límites apagados. */
  const [mostrarLimites, setMostrarLimites] = useState(false);

  /* ── Texto del indicador — ANÁLISIS DESACTIVADO (cliente por definir):
  const [texto, setTexto] = useState({ estado: ESTADO_CARGA_TEXTO.CARGANDO, titulo: null, parrafos: [] });
  const [reintentosTexto, setReintentosTexto] = useState(0);
  */

  useEffect(() => {
    let vigente = true;
    cargarBaseVidaDigital(rutaExcelIndicador(indicadorSeccion.slug, config.archivoExcel))
      .then((base) => {
        if (!vigente) return;
        /* La primera vista abre con el país principal (Colombia); el
           comparador, con los cuatro países latinos del cuaderno. */
        setPaisesElegidos((paises) => paises ?? [base.paisPrincipal]);
        setPaisesComparador((paises) => {
          if (paises) return paises;
          const iniciales = PAISES_COMPARADOR_INICIALES.filter((nombre) =>
            base.nombres.includes(nombre),
          );
          return iniciales.length >= 2
            ? iniciales.slice(0, MAXIMO_PAISES_DQL)
            : base.nombres.slice(0, Math.min(MAXIMO_PAISES_DQL, base.nombres.length));
        });
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

  /* ANÁLISIS DESACTIVADO (cliente por definir) — lectura del documento;
     el módulo se remonta por indicador (key en la App): el efecto solo se
     re-dispara al reintentar, y el botón repone el estado "cargando".
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
  */

  /* Países válidos en el orden del panel (ranking del cuaderno). */
  const paisesActivos = useMemo(
    () =>
      datos && paisesElegidos
        ? datos.nombres.filter((nombre) => paisesElegidos.includes(nombre))
        : [],
    [datos, paisesElegidos],
  );

  const figura = useMemo(
    () =>
      datos && paisesActivos.length
        ? construirFiguraVidaDigital(datos, paisesActivos, escenario, mostrarIntervalo)
        : null,
    [datos, paisesActivos, escenario, mostrarIntervalo],
  );

  /* Países válidos del comparador, en el orden del panel. */
  const paisesComparadorActivos = useMemo(
    () =>
      datos && paisesComparador
        ? datos.nombres.filter((nombre) => paisesComparador.includes(nombre))
        : [],
    [datos, paisesComparador],
  );

  const figuraComparador = useMemo(
    () =>
      datos && paisesComparadorActivos.length >= 2
        ? construirFiguraComparadorEscenarioDql(
            datos,
            paisesComparadorActivos,
            escenarioNombrado,
            mostrarLimites,
          )
        : null,
    [datos, paisesComparadorActivos, escenarioNombrado, mostrarLimites],
  );

  /* Tabla accesible del comparador: la trayectoria del escenario por país. */
  const tablaComparador = useMemo(() => {
    if (!datos || paisesComparadorActivos.length < 2) return null;
    const anios = [...datos.aniosHistoricos, ...datos.aniosProyeccion];
    return {
      titulo: `Digital Quality of Life Index por año bajo el escenario ${escenarioNombrado.toLowerCase()}: histórico oficial y trayectoria por país`,
      columnas: ['Año', ...paisesComparadorActivos],
      filas: anios.map((anio) => [
        anio,
        ...paisesComparadorActivos.map((nombre) => {
          const pais = datos.pais(nombre);
          const posicionHistorico = datos.aniosHistoricos.indexOf(anio);
          if (posicionHistorico !== -1) return pais.historico[posicionHistorico].toFixed(4);
          const posicionProyeccion = datos.aniosProyeccion.indexOf(anio);
          const valores =
            escenarioNombrado === 'Tendencial'
              ? pais.proyeccion
              : pais[escenarioNombrado === 'Pesimista' ? 'pesimista' : 'optimista'];
          return valores[posicionProyeccion].toFixed(4);
        }),
      ]),
    };
  }, [datos, paisesComparadorActivos, escenarioNombrado]);

  /* Tabla accesible: histórico y proyección central por país elegido;
     con un solo país, también su banda del 95 %. */
  const tabla = useMemo(() => {
    if (!datos || !paisesActivos.length) return null;
    const individual = paisesActivos.length === 1;
    const anios = [...datos.aniosHistoricos, ...datos.aniosProyeccion];
    const columnas = ['Año', ...paisesActivos];
    if (individual) columnas.push('Banda inferior 95 %', 'Banda superior 95 %');
    const filas = anios.map((anio) => {
      const fila = [anio];
      for (const nombre of paisesActivos) {
        const pais = datos.pais(nombre);
        const posicionHistorico = datos.aniosHistoricos.indexOf(anio);
        const posicionProyeccion = datos.aniosProyeccion.indexOf(anio);
        const valor =
          posicionHistorico !== -1
            ? pais.historico[posicionHistorico]
            : pais.proyeccion[posicionProyeccion];
        fila.push(valor.toFixed(4));
      }
      if (individual) {
        const pais = datos.pais(paisesActivos[0]);
        const posicionProyeccion = datos.aniosProyeccion.indexOf(anio);
        fila.push(
          posicionProyeccion === -1 ? '—' : pais.bandaInferior[posicionProyeccion].toFixed(4),
          posicionProyeccion === -1 ? '—' : pais.bandaSuperior[posicionProyeccion].toFixed(4),
        );
      }
      return fila;
    });
    return {
      titulo:
        'Digital Quality of Life Index por año: serie histórica oficial y proyección central' +
        (individual ? ', con la banda de predicción del 95 %' : ' de los países comparados'),
      columnas,
      filas,
    };
  }, [datos, paisesActivos]);

  /* ── Panel de la gráfica según el estado de la base ────────────── */
  const renderizarPanelGrafica = () => {
    if (estadoDatos === ESTADO_DATOS.CARGANDO) {
      return <Cargador mensaje="Leyendo la base de datos del indicador…" tamano="grande" enBloque />;
    }
    if (estadoDatos === ESTADO_DATOS.ERROR) {
      return (
        <div className="modulo-vida-digital__aviso" role="alert">
          <p>No fue posible leer la base de datos del indicador.</p>
          <button
            type="button"
            className="modulo-vida-digital__reintentar"
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
        <div className="modulo-vida-digital__conmutador" role="group" aria-label="Gráfica mostrada">
          {VISTAS_GRAFICA.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              className={`modulo-vida-digital__conmutador-boton${
                vistaGrafica === opcion.id ? ' modulo-vida-digital__conmutador-boton--activo' : ''
              }`}
              aria-pressed={vistaGrafica === opcion.id}
              onClick={() => setVistaGrafica(opcion.id)}
            >
              {opcion.etiqueta}
            </button>
          ))}
        </div>

        {vistaGrafica === 'trayectoria' && (
          <>
            <div className="modulo-vida-digital__controles">
              <span className="modulo-vida-digital__controles-titulo">Países</span>
              {/* Todos los controles comparten la fila (petición del
                  cliente): selector, cápsulas, escenario y casilla se
                  alinean por su línea base inferior */}
              <div className="modulo-vida-digital__controles-fila">
                <CapsulasPaises
                  nombres={datos.nombres}
                  seleccion={paisesElegidos ?? []}
                  maximo={MAXIMO_PAISES_DQL}
                  onCambiar={setPaisesElegidos}
                />
                <SelectorCampo
                  etiqueta="Escenario"
                  valor={escenario}
                  opciones={OPCIONES_ESCENARIO_DQL}
                  onCambiar={(valor) => setEscenario(Number(valor))}
                />
                <div
                  className="modulo-vida-digital__casillas"
                  role="group"
                  aria-label="Elementos visibles de la figura"
                >
                  <label
                    className={`modulo-vida-digital__casilla${
                      mostrarIntervalo ? ' modulo-vida-digital__casilla--marcada' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="modulo-vida-digital__casilla-control"
                      checked={mostrarIntervalo}
                      onChange={(evento) => setMostrarIntervalo(evento.target.checked)}
                    />
                    Mostrar intervalo de predicción 95 %
                  </label>
                </div>
              </div>
              <span className="modulo-vida-digital__controles-ayuda">
                {`De 1 a ${MAXIMO_PAISES_DQL} países; pulse una cápsula para quitarla.`}
              </span>
            </div>

            {figura ? (
              <GraficaOcde
                figura={figura}
                etiquetaAccesible={`Digital Quality of Life Index de ${paisesActivos.join(', ')}: serie histórica ${datos.aniosHistoricos[0]}–${datos.aniosHistoricos.at(-1)} y proyección ${datos.aniosProyeccion[0]}–${datos.aniosProyeccion.at(-1)}${escenario > 0 ? ` con el escenario simulado ${escenario} destacado` : ''}`}
                tabla={tabla}
              />
            ) : (
              <p className="modulo-vida-digital__aviso" role="status">
                Seleccione al menos un país para dibujar la figura.
              </p>
            )}
          </>
        )}

        {vistaGrafica === 'comparador' && (
          <>
            <div className="modulo-vida-digital__controles">
              <span className="modulo-vida-digital__controles-titulo">Países</span>
              <div className="modulo-vida-digital__controles-fila">
                <CapsulasPaises
                  nombres={datos.nombres}
                  seleccion={paisesComparador ?? []}
                  maximo={MAXIMO_PAISES_DQL}
                  onCambiar={setPaisesComparador}
                />
                <SelectorCampo
                  etiqueta="Escenario"
                  valor={escenarioNombrado}
                  opciones={ESCENARIOS_NOMBRADOS_DQL}
                  onCambiar={setEscenarioNombrado}
                />
                <div
                  className="modulo-vida-digital__casillas"
                  role="group"
                  aria-label="Elementos visibles de la figura"
                >
                  <label
                    className={`modulo-vida-digital__casilla${
                      mostrarLimites ? ' modulo-vida-digital__casilla--marcada' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="modulo-vida-digital__casilla-control"
                      checked={mostrarLimites}
                      onChange={(evento) => setMostrarLimites(evento.target.checked)}
                    />
                    Mostrar límites 95 %
                  </label>
                </div>
              </div>
              <span className="modulo-vida-digital__controles-ayuda">
                {`De 2 a ${MAXIMO_PAISES_DQL} países; pulse una cápsula para quitarla.`}
              </span>
            </div>

            {figuraComparador ? (
              <>
                <GraficaOcde
                  figura={figuraComparador}
                  etiquetaAccesible={`Comparación del Digital Quality of Life Index de ${paisesComparadorActivos.join(', ')} bajo el escenario ${escenarioNombrado.toLowerCase()}`}
                  tabla={tablaComparador}
                />
                <p className="modulo-vida-digital__advertencia">
                  Pesimista: trayectoria completa próxima al percentil 20 del
                  cierre 2030. Tendencial: proyección central de la base.
                  Optimista: trayectoria próxima al percentil 80.
                </p>
              </>
            ) : (
              <p className="modulo-vida-digital__aviso" role="status">
                Seleccione al menos dos países para compararlos.
              </p>
            )}
          </>
        )}

        <p className="modulo-vida-digital__advertencia">{NOTA_FUENTE_DQL}</p>
      </>
    );
  };

  /* ── Panel del texto según el estado del documento ───────────────
     ANÁLISIS DESACTIVADO (cliente por definir):
  const renderizarPanelTexto = () => {
    if (texto.estado === ESTADO_CARGA_TEXTO.CARGANDO) {
      return <Cargador mensaje="Leyendo el documento del análisis…" tamano="mediano" enBloque />;
    }
    if (texto.estado === ESTADO_CARGA_TEXTO.ERROR) {
      return (
        <div className="modulo-vida-digital__aviso" role="alert">
          <p>No fue posible leer el documento del análisis.</p>
          <button
            type="button"
            className="modulo-vida-digital__reintentar"
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
        <p className="modulo-vida-digital__aviso" role="status">
          Contenido en preparación para este indicador.
        </p>
      );
    }
    return (
      <>
        {texto.titulo && <h3 className="modulo-vida-digital__texto-titulo">{texto.titulo}</h3>}
        <div
          className="modulo-vida-digital__texto-contenido"
          role="region"
          aria-label={`Análisis del indicador ${indicadorSeccion.etiqueta}`}
          tabIndex={0}
        >
          {texto.parrafos.map((parrafo, indice) => (
            <p key={indice} className="modulo-vida-digital__parrafo">
              {parrafo}
            </p>
          ))}
        </div>
      </>
    );
  };
  FIN DEL ANÁLISIS DESACTIVADO */

  return (
    <section className="modulo-vida-digital" aria-labelledby="titulo-vida-digital">
      <header className="modulo-vida-digital__encabezado">
        <h1 id="titulo-vida-digital" className="modulo-vida-digital__titulo">
          {indicadorSeccion.etiqueta}
        </h1>
        {datos && (
          <p className="modulo-vida-digital__descripcion">
            {/* Los rangos de años salen de la base: siguen siendo ciertos
                si el cliente publica un Excel con otro horizonte. */}
            Digital Quality of Life Index (Surfshark) de {datos.nombres.length - 1} países de la
            OCDE y su promedio, en escala de 0 a 1: serie histórica oficial{' '}
            {datos.aniosHistoricos[0]}–{datos.aniosHistoricos.at(-1)} y pronóstico econométrico{' '}
            {datos.aniosProyeccion[0]}–{datos.aniosProyeccion.at(-1)} con su intervalo de
            predicción.
          </p>
        )}
      </header>

      <div className="modulo-vida-digital__contenido">
        <article className="modulo-vida-digital__panel modulo-vida-digital__panel--grafica">
          <h2 className="modulo-vida-digital__subtitulo">{SUBTITULOS_VISTA[vistaGrafica]}</h2>
          {renderizarPanelGrafica()}
        </article>

        {/* ANÁLISIS DESACTIVADO (cliente por definir si llevará texto):

        <article className="modulo-vida-digital__panel modulo-vida-digital__panel--texto">
          <h2 className="modulo-vida-digital__subtitulo">Análisis</h2>
          {renderizarPanelTexto()}
        </article>

        */}
      </div>
    </section>
  );
}

export default ModuloVidaDigital;
