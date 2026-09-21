/**
 * ModuloCapitalHumano — Indicador "Capital humano (WB)".
 *
 * 0.43.0: la descripción y la guía "Cómo usar el visualizador" del Word van ENCIMA
 * de la gráfica (componente compartido DescripcionIndicador); el panel "Análisis"
 * bajo la gráfica se retiró (petición del cliente).
 *
 * Misma vista en banda completa de los demás indicadores: la gráfica
 * ocupa todo el ancho del módulo y el texto de análisis va debajo, en
 * todos los tamaños. La gráfica porta los escenarios prospectivos del
 * cuaderno "App_Capital_Humano": banda entre el optimista y el pesimista
 * alrededor de la trayectoria tendencial del indicador elegido, con el
 * histórico observado en punteado cuando la serie lo trae.
 *
 * El desplegable de indicador replica el selector del cuaderno con el
 * control uniforme del portal. El texto viene del documento propio del
 * indicador (capital-humano.docx).
 */
import { useEffect, useMemo, useState } from 'react';
import Cargador from '../../components/Cargador/Cargador.jsx';
import DescripcionIndicador from '../../components/DescripcionIndicador/DescripcionIndicador.jsx';
import GraficaOcde from '../../components/GraficaOcde/GraficaOcde.jsx';
import SelectorCampo from '../../components/SelectorCampo/SelectorCampo.jsx';
import { rutaExcelIndicador } from '../../data/indicadores.js';
import { ESTADO_TEXTO, obtenerTextoIndicador } from '../../services/docxService.js';
import {
  NOTA_FUENTE,
  cargarBaseCapitalHumano,
  construirFiguraCapitalHumano,
} from '../../services/capitalHumanoService.js';
import './modulo-capital-humano.css';

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

function ModuloCapitalHumano({ indicadorSeccion, config }) {
  /* ── Base de datos de la figura ────────────────────────────────── */
  const [estadoDatos, setEstadoDatos] = useState(ESTADO_DATOS.CARGANDO);
  const [datos, setDatos] = useState(null);
  const [reintentosDatos, setReintentosDatos] = useState(0);

  /* Indicador elegido en el desplegable (null = el inicial de la base). */
  const [campoIndicador, setCampoIndicador] = useState(null);

  /* ── Texto del indicador ───────────────────────────────────────── */
  const [texto, setTexto] = useState({ estado: ESTADO_CARGA_TEXTO.CARGANDO, titulo: null, parrafos: [] });
  const [reintentosTexto, setReintentosTexto] = useState(0);

  useEffect(() => {
    let vigente = true;
    cargarBaseCapitalHumano(rutaExcelIndicador(indicadorSeccion.slug, config.archivoExcel))
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

  const campoActivo = campoIndicador ?? datos?.indicadorInicial ?? null;

  const figura = useMemo(
    () => (datos && campoActivo ? construirFiguraCapitalHumano(datos, campoActivo) : null),
    [datos, campoActivo],
  );

  /* Tabla accesible: las cuatro series del indicador elegido por año. */
  const tabla = useMemo(() => {
    if (!datos || !campoActivo) return null;
    const indicador =
      datos.indicadores.find((i) => i.campo === campoActivo) ?? datos.indicadores[0];
    const porAnio = new Map();
    const volcar = (puntos, columna) => {
      for (const punto of puntos) {
        if (!porAnio.has(punto.anio)) porAnio.set(punto.anio, {});
        porAnio.get(punto.anio)[columna] = punto.valor.toFixed(3);
      }
    };
    volcar(indicador.historico, 'Histórico');
    volcar(indicador.tendencial, 'Tendencial');
    volcar(indicador.optimista, 'Optimista');
    volcar(indicador.pesimista, 'Pesimista');
    return {
      titulo: `${indicador.etiqueta} (${indicador.unidad}): serie observada y escenarios prospectivos por año`,
      columnas: ['Año', 'Histórico', 'Tendencial', 'Optimista', 'Pesimista'],
      filas: [...porAnio.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([anio, valores]) => [
          anio,
          valores['Histórico'] ?? '—',
          valores['Tendencial'] ?? '—',
          valores['Optimista'] ?? '—',
          valores['Pesimista'] ?? '—',
        ]),
    };
  }, [datos, campoActivo]);

  /* ── Panel de la gráfica según el estado de la base ────────────── */
  const renderizarPanelGrafica = () => {
    if (estadoDatos === ESTADO_DATOS.CARGANDO) {
      return <Cargador mensaje="Leyendo la base de datos del indicador…" tamano="grande" enBloque />;
    }
    if (estadoDatos === ESTADO_DATOS.ERROR) {
      return (
        <div className="modulo-capital-humano__aviso" role="alert">
          <p>No fue posible leer la base de datos del indicador.</p>
          <button
            type="button"
            className="modulo-capital-humano__reintentar"
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

    const etiquetaActiva =
      datos.indicadores.find((i) => i.campo === campoActivo)?.etiqueta ?? '';

    return (
      <>
        <div className="modulo-capital-humano__controles">
          <SelectorCampo
            etiqueta="Indicador"
            valor={campoActivo}
            opciones={datos.indicadores.map((i) => ({ valor: i.campo, etiqueta: i.etiqueta }))}
            onCambiar={setCampoIndicador}
          />
        </div>

        <GraficaOcde
          figura={figura}
          etiquetaAccesible={`Escenarios prospectivos de ${etiquetaActiva} en Colombia: trayectorias optimista, tendencial y pesimista`}
          tabla={tabla}
        />

        <p className="modulo-capital-humano__advertencia">{NOTA_FUENTE}</p>
      </>
    );
  };


  return (
    <section className="modulo-capital-humano" aria-labelledby="titulo-capital-humano">
      <header className="modulo-capital-humano__encabezado">
        <h1 id="titulo-capital-humano" className="modulo-capital-humano__titulo">
          {indicadorSeccion.etiqueta}
        </h1>
        {datos && (
          <p className="modulo-capital-humano__descripcion">
            Indicadores de capital humano del Banco Mundial (HCI+ 2026 y HCI) para Colombia:
            datos observados y escenarios prospectivos optimista, tendencial y pesimista del
            indicador elegido.
          </p>
        )}
      </header>

      {/* Descripción y guía de uso del Word, ENCIMA del visualizador (0.43.0) */}
      <DescripcionIndicador
        texto={texto}
        estados={ESTADO_CARGA_TEXTO}
        nombre={indicadorSeccion.etiqueta}
        onReintentar={() => {
          setTexto({ estado: ESTADO_CARGA_TEXTO.CARGANDO, titulo: null, parrafos: [] });
          setReintentosTexto((total) => total + 1);
        }}
      />

      <div className="modulo-capital-humano__contenido">
        <article className="modulo-capital-humano__panel modulo-capital-humano__panel--grafica">
          <h2 className="modulo-capital-humano__subtitulo">Escenarios prospectivos</h2>
          {renderizarPanelGrafica()}
        </article>
      </div>
    </section>
  );
}

export default ModuloCapitalHumano;
