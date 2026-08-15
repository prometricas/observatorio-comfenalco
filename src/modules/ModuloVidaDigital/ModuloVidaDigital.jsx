/**
 * ModuloVidaDigital — Indicador "Calidad vida digital".
 *
 * Misma vista en banda completa de los demás indicadores, con DOS
 * gráficas del cuaderno "App_Vida_Digital" alternadas por un conmutador
 * de botones (peticiones del cliente, 2026-08-14):
 *  1. "Trayectoria y escenarios simulados": selector múltiple de país
 *     (1–4; con uno, el visualizador individual completo; con varios,
 *     la comparación), selector de escenario (central + 24 simulados,
 *     reemplaza al deslizador con Play del cuaderno) y casilla del
 *     intervalo del 95 %.
 *  2. "Comparador por escenario": de dos a cuatro países bajo un mismo
 *     escenario nombrado (pesimista P20 / tendencial central del Excel /
 *     optimista P80), con la caja "Valores 2030" y los límites del 95 %
 *     conmutables.
 *
 * El texto viene del documento propio del indicador
 * (calidad-vida-digital.docx); mientras el cliente no lo publique, la
 * tarjeta muestra "contenido en preparación".
 */
import { useEffect, useMemo, useState } from 'react';
import Cargador from '../../components/Cargador/Cargador.jsx';
import GraficaOcde from '../../components/GraficaOcde/GraficaOcde.jsx';
import SelectorCampo from '../../components/SelectorCampo/SelectorCampo.jsx';
import { rutaExcelIndicador } from '../../data/indicadores.js';
import { ESTADO_TEXTO, obtenerTextoIndicador } from '../../services/docxService.js';
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

/* Selección inicial del comparador, la del cuaderno. */
const PAISES_COMPARADOR_INICIALES = ['Colombia', 'Chile', 'Mexico', 'Costa Rica'];

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

  /* ── Texto del indicador ───────────────────────────────────────── */
  const [texto, setTexto] = useState({ estado: ESTADO_CARGA_TEXTO.CARGANDO, titulo: null, parrafos: [] });
  const [reintentosTexto, setReintentosTexto] = useState(0);

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
              <SelectorCampo
                etiqueta="Países"
                valor={paisesElegidos ?? []}
                opciones={datos.nombres}
                multiple
                filas={8}
                ayuda={`Elija entre 1 y ${MAXIMO_PAISES_DQL} países (Ctrl + clic en escritorio; toque para marcar en móvil). Con uno solo se muestran la banda y las trayectorias completas.`}
                onCambiar={(seleccion) => setPaisesElegidos(seleccion.slice(0, MAXIMO_PAISES_DQL))}
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

            {figura ? (
              <GraficaOcde
                figura={figura}
                etiquetaAccesible={`Digital Quality of Life Index de ${paisesActivos.join(', ')}: serie histórica 2022–2025 y proyección 2026–2030${escenario > 0 ? ` con el escenario simulado ${escenario} destacado` : ''}`}
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
              <SelectorCampo
                etiqueta="Países"
                valor={paisesComparador ?? []}
                opciones={datos.nombres}
                multiple
                filas={8}
                ayuda={`Elija entre 2 y ${MAXIMO_PAISES_DQL} países (Ctrl + clic en escritorio; toque para marcar en móvil).`}
                onCambiar={(seleccion) => setPaisesComparador(seleccion.slice(0, MAXIMO_PAISES_DQL))}
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

  /* ── Panel del texto según el estado del documento ─────────────── */
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
          {texto.parrafos.map((parrafo) => (
            <p key={parrafo.slice(0, 60)} className="modulo-vida-digital__parrafo">
              {parrafo}
            </p>
          ))}
        </div>
      </>
    );
  };

  return (
    <section className="modulo-vida-digital" aria-labelledby="titulo-vida-digital">
      <header className="modulo-vida-digital__encabezado">
        <h1 id="titulo-vida-digital" className="modulo-vida-digital__titulo">
          {indicadorSeccion.etiqueta}
        </h1>
        {datos && (
          <p className="modulo-vida-digital__descripcion">
            Digital Quality of Life Index (Surfshark) de {datos.nombres.length - 1} países de la
            OCDE y su promedio, en escala de 0 a 1: serie histórica oficial 2022–2025 y pronóstico
            econométrico 2026–2030 con su intervalo de predicción.
          </p>
        )}
      </header>

      <div className="modulo-vida-digital__contenido">
        <article className="modulo-vida-digital__panel modulo-vida-digital__panel--grafica">
          <h2 className="modulo-vida-digital__subtitulo">{SUBTITULOS_VISTA[vistaGrafica]}</h2>
          {renderizarPanelGrafica()}
        </article>

        <article className="modulo-vida-digital__panel modulo-vida-digital__panel--texto">
          <h2 className="modulo-vida-digital__subtitulo">Análisis</h2>
          {renderizarPanelTexto()}
        </article>
      </div>
    </section>
  );
}

export default ModuloVidaDigital;
