/**
 * ModuloVidaMejor — Indicador "Una vida mejor OCDE".
 *
 * Vista en banda completa (ajuste aprobado por el cliente, 2026-08-07):
 * la gráfica ocupa todo el ancho del módulo y el texto de análisis va
 * debajo, en todos los tamaños de pantalla — la misma disposición del
 * modo móvil.
 *
 *  - Gráfica: evolución de la posición en el ranking de la OCDE (figura 1
 *    del cuaderno "App_Vida_Mejor"), con selección de países, escenario y
 *    año inicial. Es la única figura del cuaderno que se muestra; las
 *    demás quedan portadas en `vidaMejorFiguras` por si se habilitan.
 *  - Texto: la sección de este índice dentro del documento de resumen del
 *    eje (`resumen-indicadores.docx`), extraída por título.
 *
 * A diferencia de las tendencias, esta base es por PAÍS: aquí no hay mapa
 * de Colombia. La base (~590 kB) se lee en el hilo principal con caché por
 * URL; no requiere worker ni IndexedDB.
 */
import { useEffect, useMemo, useState } from 'react';
import Cargador from '../../components/Cargador/Cargador.jsx';
import GraficaOcde from '../../components/GraficaOcde/GraficaOcde.jsx';
import SelectorCampo from '../../components/SelectorCampo/SelectorCampo.jsx';
import {
  TITULOS_RESUMEN_INDICADORES,
  rutaExcelIndicador,
} from '../../data/indicadores.js';
import { ESTADO_TEXTO, obtenerSeccionIndicador } from '../../services/docxService.js';
import {
  ESCENARIOS_PROYECCION,
  PAIS_DESTACADO,
  cargarBaseVidaMejor,
} from '../../services/vidaMejorService.js';
import { construirFiguraRanking } from '../../services/vidaMejorFiguras.js';
import './modulo-vida-mejor.css';

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

/* País de comparación inicial: el par regional del cuaderno. */
const PAIS_COMPARADO_INICIAL = 'Chile';

/* Año inicial del cuaderno para la vista del ranking. */
const ANIO_INICIAL = 2015;

