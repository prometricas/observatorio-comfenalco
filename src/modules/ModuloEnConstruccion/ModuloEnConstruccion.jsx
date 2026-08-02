/**
 * ModuloEnConstruccion — Aviso discreto para secciones sin contenido.
 *
 * Se muestra en el módulo principal cuando la sección elegida todavía no
 * tiene módulo propio (el alcance de la primera entrega solo desarrolla el
 * inicio y, próximamente, Tendencias > Envejecimiento). Recibe el nombre
 * legible de la sección para orientar a la persona usuaria.
 */
import './modulo-en-construccion.css';

function ModuloEnConstruccion({ nombreSeccion }) {
  return (
    <section className="modulo-en-construccion">
      {/* Símbolo discreto de contenido en preparación */}
      <svg
        className="modulo-en-construccion__icono"
        viewBox="0 0 64 64"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          className="modulo-en-construccion__icono-anillo"
          cx="32"
          cy="32"
          r="26"
        />
        <circle className="modulo-en-construccion__icono-punto" cx="20" cy="32" r="3.5" />
        <circle className="modulo-en-construccion__icono-punto" cx="32" cy="32" r="3.5" />
        <circle className="modulo-en-construccion__icono-punto" cx="44" cy="32" r="3.5" />
      </svg>

      <h1 className="modulo-en-construccion__titulo">{nombreSeccion}</h1>
      <p className="modulo-en-construccion__mensaje">
        Estamos preparando el contenido de esta sección. Muy pronto estará
        disponible.
      </p>
    </section>
  );
}

export default ModuloEnConstruccion;
