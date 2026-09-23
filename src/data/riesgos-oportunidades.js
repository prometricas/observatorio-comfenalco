/**
 * riesgos-oportunidades.js — Catálogo del eje "Riesgos y oportunidades"
 * (0.55.0).
 *
 * Ocho análisis de riesgos y oportunidades hacia 2040, uno por tendencia,
 * elaborados por el equipo de Prospectiva y Oportunidades de Comfenalco
 * Antioquia y entregados como PDF (carpeta "Riesgos_y_Oportunidades" del
 * cliente, 2026-09-23). Los PDF viven en `public/data/riesgos-y-oportunidades/`
 * (nombres kebab-case numerados) y sus portadas en WebP en
 * `src/assets/riesgos-y-oportunidades/` (primera página a 480 px; script
 * del scratchpad publicaciones/portadas-riesgos.mjs). A diferencia de
 * Publicaciones, aquí NO hay visor en línea: cada PDF se DESCARGA
 * (decisión del cliente).
 *
 * Los textos (conceptualización de riesgo y de oportunidad, y el resumen de
 * cada documento) vienen del Excel "RESUMEN DOCUMENTOS.xlsx" del cliente;
 * se retiró de cada resumen la línea "Para conocer mayor detalle, ingresar
 * al siguiente documento: PDF" (la sustituye el botón de descarga).
 *
 * Campos de cada análisis:
 *   id           identificador estable (kebab-case)
 *   numero       orden del cliente (1–8)
 *   titulo       nombre del documento (columna "Documento" del Excel)
 *   tendenciaId  sección de la tendencia relacionada (enlace cruzado)
 *   gancho       síntesis de UNA frase para la tarjeta compacta (redacción del
 *                portal a partir del resumen, 0.55.1: se ve de entrada)
 *   resumen      texto de la columna "Resumen" (se despliega con "Leer el
 *                resumen completo")
 *   archivo      nombre del PDF dentro de public/data/riesgos-y-oportunidades/
 *   paginas      número de páginas
 *   tamanoMb     peso aproximado
 *   portada      import de la portada WebP (480×621)
 * Documento nuevo = copiar el PDF, generar la portada y añadir una entrada.
 */
import portada01 from '../assets/riesgos-y-oportunidades/portada-01-envejecimiento-poblacional.webp';
import portada02 from '../assets/riesgos-y-oportunidades/portada-02-informalidad-laboral.webp';
import portada03 from '../assets/riesgos-y-oportunidades/portada-03-inversion-social.webp';
import portada04 from '../assets/riesgos-y-oportunidades/portada-04-estructura-familiar.webp';
import portada05 from '../assets/riesgos-y-oportunidades/portada-05-normas-laborales.webp';
import portada06 from '../assets/riesgos-y-oportunidades/portada-06-economia-circular.webp';
import portada07 from '../assets/riesgos-y-oportunidades/portada-07-hiperpersonalizacion-de-servicios.webp';
import portada08 from '../assets/riesgos-y-oportunidades/portada-08-regulaciones-ambientales.webp';

export const ENTIDAD_RIESGOS = 'Prospectiva y Oportunidades · Comfenalco Antioquia';
export const PORTADA_ANCHO = 480;
export const PORTADA_ALTO = 621;

/* Conceptualización del cliente (Excel, primera celda) */
export const CONCEPTOS_RIESGOS = [
  {
    id: 'riesgo',
    nombre: 'Riesgo',
    texto:
      'En el marco del Observatorio, el riesgo no se entiende como un daño ya ocurrido ni como una amenaza externa que sobreviene a un sistema estable, sino como la posibilidad, anticipable en el presente, de que una tendencia en curso deteriore una o varias dimensiones del bienestar integral de las personas, los hogares y las instituciones dentro del horizonte 2040. Es una categoría prospectiva: se formula sobre señales, tendencias pesadas y rupturas plausibles, no sobre certezas.',
  },
  {
    id: 'oportunidad',
    nombre: 'Oportunidad',
    texto:
      'Se define como una configuración emergente del entorno que, si se dan ciertas condiciones habilitantes, puede ser convertida deliberadamente en bienestar efectivo para las personas y en pertinencia y legitimidad para la institución. No es un deseo ni una buena intención: es un curso de acción plausible con un punto de apoyo identificable en la realidad.',
  },
];

