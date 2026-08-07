/**
 * NavDesplegable — Menú temático con submenús desplegables.
 *
 * Barra con los seis ejes temáticos del Observatorio. Las opciones con
 * subopciones ("Tendencias" e "Indicadores") despliegan un submenú que
 * funciona con ratón y con teclado:
 *   - Pasar el puntero por encima lo abre; al salir se cierra.
 *   - Clic (o Enter/Espacio) alterna la apertura y actualiza aria-expanded.
 *   - Escape cierra el submenú y devuelve el foco al botón que lo abrió.
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

  /* Clic sobre el botón desplegador: alterna el submenú. Si acaba de
     abrirse por hover, el primer clic solo lo confirma abierto (el ref se
     consulta directamente porque el estado del render puede llegar con un
     instante de retraso respecto al evento de hover). */
  const manejarClicDesplegador = (idOpcion) => {
    if (aperturaPorHover.current) {
      aperturaPorHover.current = false;
      setSubmenuAbierto(idOpcion);
      return;
    }
    setSubmenuAbierto((abierto) => (abierto === idOpcion ? null : idOpcion));
  };

  /* Escape cierra el submenú y regresa el foco al botón desplegador. */
  const manejarTecla = (evento) => {
    if (evento.key === 'Escape' && submenuAbierto !== null) {
      setSubmenuAbierto(null);
      evento.currentTarget.querySelector('.nav-desplegable__boton--desplegador')?.focus();
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

  /* Selección final de cualquier opción: navega y recoge el submenú. */
  const manejarSeleccionSubopcion = (idSeccion) => {
    setSubmenuAbierto(null);
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
                  onClick={() => manejarSeleccionSubopcion(opcion.id)}
                >
                  {opcion.etiqueta}
                </button>
              </li>
            );
          }

          /* Opción con submenú: botón desplegador + lista de subopciones. */
          const abierta = submenuAbierto === opcion.id;
          const tieneSubopcionActiva = opcion.subOpciones.some(
            (sub) => sub.id === seccionActiva,
          );
          return (
            <li
              key={opcion.id}
              className="nav-desplegable__elemento nav-desplegable__elemento--con-submenu"
              onPointerEnter={(evento) => manejarEntradaPuntero(evento, opcion.id)}
              onPointerLeave={manejarSalidaPuntero}
              onKeyDown={manejarTecla}
              onBlur={manejarSalidaFoco}
            >
              <button
                type="button"
                className={`nav-desplegable__boton nav-desplegable__boton--desplegador${
                  tieneSubopcionActiva ? ' nav-desplegable__boton--activo' : ''
                }`}
                aria-expanded={abierta}
                aria-controls={`submenu-${opcion.id}`}
                onClick={() => manejarClicDesplegador(opcion.id)}
              >
                {opcion.etiqueta}
                <span className="nav-desplegable__flecha" aria-hidden="true" />
              </button>

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
                        onClick={() => manejarSeleccionSubopcion(subopcion.id)}
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