function ModuloVidaMejor({ indicadorSeccion, config }) {
  /* ── Base de datos del ranking ─────────────────────────────────── */
  const [estadoDatos, setEstadoDatos] = useState(ESTADO_DATOS.CARGANDO);
  const [datos, setDatos] = useState(null);
  const [reintentosDatos, setReintentosDatos] = useState(0);

  /* Controles de la figura: Colombia siempre se dibuja; el selector elige
     el país con el que se compara. */
  const [paisComparado, setPaisComparado] = useState(PAIS_COMPARADO_INICIAL);
  const [escenario, setEscenario] = useState('Tendencial');
  const [anioInicio, setAnioInicio] = useState(ANIO_INICIAL);

  /* Países dibujados en la figura, en orden de leyenda. */
  const paises = useMemo(
    () => (paisComparado && paisComparado !== PAIS_DESTACADO ? [PAIS_DESTACADO, paisComparado] : [PAIS_DESTACADO]),
    [paisComparado],
  );

  /* ── Texto del indicador ───────────────────────────────────────── */
  const [texto, setTexto] = useState({ estado: ESTADO_CARGA_TEXTO.CARGANDO, titulo: null, parrafos: [] });
  const [reintentosTexto, setReintentosTexto] = useState(0);

  useEffect(() => {
    let vigente = true;
    cargarBaseVidaMejor(rutaExcelIndicador(indicadorSeccion.slug, config.archivoExcel))
      .then((base) => {
        if (!vigente) return;
        /* Si el archivo no trae el país de comparación inicial, se toma
           el primero disponible distinto de Colombia. */
        setPaisComparado((pais) =>
          base.paises.includes(pais) ? pais : base.paises.find((p) => p !== PAIS_DESTACADO) ?? pais,
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

  /* El módulo se remonta por indicador (key en la App), así que el efecto
     solo se re-dispara al reintentar; el estado "cargando" lo repone el
     propio botón de reintento (la regla de lint del proyecto prohíbe el
     setState síncrono dentro de un efecto). */
  useEffect(() => {
    let vigente = true;
    obtenerSeccionIndicador(
      indicadorSeccion.slug,
      config.archivoTexto,
      config.tituloSeccion,
      TITULOS_RESUMEN_INDICADORES.filter((titulo) => titulo !== config.tituloSeccion),
    )
      .then((resultado) => {
        if (vigente) setTexto(resultado);
      })
      .catch(() => {
        if (vigente) setTexto({ estado: ESTADO_CARGA_TEXTO.ERROR, titulo: null, parrafos: [] });
      });
    return () => {
      vigente = false;
    };
  }, [indicadorSeccion.slug, config.archivoTexto, config.tituloSeccion, reintentosTexto]);

  /* Figura y tabla accesible; solo se rehacen al cambiar la selección. */
  const figura = useMemo(
    () => (datos ? construirFiguraRanking(datos, paises, escenario, anioInicio, datos.anioMax) : null),
    [datos, paises, escenario, anioInicio],
  );

  const tabla = useMemo(() => {
    if (!datos) return null;
    const porAnio = new Map();
    paises.forEach((pais) => {
      const historico = datos
        .serie(pais, datos.escenarioHistorico)
        .filter((fila) => fila.anio >= anioInicio);
      [...historico, ...datos.serie(pais, escenario)].forEach((fila) => {
        if (!porAnio.has(fila.anio)) porAnio.set(fila.anio, {});
        porAnio.get(fila.anio)[pais] = fila['Posición OCDE'];
      });
    });
    return {
      titulo: `Posición en el ranking de la OCDE por año, escenario ${escenario}`,
      columnas: ['Año', ...paises],
      filas: [...porAnio.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([anio, valores]) => [anio, ...paises.map((pais) => valores[pais] ?? '—')]),
    };
  }, [datos, paises, escenario, anioInicio]);

  /* Advertencia metodológica del propio archivo (si la trae). */
  const advertencia = datos?.metodologia.find((fila) => fila.elemento === 'Advertencia')?.descripcion;

  /* ── Panel de la gráfica según el estado de la base ────────────── */
  const renderizarPanelGrafica = () => {
    if (estadoDatos === ESTADO_DATOS.CARGANDO) {
      return <Cargador mensaje="Leyendo la base de datos del indicador…" tamano="grande" enBloque />;
    }
    if (estadoDatos === ESTADO_DATOS.ERROR) {
      return (
        <div className="modulo-vida-mejor__aviso" role="status">
          <p>No fue posible leer la base de datos del indicador.</p>
          <button
            type="button"
            className="modulo-vida-mejor__reintentar"
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
        <div className="modulo-vida-mejor__controles">
          <SelectorCampo
            etiqueta={`Comparar ${PAIS_DESTACADO} con`}
            valor={paisComparado}
            opciones={datos.paises.filter((pais) => pais !== PAIS_DESTACADO)}
            onCambiar={setPaisComparado}
          />
          <SelectorCampo
            etiqueta="Escenario"
            valor={escenario}
            opciones={ESCENARIOS_PROYECCION}
            onCambiar={setEscenario}
          />
          <SelectorCampo
            etiqueta="Desde el año"
            valor={anioInicio}
            opciones={(() => {
              const anios = [];
              for (let anio = datos.anioMin; anio < datos.anioMax; anio += 1) anios.push(anio);
              return anios;
            })()}
            onCambiar={(anio) => setAnioInicio(Number(anio))}
          />
        </div>

        <GraficaOcde
          figura={figura}
          etiquetaAccesible={`Evolución de la posición en el ranking de la OCDE de ${paises.join(', ')}`}
          tabla={tabla}
        />

        {advertencia && <p className="modulo-vida-mejor__advertencia">{advertencia}</p>}
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
        <div className="modulo-vida-mejor__aviso" role="status">
          <p>No fue posible leer el documento del análisis.</p>
          <button
            type="button"
            className="modulo-vida-mejor__reintentar"
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
        <p className="modulo-vida-mejor__aviso" role="status">
          Contenido en preparación para este indicador.
        </p>
      );
    }
    return (
      <>
        <h3 className="modulo-vida-mejor__texto-titulo">{texto.titulo}</h3>
        {/* Región desplazable y enfocable: en escritorio el texto acompaña
            a la gráfica sin alargar la página; con teclado se recorre tras
            enfocarla. */}
        <div
          className="modulo-vida-mejor__texto-contenido"
          role="region"
          aria-label={`Análisis del indicador ${indicadorSeccion.etiqueta}`}
          tabIndex={0}
        >
          {texto.parrafos.map((parrafo) => (
            <p key={parrafo.slice(0, 60)} className="modulo-vida-mejor__parrafo">
              {parrafo}
            </p>
          ))}
        </div>
      </>
    );
  };

  return (
    <section className="modulo-vida-mejor" aria-labelledby="titulo-vida-mejor">
      <header className="modulo-vida-mejor__encabezado">
        <h1 id="titulo-vida-mejor" className="modulo-vida-mejor__titulo">
          {indicadorSeccion.etiqueta}
        </h1>
        {datos && (
          <p className="modulo-vida-mejor__descripcion">
            Índice para una Vida Mejor de la OCDE: posiciones observadas {datos.anioMin}–
            {datos.anioCorte} y proyectadas {datos.anioCorte + 1}–{datos.anioMax} bajo tres
            escenarios, para los {datos.paises.length} países miembros.
          </p>
        )}
      </header>

      <div className="modulo-vida-mejor__contenido">
        <article className="modulo-vida-mejor__panel modulo-vida-mejor__panel--grafica">
          <h2 className="modulo-vida-mejor__subtitulo">Evolución en el ranking</h2>
          {renderizarPanelGrafica()}
        </article>

        <article className="modulo-vida-mejor__panel modulo-vida-mejor__panel--texto">
          <h2 className="modulo-vida-mejor__subtitulo">Análisis</h2>
          {renderizarPanelTexto()}
        </article>
      </div>
    </section>
  );
}

export default ModuloVidaMejor;
