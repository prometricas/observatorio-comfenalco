/**
 * ModuloVidaMejor — Indicador "Una vida mejor OCDE".
 *
 * 0.43.0: la descripción y la guía "Cómo usar el visualizador" del Word van ENCIMA
 * de la gráfica (componente compartido DescripcionIndicador); el panel "Análisis"
 * bajo la gráfica se retiró (petición del cliente).
 * 0.45.0: el título del Word va como subtítulo bajo el h1 (DescripcionIndicador) y la
 * ficha técnica de la figura (años, países) pasa DEBAJO del panel gráfico.
 *
 * Vista en banda completa (ajuste aprobado por el cliente, 2026-08-07):
 * la gráfica ocupa todo el ancho del módulo y el texto de análisis va
 * debajo, en todos los tamaños de pantalla — la misma disposición del
 * modo móvil.
 *
 *  - Gráficas: DOS figuras del cuaderno "App_Vida_Mejor" que se alternan
 *    con un conmutador de botones (petición del cliente: una a la vez para
 *    aprovechar el espacio sin desplazamiento largo). "Evolución del
 *    ranking" muestra la posición OCDE con selección de país comparado y
 *    escenario (el selector de año inicial quedó desactivado a pedido del
 *    cliente, comentado y reactivable); "Escenarios por indicador" muestra el
 *    abanico histórico + tres escenarios de un país e indicador elegidos,
 *    con sus tarjetas de cifras clave. Las figuras de brecha y comparador
 *    quedan portadas en `vidaMejorFiguras` por si se habilitan.
 *  - Texto: la sección de este índice dentro del documento de resumen del
 *    eje (`resumen-indicadores.docx`), extraída por título.
 *
 * A diferencia de las tendencias, esta base es por PAÍS: aquí no hay mapa
 * de Colombia. En la operación normal el navegador solo descarga el
 * precalculado del build (vidaMejorService); el Excel y su intérprete
 * quedan como respaldo diferido.
 */
import { useEffect, useMemo, useState } from 'react';
import Cargador from '../../components/Cargador/Cargador.jsx';
import DescripcionIndicador from '../../components/DescripcionIndicador/DescripcionIndicador.jsx';
import GraficaOcde from '../../components/GraficaOcde/GraficaOcde.jsx';
import SelectorCampo from '../../components/SelectorCampo/SelectorCampo.jsx';
import {
  TITULOS_RESUMEN_INDICADORES,
  rutaExcelIndicador,
} from '../../data/indicadores.js';
import { ESTADO_TEXTO, obtenerSeccionIndicador } from '../../services/docxService.js';
import {
  ESCENARIOS_PROYECCION,
  INDICADORES_OCDE,
  PAIS_DESTACADO,
  calcularCifrasClave,
  cargarBaseVidaMejor,
  serieEncadenada,
  serieHistorica,
} from '../../services/vidaMejorService.js';
import {
  construirFiguraAbanico,
  construirFiguraRanking,
} from '../../services/vidaMejorFiguras.js';
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

/* Año inicial del cuaderno para la vista del ranking. Mientras el
   selector "Desde el año" esté desactivado, es el arranque fijo de la
   figura (2015–2050, el horizonte completo de consulta). */
const ANIO_INICIAL = 2015;

/* Las dos gráficas del módulo; el conmutador muestra una a la vez
   (petición del cliente: aprovechar el espacio sin apilar figuras). */
const VISTAS_GRAFICA = [
  { id: 'ranking', etiqueta: 'Evolución del ranking' },
  { id: 'escenarios', etiqueta: 'Escenarios por indicador' },
];

