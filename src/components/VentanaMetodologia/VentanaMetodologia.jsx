/**
 * VentanaMetodologia — Invitación + ventana emergente con la metodología
 * (ecuaciones) de una tendencia (0.50.0 Informalidad; 0.51.0 compartida
 * con Envejecimiento).
 *
 * Pieza compartida: una INVITACIÓN grande (mismo lenguaje del botón
 * "¿Cómo usar el visualizador?" de los indicadores: píldora blanca, icono
 * en pistacho con halo que late, cheurón) que abre una VENTANA EMERGENTE
 * centrada con `<dialog>` nativo (showModal: velo, foco atrapado, Escape
 * cierra; también cierran el botón ×, el botón "Cerrar" del pie y el clic
 * sobre el velo). No desplaza el contenido de la página.
 *
 * El contenido lo pone cada tendencia como children (MetodologiaInformalidad,
 * MetodologiaEnvejecimiento) con los componentes de composición que se
 * exportan aquí: P, H3, Ecuacion (bloque con `role="img"` y lectura
 * textual), Mat (fragmento en línea), Definiciones y Referencias (URL como
 * enlace que muestra su propia dirección, regla de seguridad del portal).
 * Ecuaciones en HTML/CSS con pila serif matemática (patrón de Gasto social).
 */
import { useEffect, useId, useRef, useState } from 'react';
import './ventana-metodologia.css';

/** Fragmento matemático en línea con lectura propia. */
export const Mat = ({ lectura, children }) => (
  <span className="ventana-metodologia__mate" role="img" aria-label={lectura}>
    {children}
  </span>
);

/** Ecuación destacada en su propio bloque. */
export const Ecuacion = ({ lectura, children }) => (
  <div className="ventana-metodologia__ecuacion" role="img" aria-label={lectura}>
    <span className="ventana-metodologia__ecuacion-texto">{children}</span>
  </div>
);

export const P = ({ children }) => <p className="ventana-metodologia__parrafo">{children}</p>;
export const H3 = ({ children }) => <h3 className="ventana-metodologia__apartado">{children}</h3>;
export const Definiciones = ({ children }) => (
  <ul className="ventana-metodologia__definiciones">{children}</ul>
);

/** Lista de referencias; cada entrada {texto, url?}. */
export const Referencias = ({ entradas }) => (
  <>
    <H3>Referencias</H3>
    <ul className="ventana-metodologia__referencias">
      {entradas.map((referencia) => (
        <li key={referencia.texto} className="ventana-metodologia__referencia">
          {referencia.texto}
          {referencia.url && (
            <a href={referencia.url} target="_blank" rel="noreferrer">
              {referencia.url}
            </a>
          )}
        </li>
      ))}
    </ul>
  </>
);

function VentanaMetodologia({ contexto, titulo, invitacionTitulo, invitacionPista, icono, children }) {
  const [abierta, setAbierta] = useState(false);
  const dialogoRef = useRef(null);
  const idTitulo = useId();

  /* El estado manda sobre el <dialog>: abrir con showModal (modal real,
     con velo y foco atrapado) y cerrar con close(). El evento `close`
     (Escape del navegador) sincroniza el estado de vuelta. */
  useEffect(() => {
    const dialogo = dialogoRef.current;
    if (!dialogo) return undefined;
    if (abierta && !dialogo.open) dialogo.showModal();
    if (!abierta && dialogo.open) dialogo.close();
    const alCerrar = () => setAbierta(false);
    dialogo.addEventListener('close', alCerrar);
    return () => dialogo.removeEventListener('close', alCerrar);
  }, [abierta]);

  /* Clic sobre el velo (fuera de la caja) cierra la ventana */
  const manejarClicVelo = (evento) => {
    if (evento.target === dialogoRef.current) setAbierta(false);
  };

  return (
    <div className="ventana-metodologia">
      <button
        type="button"
        className="ventana-metodologia__invitacion"
        aria-haspopup="dialog"
        aria-expanded={abierta}
        onClick={() => setAbierta(true)}
      >
        <span className="ventana-metodologia__invitacion-icono" aria-hidden="true">
          {icono}
        </span>
        <span className="ventana-metodologia__invitacion-texto">
          <span className="ventana-metodologia__invitacion-titulo">{invitacionTitulo}</span>
          <span className="ventana-metodologia__invitacion-pista">{invitacionPista}</span>
        </span>
        <span className="ventana-metodologia__invitacion-flecha" aria-hidden="true" />
      </button>

      {/* Ventana emergente centrada; existe siempre en el DOM y el
          navegador la muestra solo con showModal() */}
      <dialog
        ref={dialogoRef}
        className="ventana-metodologia__ventana"
        aria-labelledby={idTitulo}
        onClick={manejarClicVelo}
      >
        <div className="ventana-metodologia__caja">
          <header className="ventana-metodologia__cabecera">
            <div>
              <p className="ventana-metodologia__contexto">{contexto}</p>
              <h2 id={idTitulo} className="ventana-metodologia__titulo">
                {titulo}
              </h2>
            </div>
            <button
              type="button"
              className="ventana-metodologia__cerrar"
              onClick={() => setAbierta(false)}
              aria-label="Cerrar la ventana de la metodología"
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div className="ventana-metodologia__cuerpo">{children}</div>

          <footer className="ventana-metodologia__pie">
            <button
              type="button"
              className="ventana-metodologia__boton-cerrar"
              onClick={() => setAbierta(false)}
            >
              Cerrar
            </button>
          </footer>
        </div>
      </dialog>
    </div>
  );
}

export default VentanaMetodologia;
