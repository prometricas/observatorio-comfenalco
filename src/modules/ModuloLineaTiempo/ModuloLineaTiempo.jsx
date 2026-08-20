/**
 * ModuloLineaTiempo — Línea de tiempo "Evolución hacia el Bienestar Integral".
 *
 * Recrea el bosquejo aprobado por el cliente: título en el verde oscuro de
 * marca sobre fondo blanco (el cliente retiró la franja azul y el fondo
 * gris del bosquejo para equilibrar con los demás módulos), la leyenda de
 * referencias ARRIBA de la cronología (ajuste del cliente 2026-08-17: así
 * el lector sabe qué significan los [n] de las tarjetas antes de verlas;
 * en el bosquejo iba al pie), y la espina vertical con el distintivo de
 * categoría de cada hito y tarjetas con año, título, descripción y aporte
 * al bienestar. El contenido vive en `src/data/linea-tiempo.js`.
 *
 * Las tarjetas son DESPLEGABLES (recomendación del cliente, 2026-08-17):
 * cerradas muestran solo el año y el título; al pulsarlas se revela la
 * descripción, el aporte al bienestar y las citas [n]. Cada tarjeta es un
 * botón de revelación accesible (aria-expanded + aria-controls, foco
 * visible, objetivo táctil completo) y varias pueden estar abiertas a la
 * vez. Los efectos —aparición al entrar en pantalla, realce al puntero y
 * despliegue suave— se anulan cuando el sistema pide movimiento reducido.
 */
import { useEffect, useId, useRef, useState } from 'react';
import {
  HITOS_LINEA_TIEMPO,
  REFERENCIAS_LINEA_TIEMPO,
  SUBTITULO_LINEA_TIEMPO,
  TITULO_LINEA_TIEMPO,
} from '../../data/linea-tiempo.js';
import './modulo-linea-tiempo.css';

/**
 * Tarjeta desplegable de un hito: cerrada muestra año y título; el botón
 * de cabecera revela el resto del contenido. El estado vive en cada
 * tarjeta para que varias puedan abrirse a la vez.
 */
function TarjetaHito({ hito }) {
  const [abierta, setAbierta] = useState(false);
  const idContenido = useId();

  return (
    <article className="modulo-linea-tiempo__tarjeta">
      {/* Patrón de acordeón: el encabezado conserva la jerarquía (h2) y el
          botón interior es quien abre y cierra. */}
      <h2 className="modulo-linea-tiempo__encabezado-hito">
        <button
          type="button"
          className="modulo-linea-tiempo__resumen"
          aria-expanded={abierta}
          aria-controls={idContenido}
          onClick={() => setAbierta((estado) => !estado)}
        >
          <span className="modulo-linea-tiempo__resumen-textos">
            <span className="modulo-linea-tiempo__anio">{hito.anio}</span>
            <span className="modulo-linea-tiempo__hito-titulo">{hito.titulo}</span>
          </span>
          {/* Indicador de despliegue (solo visual; el estado lo anuncia
              aria-expanded) */}
          <span
            className={`modulo-linea-tiempo__indicador${
              abierta ? ' modulo-linea-tiempo__indicador--abierto' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </h2>

      {abierta && (
        <div id={idContenido} className="modulo-linea-tiempo__despliegue">
          <p className="modulo-linea-tiempo__descripcion">{hito.descripcion}</p>
          <p className="modulo-linea-tiempo__aporte">
            <strong className="modulo-linea-tiempo__aporte-etiqueta">
              Aporte al bienestar:
            </strong>
            {hito.aporte}
          </p>
          <p className="modulo-linea-tiempo__referencias">
            <span className="oculto-accesible">Referencias: </span>
            {hito.referencias.map((numero) => `[${numero}]`).join('')}
          </p>
        </div>
      )}
    </article>
  );
}

function ModuloLineaTiempo() {
  const raizRef = useRef(null);

  /* Aparición progresiva de los hitos al desplazarse. El modificador
     `--animado` se añade por código ANTES de observar: si el script no
     corre, ningún hito queda oculto. Con movimiento reducido o sin
     IntersectionObserver, los hitos se muestran de inmediato. */
  useEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return undefined;

    const hitos = raiz.querySelectorAll('.modulo-linea-tiempo__hito');
    const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefiereQuieto || typeof window.IntersectionObserver !== 'function') {
      return undefined;
    }

    raiz.classList.add('modulo-linea-tiempo--animado');
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('modulo-linea-tiempo__hito--visible');
            observador.unobserve(entrada.target);
          }
        });
      },
      /* Se revela un poco antes de que el hito toque el borde inferior */
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    hitos.forEach((hito) => observador.observe(hito));

    return () => {
      observador.disconnect();
      raiz.classList.remove('modulo-linea-tiempo--animado');
    };
  }, []);

  return (
    <section className="modulo-linea-tiempo" ref={raizRef}>
      {/* Título de la sección, en el verde de títulos del portal */}
      <header className="modulo-linea-tiempo__cabecera">
        <h1 className="modulo-linea-tiempo__titulo">{TITULO_LINEA_TIEMPO}</h1>
      </header>
      <p className="modulo-linea-tiempo__subtitulo">{SUBTITULO_LINEA_TIEMPO}</p>

      {/* Leyenda de referencias, ANTES de la cronología: presenta los
          rótulos [n] que citan las tarjetas, con la numeración generada
          del catálogo. El texto fluye y se parte según el ancho. */}
      <aside className="modulo-linea-tiempo__leyenda" aria-label="Referencias de la cronología">
        <p className="modulo-linea-tiempo__leyenda-texto">
          Referencias:{' '}
          {REFERENCIAS_LINEA_TIEMPO.map(
            (referencia, indice) => `[${indice + 1}] ${referencia}`,
          ).join(' ')}
        </p>
      </aside>

      {/* Espina cronológica: lista ordenada de hitos. El color de acento de
          cada hito baja como variable CSS para pintar todas sus piezas. */}
      <ol className="modulo-linea-tiempo__lista">
        {HITOS_LINEA_TIEMPO.map((hito) => (
          <li
            key={`${hito.anio}-${hito.titulo}`}
            className="modulo-linea-tiempo__hito"
            style={{ '--acento': hito.acento }}
          >
            <span className="modulo-linea-tiempo__categoria">{hito.categoria}</span>
            {/* Punto sobre la espina y conector hacia el distintivo */}
            <span className="modulo-linea-tiempo__union" aria-hidden="true" />
            <TarjetaHito hito={hito} />
          </li>
        ))}
      </ol>

    </section>
  );
}

export default ModuloLineaTiempo;
