/**
 * SelectorCampo — Lista desplegable etiquetada, reutilizable.
 *
 * Versión genérica de los selectores del portal (mismo tratamiento visual
 * que `SelectorAnio` y `SelectorCiudad`): los módulos de indicadores
 * eligen país, indicador, escenario o año, y repetir un componente por
 * cada campo no aportaría nada.
 *
 * Elección ÚNICA a propósito: la selección múltiple con Ctrl + clic fue
 * rechazada por el cliente; las selecciones de varios elementos usan los
 * patrones propios del portal (píldoras conmutables en listas cortas,
 * cápsulas removibles + "Agregar" en listas largas).
 */
import { useId } from 'react';
import './selector-campo.css';

function SelectorCampo({
  etiqueta,
  valor,
  opciones,
  onCambiar,
  /* Para los selectores de acción que esperan turno (p. ej. "Agregar
     país" cuando la selección llegó a su tope). */
  deshabilitado = false,
}) {
  const id = useId();

  /* Las opciones admiten cadenas sueltas o pares valor/etiqueta. */
  const normalizadas = opciones.map((opcion) =>
    typeof opcion === 'object' ? opcion : { valor: opcion, etiqueta: String(opcion) },
  );

  return (
    <div className="selector-campo">
      <label className="selector-campo__etiqueta" htmlFor={id}>
        {etiqueta}
      </label>
      <select
        id={id}
        className="selector-campo__control"
        value={valor}
        disabled={deshabilitado}
        onChange={(evento) => onCambiar(evento.target.value)}
      >
        {normalizadas.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.etiqueta}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectorCampo;
