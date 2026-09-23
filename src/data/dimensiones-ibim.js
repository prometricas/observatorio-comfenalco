/**
 * dimensiones-ibim.js — Las nueve dimensiones del Índice de Bienestar
 * Multidimensional y sus variables (Figura 2 del informe "Índice de
 * Bienestar Multidimensional de Comfenalco Antioquia 2023", Centro de
 * Estudios de Opinión, Universidad de Antioquia).
 *
 * Alimenta el flujograma interactivo `ModuloIbimDimensiones`. Orden
 * horario desde arriba, como en la figura. Colores del manual de marca
 * (variante de TEXTO AA para rótulos sobre blanco). Cambiar una variable
 * o una dimensión = editar solo este catálogo.
 */
export const DIMENSIONES_IBIM = [
  {
    id: 'salud-fisica',
    nombre: 'Salud física',
    color: '#c4d600',
    colorTexto: '#6f7a00',
    resumen: 'El cuerpo y la posibilidad de cuidarlo y atenderlo.',
    variables: ['Hábitos y prácticas saludables', 'Acceso', 'Atención y acceso', 'Estado de salud corporal'],
  },
  {
    id: 'salud-mental',
    nombre: 'Salud mental',
    color: '#74c1a2',
    colorTexto: '#2f7a5d',
    resumen: 'Cómo se siente la persona consigo misma y con su vida.',
    variables: ['Emociones', 'Espiritualidad', 'Problemas de salud mental', 'Bienestar subjetivo'],
  },
  {
    id: 'educacion',
    nombre: 'Educación',
    color: '#f3bc52',
    colorTexto: '#9e6c0b',
    resumen: 'Los logros educativos y la permanencia en el sistema.',
    variables: ['Bienestar subjetivo', 'Logro educativo', 'Desescolarización y deserción'],
  },
  {
    id: 'disfrute',
    nombre: 'Disfrute',
    color: '#3399a3',
    colorTexto: '#2b818a',
    resumen: 'El tiempo propio: descanso, recreación y equilibrio.',
    variables: ['Balance vida y trabajo', 'Ocio y recreación'],
  },
  {
    id: 'ingresos-y-gastos',
    nombre: 'Ingresos y gastos',
    color: '#ed7a3f',
    colorTexto: '#b4531c',
    resumen: 'Lo que entra, lo que sale y lo que se debe.',
    variables: ['Deudas', 'Gastos', 'Ingresos'],
  },
  {
    id: 'vinculos-sociales',
    nombre: 'Vínculos sociales',
    color: '#58b250',
    colorTexto: '#41853b',
    resumen: 'Las redes que sostienen y la vida en comunidad.',
    variables: ['Discriminación e inclusión', 'Participación', 'Redes de apoyo'],
  },
  {
    id: 'empleo',
    nombre: 'Empleo',
    color: '#5eb2ae',
    colorTexto: '#3e817e',
    resumen: 'Las condiciones en las que se trabaja.',
    variables: ['Percepción de seguridad en el trabajo', 'Clima laboral', 'Flexibilidad laboral'],
  },
  {
    id: 'vivienda-activos-y-servicios',
    nombre: 'Vivienda, activos y servicios',
    color: '#005744',
    colorTexto: '#005744',
    resumen: 'Dónde y cómo se habita, y con qué se cuenta.',
    variables: ['Condiciones de la vivienda', 'Servicios domiciliarios', 'Activos', 'Bienestar subjetivo'],
  },
  {
    id: 'integridad-fisica',
    nombre: 'Integridad física',
    color: '#8a958e',
    colorTexto: '#55655e',
    resumen: 'Vivir sin miedo: seguridad en la calle, el entorno y el hogar.',
    variables: ['Seguridad ciudadana', 'Seguridad del entorno', 'Seguridad en el hogar y violencia intrafamiliar'],
  },
];
