/**
 * ModuloRiesgosOportunidades — Eje "Riesgos y oportunidades" del menú
 * desplegable (0.55.0).
 *
 * Equivalente a Publicaciones pero SIN visor en línea (decisión del
 * cliente): ocho análisis de riesgos y oportunidades hacia 2040, uno por
 * tendencia, que se DESCARGAN como PDF. Composición:
 *  1. Encabezado del eje con la presentación.
 *  2. Dos tarjetas con la conceptualización del cliente: qué entiende el
 *     Observatorio por riesgo y por oportunidad (Excel).
 *  3. Catálogo de ocho tarjetas numeradas COMPACTAS (0.55.1, petición del
 *     cliente: ver más análisis por pantalla): portada pequeña, título y un
 *     GANCHO de una frase; el resumen completo del Excel queda plegado y se
 *     despliega en el sitio con "Leer el resumen completo" (botón
 *     aria-expanded; varios abiertos a la vez; animación de rejilla
 *     0fr → 1fr, sin ventanas emergentes). Ficha de páginas y peso, botón "Descargar PDF"
 *     (atributo `download`: el navegador guarda el archivo) y el enlace
 *     cruzado "Ver la tendencia" (onNavegar, contrato de Tanques /
 *     Inicio), que lleva al artículo o visualizador de la tendencia
 *     analizada.
 * Catálogo, textos y rutas en `src/data/riesgos-oportunidades.js`: un
 * documento nuevo = copiar el PDF, generar la portada y registrarlo.
 */
import { useId, useState } from 'react';
import {
  ANALISIS_RIESGOS,
  CONCEPTOS_RIESGOS,
  ENTIDAD_RIESGOS,
  PORTADA_ALTO,
  PORTADA_ANCHO,
  rutaAnalisisRiesgos,
} from '../../data/riesgos-oportunidades.js';
import { obtenerEtiquetaSeccion } from '../../data/navegacion.js';
import './modulo-riesgos-oportunidades.css';

const formatearPeso = (mb) => (mb >= 10 ? `${Math.round(mb)} MB` : `${mb.toLocaleString('es-CO')} MB`);

