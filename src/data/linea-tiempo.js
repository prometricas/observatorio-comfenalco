/**
 * linea-tiempo.js — Contenido de la sección "Línea de tiempo".
 *
 * Los once hitos de la evolución del sistema de compensación familiar hacia
 * el bienestar integral (1945–2030), transcritos literalmente del bosquejo
 * aprobado por el cliente. Cada hito declara su categoría de bienestar y el
 * color de acento con el que se pinta el distintivo, el punto de la espina,
 * el borde de la tarjeta, el año y las referencias.
 *
 * Las tarjetas son informativas por ahora: el cliente aún define si tendrán
 * contenido propio o funcionarán como accesos, por lo que este catálogo no
 * incluye destinos de navegación.
 *
 * Colores: proceden del bosquejo. Seis acentos se oscurecieron lo mínimo
 * necesario —mismo tono, menos luminosidad— para que el texto blanco del
 * distintivo y el color sobre el blanco de la tarjeta cumplan el contraste
 * AA (4,5:1) que el portal exige en todo texto; el valor original del
 * bosquejo queda anotado junto a cada ajuste.
 */

/** Título y subtítulo de la sección, tal como aparecen en el bosquejo. */
export const TITULO_LINEA_TIEMPO = 'Línea del Tiempo: Evolución hacia el Bienestar Integral';
export const SUBTITULO_LINEA_TIEMPO =
  'Del apoyo económico familiar a un modelo integral, adaptativo y prospectivo';

/**
 * Hitos en orden cronológico. `referencias` remite por número a
 * REFERENCIAS_LINEA_TIEMPO (numeración 1..n, la misma del bosquejo).
 */
export const HITOS_LINEA_TIEMPO = [
  {
    anio: '1945',
    titulo: 'Salario familiar',
    categoria: 'Bienestar económico',
    acento: '#167395',
    descripcion: 'Surge como apoyo adicional para trabajadores con personas a cargo.',
    aporte: 'Alivia necesidades económicas del hogar trabajador.',
    referencias: [1, 3],
  },
  {
    anio: '1954',
    titulo: 'Nace Comfama',
    categoria: 'Bienestar institucional',
    acento: '#13847e' /* bosquejo: #148e87 */,
    descripcion: 'Se crea la primera caja de compensación familiar por compensación.',
    aporte: 'Establece una organización para gestionar beneficios colectivos.',
    referencias: [1, 2, 3],
  },
  {
    anio: '1957',
    titulo: 'Institucionalización nacional',
    categoria: 'Protección social',
    acento: '#118571' /* bosquejo: #149b83 */,
    descripcion: 'El Decreto 118 vuelve obligatorio el subsidio familiar.',
    aporte: 'Fortalece la protección económica y familiar de los trabajadores.',
    referencias: [1, 2, 3],
  },
  {
    anio: '1962',
    titulo: 'Expansión de funciones',
    categoria: 'Bienestar social',
    acento: '#24874d' /* bosquejo: #2fae63 */,
    descripcion: 'Las cajas pueden invertir en obras y programas sociales.',
    aporte: 'El sistema empieza a trascender la cuota monetaria.',
    referencias: [1],
  },
  {
    anio: '1982',
    titulo: 'Ley 21: consolidación',
    categoria: 'Bienestar integral',
    acento: '#288745' /* bosquejo: #35b45c */,
    descripcion: 'Reorganiza el subsidio en dinero, especie y servicios.',
    aporte: 'Integra salud, nutrición, educación, vivienda, crédito y recreación.',
    referencias: [1, 3],
  },
  {
    anio: '1999-2008',
    titulo: 'FONIÑEZ y jornada escolar',
    categoria: 'Bienestar infantil',
    acento: '#c7521e' /* bosquejo: #e47b4d */,
    descripcion: 'Se consolidan programas de atención a la niñez y jornada complementaria.',
    aporte: 'Fortalece educación, alimentación y apoyo a las familias.',
    referencias: [1, 2],
  },
  {
    anio: '2002',
    titulo: 'Cajas como operadoras sociales',
    categoria: 'Protección social',
    acento: '#d6421d' /* bosquejo: #e45b39 */,
    descripcion: 'La Ley 789 amplía el papel de las cajas dentro de la protección social.',
    aporte: 'Articula empleo, servicios sociales y ampliación de coberturas.',
    referencias: [1, 3],
  },
  {
    anio: '2013',
    titulo: 'Protección al cesante',
    categoria: 'Bienestar laboral',
    acento: '#d43b32',
    descripcion: 'La Ley 1636 crea el FOSFEC.',
    aporte: 'Incorpora empleabilidad, capacitación y reinserción laboral.',
    referencias: [1, 3],
  },
  {
    anio: '2024',
    titulo: 'Nuevas familias, nuevas necesidades',
    categoria: 'Bienestar diverso',
    acento: '#c92f36',
    descripcion: 'Cambian la fecundidad, los hogares y las trayectorias de vida.',
    aporte: 'Exige cuidado, inclusión y servicios flexibles para distintos hogares.',
    referencias: [3],
  },
  {
    anio: '2025-2026',
    titulo: 'Entorno PESTEL',
    categoria: 'Bienestar sostenible',
    acento: '#b52c43',
    descripcion:
      'Digitalización, reforma laboral, sostenibilidad y envejecimiento transforman el sistema.',
    aporte: 'Demanda salud mental, servicios digitales, cuidado y gestión ambiental.',
    referencias: [3],
  },
  {
    anio: '2030',
    titulo: 'Modelo integral adaptativo',
    categoria: 'Bienestar prospectivo',
    acento: '#822c95',
    descripcion: 'Se proyecta un sistema territorial, digital, inclusivo y preventivo.',
    aporte: 'Integra cuidado, salud, empleabilidad, sostenibilidad y calidad de vida.',
    referencias: [2, 3],
  },
];

/** Fuentes citadas al pie, en el orden de su numeración. */
export const REFERENCIAS_LINEA_TIEMPO = [
  'El subsidio familiar y las cajas de compensación familiar en Colombia.',
  'Prospectiva: Sistemas de compensación familiar - Asocajas.',
  'PESTEL: El sistema del subsidio familiar y su entorno.',
];
