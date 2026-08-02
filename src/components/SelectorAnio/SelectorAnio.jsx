/**
 * SelectorAnio — Selector del año de una pirámide poblacional.
 *
 * Lista desplegable accesible cuyo rango se alimenta dinámicamente de los
 * años realmente presentes en el Excel (1985–2050 en la base actual).
 * Cada pirámide del módulo tiene su propio selector.
 */
import { useId } from 'react';
import './selector-anio.css';

function SelectorAnio({ etiqueta, etiquetaOculta, anios, valor, onCambio }) {
  /* Id único para asociar la etiqueta con el control (hay dos selectores
     en pantalla al mismo tiempo). */
  const idControl = useId();

  return (
    <div className="selector-anio">
      {/* etiquetaOculta añade contexto solo para lectores de pantalla:
          distingue los dos selectores homónimos de la vista comparativa */}
      <label className="selector-anio__etiqueta" htmlFor={idControl}>
        {etiqueta}
        {etiquetaOculta && <span className="oculto-accesible"> {etiquetaOculta}</span>}
      </label>
      <select
        className="selector-anio__control"
        id={idControl}
        value={valor}
        onChange={(evento) => onCambio(Number(evento.target.value))}
      >
        {anios.map((anio) => (
          <option key={anio} value={anio}>
            {anio}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectorAnio;