/* Pictogramas de las dos tarjetas conceptuales (trazo del contenedor) */
const ICONOS_CONCEPTO = {
  /* Señal de alerta: triángulo con signo */
  riesgo: (
    <svg viewBox="0 0 64 64" width="40" height="40" focusable="false" aria-hidden="true">
      <path d="M32 10 6 54h52z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M32 26v14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="47" r="2.5" fill="currentColor" />
    </svg>
  ),
  /* Brote que crece: hoja sobre una flecha ascendente */
  oportunidad: (
    <svg viewBox="0 0 64 64" width="40" height="40" focusable="false" aria-hidden="true">
      <path d="M32 54V30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 30c0-10 8-16 18-16 0 10-8 16-18 16z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M32 40c0-8-6-12-14-12 0 8 6 12 14 12z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M12 54h40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
};

function ModuloRiesgosOportunidades({ onNavegar }) {
  /* Análisis con el resumen completo desplegado (varios a la vez). */
  const [abiertos, setAbiertos] = useState(() => new Set());
  const idBase = useId();
  const alternar = (id) =>
    setAbiertos((actual) => {
      const siguiente = new Set(actual);
      if (siguiente.has(id)) siguiente.delete(id);
      else siguiente.add(id);
      return siguiente;
    });

  return (
    <section className="modulo-riesgos" aria-labelledby="titulo-riesgos">
      <header className="modulo-riesgos__encabezado">
        <p className="modulo-riesgos__contexto">Prospectiva 2040</p>
        <h1 id="titulo-riesgos" className="modulo-riesgos__titulo">
          Riesgos y oportunidades
        </h1>
        <p className="modulo-riesgos__intro">
          Cada tendencia que sigue el Observatorio abre caminos que pueden deteriorar el bienestar o
          convertirse en bienestar efectivo. Estos ocho análisis, elaborados por el equipo de
          Prospectiva y Oportunidades de Comfenalco Antioquia, identifican unos y otros con un
          horizonte al 2040. Descargue cada documento completo en PDF.
        </p>
      </header>

      {/* Conceptualización: qué es un riesgo y qué es una oportunidad */}
      <ul className="modulo-riesgos__conceptos" aria-label="Cómo entiende el Observatorio el riesgo y la oportunidad">
        {CONCEPTOS_RIESGOS.map((concepto) => (
          <li key={concepto.id} className={`modulo-riesgos__concepto modulo-riesgos__concepto--${concepto.id}`}>
            <span className="modulo-riesgos__concepto-icono">{ICONOS_CONCEPTO[concepto.id]}</span>
            <div>
              <p className="modulo-riesgos__concepto-rotulo">¿Qué entendemos por…?</p>
              <h2 className="modulo-riesgos__concepto-titulo">{concepto.nombre}</h2>
              <p className="modulo-riesgos__concepto-texto">{concepto.texto}</p>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="modulo-riesgos__subtitulo">Ocho análisis para descargar</h2>
      <ol className="modulo-riesgos__lista">
        {ANALISIS_RIESGOS.map((analisis) => (
          <li key={analisis.id} className="modulo-riesgos__tarjeta">
            {/* Cabecera: portada pequeña + rótulo y título a su lado; el
                gancho y las acciones ocupan debajo todo el ancho */}
            <div className="modulo-riesgos__cabecera">
            <div className="modulo-riesgos__portada-marco">
              <img
                className="modulo-riesgos__portada"
                src={analisis.portada}
                alt={`Portada: ${analisis.titulo}`}
                width={PORTADA_ANCHO}
                height={PORTADA_ALTO}
                loading="lazy"
                decoding="async"
              />
              <span className="modulo-riesgos__numero" aria-hidden="true">
                {analisis.numero}
              </span>
            </div>
            <div className="modulo-riesgos__titular">
              <p className="modulo-riesgos__tipo">Análisis de riesgos y oportunidades</p>
              <h3 className="modulo-riesgos__tarjeta-titulo">
                <span className="oculto-accesible">{analisis.numero}. </span>
                {analisis.titulo}
              </h3>
            </div>
            </div>
            <div className="modulo-riesgos__cuerpo">
              <p className="modulo-riesgos__gancho">{analisis.gancho}</p>

              {/* Resumen completo del Excel, plegado: se despliega en el
                  sitio (rejilla 0fr → 1fr) sin ventanas ni saltos */}
              <div
                id={`${idBase}-${analisis.id}`}
                className={`modulo-riesgos__despliegue${
                  abiertos.has(analisis.id) ? ' modulo-riesgos__despliegue--abierto' : ''
                }`}
              >
                <div className="modulo-riesgos__despliegue-interior">
                  <p className="modulo-riesgos__resumen">{analisis.resumen}</p>
                </div>
              </div>
              <button
                type="button"
                className="modulo-riesgos__leer-mas"
                aria-expanded={abiertos.has(analisis.id)}
                aria-controls={`${idBase}-${analisis.id}`}
                onClick={() => alternar(analisis.id)}
              >
                {abiertos.has(analisis.id) ? 'Ocultar el resumen' : 'Leer el resumen completo'}
                <span className="modulo-riesgos__leer-mas-cheuron" aria-hidden="true" />
              </button>

              <p className="modulo-riesgos__meta">
                {ENTIDAD_RIESGOS} · {analisis.paginas} páginas · PDF de{' '}
                {formatearPeso(analisis.tamanoMb)}
              </p>
              <div className="modulo-riesgos__acciones">
                <a
                  className="modulo-riesgos__descargar"
                  href={rutaAnalisisRiesgos(analisis.archivo)}
                  download={analisis.archivo}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" focusable="false" aria-hidden="true">
                    <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Descargar PDF
                  <span className="oculto-accesible">: {analisis.titulo}</span>
                </a>
                {onNavegar && (
                  <button
                    type="button"
                    className="modulo-riesgos__tendencia"
                    onClick={() => onNavegar(analisis.tendenciaId)}
                  >
                    Ver la tendencia
                    <span className="oculto-accesible"> {obtenerEtiquetaSeccion(analisis.tendenciaId)}</span>
                    <span className="modulo-riesgos__tendencia-flecha" aria-hidden="true">
                      →
                    </span>
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default ModuloRiesgosOportunidades;