/* Valor con los decimales del indicador, en formato local. */
function formatearValor(valor, decimales) {
  if (typeof valor !== 'number') return '—';
  return valor.toLocaleString('es-CO', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}

function ModuloVidaMejor({ indicadorSeccion, config }) {
  /* ── Base de datos del ranking ─────────────────────────────────── */
  const [estadoDatos, setEstadoDatos] = useState(ESTADO_DATOS.CARGANDO);
  const [datos, setDatos] = useState(null);
  const [reintentosDatos, setReintentosDatos] = useState(0);

  /* Gráfica visible: ranking o escenarios (abanico). */
  const [vistaGrafica, setVistaGrafica] = useState('ranking');

  /* Controles del ranking: Colombia siempre se dibuja; el selector elige
     el país con el que se compara. `anioInicio` queda fijo en ANIO_INICIAL
     mientras su selector esté desactivado (ver el bloque comentado en los
     controles); al reactivarlo, restaurar aquí el `setAnioInicio`. */
  const [paisComparado, setPaisComparado] = useState(PAIS_COMPARADO_INICIAL);
  const [escenario, setEscenario] = useState('Tendencial');
  const [anioInicio] = useState(ANIO_INICIAL);

  /* Controles del abanico de escenarios: país e indicador consultados. */
  const [paisAbanico, setPaisAbanico] = useState(PAIS_DESTACADO);
  const [campoIndicador, setCampoIndicador] = useState(INDICADORES_OCDE[0].campo);

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
           el primero disponible distinto de Colombia; si no trae el país
           destacado del abanico, el primero de la base. */
        setPaisComparado((pais) =>
          base.paises.includes(pais) ? pais : base.paises.find((p) => p !== PAIS_DESTACADO) ?? pais,
        );
        setPaisAbanico((pais) => (base.paises.includes(pais) ? pais : base.paises[0] ?? pais));
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

  /* Figuras y tablas accesibles; solo se rehacen al cambiar la selección. */
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

  /* Indicador elegido para el abanico (con respaldo al primero). */
  const indicador = useMemo(
    () => INDICADORES_OCDE.find((i) => i.campo === campoIndicador) ?? INDICADORES_OCDE[0],
    [campoIndicador],
  );

  const figuraAbanico = useMemo(
    () => (datos ? construirFiguraAbanico(datos, paisAbanico, indicador) : null),
    [datos, paisAbanico, indicador],
  );

  /* Cifras clave de las tarjetas sobre el abanico. */
  const cifras = useMemo(
    () => (datos ? calcularCifrasClave(datos, paisAbanico, indicador) : null),
    [datos, paisAbanico, indicador],
  );

  const tablaAbanico = useMemo(() => {
    if (!datos) return null;
    const porAnio = new Map();
    const series = {
      Observado: serieHistorica(datos, paisAbanico, indicador.campo),
      Tendencial: serieEncadenada(datos, paisAbanico, 'Tendencial', indicador.campo),
      Optimista: serieEncadenada(datos, paisAbanico, 'Optimista', indicador.campo),
      Restrictivo: serieEncadenada(datos, paisAbanico, 'Restrictivo', indicador.campo),
    };
    Object.entries(series).forEach(([nombre, puntos]) => {
      puntos.forEach((punto) => {
        if (!porAnio.has(punto.anio)) porAnio.set(punto.anio, {});
        porAnio.get(punto.anio)[nombre] = formatearValor(punto.valor, indicador.decimales);
      });
    });
    const columnas = ['Año', 'Observado', 'Tendencial', 'Optimista', 'Restrictivo'];
    return {
      titulo: `${indicador.etiqueta} de ${paisAbanico} por año, observado y por escenario, en ${indicador.unidad}`,
      columnas,
      filas: [...porAnio.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([anio, valores]) => [anio, ...columnas.slice(1).map((serie) => valores[serie] ?? '—')]),
    };
  }, [datos, paisAbanico, indicador]);

  /* Advertencia metodológica del propio archivo (si la trae). */
  const advertencia = datos?.metodologia.find((fila) => fila.elemento === 'Advertencia')?.descripcion;

  /* ── Panel de la gráfica según el estado de la base ────────────── */
  const renderizarPanelGrafica = () => {
    if (estadoDatos === ESTADO_DATOS.CARGANDO) {
      return <Cargador mensaje="Leyendo la base de datos del indicador…" tamano="grande" enBloque />;
    }
    if (estadoDatos === ESTADO_DATOS.ERROR) {
      return (
        <div className="modulo-vida-mejor__aviso" role="alert">
          <p>No fue posible leer la base de datos del indicador.</p>
          <button
            type="button"
            className="modulo-vida-mejor__reintentar"
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
          className="modulo-vida-mejor__conmutador"
          role="group"
          aria-label="Gráfica mostrada"
        >
          {VISTAS_GRAFICA.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              className={`modulo-vida-mejor__conmutador-boton${
                vistaGrafica === opcion.id ? ' modulo-vida-mejor__conmutador-boton--activo' : ''
              }`}
              aria-pressed={vistaGrafica === opcion.id}
              onClick={() => setVistaGrafica(opcion.id)}
            >
              {opcion.etiqueta}
            </button>
          ))}
        </div>

        {vistaGrafica === 'ranking' ? (
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
              {/* Selector "Desde el año" DESACTIVADO a pedido del cliente
                  (2026-08-12): la figura ya muestra el horizonte completo
                  2015–2050 y el control no se necesita por ahora. Se puede
                  reactivar más adelante restaurando este bloque tal cual y
                  el `setAnioInicio` del estado (arriba).

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
              */}
            </div>

            <GraficaOcde
              figura={figura}
              etiquetaAccesible={`Evolución de la posición en el ranking de la OCDE de ${paises.join(', ')}`}
              tabla={tabla}
            />
          </>
        ) : (
          <>
            <div className="modulo-vida-mejor__controles">
              <SelectorCampo
                etiqueta="País"
                valor={paisAbanico}
                opciones={datos.paises}
                onCambiar={setPaisAbanico}
              />
              <SelectorCampo
                etiqueta="Indicador"
                valor={campoIndicador}
                opciones={INDICADORES_OCDE.map((i) => ({ valor: i.campo, etiqueta: i.etiqueta }))}
                onCambiar={setCampoIndicador}
              />
            </div>

            {/* Cifras clave del país e indicador consultados */}
            <ul className="modulo-vida-mejor__cifras">
              <li className="modulo-vida-mejor__cifra modulo-vida-mejor__cifra--observado">
                <span className="modulo-vida-mejor__cifra-etiqueta">
                  {indicador.etiqueta} · {cifras.observado?.anio ?? datos.anioCorte}
                </span>
                <strong className="modulo-vida-mejor__cifra-valor">
                  {formatearValor(cifras.observado?.valor, indicador.decimales)}
                </strong>
              </li>
              <li className="modulo-vida-mejor__cifra modulo-vida-mejor__cifra--tendencial">
                <span className="modulo-vida-mejor__cifra-etiqueta">
                  Proyección {datos.anioMax} (tendencial)
                </span>
                <strong className="modulo-vida-mejor__cifra-valor">
                  {formatearValor(cifras.tendencialFinal?.valor, indicador.decimales)}
                </strong>
              </li>
              <li className="modulo-vida-mejor__cifra modulo-vida-mejor__cifra--optimista">
                <span className="modulo-vida-mejor__cifra-etiqueta">
                  Proyección {datos.anioMax} (optimista)
                </span>
                <strong className="modulo-vida-mejor__cifra-valor">
                  {formatearValor(cifras.optimistaFinal?.valor, indicador.decimales)}
                </strong>
              </li>
              <li className="modulo-vida-mejor__cifra modulo-vida-mejor__cifra--posicion">
                <span className="modulo-vida-mejor__cifra-etiqueta">
                  Posición OCDE {datos.anioCorte}
                </span>
                <strong className="modulo-vida-mejor__cifra-valor">
                  {formatearValor(cifras.posicionCorte, 0)}
                </strong>
              </li>
            </ul>

            <GraficaOcde
              figura={figuraAbanico}
              etiquetaAccesible={`${indicador.etiqueta} de ${paisAbanico}: serie observada y escenarios tendencial, optimista y restrictivo`}
              tabla={tablaAbanico}
            />
          </>
        )}

        {advertencia && <p className="modulo-vida-mejor__advertencia">{advertencia}</p>}
      </>
    );
  };


  return (
    <section className="modulo-vida-mejor" aria-labelledby="titulo-vida-mejor">
      <header className="modulo-vida-mejor__encabezado">
        <h1 id="titulo-vida-mejor" className="modulo-vida-mejor__titulo">
          {indicadorSeccion.etiqueta}
        </h1>
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

      <div className="modulo-vida-mejor__contenido">
        <article className="modulo-vida-mejor__panel modulo-vida-mejor__panel--grafica">
          <h2 className="modulo-vida-mejor__subtitulo">
            {vistaGrafica === 'ranking' ? 'Evolución en el ranking' : 'Escenarios por indicador'}
          </h2>
          {renderizarPanelGrafica()}
        </article>

        {/* Ficha técnica de la figura (0.45.0: antes iba bajo el título;
            es muy técnica y aquí acompaña a la gráfica sin competir con la
            descripción del indicador) */}
        {datos && (
          <p className="modulo-vida-mejor__nota-tecnica">
            Índice para una Vida Mejor de la OCDE: posiciones observadas {datos.anioMin}–
            {datos.anioCorte} y proyectadas {datos.anioCorte + 1}–{datos.anioMax} bajo tres
            escenarios, para los {datos.paises.length} países miembros.
          </p>
        )}
      </div>
    </section>
  );
}

export default ModuloVidaMejor;
