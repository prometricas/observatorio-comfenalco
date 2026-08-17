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
 * Las tarjetas son informativas: el cliente aún define si llevarán
 * contenido propio o funcionarán como accesos, así que no navegan a ningún
 * destino. La interacción se limita a dos efectos sutiles —aparición suave
 * al entrar en pantalla y realce al pasar el puntero—, ambos anulados
 * cuando el sistema pide movimiento reducido.
 */
import { useEffect, useRef } from 'react';
import {
  HITOS_LINEA_TIEMPO,
  REFERENCIAS_LINEA_TIEMPO,
  SUBTITULO_LINEA_TIEMPO,
  TITULO_LINEA_TIEMPO,
} from '../../data/linea-tiempo.js';
import './modulo-linea-tiempo.css';

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
            <article className="modulo-linea-tiempo__tarjeta">
              <p className="modulo-linea-tiempo__anio">{hito.anio}</p>
              <h2 className="modulo-linea-tiempo__hito-titulo">{hito.titulo}</h2>
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
            </article>
          </li>
        ))}
      </ol>

    </section>
  );
}

export default ModuloLineaTiempo;
