/**
 * NavFijo — Menú fijo institucional del portal.
 *
 * Barra con las seis secciones permanentes (Inicio, El Observatorio,
 * Línea de tiempo, IBiM, Benchmarking y Tanques de pensamiento;
 * Publicaciones pasó al menú temático en 0.44.0). Marca la sección
 * activa con `aria-current` y un modificador BEM, y delega la navegación
 * en el estado interno de la App.
 *
 * Desde 0.47.0 las opciones con `subOpciones` (IBiM) son un BOTÓN DIVIDIDO
 * idéntico al del menú temático: el rótulo navega a la PORTADA de la
 * sección y un cheurón aparte despliega el submenú (hover de ratón abre;
 * clic/Enter en el cheurón alterna con aria-expanded; Escape cierra y
 * devuelve el foco al cheurón; clic fuera o Tab hacia fuera cierran).
 */
import { useEffect, useRef, useState } from 'react';
import { OPCIONES_NAV_FIJO } from '../../data/navegacion.js';
import './nav-fijo.css';

function NavFijo({ seccionActiva, onNavegar }) {
  const [submenuAbierto, setSubmenuAbierto] = useState(null);
  const aperturaPorHover = useRef(false);
  const navRef = useRef(null);

  useEffect(() => {
    const manejarClicExterno = (evento) => {
      if (navRef.current && !navRef.current.contains(evento.target)) setSubmenuAbierto(null);
    };
    document.addEventListener('pointerdown', manejarClicExterno);
    return () => document.removeEventListener('pointerdown', manejarClicExterno);
  }, []);

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
  const manejarClicDesplegador = (idOpcion) => {
    if (aperturaPorHover.current) {
      aperturaPorHover.current = false;
      setSubmenuAbierto(idOpcion);
      return;
    }
    setSubmenuAbierto((abierto) => (abierto === idOpcion ? null : idOpcion));
  };
  const manejarTecla = (evento) => {
    if (evento.key === 'Escape' && submenuAbierto !== null) {
      setSubmenuAbierto(null);
      evento.currentTarget.querySelector('.nav-fijo__desplegador')?.focus();
    }
  };
  const manejarSalidaFoco = (evento) => {
    if (evento.relatedTarget && !evento.currentTarget.contains(evento.relatedTarget)) {
      setSubmenuAbierto(null);
    }
  };
  const manejarSeleccion = (idSeccion) => {
    setSubmenuAbierto(null);
    aperturaPorHover.current = false;
    onNavegar(idSeccion);
  };

  return (
    <nav ref={navRef} className="nav-fijo" aria-label="Menú principal">
      <ul className="nav-fijo__lista">
        {OPCIONES_NAV_FIJO.map((opcion) => {
          if (!opcion.subOpciones) {
            const esActiva = seccionActiva === opcion.id;
            return (
              <li key={opcion.id} className="nav-fijo__elemento">
                <button
                  type="button"
                  className={`nav-fijo__boton${esActiva ? ' nav-fijo__boton--activo' : ''}`}
                  aria-current={esActiva ? 'page' : undefined}
                  onClick={() => manejarSeleccion(opcion.id)}
                >
                  {opcion.etiqueta}
                </button>
              </li>
            );
          }

          const abierta = submenuAbierto === opcion.id;
          const esPortadaActiva = seccionActiva === opcion.id;
          const grupoActivo =
            esPortadaActiva || opcion.subOpciones.some((sub) => sub.id === seccionActiva);
          return (
            <li
              key={opcion.id}
              className="nav-fijo__elemento nav-fijo__elemento--con-submenu"
              onPointerEnter={(evento) => manejarEntradaPuntero(evento, opcion.id)}
              onPointerLeave={manejarSalidaPuntero}
              onKeyDown={manejarTecla}
              onBlur={manejarSalidaFoco}
            >
              <div className={`nav-fijo__grupo${grupoActivo ? ' nav-fijo__grupo--activo' : ''}`}>
                <button
                  type="button"
                  className="nav-fijo__boton"
                  aria-current={esPortadaActiva ? 'page' : undefined}
                  onClick={() => manejarSeleccion(opcion.id)}
                >
                  {opcion.etiqueta}
                </button>
                <button
                  type="button"
                  className="nav-fijo__desplegador"
                  aria-expanded={abierta}
                  aria-controls={`submenu-fijo-${opcion.id}`}
                  aria-label={`${abierta ? 'Ocultar' : 'Mostrar'} las opciones de ${opcion.etiqueta}`}
                  onClick={() => manejarClicDesplegador(opcion.id)}
                >
                  <span className="nav-fijo__flecha" aria-hidden="true" />
                </button>
              </div>

              <ul
                id={`submenu-fijo-${opcion.id}`}
                className={`nav-fijo__submenu${abierta ? ' nav-fijo__submenu--abierto' : ''}`}
              >
                {opcion.subOpciones.map((subopcion) => {
                  const esSubActiva = seccionActiva === subopcion.id;
                  return (
                    <li key={subopcion.id} className="nav-fijo__subelemento">
                      <button
                        type="button"
                        className={`nav-fijo__subboton${esSubActiva ? ' nav-fijo__subboton--activo' : ''}`}
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

export default NavFijo;
