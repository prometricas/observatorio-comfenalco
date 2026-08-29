/**
 * linea-tiempo.js — Contenido de la sección "Línea de tiempo".
 *
 * Los doce hitos de la evolución del sistema de compensación familiar hacia
 * el bienestar integral (1945–2030), transcritos literalmente del bosquejo
 * actualizado por el cliente (2026-08-29), que suma la mirada territorial de
 * Comfenalco Antioquia: inicio de la caja en 1957, portafolio territorial
 * actual, gestión social 2024 y objetivo prospectivo a 2030. Cada hito
 * declara su categoría de bienestar y el color de acento con el que se
 * pintan el distintivo, el punto de la espina, el borde de la tarjeta, el
 * año y las referencias.
 *
 * Ajuste de composición documentado: en el bosquejo el aporte corre en la
 * misma línea de la etiqueta ("Aporte al bienestar: fortalece…"); como la
 * tarjeta del portal pone la etiqueta en línea propia, el aporte inicia
 * con mayúscula. El texto es el del bosquejo palabra por palabra.
 *
 * Colores: muestreados del bosquejo (moda de color sobre el distintivo de
 * cada hito). Seis acentos se oscurecieron lo mínimo necesario —mismo tono,
 * menos luminosidad— para que el texto blanco del distintivo y el color
 * sobre el blanco de la tarjeta cumplan el contraste AA (4,5:1) que el
 * portal exige en todo texto; el valor original del bosquejo queda anotado
 * junto a cada ajuste.
 */

/** Título y subtítulo de la sección, tal como aparecen en el bosquejo. */
export const TITULO_LINEA_TIEMPO = 'Línea del Tiempo: Evolución hacia el Bienestar Integral';
export const SUBTITULO_LINEA_TIEMPO =
  'Subsidio familiar y mirada territorial de Comfenalco Antioquia';

/**
 * Hitos en orden cronológico. `referencias` remite por número a
 * REFERENCIAS_LINEA_TIEMPO (numeración 1..n, la misma del bosquejo).
 */
export const HITOS_LINEA_TIEMPO = [
  {
    anio: '1945',
    titulo: 'Salario familiar',
    categoria: 'Bienestar económico',
    acento: '#0c5a78',
    descripcion:
      'Surge la idea del salario familiar como apoyo adicional para trabajadores con personas a cargo.',
    aporte: 'Introduce una visión de apoyo económico para aliviar necesidades del hogar trabajador.',
    referencias: [1, 3],
  },
  {
    anio: '1954',
    titulo: 'Nace Comfama',
    categoria: 'Bienestar institucional',
    acento: '#0b69a8',
    descripcion: 'Se crea la primera caja de compensación familiar por compensación.',
    aporte:
      'Establece una organización para gestionar beneficios colectivos para trabajadores y familias.',
    referencias: [1, 2, 3],
  },
  {
    anio: '1957',
    titulo: 'Inicia Comfenalco Antioquia',
    categoria: 'Mirada regional',
    acento: '#048288' /* bosquejo: #04848a */,
    descripcion:
      'Comfenalco Antioquia inicia con 185 empresas y 1.000 trabajadores afiliados; al comienzo prestaba el servicio de pago del subsidio familiar.',
    aporte: 'Conecta el sistema con el territorio antioqueño y el bienestar de las familias afiliadas.',
    referencias: [4],
  },
  {
    anio: '1957',
    titulo: 'Institucionalización nacional',
    categoria: 'Protección social',
    acento: '#672c83',
    descripcion:
      'El Decreto 118 vuelve obligatorio el subsidio familiar y consolida a las cajas como administradoras del sistema.',
    aporte: 'Fortalece la protección económica y familiar de los trabajadores.',
    referencias: [1, 2, 3],
  },
  {
    anio: '1962',
    titulo: 'Expansión de funciones',
    categoria: 'Bienestar social',
    acento: '#318641' /* bosquejo: #399a4b */,
    descripcion:
      'El Decreto 3151 permite a las cajas prestar servicios sociales además del subsidio en dinero.',
    aporte: 'Comfenalco Antioquia y las demás cajas transitan hacia una oferta social más amplia.',
    referencias: [1, 4],
  },
  {
    anio: '1982',
    titulo: 'Ley 21: consolidación',
    categoria: 'Bienestar integral',
    acento: '#d74115' /* bosquejo: #e94b1c */,
    descripcion: 'La Ley 21 reorganiza el subsidio familiar en dinero, especie y servicios.',
    aporte: 'Integra salud, nutrición, educación, vivienda, crédito y recreación.',
    referencias: [1, 3],
  },
  {
    anio: '1999–2008',
    titulo: 'FONIÑEZ y jornada escolar',
    categoria: 'Bienestar infantil',
    acento: '#154c85',
    descripcion:
      'Se consolidan programas de atención integral a la niñez y la jornada escolar complementaria.',
    aporte: 'Fortalece educación, alimentación y apoyo a las familias.',
    referencias: [1, 2],
  },
  {
    anio: '2002',
    titulo: 'Cajas como operadoras sociales',
    categoria: 'Protección social',
    acento: '#0c8299' /* bosquejo: #0c849b */,
    descripcion:
      'La Ley 789 amplía el papel de las cajas dentro de la protección social y el empleo.',
    aporte: 'Articula servicios sociales, empleo y ampliación de coberturas.',
    referencias: [1, 3],
  },
  {
    anio: '2013',
    titulo: 'Protección al cesante',
    categoria: 'Bienestar laboral',
    acento: '#2a874b' /* bosquejo: #34a65c */,
    descripcion: 'La Ley 1636 crea el FOSFEC para apoyar a la población cesante.',
    aporte: 'Incorpora empleabilidad, capacitación y reinserción laboral.',
    referencias: [1, 3],
  },
  {
    anio: '2000s–Hoy',
    titulo: 'Portafolio territorial',
    categoria: 'Comfenalco hoy',
    acento: '#bf5826' /* bosquejo: #d76934 */,
    descripcion:
      'Comfenalco Antioquia hoy ofrece 26 programas con servicios en educación, bibliotecas, recreación, hotelería y turismo, crédito social, vivienda y desarrollo social.',
    aporte: 'Territorializa el bienestar integral para afiliados, familias y comunidades.',
    referencias: [4],
  },
  {
    anio: '2024',
    titulo: 'Más bienestar en Antioquia',
    categoria: 'Impacto regional',
    acento: '#c73828',
    descripcion:
      'En 2024 benefició a más de 870.000 afiliados y fortaleció vivienda, empleo, cultura y recreación, además destinó recursos a FOVIS y créditos sociales.',
    aporte: 'Evidencia cómo el bienestar integral se materializa en el territorio.',
    referencias: [5],
  },
  {
    anio: '2030',
    titulo: 'Objetivo retador',
    categoria: 'Prospectiva',
    acento: '#69227c',
    descripcion:
      'Comfenalco Antioquia proyecta ser la caja más cercana al corazón de sus afiliados y su mejor aliado en la gestión del bienestar.',
    aporte: 'Impulsa una gestión cercana, sostenible y con mayor impacto territorial.',
    referencias: [4],
  },
];

/** Fuentes citadas al pie, en el orden de su numeración. */
export const REFERENCIAS_LINEA_TIEMPO = [
  'El subsidio familiar y las cajas de compensación familiar en Colombia.',
  'Prospectiva: Sistemas de compensación familiar – Asocajas.',
  'PESTEL: El sistema del subsidio familiar y su entorno.',
  'Comfenalco Antioquia: Nuestra historia / Quiénes somos.',
  'Comfenalco Antioquia: Gestión social 2024.',
];
