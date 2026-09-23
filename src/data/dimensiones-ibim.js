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
 *
 * `definicion` (0.54.0): definición conceptual de cada dimensión, tomada
 * del Word "Dimensiones-1.docx" del cliente (tabla Dimensión / Definición
 * / Variables). Se transcribe con limpieza mínima documentada en el
 * CHANGELOG (erratas evidentes, un fragmento inconcluso "Para….. En este
 * estudio se hará énfasis …" en Educación y una cita de página huérfana
 * "(p. 146)"); las citas legales y bibliográficas se conservan. Las
 * VARIABLES siguen siendo las de la Figura 2 (el gráfico del cliente), no
 * las de la tabla del Word, que difieren en algunos rótulos.
 */
export const DIMENSIONES_IBIM = [
  {
    id: 'salud-fisica',
    nombre: 'Salud física',
    color: '#c4d600',
    colorTexto: '#6f7a00',
    resumen: 'El cuerpo y la posibilidad de cuidarlo y atenderlo.',
    definicion:
      'Es un estado dinámico que se expresa en el óptimo funcionamiento del organismo (cuerpo humano) y un derecho fundamental que se logra con el equilibrio de diferentes aspectos. En este estudio se priorizan los siguientes asuntos: presencia o ausencia de enfermedades, alimentación y nutrición, hábitos y prácticas que inciden en la salud y la provisión de servicios de salud, que involucra el acceso oportuno.',
    variables: ['Hábitos y prácticas saludables', 'Acceso', 'Atención y acceso', 'Estado de salud corporal'],
  },
  {
    id: 'salud-mental',
    nombre: 'Salud mental',
    color: '#74c1a2',
    colorTexto: '#2f7a5d',
    resumen: 'Cómo se siente la persona consigo misma y con su vida.',
    definicion:
      'Es un estado dinámico que se expresa en la vida cotidiana a través del comportamiento y la interacción, de manera tal que permite a los sujetos individuales y colectivos desplegar sus recursos emocionales, cognitivos y mentales para transitar por la vida cotidiana, para trabajar, establecer relaciones significativas y para contribuir a la comunidad (Ley 1616 de 2013, de salud mental). En este estudio se consideran dos aspectos centrales: la identificación de síntomas asociados con problemas de salud mental, como el estrés, la ansiedad, el insomnio y la depresión, y el manejo y regulación de las emociones que se pueden presentar en el día a día.',
    variables: ['Emociones', 'Espiritualidad', 'Problemas de salud mental', 'Bienestar subjetivo'],
  },
  {
    id: 'educacion',
    nombre: 'Educación',
    color: '#f3bc52',
    colorTexto: '#9e6c0b',
    resumen: 'Los logros educativos y la permanencia en el sistema.',
    definicion:
      'Se reconoce la educación como un medio para apuntalar el desarrollo de capacidades y potencialidades individuales y colectivas de la población, que posibiliten el aprendizaje y la generación y utilización de conocimientos, técnicas, saberes, artes y cultura. De acuerdo con la especificidad de este estudio, se hace énfasis en el logro educativo de la persona y de su núcleo familiar, en la desescolarización y la deserción, y en la movilidad social, entendida como el alcance de metas individuales y colectivas.',
    variables: ['Bienestar subjetivo', 'Logro educativo', 'Desescolarización y deserción'],
  },
  {
    id: 'disfrute',
    nombre: 'Disfrute',
    color: '#3399a3',
    colorTexto: '#2b818a',
    resumen: 'El tiempo propio: descanso, recreación y equilibrio.',
    definicion:
      'Se comprende el disfrute como la realización de actividades escogidas libremente por la persona con el fin de disfrutar, descansar y sentirse tranquila, y que a su vez le generen entretenimiento o placer, contribuyendo al desarrollo personal, elemento fundamental para el bienestar. En este estudio se consideran dos variables principales: el balance entre el tiempo de vida y el de trabajo, y el ocio y la recreación.',
    variables: ['Balance vida y trabajo', 'Ocio y recreación'],
  },
  {
    id: 'ingresos-y-gastos',
    nombre: 'Ingresos y gastos',
    color: '#ed7a3f',
    colorTexto: '#b4531c',
    resumen: 'Lo que entra, lo que sale y lo que se debe.',
    definicion:
      'Se valora desde los ingresos, si están equilibrados con los gastos o si son mayores o iguales a las obligaciones; desde los gastos, si la persona logra cubrirlos y si cuenta con un apoyo económico en momentos de urgencia; y desde las deudas, si logra pagarlas. Es la dimensión de mayor repercusión sobre todas las demás y una de las más valoradas por las personas como importantes para movilizar el bienestar.',
    variables: ['Deudas', 'Gastos', 'Ingresos'],
  },
  {
    id: 'vinculos-sociales',
    nombre: 'Vínculos sociales',
    color: '#58b250',
    colorTexto: '#41853b',
    resumen: 'Las redes que sostienen y la vida en comunidad.',
    definicion:
      'Los vínculos sociales son relaciones humanas que representan un "apoyo social como provisiones instrumentales o expresivas, reales o percibidas, aportadas por la comunidad, redes sociales y amigos íntimos" (Fernández, 2005, p. 8). Para la medición de esta dimensión se tienen en cuenta tres aspectos centrales: redes de apoyo, participación y discriminación, con el objetivo de evidenciar el respaldo y la incidencia de las personas, además de las dificultades que pueden enfrentar por motivos de clase, género o raza.',
    variables: ['Discriminación e inclusión', 'Participación', 'Redes de apoyo'],
  },
  {
    id: 'empleo',
    nombre: 'Empleo',
    color: '#5eb2ae',
    colorTexto: '#3e817e',
    resumen: 'Las condiciones en las que se trabaja.',
    definicion:
      'El bienestar laboral se considera como el equilibrio entre el trabajo y la vida, de tal forma que pueda existir satisfacción en el desarrollo óptimo y efectivo de las responsabilidades laborales, en un entorno que le posibilite a la persona el desarrollo de competencias y capacidades que le generen empoderamiento y satisfacción.',
    variables: ['Percepción de seguridad en el trabajo', 'Clima laboral', 'Flexibilidad laboral'],
  },
  {
    id: 'vivienda-activos-y-servicios',
    nombre: 'Vivienda, activos y servicios',
    color: '#005744',
    colorTexto: '#005744',
    resumen: 'Dónde y cómo se habita, y con qué se cuenta.',
    definicion:
      'La pregunta por la vivienda y los activos que poseen las personas interroga las condiciones y la tenencia de estos, reconociendo que sus atributos y la posibilidad de acceder a ellos se constituyen en garantía para la satisfacción y el disfrute de condiciones óptimas de habitabilidad.',
    variables: ['Condiciones de la vivienda', 'Servicios domiciliarios', 'Activos', 'Bienestar subjetivo'],
  },
  {
    id: 'integridad-fisica',
    nombre: 'Integridad física',
    color: '#8a958e',
    colorTexto: '#55655e',
    resumen: 'Vivir sin miedo: seguridad en la calle, el entorno y el hogar.',
    definicion:
      'Se considera la integridad física como el reconocimiento de procesos que aseguran una convivencia pacífica, libre de violencia, amenazas y delitos. Entre los asuntos que interroga este estudio se encuentran la seguridad ciudadana, que indaga por hechos violentos que afectan la integridad de las personas; la seguridad del entorno, que aborda las condiciones ambientales y las amenazas que representan para las personas; y la violencia intrafamiliar, identificando las diferentes violencias que se puedan experimentar en el hogar.',
    variables: ['Seguridad ciudadana', 'Seguridad del entorno', 'Seguridad en el hogar y violencia intrafamiliar'],
  },
];
