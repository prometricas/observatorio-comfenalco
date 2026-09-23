/**
 * ModuloIbimDimensiones — "Las nueve dimensiones" (submenú de IBiM, 0.48.0).
 *
 * Flujograma INTERACTIVO de la Figura 2 del informe IBiM 2023: las nueve
 * dimensiones dispuestas en círculo alrededor de la persona ("Bienestar")
 * y, al pulsar una, sus variables en un panel lateral (patrón de la Línea
 * de tiempo, pero circular). Versión inicial simple, sin gráficas: cada
 * dimensión es un BOTÓN nativo posicionado por porcentaje sobre un lienzo
 * cuadrado (patrón del panal PESTEL), con aria-pressed; el panel es una
 * región viva que anuncia la dimensión elegida. Segundo clic deselecciona.
 * Bajo 700 px el círculo se convierte en una rejilla de botones y el panel
 * va debajo. Datos en `src/data/dimensiones-ibim.js`.
 */
import { useState } from 'react';
import { DIMENSIONES_IBIM } from '../../data/dimensiones-ibim.js';
import './modulo-ibim-dimensiones.css';

/* Posición de cada dimensión sobre el lienzo (horario desde arriba) */
const RADIO = 32; // % del lienzo (0.48.1: anillo más ceñido al centro)
const posicion = (indice, total) => {
  const angulo = (-90 + (360 / total) * indice) * (Math.PI / 180);
  return { left: `${50 + RADIO * Math.cos(angulo)}%`, top: `${50 + RADIO * Math.sin(angulo)}%` };
};

function ModuloIbimDimensiones() {
  const [seleccionadaId, setSeleccionadaId] = useState(null);
  const seleccionada = DIMENSIONES_IBIM.find((d) => d.id === seleccionadaId) ?? null;

  const alternar = (id) => setSeleccionadaId((actual) => (actual === id ? null : id));

  return (
    <section className="modulo-ibim-dimensiones" aria-labelledby="titulo-ibim-dimensiones">
      <header className="modulo-ibim-dimensiones__encabezado">
        <p className="modulo-ibim-dimensiones__contexto">IBiM</p>
        <h1 id="titulo-ibim-dimensiones" className="modulo-ibim-dimensiones__titulo">
          Las nueve dimensiones del bienestar
        </h1>
        <p className="modulo-ibim-dimensiones__intro">
          El IBiM observa la vida de cada afiliado desde nueve ángulos a la vez. Pulse una
          dimensión para ver las variables con las que el índice la mide.
        </p>
      </header>

      <div className="modulo-ibim-dimensiones__contenido">
        {/* Lienzo circular: la persona en el centro y las nueve dimensiones alrededor */}
        <div className="modulo-ibim-dimensiones__lienzo" role="group" aria-label="Dimensiones del IBiM">
          <div className="modulo-ibim-dimensiones__anillo" aria-hidden="true" />
          <div className="modulo-ibim-dimensiones__centro" aria-hidden="true">
            <span className="modulo-ibim-dimensiones__centro-texto">Bienestar</span>
          </div>
          {DIMENSIONES_IBIM.map((dimension, indice) => {
            const activa = dimension.id === seleccionadaId;
            return (
              <button
                key={dimension.id}
                type="button"
                className={`modulo-ibim-dimensiones__nodo${activa ? ' modulo-ibim-dimensiones__nodo--activo' : ''}${
                  seleccionadaId && !activa ? ' modulo-ibim-dimensiones__nodo--atenuado' : ''
                }`}
                style={{ ...posicion(indice, DIMENSIONES_IBIM.length), '--color-dimension': dimension.color, '--color-dimension-texto': dimension.colorTexto }}
                aria-pressed={activa}
                onClick={() => alternar(dimension.id)}
              >
                <span className="modulo-ibim-dimensiones__nodo-numero" aria-hidden="true">
                  {indice + 1}
                </span>
                <span className="modulo-ibim-dimensiones__nodo-nombre">{dimension.nombre}</span>
              </button>
            );
          })}
        </div>

        {/* Panel de la dimensión elegida */}
        <aside className="modulo-ibim-dimensiones__panel" aria-live="polite" aria-atomic="true">
          {seleccionada ? (
            <div
              className="modulo-ibim-dimensiones__ficha"
              style={{ '--color-dimension': seleccionada.color, '--color-dimension-texto': seleccionada.colorTexto }}
            >
              <p className="modulo-ibim-dimensiones__ficha-contexto">
                Dimensión {DIMENSIONES_IBIM.indexOf(seleccionada) + 1} de {DIMENSIONES_IBIM.length}
              </p>
              <h2 className="modulo-ibim-dimensiones__ficha-titulo">{seleccionada.nombre}</h2>
              <p className="modulo-ibim-dimensiones__ficha-resumen">{seleccionada.resumen}</p>
              {/* Definición conceptual del Word del cliente (0.54.0) */}
              <p className="modulo-ibim-dimensiones__ficha-rotulo">Definición</p>
              <p className="modulo-ibim-dimensiones__ficha-definicion">{seleccionada.definicion}</p>
              <p className="modulo-ibim-dimensiones__ficha-rotulo">
                {seleccionada.variables.length} variables que la miden
              </p>
              <ul className="modulo-ibim-dimensiones__variables">
                {seleccionada.variables.map((variable) => (
                  <li key={variable} className="modulo-ibim-dimensiones__variable">
                    {variable}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="modulo-ibim-dimensiones__ficha modulo-ibim-dimensiones__ficha--vacia">
              <h2 className="modulo-ibim-dimensiones__ficha-titulo">Elija una dimensión</h2>
              <p className="modulo-ibim-dimensiones__ficha-resumen">
                Cada círculo es una de las nueve dimensiones del índice. Al pulsarlo verá las
                variables de la Encuesta de Bienestar que la componen; un segundo clic lo cierra.
              </p>
            </div>
          )}
        </aside>
      </div>

      <p className="modulo-ibim-dimensiones__fuente">
        Fuente: modelo de medición del Índice de Bienestar Multidimensional de Comfenalco Antioquia
        2023 (Centro de Estudios de Opinión, Universidad de Antioquia).
      </p>
    </section>
  );
}

export default ModuloIbimDimensiones;
