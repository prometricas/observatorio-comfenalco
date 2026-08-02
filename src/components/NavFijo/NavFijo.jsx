/**
 * NavFijo — Menú fijo institucional del portal.
 *
 * Barra con las seis secciones permanentes (El Observatorio, Línea de
 * tiempo, IBIM, Publicaciones, Benchmarking y Tanques de pensamiento).
 * Marca la sección activa con `aria-current` y un modificador BEM, y
 * delega la navegación en el estado interno de la App.
 */
import { OPCIONES_NAV_FIJO } from '../../data/navegacion.js';
import './nav-fijo.css';

function NavFijo({ seccionActiva, onNavegar }) {
  return (
    <nav className="nav-fijo" aria-label="Menú principal">
      <ul className="nav-fijo__lista">
        {OPCIONES_NAV_FIJO.map((opcion) => {
          const esActiva = seccionActiva === opcion.id;
          return (
            <li key={opcion.id} className="nav-fijo__elemento">
              <button
                type="button"
                className={`nav-fijo__boton${esActiva ? ' nav-fijo__boton--activo' : ''}`}
                aria-current={esActiva ? 'page' : undefined}
                onClick={() => onNavegar(opcion.id)}
              >
                {opcion.etiqueta}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavFijo;
