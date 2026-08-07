/**
 * ModuloInicio — Módulo de bienvenida del portal (provisional).
 *
 * Se renderiza en el módulo principal al entrar al portal. Presenta el
 * propósito del Observatorio en una franja de bienvenida y ofrece tarjetas
 * de acceso a los seis ejes temáticos del menú desplegable; cada tarjeta
 * navega a su sección mediante el estado interno de la App. El contenido
 * definitivo del inicio se afinará con el cliente en próximas entregas.
 */
import { OPCIONES_NAV_DESPLEGABLE } from '../../data/navegacion.js';
import './modulo-inicio.css';

/* Ejes que ya tienen secciones con contenido. Mantener al habilitar ejes
   nuevos: las tarjetas del inicio anuncian el estado de cada uno para que
   nadie llegue a una sección vacía sin aviso. */
const EJES_DISPONIBLES = new Set(['tendencias', 'indicadores']);

/* Descripciones cortas provisionales de cada eje temático. */
const DESCRIPCIONES_EJES = {
  tendencias:
    'Fenómenos sociales y económicos cuyo comportamiento permite anticipar el futuro de la región.',
  indicadores:
    'Cifras e índices para el seguimiento del bienestar y la calidad de vida de la población.',
  'factores-de-cambio':
    'Fuerzas que impulsan transformaciones en el entorno social y económico.',
  'riesgos-y-oportunidades':
    'Condiciones potenciales que podrían afectar o favorecer el desarrollo territorial.',
  publicaciones:
    'Boletines estratégicos y documentos de análisis elaborados por el Observatorio.',
  innovacion:
    'Documentos e iniciativas para explorar nuevas formas de generar valor social.',
};

function ModuloInicio({ onNavegar }) {
  return (
    <section className="modulo-inicio">
      {/* Franja de bienvenida con la identidad del Observatorio */}
      <div className="modulo-inicio__hero">
        <div className="modulo-inicio__hero-contenido">
          <h1 className="modulo-inicio__titulo">Observatorio Comfenalco Antioquia</h1>
          <p className="modulo-inicio__lema">
            Información sobre tendencias, indicadores, riesgos y oportunidades
            del entorno social y económico de Colombia, para la toma de
            decisiones con perspectiva de futuro.
          </p>
        </div>
      </div>

      {/* Tarjetas de acceso a los ejes temáticos del menú desplegable */}
      <div className="modulo-inicio__ejes">
        <h2 className="modulo-inicio__subtitulo">¿Qué desea explorar?</h2>
        <ul className="modulo-inicio__tarjetas">
          {OPCIONES_NAV_DESPLEGABLE.map((opcion) => (
            <li
              key={opcion.id}
              className={`modulo-inicio__tarjeta modulo-inicio__tarjeta--${opcion.id}`}
            >
              {/* Estado del eje: anuncia desde el inicio qué secciones ya
                  tienen contenido y cuáles siguen en preparación */}
              <span
                className={`modulo-inicio__estado${
                  EJES_DISPONIBLES.has(opcion.id) ? ' modulo-inicio__estado--disponible' : ''
                }`}
              >
                {EJES_DISPONIBLES.has(opcion.id) ? 'Disponible' : 'En preparación'}
              </span>
              <h3 className="modulo-inicio__tarjeta-titulo">{opcion.etiqueta}</h3>
              <p className="modulo-inicio__tarjeta-texto">
                {DESCRIPCIONES_EJES[opcion.id]}
              </p>
              <button
                type="button"
                className="modulo-inicio__tarjeta-boton"
                aria-label={`Explorar ${opcion.etiqueta}`}
                onClick={() => onNavegar(opcion.id)}
              >
                Explorar
                <span className="modulo-inicio__tarjeta-flecha" aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ModuloInicio;
