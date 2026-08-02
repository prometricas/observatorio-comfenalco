/**
 * Footer — Pie de página institucional del portal.
 *
 * Tres columnas sobre el verde oscuro de marca (referencia visual del
 * portal Ceplan): presentación del Observatorio, enlaces de interés hacia
 * los ejes temáticos (navegan por el estado interno de la App) e
 * información institucional de Comfenalco Antioquia. Cierra con la línea
 * de derechos reservados.
 */
import { OPCIONES_NAV_DESPLEGABLE } from '../../data/navegacion.js';
import './footer.css';

function Footer({ onNavegar }) {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__contenido">
        {/* Columna 1: qué es el Observatorio */}
        <section className="footer__columna">
          <h2 className="footer__titulo">Observatorio Comfenalco Antioquia</h2>
          <p className="footer__descripcion">
            Plataforma de información sobre tendencias, indicadores, riesgos y
            oportunidades del entorno social y económico, al servicio de la
            toma de decisiones con perspectiva de futuro.
          </p>
        </section>

        {/* Columna 2: accesos rápidos a los ejes temáticos */}
        <nav className="footer__columna" aria-label="Enlaces de interés">
          <h2 className="footer__titulo">Enlaces de interés</h2>
          <ul className="footer__lista">
            {OPCIONES_NAV_DESPLEGABLE.map((opcion) => (
              <li key={opcion.id} className="footer__elemento">
                <button
                  type="button"
                  className="footer__enlace"
                  onClick={() => onNavegar(opcion.id)}
                >
                  {opcion.etiqueta}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Columna 3: información institucional */}
        <section className="footer__columna">
          <h2 className="footer__titulo">Comfenalco Antioquia</h2>
          <ul className="footer__lista">
            <li className="footer__elemento">Caja de Compensación Familiar</li>
            <li className="footer__elemento">Medellín, Antioquia — Colombia</li>
            <li className="footer__elemento">
              <a
                className="footer__enlace"
                href="https://www.comfenalcoantioquia.com.co"
                target="_blank"
                rel="noreferrer"
              >
                www.comfenalcoantioquia.com.co
              </a>
            </li>
          </ul>
        </section>
      </div>

      {/* Línea inferior de derechos */}
      <div className="footer__legal">
        <p className="footer__derechos">
          © {anioActual} Comfenalco Antioquia — Observatorio. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
