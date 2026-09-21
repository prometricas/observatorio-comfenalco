/**
 * NavDesplegable — Menú temático con submenús desplegables.
 *
 * Barra con los cinco ejes temáticos del Observatorio. Las opciones con
 * subopciones ("Tendencias" e "Indicadores") son un BOTÓN DIVIDIDO desde
 * 0.42.0 (petición del cliente): el rótulo navega a la PORTADA del eje
 * (la misma a la que llevan las tarjetas del inicio) y un botón aparte con
 * el cheurón despliega el submenú. Comportamiento:
 *   - Pasar el puntero (ratón) por la opción abre el submenú; al salir se
 *     cierra.
 *   - Clic en el rótulo: navega a la portada del eje y recoge el submenú.
 *   - Clic (o Enter/Espacio) en el cheurón: alterna el submenú y actualiza
 *     aria-expanded; es la vía de teclado y de pantallas táctiles.
 *   - Escape cierra el submenú y devuelve el foco al cheurón.
 *   - Un clic fuera del menú o sacar el foco con Tab también lo cierran.
 */
import { useEffect, useRef, useState } from 'react';
import { OPCIONES_NAV_DESPLEGABLE } from '../../data/navegacion.js';
import './nav-desplegable.css';

function NavDesplegable({ seccionActiva, onNavegar }) {
  /* Id de la opción cuyo submenú está abierto (null = todos cerrados). */
  const [submenuAbierto, setSubmenuAbierto] = useState(null);

  /* Distingue la apertura por hover de la apertura por clic/teclado, para
     que el clic tras un hover no cierre el submenú de forma inesperada. */
  const aperturaPorHover = useRef(false);

  const navRef = useRef(null);

  /* Cierra el submenú cuando se hace clic o toque fuera del menú. */
  useEffect(() => {
    const manejarClicExterno = (evento) => {
      if (navRef.current && !navRef.current.contains(evento.target)) {
        setSubmenuAbierto(null);
      }
    };
    document.addEventListener('pointerdown', manejarClicExterno);
    return () => document.removeEventListener('pointerdown', manejarClicExterno);
  }, []);

  /* Apertura por hover: solo con ratón, para no interferir con el toque. */
  const manejarEntradaPuntero = (evento, idOpcion) => {
    if (evento.pointerType === 'mouse') {
      aperturaPorHover.current = true;
      setSubmenuAbierto(idOpcion);
    }
  };

  const manejarSalidaPuntero = (evento) => {
    if (evento.pointerType === 'mouse') {
      aperturaPorHover.current = false;
      setSubmenuAbierto(null);
    }
  };

  /* Clic sobre el cheurón: alterna el submenú. Si acaba de abrirse por
     hover, el primer clic solo lo confirma abierto (el ref se consulta
     directamente porque el estado del render puede llegar con un instante
     de retraso respecto al evento de hover). */
  const manejarClicDesplegador = (idOpcion) => {
    if (aperturaPorHover.current) {
      aperturaPorHover.current = false;
      setSubmenuAbierto(idOpcion);
      return;
    }
    setSubmenuAbierto((abierto) => (abierto === idOpcion ? null : idOpcion));
  };

  /* Escape cierra el submenú y regresa el foco al cheurón. */
  const manejarTecla = (evento) => {
    if (evento.key === 'Escape' && submenuAbierto !== null) {
      setSubmenuAbierto(null);
      evento.currentTarget.querySelector('.nav-desplegable__desplegador')?.focus();
    }
  };

  /* Si el foco sale por completo del elemento (Tab), se cierra el submenú.
     Solo se cierra cuando existe un destino de foco real: en Safari y en
     Firefox de macOS un clic sobre una subopción dispara blur con
     relatedTarget nulo y cerrarlo aquí cancelaría ese mismo clic (el cierre
     por clic fuera ya lo cubre el listener global de pointerdown). */
  const manejarSalidaFoco = (evento) => {
    if (evento.relatedTarget && !evento.currentTarget.contains(evento.relatedTarget)) {
      setSubmenuAbierto(null);
    }
  };

  /* Selección final de cualquier sección (eje, portada o subopción):
     navega y recoge el submenú. */
  const manejarSeleccion = (idSeccion) => {
    setSubmenuAbierto(null);
    aperturaPorHover.current = false;
    onNavegar(idSeccion);
  };

  return (
    <nav ref={navRef} className="nav-desplegable" aria-label="Menú temático">
      <ul className="nav-desplegable__lista">
        {OPCIONES_NAV_DESPLEGABLE.map((opcion) => {
          /* Opción simple: navega a su sección y recoge cualquier submenú
             abierto (en táctil ni el hover ni el blur lo cerrarían). */
          if (!opcion.subOpciones) {
            const esActiva = seccionActiva === opcion.id;
            return (
              <li key={opcion.id} className="nav-desplegable__elemento">
                <button
                  type="button"
                  className={`nav-desplegable__boton${esActiva ? ' nav-desplegable__boton--activo' : ''}`}
                  aria-current={esActiva ? 'page' : undefined}
                  onClick={() => manejarSeleccion(opcion.id)}
                >
                  {opcion.etiqueta}
                </button>
              </li>
            );
          }

          /* Opción con submenú: botón dividido (rótulo → portada del eje;
             cheurón → submenú) + lista de subopciones. */
          const abierta = submenuAbierto === opcion.id;
          const esPortadaActiva = seccionActiva === opcion.id;
          const tieneSubopcionActiva = opcion.subOpciones.some(
            (sub) => sub.id === seccionActiva,
          );
          const grupoActivo = esPortadaActiva || tieneSubopcionActiva;
          return (
            <li
              key={opcion.id}
              className="nav-desplegable__elemento nav-desplegable__elemento--con-submenu"
              onPointerEnter={(evento) => manejarEntradaPuntero(evento, opcion.id)}
              onPointerLeave={manejarSalidaPuntero}
              onKeyDown={manejarTecla}
              onBlur={manejarSalidaFoco}
            >
              <div
                className={`nav-desplegable__grupo${grupoActivo ? ' nav-desplegable__grupo--activo' : ''}`}
              >
                <button
                  type="button"
                  className="nav-desplegable__boton"
                  aria-current={esPortadaActiva ? 'page' : undefined}
                  onClick={() => manejarSeleccion(opcion.id)}
                >
                  {opcion.etiqueta}
                </button>
                <button
                  type="button"
                  className="nav-desplegable__desplegador"
                  aria-expanded={abierta}
                  aria-controls={`submenu-${opcion.id}`}
                  aria-label={`${abierta ? 'Ocultar' : 'Mostrar'} las opciones de ${opcion.etiqueta}`}
                  onClick={() => manejarClicDesplegador(opcion.id)}
                >
                  <span className="nav-desplegable__flecha" aria-hidden="true" />
                </button>
              </div>

              <ul
                id={`submenu-${opcion.id}`}
                className={`nav-desplegable__submenu${abierta ? ' nav-desplegable__submenu--abierto' : ''}`}
              >
                {opcion.subOpciones.map((subopcion) => {
                  const esSubActiva = seccionActiva === subopcion.id;
                  return (
                    <li key={subopcion.id} className="nav-desplegable__subelemento">
                      <button
                        type="button"
                        className={`nav-desplegable__subboton${
                          esSubActiva ? ' nav-desplegable__subboton--activo' : ''
                        }`}
                        aria-current={esSubActiva ? 'page' : undefined}
                        onClick={() => manejarSeleccion(subopcion.id)}
                      >
                        {subopcion.etiqueta}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavDesplegable;