export const ANALISIS_RIESGOS = [
  {
    id: 'envejecimiento-poblacional',
    numero: 1,
    titulo: 'Envejecimiento poblacional y bienestar integral',
    tendenciaId: 'tendencias-envejecimiento',
    gancho:
      'Colombia y Antioquia envejecen más rápido de lo que se preparan: la vejez sin ingresos y los hogares que cuidan son el riesgo; la longevidad activa y la economía del cuidado, la oportunidad.',
    resumen:
      'De los riesgos y oportunidades del envejecimiento poblacional en Colombia y Antioquia con un horizonte al 2040, así como el impacto sobre el bienestar integral, las estructuras familiares, el mercado laboral y la sostenibilidad de la protección social; destacan riesgos como la insuficiencia de ingresos en la vejez, la sobrecarga y precarización de los hogares que cuidan, la erosión de la base contributiva y el desajuste de la oferta institucional frente a la nueva estructura de edades, mientras que las oportunidades apuntan hacia la promoción de una longevidad activa, la formalización y jerarquización del sector de los cuidados, el aprovechamiento del bono de género y el fortalecimiento de la inteligencia anticipatoria territorial.',
    archivo: '01-envejecimiento-poblacional.pdf',
    paginas: 20,
    tamanoMb: 1,
    portada: portada01,
  },
  {
    id: 'informalidad-laboral',
    numero: 2,
    titulo: 'Informalidad laboral y bienestar integral',
    tendenciaId: 'tendencias-informalidad-laboral',
    gancho:
      'Fuera del Valle de Aburrá la formalización se estanca; rutas por segmento empresarial e intermediación subregional pueden ampliar el empleo protegido hacia 2040.',
    resumen:
      'La informalidad laboral en Medellín y las subregiones de Antioquia con un horizonte al 2040, y su impacto directo en el bienestar integral así como el acceso a la protección social, trae consigo diversos riesgos y oportunidades, donde destacan riesgos como la persistencia de brechas territoriales fuera del Valle de Aburrá, el estancamiento de la formalización urbana en su última milla, la vulnerabilidad frente a choques económicos y la desprotección en salud, riesgos laborales y vejez; por otra parte dentro de las oportunidades, se evidencian el diseño de rutas de formalización diferenciadas por segmentos empresariales, el fortalecimiento de la intermediación laboral subregional, la creación de encadenamientos productivos y el desarrollo de sistemas territoriales de inteligencia para ampliar el empleo protegido.',
    archivo: '02-informalidad-laboral.pdf',
    paginas: 20,
    tamanoMb: 1,
    portada: portada02,
  },
  {
    id: 'inversion-social',
    numero: 3,
    titulo: 'Inversión social y bienestar integral',
    tendenciaId: 'tendencias-gasto-social',
    gancho:
      'Salud y vejez concentran más del 82 % de la inversión social; la prevención y el cuidado como inversión estratégica son la salida a esa rigidez.',
    resumen:
      'La inversión y el gasto social público en Colombia con un horizonte al 2040 se encuentra fuertemente concentrada en salud y vejez, las cuales representan más del 82 % de los recursos; entre los principales riesgos se identifican la rigidez presupuestal que desplaza la inversión en infancia y mercado laboral, la persistencia de un enfoque sanitario predominantemente curativo y la baja conversión de la inversión educativa en aprendizajes efectivos, mientras que las oportunidades apuntan hacia el fortalecimiento de la prevención, el reconocimiento del cuidado como inversión estratégica, la articulación de servicios complementarios para la nueva protección a la vejez y la creación de alianzas territoriales orientadas a maximizar el bienestar de los hogares.',
    archivo: '03-inversion-social.pdf',
    paginas: 19,
    tamanoMb: 1.1,
    portada: portada03,
  },
  {
    id: 'estructura-familiar',
    numero: 4,
    titulo: 'Cambios en la estructura familiar',
    tendenciaId: 'tendencias-estructura-familiar',
    gancho:
      'Hogares más pequeños, unipersonales y con jefatura femenina: la sobrecarga de cuidado es el riesgo; la conciliación y la vivienda flexible, la oportunidad.',
    resumen:
      'Las transformaciones en la estructura familiar en Colombia con un horizonte al 2040, donde la principal característica es el incremento de hogares más pequeños, unipersonales y monoparentales, así como el aumento de la jefatura femenina frente a los modelos tradicionales, destacan riesgos como la sobrecarga económica y de cuidado en hogares monoparentales, la presión habitacional, la soledad y la transmisión intergeneracional de desventajas, mientras que las oportunidades apuntan hacia la corresponsabilidad empresarial en la conciliación familiar, la autonomía económica de las mujeres, el desarrollo de vivienda flexible y la adaptación de los servicios institucionales a la diversidad de los hogares.',
    archivo: '04-estructura-familiar.pdf',
    paginas: 19,
    tamanoMb: 1,
    portada: portada04,
  },
  {
    id: 'normas-laborales',
    numero: 5,
    titulo: 'Cambios en normas laborales y bienestar integral',
    tendenciaId: 'tendencias-normatividad-laboral',
    gancho:
      'La Ley 2466 de 2025 y la jornada de 42 horas encarecen turnos y abren vacíos jurídicos; la formalización productiva y el bienestar laboral pueden convertirlos en ganancia.',
    resumen:
      'Los riesgos y oportunidades derivados de los cambios en las normas laborales en Colombia —con epicentro en la Ley 2466 de 2025 y la reducción de la jornada máxima a 42 horas semanales— frente al bienestar integral de los trabajadores, la informalidad y la productividad con horizonte al año 2040; en este sentido, factores como el incremento de costos laborales en turnos nocturnos y festivos, la incertidumbre jurídica salarial y la brecha en la protección de nuevas formas de trabajo (como las plataformas digitales) pueden generar tensiones en el empleo formal y las instituciones, mientras que la formalización productiva, la formación de competencias, la gestión del bienestar laboral y el aprovechamiento del tiempo libre se plantean como oportunidades estratégicas para transformar estas normativas en bienestar efectivo.',
    archivo: '05-normas-laborales.pdf',
    paginas: 20,
    tamanoMb: 1,
    portada: portada05,
  },
  {
    id: 'economia-circular',
    numero: 6,
    titulo: 'Economía circular y bienestar integral',
    tendenciaId: 'tendencias-economia-circular',
    gancho:
      'Una circularidad solo declarativa y empleos verdes precarios son el riesgo; la formalización inclusiva de recicladores y las competencias sostenibles, la oportunidad.',
    resumen:
      'Entre los riesgos y oportunidades de la transición hacia la economía circular con un horizonte al 2040 y su impacto sobre el bienestar integral, la productividad y la equidad social en Colombia y Antioquia, se destacan la circularidad meramente declarativa sin cambios operativos reales, la precarización de los empleos verdes, la exclusión de los recicladores de oficio y el traslado de los costos de la transición a los hogares vulnerables, mientras que las oportunidades apuntan hacia la formación en competencias sostenibles, el acompañamiento a empresas, la formalización inclusiva de recicladores y el desarrollo de una inteligencia territorial basada en mediciones rigurosas.',
    archivo: '06-economia-circular.pdf',
    paginas: 19,
    tamanoMb: 1,
    portada: portada06,
  },
  {
    id: 'hiperpersonalizacion-de-servicios',
    numero: 7,
    titulo: 'Hiperpersonalización de servicios y bienestar integral',
    tendenciaId: 'tendencias-hiper-personalizacion-de-servicios',
    gancho:
      'La IA que personaliza servicios puede discriminar y manipular, o anticipar derechos no ejercidos y liberar tiempo para la atención humana.',
    resumen:
      'La hiperpersonalización de servicios impulsada por inteligencia artificial y el uso de datos, con un horizonte al 2040 y su impacto en el bienestar integral frente a brechas digitales y de conectividad, presenta riesgos como la discriminación algorítmica y segmentación por rentabilidad, la concentración de beneficios en poblaciones conectadas, la persuasión manipuladora, la falsa precisión en decisiones de salud y la vulneración de la privacidad, mientras que como oportunidades se destacan la identificación proactiva de derechos no ejercidos, la orientación laboral personalizada, la prevención en salud con mediación profesional y la liberación de tiempo para la atención humana.',
    archivo: '07-hiperpersonalizacion-de-servicios.pdf',
    paginas: 21,
    tamanoMb: 1.1,
    portada: portada07,
  },
  {
    id: 'regulaciones-ambientales',
    numero: 8,
    titulo: 'Regulaciones ambientales y bienestar integral',
    tendenciaId: 'tendencias-regulaciones-ambientales',
    gancho:
      'Decenas de normas ambientales elevan costos que llegan a los hogares vulnerables; la eficiencia energética y las finanzas sostenibles convierten el cumplimiento en bienestar.',
    resumen:
      'El fortalecimiento de las regulaciones ambientales en Colombia con un horizonte al 2040 y su impacto en las condiciones materiales de vida, la salud y la equidad social frente a una arquitectura normativa compuesta por decenas de instrumentos vigentes, trae consigo riesgos como el aumento de costos operativos y su traslado a los hogares vulnerables, la exclusión de pequeñas empresas y proveedores por exigencias complejas de información, la persistencia de brechas entre emisiones y compromisos, y la volatilidad regulatoria, mientras que como oportunidades se destacan la eficiencia energética, el acceso a finanzas sostenibles, la salud ambiental como cobeneficio, el desarrollo de turismo sostenible y la formación para empleos orientados al cumplimiento normativo.',
    archivo: '08-regulaciones-ambientales.pdf',
    paginas: 19,
    tamanoMb: 1,
    portada: portada08,
  },
];

/** Ruta pública del PDF de un análisis (respeta la base relativa). */
export function rutaAnalisisRiesgos(archivo) {
  return `${import.meta.env.BASE_URL}data/riesgos-y-oportunidades/${archivo}`;
}
