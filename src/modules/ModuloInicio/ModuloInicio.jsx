/**
 * ModuloInicio — Módulo de bienvenida del portal.
 *
 * Se renderiza en el módulo principal al entrar al portal. Presenta el
 * propósito del Observatorio sobre el banner de fotografías (BannerInicio,
 * 0.41.0) y ofrece seis tarjetas de acceso a secciones con contenido: los
 * tres ejes temáticos habilitados (Tendencias, Indicadores y Factores de
 * cambio) y tres secciones del menú fijo (Línea de tiempo, Benchmarking y
 * Tanques de pensamiento) — ajuste del cliente 2026-08-29: las tarjetas
 * de los ejes aún en preparación se reemplazaron por secciones
 * funcionales. Cada tarjeta lleva un pictograma al estilo de los accesos
 * de Comfenalco Antioquia (IconoInicio, 0.41.0) y navega a su sección
 * mediante el estado interno de la App.
 */
import BannerInicio from './BannerInicio.jsx';
import IconoInicio from './IconoInicio.jsx';
import './modulo-inicio.css';

/* Tarjetas del inicio: id de sección del catálogo de navegación,
   etiqueta y descripción corta. Todas las secciones listadas tienen
   contenido; si se agrega una tarjeta de una sección aún vacía,
   retirarla de EJES_DISPONIBLES para que anuncie "En preparación" (y
   dibujarle su pictograma en IconoInicio). */
const TARJETAS_INICIO = [
  {
    id: 'tendencias',
    etiqueta: 'Tendencias',
    descripcion:
      'Fenómenos sociales y económicos cuyo comportamiento permite anticipar el futuro de la región.',
  },
  {
    id: 'indicadores',
    etiqueta: 'Indicadores',
    descripcion:
      'Cifras e índices para el seguimiento del bienestar y la calidad de vida de la población.',
  },
  {
    id: 'factores-de-cambio',
    etiqueta: 'Factores de cambio',
    descripcion: 'Fuerzas que impulsan transformaciones en el entorno social y económico.',
  },
  {
    id: 'linea-de-tiempo',
    etiqueta: 'Línea de tiempo',
    descripcion:
      'La evolución del sistema de compensación familiar hacia el bienestar integral, de 1945 a 2030.',
  },
  {
    id: 'benchmarking',
    etiqueta: 'Benchmarking',
    descripcion:
      'Análisis comparativo de la concepción del bienestar en el mundo, la región y las cajas de compensación.',
  },
  {
    id: 'tanques-de-pensamiento',
    etiqueta: 'Tanques de pensamiento',
    descripcion:
      'La cronología de los espacios del Tanque de Pensamiento Prospectivo y sus preguntas clave.',
  },
];

/* Secciones con contenido habilitado: las tarjetas anuncian el estado de
   cada una para que nadie llegue a una sección vacía sin aviso. */
const EJES_DISPONIBLES = new Set([
  'tendencias',
  'indicadores',
  'factores-de-cambio',
  'linea-de-tiempo',
  'benchmarking',
  'tanques-de-pensamiento',
]);

function ModuloInicio({ onNavegar }) {
  return (
    <section className="modulo-inicio">
      {/* Banner de bienvenida: fotografías rotativas con la identidad del
          Observatorio encima */}
      <BannerInicio>
        <h1 className="modulo-inicio__titulo">Observatorio Comfenalco Antioquia</h1>
        {/* Resumen del documento conceptual del Observatorio (ajuste del
            cliente 2026-08-29): plataforma de inteligencia estratégica y
            conocimiento prospectivo al servicio del bienestar. */}
        <p className="modulo-inicio__lema">
          Plataforma de inteligencia estratégica que produce conocimiento
          prospectivo sobre el bienestar: anticipa las tendencias, los
          riesgos y las oportunidades que transformarán la vida de las
          personas, las familias, las empresas y los territorios, para
          orientar las decisiones del presente con visión de futuro.
        </p>
      </BannerInicio>

      {/* Tarjetas de acceso a los ejes temáticos y secciones destacadas */}
      <div className="modulo-inicio__ejes">
        <h2 className="modulo-inicio__subtitulo">¿Qué desea explorar?</h2>
        <ul className="modulo-inicio__tarjetas">
          {TARJETAS_INICIO.map((opcion) => (
            <li
              key={opcion.id}
              className={`modulo-inicio__tarjeta modulo-inicio__tarjeta--${opcion.id}`}
            >
              <IconoInicio id={opcion.id} />
              <div className="modulo-inicio__tarjeta-cuerpo">
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
                <p className="modulo-inicio__tarjeta-texto">{opcion.descripcion}</p>
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ModuloInicio;
