/**
 * ModuloDesempenoAmbiental — Indicador "Desempeño ambiental".
 *
 * Misma vista en banda completa de los demás indicadores: la gráfica
 * ocupa todo el ancho del módulo y el texto de análisis va debajo, en
 * todos los tamaños. La gráfica porta el visualizador individual del
 * cuaderno "App_Desempeño_Ambiental" para Colombia: histórico armonizado
 * 2000–2025, dato oficial del EPI 2026, escenarios 2027–2050 con el
 * corredor restrictivo–optimista y sus trayectorias intermedias, y las
 * cajas de indicadores clave. No lleva controles: es una sola vista.
 *
 * El texto viene del documento propio del indicador
 * (desempeno-ambiental.docx).
 */
import { useEffect, useMemo, useState } from 'react';
import Cargador from '../../components/Cargador/Cargador.jsx';
import GraficaOcde from '../../components/GraficaOcde/GraficaOcde.jsx';
import { rutaExcelIndicador } from '../../data/indicadores.js';
import { ESTADO_TEXTO, obtenerTextoIndicador } from '../../services/docxService.js';
import {
  NOTA_FUENTE,
  cargarBaseDesempenoAmbiental,
  construirFiguraDesempenoAmbiental,
} from '../../services/desempenoAmbientalService.js';
import './modulo-desempeno-ambiental.css';

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

  /* ── Texto del indicador ───────────────────────────────────────── */
  const [texto, setTexto] = useState({ estado: ESTADO_CARGA_TEXTO.CARGANDO, titulo: null, parrafos: [] });
  const [reintentosTexto, setReintentosTexto] = useState(0);

  useEffect(() => {
    let vigente = true;
    cargarBaseDesempenoAmbiental(rutaExcelIndicador(indicadorSeccion.slug, config.archivoExcel))
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

  const figura = useMemo(() => (datos ? construirFiguraDesempenoAmbiental(datos) : null), [datos]);

  /* Tabla accesible: histórico, dato oficial y escenarios por año. */
  const tabla = useMemo(() => {
    if (!datos) return null;
    const porAnio = new Map();
    const volcar = (puntos, columna) => {
      for (const punto of puntos) {
        if (!porAnio.has(punto.anio)) porAnio.set(punto.anio, {});
        porAnio.get(punto.anio)[columna] = punto.valor.toFixed(2);
      }
    };
    volcar(datos.historico, 'Histórico');
    volcar([datos.oficial], 'Oficial');
    volcar(datos.restrictivo, 'Restrictivo');
    volcar(datos.tendencial, 'Tendencial');
    volcar(datos.optimista, 'Optimista');
    return {
      titulo:
        'Environmental Performance Index de Colombia: histórico armonizado, dato oficial 2026 y escenarios prospectivos por año',
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
  }, [datos]);

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
        <GraficaOcde
          figura={figura}
          etiquetaAccesible="Environmental Performance Index de Colombia: histórico armonizado, dato oficial 2026 y escenarios prospectivos con su corredor"
          tabla={tabla}
        />

        <p className="modulo-desempeno-ambiental__advertencia">{NOTA_FUENTE}</p>
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
          {texto.parrafos.map((parrafo) => (
            <p key={parrafo.slice(0, 60)} className="modulo-desempeno-ambiental__parrafo">
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
          <h2 className="modulo-desempeno-ambiental__subtitulo">Trayectoria y escenarios</h2>
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
