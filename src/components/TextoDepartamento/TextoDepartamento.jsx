/**
 * TextoDepartamento — Cuadro de texto del departamento seleccionado.
 *
 * Pide el documento Word de la tendencia y el departamento activos al
 * docxService y renderiza su texto plano como párrafos, estilizados
 * únicamente por el CSS del portal (Catamaran). Maneja cuatro estados:
 * cargando (con aviso solo si la respuesta tarda, para evitar parpadeos
 * en lecturas ya cacheadas), contenido disponible, contenido en
 * preparación y error de carga con botón de reintento.
 *
 * Con `formatoArticulo` (tendencias cuyo documento sigue la plantilla de
 * artículo del portal, como Envejecimiento) el texto plano se compone con
 * el mismo tratamiento del módulo de Gasto social: el primer párrafo es
 * el título propio de la sección, las líneas "Fuente: …" van como nota,
 * y tras el párrafo "Referencias" cada entrada se sangra a la francesa
 * con sus URL convertidas en enlaces. Los enlaces muestran SIEMPRE la
 * propia URL como texto (nunca un rótulo distinto): así un documento
 * malicioso no puede disfrazar un destino con texto inocente.
 *
 * Accesibilidad: los avisos se anuncian con role="status" / "alert" y la
 * región desplazable del texto se rotula con el título visible del módulo
 * (aria-labelledby={idTitulo}).
 */
import { useEffect, useState } from 'react';
import Cargador from '../Cargador/Cargador.jsx';
import {
  ESTADO_TEXTO,
  obtenerSeccionDepartamento,
  obtenerTextoDepartamento,
} from '../../services/docxService.js';
import './texto-departamento.css';

/* Estados internos de la carga del documento. */
const ESTADO_CARGA = {
  CARGANDO: 'cargando',
  LISTO: 'listo',
  SIN_CONTENIDO: 'sin-contenido',
  ERROR: 'error',
};

/* Milisegundos sin respuesta antes de mostrar el aviso "Cargando…". */
const RETARDO_AVISO_CARGA = 200;

/* Divide un texto en fragmentos alternos texto/URL; las URL se muestran
   como enlaces cuyo texto es la propia URL. */
const URL_EN_TEXTO = /(https?:\/\/[^\s]+)/g;

function renderizarConEnlaces(texto) {
  return texto.split(URL_EN_TEXTO).map((fragmento, indice) =>
    /^https?:\/\//.test(fragmento) ? (
      <a key={indice} href={fragmento} target="_blank" rel="noreferrer">
        {fragmento}
      </a>
    ) : (
      fragmento
    ),
  );
}

/**
 * Clasifica los párrafos de una sección con formato de artículo:
 * título propio (primer párrafo), notas de fuente, encabezado
 * "Referencias" y sus entradas, y párrafos normales.
 */
function clasificarParrafos(parrafos) {
  let enReferencias = false;
  return parrafos.map((parrafo, indice) => {
    if (/^referencias$/i.test(parrafo.trim())) {
      enReferencias = true;
      return { tipo: 'titulo-referencias', parrafo };
    }
    if (enReferencias) return { tipo: 'referencia', parrafo };
    if (indice === 0) return { tipo: 'titulo', parrafo };
    if (/^fuente\s*:/i.test(parrafo.trim())) return { tipo: 'fuente', parrafo };
    return { tipo: 'parrafo', parrafo };
  });
}

