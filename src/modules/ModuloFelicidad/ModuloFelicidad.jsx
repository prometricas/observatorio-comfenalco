/**
 * ModuloFelicidad — Indicador "Felicidad nacional bruta".
 *
 * Misma vista en banda completa del indicador de la OCDE: la gráfica
 * ocupa todo el ancho del módulo y el texto de análisis va debajo, en
 * todos los tamaños. La gráfica porta el explorador multiindicador del cuaderno
 * "App_Felicidad_Nacional": el índice FNB adaptado y sus componentes,
 * histórico 2015–2025 y escenario tendencial del propio Excel a 2050.
 *
 * Aquí no hay selectores: la selección de series se hace en la leyenda de
 * la figura (las cuatro de la vista por defecto arrancan visibles y las
 * otras dos se activan con un clic). El texto viene del documento propio
 * del indicador, no del resumen del eje.
 */
import { useEffect, useMemo, useState } from 'react';
import Cargador from '../../components/Cargador/Cargador.jsx';
import GraficaOcde from '../../components/GraficaOcde/GraficaOcde.jsx';
import { rutaExcelIndicador } from '../../data/indicadores.js';
import { ESTADO_TEXTO, obtenerTextoIndicador } from '../../services/docxService.js';
import { cargarBaseFelicidad, construirFiguraFnb } from '../../services/felicidadService.js';
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

function ModuloFelicidad({ indicadorSeccion, config }) {
  /* ── Base de datos de la figura ────────────────────────────────── */
  const [estadoDatos, setEstadoDatos] = useState(ESTADO_DATOS.CARGANDO);
  const [datos, setDatos] = useState(null);
  const [reintentosDatos, setReintentosDatos] = useState(0);

  /* ── Texto del indicador ───────────────────────────────────────── */
  const [texto, setTexto] = useState({ estado: ESTADO_CARGA_TEXTO.CARGANDO, titulo: null, parrafos: [] });
  const [reintentosTexto, setReintentosTexto] = useState(0);

  useEffect(() => {
    let vigente = true;
    cargarBaseFelicidad(rutaExcelIndicador(indicadorSeccion.slug, config.archivoExcel))
      .then((base) => {
        if (!vigente) return;
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
        <div className="modulo-felicidad__aviso" role="status">
          <p>No fue posible leer la base de datos del indicador.</p>
          <button
            type="button"
            className="modulo-felicidad__reintentar"
            onClick={() => {
              setEstadoDatos(ESTADO_DATOS.CARGANDO);
              setReintentosDatos((total) => total + 1);
            }}
          >
            Intentar de nuevo
          </button>
        </div>
      );
    }
    return (
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

        {datos.nota && <p className="modulo-felicidad__advertencia">{datos.nota}</p>}
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
        <div className="modulo-felicidad__aviso" role="status">
          <p>No fue posible leer el documento del análisis.</p>
          <button
            type="button"
            className="modulo-felicidad__reintentar"
            onClick={() => {
              setTexto({ estado: ESTADO_CARGA_TEXTO.CARGANDO, titulo: null, parrafos: [] });
              setReintentosTexto((total) => total + 1);
            }}
          >
            Intentar de nuevo
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
          {texto.parrafos.map((parrafo) => (
            <p key={parrafo.slice(0, 60)} className="modulo-felicidad__parrafo">
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
          <h2 className="modulo-felicidad__subtitulo">Índice y componentes</h2>
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
