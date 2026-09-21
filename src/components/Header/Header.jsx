/**
 * Header — Cabecera fija del portal.
 *
 * Contiene el título del portal (que devuelve al inicio), el Logo alineado
 * a la derecha (regla del manual de marca para piezas digitales; desde
 * 0.41.0 enlaza al portal institucional de Comfenalco Antioquia), el botón
 * hamburguesa para móvil y las dos barras de navegación: el menú fijo
 * institucional y el menú desplegable temático. La franja de marca y las
 * barras comparten el ancho del portal (`--ancho-maximo`).
 */
import { useState } from 'react';
import Logo from '../Logo/Logo.jsx';
import NavFijo from '../NavFijo/NavFijo.jsx';
import NavDesplegable from '../NavDesplegable/NavDesplegable.jsx';
import { SECCION_INICIO } from '../../data/navegacion.js';
import './header.css';

function Header({ seccionActiva, onNavegar }) {
  /* Controla la apertura del panel de navegación en pantallas pequeñas. */
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  /* Navega a la sección elegida y recoge el panel móvil si estaba abierto. */
  const manejarNavegacion = (idSeccion) => {
    onNavegar(idSeccion);
    setMenuMovilAbierto(false);
  };

  return (
    <header className="header">
      {/* Franja de marca: título a la izquierda, logo a la derecha */}
      <div className="header__marca">
        <button
          type="button"
          className="header__titulo"
          onClick={() => manejarNavegacion(SECCION_INICIO)}
        >
          <span className="header__titulo-texto">Observatorio</span>
          <span className="oculto-accesible">Ir al inicio</span>
        </button>

        {/* Botón hamburguesa: solo visible en pantallas pequeñas */}
        <button
          type="button"
          className="header__boton-menu"
          aria-expanded={menuMovilAbierto}
          aria-controls="navegacion-portal"
          onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
        >
          <span
            className={`header__icono-menu${menuMovilAbierto ? ' header__icono-menu--abierto' : ''}`}
            aria-hidden="true"
          />
          <span className="oculto-accesible">
            {menuMovilAbierto ? 'Cerrar el menú de navegación' : 'Abrir el menú de navegación'}
          </span>
        </button>

        {/* Imagotipo alineado a la derecha, según el manual de marca */}
        <span className="header__logo">
          <Logo />
        </span>
      </div>

      {/* Barras de navegación; en móvil se muestran solo con el panel abierto */}
      <div
        id="navegacion-portal"
        className={`header__navegacion${menuMovilAbierto ? ' header__navegacion--abierta' : ''}`}
      >
        <NavFijo seccionActiva={seccionActiva} onNavegar={manejarNavegacion} />
        <NavDesplegable seccionActiva={seccionActiva} onNavegar={manejarNavegacion} />
      </div>
    </header>
  );
}

export default Header;