function TextoDepartamento({
  slugTendencia,
  departamento,
  idTitulo,
  modoTexto = 'documento-por-departamento',
  archivoTextoUnico,
  formatoArticulo = false,
}) {
  const [estado, setEstado] = useState(ESTADO_CARGA.CARGANDO);
  const [parrafos, setParrafos] = useState([]);
  const [mostrarCarga, setMostrarCarga] = useState(false);
  const [reintentos, setReintentos] = useState(0);

  /* Carga el documento del departamento. El módulo padre instancia este
     componente con `key` por tendencia y departamento, de modo que cada
     selección monta una instancia nueva que parte del estado "cargando".
     La bandera `vigente` descarta respuestas tardías tras desmontar. */
  useEffect(() => {
    let vigente = true;

    /* El aviso de carga solo aparece si la respuesta tarda: los documentos
       ya cacheados resuelven al instante y no parpadean. */
    const temporizador = setTimeout(() => {
      if (vigente) setMostrarCarga(true);
    }, RETARDO_AVISO_CARGA);

    /* Según la tendencia, el texto viene de un documento propio del
       departamento o de la sección del documento único. */
    const promesaTexto =
      modoTexto === 'documento-unico'
        ? obtenerSeccionDepartamento(slugTendencia, archivoTextoUnico, departamento.codigoDane)
        : obtenerTextoDepartamento(slugTendencia, departamento.slugArchivo);

    promesaTexto
      .then((resultado) => {
        if (!vigente) return;
        if (resultado.estado === ESTADO_TEXTO.DISPONIBLE) {
          setParrafos(resultado.parrafos);
          setEstado(ESTADO_CARGA.LISTO);
        } else {
          setEstado(ESTADO_CARGA.SIN_CONTENIDO);
        }
      })
      .catch(() => {
        if (vigente) setEstado(ESTADO_CARGA.ERROR);
      });

    return () => {
      vigente = false;
      clearTimeout(temporizador);
    };
  }, [
    slugTendencia,
    departamento.slugArchivo,
    departamento.codigoDane,
    modoTexto,
    archivoTextoUnico,
    reintentos,
  ]);

  /* Reintento tras un error: vuelve al estado de carga y repite la
     petición (el servicio no conserva en caché los intentos fallidos). */
  const manejarReintento = () => {
    setEstado(ESTADO_CARGA.CARGANDO);
    setMostrarCarga(false);
    setReintentos((total) => total + 1);
  };

  return (
    <div className="texto-departamento">
      {estado === ESTADO_CARGA.CARGANDO && mostrarCarga && (
        <Cargador mensaje="Cargando el contenido…" tamano="pequeno" enBloque />
      )}

      {estado === ESTADO_CARGA.SIN_CONTENIDO && (
        <p
          className="texto-departamento__aviso texto-departamento__aviso--pendiente"
          role="status"
        >
          Contenido en preparación para {departamento.nombre}.
        </p>
      )}

      {estado === ESTADO_CARGA.ERROR && (
        <div
          className="texto-departamento__aviso texto-departamento__aviso--error"
          role="alert"
        >
          <p className="texto-departamento__mensaje">
            No fue posible cargar el contenido.
          </p>
          <button
            type="button"
            className="texto-departamento__reintentar"
            onClick={manejarReintento}
          >
            Reintentar
          </button>
        </div>
      )}

      {estado === ESTADO_CARGA.LISTO && (
        /* Región desplazable accesible: si el documento es largo, el cuadro
           mantiene una altura contenida y se recorre con scroll o teclado. */
        <div
          className="texto-departamento__contenido"
          role="region"
          aria-labelledby={idTitulo}
          tabIndex={0}
        >
          {formatoArticulo
            ? clasificarParrafos(parrafos).map((pieza, indice) => {
                if (pieza.tipo === 'titulo') {
                  return (
                    <p key={indice} className="texto-departamento__titulo-articulo">
                      {pieza.parrafo}
                    </p>
                  );
                }
                if (pieza.tipo === 'fuente') {
                  return (
                    <p key={indice} className="texto-departamento__fuente">
                      {pieza.parrafo}
                    </p>
                  );
                }
                if (pieza.tipo === 'titulo-referencias') {
                  return (
                    <p key={indice} className="texto-departamento__titulo-referencias">
                      {pieza.parrafo}
                    </p>
                  );
                }
                if (pieza.tipo === 'referencia') {
                  return (
                    <p key={indice} className="texto-departamento__referencia">
                      {renderizarConEnlaces(pieza.parrafo)}
                    </p>
                  );
                }
                return (
                  <p key={indice} className="texto-departamento__parrafo">
                    {pieza.parrafo}
                  </p>
                );
              })
            : parrafos.map((parrafo, indice) => (
                <p key={indice} className="texto-departamento__parrafo">
                  {parrafo}
                </p>
              ))}
        </div>
      )}
    </div>
  );
}

export default TextoDepartamento;
