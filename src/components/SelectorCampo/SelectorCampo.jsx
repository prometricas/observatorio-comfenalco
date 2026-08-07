/**
 * SelectorCampo — Lista desplegable etiquetada, reutilizable.
 *
 * Versión genérica de los selectores del portal (mismo tratamiento visual
 * que `SelectorAnio` y `SelectorCiudad`): el módulo del Índice OCDE
 * necesita elegir país, indicador, escenario, años y número de países, y
 * repetir un componente por cada campo no aportaría nada.
 *
 * Admite selección múltiple para el comparador de países del ranking. En
 * ese caso el navegador presenta una lista de varias filas y el texto de
 * ayuda explica cómo elegir más de uno.
 */
import { useId } from 'react';
import './selector-campo.css';

function SelectorCampo({
  etiqueta,
  valor,
  opciones,
  onCambiar,
  multiple = false,
  filas = 6,
  ayuda,
}) {
  const id = useId();
  const idAyuda = ayuda ? `${id}-ayuda` : undefined;

  /* Las opciones admiten cadenas sueltas o pares valor/etiqueta. */
  const normalizadas = opciones.map((opcion) =>
    typeof opcion === 'object' ? opcion : { valor: opcion, etiqueta: String(opcion) },
  );

  const manejarCambio = (evento) => {
    if (multiple) {
      onCambiar([...evento.target.selectedOptions].map((opcion) => opcion.value));
      return;
    }
    onCambiar(evento.target.value);
  };

  return (
    <div className={`selector-campo${multiple ? ' selector-campo--multiple' : ''}`}>
      <label className="selector-campo__etiqueta" htmlFor={id}>
        {etiqueta}
      </label>
      <select
        id={id}
        className="selector-campo__control"
        value={valor}
        multiple={multiple}
        size={multiple ? filas : undefined}
        aria-describedby={idAyuda}
        onChange={manejarCambio}
      >
        {normalizadas.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.etiqueta}
          </option>
        ))}
      </select>
      {ayuda && (
        <span className="selector-campo__ayuda" id={idAyuda}>
          {ayuda}
        </span>
      )}
    </div>
  );
}

export default SelectorCampo;
