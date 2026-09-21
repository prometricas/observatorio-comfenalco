/**
 * DescripcionIndicador — Descripción y guía de uso de un indicador, ENCIMA
 * de su visualizador.
 *
 * Pieza compartida por los módulos de indicadores (0.43.0, petición del
 * cliente): el texto del Word del indicador ya no va en un panel
 * "Análisis" bajo la gráfica, sino directamente sobre el fondo del portal,
 * antes del visualizador, con el título propio del documento y sin la
 * palabra "Análisis".
 *
 * Composición (0.44.0, ajuste del cliente: aprovechar el espacio vacío a
 * la derecha y no imponer la guía): dos columnas en escritorio. A la
 * izquierda, título y descripción; a la derecha, una INVITACIÓN grande
 * ("¿Cómo usar el visualizador?", icono en pistacho con un halo que late)
 * que al pulsarse despliega la guía como lista numerada de pasos y vuelve
 * a ocultarla (aria-expanded/aria-controls; el panel existe siempre, solo
 * se oculta con `hidden`). El párrafo de guía del Word (empieza por "Cómo
 * usar el visualizador." o el antiguo "Uso del visualizador.") se parte en
 * pasos por punto y coma o por punto seguido de mayúscula.
 *
 * Los párrafos de rótulo de figura ("Figura N.") y sus notas ("Nota.") que
 * el documento de resumen trae para sus imágenes estáticas se omiten: el
 * portal muestra el visualizador vivo, no esas figuras.
 *
 * Estados: el módulo dueño carga el documento (docxService) y pasa `texto`
 * {estado, titulo, parrafos} junto con sus constantes de carga
 * (`estados.CARGANDO`/`estados.ERROR`); "en preparación" viene del propio
 * servicio (ESTADO_TEXTO). Error con role="alert" y botón "Reintentar".
 */
import { useId, useState } from 'react';
import Cargador from '../Cargador/Cargador.jsx';
import { ESTADO_TEXTO } from '../../services/docxService.js';
import './descripcion-indicador.css';

/* Rótulo que abre la guía de uso (con o sin punto final) */
const PREFIJO_USO = /^(?:C[oó]mo usar el visualizador|Uso del visualizador)\.?\s*/i;

/* Párrafos del Word que describen figuras estáticas del cuaderno */
const PARRAFO_OMITIDO = /^(?:Figura\s*\d|Nota\.)/i;

/**
 * Parte el párrafo de guía en pasos legibles: corta en punto y coma o en
 * punto seguido de mayúscula, quita la conjunción inicial ("y enfrente…")
 * y deja cada paso con mayúscula inicial y punto final.
 */
function partirEnPasos(texto) {
  return texto
    .split(/;\s+|(?<=\.)\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/)
    .map((parte) => parte.trim().replace(/^y\s+/i, ''))
    .filter(Boolean)
    .map((parte) => {
      const paso = parte.charAt(0).toUpperCase() + parte.slice(1);
      return /[.!?]$/.test(paso) ? paso : `${paso}.`;
    });
}

function DescripcionIndicador({ texto, estados, nombre, onReintentar }) {
  const [guiaAbierta, setGuiaAbierta] = useState(false);
  const idPanel = useId();

  if (texto.estado === estados.CARGANDO) {
    return (
      <div className="descripcion-indicador">
        <Cargador mensaje="Leyendo la descripción del indicador…" tamano="mediano" enBloque />
      </div>
    );
  }

  if (texto.estado === estados.ERROR) {
    return (
      <div className="descripcion-indicador">
        <div className="descripcion-indicador__aviso" role="alert">
          <p>No fue posible leer la descripción del indicador.</p>
          <button type="button" className="descripcion-indicador__reintentar" onClick={onReintentar}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (texto.estado === ESTADO_TEXTO.EN_PREPARACION) {
    return (
      <div className="descripcion-indicador">
        <p className="descripcion-indicador__aviso descripcion-indicador__aviso--estado" role="status">
          Descripción en preparación para este indicador.
        </p>
      </div>
    );
  }

  const utiles = texto.parrafos.filter((parrafo) => !PARRAFO_OMITIDO.test(parrafo));
  const descripcion = utiles.filter((parrafo) => !PREFIJO_USO.test(parrafo));
  const guia = utiles.find((parrafo) => PREFIJO_USO.test(parrafo));
  const pasos = guia ? partirEnPasos(guia.replace(PREFIJO_USO, '')) : [];

  return (
    <section className="descripcion-indicador" aria-label={`Descripción del indicador ${nombre}`}>
      <div className="descripcion-indicador__texto">
        {texto.titulo && <h2 className="descripcion-indicador__titulo">{texto.titulo}</h2>}
        {/* Índice como clave: lista estática que solo cambia completa */}
        {descripcion.map((parrafo, indice) => (
          <p key={indice} className="descripcion-indicador__parrafo">
            {parrafo}
          </p>
        ))}
      </div>

      {pasos.length > 0 && (
        <div className="descripcion-indicador__guia">
          <button
            type="button"
            className={`descripcion-indicador__invitacion${
              guiaAbierta ? ' descripcion-indicador__invitacion--abierta' : ''
            }`}
            aria-expanded={guiaAbierta}
            aria-controls={idPanel}
            onClick={() => setGuiaAbierta((valor) => !valor)}
          >
            <span className="descripcion-indicador__invitacion-icono" aria-hidden="true">
              <svg viewBox="0 0 64 64" width="36" height="36" focusable="false">
                <path
                  d="M20 26c0-8 5-13 13-13s12 4 12 11c0 5-3 8-7 10-2 1-3 3-3 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="35" cy="50" r="3.5" fill="currentColor" />
              </svg>
            </span>
            <span className="descripcion-indicador__invitacion-texto">
              <span className="descripcion-indicador__invitacion-titulo">
                {guiaAbierta ? 'Ocultar la guía de uso' : '¿Cómo usar el visualizador?'}
              </span>
              <span className="descripcion-indicador__invitacion-pista">
                {guiaAbierta ? 'Pulse para cerrar las instrucciones' : 'Pulse para ver la guía paso a paso'}
              </span>
            </span>
            <span className="descripcion-indicador__invitacion-flecha" aria-hidden="true" />
          </button>

          <div id={idPanel} className="descripcion-indicador__panel" hidden={!guiaAbierta}>
            <ol className="descripcion-indicador__pasos">
              {pasos.map((paso, indice) => (
                <li key={indice} className="descripcion-indicador__paso">
                  {paso}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </section>
  );
}

export default DescripcionIndicador;
