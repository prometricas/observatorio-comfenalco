/**
 * SelectorCiudad — Selector de ciudad de la base de informalidad.
 *
 * Réplica del desplegable de ciudades del cuaderno original, llevado a un
 * control propio del portal: la lista se alimenta de las ciudades que trae
 * el Excel y está sincronizada con el mapa en ambos sentidos (elegir una
 * ciudad selecciona su departamento en el croquis, y seleccionar un
 * departamento actualiza el valor mostrado aquí).
 *
 * Si el departamento activo no tiene ciudad en la base, el control muestra
 * una opción de aviso deshabilitada en lugar de quedar en blanco.
 */
import { useId } from 'react';
import './selector-ciudad.css';

function SelectorCiudad({ ciudades, valor, onCambio }) {
  /* Id único para asociar la etiqueta con el control. */
  const idControl = useId();

  return (
    <div className="selector-ciudad">
      <label className="selector-ciudad__etiqueta" htmlFor={idControl}>
        Ciudad
      </label>
      <select
        className="selector-ciudad__control"
        id={idControl}
        value={valor ?? ''}
        onChange={(evento) => onCambio(evento.target.value)}
      >
        {/* Solo visible mientras el departamento activo no tenga ciudad */}
        {!valor && (
          <option value="" disabled>
            Sin ciudad en la base
          </option>
        )}
        {ciudades.map((ciudad) => (
          <option key={ciudad} value={ciudad}>
            {ciudad}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectorCiudad;
