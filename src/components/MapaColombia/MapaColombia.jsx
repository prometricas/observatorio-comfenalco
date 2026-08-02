/**
 * MapaColombia — Croquis SVG interactivo de Colombia.
 *
 * Dibuja las 33 zonas del país (32 departamentos + Bogotá D.C.) a partir de
 * la geometría oficial del DANE, simplificada a estilo croquis y
 * pre-proyectada a paths SVG en `src/data/colombia-departamentos.json`
 * (en ejecución no se proyecta nada: solo se pintan los paths).
 *
 * San Andrés y Providencia se presenta como recuadro tipo "inset" (al
 * estilo de los mapas del DANE): las islas ampliadas dentro de un marco
 * punteado que además funciona como área de pulsación.
 *
 * Accesibilidad: cada zona es un botón (rol, aria-pressed, Enter/Espacio)
 * identificado por su código DANE — la clave oficial del proyecto para
 * cruzar con el Excel—, y el mapa usa tabindex itinerante: es UNA sola
 * parada de tabulación y entre departamentos se navega con las flechas
 * (Inicio/Fin saltan al primero y al último). El slug del catálogo
 * `departamentos.js` se expone en `data-departamento` para reconocer cada
 * zona fácilmente al inspeccionar el código.
 *
 * Es UN componente reutilizable: las nueve tendencias comparten este mismo
 * mapa. Al hacer clic emite `onSelectDepartamento(codigoDane)`.
 */
import { useRef, useState } from 'react';
import mapa from '../../data/colombia-departamentos.json';
import { obtenerDepartamentoPorCodigo } from '../../data/departamentos.js';
import './mapa-colombia.css';

function MapaColombia({ codigoSeleccionado, onSelectDepartamento }) {
  /* Índice de la zona que posee la parada de tabulación (tabindex 0). */
  const [indiceEnfocado, setIndiceEnfocado] = useState(0);

  /* Nodos SVG de las zonas, para mover el foco con el teclado. */
  const zonasRef = useRef([]);

  /* Lleva el foco a la zona indicada (con recorrido circular). */
  const moverFoco = (indice) => {
    const total = mapa.departamentos.length;
    const destino = (indice + total) % total;
    setIndiceEnfocado(destino);
    zonasRef.current[destino]?.focus();
  };

  /* Teclado: Enter/Espacio seleccionan; flechas recorren; Inicio/Fin saltan. */
  const manejarTecla = (evento, codigoDane, indice) => {
    switch (evento.key) {
      case 'Enter':
      case ' ':
        evento.preventDefault();
        onSelectDepartamento(codigoDane);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        evento.preventDefault();
        moverFoco(indice + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        evento.preventDefault();
        moverFoco(indice - 1);
        break;
      case 'Home':
        evento.preventDefault();
        moverFoco(0);
        break;
      case 'End':
        evento.preventDefault();
        moverFoco(mapa.departamentos.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <svg
      className="mapa-colombia"
      viewBox={mapa.viewBox}
      role="group"
      aria-label="Mapa de Colombia por departamentos; use las flechas del teclado para recorrerlos"
    >
      {mapa.departamentos.map((zona, indice) => {
        const departamento = obtenerDepartamentoPorCodigo(zona.codigoDane);
        const esSeleccionada = zona.codigoDane === codigoSeleccionado;

        /* Atributos comunes del elemento interactivo de cada zona. */
        const propsInteractivas = {
          role: 'button',
          tabIndex: indice === indiceEnfocado ? 0 : -1,
          ref: (nodo) => {
            zonasRef.current[indice] = nodo;
          },
          'aria-label': departamento?.nombre,
          'aria-pressed': esSeleccionada,
          'data-departamento': departamento?.slugArchivo,
          onClick: () => {
            setIndiceEnfocado(indice);
            onSelectDepartamento(zona.codigoDane);
          },
          onFocus: () => setIndiceEnfocado(indice),
          onKeyDown: (evento) => manejarTecla(evento, zona.codigoDane, indice),
        };

        /* San Andrés y Providencia: recuadro inset con las islas ampliadas. */
        if (zona.recuadro) {
          return (
            <g
              key={zona.codigoDane}
              className={`mapa-colombia__archipielago${
                esSeleccionada ? ' mapa-colombia__archipielago--activo' : ''
              }`}
              {...propsInteractivas}
            >
              <title>{departamento?.nombre}</title>
              <rect
                className="mapa-colombia__recuadro-archipielago"
                x={zona.recuadro.x}
                y={zona.recuadro.y}
                width={zona.recuadro.ancho}
                height={zona.recuadro.alto}
                rx="8"
              />
              <path className="mapa-colombia__departamento" d={zona.d} fillRule="evenodd" />
            </g>
          );
        }

        return (
          <path
            key={zona.codigoDane}
            className={`mapa-colombia__departamento${
              esSeleccionada ? ' mapa-colombia__departamento--activo' : ''
            }`}
            d={zona.d}
            fillRule="evenodd"
            {...propsInteractivas}
          >
            <title>{departamento?.nombre}</title>
          </path>
        );
      })}
    </svg>
  );
}

export default MapaColombia;
