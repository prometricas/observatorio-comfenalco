/**
 * ModuloNoEncontrado — Módulo 404 del portal.
 *
 * Se muestra en el contenedor principal cuando el contenido pedido no
 * existe o no se pudo cargar: una sección desconocida, o un módulo cuyo
 * archivo no llegó al navegador (conexión interrumpida, archivo ausente
 * en el servidor). Distinto de ModuloEnConstruccion, que anuncia
 * secciones previstas pero aún sin contenido.
 *
 * Ofrece siempre una salida: el botón de regreso al inicio.
 *
 * @param {string} nombreSeccion Sección solicitada, si se conoce.
 * @param {string} descripcion   Mensaje a medida (por defecto, no encontrado).
 * @param {Function} onVolver    Regreso al inicio del portal.
 */
import './modulo-no-encontrado.css';

function ModuloNoEncontrado({ nombreSeccion, descripcion, onVolver }) {
  const mensaje =
    descripcion ??
    (nombreSeccion
      ? `No encontramos la sección «${nombreSeccion}» en el Observatorio.`
      : 'No encontramos el contenido que busca en el Observatorio.');

  return (
    <section className="modulo-no-encontrado">
      <p className="modulo-no-encontrado__codigo" aria-hidden="true">
        404
      </p>
      <span className="modulo-no-encontrado__acento" aria-hidden="true" />

      <h1 className="modulo-no-encontrado__titulo">Contenido no disponible</h1>
      <p className="modulo-no-encontrado__mensaje">{mensaje}</p>
      <p className="modulo-no-encontrado__ayuda">
        Puede volver al inicio y navegar desde los menús del portal.
      </p>

      <button type="button" className="modulo-no-encontrado__boton" onClick={onVolver}>
        Volver al inicio
      </button>
    </section>
  );
}

export default ModuloNoEncontrado;
