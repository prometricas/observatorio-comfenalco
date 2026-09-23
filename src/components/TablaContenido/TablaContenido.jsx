/**
 * TablaContenido — Índice de navegación de los artículos de tendencias.
 *
 * Tabla de contenido al estilo del panel de navegación de Word (petición
 * del cliente), usada por los cuatro módulos-artículo (Gasto social,
 * Estructura familiar, Normatividad laboral y Economía circular):
 *
 *  - LEE los apartados directamente del artículo renderizado (h2/h3
 *    dentro del contenedor que recibe por ref): una sola fuente de
 *    verdad, sin listas duplicadas que mantener. Les asigna id (si no
 *    tienen) y tabindex -1 para poder enfocarlos al navegar.
 *  - En escritorio (≥1100 px) es una columna izquierda PEGAJOSA que
 *    acompaña la lectura, con la sección visible resaltada (scrollspy
 *    por IntersectionObserver, con el mismo respaldo de la Línea de
 *    tiempo: sin la API simplemente no hay resaltado).
 *  - En pantallas angostas es un desplegable "Contenido" al inicio del
 *    artículo (patrón de acordeón de la Línea de tiempo): se expande,
 *    se elige un apartado y se cierra solo.
 *  - El clic desplaza hasta el apartado descontando la cabecera pegajosa
 *    (altura medida en vivo) y mueve el foco al título de destino; el
 *    desplazamiento es suave salvo con movimiento reducido.
 *  - En pantallas angostas, un botón FLOTANTE "subir" aparece tras
 *    avanzar en la lectura (ajuste del cliente): vuelve a la tabla de
 *    contenido y deja el foco en el botón "Contenido", listo para
 *    abrirla con un toque. En escritorio no existe (la columna pegajosa
 *    ya acompaña).
 *
 * El bloque hermano `articulo-con-indice` (mismo archivo CSS) aporta la
 * rejilla columna-índice + artículo que usan los cuatro módulos.
 */
import { useEffect, useRef, useState } from 'react';
import './tabla-contenido.css';

/* Umbral de la variante angosta; debe coincidir con el CSS. */
const ANCHO_ESCRITORIO = 1100;

/* Desplazamiento a partir del cual aparece el botón flotante "subir". */
const UMBRAL_BOTON_SUBIR = 700;

/* Título de apartado → id estable para el ancla. */
const aId = (texto, indice) =>
  `apartado-${indice}-${texto
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)}`;

