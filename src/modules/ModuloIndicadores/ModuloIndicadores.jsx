/**
 * ModuloIndicadores — Portada del eje "Indicadores".
 *
 * Tablero de medidores: una tarjeta por indicador con un medidor
 * semicircular SIMBÓLICO (sin datos — ajuste del usuario 2026-08-29: la
 * versión con cifras reales quemadas complicaba el mantenimiento futuro
 * del portal), la descripción corta del módulo y el botón Explorar que
 * navega al indicador (prop onNavegar, el mismo contrato de las portadas
 * de Tendencias y Tanques). La aguja reposa en una posición fija y se
 * mueve al pasar el puntero sobre la tarjeta, como guiño visual.
 *
 * La animación de entrada sigue el patrón de la Línea de tiempo: el
 * modificador `--animado` se añade por código solo cuando hay
 * IntersectionObserver y el sistema no pide movimiento reducido; al
 * entrar cada tarjeta en pantalla, aparece y su medidor se enciende
 * (arco + giro de aguja) con un escalonado por tarjeta. Sin script, todo
 * se ve en su estado final.
 */
import { useEffect, useRef } from 'react';
import MedidorIndicador from './MedidorIndicador.jsx';
import { TABLERO_INDICADORES } from '../../data/tablero-indicadores.js';
import './modulo-indicadores.css';

function ModuloIndicadores({ onNavegar }) {
  const raizRef = useRef(null);

  useEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return undefined;

    const tarjetas = raiz.querySelectorAll('.modulo-indicadores__tarjeta');
    const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefiereQuieto || typeof window.IntersectionObserver !== 'function') {
      return undefined;
    }

    raiz.classList.add('modulo-indicadores--animado');
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('modulo-indicadores__tarjeta--visible');
            observador.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
    );
    tarjetas.forEach((tarjeta) => observador.observe(tarjeta));

    return () => {
      observador.disconnect();
      raiz.classList.remove('modulo-indicadores--animado');
    };
  }, []);

  return (
    <section
      ref={raizRef}
      className="modulo-indicadores"
      aria-labelledby="titulo-indicadores"
    >
      <header className="modulo-indicadores__encabezado">
        <p className="modulo-indicadores__contexto">Ejes temáticos</p>
        <h1 id="titulo-indicadores" className="modulo-indicadores__titulo">
          Indicadores
        </h1>
        <p className="modulo-indicadores__descripcion-eje">
          Cifras e índices para el seguimiento del bienestar y la calidad de vida de la
          población. Explore cada indicador para ver sus gráficas, rankings y escenarios
          prospectivos.
        </p>
      </header>

      <ul className="modulo-indicadores__tablero">
        {TABLERO_INDICADORES.map((indicador, indice) => (
          <li
            key={indicador.id}
            className="modulo-indicadores__tarjeta"
            style={{
              '--mi-color': indicador.color,
              '--mi-texto': indicador.colorTexto,
              '--retardo': `${indice * 0.12}s`,
            }}
          >
            <h2 className="modulo-indicadores__tarjeta-titulo">{indicador.nombre}</h2>

            {/* Medidor simbólico (decorativo, sin datos) */}
            <div className="modulo-indicadores__medidor">
              <MedidorIndicador />
            </div>

            <p className="modulo-indicadores__descripcion">{indicador.descripcion}</p>

            <button
              type="button"
              className="modulo-indicadores__boton"
              aria-label={`Explorar ${indicador.nombre}`}
              onClick={() => onNavegar(indicador.id)}
            >
              Explorar
              <span className="modulo-indicadores__boton-flecha" aria-hidden="true">
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ModuloIndicadores;