function TablaContenido({ articuloRef }) {
  const [entradas, setEntradas] = useState([]);
  const [activa, setActiva] = useState(null);
  const [abierta, setAbierta] = useState(false);
  const [mostrarSubir, setMostrarSubir] = useState(false);
  const navRef = useRef(null);
  const botonRef = useRef(null);

  /* Inventario de apartados del artículo ya renderizado (el contenido es
     fijo: basta una pasada al montar). */
  useEffect(() => {
    const articulo = articuloRef.current;
    if (!articulo) return;

    const titulos = [...articulo.querySelectorAll('h2, h3')];
    setEntradas(
      titulos.map((titulo, indice) => {
        /* Un título que envuelve un botón (acordeón de referencias) ofrece
           su rótulo limpio en data-indice; si no, vale el texto visible. */
        const texto = titulo.dataset.indice ?? titulo.textContent;
        if (!titulo.id) titulo.id = aId(texto, indice);
        /* Enfocable por código: al navegar, el foco salta al título. */
        titulo.tabIndex = -1;
        return {
          id: titulo.id,
          texto,
          nivel: titulo.tagName === 'H2' ? 1 : 2,
        };
      }),
    );
  }, [articuloRef]);

  /* Altura de la cabecera pegajosa del portal, para descontarla del
     desplazamiento y del anclaje del propio índice. */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;
    const medir = () => {
      const cabecera = document.querySelector('.header');
      nav.style.setProperty('--alto-cabecera', `${(cabecera?.offsetHeight ?? 0) + 16}px`);
    };
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, [entradas]);

  /* Scrollspy: la última cabecera que cruzó la franja superior de la
     ventana queda como sección activa. */
  useEffect(() => {
    const articulo = articuloRef.current;
    if (!articulo || entradas.length === 0) return undefined;
    if (typeof window.IntersectionObserver !== 'function') return undefined;

    const visibles = new Set();
    const observador = new IntersectionObserver(
      (cambios) => {
        cambios.forEach((cambio) => {
          if (cambio.isIntersecting) visibles.add(cambio.target.id);
          else visibles.delete(cambio.target.id);
        });
        /* De las cabeceras dentro de la franja de lectura, la primera en
           orden del documento es la sección que se está leyendo. */
        const primera = entradas.find((entrada) => visibles.has(entrada.id));
        if (primera) setActiva(primera.id);
      },
      /* Franja de lectura: el cuarto superior de la ventana (descontando
         la cabecera) decide la sección activa. */
      { rootMargin: '-80px 0px -70% 0px' },
    );
    entradas.forEach((entrada) => {
      const titulo = document.getElementById(entrada.id);
      if (titulo) observador.observe(titulo);
    });
    return () => observador.disconnect();
  }, [articuloRef, entradas]);

  /* El botón flotante aparece tras avanzar en la lectura (solo se pinta
     en pantallas angostas, por CSS; el estado se calcula siempre porque
     es barato y simplifica el redimensionado). */
  useEffect(() => {
    const evaluar = () => setMostrarSubir(window.scrollY > UMBRAL_BOTON_SUBIR);
    evaluar();
    window.addEventListener('scroll', evaluar, { passive: true });
    return () => window.removeEventListener('scroll', evaluar);
  }, []);

  /* Vuelve a la tabla de contenido y deja el foco en su botón: abrirla
     queda a un solo toque, también con teclado y lector de pantalla. */
  const volverAlIndice = () => {
    const nav = navRef.current;
    if (!nav) return;
    const cabecera = document.querySelector('.header');
    const margen = (cabecera?.offsetHeight ?? 0) + 12;
    const destino = nav.getBoundingClientRect().top + window.scrollY - margen;
    const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: Math.max(destino, 0), behavior: prefiereQuieto ? 'auto' : 'smooth' });
    botonRef.current?.focus({ preventScroll: true });
  };

  const navegarA = (evento, id) => {
    evento.preventDefault();
    const titulo = document.getElementById(id);
    if (!titulo) return;

    const cabecera = document.querySelector('.header');
    const margen = (cabecera?.offsetHeight ?? 0) + 12;
    const destino = titulo.getBoundingClientRect().top + window.scrollY - margen;
    const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: destino, behavior: prefiereQuieto ? 'auto' : 'smooth' });

    /* El foco acompaña la navegación (teclado y lectores de pantalla);
       sin desplazamiento propio, que ya lo hizo la ventana. */
    titulo.focus({ preventScroll: true });
    setActiva(id);

    /* En la variante angosta, elegir un apartado cierra el desplegable. */
    if (window.innerWidth < ANCHO_ESCRITORIO) setAbierta(false);
  };

  if (entradas.length === 0) return null;

  return (
    <nav ref={navRef} className="tabla-contenido" aria-label="Contenido del artículo">
      {/* Botón del desplegable (solo visible en pantallas angostas) */}
      <button
        ref={botonRef}
        type="button"
        className="tabla-contenido__boton"
        aria-expanded={abierta}
        aria-controls="tabla-contenido-lista"
        onClick={() => setAbierta((estado) => !estado)}
      >
        Contenido
        <span
          className={`tabla-contenido__cheuron${
            abierta ? ' tabla-contenido__cheuron--abierto' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      <p className="tabla-contenido__rotulo" aria-hidden="true">
        Contenido
      </p>

      <ul
        id="tabla-contenido-lista"
        className={`tabla-contenido__lista${abierta ? ' tabla-contenido__lista--abierta' : ''}`}
      >
        {entradas.map((entrada) => (
          <li key={entrada.id}>
            <a
              className={`tabla-contenido__enlace tabla-contenido__enlace--nivel-${entrada.nivel}${
                activa === entrada.id ? ' tabla-contenido__enlace--activo' : ''
              }`}
              href={`#${entrada.id}`}
              aria-current={activa === entrada.id ? 'true' : undefined}
              onClick={(evento) => navegarA(evento, entrada.id)}
            >
              {entrada.texto}
            </a>
          </li>
        ))}
      </ul>

      {/* Botón flotante "subir" (solo pantallas angostas, tras avanzar
          en la lectura): vuelve a la tabla de contenido. */}
      {mostrarSubir && (
        <button
          type="button"
          className="tabla-contenido__subir"
          aria-label="Volver a la tabla de contenido"
          onClick={volverAlIndice}
        >
          <span className="tabla-contenido__subir-flecha" aria-hidden="true" />
        </button>
      )}
    </nav>
  );
}

export default TablaContenido;
