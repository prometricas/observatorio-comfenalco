/**
 * caracterizacion-factores.js — Caracterización prospectiva de los 22
 * factores de cambio (fragmento DIFERIDO del eje Factores de cambio).
 *
 * Contenido FIJO en el código, GENERADO por script desde las hojas
 * D1_F1 … D5_F22 del Excel "Factores_de_cambio.xlsx" del cliente
 * (scratchpad factores/generar-caracterizacion.mjs): por factor, la
 * tipificación (tipo + justificación), la CARACTERIZACIÓN en tres
 * escenarios (pasado, presente, futuro) por cuatro agrupaciones
 * regionales (global, Colombia, Antioquia y las 9 subregiones de
 * Antioquia), la síntesis prospectiva y las fuentes de información. Los
 * indicadores y las referencias bibliográficas de las hojas NO se portan
 * (decisión del cliente, 2026-09-19).
 *
 * Los textos son transcripción literal de las celdas; el único ajuste es
 * que el rótulo de la agrupación con que empieza cada celda ("Global.",
 * "Colombia.", "9 subregiones de Antioquia") se retira, porque en
 * pantalla lo pone el filtro de agrupación. Cada texto es una lista de
 * párrafos (las líneas en blanco de la celda separan párrafos).
 *
 * Pesa ~320 KB: por eso vive en su propio archivo, que el módulo
 * importa de forma diferida (import()) al montarse — la rueda y el
 * catálogo base cargan primero y este texto llega en segundo plano.
 * Cambios del contenido = regenerar con el script y recompilar.
 *
 * CORRECCIÓN MANUAL (0.56.1): en f11 (Legitimidad y confianza
 * institucional) la celda Presente·Global del Excel traía copiado el texto
 * de Futuro·Subregiones; el cliente entregó el texto correcto el
 * 2026-09-23 y se sustituyó AQUÍ a mano. Si se regenera desde el Excel sin
 * corregir la celda D3_F11, volver a aplicar esta sustitución.
 */

/** Agrupaciones regionales, en el orden de la tabla del cliente. La
    etiqueta corta es la de la píldora del filtro; el nombre completo, el
    que anuncia el bloque de textos. */
export const REGIONES_CARACTERIZACION = [
  { id: 'global', etiqueta: 'Global', nombre: 'Global' },
  { id: 'colombia', etiqueta: 'Colombia', nombre: 'Colombia' },
  { id: 'antioquia', etiqueta: 'Antioquia', nombre: 'Antioquia' },
  { id: 'subregiones', etiqueta: 'Subregiones', nombre: '9 subregiones de Antioquia' },
];

/** Los tres escenarios prospectivos, en orden de lectura. Solo el pasado
    lleva el subtítulo del encabezado del anexo ("Pasado - Retrospectiva
    del factor"); los otros dos encabezados van a secas. */
export const ESCENARIOS_CARACTERIZACION = [
  { id: 'pasado', etiqueta: 'Pasado', descripcion: 'Retrospectiva del factor' },
  { id: 'presente', etiqueta: 'Presente', descripcion: '' },
  { id: 'futuro', etiqueta: 'Futuro', descripcion: '' },
];

/** Caracterización por id de factor ('f1' … 'f22'). */
export const CARACTERIZACION_FACTORES = {
  f1: {
    "tipificacion": {
      "tipo": "Tendencia",
      "justificacion": "Se clasifica principalmente como una tendencia, porque evidencia una transformación progresiva desde modelos homogéneos de cobertura hacia enfoques personalizados, diferenciales, preventivos, inclusivos y orientados al fortalecimiento de capacidades humanas. Sin embargo, también contiene hechos portadores de futuro, especialmente en la personalización inteligente del bienestar, la medición de trayectorias de vida, la salud mental preventiva, la singularidad humana, el agenciamiento y los ecosistemas humano-céntricos apoyados en datos."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "A nivel global, el desarrollo humano centrado en la persona surgió como una crítica a los modelos que medían el progreso únicamente por crecimiento económico, cobertura institucional o provisión masiva de servicios. Desde finales del siglo XX, el enfoque de capacidades propuso comprender el bienestar a partir de las libertades reales de las personas para vivir la vida que valoran. Esta mirada permitió desplazar el énfasis desde el ingreso hacia dimensiones como educación, salud, autonomía, participación, dignidad e inclusión. El PNUD consolidó este giro mediante el Índice de Desarrollo Humano, mientras que la CEPAL ha insistido en la necesidad de sistemas de protección social más integrales y resilientes frente a desigualdades persistentes (PNUD, 2025; CEPAL, 2024). Así, la persona dejó de ser receptora pasiva de servicios y comenzó a entenderse como sujeto activo de desarrollo, decisión y transformación."
        ],
        "presente": [
          "Actualmente, el desarrollo humano centrado en la persona se entiende como un enfoque integral que articula capacidades, autonomía, salud física y mental, inclusión, participación y protección frente a riesgos sociales. En el escenario global, el PNUD plantea que América Latina y el Caribe enfrenta incertidumbre creciente, crisis superpuestas y presiones interconectadas, razón por la cual propone situar la resiliencia en el centro del desarrollo humano (PNUD, 2025). Esto implica que las políticas y organizaciones sociales deben abandonar respuestas uniformes y avanzar hacia modelos contextualizados, preventivos y humanizados. De igual forma, la CEPAL ha insistido en fortalecer sistemas de protección social integrales, sostenibles y sensibles a desigualdades estructurales (CEPAL, 2024). En consecuencia, la centralidad de la persona se expresa hoy en servicios más cercanos, pertinentes y orientados a ampliar libertades reales, no solo a entregar beneficios."
        ],
        "futuro": [
          "Hacia el futuro, el desarrollo humano centrado en la persona tenderá a consolidarse como una dimensión estratégica para evaluar la pertinencia de las organizaciones de bienestar. En el plano global, la personalización de servicios, el enfoque preventivo, la salud mental, el envejecimiento activo, la inclusión adaptativa y el uso ético de datos serán componentes centrales. El PNUD plantea que la resiliencia debe incorporarse como eje del desarrollo humano en América Latina, considerando crisis superpuestas y trayectorias diferenciadas de vulnerabilidad (PNUD, 2025). En esa línea, las organizaciones sociales deberán anticipar riesgos antes de que se conviertan en exclusión, deterioro de capacidades o pérdida de bienestar. Por consiguiente, el futuro del factor no estará en ofrecer más servicios iguales, sino en construir ecosistemas que acompañen decisiones, transiciones y proyectos de vida."
        ]
      },
      "colombia": {
        "pasado": [
          "En Colombia, la retrospectiva del factor se relaciona con la transición desde políticas sociales centradas en cobertura hacia enfoques de derechos, capacidades y superación de privaciones múltiples. El sistema de compensación familiar, regulado por la Ley 21 de 1982, nació orientado a aliviar cargas económicas de los trabajadores y sus familias mediante subsidios y servicios sociales. Con el tiempo, las cajas ampliaron su acción hacia educación, vivienda, recreación, cultura, empleo, salud, cuidado y protección al cesante, lo que fortaleció su papel en el bienestar integral. La medición de pobreza multidimensional, diseñada por el DNP y reportada por el DANE, permitió comprender que el desarrollo humano no depende solo del ingreso, sino también de educación, salud, trabajo, niñez, vivienda y servicios públicos (DANE, 2025). Esta evolución hizo visible la necesidad de intervenciones más diferenciales y personalizadas."
        ],
        "presente": [
          "En Colombia, el estado actual del factor muestra avances y tensiones. El DANE informó que en 2025 la incidencia de pobreza multidimensional fue de 9,9 %, inferior al 11,5 % registrado en 2024, lo que indica una mejora en condiciones asociadas a educación, niñez, salud, trabajo, vivienda y servicios públicos (DANE, 2026). Sin embargo, persisten brechas territoriales, rurales, laborales y de acceso efectivo a servicios. Para las cajas de compensación, este escenario implica evolucionar desde la prestación masiva hacia portafolios segmentados según etapa de vida, composición familiar, ingresos, vulnerabilidades, capacidades y proyectos personales. La Superintendencia del Subsidio Familiar dispone estadísticas sobre población afiliada, empresas, trabajadores, beneficiarios y servicios, insumos relevantes para orientar intervenciones más centradas en las personas y sus trayectorias (Superintendencia del Subsidio Familiar, 2025)."
        ],
        "futuro": [
          "En Colombia, las proyecciones estarán condicionadas por pobreza, desigualdad, informalidad, envejecimiento, salud mental, transformación laboral y diversidad familiar. Aunque la pobreza multidimensional descendió a 9,9 % en 2025, el reto será sostener reducciones y cerrar brechas territoriales y poblacionales (DANE, 2026). Para las cajas de compensación, esto abre una agenda prospectiva: segmentar usuarios por trayectorias de vida, medir capacidades humanas, fortalecer rutas de bienestar integral, integrar servicios de cuidado, formación, empleabilidad, vivienda, recreación y acompañamiento psicosocial. Además, los datos del Sistema de Subsidio Familiar permiten observar afiliados, beneficiarios y empresas desde 2019, lo cual puede alimentar modelos predictivos de necesidades sociales (Superintendencia del Subsidio Familiar, 2024). Así, el desarrollo humano centrado en la persona se proyecta como una plataforma de inteligencia social y no solo como un catálogo de servicios."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, el desarrollo humano centrado en la persona se configuró históricamente en medio de contrastes territoriales, económicos y sociales. Mientras el Valle de Aburrá concentró servicios, empleo formal, infraestructura educativa y mayor institucionalidad, otras subregiones enfrentaron barreras de acceso, ruralidad, pobreza, informalidad y dispersión poblacional. En este contexto, las intervenciones sociales evolucionaron desde esquemas generalizados hacia estrategias más sensibles a la diversidad territorial y poblacional. La Encuesta de Calidad de Vida de Antioquia ha sido un instrumento clave para observar condiciones de los hogares, brechas sociales y necesidades diferenciadas en los 125 municipios del departamento. Para 2025, la encuesta se diseñó con cobertura en las nueve subregiones y una muestra de 70.779 hogares, lo que evidencia la importancia de producir información territorial para orientar decisiones sociales (Gobernación de Antioquia, 2025)."
        ],
        "presente": [
          "En Antioquia, el presente del factor está marcado por la necesidad de conectar bienestar, equidad territorial y lectura integral de los hogares. La Encuesta de Calidad de Vida 2025 se aplicará en todos los barrios, comunas, corregimientos y veredas de los 125 municipios, con muestra en las nueve subregiones, lo que permite fortalecer la planeación social y territorial (Gobernación de Antioquia, 2025). Esta información resulta clave para identificar privaciones, capacidades y condiciones diferenciales de vida. Para Comfenalco Antioquia, el enfoque centrado en la persona supone usar estos datos para diseñar servicios que no respondan únicamente a categorías administrativas, sino a necesidades reales: salud mental, educación, empleabilidad, cuidado, recreación, envejecimiento, bienestar familiar, inclusión y autonomía económica. Por tanto, el presente exige pasar de medir usuarios atendidos a comprender transformaciones en sus trayectorias de vida."
        ],
        "futuro": [
          "En Antioquia, la tendencia será avanzar hacia modelos de bienestar territorialmente personalizados. Esto significa que las decisiones institucionales deberán apoyarse en información por municipio, subregión, hogar y grupo poblacional. La Encuesta de Calidad de Vida de Antioquia, al cubrir las nueve subregiones, ofrece una base robusta para identificar brechas y diseñar intervenciones diferenciadas (Gobernación de Antioquia, 2025). En prospectiva, Comfenalco Antioquia podría estructurar rutas de bienestar por ciclo vital: infancia, juventud, adultez, vejez, familias cuidadoras, trabajadores formales, independientes, cesantes y comunidades rurales. Igualmente, podría integrar analítica de datos, escucha social y alianzas locales para reconocer singularidades humanas y territoriales. En este horizonte, el valor institucional no dependerá solo de cobertura, sino de la capacidad de acompañar transformaciones reales en autonomía, capacidades, salud mental, inclusión y movilidad social."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las nueve subregiones de Antioquia, la retrospectiva muestra que el desarrollo humano no ha seguido una trayectoria uniforme. Valle de Aburrá consolidó mayores oportunidades educativas, laborales y de acceso a servicios; Oriente avanzó por crecimiento empresarial, conectividad y urbanización; Suroeste fortaleció dinámicas asociadas a ruralidad productiva y turismo; Urabá combinó potencial económico con profundas brechas sociales; Bajo Cauca, Nordeste y Magdalena Medio enfrentaron mayores vulnerabilidades por conflictividad, informalidad y pobreza; mientras Norte y Occidente requirieron respuestas más próximas por dispersión, envejecimiento y menor densidad institucional. TerriData permite reconstruir estas diferencias mediante indicadores municipales y departamentales comparables (DNP, 2026). Por ello, la historia del factor en Antioquia evidencia que centrar el bienestar en la persona exige reconocer trayectorias de vida, territorios, capacidades y vulnerabilidades específicas."
        ],
        "presente": [
          "En las nueve subregiones, la situación actual demanda respuestas diferenciadas. Valle de Aburrá requiere servicios personalizados, digitales y preventivos para poblaciones urbanas diversas; Oriente necesita modelos asociados a bienestar familiar, movilidad, vivienda y empleo; Urabá exige atención a movilidad social, juventud, empleabilidad y cohesión comunitaria; Bajo Cauca, Nordeste y Magdalena Medio requieren enfoques integrales por vulnerabilidad, conflictividad e informalidad; mientras Norte, Occidente y Suroeste necesitan soluciones de cercanía, cuidado, envejecimiento, ruralidad y acceso a oportunidades. Informes territoriales recientes han alertado sobre pobreza, inseguridad alimentaria y brechas sociales en las subregiones, lo que confirma la necesidad de intervenciones humanizadas y territorialmente sensibles (Antioquia Cómo Vamos, 2026). Así, el desarrollo centrado en la persona implica reconocer que no existe un único sujeto de bienestar, sino múltiples trayectorias humanas atravesadas por territorio, edad, género, ingresos y capacidades."
        ],
        "futuro": [
          "En las nueve subregiones, las proyecciones exigen modelos flexibles y sensibles al contexto. Valle de Aburrá demandará bienestar personalizado, salud mental, conciliación vida-trabajo y servicios digitales; Oriente requerirá acompañamiento por expansión urbana, empleo y bienestar familiar; Urabá necesitará rutas de juventud, empleabilidad, educación y cohesión social; Bajo Cauca, Nordeste y Magdalena Medio deberán priorizar resiliencia comunitaria, inclusión productiva y reparación de capacidades; mientras Norte, Occidente y Suroeste requerirán atención al envejecimiento, ruralidad, seguridad alimentaria, cuidado y acceso a servicios. TerriData y Antioquia Datos permiten construir tableros de necesidades diferenciadas por municipio y subregión (DNP, 2026; Gobernación de Antioquia, 2025). En consecuencia, el desarrollo humano centrado en la persona se proyecta como un modelo de bienestar colectivamente personalizado, donde la tecnología sirve para comprender mejor a las personas y no para homogeneizarlas."
        ]
      }
    },
    "sintesis": [
      "El desarrollo humano centrado en la persona será decisivo para que las cajas de compensación transiten de modelos masivos de atención hacia ecosistemas de bienestar personalizados, preventivos e inclusivos. Su consolidación exige reconocer capacidades, trayectorias de vida, salud mental, autonomía, diversidad y condiciones territoriales. En Colombia, los avances en pobreza multidimensional muestran progreso, pero las brechas sociales obligan a profundizar enfoques diferenciales. En Antioquia, la información subregional permitirá diseñar respuestas más humanas y pertinentes. Así, el futuro del factor dependerá de convertir datos, servicios y alianzas en rutas reales de transformación personal y familiar (DANE, 2026; PNUD, 2025; Gobernación de Antioquia, 2025)."
    ],
    "fuentes": [
      {
        "nombre": "DANE – Pobreza multidimensional y pobreza monetaria",
        "descripcion": [
          "Series sobre pobreza, privaciones, ingresos, desigualdad, condiciones de vida y dimensiones del bienestar.",
          "DANE – Pobreza multidimensional. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/pobreza-multidimensional?utm_source"
        ]
      },
      {
        "nombre": "DANE – Encuesta Nacional de Calidad de Vida",
        "descripcion": [
          "Información sobre hogares, salud, educación, vivienda, servicios públicos, cuidado, condiciones de vida y bienestar subjetivo.",
          "DANE – Calidad de vida. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/salud/calidad-de-vida-ecv"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar",
        "descripcion": [
          "Estadísticas de afiliados, beneficiarios, empresas, servicios sociales, subsidios y presencia regional de las cajas de compensación.",
          "Estadísticas del Sistema de Subsidio Familiar. Disponible en: https://www.ssf.gov.co/informaci%C3%B3n-de-las-cajas-de-compensaci%C3%B3n-familiar2?utm_source"
        ]
      },
      {
        "nombre": "DNP – TerriData",
        "descripcion": [
          "Indicadores municipales y departamentales sobre población, pobreza, educación, salud, vivienda, economía y desarrollo territorial.",
          "TerriData. Disponible en: https://terridata.dnp.gov.co/?utm_source"
        ]
      },
      {
        "nombre": "Gobernación de Antioquia – Antioquia Datos / Encuesta de Calidad de Vida",
        "descripcion": [
          "Indicadores departamentales, subregionales y municipales sobre calidad de vida, economía, población, hogares y condiciones sociales.",
          "Antioquia Datos. Disponible en: https://www.antioquia.gov.co/index.php/informacion/estadisticas-e-indicadores?utm_source"
        ]
      }
    ]
  },
  f2: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica como una tendencia estructural, porque representa una transformación observable, acumulativa y sostenida del mercado laboral, impulsada por la automatización, la inteligencia artificial, la digitalización, la transición productiva y los cambios en las habilidades requeridas. No obstante, dentro de esta tendencia existen hechos portadores de futuro, como las microcredenciales, la IA generativa aplicada al trabajo, los mercados laborales algorítmicos y los modelos de protección social desvinculados del empleo formal, que aún son señales emergentes y podrían configurar futuros alternativos."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "La evolución de los empleos del futuro tiene sus raíces en las transformaciones económicas y tecnológicas que acompañaron el paso de la sociedad industrial a la sociedad del conocimiento. Durante gran parte del siglo XX, el empleo estuvo asociado a relaciones laborales relativamente estables, estructuras organizacionales jerárquicas y ocupaciones basadas en tareas repetitivas dentro de sectores manufactureros y de servicios tradicionales. Sin embargo, la globalización, la expansión de las tecnologías de la información y las comunicaciones, así como la creciente automatización de procesos productivos, comenzaron a modificar la naturaleza del trabajo. La transición hacia economías intensivas en conocimiento impulsó una demanda creciente de competencias cognitivas, digitales y relacionales, mientras disminuía la importancia de tareas rutinarias fácilmente automatizables. La Organización Internacional del Trabajo (OIT) y la OCDE documentaron cómo estas transformaciones alteraron la estructura ocupacional en múltiples países, evidenciando que la empleabilidad futura dependería cada vez más de la capacidad de aprendizaje continuo, adaptación tecnológica y reconversión laboral (OIT, 2019; OCDE, 2019)."
        ],
        "presente": [
          "Actualmente, los empleos del futuro constituyen una realidad en construcción impulsada por la convergencia entre inteligencia artificial, automatización, digitalización, transición energética y cambios demográficos. Las organizaciones enfrentan una transformación acelerada de ocupaciones, competencias y modelos de trabajo, mientras millones de trabajadores deben actualizar sus habilidades para mantenerse competitivos. El World Economic Forum identifica que las tecnologías digitales, la inteligencia artificial, la analítica de datos, la ciberseguridad y las energías limpias están generando nuevas oportunidades laborales, al tiempo que reducen la demanda de algunas ocupaciones tradicionales (World Economic Forum, 2025). Paralelamente, la OCDE advierte que los mercados laborales están experimentando una creciente polarización entre empleos altamente calificados y ocupaciones de baja complejidad, lo que incrementa la necesidad de formación permanente (OCDE, 2024). En este contexto, el empleo ya no se entiende únicamente como una fuente de ingresos, sino como un proceso continuo de adaptación, aprendizaje y desarrollo de capacidades humanas."
        ],
        "futuro": [
          "Durante las próximas décadas, los empleos del futuro estarán profundamente influenciados por la inteligencia artificial avanzada, la automatización cognitiva, la transición ecológica, la economía del cuidado y la expansión de nuevas industrias basadas en conocimiento. Diversos estudios prospectivos indican que una parte significativa de las tareas actuales será transformada por tecnologías capaces de complementar o sustituir actividades humanas rutinarias, mientras aumentará la demanda de habilidades relacionadas con creatividad, pensamiento crítico, liderazgo, resolución de problemas complejos y aprendizaje permanente (World Economic Forum, 2025). Asimismo, la transición hacia economías sostenibles impulsará empleos vinculados a energías renovables, adaptación climática, economía circular y gestión ambiental. La OIT proyecta que los sistemas laborales deberán evolucionar hacia modelos más flexibles y centrados en competencias, donde la formación continua será un componente esencial de la empleabilidad (OIT, 2023). En consecuencia, el futuro del trabajo dependerá menos de ocupaciones específicas y más de la capacidad humana para adaptarse, innovar y colaborar en entornos altamente dinámicos."
        ]
      },
      "colombia": {
        "pasado": [
          "Históricamente, el mercado laboral colombiano se estructuró alrededor de una alta dependencia del empleo formal asalariado como puerta de entrada a la seguridad social, los ingresos estables y los beneficios del sistema de compensación familiar. Sin embargo, esta estructura convivió con altos niveles de informalidad, brechas educativas, desigualdades territoriales y baja productividad. Durante las últimas décadas, la apertura económica, la terciarización, la expansión de servicios, la digitalización inicial y los cambios demográficos comenzaron a modificar las ocupaciones tradicionales. La formación para el trabajo, liderada por instituciones como el SENA, buscó responder a las necesidades productivas, aunque con rezagos frente a la velocidad tecnológica. En retrospectiva, el país ha transitado de un modelo centrado en ocupaciones rutinarias y credenciales formales hacia una preocupación creciente por competencias, reconversión, habilidades digitales y trabajo decente. El DANE dispone de series de mercado laboral, informalidad y seguridad social útiles para observar esta evolución."
        ],
        "presente": [
          "Actualmente, Colombia enfrenta una doble dinámica: mejora gradual de algunos indicadores de empleo y persistencia de desafíos estructurales en informalidad, brechas de habilidades, productividad y protección social. Según el DANE, para abril de 2026 la tasa de desocupación nacional fue de 8,8 %, con una tasa global de participación de 64,7 % y una tasa de ocupación de 59,1 %. Sin embargo, la informalidad sigue siendo un obstáculo central para conectar empleo, bienestar y compensación familiar; el DANE reporta indicadores periódicos de informalidad y seguridad social, y el Banco de la República ha señalado que una proporción cercana a la mitad de los ocupados trabaja sin aportes plenos a seguridad social. En este contexto, los empleos del futuro exigen fortalecer formación continua, certificación de competencias, alfabetización digital, reconversión sectorial y mecanismos de protección para trabajadores en trayectorias laborales más flexibles."
        ],
        "futuro": [
          "Hacia el futuro, Colombia enfrentará una transformación acelerada del trabajo por inteligencia artificial, automatización, transición energética, digitalización productiva, economía del cuidado, envejecimiento poblacional y nuevas formas de contratación. El World Economic Forum señala que el período 2025–2030 estará marcado por cambios profundos en empleos, habilidades y estrategias de transformación laboral, con alta demanda de pensamiento analítico, aprendizaje permanente, resiliencia, liderazgo, creatividad y competencias tecnológicas. Para Colombia, la tendencia central será pasar de políticas reactivas de empleo a sistemas anticipatorios de talento. Esto implica usar datos de vacantes, ocupaciones, formación, informalidad y productividad para identificar sectores emergentes y ocupaciones en declive. Desde la compensación familiar, la oportunidad está en integrar subsidios, formación, intermediación, bienestar, cuidado y empleabilidad para acompañar trayectorias laborales más móviles, discontinuas y tecnológicamente mediadas."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, la evolución del factor ha estado marcada por una base productiva industrial, comercial, agropecuaria y de servicios que configuró históricamente la demanda laboral del departamento. Medellín y el Valle de Aburrá concentraron buena parte del empleo formal, la educación superior, la innovación empresarial y los servicios especializados, mientras otras subregiones mantuvieron estructuras laborales más asociadas al agro, la minería, el turismo, la logística o economías locales de baja formalización. En los últimos años, la transformación productiva del departamento se ha relacionado con industrias 4.0, servicios empresariales, economía creativa, salud, turismo, agroindustria y tecnologías digitales. No obstante, la transición hacia empleos del futuro ha sido desigual, porque las capacidades educativas, tecnológicas e institucionales no se distribuyen homogéneamente. El Anuario Estadístico de Antioquia y las mediciones laborales departamentales permiten reconstruir estas brechas históricas entre empleo, educación, formalidad y territorio."
        ],
        "presente": [
          "En el presente, Antioquia se ubica como uno de los departamentos con mayor dinamismo económico y laboral del país, pero también con fuertes contrastes internos. El DANE publica indicadores departamentales de mercado laboral con desagregaciones por sexo, rama de actividad y dominio urbano-rural, lo que permite observar la evolución de ocupación, desempleo y participación en Antioquia. La Mesa de Empleo de Antioquia reportó que, en el tercer trimestre de 2025, el departamento superó los 3,3 millones de ocupados y aportó una proporción significativa de los nuevos empleos nacionales, impulsado por comercio, manufactura y agricultura. No obstante, la agenda de empleos del futuro demanda cerrar brechas en talento digital, educación técnica y tecnológica, productividad empresarial y acceso territorial a oportunidades. Para las cajas de compensación, esto implica ampliar servicios de formación, intermediación laboral, bienestar laboral, orientación vocacional y reconversión ocupacional con enfoque poblacional y territorial."
        ],
        "futuro": [
          "En Antioquia, las tendencias apuntan hacia una mayor demanda de talento en industrias 4.0, servicios empresariales, salud, cuidado, logística, turismo inteligente, agroindustria sostenible, energías limpias, economía creativa y transformación digital de mipymes. La adopción de inteligencia artificial no eliminará homogéneamente el empleo, pero sí transformará tareas, perfiles y competencias. La OCDE advierte que la inteligencia artificial puede elevar productividad y calidad del trabajo, aunque exige acción urgente para gestionar riesgos laborales y brechas de capacidades. En Antioquia, esto obliga a conectar política educativa, formación técnica, innovación empresarial y servicios de empleo. Para Comfenalco Antioquia, la tendencia implica pasar de programas de capacitación aislados a rutas integrales de empleabilidad sostenible, con diagnóstico de habilidades, formación modular, certificación, orientación laboral, acompañamiento psicosocial, inclusión digital y medición de resultados en ingresos, formalidad y permanencia laboral."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las subregiones de Antioquia, la retrospectiva evidencia trayectorias laborales diferenciadas. El Valle de Aburrá acumuló ventajas en empleo formal, educación superior, servicios especializados e innovación. Oriente avanzó por su dinamismo empresarial, aeroportuario, agroindustrial y turístico. Urabá configuró una vocación logística, portuaria, agroexportadora y comercial. Suroeste y Occidente conservaron peso agropecuario, cafetero y turístico; Norte y Nordeste combinaron actividades agropecuarias, mineras y de servicios básicos; Bajo Cauca enfrentó mayores restricciones por informalidad, economías extractivas y vulnerabilidad social; Magdalena Medio mantuvo vínculos con logística, hidrocarburos, comercio y actividades fluviales. En retrospectiva, estas diferencias muestran que los empleos del futuro no parten de una línea base homogénea. Cada subregión posee capacidades productivas, educativas y tecnológicas distintas, por lo que la reconversión laboral requiere estrategias territoriales diferenciadas, especialmente en habilidades digitales, formación técnica, empleabilidad juvenil y articulación empresa–educación."
        ],
        "presente": [
          "En las 9 subregiones, el estado actual del factor muestra una brecha clara entre territorios con mayor densidad institucional, empresarial y educativa, y territorios con menor acceso a formación pertinente, conectividad y empleo formal. El Valle de Aburrá concentra servicios avanzados, universidades, empresas tecnológicas y mayor sofisticación laboral. Oriente gana peso por su localización estratégica, industria, agroindustria, turismo y servicios. Urabá se proyecta con logística, puertos, agroexportación y comercio. Suroeste, Occidente y Norte requieren fortalecer turismo sostenible, agroindustria, economía plateada y servicios locales. Nordeste, Bajo Cauca y Magdalena Medio enfrentan retos mayores en formalización, diversificación productiva y capacidades digitales. Informes de dinámica laboral subregional muestran que algunas subregiones mantienen altos niveles de informalidad; por ejemplo, en Norte se reportó que en 2021 el 57 % de los ocupados estaba en el segmento informal. Esta realidad exige intervenciones diferenciadas de formación y bienestar laboral."
        ],
        "futuro": [
          "En clave territorial, las proyecciones indican que los empleos del futuro tendrán expresiones distintas según vocación subregional. El Valle de Aburrá demandará perfiles digitales, analítica, automatización, salud, servicios avanzados y economía creativa. Oriente requerirá talento para agroindustria, logística, turismo, manufactura avanzada y servicios aeroportuarios. Urabá demandará capacidades en logística portuaria, comercio exterior, agroexportación, bilingüismo operativo y mantenimiento técnico. Suroeste y Occidente podrán potenciar turismo regenerativo, cafés especiales, economía rural digital y servicios de bienestar. Norte y Nordeste necesitarán reconversión agropecuaria, energías, minería responsable y emprendimientos locales. Bajo Cauca y Magdalena Medio requerirán formalización, competencias básicas, empleabilidad juvenil y diversificación productiva. Por tanto, la proyección no debe ser un modelo único, sino una arquitectura territorial de empleabilidad: formación pertinente, alianzas empresariales, plataformas de datos, orientación vocacional y cierre de brechas digitales por subregión."
        ]
      }
    },
    "sintesis": [
      "Los empleos del futuro constituyen un factor crítico para anticipar cómo cambiarán las relaciones entre trabajo, bienestar, productividad y protección social. En Colombia y Antioquia, su evolución estará condicionada por la capacidad de cerrar brechas de informalidad, educación, conectividad, habilidades digitales y pertinencia formativa. Además, exige que las cajas de compensación amplíen su rol: de administradoras de beneficios asociados al empleo formal a plataformas integrales de empleabilidad, reconversión y bienestar laboral. Así, el reto prospectivo será construir trayectorias laborales sostenibles, inclusivas y adaptativas para personas, empresas y territorios."
    ],
    "fuentes": [
      {
        "nombre": "DANE – Gran Encuesta Integrada de Hogares, GEIH",
        "descripcion": [
          "Ocupación, desocupación, participación laboral, ramas de actividad, posición ocupacional, sexo, edad, educación, informalidad, seguridad social, departamentos y principales ciudades.",
          "Página de mercado laboral del DANE. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/mercado-laboral?utm_source"
        ]
      },
      {
        "nombre": "DANE – Mercado laboral por departamentos",
        "descripcion": [
          "Indicadores anuales por departamento: tasa de ocupación, desempleo, participación, sexo, rama de actividad, cabecera y centros poblados/rural disperso.",
          "Publicación departamental DANE. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/informacion-regional/mercado-laboral-por-departamentos?utm_source"
        ]
      },
      {
        "nombre": "DANE – Empleo informal y seguridad social",
        "descripcion": [
          "Proporción de ocupados informales, informalidad por ciudades, seguridad social y series comparables.",
          "Módulo de informalidad DANE. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/mercado-laboral/empleo-informal-y-seguridad-social?utm_source"
        ]
      },
      {
        "nombre": "DANE – RELAB",
        "descripcion": [
          "Relaciones laborales dependientes e independientes, registros administrativos, economía creativa y cultural, anexos descargables en XLSX.",
          "Página de empleo y desempleo DANE. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/mercado-laboral/empleo-y-desempleo?utm_source"
        ]
      },
      {
        "nombre": "Ministerio del Trabajo – FILCO",
        "descripcion": [
          "Estadísticas laborales, empleo, desempleo, formalización, seguridad social, trabajo decente, indicadores laborales nacionales y territoriales.",
          "Fuente de Información Laboral de Colombia. Disponible en: https://www.mintrabajo.gov.co/empleo-y-pensiones/empleo/analisis-monitoreo-y-prospectiva-laboral/fuente-de-informacion-laboral-de-colombia-filco?utm_source"
        ]
      },
      {
        "nombre": "SENA – Observatorio Laboral y Ocupacional",
        "descripcion": [
          "Ocupaciones, tendencias ocupacionales, mapas ocupacionales, clasificación nacional de ocupaciones, alertas de proyectos e información para formación y empleo.",
          "Observatorio Laboral SENA. Disponible en: https://www.sena.edu.co/es-co/trabajo/Paginas/observatorioLaboral.aspx?utm_source"
        ]
      },
      {
        "nombre": "SENA – Clasificación Nacional de Ocupaciones, CON",
        "descripcion": [
          "Estructura oficial de ocupaciones, perfiles ocupacionales, actualización metodológica con mesas sectoriales y gremios.",
          "CNO del SENA. Disponible en: https://observatorio.sena.edu.co/clasificacion/cno?utm_source"
        ]
      },
      {
        "nombre": "Gobernación de Antioquia – Anuario Estadístico de Antioquia",
        "descripcion": [
          "Información estadística departamental y municipal sobre mercado laboral, educación, economía, población y condiciones territoriales.",
          "Anuario Estadístico de Antioquia. Disponible en: https://www.antioquiadatos.gov.co/estadisticasAntioquia/anuarioEstadisticoAntioquia?utm_source"
        ]
      },
      {
        "nombre": "Banco de la República",
        "descripcion": [
          "Investigaciones, series y análisis sobre informalidad, empleo, mercado laboral, productividad y economía regional.",
          "Portal de informalidad laboral BanRep. Disponible en: https://www.banrep.gov.co/es/taxonomy/term/9257?utm_source"
        ]
      },
      {
        "nombre": "CEPAL",
        "descripcion": [
          "Estudios sobre futuro del trabajo, automatización, brechas de habilidades, inclusión laboral y productividad en América Latina.",
          "Publicaciones CEPAL sobre futuro del trabajo. Disponible en: https://www.cepal.org/es/publicaciones/47651-futuro-trabajo-desajustes-habilidades-america-latina?utm_source"
        ]
      },
      {
        "nombre": "OCDE",
        "descripcion": [
          "Estudios sobre transformación digital, habilidades, empleo, inteligencia artificial, productividad y futuro del trabajo.",
          "OCDE Going Digital Colombia y Future of Work. Disponible en: https://www.oecd.org/en/publications/2019/10/oecd-reviews-of-digital-transformation-going-digital-in-colombia_e33811ae/full-report/component-4.html?utm_source"
        ]
      },
      {
        "nombre": "World Economic Forum",
        "descripcion": [
          "Tendencias globales de empleos, habilidades emergentes, automatización, IA y transformación laboral 2025–2030.",
          "Future of Jobs Report 2025. Disponible en: https://www.weforum.org/publications/the-future-of-jobs-report-2025/?utm_source"
        ]
      }
    ]
  },
  f3: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica como tendencia estructural dado que evidencia una transformación sostenida de los sistemas de bienestar desde modelos asistenciales y de provisión básica hacia enfoques centrados en la garantía de derechos, la equidad, la inclusión y el fortalecimiento de capacidades humanas. Esta evolución ha sido impulsada por desarrollos normativos internacionales, transformaciones sociales y nuevas concepciones del desarrollo humano que reconocen a las personas como sujetos de derechos y no únicamente como beneficiarios de servicios. De manera complementaria, el factor incorpora diversos hechos portadores de futuro, particularmente relacionados con la personalización de servicios sociales, la medición de justicia social mediante analítica avanzada, los sistemas de protección adaptativa, las políticas diferenciales basadas en inteligencia territorial y los modelos integrales de cuidado. Aunque estas señales aún presentan niveles variables de consolidación, podrían configurar nuevas formas de garantizar derechos y fortalecer capacidades humanas en contextos de creciente complejidad social, tecnológica y demográfica."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "La evolución del enfoque de derechos encuentra sus antecedentes en la consolidación de los derechos humanos como fundamento de los sistemas modernos de bienestar. Después de la promulgación de la Declaración Universal de los Derechos Humanos en 1948, numerosos países comenzaron a fortalecer mecanismos institucionales orientados a garantizar derechos económicos, sociales y culturales (Naciones Unidas, 1948). Posteriormente, autores como Sen (1999) y Nussbaum (2012) ampliaron esta visión al incorporar el enfoque de capacidades, destacando que el desarrollo debía centrarse en las oportunidades reales de las personas para vivir vidas dignas y plenas. En América Latina, esta perspectiva adquirió relevancia mediante reformas sociales orientadas a reducir desigualdades y ampliar la ciudadanía social"
        ],
        "presente": [
          "En la actualidad, el enfoque de derechos constituye uno de los principales referentes conceptuales para el diseño de políticas públicas y sistemas de bienestar a nivel internacional. Organismos multilaterales promueven estrategias orientadas a garantizar inclusión, equidad, acceso universal a oportunidades y fortalecimiento de capacidades humanas como elementos centrales para alcanzar los Objetivos de Desarrollo Sostenible (ONU, 2024). Simultáneamente, los desafíos asociados a migraciones, envejecimiento poblacional, transformación digital y desigualdades persistentes han reforzado la necesidad de adoptar enfoques centrados en derechos."
        ],
        "futuro": [
          "Las tendencias internacionales indican que los sistemas de bienestar evolucionarán hacia modelos más personalizados, preventivos y centrados en capacidades humanas. El envejecimiento poblacional, las transformaciones laborales derivadas de la automatización y los efectos del cambio climático impulsarán nuevas demandas de protección social adaptativa y garantía de derechos en contextos cambiantes (UNDP, 2020). Asimismo, la utilización de tecnologías digitales permitirá mejorar la focalización de intervenciones y fortalecer el acceso diferencial a servicios."
        ]
      },
      "colombia": {
        "pasado": [
          "En Colombia, la Constitución Política de 1991 marcó un punto de inflexión al reconocer un amplio conjunto de derechos fundamentales y fortalecer mecanismos de participación, inclusión y protección social, configurando nuevas bases para el desarrollo humano integral"
        ],
        "presente": [
          "las políticas de inclusión social, equidad de género, protección de grupos vulnerables y reducción de brechas territoriales evidencian la consolidación progresiva de esta perspectiva (DNP, 2024). Asimismo, el enfoque de derechos se ha convertido en un criterio transversal para orientar programas sociales, estrategias de bienestar y mecanismos de participación ciudadana."
        ],
        "futuro": [
          "Estas dinámicas favorecerán la consolidación de políticas públicas orientadas a la inclusión social, la reducción de desigualdades y el fortalecimiento de capacidades individuales y colectivas"
        ]
      },
      "antioquia": {
        "pasado": [
          "la incorporación progresiva del enfoque de derechos estuvo asociada a procesos de fortalecimiento institucional, descentralización y ampliación de políticas sociales dirigidas a poblaciones históricamente vulnerables. Durante las últimas décadas, programas relacionados con educación, salud, protección de la infancia, equidad de género y atención a víctimas contribuyeron a consolidar una visión más inclusiva del bienestar (Gobernación de Antioquia, 2023). Asimismo, la presencia de organizaciones comunitarias, universidades y entidades de cooperación fortaleció la promoción de derechos en ámbitos urbanos y rurales. Paralelamente, las cajas de compensación familiar ampliaron gradualmente sus estrategias de intervención para incorporar enfoques diferenciales orientados a niños, mujeres, adultos mayores, personas con discapacidad y poblaciones vulnerables. Este proceso permitió avanzar desde esquemas centrados en cobertura hacia modelos más integrales de desarrollo humano y fortalecimiento de capacidades individuales y colectivas."
        ],
        "presente": [
          "Actualmente, Antioquia avanza en la consolidación de políticas y programas orientados por principios de inclusión, equidad y garantía de derechos. Diversas iniciativas departamentales buscan reducir brechas sociales y fortalecer oportunidades para poblaciones históricamente excluidas, incorporando enfoques diferenciales según edad, género, condición socioeconómica, discapacidad o pertenencia étnica (Gobernación de Antioquia, 2024). Paralelamente, las cajas de compensación familiar han fortalecido programas de salud mental, cuidado, educación, empleabilidad y protección social, ampliando la comprensión del bienestar desde una perspectiva centrada en capacidades humanas. No obstante, persisten desafíos relacionados con desigualdades territoriales, acceso diferencial a servicios y sostenibilidad financiera de algunos programas sociales. En consecuencia, la garantía efectiva de derechos continúa siendo una prioridad estratégica para el desarrollo regional."
        ],
        "futuro": [
          "las proyecciones sugieren una creciente integración entre bienestar, inclusión y garantía de derechos como ejes centrales del desarrollo territorial. La transición demográfica, los cambios en la estructura familiar y las nuevas demandas sociales exigirán respuestas institucionales más flexibles y diferenciadas (Gobernación de Antioquia, 2024). Asimismo, se espera una expansión de programas relacionados con cuidado, salud mental, inclusión digital y envejecimiento activo. Las cajas de compensación familiar podrían desempeñar un papel cada vez más relevante como plataformas de acceso a oportunidades, fortalecimiento de capacidades y construcción de equidad territorial."
        ]
      },
      "subregiones": {
        "pasado": [
          "La trayectoria del enfoque de derechos en las nueve subregiones de Antioquia ha estado marcada por profundas diferencias territoriales. Mientras algunos municipios lograron fortalecer capacidades institucionales para garantizar acceso a servicios y oportunidades, otros enfrentaron mayores dificultades derivadas de pobreza, conflicto armado, aislamiento geográfico y desigualdad estructural (PNUD, 2022). No obstante, la implementación de programas de inclusión social, atención diferencial y desarrollo territorial permitió ampliar progresivamente el reconocimiento de derechos en diversos contextos. Igualmente, las cajas de compensación familiar desempeñaron un papel importante mediante la expansión de servicios educativos, recreativos, culturales y de protección social hacia territorios históricamente rezagados. Como resultado, se consolidó una comprensión más amplia del bienestar, vinculada no solo al acceso a servicios sino también a la generación de capacidades que permiten a las personas ejercer plenamente sus derechos y participar activamente en la vida social y económica."
        ],
        "presente": [
          "Presentan actualmente niveles diferenciados en materia de garantía de derechos y acceso a oportunidades. Mientras algunos territorios cuentan con mayores capacidades institucionales y cobertura de servicios, otros continúan enfrentando restricciones asociadas a pobreza multidimensional, dispersión geográfica y limitaciones de infraestructura social (PNUD, 2023). A pesar de ello, se observan avances importantes en programas de inclusión educativa, protección social, fortalecimiento comunitario y atención diferencial. Asimismo, la territorialización de políticas públicas ha permitido adaptar intervenciones a las particularidades de cada subregión. En este contexto, el enfoque de derechos se consolida como un marco orientador para promover desarrollo humano integral, cohesión social y reducción de desigualdades territoriales."
        ],
        "futuro": [
          "Las tendencias apuntan hacia la consolidación de sistemas territoriales de bienestar capaces de responder a necesidades específicas de cada población. La combinación de información georreferenciada, analítica social y participación comunitaria permitirá diseñar intervenciones más pertinentes y efectivas (PNUD, 2023). De igual forma, aumentará la importancia de medir variables relacionadas con justicia social, inclusión adaptativa y fortalecimiento de capacidades humanas. En consecuencia, el enfoque de derechos evolucionará desde una perspectiva normativa hacia una dimensión estratégica que permitirá evaluar el impacto real de las políticas sobre la calidad de vida, la equidad y el desarrollo humano integral."
        ]
      }
    },
    "sintesis": [
      "El enfoque de derechos se proyecta como un componente fundamental de los sistemas de bienestar del futuro debido a su capacidad para articular inclusión, equidad y desarrollo humano en contextos de transformación social. Además, las tendencias demográficas, tecnológicas y territoriales incrementarán la necesidad de construir mecanismos adaptativos que garanticen acceso diferencial a oportunidades y protección social. De manera complementaria, la medición de capacidades humanas, justicia social y bienestar integral permitirá orientar decisiones más efectivas y sostenibles. En consecuencia, las organizaciones que logren integrar derechos, evidencia e innovación estarán mejor preparadas para fortalecer cohesión social, reducir desigualdades y promover desarrollo humano sostenible."
    ],
    "fuentes": [
      {
        "nombre": "Departamento Administrativo Nacional de Estadística (DANE)",
        "descripcion": [
          "Estadísticas sobre pobreza monetaria y multidimensional, condiciones de vida, educación, salud, empleo, discapacidad, niñez, envejecimiento, acceso a servicios y brechas territoriales.",
          "DANE. Disponible en: https://www.dane.gov.co/"
        ]
      },
      {
        "nombre": "Departamento Nacional de Planeación (DNP)",
        "descripcion": [
          "Indicadores de inclusión social, Sistema Nacional de Evaluación de Gestión y Resultados (SINERGIA), seguimiento a políticas sociales, equidad territorial y desarrollo humano.",
          "DNP. Disponible en: https://www.dnp.gov.co/"
        ]
      },
      {
        "nombre": "Ministerio del Trabajo de Colombia",
        "descripcion": [
          "Datos sobre empleo formal, protección social, subsidio familiar, inclusión laboral, condiciones de trabajo y acceso a programas de bienestar laboral.",
          "DANE. Disponble en: https://www.mintrabajo.gov.co/"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar (Supersubsidio)",
        "descripcion": [
          "Cobertura de programas sociales, servicios prestados por las cajas de compensación familiar, beneficiarios por grupos poblacionales, programas de inclusión, cuidado, educación y protección social.",
          "Supersubsidio. Disponible en: https://www.ssf.gov.co/"
        ]
      },
      {
        "nombre": "Programa de las Naciones Unidas para el Desarrollo (PNUD)",
        "descripcion": [
          "Informes de desarrollo humano, desigualdad, inclusión social, capacidades humanas, cohesión social y desarrollo territorial.",
          "PNUD. Disponible en: https://www.undp.org/"
        ]
      }
    ]
  },
  f4: {
    "tipificacion": {
      "tipo": "Tendencia",
      "justificacion": "Se clasifica principalmente como una tendencia, porque expresa una transformación progresiva desde una visión clínica, reactiva e individual de la salud mental hacia enfoques preventivos, comunitarios, relacionales y de cuidado integral. Sin embargo, también contiene hechos portadores de futuro, como la soledad no deseada, la hiperconectividad, el estrés digital, el nomadismo laboral, la fragmentación social y la medición de resiliencia emocional, señales que podrían reconfigurar los modelos de bienestar de las cajas de compensación."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "A nivel global, el bienestar socioemocional fue abordado durante décadas desde una lógica predominantemente clínica, centrada en trastornos, diagnóstico y tratamiento especializado. No obstante, este enfoque resultó insuficiente para responder a problemas asociados con vínculos sociales, estrés, aislamiento, violencia, desigualdad y crisis de sentido. La Organización Mundial de la Salud ha señalado que las necesidades mundiales en salud mental son amplias, pero las respuestas continúan siendo insuficientes e inadecuadas, por lo que resulta necesario transformar los sistemas hacia promoción, prevención y atención comunitaria (OMS, 2022). Esta evolución permitió comprender que la salud mental no es solo ausencia de enfermedad, sino una condición esencial para el desarrollo personal, comunitario y social. De este modo, el bienestar emocional empezó a conectarse con resiliencia, relaciones significativas, cohesión social, capacidades humanas y calidad de vida."
        ],
        "presente": [
          "Actualmente, el bienestar socioemocional ocupa un lugar estratégico en las agendas globales de desarrollo humano, salud pública y protección social. La OMS reconoce que muchas condiciones de salud mental pueden tratarse eficazmente a bajo costo, aunque persisten brechas importantes de acceso y recursos en los sistemas de salud (OMS, 2025). Además, Naciones Unidas ha planteado que la salud mental es cada vez más reconocida como derecho humano universal y elemento esencial para el desarrollo personal y comunitario (Naciones Unidas, 2025). En consecuencia, el presente del factor no se limita a la atención clínica, sino que incorpora prevención, promoción del bienestar, vínculos sociales, entornos protectores, autocuidado, resiliencia y sentido de vida. Esta lectura resulta especialmente relevante para organizaciones sociales que, como las cajas de compensación, tienen capacidad de articular servicios familiares, comunitarios, recreativos, laborales y educativos."
        ],
        "futuro": [
          "Hacia el futuro, el bienestar socioemocional tenderá a convertirse en una variable crítica para medir desarrollo humano, productividad, cohesión social y sostenibilidad institucional. A escala global, fenómenos como automatización, teletrabajo, hiperconectividad, precarización, envejecimiento, soledad no deseada y fragmentación comunitaria aumentarán la necesidad de intervenciones preventivas. La OMS ha pedido acelerar la transformación de la salud mental, fortaleciendo promoción, prevención y redes comunitarias de atención (OMS, 2022). En este horizonte, las organizaciones sociales deberán anticipar riesgos emocionales antes de que se conviertan en crisis clínicas, ruptura familiar, desvinculación laboral o deterioro comunitario. Por tanto, el bienestar socioemocional dejará de ser un componente complementario y pasará a ser una condición estructural para sostener capacidades humanas, sentido de vida, resiliencia y adaptación frente a cambios acelerados."
        ]
      },
      "colombia": {
        "pasado": [
          "En Colombia, la retrospectiva del factor muestra una transición desde respuestas institucionales centradas en atención médica y psiquiátrica hacia una comprensión más amplia de salud mental, convivencia, redes de apoyo y bienestar subjetivo. La Encuesta Nacional de Salud Mental de 2015, promovida por el Ministerio de Salud y Protección Social, fue la cuarta realizada en el país después de 1993, 1997 y 2003, y constituyó un insumo clave para orientar políticas públicas en esta materia (Ministerio de Salud y Protección Social, 2015). En el sistema de compensación familiar, esta evolución se reflejó en la ampliación de servicios de recreación, cultura, deporte, educación, acompañamiento familiar y protección social, que indirectamente inciden en equilibrio emocional, relaciones familiares y sentido de pertenencia. Por tanto, las cajas pasaron de ser proveedoras de beneficios a convertirse en actores potenciales de cuidado integral."
        ],
        "presente": [
          "En Colombia, el estado actual del factor refleja una mayor visibilidad pública de la salud mental, especialmente por el aumento de alertas sobre ansiedad, depresión, conducta suicida, estrés, soledad y sobrecarga del cuidado. El Ministerio de Salud publicó el Boletín Salud Mental: datos y cifras 2024-2025, en el cual retoma la alerta global de la OMS sobre el suicidio como problema de salud pública que causa más de 720.000 muertes anuales en el mundo (Ministerio de Salud y Protección Social, 2025). A su vez, el DANE cuenta con la Encuesta Pulso Social, que produce información sobre bienestar subjetivo, redes de cuidado, confianza, mercado laboral y percepciones sociales (DANE, 2026). Para las cajas, esto abre una agenda de prevención socioemocional mediante recreación, cultura, acompañamiento familiar, redes comunitarias, orientación psicosocial y promoción de hábitos de vida saludables."
        ],
        "futuro": [
          "En Colombia, las proyecciones indican que las cajas de compensación podrán desempeñar un papel más relevante en prevención, promoción del bienestar, educación emocional, acompañamiento familiar y construcción de redes de apoyo. La próxima Encuesta Nacional de Salud Mental 2025, liderada por el Ministerio de Salud, busca indagar problemas, trastornos mentales, acceso a servicios y apoyos comunitarios desde los 7 años, lo cual puede actualizar la línea base nacional para orientar políticas e intervenciones (Universidad de Antioquia, 2025). Complementariamente, la Encuesta Pulso Social y la Encuesta de Calidad de Vida del DANE ofrecen insumos para seguir bienestar subjetivo, cuidado, condiciones del hogar y percepción social (DANE, 2026). En consecuencia, el sistema de compensación podrá avanzar hacia rutas preventivas de bienestar emocional por ciclo vital, condición laboral, estructura familiar y territorio."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, la trayectoria del bienestar socioemocional ha estado marcada por desigualdades territoriales, violencia, urbanización acelerada, transformación familiar y brechas en acceso a servicios psicosociales. Mientras el Valle de Aburrá desarrolló mayor infraestructura institucional y oferta de atención, otras subregiones enfrentaron mayores dificultades asociadas a ruralidad, dispersión poblacional, conflictividad y vulnerabilidad social. La Encuesta de Calidad de Vida de Antioquia ha permitido observar condiciones de los hogares, percepción de bienestar, acceso a servicios y diferencias municipales, convirtiéndose en una fuente clave para comprender las dimensiones sociales del bienestar. En este marco, el bienestar socioemocional dejó de verse como un asunto individual y comenzó a interpretarse como una condición relacionada con el entorno, la familia, el trabajo, la comunidad y la posibilidad de construir proyectos de vida con estabilidad emocional y apoyo social."
        ],
        "presente": [
          "En Antioquia, el presente del bienestar socioemocional se relaciona con brechas sociales, inseguridad económica, dinámicas familiares, violencia, envejecimiento, presión urbana y necesidades de cuidado. La disponibilidad de información territorial mediante Antioquia Datos, el Anuario Estadístico y la Encuesta de Calidad de Vida permite analizar condiciones de vida, hogares y diferencias subregionales útiles para orientar intervenciones de bienestar. En Medellín y el Valle de Aburrá, la salud mental ha ganado relevancia pública por el incremento de consultas, conductas autolesivas y preocupación institucional frente al suicidio. Aunque los datos de salud mental deben interpretarse con cautela por subregistro y diferencias de reporte, muestran la necesidad de pasar de respuestas reactivas a modelos preventivos, comunitarios y relacionales. Para Comfenalco Antioquia, esto implica integrar bienestar emocional en programas de familia, empleo, educación, cultura, recreación y acompañamiento territorial."
        ],
        "futuro": [
          "En Antioquia, la tendencia apunta hacia modelos integrales de bienestar que combinen salud mental comunitaria, recreación con propósito, cultura, deporte, redes de cuidado, educación familiar y acompañamiento psicosocial. Las fuentes departamentales de calidad de vida y estadísticas territoriales permiten identificar condiciones diferenciales para priorizar programas por municipio y subregión. Prospectivamente, Comfenalco Antioquia podría desarrollar tableros de riesgo socioemocional, rutas de atención preventiva, estrategias contra la soledad, programas de bienestar laboral, redes de apoyo para cuidadores y espacios comunitarios de encuentro. Este enfoque permitiría pasar de medir asistencia a servicios a observar resiliencia emocional, cohesión social, satisfacción vital y sentido de pertenencia. En tal sentido, el bienestar socioemocional se proyecta como una dimensión estratégica para anticipar riesgos humanos y fortalecer capacidades relacionales en territorios con transformaciones sociales aceleradas."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las nueve subregiones de Antioquia, la retrospectiva evidencia necesidades diferenciadas. Valle de Aburrá concentró mayores servicios, pero también presiones urbanas, estrés laboral y fragmentación social; Oriente combinó crecimiento económico con cambios familiares y residenciales; Urabá enfrentó movilidad poblacional, vulnerabilidad juvenil y retos de cohesión; Bajo Cauca, Nordeste y Magdalena Medio arrastraron afectaciones derivadas de conflictividad, informalidad y exclusión; mientras Norte, Occidente y Suroeste tuvieron desafíos asociados a envejecimiento, ruralidad, aislamiento y menor disponibilidad de servicios especializados. TerriData del DNP permite revisar indicadores municipales y departamentales que ayudan a contextualizar estas diferencias territoriales (DNP, 2026). Así, el bienestar socioemocional se fue configurando como una dimensión territorial del desarrollo humano, no solo como un problema del sistema de salud."
        ],
        "presente": [
          "En las nueve subregiones, el estado actual exige enfoques diferenciados. Valle de Aburrá demanda estrategias frente a estrés, soledad urbana, hiperconectividad y equilibrio vida-trabajo; Oriente requiere acompañamiento por cambios residenciales, movilidad y presión sobre servicios; Urabá necesita programas de cohesión social, juventud y redes comunitarias; Bajo Cauca, Nordeste y Magdalena Medio requieren resiliencia psicosocial, prevención de violencia y fortalecimiento de tejido social; Norte, Occidente y Suroeste demandan atención al aislamiento, envejecimiento, cuidado rural y acceso oportuno a servicios. La Encuesta Nacional de Calidad de Vida del DANE recoge información sobre hogares, salud, educación, cuidado y condiciones de vida, mientras TerriData permite contextualizar brechas municipales (DANE, 2025; DNP, 2026). Por ello, el bienestar socioemocional debe abordarse como una dimensión transversal del bienestar integral."
        ],
        "futuro": [
          "En las nueve subregiones, las proyecciones deben reconocer que la salud emocional se expresa de forma distinta según contexto. En Valle de Aburrá, crecerán los retos de estrés urbano, soledad, salud mental laboral e hiperconectividad; en Oriente, los cambios residenciales y productivos demandarán integración comunitaria; en Urabá, será clave fortalecer proyectos juveniles, convivencia y redes de apoyo; en Bajo Cauca, Nordeste y Magdalena Medio, la prioridad será resiliencia, prevención de violencias y reconstrucción de confianza; en Norte, Occidente y Suroeste, cobrarán relevancia envejecimiento, cuidado, aislamiento rural y bienestar comunitario. La información municipal de TerriData y los datos de calidad de vida permiten construir líneas base para orientar estas respuestas (DNP, 2026; DANE, 2025). Por ende, el futuro del factor dependerá de articular tecnología, cuidado humano y presencia territorial."
        ]
      }
    },
    "sintesis": [
      "El bienestar socioemocional será un factor decisivo para que las cajas de compensación evolucionen hacia modelos de desarrollo humano integral, preventivo y relacional. Su importancia crecerá por la expansión del estrés, la soledad, la hiperconectividad, los cambios familiares y la fragmentación social. En Colombia, las fuentes oficiales de salud mental, calidad de vida y bienestar subjetivo permitirán medir riesgos y orientar intervenciones. En Antioquia, la diversidad subregional exigirá respuestas diferenciadas que integren cuidado, comunidad, recreación, cultura y acompañamiento. Así, el futuro del factor dependerá de convertir vínculos, resiliencia y sentido de vida en capacidades institucionales de bienestar (OMS, 2022; DANE, 2026; Ministerio de Salud, 2025)."
    ],
    "fuentes": [
      {
        "nombre": "Ministerio de Salud y Protección Social / SISPRO – Observatorio Nacional de Salud Mental",
        "descripcion": [
          "Indicadores estadísticos y epidemiológicos sobre salud mental, Encuesta Nacional de Salud Mental 2015, convivencia social, eventos asociados y consulta de datos sectoriales.",
          "Sipro. Disponible en: https://www.sispro.gov.co/observatorios/onsaludmental/Paginas/Inicio.aspx?utm_source"
        ]
      },
      {
        "nombre": "Instituto Nacional de Salud – SIVIGILA",
        "descripcion": [
          "Vigilancia epidemiológica de intento de suicidio, boletines epidemiológicos, tasas por sexo, edad, departamento y comportamiento semanal.",
          "Disponible en: https://www.ins.gov.co/buscador-eventos/BoletinEpidemiologico/2025_Boletin_epidemiologico_semana_36.pdf?utm_source"
        ]
      },
      {
        "nombre": "DANE – Encuesta Pulso Social",
        "descripcion": [
          "Bienestar subjetivo, confianza del consumidor, redes de cuidado, hogar, mercado laboral, percepciones de desigualdad y condiciones sociales.",
          "DANE. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/encuesta-pulso-social?utm_source"
        ]
      },
      {
        "nombre": "DANE – Encuesta Nacional de Calidad de Vida",
        "descripcion": [
          "Condiciones de vida de hogares: salud, educación, cuidado, vivienda, servicios, percepción de condiciones del hogar y acceso a bienes.",
          "DANE- Encuesta calidad de vida. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/salud/calidad-de-vida-ecv/encuesta-nacional-de-calidad-de-vida-ecv-2025?utm_source"
        ]
      },
      {
        "nombre": "Gobernación de Antioquia – Antioquia Datos / Encuesta de Calidad de Vida",
        "descripcion": [
          "Información departamental, municipal y subregional sobre calidad de vida, hogares, condiciones sociales, población y brechas territoriales.",
          "Microdatos. Disponible en: https://microdatos.dane.gov.co/index.php/catalog/905?utm_source"
        ]
      }
    ]
  },
  f5: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica como tendencia estructural debido a que refleja una transformación progresiva y sostenida en la manera como las sociedades reconocen, organizan y valoran las actividades de cuidado humano, familiar y comunitario. Durante décadas, estas actividades permanecieron invisibilizadas dentro de los sistemas económicos tradicionales, al ser consideradas responsabilidades privadas asociadas principalmente a las mujeres y a los hogares. Sin embargo, los cambios demográficos, sociales y culturales han impulsado su reconocimiento como un componente esencial para la sostenibilidad del bienestar y el desarrollo humano. De manera complementaria, este factor incorpora diversos hechos portadores de futuro, especialmente relacionados con la consolidación de sistemas integrales de cuidado, la profesionalización de servicios de atención a personas dependientes, la incorporación de tecnologías para el cuidado remoto, la expansión de economías plateadas asociadas al envejecimiento y la creación de infraestructuras territoriales de cuidado. Estas señales emergentes podrían transformar significativamente las relaciones entre bienestar, productividad, familia y cohesión social durante las próximas décadas."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "Las actividades de cuidado estuvieron históricamente vinculadas al ámbito doméstico y fueron consideradas responsabilidades familiares no remuneradas. Durante gran parte del siglo XX, los sistemas económicos y las políticas públicas prestaron escasa atención a la contribución del cuidado al bienestar social y al funcionamiento de las economías (Folbre, 2001). No obstante, el aumento de la participación laboral femenina, las transformaciones familiares y el envejecimiento poblacional comenzaron a evidenciar la importancia estratégica de estas actividades. Posteriormente, organismos internacionales como Naciones Unidas y la CEPAL promovieron el reconocimiento del trabajo de cuidado como un componente fundamental del desarrollo sostenible y la equidad de género"
        ],
        "presente": [
          "La economía del cuidado ocupa un lugar central en los debates internacionales sobre bienestar, desarrollo sostenible e igualdad de oportunidades. Organismos multilaterales destacan que el cuidado constituye una infraestructura social indispensable para garantizar calidad de vida, inclusión social y sostenibilidad económica (ONU Mujeres, 2023). Además, el envejecimiento poblacional, el aumento de enfermedades crónicas y los desafíos asociados a la salud mental han incrementado la demanda de servicios de cuidado en prácticamente todas las regiones del mundo."
        ],
        "futuro": [
          "Las tendencias internacionales indican que la economía del cuidado se convertirá en uno de los principales pilares de los sistemas de bienestar durante las próximas décadas. El envejecimiento poblacional, el incremento de enfermedades asociadas a la longevidad y los cambios en las estructuras familiares impulsarán una creciente demanda de servicios especializados de cuidado. Adicionalmente, la digitalización permitirá el desarrollo de tecnologías para monitoreo remoto, teleasistencia y acompañamiento personalizado."
        ]
      },
      "colombia": {
        "pasado": [
          "Este proceso adquirió relevancia con la incorporación gradual de políticas relacionadas con cuidado, protección social y corresponsabilidad familiar. Asimismo, la Cuenta Satélite de Economía del Cuidado permitió visibilizar el aporte económico de las actividades no remuneradas realizadas en los hogares"
        ],
        "presente": [
          "La formulación de políticas relacionadas con sistemas nacionales de cuidado y la consolidación de la Cuenta Satélite de Economía del Cuidado reflejan avances importantes en el reconocimiento institucional de esta dimensión (DANE, 2024). Asimismo, el cuidado comienza a ser entendido no solo como una responsabilidad familiar, sino también como un asunto estratégico de política pública y desarrollo social."
        ],
        "futuro": [
          "Estas transformaciones favorecerán la consolidación de sistemas integrales de cuidado orientados a garantizar bienestar, corresponsabilidad y equidad social. Asimismo, aumentará la necesidad de reconocer y valorar económicamente las actividades de cuidado tradicionalmente invisibilizadas."
        ]
      },
      "antioquia": {
        "pasado": [
          "La evolución de la economía del cuidado ha estado estrechamente relacionada con cambios demográficos, sociales y culturales que han modificado las dinámicas familiares tradicionales. Durante décadas, el cuidado de niños, personas mayores, enfermos y personas con discapacidad se concentró principalmente en las familias y comunidades, con una limitada participación institucional. Sin embargo, el crecimiento urbano, la incorporación masiva de las mujeres al mercado laboral y el aumento de la esperanza de vida generaron nuevas demandas de apoyo y protección social (Gobernación de Antioquia, 2023). En respuesta, comenzaron a fortalecerse programas dirigidos a primera infancia, envejecimiento activo, atención a cuidadores y promoción del bienestar familiar. Paralelamente, las cajas de compensación familiar ampliaron su oferta de servicios orientados al cuidado integral mediante programas educativos, recreativos, de salud y acompañamiento social, contribuyendo a una visión más amplia del bienestar centrada en las personas y sus entornos familiares."
        ],
        "presente": [
          "La economía del cuidado adquiere una relevancia creciente debido a las transformaciones demográficas y familiares que experimenta el departamento. El aumento de la población adulta mayor, la reducción del tamaño de los hogares y la mayor participación femenina en actividades productivas han generado nuevas necesidades de apoyo para personas dependientes y sus cuidadores (Gobernación de Antioquia, 2024). En este contexto, instituciones públicas, organizaciones sociales y cajas de compensación familiar han fortalecido programas relacionados con envejecimiento activo, salud mental, primera infancia, discapacidad y acompañamiento familiar. No obstante, persisten desafíos asociados a cobertura, sostenibilidad financiera y acceso equitativo a servicios en zonas rurales y dispersas. En consecuencia, el fortalecimiento de capacidades territoriales para el cuidado se ha convertido en una prioridad para el bienestar regional."
        ],
        "futuro": [
          "Para Antioquia, las proyecciones sugieren una expansión significativa de programas y servicios relacionados con cuidado integral, salud mental y acompañamiento a personas dependientes. La Agenda Antioquia 2040 reconoce que el envejecimiento demográfico y las transformaciones familiares exigirán nuevas capacidades institucionales para garantizar bienestar y cohesión social (Gobernación de Antioquia, 2024). De igual forma, las cajas de compensación familiar podrían consolidarse como actores clave en la provisión de servicios de cuidado, prevención y fortalecimiento de capacidades familiares. La articulación entre tecnología, innovación social y protección comunitaria permitirá desarrollar modelos más eficientes y personalizados de atención."
        ]
      },
      "subregiones": {
        "pasado": [
          "La incorporación de la economía del cuidado en las nueve subregiones de Antioquia ha presentado dinámicas diferenciadas según las condiciones económicas, institucionales y demográficas de cada territorio. Mientras áreas como el Valle de Aburrá y Oriente desarrollaron una oferta más amplia de servicios relacionados con cuidado y protección social, otras subregiones continuaron dependiendo en mayor medida de redes familiares y comunitarias para atender necesidades de personas dependientes (PNUD, 2022). A pesar de estas diferencias, los procesos de descentralización y fortalecimiento territorial promovieron gradualmente una mayor atención hacia poblaciones vulnerables, adultos mayores y cuidadores familiares. De igual manera, las cajas de compensación familiar contribuyeron a ampliar el acceso a servicios que fortalecen capacidades familiares y comunitarias para el cuidado. Como resultado, se consolidó una comprensión progresiva del cuidado como un componente esencial para la cohesión social, la resiliencia familiar y el desarrollo humano territorial."
        ],
        "presente": [
          "Las nueve subregiones antioqueñas presentan actualmente importantes diferencias en la disponibilidad y acceso a servicios de cuidado. Mientras algunos municipios cuentan con infraestructuras institucionales más robustas, otros continúan dependiendo principalmente de redes familiares y comunitarias para responder a necesidades crecientes de atención (PNUD, 2023). Sin embargo, se observa una expansión gradual de iniciativas relacionadas con atención a personas mayores, apoyo psicosocial, inclusión de personas con discapacidad y fortalecimiento de capacidades de los cuidadores. Asimismo, la articulación entre entidades públicas, organizaciones sociales y cajas de compensación familiar está favoreciendo la construcción de respuestas más integrales frente a los desafíos del cuidado. Este panorama evidencia que la economía del cuidado se encuentra en una fase de consolidación como componente estratégico del bienestar territorial."
        ],
        "futuro": [
          "A nivel subregional, la economía del cuidado evolucionará hacia ecosistemas territoriales capaces de integrar servicios sociales, comunitarios y tecnológicos alrededor de las necesidades de las personas. La utilización de herramientas digitales facilitará la identificación temprana de riesgos, el seguimiento de poblaciones vulnerables y la personalización de intervenciones (PNUD, 2023). Simultáneamente, crecerá la importancia de medir variables relacionadas con resiliencia familiar, bienestar emocional, autonomía funcional y cohesión social. Como resultado, el cuidado dejará de concebirse exclusivamente como una responsabilidad doméstica para convertirse en una dimensión estratégica del desarrollo territorial sostenible."
        ]
      }
    },
    "sintesis": [
      "La economía del cuidado se proyecta como una dimensión fundamental para garantizar sostenibilidad humana, bienestar colectivo y cohesión social en escenarios de transformación demográfica y social. Asimismo, la creciente demanda de atención derivada del envejecimiento poblacional, los cambios familiares y los desafíos de salud mental exigirá respuestas institucionales cada vez más integrales y adaptativas. De manera complementaria, la articulación entre sistemas de protección social, innovación tecnológica y redes comunitarias fortalecerá la capacidad de los territorios para cuidar a sus poblaciones. En consecuencia, las organizaciones que incorporen el cuidado como eje estratégico estarán mejor preparadas para promover desarrollo humano, resiliencia familiar y equidad social en el largo plazo"
    ],
    "fuentes": [
      {
        "nombre": "Departamento Administrativo Nacional de Estadística (DANE)",
        "descripcion": [
          "Cuenta Satélite de Economía del Cuidado (CSEC), Encuesta Nacional de Uso del Tiempo (ENUT), estadísticas de envejecimiento, dependencia, composición de hogares, participación laboral y distribución del trabajo doméstico y de cuidado no remunerado.",
          "Disponible en: https://www.dane.gov.co/"
        ]
      },
      {
        "nombre": "Comisión Económica para América Latina y el Caribe (CEPAL)",
        "descripcion": [
          "Estudios sobre economía del cuidado, sistemas integrales de cuidado, corresponsabilidad social, envejecimiento poblacional, igualdad de género y protección social.",
          "CEPAL. Disponible en: https://www.cepal.org/"
        ]
      },
      {
        "nombre": "Ministerio de Igualdad y Equidad de Colombia",
        "descripcion": [
          "Políticas nacionales de cuidado, Sistema Nacional de Cuidado, programas dirigidos a personas cuidadoras, poblaciones dependientes y fortalecimiento de capacidades familiares.",
          "Disponible en: https://www.minigualdadyequidad.gov.co/"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar (Supersubsidio)",
        "descripcion": [
          "Cobertura de programas sociales, atención a adultos mayores, primera infancia, discapacidad, salud mental, bienestar familiar y programas de cuidado implementados por las cajas de compensación familiar.",
          "Supersubsidio. Disponible en: https://www.ssf.gov.co/"
        ]
      },
      {
        "nombre": "Programa de las Naciones Unidas para el Desarrollo (PNUD)",
        "descripcion": [
          "Informes sobre desarrollo humano, resiliencia social, envejecimiento, inclusión, bienestar y sostenibilidad de sistemas de protección social.",
          "Disponible en: https://www.undp.org/"
        ]
      }
    ]
  },
  f6: {
    "tipificacion": {
      "tipo": "Tendencia",
      "justificacion": "Se clasifica principalmente como una tendencia, porque expresa una evolución observable desde servicios fragmentados hacia modelos articulados, interoperables, territoriales y centrados en trayectorias de vida. Sin embargo, también contiene hechos portadores de futuro, como los ecosistemas inteligentes de bienestar, la interoperabilidad de datos sociales, las rutas integrales predictivas, la articulación entre salud, cuidado, empleabilidad y educación, y la gestión coordinada de capacidades institucionales."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "En el plano global, la integración sistémica del bienestar surgió como respuesta a la fragmentación de los servicios sociales, sanitarios, educativos y laborales. Durante buena parte del siglo XX, las políticas sociales operaron mediante sectores especializados, con baja coordinación entre instituciones y escasa lectura integral de las trayectorias de vida. Sin embargo, el aumento de necesidades complejas —pobreza, discapacidad, envejecimiento, desempleo, cuidado y salud mental— evidenció que una persona no requiere servicios aislados, sino rutas coordinadas. La OCDE ha señalado que la especialización excesiva puede dificultar que las personas con necesidades múltiples reciban la combinación adecuada de servicios en el momento oportuno (OECD, 2024). Por ello, la integración pasó de ser un asunto administrativo a convertirse en una condición para mejorar resultados humanos y sociales."
        ],
        "presente": [
          "Actualmente, la integración sistémica del bienestar es una prioridad global para responder a necesidades humanas cada vez más complejas. La CEPAL plantea que América Latina debe avanzar hacia sistemas de protección social universales, integrales, sostenibles y resilientes, capaces de enfrentar brechas persistentes y una estructura de riesgos en reconfiguración (CEPAL, 2024). De forma complementaria, la OCDE ha documentado experiencias de integración de servicios para personas con necesidades múltiples, destacando que la coordinación mejora la oportunidad, pertinencia y continuidad de la atención (OECD, 2024). Por tanto, el presente del factor está marcado por el tránsito hacia ecosistemas que combinan salud, educación, cuidado, empleo, vivienda, protección social y datos. Esta integración no busca eliminar la especialización, sino conectarla alrededor de las personas, sus familias y sus comunidades."
        ],
        "futuro": [
          "Hacia el futuro, la integración sistémica del bienestar tenderá a consolidarse como una arquitectura de gestión basada en ecosistemas, datos e inteligencia institucional. A nivel global, los sistemas sociales avanzarán hacia modelos de atención coordinada, ventanillas integradas, rutas personalizadas, interoperabilidad de información y gobernanza colaborativa. La OCDE señala que un número creciente de países está implementando medidas para mejorar la integración de servicios sociales y de salud, incluyendo niveles políticos, institucionales, organizacionales, funcionales y operativos (OECD, 2025). Este enfoque anticipa que el bienestar ya no podrá gestionarse desde silos sectoriales, sino mediante redes capaces de acompañar trayectorias de vida. Por consiguiente, el futuro estará marcado por ecosistemas que integren prevención, atención, cuidado, inclusión, empleabilidad y desarrollo comunitario."
        ]
      },
      "colombia": {
        "pasado": [
          "En Colombia, la retrospectiva del factor se relaciona con la construcción progresiva de sistemas de protección social, salud, educación, empleo, cuidado y subsidio familiar. Las cajas de compensación familiar, reguladas por la Ley 21 de 1982, nacieron con funciones asociadas al subsidio familiar, pero posteriormente ampliaron su operación hacia recreación, vivienda, educación, empleo, crédito, cultura, turismo y protección al cesante. Esta expansión fortaleció su potencial como articuladoras de bienestar, aunque también generó retos de coordinación interna y sectorial. La Superintendencia del Subsidio Familiar publica boletines estadísticos trimestrales con información comparada del sistema, incluyendo gráficas, tablas y tendencias sobre sus principales componentes (Superintendencia del Subsidio Familiar, 2025). Así, la historia del sistema muestra una transición desde servicios separados hacia una arquitectura institucional más amplia, aunque todavía con desafíos de integración efectiva."
        ],
        "presente": [
          "En Colombia, el estado actual del factor se observa en tres dimensiones: interoperabilidad digital, integración de programas sociales y articulación del sistema de compensación familiar. MinTIC define los Servicios Ciudadanos Digitales como mecanismos que facilitan la interacción de la ciudadanía con las entidades públicas y optimizan la labor del Estado, incluyendo servicios base como interoperabilidad, autenticación digital y carpeta ciudadana (MinTIC, 2026). Esta infraestructura es relevante porque la integración del bienestar requiere conectar datos, trámites y rutas de atención. En paralelo, la Superintendencia del Subsidio Familiar dispone información sobre población del sistema desde 2019, con datos de empresas afiliadas, trabajadores afiliados y beneficiarios (Superintendencia del Subsidio Familiar, 2024). Para las cajas, esto abre la posibilidad de pasar de portafolios dispersos a rutas integrales de bienestar por hogar, empresa, ciclo vital y territorio."
        ],
        "futuro": [
          "En Colombia, las proyecciones del factor estarán asociadas con la madurez de la interoperabilidad pública, la analítica social y la capacidad del sistema de compensación familiar para coordinar servicios alrededor de hogares y empresas. Los Servicios Ciudadanos Digitales ofrecen una base para mejorar interacción, autenticación, carpeta ciudadana e intercambio de información entre entidades (MinTIC, 2026). A su vez, los datos abiertos del Sistema de Subsidio Familiar permiten analizar empresas afiliadas, trabajadores, beneficiarios y población atendida desde 2019, insumo clave para construir modelos integrales de seguimiento (Superintendencia del Subsidio Familiar, 2024). En prospectiva, las cajas podrán evolucionar hacia rutas integradas de bienestar que conecten empleabilidad, formación, vivienda, recreación, salud mental, cuidado, educación financiera y acompañamiento familiar, superando la lógica de servicios independientes."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, la integración sistémica del bienestar se fue configurando por la necesidad de conectar capacidades institucionales en un territorio diverso, urbano-rural y socialmente desigual. El Valle de Aburrá concentró servicios, infraestructura y oferta institucional; en contraste, subregiones como Bajo Cauca, Nordeste, Occidente, Magdalena Medio y Urabá enfrentaron mayores barreras de acceso, informalidad, dispersión y vulnerabilidad social. La Dirección de Estadísticas e Indicadores de Antioquia consolida instrumentos como el Anuario Estadístico, la Encuesta de Calidad de Vida, las cuentas económicas y las fichas municipales, que permiten comprender el territorio de manera más articulada (Gobernación de Antioquia, 2025). En ese recorrido, la integración dejó de ser solo coordinación entre áreas y empezó a entenderse como lectura sistémica de necesidades, servicios, datos, actores y brechas territoriales."
        ],
        "presente": [
          "En Antioquia, la integración sistémica del bienestar se vuelve especialmente relevante por la coexistencia de territorios con alta capacidad institucional y otros con mayores restricciones de acceso. Antioquia Datos consolida el Anuario Estadístico, tableros económicos y sociales, Encuesta de Calidad de Vida, Plan Estadístico Territorial, fichas municipales y biblioteca económica y estadística (Gobernación de Antioquia, 2026). Estos instrumentos permiten conectar información social, económica, territorial y poblacional para orientar decisiones. Para Comfenalco Antioquia, el reto actual consiste en articular sus servicios de recreación, educación, empleo, vivienda, cultura, turismo, cuidado y acompañamiento familiar en rutas integrales, evitando que cada servicio opere como una unidad aislada. Así, la integración se convierte en una capacidad estratégica para comprender necesidades complejas y responder con soluciones coordinadas."
        ],
        "futuro": [
          "En Antioquia, la tendencia apunta hacia una integración territorial inteligente. Esto implica combinar datos departamentales, lectura subregional, alianzas institucionales y portafolios coordinados de bienestar. Antioquia Datos ya reúne herramientas como anuario, tableros económicos y sociales, Encuesta de Calidad de Vida y fichas municipales, que pueden soportar decisiones más integradas (Gobernación de Antioquia, 2026). En este horizonte, Comfenalco Antioquia podría estructurar rutas de bienestar por ciclo vital, condición laboral, composición familiar y territorio; además, podría fortalecer nodos subregionales que conecten servicios propios con alcaldías, empresas, instituciones educativas, sector salud, organizaciones comunitarias y cooperación. Así, la integración sistémica no sería únicamente una mejora administrativa, sino una capacidad prospectiva para anticipar necesidades, reducir duplicidades, cerrar brechas y aumentar impacto social."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las nueve subregiones de Antioquia, la retrospectiva evidencia una tensión permanente entre oferta institucional centralizada y necesidades territoriales diferenciadas. Valle de Aburrá acumuló capacidades de atención integral; Oriente y Suroeste avanzaron con dinámicas productivas, educativas y turísticas; Urabá combinó potencial logístico con demandas sociales profundas; Bajo Cauca, Nordeste y Magdalena Medio requirieron articulación entre protección social, empleo, convivencia y desarrollo comunitario; Norte y Occidente demandaron estrategias de proximidad por ruralidad, envejecimiento y dispersión poblacional. TerriData, del DNP, facilita la visualización de estadísticas e indicadores territoriales municipales, departamentales y regionales, lo que permite reconstruir brechas y oportunidades para una gestión integrada del bienestar (DNP, 2026). En consecuencia, la integración sistémica ha evolucionado como una necesidad territorial más que como una simple mejora operativa."
        ],
        "presente": [
          "En las nueve subregiones, el presente del factor exige modelos de integración diferenciados. Valle de Aburrá requiere interoperabilidad entre servicios digitales, empresariales, familiares y urbanos; Oriente demanda articulación por crecimiento poblacional, empleo, vivienda y movilidad; Urabá necesita conectar formación, empleabilidad, cuidado, juventud y cohesión social; Bajo Cauca, Nordeste y Magdalena Medio requieren rutas que integren protección social, inclusión productiva, salud mental, convivencia y desarrollo territorial; Norte, Occidente y Suroeste demandan esquemas de proximidad que articulen atención rural, envejecimiento, cultura, recreación, empleabilidad y cuidado. La Encuesta Nacional de Calidad de Vida del DANE cuantifica condiciones de vivienda, salud, educación, cuidado, TIC y percepción de los hogares, mientras TerriData permite comparar indicadores territoriales (DANE, 2026; DNP, 2026). En suma, integrar bienestar significa conectar información, servicios y actores según la realidad de cada territorio."
        ],
        "futuro": [
          "En las nueve subregiones, las proyecciones requieren modelos de integración contextualizados. Valle de Aburrá podrá avanzar hacia ecosistemas digitales y empresariales de bienestar; Oriente necesitará coordinación entre crecimiento urbano, educación, empleabilidad, vivienda y calidad de vida; Urabá demandará integración entre formación, movilidad social, juventud, logística y cohesión comunitaria; Bajo Cauca, Nordeste y Magdalena Medio requerirán rutas intersectoriales de resiliencia social, convivencia y protección; Norte, Occidente y Suroeste deberán priorizar integración de cuidado, envejecimiento, ruralidad, recreación, cultura y acceso a oportunidades. TerriData busca promover indicadores estandarizados y comparables para todas las entidades territoriales, lo que permite construir tableros subregionales de integración, brechas y resultados (DNP, 2023). Por ello, la integración futura será más valiosa cuando logre conectar capacidades institucionales con necesidades humanas concretas."
        ]
      }
    },
    "sintesis": [
      "La integración sistémica del bienestar será una condición estratégica para que las cajas de compensación evolucionen desde portafolios fragmentados hacia ecosistemas coordinados, inteligentes y centrados en trayectorias de vida. Su consolidación exigirá interoperabilidad, gestión de datos, articulación interna, alianzas territoriales y rutas integrales de atención. En Colombia, esta tendencia se conecta con la transformación digital del Estado y la disponibilidad de información del sistema de subsidio familiar. En Antioquia, su valor dependerá de adaptar la integración a las nueve subregiones. Así, integrar bienestar significará conectar servicios, actores y decisiones para producir impacto humano verificable (CEPAL, 2024; MinTIC, 2026; DNP, 2026)."
    ],
    "fuentes": [
      {
        "nombre": "Superintendencia del Subsidio Familiar",
        "descripcion": [
          "Boletines estadísticos trimestrales del Sistema del Subsidio Familiar: afiliados, empresas, trabajadores, beneficiarios, servicios, subsidios, comparativos y tendencias.",
          "Boletines estadísticos SSF. Disponible en: https://www.ssf.gov.co/boletines-estad%C3%ADsticos?utm_source"
        ]
      },
      {
        "nombre": "Datos Abiertos Colombia – Superintendencia del Subsidio Familiar",
        "descripcion": [
          "Base “Población del Sistema de Subsidio Familiar Consolidado”, con datos desde 2019 sobre empresas afiliadas, trabajadores afiliados y beneficiarios.",
          "Población del Sistema de Subsidio Familiar Consolidado. Disponible en: https://www.datos.gov.co/Trabajo/Poblaci-n-del-Sistema-de-Subsidio-Familiar-Consoli/ese3-e6sh/about_data"
        ]
      },
      {
        "nombre": "MinTIC – Servicios Ciudadanos Digitales",
        "descripcion": [
          "Información sobre interoperabilidad, autenticación digital, carpeta ciudadana digital y servicios base para integración digital institucional.",
          "Servicios Ciudadanos Digitales. Disponible en: https://gobiernodigital.mintic.gov.co/portal/Iniciativas/Servicios-Ciudadanos-Digitales/"
        ]
      },
      {
        "nombre": "DANE – Encuesta Nacional de Calidad de Vida",
        "descripcion": [
          "Información histórica sobre hogares, vivienda, salud, educación, cuidado, TIC, bienes del hogar y percepción de condiciones de vida.",
          "Encuesta Nacional de Calidad de Vida. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/calidad-de-vida-ecv?utm_source"
        ]
      },
      {
        "nombre": "DNP – TerriData",
        "descripcion": [
          "Indicadores municipales, departamentales y regionales comparables sobre población, pobreza, salud, educación, vivienda, economía y desarrollo territorial.",
          "TerriData. Disponible en: https://terridata.dnp.gov.co/?utm_source"
        ]
      }
    ]
  },
  f7: {
    "tipificacion": {
      "tipo": "Hecho portador de futuro",
      "justificacion": "Se clasifica principalmente como hecho portador de futuro, porque todavía no está plenamente consolidado en las cajas de compensación, pero expresa señales emergentes de alto potencial: hiperpersonalización, rutas integradas, autogestión, inteligencia colectiva, analítica de trayectorias de vida y servicios contextuales. No obstante, también contiene una tendencia asociada al tránsito desde modelos homogéneos y masivos hacia esquemas centrados en la persona, preventivos, territoriales y basados en datos."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "A nivel global, los modelos de bienestar partieron de esquemas homogéneos, sectoriales y estandarizados, diseñados para atender grandes grupos poblacionales bajo criterios generales de cobertura. Durante buena parte del siglo XX, la protección social operó mediante servicios separados de salud, educación, empleo, cuidado y asistencia, con limitada lectura de las trayectorias individuales. Sin embargo, el aumento de necesidades complejas impulsó el tránsito hacia servicios integrados y personalizados. La OCDE ha señalado que la especialización excesiva puede dificultar que personas con necesidades múltiples reciban la combinación adecuada de servicios en el momento oportuno (OECD, 2024). Así, la personalización dejó de entenderse como un atributo comercial y comenzó a convertirse en una condición de pertinencia social, especialmente para poblaciones vulnerables, familias diversas y personas con trayectorias de vida no lineales."
        ],
        "presente": [
          "Actualmente, el ecosistema colectivo de bienestar personalizado se expresa en la necesidad de conectar servicios, datos, actores y experiencias alrededor de la persona. A escala global, los sistemas de protección social enfrentan trayectorias vitales más diversas: envejecimiento, hogares unipersonales, migración, trabajo flexible, discapacidad, informalidad, salud mental y nuevas formas de cuidado. La CEPAL plantea que América Latina y el Caribe debe avanzar hacia sistemas de protección social universales, integrales, sostenibles y resilientes, capaces de responder a riesgos sociales en reconfiguración (CEPAL, 2024). En esta lógica, la personalización no significa individualizar responsabilidades, sino adaptar apoyos institucionales a necesidades reales, ciclo vital, contexto familiar y territorio. Por tanto, el presente del factor exige pasar de servicios disponibles a rutas pertinentes, oportunas y articuladas."
        ],
        "futuro": [
          "Hacia el futuro, este factor tenderá a consolidarse como una arquitectura de bienestar basada en datos, inteligencia colectiva, autogestión y rutas personalizadas. En el mundo, la OCDE advierte que los avances en datos y tecnología están mejorando la accesibilidad, cobertura y entrega de beneficios sociales, especialmente mediante la conexión de bases administrativas para identificar necesidades y facilitar el acceso a programas (OECD, 2025). No obstante, estos desarrollos también exigirán gobernanza ética, protección de datos y criterios de inclusión para evitar nuevas brechas. En prospectiva, la personalización del bienestar no será solo digitalización de servicios, sino capacidad de anticipar necesidades, sugerir rutas, integrar actores y acompañar decisiones humanas. Por tanto, el ecosistema futuro deberá equilibrar inteligencia tecnológica con cercanía social y sentido comunitario."
        ]
      },
      "colombia": {
        "pasado": [
          "En Colombia, la retrospectiva del factor se relaciona con la evolución del sistema de compensación familiar desde subsidios y servicios masivos hacia portafolios más amplios de bienestar. Las cajas nacieron como mecanismos de redistribución social vinculados al trabajo formal, pero progresivamente incorporaron recreación, educación, vivienda, empleo, cultura, turismo, crédito social, cuidado y protección al cesante. Esta expansión permitió atender múltiples dimensiones de la vida familiar, aunque inicialmente bajo segmentaciones básicas: afiliados, beneficiarios, empresas, categorías salariales o grupos poblacionales. La Superintendencia del Subsidio Familiar dispone información histórica del sistema sobre empresas afiliadas, trabajadores y beneficiarios desde 2019, lo que permite avanzar hacia lecturas más diferenciadas de usuarios y necesidades (Superintendencia del Subsidio Familiar, 2024). En consecuencia, la evolución colombiana muestra una base institucional robusta, pero aún con retos para conectar datos, servicios y rutas personalizadas."
        ],
        "presente": [
          "En Colombia, el estado actual muestra un sistema de compensación familiar con alta capacidad de cobertura, pero con el desafío de transformar información en experiencias personalizadas. Asocajas ha señalado que el sistema consolidó más de 10,6 millones de afiliados y que crece la vinculación de aportantes independientes, lo cual evidencia nuevas formas de relación entre población, trabajo y protección social (Asocajas, 2025). Esta diversificación presiona a las cajas para diseñar servicios más flexibles para trabajadores formales, independientes, familias, empresas y territorios. Además, la Encuesta Nacional de Calidad de Vida del DANE caracteriza condiciones de vivienda, salud, educación, cuidado, TIC y percepción de los hogares, variables fundamentales para segmentar necesidades y construir rutas de bienestar más integrales (DANE, 2025)."
        ],
        "futuro": [
          "En Colombia, las proyecciones estarán marcadas por la transformación del trabajo, la informalidad, la diversidad familiar, el envejecimiento y el aumento de expectativas de servicios personalizados. Los datos abiertos del Sistema de Subsidio Familiar permiten analizar empresas afiliadas, trabajadores y beneficiarios desde 2019, insumo útil para construir modelos de segmentación, permanencia, riesgo y oportunidad (Superintendencia del Subsidio Familiar, 2024). A su vez, la información de calidad de vida del DANE ofrece variables para comprender condiciones del hogar, acceso a servicios, cuidado y uso de tecnologías (DANE, 2025). En este contexto, las cajas podrán evolucionar hacia rutas predictivas de bienestar que integren afiliación, ciclo vital, ingresos, territorio, composición familiar y preferencias de uso. Así, el sistema pasaría de atender solicitudes a anticipar necesidades de desarrollo humano integral."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, este factor ha evolucionado en medio de una realidad territorial diversa. El Valle de Aburrá concentró históricamente mayor oferta institucional, empleo formal, infraestructura y servicios especializados, mientras que subregiones como Urabá, Bajo Cauca, Nordeste, Magdalena Medio, Norte, Occidente y Suroeste enfrentaron mayores barreras de acceso, dispersión poblacional, ruralidad e informalidad. Por ello, la personalización del bienestar no puede limitarse a preferencias individuales, sino que debe considerar condiciones territoriales, familiares, laborales y comunitarias. La Gobernación de Antioquia informó que la Encuesta de Calidad de Vida 2025 se aplicará en 70.779 hogares de las nueve subregiones, cubriendo barrios, comunas, corregimientos y veredas de los 125 municipios (Gobernación de Antioquia, 2025). Esta información fortalece la posibilidad de diseñar bienestar con enfoque contextual."
        ],
        "presente": [
          "En Antioquia, el presente del factor se relaciona con la posibilidad de articular información departamental, capacidades institucionales y necesidades humanas diferenciadas. La Encuesta de Calidad de Vida 2025 de Antioquia permitirá observar condiciones de hogares en las nueve subregiones y en todos los municipios, lo que ofrece una base para comprender brechas sociales, capacidades familiares y demandas territoriales (Gobernación de Antioquia, 2025). Para Comfenalco Antioquia, este enfoque supone avanzar desde portafolios separados hacia trayectorias integrales de bienestar: empleo, formación, recreación, cultura, vivienda, salud mental, cuidado, educación financiera y acompañamiento familiar. En consecuencia, el valor institucional no dependerá solamente de cuántos servicios ofrece, sino de qué tan bien logra combinarlos según las necesidades, riesgos y proyectos de vida de las personas."
        ],
        "futuro": [
          "En Antioquia, la tendencia apunta hacia ecosistemas de bienestar territorialmente inteligentes. Esto implica combinar analítica de datos, lectura subregional, escucha social, alianzas locales y portafolios modulares. La Encuesta de Calidad de Vida de Antioquia, al cubrir 70.779 hogares en los 125 municipios, puede convertirse en una base estratégica para orientar decisiones diferenciadas de bienestar (Gobernación de Antioquia, 2025). En este horizonte, Comfenalco Antioquia podría desarrollar rutas integrales por perfiles: jóvenes en transición educativa-laboral, familias cuidadoras, trabajadores con estrés financiero, adultos mayores, población rural, independientes y empresas con necesidades de bienestar laboral. De esta forma, la personalización colectiva se convertiría en una capacidad prospectiva para conectar servicios, anticipar riesgos y fortalecer trayectorias de vida sostenibles."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las nueve subregiones de Antioquia, la retrospectiva evidencia que las trayectorias de bienestar han sido heterogéneas. Valle de Aburrá avanzó hacia servicios urbanos más especializados; Oriente combinó crecimiento residencial, industrial y educativo; Suroeste fortaleció dinámicas rurales, cafeteras y turísticas; Urabá mezcló potencial logístico con brechas sociales; Bajo Cauca, Nordeste y Magdalena Medio enfrentaron vulnerabilidades asociadas a informalidad, conflictividad y exclusión; mientras Norte y Occidente demandaron esquemas de cercanía por envejecimiento, ruralidad y dispersión. TerriData del DNP permite visualizar indicadores territoriales comparables para municipios y departamentos, lo que facilita comprender estas diferencias y construir diagnósticos subregionales (DNP, 2026). Así, la personalización colectiva surge como una respuesta a territorios que no requieren el mismo portafolio, sino rutas diferenciadas de desarrollo humano."
        ],
        "presente": [
          "En las nueve subregiones, la situación actual exige personalización contextualizada. Valle de Aburrá demanda experiencias digitales, servicios preventivos y bienestar urbano; Oriente requiere respuestas asociadas a crecimiento poblacional, vivienda, empleo y movilidad; Urabá necesita rutas para juventud, formación, empleabilidad y cohesión social; Bajo Cauca, Nordeste y Magdalena Medio requieren modelos de resiliencia, inclusión productiva y protección social; Norte, Occidente y Suroeste necesitan atención de proximidad, envejecimiento, ruralidad, cuidado y acceso a oportunidades. TerriData facilita comparar indicadores municipales y regionales, mientras la ECV del DANE permite caracterizar condiciones de vida de hogares en dimensiones sociales relevantes (DNP, 2026; DANE, 2025). Por ello, el ecosistema personalizado debe operar como una red adaptable, no como una oferta única distribuida de forma homogénea."
        ],
        "futuro": [
          "En las nueve subregiones, las proyecciones deben reconocer que la hiperpersonalización requiere escala y contexto al mismo tiempo. Valle de Aburrá podrá avanzar hacia plataformas digitales de autogestión y bienestar predictivo; Oriente necesitará rutas integradas para familias, empleo y urbanización; Urabá requerirá ecosistemas de movilidad social y empleabilidad; Bajo Cauca, Nordeste y Magdalena Medio demandarán modelos de acompañamiento psicosocial, formación e inclusión productiva; Norte, Occidente y Suroeste exigirán soluciones híbridas para cuidado, envejecimiento, ruralidad y acceso. TerriData ofrece indicadores estandarizados para entidades territoriales, lo que permite construir tableros comparables de brechas y oportunidades (DNP, 2026). En consecuencia, el futuro del factor dependerá de articular tecnología, comunidad e institucionalidad para personalizar sin fragmentar."
        ]
      }
    },
    "sintesis": [
      "El ecosistema colectivo de bienestar personalizado será una señal estratégica para transformar las cajas de compensación en plataformas humano-céntricas, preventivas y territorialmente inteligentes. Su consolidación exigirá integrar datos, servicios, aliados y rutas de atención alrededor de trayectorias de vida, sin reducir la personalización a segmentación comercial. En Colombia, la información del Sistema de Subsidio Familiar y del DANE permitirá anticipar necesidades; en Antioquia, la lectura subregional será decisiva para contextualizar respuestas. Por tanto, el futuro del factor dependerá de combinar hiperpersonalización, inteligencia colectiva, autogestión y presencia territorial para generar bienestar integral sostenible (CEPAL, 2024; OECD, 2025; DANE, 2025)."
    ],
    "fuentes": [
      {
        "nombre": "Superintendencia del Subsidio Familiar – Datos Abiertos Colombia",
        "descripcion": [
          "Empresas afiliadas, trabajadores afiliados, beneficiarios y población del Sistema de Subsidio Familiar desde 2019.",
          "[Población del Sistema de Subsidio Familiar Consolidado]. Disponible en: https://www.datos.gov.co/Trabajo/Poblaci-n-del-Sistema-de-Subsidio-Familiar-Consoli/ese3-e6sh/about_data"
        ]
      },
      {
        "nombre": "DANE – Encuesta Nacional de Calidad de Vida",
        "descripcion": [
          "Condiciones de vivienda, salud, educación, cuidado, TIC, bienes del hogar y percepción de condiciones de vida.",
          "Encuesta Nacional de Calidad de Vida. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/salud/calidad-de-vida-ecv/encuesta-nacional-de-calidad-de-vida-ecv-2025?utm_source"
        ]
      },
      {
        "nombre": "DNP – TerriData",
        "descripcion": [
          "Indicadores municipales, departamentales y regionales sobre población, pobreza, salud, educación, economía, vivienda y desarrollo territorial.",
          "TerriData DNP. Disponible en: https://terridata.dnp.gov.co/?utm_source"
        ]
      },
      {
        "nombre": "Gobernación de Antioquia – Encuesta de Calidad de Vida / Antioquia Datos",
        "descripcion": [
          "Información de hogares, municipios y subregiones de Antioquia; condiciones sociales, calidad de vida y brechas territoriales.",
          "Encuesta de Calidad de Vida Antioquia 2025. Disponible en: https://www.antioquia.gov.co/index.php/antioquiacuenta/antioquia-avanza-con-la-encuesta-de-calidad-de-vida-2025-para-fortalecer-la-planificacion-social-y-territorial-del-departamento?utm_source"
        ]
      },
      {
        "nombre": "ASOCAJAS",
        "descripcion": [
          "Boletines sobre afiliados, empleadores, aportes, independientes, dinámica del sistema y comportamiento del mercado laboral vinculado a cajas.",
          "Boletines del Sistema de Compensación Familiar. Disponible en: https://asocajas.org.co/wp-content/uploads/2025/07/31.-Boletin-empleo-Caja-de-resonancia_marzo-2025.pdf?utm_source"
        ]
      }
    ]
  },
  f8: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica principalmente como una tendencia estructural, porque expresa una trayectoria histórica, institucional y ética consolidada: la solidaridad ha sido la base redistributiva de la compensación familiar y ha evolucionado hacia corresponsabilidad, equidad territorial, cohesión social y valor público. Sin embargo, también contiene hechos portadores de futuro, como la medición de confianza colectiva, cooperación multisectorial, solidaridad intergeneracional, ecosistemas colaborativos de bienestar e inteligencia social aplicada a la equidad."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "A nivel global, la esencia solidaria surgió vinculada a la expansión de los Estados de bienestar, la ciudadanía social y los mecanismos redistributivos orientados a proteger a las personas frente a riesgos económicos, familiares, laborales y sociales. En esta trayectoria, la solidaridad dejó de ser únicamente un valor moral y se convirtió en principio organizador de instituciones, políticas públicas y sistemas de protección. Marshall (1998) planteó que la ciudadanía social implica garantizar condiciones mínimas de bienestar y seguridad, mientras Sen (1999) amplió la discusión al señalar que el desarrollo debe medirse por las capacidades reales de las personas para vivir con libertad y dignidad. En América Latina, la CEPAL ha insistido en que la protección social debe avanzar hacia sistemas universales, integrales, sostenibles y resilientes para enfrentar desigualdades históricas y riesgos emergentes (CEPAL, 2024)."
        ],
        "presente": [
          "Actualmente, la esencia solidaria conserva vigencia global porque las sociedades enfrentan desigualdad, envejecimiento, informalidad, precarización laboral, crisis climática, migración y debilitamiento de la confianza colectiva. La CEPAL advierte que América Latina y el Caribe enfrenta una estructura de riesgos en reconfiguración, lo que exige fortalecer sistemas de protección social universales, integrales, sostenibles y resilientes (CEPAL, 2024). De forma más reciente, el Panorama Social 2025 señala que la región permanece atrapada en una combinación de alta desigualdad, baja movilidad social y débil cohesión social (CEPAL, 2025). En este contexto, la solidaridad deja de ser un legado histórico y se convierte en una condición de sostenibilidad democrática, institucional y social. Por tanto, las organizaciones de bienestar deben demostrar que su acción genera confianza, inclusión, cooperación y valor público compartido."
        ],
        "futuro": [
          "Hacia el futuro, la esencia solidaria tenderá a evolucionar desde una lógica redistributiva tradicional hacia modelos de corresponsabilidad, cooperación multisectorial y generación de valor público. En el mundo, los sistemas de bienestar estarán presionados por envejecimiento, automatización, desigualdad, migraciones, transición climática y nuevas formas de vulnerabilidad. La CEPAL plantea que la región requiere sistemas de protección social capaces de responder a riesgos cambiantes, con sostenibilidad e integralidad (CEPAL, 2024). De manera prospectiva, la solidaridad deberá medirse no solo por transferencias o cobertura, sino por cohesión social, confianza, inclusión efectiva, movilidad social y capacidad colectiva para sostener bienestar. En consecuencia, la solidaridad del futuro será menos asistencialista y más habilitadora: orientada a fortalecer capacidades humanas, vínculos comunitarios y responsabilidad compartida entre Estado, empresas, organizaciones sociales y ciudadanía."
        ]
      },
      "colombia": {
        "pasado": [
          "En Colombia, la retrospectiva de la esencia solidaria está directamente asociada con la creación y consolidación del subsidio familiar. La Ley 21 de 1982 definió el subsidio familiar como una prestación social pagadera en dinero, especie y servicios, orientada al alivio de las cargas económicas que representa el sostenimiento de la familia (Congreso de Colombia, 1982). Esta arquitectura permitió que empleadores, trabajadores y cajas de compensación configuraran un mecanismo redistributivo sustentado en aportes parafiscales y orientado a trabajadores de medianos y menores ingresos. Con el tiempo, la solidaridad se amplió desde la cuota monetaria hacia servicios de educación, recreación, vivienda, cultura, empleo, protección al cesante y bienestar familiar. Por ello, el sistema de compensación familiar se consolidó como una expresión institucional de corresponsabilidad social, en la cual el bienestar individual se conecta con la acción colectiva."
        ],
        "presente": [
          "En Colombia, la esencia solidaria se expresa hoy en un sistema de compensación familiar que sigue redistribuyendo recursos desde el empleo formal hacia trabajadores, beneficiarios y familias con mayores necesidades. La Superintendencia del Subsidio Familiar publica boletines estadísticos trimestrales que permiten analizar afiliados, empresas, aportes, subsidios y servicios del sistema, facilitando comparaciones y seguimiento de tendencias (Superintendencia del Subsidio Familiar, 2025). A su vez, el DANE calcula y publica las mediciones oficiales de pobreza monetaria y pobreza multidimensional, fundamentales para comprender el contexto social sobre el cual actúa la solidaridad institucional (DANE, 2026). Aunque Colombia ha mostrado avances recientes en reducción de pobreza, persisten brechas de ingresos, territorio, ruralidad e informalidad. Por ello, las cajas enfrentan el reto de mantener su vocación solidaria mientras amplían pertinencia, cobertura y sostenibilidad social."
        ],
        "futuro": [
          "En Colombia, las proyecciones del factor estarán condicionadas por el comportamiento del empleo formal, la desigualdad, la pobreza, la composición de los hogares y la legitimidad social del sistema de compensación. Las series de pobreza y desigualdad del DANE permiten observar avances y rezagos, mientras las estadísticas de la Superintendencia del Subsidio Familiar permiten monitorear afiliados, beneficiarios, empresas y servicios (DANE, 2026; Superintendencia del Subsidio Familiar, 2025). A futuro, las cajas deberán fortalecer esquemas de solidaridad más inteligentes: subsidios focalizados, servicios diferenciales, alianzas territoriales, medición de impacto, apoyo a trabajadores independientes y estrategias de inclusión para hogares con mayores cargas económicas. Así, la esencia solidaria podrá renovarse si logra conectar redistribución, sostenibilidad financiera y desarrollo humano integral, evitando quedar reducida a una función compensatoria tradicional."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, la esencia solidaria se materializó en la construcción de una oferta social orientada a reducir brechas y ampliar oportunidades para trabajadores, familias y comunidades. El departamento, históricamente caracterizado por una fuerte base empresarial en el Valle de Aburrá y profundas diferencias subregionales, exigió que la solidaridad no se limitara al traslado monetario, sino que se expresara en acceso a servicios, presencia institucional y redistribución territorial. La Gobernación de Antioquia consolida información mediante el Anuario Estadístico, la Encuesta de Calidad de Vida, cuentas económicas y fichas municipales, instrumentos que permiten observar desigualdades sociales, económicas y territoriales (Gobernación de Antioquia, 2025). En ese marco, la solidaridad se convirtió en una capacidad para conectar recursos, población afiliada, servicios sociales y necesidades territoriales diversas, especialmente en contextos de ruralidad, informalidad y vulnerabilidad."
        ],
        "presente": [
          "En Antioquia, el presente del factor se relaciona con la capacidad de sostener una oferta de bienestar que equilibre eficiencia institucional y redistribución social. La solidaridad no solo se mide por subsidios entregados, sino por la posibilidad de ampliar acceso a recreación, educación, cultura, empleabilidad, vivienda, cuidado, salud mental y fortalecimiento familiar. Antioquia presenta territorios con distintos niveles de desarrollo, formalización y acceso a servicios; por tanto, la esencia solidaria exige priorización territorial y enfoque diferencial. La información departamental disponible en Antioquia Datos y en los instrumentos estadísticos de la Gobernación permite analizar brechas y orientar decisiones públicas e institucionales (Gobernación de Antioquia, 2025). Para Comfenalco Antioquia, esto implica traducir la solidaridad en modelos de bienestar que lleguen de manera proporcional a quienes más enfrentan privaciones, aislamiento o menor acceso a oportunidades."
        ],
        "futuro": [
          "En Antioquia, la tendencia apunta hacia una solidaridad territorialmente estratégica. Esto significa orientar recursos, servicios y alianzas según brechas subregionales, capacidades locales y trayectorias de vida de las familias. La información de Antioquia Datos, el Anuario Estadístico y la Encuesta de Calidad de Vida puede servir para identificar dónde se concentran privaciones, envejecimiento, ruralidad, informalidad, barreras educativas o déficit de acceso a servicios (Gobernación de Antioquia, 2025). En este horizonte, Comfenalco Antioquia podría fortalecer modelos de solidaridad activa: rutas integrales para hogares vulnerables, fondos de innovación social, redes de cuidado, programas de cohesión comunitaria, empleabilidad inclusiva y servicios diferenciales por subregión. De este modo, la esencia solidaria se proyecta como una capacidad institucional para anticipar desigualdades, no solo para responder a ellas cuando ya se han profundizado."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las nueve subregiones de Antioquia, la retrospectiva evidencia que la solidaridad tuvo expresiones diferenciadas. Valle de Aburrá concentró mayor empleo formal, afiliación y capacidad de financiación; Oriente y Suroeste combinaron dinámicas productivas con necesidades familiares y comunitarias; Urabá mostró potencial económico, pero también importantes brechas sociales; Bajo Cauca, Nordeste y Magdalena Medio demandaron solidaridad institucional frente a conflictividad, pobreza e informalidad; mientras Norte y Occidente requirieron esquemas de proximidad por ruralidad, dispersión y envejecimiento. TerriData del DNP permite consultar indicadores municipales y departamentales que ayudan a reconstruir estas diferencias territoriales (DNP, 2026). Así, la esencia solidaria en Antioquia no puede entenderse como un principio abstracto, sino como una práctica territorial que busca equilibrar capacidades institucionales, necesidades humanas y equidad subregional."
        ],
        "presente": [
          "En las nueve subregiones, la esencia solidaria se manifiesta actualmente como necesidad de equidad territorial. Valle de Aburrá demanda servicios urbanos, especializados y de alta escala; Oriente requiere respuestas frente a crecimiento poblacional, vivienda y empleo; Urabá necesita inclusión social, juventud, empleabilidad y cohesión comunitaria; Bajo Cauca, Nordeste y Magdalena Medio requieren protección, resiliencia y reconstrucción de confianza; Norte, Occidente y Suroeste exigen cercanía institucional, cuidado, ruralidad y envejecimiento. TerriData permite comparar indicadores municipales y regionales, mientras las estadísticas del sistema de subsidio familiar permiten identificar población afiliada, empresas y beneficiarios (DNP, 2026; Superintendencia del Subsidio Familiar, 2024). Así, la solidaridad contemporánea debe operar como una red territorial de corresponsabilidad, capaz de distribuir oportunidades según necesidades diferenciadas y no solo según concentración de demanda."
        ],
        "futuro": [
          "En las nueve subregiones, las proyecciones muestran que la solidaridad deberá adoptar formas más flexibles y contextualizadas. Valle de Aburrá podrá avanzar hacia solidaridad urbana, salud mental, bienestar laboral y acceso cultural; Oriente requerirá equilibrio entre crecimiento económico y cohesión social; Urabá necesitará inclusión productiva, juventud y movilidad social; Bajo Cauca, Nordeste y Magdalena Medio demandarán confianza, resiliencia comunitaria y reconstrucción de tejido social; Norte, Occidente y Suroeste requerirán solidaridad intergeneracional, cuidado, ruralidad y acceso a oportunidades. TerriData permite construir tableros territoriales para identificar brechas y priorizar intervenciones (DNP, 2026). Por ello, la esencia solidaria futura deberá funcionar como un principio de diseño institucional: asignar recursos, adaptar servicios y articular actores para producir equidad territorial y sostenibilidad humana."
        ]
      }
    },
    "sintesis": [
      "La esencia solidaria seguirá siendo el núcleo ético e institucional de la compensación familiar, pero deberá renovarse para responder a desigualdad, informalidad, fragmentación social y brechas territoriales. Su futuro dependerá de pasar de una solidaridad centrada en subsidios hacia una corresponsabilidad activa, medible y territorializada. En Colombia, las estadísticas del sistema y las mediciones de pobreza permiten orientar decisiones redistributivas; en Antioquia, la lectura subregional será clave para priorizar poblaciones y servicios. Así, la solidaridad prospectiva deberá producir cohesión, confianza, equidad territorial y desarrollo humano integral sostenible (CEPAL, 2024; DANE, 2026; Superintendencia del Subsidio Familiar, 2025)."
    ],
    "fuentes": [
      {
        "nombre": "Superintendencia del Subsidio Familiar",
        "descripcion": [
          "Boletines, anuarios, cuadros estadísticos y series históricas sobre afiliados, beneficiarios, empresas, subsidios, servicios y aportes del Sistema de Subsidio Familiar.",
          "SuperSubsidio. Disponible en: https://www.ssf.gov.co/informaci%C3%B3n-de-las-cajas-de-compensaci%C3%B3n-familiar2?utm_source"
        ]
      },
      {
        "nombre": "Datos Abiertos Colombia – SuperSubsidio",
        "descripcion": [
          "Bases de población del Sistema de Subsidio Familiar: empresas afiliadas, trabajadores afiliados, beneficiarios y registros desde 2019/2024 según conjunto disponible.",
          "Datos abiertos. Disponible en: https://www.datos.gov.co/Trabajo/Poblaci-n-Sistema-del-Subsidio-Familiar/gim6-e69u/about_data"
        ]
      },
      {
        "nombre": "DANE – Pobreza y desigualdad",
        "descripcion": [
          "Pobreza monetaria, pobreza multidimensional, desigualdad, coeficiente de Gini, privaciones y condiciones socioeconómicas de los hogares.",
          "Pobreza y Desigualdad -DANE. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/pobreza-y-desigualdad?utm_source"
        ]
      },
      {
        "nombre": "DNP – TerriData",
        "descripcion": [
          "Indicadores municipales, departamentales y regionales sobre pobreza, población, educación, salud, vivienda, economía, finanzas territoriales y desarrollo.",
          "Disponible en: https://www.datos.gov.co/Trabajo/Poblaci-n-Sistema-del-Subsidio-Familiar/gim6-e69u/about_data"
        ]
      },
      {
        "nombre": "CEPAL – Panorama Social de América Latina y el Caribe",
        "descripcion": [
          "Indicadores regionales y análisis sobre desigualdad, protección social, cohesión social, movilidad social y desarrollo inclusivo.",
          "Disponible en: https://www.cepal.org/es/publicaciones/84175-panorama-social-america-latina-caribe-2025-como-salir-la-trampa-alta-desigualdad?utm_source"
        ]
      }
    ]
  },
  f9: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica como una tendencia estructural, porque refleja un cambio sostenido en la manera de entender la acción social: ya no basta con medir cobertura, subsidios entregados o población atendida, sino que se exige demostrar cambios reales, sostenibles y verificables en calidad de vida, capacidades humanas, movilidad social y cohesión comunitaria. Dentro de esta tendencia aparecen hechos portadores de futuro, como la medición predictiva de impacto, los modelos de bienestar regenerativo, la trazabilidad de resultados sociales, la inteligencia artificial aplicada a focalización social y los ecosistemas integrados de bienestar. Estas señales, si se consolidan, podrían transformar la forma como las cajas de compensación diseñan, ejecutan y evalúan su aporte social."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "A nivel global, el impacto social transformador evolucionó desde enfoques centrados en asistencia, caridad y cobertura básica hacia modelos orientados al desarrollo humano y la generación de cambios sostenibles en las condiciones de vida. Durante buena parte del siglo XX, las políticas sociales se enfocaron principalmente en satisfacer necesidades inmediatas relacionadas con alimentación, salud, educación y protección básica para poblaciones vulnerables. Aunque estos esfuerzos ampliaron coberturas y redujeron algunas carencias, progresivamente surgió la preocupación por comprender si las intervenciones generaban transformaciones estructurales y sostenibles. A partir de la década de 1990, el Programa de las Naciones Unidas para el Desarrollo impulsó una visión centrada en capacidades humanas, libertades y oportunidades, ampliando la comprensión tradicional del bienestar (PNUD, 1990). Posteriormente, organismos internacionales comenzaron a incorporar conceptos como inclusión social, movilidad social, cohesión comunitaria y desarrollo humano integral. Como resultado, el impacto social dejó de medirse únicamente por recursos invertidos o personas atendidas y empezó a evaluarse por los cambios reales producidos en individuos, familias y comunidades."
        ],
        "presente": [
          "En la actualidad, el impacto social transformador se ha consolidado como uno de los principales criterios para evaluar la efectividad de políticas públicas, organizaciones sociales, empresas y sistemas de bienestar. Las instituciones enfrentan una creciente exigencia de demostrar resultados verificables en calidad de vida, reducción de desigualdades, fortalecimiento comunitario y desarrollo humano sostenible. La Agenda 2030 y los Objetivos de Desarrollo Sostenible impulsaron una visión donde el progreso se mide a partir de transformaciones multidimensionales relacionadas con pobreza, salud, educación, igualdad, inclusión y sostenibilidad (Naciones Unidas, 2015). Paralelamente, el Banco Mundial y la OCDE han promovido metodologías que permiten evaluar resultados e impactos más allá de la simple ejecución de actividades o cobertura de servicios (Banco Mundial, 2023; OCDE, 2024). En consecuencia, el impacto social contemporáneo se entiende como la capacidad de generar cambios duraderos en capacidades humanas, cohesión social y bienestar colectivo, articulando dimensiones económicas, sociales, ambientales e institucionales."
        ],
        "futuro": [
          "Hacia las próximas décadas, el impacto social transformador evolucionará hacia modelos más predictivos, personalizados y orientados a la generación de valor social sostenible. El desarrollo de analítica avanzada, inteligencia artificial, medición en tiempo real y sistemas de información integrados permitirá comprender con mayor precisión cómo las intervenciones afectan las trayectorias de vida de las personas y las dinámicas de las comunidades. Organismos internacionales proyectan que los sistemas de bienestar deberán responder simultáneamente a desafíos asociados con envejecimiento poblacional, cambio climático, transformación tecnológica, migraciones y nuevas desigualdades sociales (ONU, 2024). En este escenario, el impacto social será evaluado no solo por sus efectos inmediatos, sino por su capacidad para fortalecer resiliencia, autonomía, cohesión comunitaria y sostenibilidad intergeneracional. Asimismo, emergerán enfoques regenerativos que buscarán restaurar capacidades sociales y territoriales, promoviendo ecosistemas de bienestar capaces de producir transformaciones estructurales, inclusivas y sostenibles en contextos cada vez más complejos y cambiantes."
        ]
      },
      "colombia": {
        "pasado": [
          "Durante varias décadas, el impacto social en Colombia se entendió principalmente desde la cobertura de programas, la protección básica y la compensación de carencias materiales. En ese marco, la acción institucional buscaba ampliar acceso a salud, educación, vivienda, recreación, empleo y subsidios, especialmente para hogares trabajadores y poblaciones vulnerables. Con el tiempo, el país avanzó hacia mediciones más complejas de bienestar, superando la lectura exclusivamente monetaria de la pobreza. El DANE consolidó mediciones como pobreza monetaria, pobreza multidimensional y Encuesta Nacional de Calidad de Vida, esta última orientada a caracterizar vivienda, salud, educación, cuidado, TIC y percepción de condiciones de vida de los hogares (Departamento Administrativo Nacional de Estadística [DANE], s. f.). Así, la noción de impacto pasó de verificar atención institucional a valorar transformaciones más amplias en capacidades humanas, trayectorias de inclusión y condiciones efectivas de bienestar."
        ],
        "presente": [
          "Hoy, el impacto social transformador se ubica en el centro de la discusión pública porque Colombia ha mejorado algunos indicadores sociales, pero conserva desigualdades persistentes. En 2025, la pobreza multidimensional nacional fue de 9,9 %, frente a 11,5 % en 2024, lo que representa una reducción de 1,6 puntos porcentuales y confirma avances en condiciones de vida (DANE, 2026). Aun así, la medición multidimensional evidencia que el bienestar depende simultáneamente de educación, niñez, salud, trabajo, vivienda y servicios públicos. Además, la Encuesta Nacional de Calidad de Vida permite observar variables relacionadas con tenencia de bienes, acceso a servicios, cuidado, TIC y percepción del hogar (DANE, s. f.). Por ello, el reto actual no es únicamente reducir privaciones, sino demostrar impactos sostenidos, medibles y diferenciales en desarrollo humano, movilidad social y cohesión comunitaria."
        ],
        "futuro": [
          "De cara al futuro, el impacto social tenderá a medirse menos por actividades ejecutadas y más por cambios verificables en capacidades, autonomía, bienestar subjetivo, movilidad social y resiliencia territorial. El Informe Nacional de Desarrollo Humano 2024 plantea que Colombia enfrenta una agenda territorial pendiente, pues los avances económicos y sociales coexisten con desigualdades heredadas que limitan la posibilidad de vivir una vida digna, plena y en libertad (Programa de las Naciones Unidas para el Desarrollo [PNUD], 2024). Esta perspectiva empuja a las instituciones sociales a incorporar enfoques de desarrollo humano, equidad territorial y sostenibilidad. En el sistema de compensación familiar, la tendencia será demostrar valor social con indicadores de resultado, trazabilidad de trayectorias familiares y evaluación de impacto en dimensiones como ingresos, educación, salud, empleo, cuidado, vivienda y cohesión social."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, la comprensión del impacto social estuvo inicialmente asociada a la ampliación de infraestructura, programas sociales, servicios educativos, recreativos, culturales y de protección para trabajadores, familias y comunidades. Sin embargo, las diferencias entre Medellín, el Valle de Aburrá y las demás subregiones evidenciaron que la cobertura no garantizaba por sí sola transformación social. La Dirección de Estadísticas e Indicadores de Antioquia dispone del Anuario Estadístico, la Encuesta de Calidad de Vida, las cuentas económicas departamentales y fichas municipales, instrumentos que permitieron observar brechas territoriales y orientar mejores decisiones públicas (Gobernación de Antioquia, s. f.). De esta manera, el departamento empezó a transitar desde una lógica de prestación de servicios hacia una lectura más integral del bienestar, incorporando variables de pobreza, educación, empleo, ingresos, vivienda, salud, seguridad y capacidades territoriales."
        ],
        "presente": [
          "En Antioquia, el impacto social transformador se expresa actualmente en la necesidad de convertir información territorial en decisiones efectivas de bienestar. El departamento cuenta con fuentes robustas como la Encuesta de Calidad de Vida, el Anuario Estadístico y las fichas municipales, que permiten analizar condiciones sociales, económicas y territoriales (Gobernación de Antioquia, s. f.). Además, la Encuesta de Calidad de Vida 2025 fue diseñada para aplicarse en 70.779 hogares de las nueve subregiones, incluyendo barrios, comunas, corregimientos y veredas de los 125 municipios, lo que fortalece la planeación social territorial (Gobernación de Antioquia, 2025). Para una caja de compensación, esta disponibilidad de datos abre la posibilidad de pasar de servicios aislados a portafolios integrados de impacto, capaces de incidir en empleo, educación, salud, recreación, vivienda, cuidado, inclusión y fortalecimiento comunitario."
        ],
        "futuro": [
          "En Antioquia, la proyección del factor apunta hacia modelos de impacto social basados en inteligencia territorial, analítica de datos y articulación ecosistémica. La disponibilidad de estadísticas departamentales, municipales y subregionales permite construir líneas base, identificar brechas y evaluar cambios en condiciones de vida. A esto se suma la posibilidad de usar información del sistema de subsidio familiar, cuyas series históricas reportan estadísticas mensuales desde 2020 sobre población, infraestructura, recurso humano y coberturas de las cajas de compensación (Superintendencia del Subsidio Familiar [SSF], s. f.). En perspectiva, Comfenalco Antioquia podría avanzar hacia tableros de impacto que integren cobertura, satisfacción, permanencia, movilidad social y mejora objetiva de condiciones de vida. Así, el impacto dejaría de ser un reporte posterior para convertirse en una capacidad anticipatoria de gestión social."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las nueve subregiones de Antioquia, la trayectoria del impacto social revela que las transformaciones no han ocurrido con la misma intensidad ni velocidad. El Valle de Aburrá acumuló mayores capacidades institucionales, empresariales y de servicios; Oriente fortaleció dinámicas productivas y de calidad de vida; Urabá combinó oportunidades logísticas y agroexportadoras con retos sociales; mientras Bajo Cauca, Nordeste, Magdalena Medio, Norte, Occidente y Suroeste presentaron desafíos diferenciados en pobreza, empleo, conectividad, ruralidad y acceso institucional. Antioquia Cómo Vamos ha señalado que, a partir de la Encuesta de Calidad de Vida Departamental de 2021, la Gobernación calculó pobreza monetaria, multidimensional y NBI para subregiones y municipios, facilitando la identificación de privaciones territoriales (Antioquia Cómo Vamos, 2023). En consecuencia, el impacto social comenzó a entenderse como transformación situada, no como resultado homogéneo."
        ],
        "presente": [
          "En las subregiones, el presente del impacto social es profundamente diferencial. Los informes de dinámica laboral de Comfenalco Antioquia y Antioquia Cómo Vamos muestran que las subregiones tienen estructuras económicas, laborales y sociales distintas, y que los análisis utilizan como fuentes principales la Encuesta de Calidad de Vida Departamental y el Servicio Público de Empleo (Comfenalco Antioquia & Antioquia Cómo Vamos, 2025). Esto permite reconocer que el impacto social en Oriente no se mide igual que en Bajo Cauca, Urabá, Nordeste u Occidente. Mientras unos territorios requieren sofisticar servicios para responder a crecimiento económico y urbano, otros demandan inclusión productiva, fortalecimiento institucional, cohesión comunitaria y acceso básico. En este escenario, el impacto transformador exige segmentar poblaciones, priorizar brechas, medir resultados por ciclo de vida y articular actores públicos, privados y comunitarios."
        ],
        "futuro": [
          "En las subregiones, las tendencias sugieren que el impacto social transformador deberá adaptarse a vocaciones territoriales, riesgos sociales y capacidades comunitarias específicas. TerriData, del DNP, facilita la visualización de estadísticas e indicadores territoriales, lo cual permite comparar municipios y orientar intervenciones en educación, salud, economía, gobierno, conflicto y características generales (Departamento Nacional de Planeación [DNP], s. f.). Con esa base, el Valle de Aburrá podría priorizar salud mental, envejecimiento, movilidad social y empleo formal; Oriente, equilibrio entre crecimiento y bienestar; Urabá, integración logística con inclusión social; Bajo Cauca y Nordeste, reconstrucción de tejido comunitario; y Suroeste, Occidente, Norte y Magdalena Medio, ruralidad, conectividad y desarrollo productivo. A futuro, el impacto social será más robusto si combina datos, presencia institucional y corresponsabilidad comunitaria."
        ]
      }
    },
    "sintesis": [
      "El Impacto Social Transformador representa el paso de una gestión social centrada en cobertura hacia una gestión orientada a cambios profundos, medibles y sostenibles en la vida de las personas. En adelante, su relevancia dependerá de integrar datos, enfoque territorial, desarrollo humano, evaluación de resultados y sostenibilidad social. Colombia cuenta con mediciones oficiales de pobreza y calidad de vida del DANE, estadísticas territoriales del DNP y series del sistema de subsidio familiar de la SSF, que permiten construir trazabilidad del bienestar (DANE, 2026; DNP, s. f.; SSF, s. f.). Para Comfenalco Antioquia, este factor es clave para demostrar valor social real."
    ],
    "fuentes": [
      {
        "nombre": "DANE – Pobreza multidimensional",
        "descripcion": [
          "Incidencia de pobreza multidimensional, privaciones por educación, niñez, salud, trabajo, vivienda y servicios públicos.",
          "Consulta y descarga de boletines, presentaciones y anexos oficiales. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/pobreza-multidimensional?utm_source"
        ]
      },
      {
        "nombre": "DANE – Encuesta Nacional de Calidad de Vida, ECV",
        "descripcion": [
          "Condiciones de vivienda, salud, educación, cuidado, TIC, tenencia de bienes y percepción de condiciones de vida.",
          "Microdatos y documentación oficial disponibles en el catálogo del DANE. Disponible en: https://microdatos.dane.gov.co/index.php/catalog/861?utm_source"
        ]
      },
      {
        "nombre": "DNP – TerriData",
        "descripcion": [
          "Indicadores municipales y departamentales en educación, salud, economía, población, conflicto, buen gobierno y características territoriales.",
          "Plataforma oficial de estadísticas territoriales del DNP. Disponible en: https://terridata.dnp.gov.co/?utm_source"
        ]
      },
      {
        "nombre": "Gobernación de Antioquia – Dirección de Estadísticas e Indicadores",
        "descripcion": [
          "Anuario Estadístico, Encuesta de Calidad de Vida, cuentas económicas departamentales y fichas municipales.",
          "Portal oficial de estadísticas e indicadores de Antioquia. Disponible en: https://www.antioquia.gov.co/index.php/informacion/estadisticas-e-indicadores?utm_source"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar – Estadísticas del Sistema de Subsidio Familiar",
        "descripcion": [
          "Anuarios, boletines, cuadros estadísticos y series históricas sobre población, infraestructura, recurso humano y coberturas.",
          "Estadísticas y series históricas oficiales del sistema. Disponible en: https://www.ssf.gov.co/informaci%C3%B3n-de-las-cajas-de-compensaci%C3%B3n-familiar2?utm_source"
        ]
      }
    ]
  },
  f10: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Corresponde principalmente a una tendencia, debido a que evidencia una evolución sostenida desde modelos tradicionales de coordinación institucional hacia esquemas más complejos de articulación multisectorial. Esta transformación puede observarse en organismos internacionales, gobiernos nacionales, territorios y organizaciones sociales que han incorporado progresivamente mecanismos de cooperación, corresponsabilidad y construcción colectiva de valor público para afrontar desafíos asociados al bienestar, la sostenibilidad y el desarrollo humano integral. No obstante, dentro de esta tendencia emergen diversos hechos portadores de futuro, particularmente relacionados con la consolidación de ecosistemas inteligentes de bienestar, plataformas digitales de gobernanza colaborativa, inteligencia colectiva aplicada a la toma de decisiones y redes territoriales de innovación social. Estas señales aún presentan niveles variables de maduración, pero de consolidarse podrían generar transformaciones profundas en la manera como las instituciones diseñan, implementan y evalúan políticas y programas de bienestar."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "La gobernanza colaborativa surge internacionalmente como respuesta a las limitaciones de los modelos jerárquicos tradicionales de gestión pública. Desde finales del siglo XX, organismos multilaterales promovieron esquemas de gobernanza que involucraran gobiernos, sector privado y sociedad civil en la solución de problemas complejos de desarrollo. La literatura sobre gobernanza destacó que la cooperación interinstitucional permitía generar mayor legitimidad, eficiencia y sostenibilidad en las políticas públicas (Rhodes, 1996; Kooiman, 2003). Posteriormente, la Agenda 2030 de Naciones Unidas consolidó la importancia de las alianzas multiactor como condición para alcanzar los Objetivos de Desarrollo Sostenible (ONU, 2015)."
        ],
        "presente": [
          "Actualmente, la gobernanza colaborativa se reconoce como una estrategia esencial para abordar problemas complejos que superan las capacidades individuales de gobiernos u organizaciones. A nivel mundial, organismos como la OCDE y Naciones Unidas promueven modelos de gobernanza multinivel que integran actores públicos, privados, académicos y comunitarios para generar soluciones sostenibles (OCDE, 2024; ONU, 2024). La creciente complejidad derivada del cambio climático, la transformación digital y las dinámicas demográficas ha fortalecido la necesidad de construir capacidades colectivas de respuesta."
        ],
        "futuro": [
          "Las tendencias internacionales indican que la gobernanza colaborativa evolucionará hacia modelos más abiertos, inteligentes y basados en datos. La integración de inteligencia artificial, plataformas digitales de participación y mecanismos de innovación abierta permitirá fortalecer procesos de toma de decisiones compartidas y construcción colectiva de soluciones (OCDE, 2024). Simultáneamente, la creciente complejidad de los desafíos globales exigirá mayores niveles de cooperación entre sectores tradicionalmente desconectados."
        ]
      },
      "colombia": {
        "pasado": [
          "Esta evolución estuvo asociada a los procesos de descentralización impulsados por la Constitución Política de 1991, los cuales fortalecieron la participación ciudadana y promovieron nuevas formas de articulación entre Estado, sector privado y organizaciones comunitarias. Asimismo, las cajas de compensación familiar ampliaron progresivamente su papel como articuladoras de programas sociales y bienestar colectivo."
        ],
        "presente": [
          "Los enfoques de desarrollo territorial, innovación pública y participación ciudadana han impulsado procesos de articulación institucional orientados a mejorar la eficiencia y el impacto social de las intervenciones. Asimismo, la política pública reconoce cada vez más la importancia de la corresponsabilidad entre diferentes sectores para alcanzar objetivos de bienestar y desarrollo humano sostenible"
        ],
        "futuro": [
          "Estas transformaciones impulsarán el fortalecimiento de ecosistemas de bienestar donde instituciones públicas, empresas, organizaciones sociales y ciudadanía compartan responsabilidades y recursos para generar impacto social sostenible (DNP, 2024). La colaboración dejará de ser una práctica complementaria para convertirse en una capacidad estratégica esencial."
        ]
      },
      "antioquia": {
        "pasado": [
          "La gobernanza colaborativa posee raíces históricas asociadas a una fuerte tradición de cooperación institucional, liderazgo empresarial y organización comunitaria. Durante varias décadas, entidades públicas, gremios económicos, universidades, organizaciones sociales y cajas de compensación desarrollaron mecanismos de coordinación orientados al fortalecimiento del desarrollo regional. Este proceso permitió consolidar experiencias exitosas de cooperación público-privada en ámbitos relacionados con educación, infraestructura, innovación y bienestar social (Gobernación de Antioquia, 2023). De manera simultánea, la consolidación de redes empresariales y comunitarias favoreció la generación de capital social y confianza institucional. Sin embargo, las dinámicas del conflicto armado y las desigualdades territoriales generaron diferencias significativas entre municipios y subregiones. A pesar de ello, Antioquia logró construir capacidades colaborativas superiores al promedio nacional, convirtiéndose en referente de articulación territorial y construcción colectiva de valor público"
        ],
        "presente": [
          "La gobernanza colaborativa constituye actualmente uno de los principales activos para impulsar la competitividad territorial y el bienestar social. Diversas iniciativas departamentales han fortalecido la articulación entre entidades gubernamentales, sector empresarial, universidades, organizaciones comunitarias y cooperación internacional. Asimismo, Medellín y varios municipios del Oriente antioqueño han desarrollado ecosistemas de innovación que promueven procesos de cocreación, participación y construcción colectiva de soluciones públicas (Gobernación de Antioquia, 2024). Sin embargo, persisten desafíos relacionados con la capacidad institucional de algunos municipios rurales, las brechas territoriales y la necesidad de fortalecer mecanismos permanentes de coordinación intersectorial. En este contexto, las cajas de compensación familiar continúan desempeñando un papel relevante como articuladoras de programas sociales y plataformas de conexión entre diversos actores del bienestar."
        ],
        "futuro": [
          "Las proyecciones sugieren una consolidación de ecosistemas territoriales basados en inteligencia colectiva, innovación social y cooperación interinstitucional. Las dinámicas de transformación tecnológica, envejecimiento poblacional y transición productiva demandarán mayores capacidades de articulación entre actores públicos y privados. De igual forma, la expansión de plataformas digitales facilitará mecanismos de participación ciudadana más amplios y permanentes, fortaleciendo la gobernanza multinivel (Gobernación de Antioquia, 2024). Las cajas de compensación familiar podrían ampliar su papel como nodos articuladores de redes de bienestar, integrando capacidades empresariales, comunitarias y gubernamentales para responder a nuevas necesidades sociales."
        ]
      },
      "subregiones": {
        "pasado": [
          "La gobernanza colaborativa evolucionó de manera diferenciada según las características sociales, económicas e institucionales de cada territorio. Mientras el Valle de Aburrá y el Oriente fortalecieron ecosistemas de cooperación apoyados por universidades, empresas y gobiernos locales, regiones como Bajo Cauca, Nordeste y Urabá enfrentaron mayores desafíos derivados de conflictos armados, economías ilícitas y limitaciones institucionales (PNUD, 2022). No obstante, durante las últimas dos décadas se consolidaron iniciativas de desarrollo territorial participativo, alianzas público-privadas y esquemas de planeación regional que fortalecieron la articulación entre actores. En este contexto, las cajas de compensación familiar ampliaron su presencia como plataformas de integración social, acercando servicios de educación, recreación, empleo y bienestar a diversos municipios. Estas experiencias contribuyeron a consolidar capacidades colaborativas que hoy constituyen una base fundamental para la construcción de ecosistemas territoriales de desarrollo humano integral."
        ],
        "presente": [
          "Presentan actualmente distintos niveles de madurez en materia de gobernanza colaborativa. Mientras algunos territorios han consolidado redes de cooperación robustas, otros continúan fortaleciendo capacidades institucionales básicas para promover la articulación entre actores locales. En regiones como Urabá y Bajo Cauca, los Programas de Desarrollo con Enfoque Territorial han impulsado escenarios de diálogo y construcción conjunta entre comunidades, gobiernos y organizaciones sociales (Agencia de Renovación del Territorio, 2024). Paralelamente, el Valle de Aburrá continúa fortaleciendo esquemas metropolitanos de cooperación institucional orientados al desarrollo sostenible. En términos generales, la gobernanza colaborativa se ha convertido en un mecanismo estratégico para movilizar recursos, generar innovación social y fortalecer la cohesión territorial en contextos cada vez más complejos."
        ],
        "futuro": [
          "las tendencias apuntan hacia la consolidación de redes colaborativas capaces de integrar conocimiento, recursos y capacidades para enfrentar desafíos complejos de desarrollo humano. Se prevé que las subregiones con mayores niveles de cooperación institucional logren adaptarse con mayor eficacia a transformaciones económicas, tecnológicas y ambientales (PNUD, 2023). Asimismo, la gobernanza basada en datos, la participación digital y los modelos de innovación abierta fortalecerán la capacidad de respuesta territorial. En consecuencia, la articulación institucional dejará de ser un mecanismo operativo para convertirse en un activo estratégico que permitirá construir ecosistemas inteligentes de bienestar con impacto multidimensional y sostenibilidad de largo plazo."
        ]
      }
    },
    "sintesis": [
      "La gobernanza colaborativa del bienestar se proyecta como uno de los pilares fundamentales para la sostenibilidad de los sistemas de desarrollo humano durante las próximas décadas. En un contexto caracterizado por incertidumbre, complejidad y aceleradas transformaciones tecnológicas, las capacidades de articulación institucional, inteligencia colectiva y cooperación territorial adquirirán una relevancia creciente. Asimismo, la consolidación de ecosistemas colaborativos permitirá movilizar recursos, fortalecer la innovación social y generar respuestas más integrales a las necesidades de la población. Por ello, las organizaciones que logren construir redes sólidas de cooperación estarán mejor posicionadas para liderar procesos de bienestar sostenible y desarrollo territorial inteligente"
    ],
    "fuentes": [
      {
        "nombre": "Departamento Nacional de Planeación (DNP)",
        "descripcion": [
          "Información sobre gobernanza territorial, desempeño institucional, participación ciudadana, articulación interinstitucional, planeación territorial, seguimiento a políticas públicas y desarrollo regional.",
          "Plataforma oficial de estadísticas territoriales del DNP. Disponible en: https://www.dnp.gov.co/"
        ]
      },
      {
        "nombre": "Departamento Administrativo Nacional de Estadística (DANE)",
        "descripcion": [
          "Indicadores sociodemográficos, participación ciudadana, cohesión social, calidad de vida, capital social y estadísticas territoriales.",
          "Página oficial DANE. Disponible en: https://www.dane.gov.co/"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar (Supersubsidio)",
        "descripcion": [
          "Cobertura, gestión institucional, alianzas estratégicas, programas sociales, indicadores de desempeño y reportes de las cajas de compensación familiar.",
          "Supersubsidio. Disponible en: https://www.ssf.gov.co/"
        ]
      },
      {
        "nombre": "Comisión Económica para América Latina y el Caribe (CEPAL)",
        "descripcion": [
          "Estudios sobre gobernanza, cohesión social, desarrollo territorial, alianzas para el desarrollo sostenible e innovación institucional.",
          "Publicaciones CEPA. Disponible en: https://www.cepal.org/"
        ]
      },
      {
        "nombre": "Organización para la Cooperación y el Desarrollo Económicos (OCDE)",
        "descripcion": [
          "Indicadores de gobernanza pública, confianza institucional, cooperación multinivel, innovación pública y capacidades estatales.",
          "Desarrollo Económicos OCDE. Disponible en: https://www.oecd.org/"
        ]
      }
    ]
  },
  f11: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "La legitimidad y confianza institucional corresponde principalmente a una tendencia, dado que su evolución ha sido observable durante décadas en los sistemas políticos, económicos y sociales del mundo. Su comportamiento evidencia trayectorias históricas asociadas con la consolidación democrática, la transparencia gubernamental, la participación ciudadana, el capital social y la calidad institucional. Asimismo, organismos internacionales como la OCDE, el Banco Mundial y CEPAL han venido monitoreando de forma sistemática la confianza ciudadana en las instituciones públicas y privadas como una variable estratégica para la gobernanza y el desarrollo sostenible (OCDE, 2024; Banco Mundial, 2024). No obstante, dentro de esta tendencia emergen hechos portadores de futuro, particularmente las señales débiles relacionadas con la adopción de gobiernos digitales, inteligencia artificial aplicada a la gestión pública, sistemas de transparencia algorítmica, participación ciudadana digital, medición de confianza en tiempo real y construcción de ecosistemas colaborativos territoriales. Si estas señales se consolidan, podrían transformar radicalmente las formas tradicionales mediante las cuales las instituciones construyen legitimidad y relacionamiento social durante las próximas décadas."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "Durante las últimas décadas, la legitimidad y confianza institucional se consolidaron como elementos fundamentales para el desarrollo económico, la cohesión social y la estabilidad democrática. Desde finales del siglo XX, los estudios sobre capital social evidenciaron que las sociedades con mayores niveles de confianza interpersonal e institucional lograban mejores resultados en gobernanza, crecimiento económico y bienestar colectivo. Putnam (1993) demostró que la capacidad de las instituciones para generar cooperación dependía en gran medida de la existencia de redes sociales sólidas y normas compartidas de reciprocidad. Posteriormente, el proceso de globalización fortaleció inicialmente la confianza en organismos internacionales y gobiernos nacionales; sin embargo, fenómenos como la crisis financiera de 2008, los escándalos de corrupción transnacional y el aumento de la polarización política comenzaron a erosionar progresivamente la credibilidad institucional. Como resultado, la legitimidad dejó de depender exclusivamente del cumplimiento normativo para incorporar dimensiones relacionadas con transparencia, participación ciudadana, rendición de cuentas y capacidad de respuesta frente a desafíos sociales complejos"
        ],
        "presente": [
          "En la actualidad, la legitimidad y la confianza institucional se encuentran en un proceso de transformación, marcado por mayores expectativas ciudadanas frente a la transparencia, la participación, la efectividad y la capacidad de respuesta de las instituciones. La confianza ya no se sustenta únicamente en la trayectoria o autoridad institucional, sino también en la experiencia de las personas, la coherencia entre las decisiones y las acciones, la apertura de la información y la capacidad de generar resultados con valor social. A su vez, la polarización, la desinformación, las brechas sociales y la percepción de respuestas institucionales insuficientes frente a problemas complejos tensionan los vínculos entre ciudadanía, Estado, empresas y organizaciones sociales. Paralelamente, la transformación digital está generando nuevas formas de interacción, participación y rendición de cuentas que modifican los mecanismos tradicionales de construcción de legitimidad. En este escenario, la confianza se consolida como un activo relacional estratégico para la gobernanza, la cohesión social y la construcción de bienestar, cuya sostenibilidad depende cada vez más de la capacidad institucional para escuchar, responder, demostrar resultados y construir relaciones colaborativas con los distintos actores del ecosistema."
        ],
        "futuro": [
          "Hacia las próximas décadas, la legitimidad y la confianza institucional continuarán consolidándose como factores críticos para la sostenibilidad del desarrollo humano. A nivel global, organismos internacionales proyectan una creciente demanda ciudadana por transparencia, participación digital, protección de datos y gobernanza basada en evidencia (ONU, 2024). Asimismo, la inteligencia artificial, la analítica de datos y las plataformas digitales transformarán la relación entre instituciones y ciudadanía"
        ]
      },
      "colombia": {
        "pasado": [
          "La evolución de la legitimidad institucional ha estado marcada por procesos históricos asociados al conflicto armado, la desigualdad territorial y los esfuerzos de fortalecimiento democrático. Durante buena parte del siglo XX, la confianza ciudadana se vio afectada por fenómenos como la violencia política, la expansión de economías ilícitas y la limitada presencia estatal en amplias zonas rurales. No obstante, la promulgación de la Constitución Política de 1991 impulsó mecanismos orientados a fortalecer la participación ciudadana, la descentralización administrativa y el control social sobre la gestión pública. Paralelamente, el Sistema de Subsidio Familiar consolidó un modelo singular de protección social sustentado en principios de solidaridad y corresponsabilidad empresarial. Las cajas de compensación familiar desarrollaron una relación cercana con trabajadores y comunidades, contribuyendo significativamente a la construcción de capital relacional y legitimidad social. A pesar de estos avances, diversos estudios continuaron identificando desafíos relacionados con la corrupción, la desconfianza política y las brechas institucionales existentes entre regiones urbanas y rurales."
        ],
        "presente": [
          "Las encuestas de cultura política evidencian niveles moderados de confianza hacia instituciones públicas, aunque persisten preocupaciones relacionadas con corrupción, eficiencia administrativa y representación política (DANE, 2024). En este contexto, entidades públicas y privadas han intensificado esfuerzos para fortalecer mecanismos de rendición de cuentas, innovación pública y participación social. Estas iniciativas buscan consolidar relaciones más sólidas entre ciudadanía e instituciones, condición indispensable para afrontar desafíos asociados al desarrollo humano sostenible."
        ],
        "futuro": [
          "Estas tendencias impulsarán procesos de modernización institucional orientados a incrementar la eficiencia pública y fortalecer la confianza social. Paralelamente, el envejecimiento poblacional, la automatización laboral y los cambios demográficos exigirán instituciones más adaptativas y cercanas a las necesidades ciudadanas (OCDE, 2024). En consecuencia, la legitimidad institucional dejará de medirse exclusivamente mediante indicadores de desempeño administrativo para incorporar dimensiones relacionadas con percepción ciudadana, colaboración social y capacidad de generar bienestar sostenible."
        ]
      },
      "antioquia": {
        "pasado": [
          "La construcción de legitimidad institucional en Antioquia se ha sustentado históricamente en procesos de asociatividad, emprendimiento y cooperación social. Desde mediados del siglo XX, el departamento fortaleció un ecosistema conformado por empresas, cooperativas, universidades, organizaciones comunitarias y cajas de compensación familiar que favorecieron la generación de confianza y capital social. El desarrollo industrial del Valle de Aburrá impulsó la consolidación de instituciones sólidas orientadas al progreso regional. Sin embargo, durante las décadas de 1980 y 1990, fenómenos asociados al narcotráfico, la violencia y el conflicto armado impactaron negativamente la percepción de legitimidad institucional. Posteriormente, estrategias de innovación social, fortalecimiento organizacional y desarrollo territorial contribuyeron a recuperar la confianza ciudadana. La articulación entre actores públicos, privados y comunitarios permitió consolidar iniciativas de bienestar y desarrollo humano que fortalecieron la cohesión social. Actualmente, Antioquia es reconocida por sus capacidades institucionales y su tradición de construcción colectiva del desarrollo"
        ],
        "presente": [
          "La confianza institucional constituye actualmente un activo estratégico para el desarrollo regional. El departamento presenta capacidades institucionales superiores al promedio nacional en aspectos relacionados con gestión pública, articulación interinstitucional y participación de actores privados en procesos de desarrollo territorial (Gobernación de Antioquia, 2024). Asimismo, Medellín y varios municipios del Oriente antioqueño han sido reconocidos por la implementación de modelos de innovación pública, gobierno digital y participación ciudadana que fortalecen la legitimidad institucional. Sin embargo, persisten desafíos importantes en territorios afectados por economías ilegales, pobreza multidimensional y conflictos sociales, donde la confianza hacia algunas instituciones continúa siendo limitada. En respuesta, las entidades territoriales han impulsado programas de transparencia, fortalecimiento comunitario y construcción de capacidades locales orientados a reducir brechas territoriales y mejorar la relación entre ciudadanía, organizaciones sociales y sector público, fortaleciendo progresivamente el capital social regional"
        ],
        "futuro": [
          "Las proyecciones apuntan hacia una mayor consolidación de ecosistemas territoriales basados en confianza, innovación y gobernanza colaborativa. La articulación entre sector público, sector privado, academia y organizaciones sociales será determinante para enfrentar desafíos asociados al cambio tecnológico, la transición demográfica y las transformaciones productivas (Gobernación de Antioquia, 2024). Adicionalmente, se espera una expansión de mecanismos digitales de participación ciudadana y seguimiento a la gestión pública, fortaleciendo la transparencia institucional. Las cajas de compensación familiar, por su capacidad de articulación social y cercanía territorial, podrían desempeñar un papel cada vez más relevante como intermediarias de confianza en procesos de desarrollo humano integral. En este escenario, la legitimidad institucional se convertirá en un factor diferenciador para atraer inversión, fortalecer cohesión social y promover procesos de bienestar sostenible en todo el departamento."
        ]
      },
      "subregiones": {
        "pasado": [
          "Han experimentado trayectorias diferenciadas en la construcción de legitimidad y confianza institucional. Mientras el Valle de Aburrá consolidó tempranamente una estructura institucional robusta asociada al desarrollo urbano e industrial, otras subregiones avanzaron mediante dinámicas propias de organización comunitaria y economía rural. El Oriente fortaleció progresivamente sus capacidades institucionales gracias al crecimiento empresarial y educativo, mientras que el Suroeste, Norte y Occidente desarrollaron importantes formas de cooperación social vinculadas a la actividad agropecuaria. En contraste, Urabá, Bajo Cauca, Nordeste y Magdalena Medio enfrentaron durante varias décadas desafíos derivados del conflicto armado, la presencia de economías ilícitas y las limitaciones en la presencia estatal. A partir de los años 2000, múltiples iniciativas de desarrollo territorial, participación ciudadana y fortalecimiento institucional impulsaron procesos de reconstrucción de confianza. Aunque persisten diferencias entre subregiones, se observa una tendencia hacia una mayor articulación institucional y cohesión territorial"
        ],
        "presente": [
          "El estado actual de la legitimidad institucional refleja dinámicas diferenciadas. Mientras Valle de Aburrá y Oriente presentan mayores niveles de articulación institucional y participación ciudadana, territorios como Bajo Cauca, Nordeste y algunas zonas de Urabá enfrentan desafíos asociados a conflictividades sociales, economías ilícitas y limitaciones en la presencia efectiva del Estado (PNUD, 2023). No obstante, se evidencian avances significativos mediante esquemas de gobernanza territorial, pactos comunitarios y programas de desarrollo con enfoque territorial. Las cajas de compensación familiar han fortalecido su legitimidad mediante la ampliación de coberturas en educación, salud, recreación, empleo y bienestar social, consolidándose como actores confiables para amplios sectores poblacionales. En consecuencia, la confianza institucional se configura actualmente como un elemento diferenciador de competitividad territorial y cohesión social en las distintas subregiones del departamento."
        ],
        "futuro": [
          "Las tendencias futuras sugieren una creciente importancia de la confianza institucional como condición para la gobernanza territorial efectiva. Se prevé que territorios con mayores niveles de articulación institucional y capital social logren adaptarse mejor a fenómenos como la automatización, el envejecimiento poblacional y los efectos del cambio climático (PNUD, 2023). Igualmente, los procesos de descentralización y fortalecimiento comunitario podrían favorecer la construcción de relaciones más cercanas entre ciudadanía e instituciones. Las tecnologías digitales facilitarán nuevas formas de participación y monitoreo ciudadano, incrementando las exigencias de transparencia y rendición de cuentas. Bajo esta perspectiva, las organizaciones que logren consolidar reputación, credibilidad y capacidad de respuesta tendrán mayores posibilidades de liderar ecosistemas territoriales inteligentes orientados al desarrollo humano integral, convirtiendo la confianza institucional en un activo estratégico para la sostenibilidad futura."
        ]
      }
    },
    "sintesis": [
      "La legitimidad y la confianza institucional emergen como una tendencia estructural que condicionará la sostenibilidad de los sistemas de bienestar, gobernanza y desarrollo humano durante las próximas décadas. En efecto, las transformaciones tecnológicas, demográficas y sociales incrementarán la necesidad de instituciones transparentes, cercanas y capaces de generar credibilidad colectiva. Asimismo, desde el ámbito global hasta las subregiones de Antioquia, la construcción de confianza será determinante para fortalecer la cohesión social, gestionar incertidumbres y promover procesos colaborativos de innovación territorial. En consecuencia, las organizaciones que consoliden capital relacional y legitimidad social serán las mejor posicionadas para liderar ecosistemas inteligentes de bienestar integral"
    ],
    "fuentes": [
      {
        "nombre": "Departamento Administrativo Nacional de Estadística (DANE)",
        "descripcion": [
          "Cultura política, confianza institucional, participación ciudadana",
          "Página oficial DANE. Disponible en: https://www.dane.gov.co/"
        ]
      },
      {
        "nombre": "Departamento Nacional de Planeación (DNP)",
        "descripcion": [
          "Índices de desempeño institucional y gobernanza",
          "Plataforma oficial de estadísticas territoriales del DNP. Disponible en: https://www.dnp.gov.co/"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar (Supersubsidio)",
        "descripcion": [
          "Gestión, cobertura y desempeño de cajas de compensación",
          "Supersubsidio. Disponible en: https://www.ssf.gov.co/"
        ]
      },
      {
        "nombre": "Organización para la Cooperación y el Desarrollo Económicos (OCDE)",
        "descripcion": [
          "Government at a Glance, confianza en instituciones",
          "Desarrollo Económicos OCDE. Disponible en: https://www.oecd.org/"
        ]
      },
      {
        "nombre": "Comisión Económica para América Latina y el Caribe (CEPAL)",
        "descripcion": [
          "Gobernanza, cohesión social y desarrollo institucional",
          "CEPAL. Disponible en : https://www.cepal.org/"
        ]
      }
    ]
  },
  f12: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica como tendencia estructural debido a que presenta una evolución observable y sostenida desde modelos centrados en la difusión de información institucional hacia enfoques orientados a la construcción de confianza, reputación, legitimidad y evidencia de impacto social. Esta transformación ha sido impulsada por cambios tecnológicos, nuevas expectativas ciudadanas y la necesidad de demostrar de manera transparente el valor generado por organizaciones públicas, privadas y sociales. De manera complementaria, este factor incorpora diversos hechos portadores de futuro, especialmente asociados con el uso de inteligencia artificial generativa, analítica avanzada de reputación, plataformas de participación digital, medición de confianza en tiempo real y narrativas basadas en evidencia de transformación social. Aunque estas señales aún se encuentran en procesos de consolidación, podrían modificar significativamente la forma en que las organizaciones construyen legitimidad y movilizan a la ciudadanía alrededor de propósitos colectivos de bienestar y desarrollo humano."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "Históricamente, la comunicación institucional se orientó principalmente a informar servicios, divulgar actividades y transmitir decisiones organizacionales. Durante gran parte del siglo XX predominó una lógica unidireccional donde gobiernos, empresas y organizaciones sociales actuaban como emisores de información hacia audiencias consideradas receptoras pasivas (Castells, 2009). Sin embargo, la expansión de las tecnologías digitales y el surgimiento de la sociedad de la información transformaron profundamente esta dinámica, fortaleciendo la interacción, la participación y la construcción colectiva de significado. Paralelamente, organismos internacionales comenzaron a reconocer que la legitimidad institucional dependía cada vez más de la capacidad de comunicar resultados, impactos y contribuciones al desarrollo humano."
        ],
        "presente": [
          "Actualmente, la comunicación estratégica se ha consolidado como una capacidad fundamental para fortalecer legitimidad, confianza y reputación institucional. A nivel internacional, gobiernos, empresas y organizaciones sociales enfrentan el desafío de comunicar de manera transparente, verificable y oportuna en contextos caracterizados por sobreabundancia informativa, desinformación y creciente escrutinio ciudadano (OCDE, 2024). En consecuencia, las estrategias comunicativas se orientan cada vez más a demostrar resultados e impactos mediante evidencia objetiva y narrativas centradas en las personas."
        ],
        "futuro": [
          "Las tendencias internacionales muestran una evolución acelerada hacia modelos de comunicación basados en inteligencia de datos, transparencia radical y construcción de confianza mediante evidencia verificable. El crecimiento de la inteligencia artificial, las plataformas colaborativas y la analítica de reputación permitirá comprender con mayor precisión las percepciones ciudadanas y adaptar las estrategias comunicativas a contextos cambiantes (OCDE, 2024). Asimismo, la legitimidad institucional dependerá cada vez más de la capacidad para demostrar impacto social de manera objetiva y comprensible."
        ]
      },
      "colombia": {
        "pasado": [
          "La evolución de la comunicación institucional estuvo vinculada a procesos de democratización, descentralización y fortalecimiento de la participación ciudadana. Asimismo, las organizaciones sociales y las cajas de compensación familiar ampliaron progresivamente sus estrategias comunicativas para evidenciar aportes al bienestar de trabajadores, familias y comunidades."
        ],
        "presente": [
          "Esta tendencia se refleja en la creciente incorporación de mecanismos de rendición de cuentas, comunicación pública del valor generado y participación digital. Además, las instituciones reconocen que la confianza social depende no solo de lo que hacen, sino también de cómo comunican y demuestran los efectos de sus acciones sobre el bienestar colectivo"
        ],
        "futuro": [
          "Esta evolución impulsará la consolidación de sistemas de comunicación orientados a evidenciar contribuciones al bienestar, fortalecer la participación ciudadana y combatir fenómenos de desinformación."
        ]
      },
      "antioquia": {
        "pasado": [
          "La comunicación estratégica evolucionó desde enfoques centrados en la divulgación institucional hacia modelos orientados a la construcción de confianza y reputación territorial. A lo largo de las últimas décadas, gobiernos locales, empresas, universidades y organizaciones sociales fortalecieron capacidades comunicativas para posicionar iniciativas de desarrollo, innovación y bienestar social. Este proceso estuvo acompañado por la consolidación de medios regionales, estrategias de participación ciudadana y mecanismos de rendición de cuentas que favorecieron mayores niveles de interacción entre instituciones y comunidades (Gobernación de Antioquia, 2023). Paralelamente, las cajas de compensación familiar incorporaron narrativas orientadas a mostrar los beneficios generados mediante programas de educación, recreación, empleo y desarrollo social. De esta manera, la comunicación dejó de limitarse a informar servicios para convertirse gradualmente en una herramienta de legitimación institucional y fortalecimiento del capital social regional."
        ],
        "presente": [
          "La comunicación estratégica ocupa actualmente un lugar relevante dentro de los procesos de gobernanza, innovación y desarrollo territorial. Diversas entidades públicas y privadas han fortalecido sus capacidades para comunicar resultados, impactos y transformaciones generadas en las comunidades. Asimismo, el uso intensivo de plataformas digitales, redes sociales y sistemas de información ha ampliado las posibilidades de interacción entre ciudadanía e instituciones (Gobernación de Antioquia, 2024). Paralelamente, las cajas de compensación familiar han evolucionado hacia modelos comunicativos que buscan evidenciar contribuciones al bienestar mediante indicadores, testimonios y resultados verificables. Sin embargo, persisten desafíos relacionados con la lucha contra la desinformación, la construcción de confianza en entornos digitales y la necesidad de desarrollar capacidades comunicativas diferenciadas para diversos grupos poblacionales."
        ],
        "futuro": [
          "Las proyecciones sugieren una creciente integración entre comunicación estratégica, gestión del conocimiento y medición de impacto social. Las organizaciones que logren articular evidencia, narrativas y participación ciudadana fortalecerán significativamente su legitimidad y capacidad de movilización social (Gobernación de Antioquia, 2024). Además, las herramientas digitales permitirán generar procesos comunicativos más personalizados, interactivos y basados en datos. Las cajas de compensación familiar podrían consolidarse como referentes en comunicación del bienestar mediante la demostración sistemática de resultados y transformaciones generadas en las personas y comunidades."
        ]
      },
      "subregiones": {
        "pasado": [
          "La trayectoria de la comunicación estratégica ha estado condicionada por las capacidades institucionales, la conectividad tecnológica y las dinámicas socioculturales de cada territorio. Mientras el Valle de Aburrá y el Oriente desarrollaron ecosistemas comunicativos más sofisticados apoyados en medios digitales, organizaciones comunitarias y redes institucionales, otras subregiones enfrentaron mayores restricciones derivadas de brechas tecnológicas y limitaciones de acceso a información (PNUD, 2022). No obstante, los procesos de fortalecimiento territorial promovieron nuevas formas de comunicación participativa que facilitaron la construcción de confianza entre ciudadanía e instituciones. Asimismo, las cajas de compensación familiar desempeñaron un papel relevante al acercar información sobre programas y oportunidades de bienestar a poblaciones urbanas y rurales. Estas experiencias sentaron las bases para la actual concepción de la comunicación como un activo estratégico para el desarrollo humano integral."
        ],
        "presente": [
          "Presentan actualmente niveles diversos de desarrollo en materia de comunicación estratégica. Mientras algunos territorios cuentan con ecosistemas comunicativos consolidados y altos niveles de conectividad, otros continúan fortaleciendo capacidades para garantizar acceso oportuno a la información y participación ciudadana efectiva (PNUD, 2023). A pesar de estas diferencias, se observa una tendencia creciente hacia el uso de herramientas digitales para comunicar programas sociales, promover procesos participativos y fortalecer relaciones entre instituciones y comunidades. Asimismo, la comunicación basada en evidencia comienza a posicionarse como una práctica relevante para demostrar resultados y fortalecer legitimidad territorial. En este escenario, la capacidad de construir narrativas creíbles y sustentadas en información verificable se convierte en un elemento estratégico para el desarrollo local y regional."
        ],
        "futuro": [
          "La comunicación estratégica evolucionará hacia ecosistemas territoriales de información donde ciudadanía, instituciones y organizaciones sociales compartirán datos, conocimiento y experiencias de transformación. Las tecnologías emergentes facilitarán nuevas formas de participación, seguimiento y rendición de cuentas, fortaleciendo la transparencia y la confianza colectiva (PNUD, 2023). Simultáneamente, aumentará la importancia de medir variables relacionadas con reputación, legitimidad y movilización social. Como resultado, la comunicación dejará de ser un componente de apoyo institucional para convertirse en una capacidad estratégica que permitirá demostrar cómo el bienestar transforma sosteniblemente personas, comunidades y territorios."
        ]
      }
    },
    "sintesis": [
      "La comunicación estratégica se proyecta como un factor determinante para la sostenibilidad institucional y la construcción de confianza social durante las próximas décadas. En un entorno caracterizado por abundancia informativa, transformación tecnológica y creciente exigencia ciudadana, las organizaciones deberán demostrar de manera transparente el valor social que generan. Asimismo, la integración entre evidencia, narrativas transformadoras y participación ciudadana fortalecerá la legitimidad institucional y la movilización colectiva. En consecuencia, la capacidad de comunicar impactos verificables, promover confianza y visibilizar resultados de bienestar se convertirá en una ventaja estratégica para liderar ecosistemas sostenibles de desarrollo humano integral."
    ],
    "fuentes": [
      {
        "nombre": "Departamento Administrativo Nacional de Estadística (DANE)",
        "descripcion": [
          "Encuesta de Cultura Política, acceso a información pública, confianza institucional, participación ciudadana, percepción de instituciones y estadísticas sociodemográficas.",
          "DANE. Disponible en: https://www.dane.gov.co/"
        ]
      },
      {
        "nombre": "Departamento Nacional de Planeación (DNP)",
        "descripcion": [
          "Sistemas de seguimiento a políticas públicas, rendición de cuentas, transparencia institucional, participación ciudadana, evaluación de programas y resultados de gestión pública.",
          "DNP. Disponible en: https://www.dnp.gov.co"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar (Supersubsidio)",
        "descripcion": [
          "Informes sectoriales, reportes de gestión, indicadores de desempeño institucional, cobertura de programas y estrategias de divulgación de las cajas de compensación familiar.",
          "Supersubsidio. Disponible en: https://www.ssf.gov.co/"
        ]
      },
      {
        "nombre": "Organización para la Cooperación y el Desarrollo Económicos (OCDE)",
        "descripcion": [
          "Estudios sobre confianza pública, comunicación gubernamental, gobernanza abierta, transparencia, reputación institucional y participación ciudadana.",
          "Desarrollo Económicos (OCDE). Disponible en: https://www.oecd.org/"
        ]
      },
      {
        "nombre": "Comisión Económica para América Latina y el Caribe (CEPAL)",
        "descripcion": [
          "Investigaciones sobre comunicación pública, cohesión social, gobernanza democrática, transformación digital y participación ciudadana.",
          "CEPAL. Disponible en: https://www.cepal.org/"
        ]
      }
    ]
  },
  f13: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica como tendencia estructural dado que evidencia una evolución progresiva y sostenida desde enfoques centrados en la administración de recursos y el cumplimiento operativo hacia modelos de gestión estratégica basados en evidencia, medición de impacto social y generación de valor público. Esta trayectoria es observable tanto en organismos internacionales como en instituciones públicas, privadas y sociales que han incorporado metodologías de evaluación, analítica de datos y toma de decisiones orientadas por resultados. Paralelamente, dentro de esta tendencia emergen algunos hechos portadores de futuro, particularmente relacionados con la adopción de inteligencia artificial para la toma de decisiones, sistemas predictivos de bienestar, analítica avanzada de impacto social, medición multidimensional del desarrollo humano y plataformas integradas de inteligencia territorial. Aunque estas señales aún presentan niveles variables de consolidación, podrían transformar profundamente la manera como las organizaciones diseñan, ejecutan y evalúan estrategias de bienestar durante las próximas décadas."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "A nivel mundial, el direccionamiento estratégico evolucionó desde modelos centrados en la planificación administrativa y financiera hacia enfoques orientados a resultados e impacto social. Durante gran parte del siglo XX, las organizaciones medían su desempeño principalmente mediante indicadores de eficiencia operativa; sin embargo, a partir de la década de 1990 se fortalecieron metodologías de gestión estratégica, evaluación de políticas públicas y medición de valor generado para la sociedad (Kaplan & Norton, 1996). Posteriormente, organismos internacionales como la OCDE, el Banco Mundial y Naciones Unidas promovieron esquemas de gestión basados en evidencia para mejorar la efectividad de las intervenciones sociales (OCDE, 2019)."
        ],
        "presente": [
          "En la actualidad, el direccionamiento estratégico del bienestar constituye una capacidad fundamental para organizaciones que buscan responder eficazmente a entornos cada vez más dinámicos e inciertos. A nivel global, la toma de decisiones basada en evidencia se ha consolidado como una práctica esencial para maximizar el impacto de políticas y programas sociales. Organismos internacionales promueven el uso de indicadores multidimensionales, sistemas de información integrados y metodologías de evaluación orientadas a resultados sostenibles."
        ],
        "futuro": [
          "Las tendencias internacionales muestran una transición hacia modelos de inteligencia estratégica que integran datos en tiempo real, analítica avanzada e inteligencia artificial para orientar decisiones relacionadas con bienestar y desarrollo humano. De igual manera, se proyecta una creciente incorporación de indicadores multidimensionales que permitan medir resultados sociales, ambientales y económicos de forma integrada"
        ]
      },
      "colombia": {
        "pasado": [
          "Este proceso estuvo acompañado por reformas institucionales orientadas a fortalecer la planeación estratégica, el seguimiento de resultados y la evaluación de políticas públicas. Asimismo, el Sistema Nacional de Evaluación de Gestión y Resultados impulsó una cultura de medición que gradualmente permeó organizaciones públicas, privadas y sociales"
        ],
        "presente": [
          "El fortalecimiento de sistemas de monitoreo, seguimiento y evaluación ha permitido mejorar la capacidad institucional para orientar recursos hacia prioridades estratégicas. Asimismo, se observa una creciente adopción de enfoques que integran medición de bienestar, impacto social y valor público generado, superando visiones exclusivamente financieras o administrativas del desempeño organizacional."
        ],
        "futuro": [
          "Estas transformaciones impulsarán una evolución desde la gestión basada en resultados hacia modelos centrados en la generación demostrable de valor social. Asimismo, las organizaciones deberán fortalecer capacidades analíticas para anticipar riesgos, identificar oportunidades y adaptar sus estrategias a contextos cambiantes."
        ]
      },
      "antioquia": {
        "pasado": [
          "El direccionamiento estratégico del bienestar ha estado vinculado históricamente al fortalecimiento de capacidades institucionales para orientar el desarrollo regional. Durante las últimas décadas, entidades públicas, empresas, universidades y organizaciones sociales incorporaron herramientas de planeación estratégica y evaluación para mejorar la asignación de recursos y maximizar impactos sociales. Asimismo, los procesos de construcción de visión territorial permitieron avanzar desde enfoques sectoriales hacia perspectivas más integrales de desarrollo humano (Gobernación de Antioquia, 2023). Paralelamente, las cajas de compensación familiar fortalecieron sistemas de información y mecanismos de seguimiento que permitieron ampliar la comprensión de las necesidades de trabajadores, familias y comunidades. Aunque inicialmente predominaban indicadores de cobertura y ejecución, progresivamente surgieron metodologías orientadas a evaluar resultados y contribuciones al bienestar. Este tránsito consolidó capacidades institucionales que hoy constituyen un referente para la gestión estratégica regional."
        ],
        "presente": [
          "Presenta avances significativos en materia de direccionamiento estratégico orientado al desarrollo humano. Diversas entidades territoriales han fortalecido sus capacidades de análisis, prospectiva y seguimiento mediante el uso de herramientas digitales, sistemas de información y metodologías de evaluación de impacto (Gobernación de Antioquia, 2024). Además, iniciativas como Antioquia 2040 promueven una visión de largo plazo sustentada en evidencia y participación multisectorial. En paralelo, las cajas de compensación familiar han incorporado mecanismos de medición que permiten evaluar no solo coberturas y servicios prestados, sino también transformaciones generadas en la calidad de vida de las personas. Sin embargo, persisten desafíos relacionados con la integración de información entre instituciones y la medición sistemática de impactos multidimensionales."
        ],
        "futuro": [
          "Las proyecciones sugieren una consolidación progresiva de sistemas territoriales de inteligencia estratégica orientados al bienestar. La articulación entre sector público, academia, empresas y organizaciones sociales permitirá fortalecer procesos de análisis prospectivo, evaluación de impacto y toma de decisiones basada en evidencia (Gobernación de Antioquia, 2024). Igualmente, el uso de tecnologías emergentes facilitará una comprensión más precisa de las dinámicas territoriales y de los factores que inciden en la calidad de vida de la población. Las cajas de compensación familiar podrían desempeñar un papel relevante como generadoras de conocimiento social y plataformas de medición del bienestar."
        ]
      },
      "subregiones": {
        "pasado": [
          "La evolución del direccionamiento estratégico ha sido heterogénea y ha estado condicionada por diferencias institucionales, económicas y sociales. Mientras territorios como Valle de Aburrá y Oriente desarrollaron capacidades avanzadas de planeación, monitoreo y evaluación, otras subregiones enfrentaron limitaciones asociadas a recursos técnicos y presencia institucional (PNUD, 2022). Sin embargo, los procesos de descentralización administrativa, fortalecimiento municipal y planeación participativa promovieron una mayor incorporación de enfoques estratégicos en la gestión territorial. De igual forma, las cajas de compensación familiar contribuyeron a ampliar el uso de información para la toma de decisiones relacionadas con bienestar, empleo, educación y desarrollo social. Como resultado, se consolidó una cultura gradual de gestión basada en evidencia que permitió orientar intervenciones más pertinentes y alineadas con las necesidades de cada territorio."
        ],
        "presente": [
          "Muestran actualmente niveles diferenciados de desarrollo en materia de direccionamiento estratégico del bienestar. Mientras algunas cuentan con sistemas robustos de planeación y seguimiento, otras continúan fortaleciendo capacidades técnicas para la gestión basada en evidencia. No obstante, se observa una tendencia creciente hacia la utilización de información territorial, indicadores sociales y mecanismos participativos para orientar decisiones públicas y privadas (PNUD, 2023). Adicionalmente, las tecnologías digitales han ampliado la disponibilidad de datos relevantes para comprender dinámicas de bienestar, inclusión y desarrollo humano. En este contexto, la capacidad de transformar información en conocimiento útil para la toma de decisiones se ha convertido en un factor determinante para la efectividad de las estrategias territoriales."
        ],
        "futuro": [
          "Se prevé que la capacidad de gestionar información estratégica se convierta en un factor diferenciador para el desarrollo territorial. Las regiones que logren integrar datos, conocimiento y participación ciudadana estarán mejor preparadas para enfrentar desafíos asociados al envejecimiento poblacional, la automatización laboral y las transformaciones económicas (PNUD, 2023). De manera complementaria, la medición de impacto social evolucionará hacia esquemas más integrales que permitan comprender efectos de largo plazo sobre las personas y comunidades. En consecuencia, el direccionamiento estratégico del bienestar se consolidará como una herramienta fundamental para construir territorios más resilientes, inclusivos y sostenibles."
        ]
      }
    },
    "sintesis": [
      "El direccionamiento estratégico del bienestar se proyecta como una capacidad crítica para liderar procesos de transformación social en escenarios caracterizados por incertidumbre y acelerado cambio tecnológico. En efecto, la creciente disponibilidad de datos, la evolución de las metodologías de evaluación y la incorporación de inteligencia artificial fortalecerán la toma de decisiones basada en evidencia. Simultáneamente, la medición multidimensional del bienestar permitirá comprender de manera más integral los efectos de las intervenciones sobre las personas y los territorios. En consecuencia, las organizaciones que logren integrar información, conocimiento e innovación estarán mejor posicionadas para generar impacto demostrable, fortalecer su legitimidad y contribuir a la construcción de ecosistemas sostenibles de desarrollo humano integral"
    ],
    "fuentes": [
      {
        "nombre": "Departamento Nacional de Planeación (DNP)",
        "descripcion": [
          "Sistema Nacional de Evaluación de Gestión y Resultados (SINERGIA), seguimiento a políticas públicas, indicadores sectoriales, evaluación de programas gubernamentales, planeación estratégica y desarrollo territorial.",
          "Plataforma TerriData. Disponible en: https://www.dnp.gov.co/"
        ]
      },
      {
        "nombre": "Departamento Administrativo Nacional de Estadística (DANE)",
        "descripcion": [
          "Estadísticas sociales, económicas y territoriales; indicadores de calidad de vida, pobreza multidimensional, empleo, bienestar subjetivo y condiciones de vida.",
          "DANE. Disponible en: https://www.dane.gov.co/"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar (Supersubsidio)",
        "descripcion": [
          "Informes de gestión, indicadores sectoriales, cobertura de servicios, desempeño institucional y reportes de las cajas de compensación familiar.",
          "Supersubsidio. Disponible en: https://www.ssf.gov.co/"
        ]
      },
      {
        "nombre": "Organización para la Cooperación y el Desarrollo Económicos (OCDE)",
        "descripcion": [
          "Government at a Glance, indicadores de gobernanza pública, gestión basada en evidencia, desempeño institucional y medición de bienestar.",
          "OCDE. Disponible en: https://www.oecd.org/"
        ]
      },
      {
        "nombre": "Comisión Económica para América Latina y el Caribe (CEPAL)",
        "descripcion": [
          "Estudios sobre desarrollo sostenible, planificación estratégica, evaluación de políticas públicas, desarrollo territorial e indicadores sociales.",
          "CEPAL.Disponible en: https://www.cepal.org/"
        ]
      }
    ]
  },
  f14: {
    "tipificacion": {
      "tipo": "Tendencia estructural emergente",
      "justificacion": "Se clasifica como una tendencia estructural emergente, porque refleja una evolución sostenida desde el uso operativo de la información hacia capacidades superiores de análisis, anticipación, segmentación y toma de decisiones basadas en evidencia. Su trayectoria ya es visible en los sistemas estadísticos oficiales, plataformas territoriales, tableros de datos, registros administrativos y modelos de analítica pública y social. Sin embargo, también contiene hechos portadores de futuro, como la inteligencia artificial aplicada a la predicción de riesgos sociales, los modelos de bienestar hiperpersonalizado, los sistemas de alerta temprana comunitaria, la autogestión inteligente de servicios y los gemelos digitales territoriales. Estas señales aún no están plenamente consolidadas, pero podrían transformar la forma como las cajas de compensación anticipan necesidades y generan valor social."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "A nivel global, la inteligencia estratégica del bienestar tiene sus orígenes en la evolución de los sistemas de información utilizados para comprender fenómenos sociales, económicos y demográficos. Durante gran parte del siglo XX, la información relacionada con bienestar se utilizó principalmente con fines descriptivos y administrativos, orientados a registrar población, empleo, salud, educación y condiciones de vida. Los gobiernos y organismos internacionales basaban sus decisiones en censos, encuestas y estadísticas periódicas que permitían monitorear el estado de las sociedades, pero con limitada capacidad de anticipación. Posteriormente, la expansión de las tecnologías digitales, el desarrollo de bases de datos masivas y la creciente disponibilidad de información impulsaron una transición hacia enfoques analíticos más sofisticados. Organismos como el Programa de las Naciones Unidas para el Desarrollo promovieron mediciones multidimensionales del bienestar, mientras la OCDE fortaleció sistemas de indicadores para evaluar calidad de vida y progreso social más allá del crecimiento económico (PNUD, 1990; OCDE, 2011). Así, la información comenzó a transformarse en conocimiento estratégico para orientar decisiones de largo plazo."
        ],
        "presente": [
          "Actualmente, la inteligencia estratégica del bienestar se ha convertido en un componente central para la gestión pública, empresarial y social. La combinación de analítica avanzada, inteligencia artificial, big data, georreferenciación y sistemas de información en tiempo real permite comprender con mayor profundidad las dinámicas que afectan la calidad de vida de las personas y comunidades. A nivel internacional, organizaciones como la OCDE, Naciones Unidas y el Banco Mundial promueven el uso de evidencia para diseñar políticas más efectivas y anticipar riesgos sociales, económicos y ambientales (OCDE, 2024). Paralelamente, los indicadores tradicionales de bienestar han evolucionado hacia modelos multidimensionales que integran salud, educación, ingresos, cohesión social, sostenibilidad ambiental y bienestar subjetivo. Esta transformación ha permitido que la inteligencia estratégica deje de ser una función estadística para convertirse en una capacidad de anticipación. En consecuencia, las organizaciones más avanzadas utilizan información integrada para personalizar intervenciones, optimizar recursos y fortalecer la toma de decisiones basada en evidencia."
        ],
        "futuro": [
          "Durante las próximas décadas, la inteligencia estratégica del bienestar evolucionará hacia sistemas predictivos capaces de anticipar necesidades humanas, riesgos sociales y escenarios de transformación con niveles de precisión cada vez mayores. El desarrollo acelerado de la inteligencia artificial, la computación avanzada, los modelos predictivos y la integración masiva de datos permitirá construir ecosistemas inteligentes orientados a la prevención más que a la reacción. Diversos organismos internacionales prevén que la gestión del bienestar se apoyará crecientemente en plataformas capaces de combinar datos sociales, económicos, ambientales, territoriales y conductuales para generar recomendaciones personalizadas y orientar decisiones estratégicas (Naciones Unidas, 2024; Banco Mundial, 2023). Asimismo, emergerán conceptos como inteligencia social, inteligencia territorial y bienestar hiperpersonalizado, donde las instituciones podrán identificar vulnerabilidades antes de que se materialicen. En este escenario, la inteligencia estratégica se consolidará como una capacidad crítica para construir resiliencia, sostenibilidad y bienestar integral en sociedades cada vez más complejas, interconectadas y dinámicas."
        ]
      },
      "colombia": {
        "pasado": [
          "En Colombia, la inteligencia estratégica del bienestar tuvo como punto de partida una gestión de información principalmente descriptiva, orientada a registrar población, cobertura, gasto social y condiciones básicas de vida. Durante años, los datos se utilizaron para cumplir funciones estadísticas, administrativas y de reporte, más que para anticipar necesidades o diseñar intervenciones diferenciadas. Con el fortalecimiento del Sistema Estadístico Nacional, coordinado por el DANE, el país avanzó hacia una comprensión más robusta de las estadísticas oficiales como insumo para diseñar, evaluar y mejorar políticas públicas. El SEN tiene entre sus objetivos suministrar estadísticas nacionales y territoriales de calidad, promover su uso en políticas públicas y facilitar el acceso y difusión de información oficial (Departamento Administrativo Nacional de Estadística [DANE], s. f.). Así, la información dejó de ser un recurso meramente operativo y comenzó a consolidarse como una capacidad institucional para interpretar desigualdades, orientar decisiones y comprender dinámicas sociales complejas."
        ],
        "presente": [
          "Actualmente, Colombia cuenta con un ecosistema de información más robusto para orientar decisiones de bienestar, aunque todavía enfrenta retos de interoperabilidad, oportunidad, calidad y uso estratégico de datos. El DANE, como entidad responsable de planear, producir y difundir estadísticas oficiales, estructura información sobre economía, sociedad y territorio, lo que constituye una base fundamental para identificar brechas y monitorear transformaciones sociales (DANE, s. f.). Además, el Sistema Estadístico Nacional promueve lineamientos, calidad estadística, uso de registros administrativos, intercambio de información y acceso a datos oficiales (DANE, s. f.). En el presente, el desafío ya no consiste únicamente en producir datos, sino en transformarlos en conocimiento útil para anticipar riesgos sociales, personalizar programas y evaluar impacto. Para el sistema de compensación familiar, esto implica integrar información de afiliados, servicios, territorio, ciclo de vida, vulnerabilidades y resultados de bienestar."
        ],
        "futuro": [
          "En los próximos años, la inteligencia estratégica del bienestar en Colombia tenderá a integrar analítica avanzada, inteligencia artificial, registros administrativos, datos espaciales, encuestas sociales y sistemas de monitoreo en tiempo casi real. Esta transición permitirá pasar de diagnósticos retrospectivos a capacidades predictivas para anticipar pobreza, desempleo, deserción educativa, déficit de cuidado, inseguridad alimentaria y barreras de acceso a servicios. El DANE ya incorpora dentro del Sistema Estadístico Nacional líneas asociadas al intercambio de información, uso de fuentes alternativas, datos espaciales e intercambio de microdatos (DANE, s. f.). Para las cajas de compensación, esta tendencia implica crear modelos de inteligencia social que integren información pública, datos propios y señales del entorno. El valor futuro estará en anticipar necesidades familiares antes de que se conviertan en crisis, diseñando intervenciones preventivas y medibles."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, la evolución de este factor ha estado ligada al tránsito desde reportes estadísticos sectoriales hacia sistemas de información con mayor capacidad de lectura territorial. Inicialmente, los datos departamentales se organizaban alrededor de anuarios, diagnósticos municipales, registros administrativos y encuestas sociales, útiles para describir población, economía, servicios y condiciones de vida. Más adelante, la Dirección de Estadísticas e Indicadores de Antioquia consolidó instrumentos como el Anuario Estadístico, la Encuesta de Calidad de Vida, las cuentas económicas departamentales y las fichas municipales, que permiten observar diferencias entre municipios y subregiones (Gobernación de Antioquia, s. f.). Este proceso amplió la mirada institucional: de conocer “cuántos” servicios se prestaban, se pasó a analizar “dónde”, “a quiénes”, “con qué brechas” y “con qué resultados”. De esta manera, Antioquia comenzó a construir bases para una inteligencia territorial aplicada al bienestar."
        ],
        "presente": [
          "En Antioquia, la inteligencia estratégica del bienestar dispone hoy de una infraestructura estadística departamental cada vez más relevante. Antioquia Datos reúne información del Anuario Estadístico, Encuesta de Calidad de Vida, tableros sociales y económicos, fichas municipales y otros instrumentos que permiten comprender necesidades de los hogares y orientar decisiones basadas en evidencia (Gobernación de Antioquia, s. f.). Esta disponibilidad favorece análisis más detallados sobre condiciones de vida, capacidades territoriales, dinámicas económicas y brechas sociales. Sin embargo, el reto institucional consiste en pasar de portales de consulta a sistemas de inteligencia activa, capaces de producir alertas, priorizar territorios y anticipar demandas de servicios. Para Comfenalco Antioquia, esto significa conectar datos internos de afiliación, subsidios, educación, recreación, vivienda, empleo y bienestar con fuentes externas confiables, generando una lectura integral del desarrollo humano en el departamento."
        ],
        "futuro": [
          "Para Antioquia, la proyección apunta hacia una inteligencia territorial del bienestar que combine tableros departamentales, sistemas predictivos, segmentación poblacional y modelos de priorización subregional. Antioquia Datos señala que la Encuesta de Calidad de Vida 2025/2026 busca conocer cómo viven los hogares antioqueños, comprender sus necesidades y orientar decisiones que mejoren la inversión pública y la calidad de vida con base en evidencia (Gobernación de Antioquia, s. f.). Esta orientación permite imaginar una gestión social más dinámica, donde los datos no solo describen condiciones de vida, sino que orientan decisiones anticipatorias. En el caso de Comfenalco Antioquia, la inteligencia estratégica podría materializarse en observatorios, mapas de calor territorial, modelos de riesgo familiar, tableros de impacto, motores de recomendación de servicios y rutas personalizadas de bienestar según ciclo vital, ingresos, territorio y vulnerabilidades."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las subregiones de Antioquia, la retrospectiva de la inteligencia del bienestar muestra una dificultad histórica: disponer de información suficientemente desagregada para comprender realidades locales. Durante mucho tiempo, las decisiones sociales se apoyaron en promedios departamentales que ocultaban diferencias entre Valle de Aburrá, Oriente, Urabá, Suroeste, Occidente, Norte, Nordeste, Bajo Cauca y Magdalena Medio. La consolidación de herramientas como TerriData permitió mejorar esa lectura, al facilitar estadísticas comparables a nivel municipal, departamental y regional en múltiples dimensiones socioeconómicas (Departamento Nacional de Planeación [DNP], s. f.). Gracias a ello, las subregiones dejaron de ser tratadas únicamente como unidades administrativas y empezaron a observarse como territorios con dinámicas propias de pobreza, empleo, educación, salud, ruralidad, conflicto, capacidad institucional y desarrollo económico. Esta transición abrió el camino hacia una inteligencia subregional del bienestar más precisa."
        ],
        "presente": [
          "En el plano subregional, el estado actual exige inteligencia diferenciada. El Valle de Aburrá demanda analítica urbana sobre empleo, envejecimiento, salud mental, movilidad y acceso a servicios; Oriente requiere lectura sobre crecimiento poblacional, presión inmobiliaria, turismo, ruralidad y transformación productiva; Urabá necesita datos sobre logística, migración, empleo, seguridad alimentaria y cohesión social; Suroeste y Occidente precisan indicadores de ruralidad, conectividad, turismo y envejecimiento; Norte, Nordeste, Bajo Cauca y Magdalena Medio requieren seguimiento a pobreza, formalización, educación, seguridad, economía local y tejido comunitario. TerriData funciona como repositorio, buscador y herramienta de visualización de datos municipales, departamentales y regionales, con indicadores estandarizados y comparables en dimensiones socioeconómicas (DNP, s. f.). Así, la inteligencia estratégica del bienestar debe convertirse en una capacidad para leer diferencias subregionales y no solo agregados departamentales."
        ],
        "futuro": [
          "En las nueve subregiones, la evolución futura dependerá de la capacidad para construir modelos de inteligencia situada. No será suficiente replicar un tablero único para todo Antioquia; cada territorio requerirá preguntas, variables y alertas específicas. En Valle de Aburrá, la prioridad estará en anticipar tensiones urbanas y demandas de cuidado; en Oriente, equilibrar crecimiento económico y bienestar; en Urabá, integrar desarrollo portuario con inclusión social; en Bajo Cauca y Nordeste, detectar riesgos sociales y fortalecer capacidades institucionales; en Occidente, Suroeste, Norte y Magdalena Medio, conectar ruralidad, envejecimiento, empleo, turismo y acceso a servicios. La Superintendencia del Subsidio Familiar dispone de series históricas mensuales desde 2020 sobre población, infraestructura, recurso humano y coberturas de las cajas de compensación, información útil para cruzar presencia institucional y necesidades territoriales (Superintendencia del Subsidio Familiar [SSF], s. f.)."
        ]
      }
    },
    "sintesis": [
      "La Inteligencia estratégica del bienestar será una capacidad decisiva para convertir datos dispersos en conocimiento anticipatorio, pertinente y accionable. Su desarrollo permitirá pasar de diagnósticos descriptivos a modelos predictivos de necesidades, riesgos y oportunidades sociales. Colombia cuenta con bases oficiales como el DANE, el DNP, TerriData y la Superintendencia del Subsidio Familiar, mientras Antioquia dispone de Antioquia Datos y encuestas territoriales que fortalecen la toma de decisiones (DANE, s. f.; DNP, s. f.; SSF, s. f.). Para Comfenalco Antioquia, el desafío será integrar estas fuentes con datos propios para personalizar bienestar."
    ],
    "fuentes": [
      {
        "nombre": "DANE – Sistema Estadístico Nacional, SEN",
        "descripcion": [
          "Estadísticas oficiales nacionales y territoriales, lineamientos de calidad estadística, uso de registros administrativos, intercambio de información, datos espaciales y microdatos.",
          "Sistema Estadístico Nacional – DANE- Disponible en: https://www.dane.gov.co/index.php/sistema-estadistico-nacional-sen?utm_source"
        ]
      },
      {
        "nombre": "DNP – TerriData",
        "descripcion": [
          "Indicadores municipales, departamentales y regionales en dimensiones sociales, económicas, institucionales, educativas, de salud, conflicto, ruralidad y buen gobierno.",
          "TerriData – DNP. Disponible en: https://terridata.dnp.gov.co/?utm_source"
        ]
      },
      {
        "nombre": "Gobernación de Antioquia – Antioquia Datos",
        "descripcion": [
          "Anuario Estadístico, Encuesta de Calidad de Vida, tableros sociales y económicos, fichas municipales y datos departamentales para planeación territorial.",
          "Antioquia Datos. Disponible en: https://www.antioquiadatos.gov.co/?utm_source"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar – Estadísticas y series históricas",
        "descripcion": [
          "Estadísticas del Sistema de Subsidio Familiar: población afiliada, infraestructura, recurso humano, coberturas, anuarios, boletines y series mensuales desde 2020.",
          "Series históricas SSF. Disponible en: https://www.ssf.gov.co/series-hist%C3%B3ricas?utm_source"
        ]
      },
      {
        "nombre": "Datos Abiertos Colombia",
        "descripcion": [
          "Catálogo nacional de datos públicos reutilizables de entidades estatales, útil para integrar fuentes sectoriales, territoriales y sociales en modelos de analítica.",
          "Datos Abiertos Colombia. Disponible en: https://www.datos.gov.co/"
        ]
      }
    ]
  },
  f15: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica como tendencia estructural debido a que refleja una transformación progresiva de las organizaciones desde modelos centrados en la administración de información hacia esquemas basados en aprendizaje organizacional, inteligencia institucional, innovación y toma de decisiones sustentadas en evidencia. Esta evolución ha sido impulsada por la digitalización, la creciente disponibilidad de datos, la aceleración tecnológica y la necesidad de responder a entornos cada vez más complejos e inciertos. De manera complementaria, incorpora diversos hechos portadores de futuro, especialmente aquellos relacionados con inteligencia artificial, sistemas predictivos, analítica avanzada, inteligencia colectiva, gestión automatizada del aprendizaje y prospectiva estratégica. Aunque varias de estas capacidades aún se encuentran en diferentes niveles de madurez institucional, su consolidación podría generar cambios significativos en la forma como las organizaciones comprenden los fenómenos sociales, diseñan soluciones y anticipan escenarios futuros. Por ello, la gestión del conocimiento se configura simultáneamente como una tendencia consolidada y un habilitador estratégico de futuros alternativos."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "La gestión del conocimiento surge globalmente como respuesta a la necesidad de aprovechar el capital intelectual generado por las organizaciones en contextos cada vez más dinámicos. Durante gran parte del siglo XX predominó una visión orientada al almacenamiento de información y la documentación de procesos administrativos. Sin embargo, hacia finales de la década de 1990, los aportes de Nonaka y Takeuchi (1995) transformaron esta concepción al destacar la importancia del conocimiento tácito, el aprendizaje continuo y la creación colectiva de valor. Posteriormente, el auge de las tecnologías digitales impulsó el desarrollo de sistemas de inteligencia organizacional, analítica de datos y gestión estratégica del conocimiento"
        ],
        "presente": [
          "Actualmente, la gestión del conocimiento constituye uno de los principales activos estratégicos de las organizaciones públicas y privadas. La disponibilidad masiva de datos, la expansión de la inteligencia artificial y el crecimiento de plataformas digitales han incrementado significativamente la capacidad para transformar información en conocimiento útil para la toma de decisiones (OECD, 2023). A nivel internacional, organismos multilaterales promueven modelos basados en evidencia, aprendizaje institucional e innovación orientados a enfrentar desafíos complejos como el cambio climático, las desigualdades sociales y las transformaciones demográficas."
        ],
        "futuro": [
          "Las tendencias internacionales indican que la gestión del conocimiento evolucionará hacia modelos integrados de inteligencia organizacional apoyados por inteligencia artificial, aprendizaje automático y analítica predictiva. Las organizaciones requerirán capacidades crecientes para anticipar riesgos, identificar oportunidades y responder rápidamente a entornos cambiantes (OECD, 2023). Además, la integración entre datos sociales, económicos y ambientales permitirá desarrollar sistemas más sofisticados de monitoreo y evaluación."
        ]
      },
      "colombia": {
        "pasado": [
          "Este proceso se fortaleció con la modernización institucional, la adopción de sistemas de información gubernamental y la incorporación de metodologías de evaluación y seguimiento de políticas públicas lideradas por entidades como el DNP y el DANE, favoreciendo una cultura creciente de toma de decisiones basada en evidencia"
        ],
        "presente": [
          "La consolidación de sistemas de información, observatorios sectoriales y plataformas de análisis de datos fortalece progresivamente las capacidades institucionales para diseñar políticas más efectivas y focalizadas (DNP, 2024). En consecuencia, el conocimiento se reconoce cada vez más como un activo estratégico para generar valor público y bienestar social."
        ],
        "futuro": [
          "En Colombia, estas dinámicas favorecerán la consolidación de políticas públicas basadas en evidencia y la expansión de ecosistemas de innovación orientados al desarrollo humano integral (DNP, 2024). Como resultado, el conocimiento dejará de ser únicamente un recurso de apoyo para convertirse en un componente central de la gobernanza y la transformación social."
        ]
      },
      "antioquia": {
        "pasado": [
          "La gestión del conocimiento ha evolucionado paralelamente al fortalecimiento de ecosistemas de innovación, educación superior y desarrollo territorial. Durante las últimas décadas, universidades, centros de investigación, empresas y entidades públicas impulsaron procesos orientados a la generación y transferencia de conocimiento para el desarrollo regional (Gobernación de Antioquia, 2024). Asimismo, iniciativas asociadas a innovación pública, gobierno digital y planeación estratégica contribuyeron a mejorar las capacidades institucionales para recopilar, analizar y utilizar información en la toma de decisiones. Las cajas de compensación familiar también avanzaron progresivamente desde modelos centrados en registros operativos hacia sistemas de seguimiento, evaluación de programas y análisis de impacto social. Este tránsito permitió fortalecer la comprensión de las necesidades de los afiliados y mejorar la capacidad institucional para diseñar respuestas más pertinentes frente a los desafíos del bienestar."
        ],
        "presente": [
          "La gestión del conocimiento ocupa actualmente un papel central en los procesos de innovación territorial, planeación estratégica y transformación digital. La articulación entre universidades, centros tecnológicos, sector empresarial y entidades públicas ha permitido consolidar capacidades significativas para la producción y uso de información especializada (Gobernación de Antioquia, 2024). De igual forma, la Agenda Antioquia 2040 reconoce la importancia de fortalecer sistemas de inteligencia territorial para anticipar cambios sociales, económicos y ambientales. Paralelamente, las cajas de compensación familiar avanzan en la implementación de sistemas de monitoreo, analítica de datos y medición de impacto que contribuyen a mejorar la efectividad de sus programas de bienestar. No obstante, persisten desafíos relacionados con interoperabilidad de datos, cultura organizacional y aprovechamiento avanzado de tecnologías emergentes."
        ],
        "futuro": [
          "Las proyecciones apuntan hacia la construcción de ecosistemas regionales de inteligencia territorial capaces de integrar información proveniente de múltiples actores y sectores. La creciente digitalización de servicios públicos y privados permitirá fortalecer capacidades de análisis, prospectiva y toma de decisiones adaptativas (Gobernación de Antioquia, 2024). Asimismo, las cajas de compensación familiar podrían consolidar plataformas avanzadas de conocimiento orientadas a comprender mejor las necesidades de los afiliados y anticipar transformaciones en el bienestar. La combinación de datos, innovación y aprendizaje institucional fortalecerá la capacidad de respuesta frente a fenómenos como envejecimiento, automatización y cambios en las estructuras familiares."
        ]
      },
      "subregiones": {
        "pasado": [
          "La evolución de la gestión del conocimiento ha estado condicionada por diferencias en capacidades institucionales, conectividad, infraestructura tecnológica y acceso a educación. Mientras territorios como Valle de Aburrá y Oriente consolidaron mayores capacidades para generar y utilizar información estratégica, otras subregiones enfrentaron limitaciones relacionadas con dispersión geográfica y disponibilidad de recursos técnicos (PNUD, 2022). No obstante, la expansión de tecnologías digitales y los procesos de descentralización fortalecieron gradualmente la producción de información territorial para la planificación y el desarrollo local. Asimismo, las cajas de compensación ampliaron mecanismos de caracterización poblacional, seguimiento de beneficiarios y evaluación de resultados, favoreciendo una comprensión más profunda de las dinámicas sociales territoriales. Como consecuencia, la gestión del conocimiento comenzó a consolidarse como un recurso fundamental para fortalecer la capacidad adaptativa de las instituciones regionales."
        ],
        "presente": [
          "En las nueve subregiones antioqueñas se observa una creciente incorporación de herramientas tecnológicas orientadas a mejorar la gestión de información y el aprendizaje institucional. Diversos municipios han fortalecido observatorios locales, sistemas de seguimiento y plataformas de información territorial que facilitan la identificación de necesidades y la formulación de intervenciones más pertinentes (PNUD, 2023). Sin embargo, las brechas digitales y las diferencias en capacidades institucionales continúan generando niveles heterogéneos de desarrollo. En este contexto, la gestión del conocimiento adquiere una relevancia estratégica para reducir asimetrías territoriales y fortalecer la capacidad de respuesta frente a desafíos sociales complejos. Asimismo, la generación de inteligencia territorial comienza a convertirse en un elemento diferenciador para la construcción de bienestar sostenible."
        ],
        "futuro": [
          "A nivel subregional, la gestión del conocimiento evolucionará hacia sistemas colaborativos de inteligencia colectiva donde instituciones, comunidades y organizaciones compartan información para construir soluciones conjuntas. El uso de analítica avanzada, tecnologías geoespaciales e inteligencia artificial facilitará la identificación temprana de riesgos sociales y la personalización de intervenciones territoriales (PNUD, 2023). Paralelamente, aumentará la importancia de medir variables relacionadas con aprendizaje organizacional, transferencia de capacidades e innovación social. Como consecuencia, la gestión del conocimiento se consolidará como una dimensión estratégica para fortalecer resiliencia institucional, competitividad territorial y bienestar sostenible."
        ]
      }
    },
    "sintesis": [
      "La gestión del conocimiento se proyecta como uno de los principales habilitadores del bienestar y del desarrollo humano integral durante las próximas décadas. En efecto, la creciente complejidad de los entornos sociales exigirá capacidades superiores para interpretar información, anticipar transformaciones y construir respuestas adaptativas. Asimismo, la convergencia entre inteligencia artificial, analítica avanzada y aprendizaje organizacional permitirá fortalecer significativamente la capacidad institucional para generar valor social. De manera complementaria, la consolidación de ecosistemas de inteligencia territorial facilitará procesos de innovación colectiva y toma de decisiones basadas en evidencia. En consecuencia, las organizaciones que desarrollen capacidades sólidas de gestión del conocimiento estarán mejor preparadas para liderar procesos sostenibles de transformación social."
    ],
    "fuentes": [
      {
        "nombre": "Departamento Administrativo Nacional de Estadística (DANE)",
        "descripcion": [
          "Estadísticas de innovación, uso y apropiación de tecnologías de información y comunicaciones, indicadores de educación, formación de talento humano, acceso digital y producción estadística para la toma de decisiones.",
          "DANE. Disponible en: https://www.dane.gov.co/"
        ]
      },
      {
        "nombre": "Departamento Nacional de Planeación (DNP)",
        "descripcion": [
          "Sistema Nacional de Evaluación de Gestión y Resultados (SINERGIA), seguimiento a políticas públicas, observatorios sectoriales, planeación estratégica y gestión basada en evidencia.",
          "DNP. Disponble en: https://www.dnp.gov.co/"
        ]
      },
      {
        "nombre": "Ministerio de Ciencia, Tecnología e Innovación (MinCiencias)",
        "descripcion": [
          "Indicadores de investigación, desarrollo tecnológico, innovación, grupos de investigación, producción científica, transferencia de conocimiento y apropiación social del conocimiento.",
          "MinCiencias. Disponible en: https://minciencias.gov.co/"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar (Supersubsidio)",
        "descripcion": [
          "Informes sectoriales, indicadores de gestión de las cajas de compensación familiar, sistemas de información institucional, cobertura de programas y resultados de impacto social.",
          "Supersubsidio. Disponible en: https://www.ssf.gov.co/"
        ]
      },
      {
        "nombre": "Organización para la Cooperación y el Desarrollo Económicos (OCDE)",
        "descripcion": [
          "Estudios sobre economía del conocimiento, transformación digital, innovación pública, inteligencia institucional, aprendizaje organizacional y gobernanza basada en evidencia.",
          "Disponible en: https://www.oecd.org/"
        ]
      }
    ]
  },
  f16: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica como una tendencia estructural, porque expresa una presión creciente, acumulativa y verificable sobre las instituciones que gestionan bienestar, subsidio familiar, protección social y servicios sociales. Su evolución responde a cambios normativos, exigencias de inspección, vigilancia y control, sostenibilidad financiera, transparencia, gobierno corporativo, gestión del riesgo y adaptación institucional. En el caso de las cajas de compensación familiar, esta tendencia se apoya en un marco jurídico histórico, especialmente la Ley 21 de 1982, que define el subsidio familiar como una prestación social pagadera en dinero, especie y servicios (Congreso de Colombia, 1982). No obstante, incorpora hechos portadores de futuro, como la supervisión basada en datos, la regulación algorítmica, los sistemas predictivos de riesgo jurídico y nuevos esquemas de gobernanza adaptativa."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "A nivel global, la sostenibilidad regulatoria del bienestar surgió como resultado de la necesidad de garantizar estabilidad institucional, protección social y continuidad de los sistemas de bienestar frente a transformaciones económicas y sociales. Durante gran parte del siglo XX, los Estados de bienestar operaron bajo marcos normativos relativamente estables, apoyados en economías industriales, crecimiento demográfico sostenido y mercados laborales formales. En este contexto, las regulaciones estaban orientadas principalmente a administrar sistemas de seguridad social, salud, pensiones y protección laboral. Sin embargo, la globalización económica, las crisis fiscales, los cambios demográficos y la creciente complejidad de los sistemas sociales comenzaron a generar presiones sobre la sostenibilidad financiera y jurídica de estas estructuras. Organismos como la OCDE y la OIT advirtieron progresivamente que el envejecimiento poblacional, la informalidad laboral y la transformación del empleo requerían marcos regulatorios más flexibles y adaptativos (OCDE, 2019; OIT, 2017). Como consecuencia, la regulación evolucionó desde una lógica de control y estabilidad hacia una función estratégica de adaptación institucional y sostenibilidad de largo plazo."
        ],
        "presente": [
          "En la actualidad, la sostenibilidad regulatoria del bienestar enfrenta un escenario de creciente complejidad derivado de cambios tecnológicos, transformaciones demográficas, restricciones fiscales y nuevas expectativas sociales. Los sistemas de bienestar alrededor del mundo deben responder simultáneamente a desafíos relacionados con envejecimiento poblacional, automatización, digitalización del trabajo, transición climática y aumento de la demanda de servicios sociales. La OCDE señala que la sostenibilidad de los sistemas de protección social depende cada vez más de la capacidad institucional para adaptarse a mercados laborales dinámicos y a nuevas formas de empleo que desafían los modelos tradicionales de financiación y cobertura (OCDE, 2024). Asimismo, organismos multilaterales destacan la necesidad de fortalecer marcos regulatorios resilientes que permitan mantener estabilidad jurídica sin limitar la innovación y la transformación organizacional (Banco Mundial, 2023). En consecuencia, la sostenibilidad regulatoria ya no se limita al cumplimiento normativo, sino que se entiende como una capacidad estratégica para equilibrar gobernanza, adaptación, transparencia y continuidad del bienestar."
        ],
        "futuro": [
          "Durante las próximas décadas, la sostenibilidad regulatoria del bienestar estará condicionada por la velocidad de los cambios tecnológicos, sociales y económicos que transformarán las bases tradicionales de la protección social. El envejecimiento poblacional, la expansión de la inteligencia artificial, la automatización del trabajo, la economía de plataformas y las nuevas formas de empleo modificarán profundamente los mecanismos de financiación y gobernanza de los sistemas de bienestar (ONU, 2024; OCDE, 2024). Como resultado, los marcos regulatorios tenderán a evolucionar hacia modelos más dinámicos, flexibles y basados en gestión de riesgos. Paralelamente, crecerá la utilización de herramientas digitales para supervisión, trazabilidad, monitoreo en tiempo real y análisis predictivo del cumplimiento regulatorio. La regulación futura dejará de centrarse exclusivamente en la vigilancia posterior para incorporar capacidades anticipatorias orientadas a prevenir riesgos sistémicos. En este escenario, la sostenibilidad regulatoria se consolidará como un componente esencial para garantizar resiliencia institucional, confianza pública y continuidad de los sistemas de bienestar frente a entornos cada vez más inciertos y complejos."
        ]
      },
      "colombia": {
        "pasado": [
          "La sostenibilidad regulatoria del bienestar en Colombia tiene una base histórica asociada a la consolidación del sistema de subsidio familiar, la seguridad social y la intervención estatal sobre entidades que administran recursos parafiscales. En sus orígenes, el sistema operó bajo marcos normativos relativamente estables, donde la prioridad era garantizar el reconocimiento del subsidio familiar y organizar la prestación de servicios sociales para trabajadores y familias. La Ley 21 de 1982 estructuró el régimen del subsidio familiar y estableció que esta prestación social se reconoce en dinero, especie y servicios, configurando una arquitectura jurídica que aún soporta la operación de las cajas de compensación (Congreso de Colombia, 1982). Con el tiempo, el crecimiento de programas, fondos de destinación específica, recursos obligatorios y exigencias de reporte amplió la complejidad regulatoria. Así, el cumplimiento normativo dejó de ser una función jurídica aislada y se convirtió en condición de continuidad institucional, legitimidad social y sostenibilidad del bienestar."
        ],
        "presente": [
          "Actualmente, la sostenibilidad regulatoria del bienestar en Colombia se desenvuelve en un entorno más exigente por la combinación de reformas sociales, restricciones fiscales, informalidad laboral, cambios tecnológicos y mayor escrutinio sobre el uso de recursos parafiscales. La Superintendencia del Subsidio Familiar dispone de estadísticas, series históricas, boletines y metodologías para observar población afiliada, empresas, infraestructura, coberturas y servicios del sistema (SSF, s. f.). Además, la informalidad laboral sigue condicionando la base contributiva del sistema: para el trimestre febrero-abril de 2026, el DANE reportó que la proporción nacional de ocupados informales fue de 55,1 %, lo que limita el crecimiento de aportes y la afiliación plena al sistema de protección social (DANE, 2026). En este escenario, la sostenibilidad regulatoria exige anticipar riesgos financieros, jurídicos y operativos, al tiempo que se preserva la finalidad social del subsidio familiar y la continuidad de los servicios de bienestar."
        ],
        "futuro": [
          "Hacia adelante, la sostenibilidad regulatoria del bienestar tenderá a depender de tres capacidades: anticipación normativa, resiliencia financiera y gobernanza basada en datos. El sistema de subsidio familiar enfrentará presiones por informalidad, cambios en el mercado laboral, envejecimiento poblacional, digitalización de servicios, protección de datos, nuevas exigencias de transparencia y eventuales reformas al sistema de protección social. La SSF cuenta con circulares vigentes y actualizaciones periódicas que modifican instrucciones aplicables a las cajas de compensación, lo cual evidencia un entorno regulatorio activo y en ajuste (SSF, 2024). Por ello, las instituciones deberán pasar de un cumplimiento reactivo a una gestión regulatoria prospectiva, capaz de simular impactos de reformas, anticipar riesgos jurídicos, medir exposición financiera y proteger la continuidad del bienestar. La regulación del futuro será menos estática y más orientada a datos, resultados, trazabilidad y control preventivo."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, la trayectoria del factor se relaciona con la expansión de cajas de compensación, servicios sociales, programas de recreación, educación, vivienda, empleo, turismo social y subsidios dirigidos a trabajadores y sus familias. A medida que el sistema creció, también aumentó la necesidad de garantizar trazabilidad, transparencia, gestión financiera, cumplimiento de destinaciones legales y alineación con instrucciones de la Superintendencia del Subsidio Familiar. Esta entidad tiene funciones de inspección, vigilancia y control, y además debe registrar y analizar información estadística del sistema, sus planes, programas y servicios sociales (Superintendencia del Subsidio Familiar [SSF], 2018). En el departamento, la sostenibilidad regulatoria se fue configurando como una capacidad de adaptación institucional frente a obligaciones nacionales, particularidades territoriales y demandas sociales crecientes. Por ello, no se limita a cumplir normas, sino a preservar la operación del bienestar en condiciones de seguridad jurídica, eficiencia administrativa y confianza pública."
        ],
        "presente": [
          "En Antioquia, el presente de este factor se expresa en la necesidad de sostener una oferta amplia de servicios sociales en medio de presiones regulatorias, financieras y territoriales. Las cajas deben cumplir instrucciones nacionales, reportar información estadística, administrar recursos con destinación específica y demostrar resultados frente a población afiliada, beneficiaria y comunidades. La operación estadística de la Superintendencia del Subsidio Familiar busca garantizar calidad, continuidad y oportunidad en la información que remiten las cajas para la toma de decisiones del sistema (SSF, 2018). En un departamento con alta diversidad económica y social, la sostenibilidad regulatoria implica armonizar cumplimiento normativo con innovación en servicios, capilaridad territorial y pertinencia del bienestar. Para Comfenalco Antioquia, esto supone fortalecer gobierno corporativo, gestión integral del riesgo, trazabilidad de programas, contratación responsable, auditoría preventiva, protección de datos y capacidad de adaptación frente a cambios en reglas de financiación, supervisión y reporte."
        ],
        "futuro": [
          "En Antioquia, la proyección del factor apunta hacia una gobernanza regulatoria más sofisticada, conectada con planeación estratégica, gestión de riesgos y sostenibilidad institucional. Las cajas de compensación deberán demostrar no solo cumplimiento formal, sino capacidad de generar bienestar con eficiencia, transparencia y evidencia. Las series históricas del sistema de subsidio familiar, disponibles desde 2020, permiten hacer seguimiento mensual a variables como población, infraestructura, recurso humano y cobertura de las cajas, insumo clave para construir tableros de sostenibilidad regulatoria (SSF, s. f.). Para Comfenalco Antioquia, esto abre la posibilidad de crear alertas tempranas sobre riesgos normativos, financieros y operativos; mapear obligaciones por servicio; evaluar impacto de cambios regulatorios; y fortalecer una cultura institucional de cumplimiento estratégico. En esta perspectiva, la sostenibilidad regulatoria no será un freno a la innovación, sino una condición para innovar con seguridad jurídica y continuidad social."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las nueve subregiones de Antioquia, la sostenibilidad regulatoria ha estado atravesada por la capacidad de extender servicios sociales bajo reglas nacionales, pero con realidades territoriales heterogéneas. Valle de Aburrá concentró mayor infraestructura institucional y capacidad operativa; Oriente, Urabá y Suroeste ganaron relevancia por su dinamismo productivo y social; mientras Bajo Cauca, Nordeste, Norte, Occidente y Magdalena Medio demandaron esquemas más flexibles de presencia institucional y control operativo. Históricamente, la regulación no siempre dialogó con la diversidad territorial, pues los estándares de reporte, habilitación, operación y financiación se definieron principalmente desde el nivel nacional. La Circular Única de la Superintendencia del Subsidio Familiar consolidó instrucciones para facilitar el cumplimiento de obligaciones aplicables a las cajas, incluyendo reglas sobre subsidio en servicios y evidencia de uso por parte de afiliados (SSF, 2022). Así, la territorialización de servicios quedó sujeta a capacidades regulatorias y administrativas diferenciadas."
        ],
        "presente": [
          "En las subregiones, el estado actual de la sostenibilidad regulatoria se manifiesta en la tensión entre reglas homogéneas y necesidades territoriales diversas. La prestación de servicios en Valle de Aburrá no enfrenta los mismos costos, riesgos ni exigencias operativas que en Urabá, Bajo Cauca, Nordeste, Occidente o Magdalena Medio, donde pueden incidir dispersión geográfica, ruralidad, seguridad, informalidad, menor infraestructura y costos logísticos. Sin embargo, los estándares de cumplimiento, reporte, calidad y trazabilidad deben mantenerse en todo el territorio. La información del DANE sobre mercado laboral permite observar empleo, desempleo e informalidad como variables críticas para la base de afiliación y aportes (DANE, s. f.). A su vez, las series de la SSF permiten monitorear población del sistema, empresas afiliadas y coberturas, lo cual es útil para identificar tensiones regulatorias y financieras por territorio (SSF, s. f.). La sostenibilidad exige modelos operativos adaptativos, pero jurídicamente consistentes."
        ],
        "futuro": [
          "En clave subregional, las tendencias indican que la sostenibilidad regulatoria deberá incorporar criterios diferenciales de operación territorial sin perder unidad normativa. Los servicios de bienestar en zonas rurales, dispersas o con baja formalización exigirán modelos híbridos, alianzas locales, trazabilidad digital, mecanismos de control remoto y esquemas de supervisión adaptados al riesgo. Valle de Aburrá requerirá gestión regulatoria para servicios masivos y complejos; Oriente y Urabá demandarán respuestas frente a crecimiento económico, migración y expansión de infraestructura; Bajo Cauca, Nordeste y Magdalena Medio necesitarán equilibrio entre presencia social, gestión de riesgos y control operativo; Occidente, Norte y Suroeste requerirán soluciones proporcionales para ruralidad, turismo social y acceso diferencial. La información territorial del DANE y los registros de la SSF pueden cruzarse para anticipar dónde la informalidad, baja afiliación o dispersión territorial presionan la sostenibilidad financiera y jurídica del bienestar (DANE, 2026; SSF, s. f.)."
        ]
      }
    },
    "sintesis": [
      "La Sostenibilidad regulatoria del bienestar será una condición crítica para garantizar que los servicios sociales, subsidios y programas de desarrollo humano mantengan continuidad en contextos normativos cambiantes. Su importancia radica en articular cumplimiento jurídico, estabilidad financiera, gobernanza institucional y adaptación territorial. En Colombia, la Ley 21 de 1982 sigue siendo base del sistema, mientras la Superintendencia del Subsidio Familiar fortalece instrucciones, estadísticas y supervisión sobre las cajas (Congreso de Colombia, 1982; SSF, s. f.). Para Comfenalco Antioquia, el reto será anticipar riesgos regulatorios, preservar confianza pública e innovar sin comprometer la seguridad jurídica del bienestar."
    ],
    "fuentes": [
      {
        "nombre": "Función Pública – Gestor Normativo",
        "descripcion": [
          "Leyes, decretos y normas oficiales aplicables al subsidio familiar, función pública, contratación, protección social y régimen institucional.",
          "Gestor Normativo – Ley 21 de 1982. Disponible en: https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=4827&utm_source"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar – Estadísticas del Sistema",
        "descripcion": [
          "Estadísticas, anuarios, boletines, cuadros y series históricas sobre población afiliada, empresas, infraestructura, recurso humano, servicios y coberturas.",
          "Estadísticas SSF. Disponible en: https://www.ssf.gov.co/informaci%C3%B3n-de-las-cajas-de-compensaci%C3%B3n-familiar2?utm_source"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar – Circulares",
        "descripcion": [
          "Circulares externas vigentes, modificaciones a la Circular Única, instrucciones de vigilancia, reporte, cumplimiento y operación del sistema.",
          "Circulares SSF. Disponible en: https://www.ssf.gov.co/circulares?utm_source"
        ]
      },
      {
        "nombre": "Datos Abiertos Colombia – Sistema del Subsidio Familiar",
        "descripcion": [
          "Conjuntos de datos públicos sobre población del sistema, empresas afiliadas, trabajadores afiliados y variables del subsidio familiar.",
          "Población Sistema del Subsidio Familiar. Disponible en: https://www.datos.gov.co/Trabajo/Poblaci-n-Sistema-del-Subsidio-Familiar/gim6-e69u/about_data"
        ]
      },
      {
        "nombre": "DANE – Mercado laboral e informalidad",
        "descripcion": [
          "Ocupación, desempleo, informalidad, seguridad social, ramas de actividad y estructura del mercado laboral, útiles para analizar base contributiva y sostenibilidad del sistema.",
          "Empleo informal y seguridad social. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/mercado-laboral/empleo-informal-y-seguridad-social?utm_source"
        ]
      }
    ]
  },
  f17: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica principalmente como una tendencia, porque expresa una trayectoria gradual, acumulativa y verificable: las organizaciones sociales han pasado de modelos centrados en operación y financiación tradicional hacia esquemas de resiliencia, eficiencia, diversificación, medición de impacto y adaptación institucional. Sin embargo, también contiene hechos portadores de futuro, como la financiación híbrida, la analítica predictiva del bienestar, la medición del retorno social, los modelos territoriales flexibles y la autosostenibilidad de servicios, que aún son señales emergentes pero podrían configurar futuros alternativos para las cajas de compensación."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "A nivel global, la sostenibilidad estratégica organizacional nació vinculada a la estabilidad financiera, la continuidad operativa y la administración eficiente de recursos. Con el tiempo, este enfoque se amplió hacia la resiliencia institucional, la creación de valor público, la gobernanza y la sostenibilidad del impacto social. La OCDE ha señalado que los sistemas de protección social requieren equilibrar accesibilidad, inclusión y asequibilidad para garantizar su sostenibilidad de largo plazo (OCDE, 2025). De manera complementaria, la CEPAL plantea que América Latina debe avanzar hacia sistemas universales, integrales, sostenibles y resilientes ante una estructura de riesgos sociales en transformación (CEPAL, 2024). Así, la sostenibilidad dejó de entenderse como supervivencia financiera y comenzó a relacionarse con la capacidad institucional de adaptarse, sostener propósito social y responder a crisis económicas, sanitarias, demográficas, laborales y ambientales."
        ],
        "presente": [
          "Actualmente, la sostenibilidad estratégica organizacional se entiende como una capacidad integral: combina viabilidad financiera, eficiencia operativa, gobernanza, innovación, legitimidad social y continuidad del impacto. En el mundo, las instituciones de bienestar enfrentan presiones simultáneas: envejecimiento poblacional, transformación digital, crisis climática, informalidad, migración, desigualdad y nuevas demandas ciudadanas. La OCDE advierte que la protección social debe sostenerse financieramente sin perder inclusión ni cobertura, mientras que la CEPAL insiste en fortalecer sistemas resilientes frente a brechas sociales persistentes (OCDE, 2025; CEPAL, 2024). Por ello, las organizaciones sociales ya no pueden evaluar su sostenibilidad solo por balances contables; deben demostrar capacidad de adaptación, generación de valor público, eficiencia del gasto e impacto verificable sobre el bienestar. Este cambio redefine la gestión institucional y exige modelos de planeación más anticipatorios, flexibles y basados en evidencia."
        ],
        "futuro": [
          "Hacia el futuro, la sostenibilidad estratégica organizacional tenderá a medirse por la resiliencia institucional y la capacidad de sostener impacto social en contextos de incertidumbre. En el plano global, las organizaciones de bienestar avanzarán hacia modelos de financiación diversificada, analítica de riesgos, inteligencia institucional, sostenibilidad ESG, medición de retorno social y gestión anticipatoria. La OCDE ha analizado la financiación de la protección social y las distintas formas de vincular ingresos con gasto social, lo que evidencia la importancia de diversificar fuentes y proteger la estabilidad de los sistemas (OCDE, 2024). De igual manera, la CEPAL plantea que los sistemas de protección social deberán responder a nuevos riesgos sociales, económicos y demográficos mediante estructuras más integrales y resilientes (CEPAL, 2024). Por consiguiente, la sostenibilidad futura será financiera, tecnológica, social, reputacional y adaptativa."
        ]
      },
      "colombia": {
        "pasado": [
          "En Colombia, la retrospectiva del factor se asocia directamente con la evolución del sistema de compensación familiar, cuyo marco histórico se consolidó con la Ley 21 de 1982. Esta norma definió el subsidio familiar como una prestación social y estableció el papel de las cajas de compensación en la administración de beneficios monetarios, servicios sociales y programas orientados al bienestar de trabajadores y familias (Congreso de Colombia, 1982). Inicialmente, la sostenibilidad dependía de los aportes empresariales derivados del empleo formal, lo que permitió estructurar servicios de recreación, educación, vivienda, crédito social, cultura y protección al cesante. Sin embargo, dicha dependencia también generó una vulnerabilidad estructural: cuando el mercado laboral formal se desacelera, se reduce la base de financiación. Por ello, históricamente, las cajas han transitado hacia modelos de fortalecimiento organizacional, eficiencia operativa y diversificación progresiva de ingresos."
        ],
        "presente": [
          "En Colombia, el factor adquiere especial relevancia porque la financiación de las cajas continúa vinculada al empleo formal, mientras una proporción importante de la población ocupada permanece en la informalidad. Según el DANE, en el trimestre móvil febrero–abril de 2026 la proporción nacional de ocupados informales fue de 55,1 %, aunque disminuyó frente al mismo periodo del año anterior (DANE, 2026). Esto significa que una parte amplia de la fuerza laboral tiene vínculos débiles o inexistentes con los mecanismos contributivos tradicionales. Paralelamente, la Superintendencia del Subsidio Familiar publica boletines estadísticos trimestrales que permiten analizar afiliados, empresas, aportes, servicios y tendencias del sistema (Superintendencia del Subsidio Familiar, 2025). En este escenario, la sostenibilidad actual exige profesionalizar servicios, ampliar capacidades digitales, mejorar eficiencia interna y explorar fuentes complementarias de ingreso."
        ],
        "futuro": [
          "En Colombia, las proyecciones del factor estarán determinadas por el comportamiento del empleo formal, la informalidad, la composición empresarial, los cambios demográficos y la capacidad de las cajas para ampliar su pertinencia social. Si la base contributiva continúa tensionada por informalidad y nuevas formas de trabajo, las cajas deberán fortalecer estrategias de autosostenibilidad, alianzas, innovación en servicios, eficiencia de costos y medición del impacto. La información histórica del DANE sobre empleo, desempleo e informalidad permite proyectar escenarios laborales que afectan directamente la financiación del sistema (DANE, 2026). A su vez, los datos abiertos de la Superintendencia del Subsidio Familiar sobre población del sistema permiten analizar empresas afiliadas, trabajadores afiliados y beneficiarios desde 2019, insumo clave para construir escenarios prospectivos de sostenibilidad (Superintendencia del Subsidio Familiar, 2024)."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, la sostenibilidad organizacional de las cajas se fue configurando alrededor de la capacidad de sostener servicios sociales en un departamento con alta concentración económica, fuerte tejido empresarial y profundas brechas territoriales. El Valle de Aburrá concentró históricamente empleo formal, población afiliada, infraestructura institucional y mayor demanda de servicios especializados. Entretanto, regiones como Urabá, Bajo Cauca, Nordeste y Magdalena Medio evidenciaron mayores retos de acceso, informalidad, ruralidad y vulnerabilidad social. La Gobernación de Antioquia, a través del Anuario Estadístico, la Encuesta de Calidad de Vida, las cuentas económicas y las fichas municipales, recopila información clave para analizar la evolución económica, social y territorial del departamento (Gobernación de Antioquia, 2025). Por tanto, la sostenibilidad institucional en Antioquia no ha sido homogénea: ha dependido de la capacidad de articular escala metropolitana con presencia territorial diferenciada."
        ],
        "presente": [
          "En Antioquia, la sostenibilidad estratégica organizacional se expresa en la necesidad de sostener cobertura social en un territorio económicamente dinámico, pero socialmente desigual. El departamento combina zonas metropolitanas con alta concentración empresarial y subregiones donde predominan ruralidad, economías informales, dispersión geográfica y brechas de acceso a servicios. Antioquia Datos y el Anuario Estadístico Departamental ofrecen información económica, social y ambiental para analizar estas diferencias y orientar decisiones de política y gestión institucional (Gobernación de Antioquia, 2025). Para una caja de compensación, esto implica que la sostenibilidad no se limita a mantener ingresos, sino que también supone decidir dónde invertir, cómo equilibrar servicios rentables y subsidiados, cómo priorizar poblaciones y cómo sostener presencia institucional fuera de los centros urbanos. En consecuencia, la sostenibilidad departamental depende de eficiencia, pertinencia territorial y capacidad de articulación público-privada."
        ],
        "futuro": [
          "En Antioquia, la tendencia apunta hacia un modelo de sostenibilidad organizacional territorialmente inteligente. Esto implica combinar crecimiento financiero, transformación digital, eficiencia operativa, innovación social y enfoque diferencial por subregión. El Valle de Aburrá podrá consolidar servicios especializados, plataformas digitales y modelos de bienestar personalizado; Oriente requerirá planificación asociada a expansión empresarial, vivienda y movilidad; Urabá demandará soluciones conectadas con desarrollo logístico, empleo y formación; Bajo Cauca, Nordeste y Magdalena Medio necesitarán modelos resilientes de intervención social; Norte, Occidente y Suroeste exigirán esquemas flexibles de atención rural, envejecimiento y bienestar comunitario. La disponibilidad de información en Antioquia Datos, fichas municipales y cuentas económicas permite anticipar brechas y orientar inversiones con evidencia (Gobernación de Antioquia, 2025). En este sentido, la sostenibilidad futura dependerá de traducir datos territoriales en decisiones de portafolio, cobertura e inversión social."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las nueve subregiones de Antioquia, la retrospectiva muestra que la sostenibilidad estratégica ha estado condicionada por vocaciones económicas, densidad empresarial, conectividad, formalización laboral y capacidades institucionales. Valle de Aburrá funcionó como eje financiero y operativo; Oriente y Suroeste fortalecieron dinámicas productivas, turísticas y de servicios; Urabá combinó potencial logístico y agroindustrial con retos sociales; Bajo Cauca, Nordeste y Magdalena Medio enfrentaron mayores presiones por conflictividad, informalidad y dispersión poblacional; mientras Norte y Occidente demandaron esquemas de atención más próximos y flexibles. En consecuencia, la sostenibilidad de una caja de compensación en Antioquia ha requerido combinar eficiencia centralizada con adaptación territorial. TerriData permite observar indicadores municipales, departamentales y regionales comparables, útiles para reconstruir estas trayectorias territoriales (DNP, 2026)."
        ],
        "presente": [
          "En las nueve subregiones, el presente del factor revela desafíos diferenciados. Valle de Aburrá demanda servicios sofisticados, digitales y de alta escala; Oriente requiere respuestas ante crecimiento urbano, industrialización y presión sobre calidad de vida; Urabá necesita modelos asociados a movilidad social, empleo, logística y desarrollo empresarial; Bajo Cauca, Nordeste y Magdalena Medio exigen intervenciones resilientes por vulnerabilidad social, informalidad y transición productiva; Norte, Occidente y Suroeste requieren soluciones de proximidad, atención rural, envejecimiento y bienestar comunitario. TerriData facilita consultar indicadores estandarizados por municipio y departamento, lo cual permite construir diagnósticos subregionales y comparar condiciones socioeconómicas (DNP, 2026). Así, la sostenibilidad organizacional actual se juega en la capacidad de adaptar portafolios, costos, alianzas y modelos de atención a realidades territoriales heterogéneas."
        ],
        "futuro": [
          "En las nueve subregiones, la proyección del factor exige abandonar una lógica uniforme y avanzar hacia modelos diferenciados de sostenibilidad. En territorios con alta formalización, la prioridad será sofisticar servicios, fortalecer fidelización empresarial y generar ingresos complementarios. En zonas con baja densidad empresarial o alta vulnerabilidad, el desafío consistirá en sostener presencia institucional mediante alianzas, subsidios focalizados, cooperación, operación liviana y servicios de alto impacto. TerriData ofrece indicadores comparables para todas las entidades territoriales, lo cual permite construir tableros subregionales de sostenibilidad, riesgo y oportunidad (DNP, 2026). Así, el futuro de Comfenalco Antioquia dependerá de su capacidad para equilibrar escala, rentabilidad y propósito, convirtiendo la inteligencia territorial en ventaja competitiva. Si este proceso se consolida, la sostenibilidad estratégica dejará de ser un soporte administrativo y se convertirá en una capacidad prospectiva central."
        ]
      }
    },
    "sintesis": [
      "La sostenibilidad estratégica organizacional será determinante para que las cajas de compensación mantengan su relevancia en un entorno de informalidad, transformación laboral, presión financiera y nuevas demandas de bienestar. En consecuencia, el factor debe entenderse como una capacidad dinámica que integra resiliencia, eficiencia, diversificación, impacto social y adaptación territorial. Para Colombia, la sostenibilidad dependerá de ampliar pertinencia sin debilitar el propósito solidario; para Antioquia, exigirá respuestas diferenciadas en sus nueve subregiones. Por tanto, el futuro institucional estará marcado por la capacidad de convertir datos, alianzas, innovación y medición de impacto en decisiones sostenibles de largo plazo (CEPAL, 2024; DANE, 2026; Superintendencia del Subsidio Familiar, 2025)."
    ],
    "fuentes": [
      {
        "nombre": "Superintendencia del Subsidio Familiar",
        "descripcion": [
          "Boletines estadísticos trimestrales, población afiliada, empresas, trabajadores, beneficiarios, servicios, subsidios y presencia regional del sistema.",
          "Boletines estadísticos SSF. Disponible en: https://www.ssf.gov.co/boletines-estad%C3%ADsticos?utm_source"
        ]
      },
      {
        "nombre": "Datos Abiertos Colombia – SuperSubsidio",
        "descripcion": [
          "Base “Población del Sistema de Subsidio Familiar Consolidado”, con datos desde 2019 sobre empresas afiliadas, trabajadores afiliados y beneficiarios.",
          "Datos abiertos del Sistema de Subsidio Familiar. Disponible en: https://www.datos.gov.co/Trabajo/Poblaci-n-del-Sistema-de-Subsidio-Familiar-Consoli/ese3-e6sh?utm_source"
        ]
      },
      {
        "nombre": "DANE – GEIH / Mercado laboral",
        "descripcion": [
          "Empleo, desempleo, informalidad, seguridad social, ocupación y series históricas nacionales y territoriales.",
          "DANE empleo y desempleo. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/mercado-laboral/empleo-y-desempleo?utm_source"
        ]
      },
      {
        "nombre": "DNP – TerriData",
        "descripcion": [
          "Indicadores municipales, departamentales y regionales sobre población, economía, pobreza, educación, salud, finanzas públicas y desarrollo territorial.",
          "TerriData DNP. Disponible en: https://terridata.dnp.gov.co/?utm_source"
        ]
      },
      {
        "nombre": "Gobernación de Antioquia – Antioquia Datos",
        "descripcion": [
          "Anuario Estadístico, Encuesta de Calidad de Vida, cuentas económicas departamentales, fichas municipales y tableros subregionales.",
          "Antioquia Datos. Disponible en: https://www.antioquia.gov.co/index.php/informacion/estadisticas-e-indicadores?utm_source"
        ]
      }
    ]
  },
  f18: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica como una tendencia estructural, porque recoge cambios sostenidos en la forma como las personas viven, trabajan, se relacionan, conforman hogares, acceden a servicios y demandan bienestar. No es una señal aislada, sino una dinámica amplia que articula cambios demográficos, culturales, tecnológicos, laborales, familiares y territoriales. En las cajas de compensación, esta tendencia exige revisar modelos de atención, canales, estructuras, cultura organizacional y formas de generar valor social. Dentro de esta tendencia también se observan hechos portadores de futuro, como organizaciones líquidas, bienestar hiperpersonalizado, trabajo híbrido permanente, inteligencia artificial aplicada a servicios sociales, comunidades digitales de cuidado, nuevas formas familiares y modelos de autogestión ciudadana. Si estas señales se consolidan, podrían redefinir la arquitectura institucional del bienestar."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "A nivel global, las transformaciones sociales y organizacionales tienen sus raíces en los profundos cambios económicos, tecnológicos y culturales ocurridos desde mediados del siglo XX. Durante gran parte de la era industrial, las organizaciones operaron bajo estructuras jerárquicas, modelos burocráticos y esquemas de producción relativamente estables, diseñados para entornos predecibles y mercados menos dinámicos. Sin embargo, la globalización, el avance de las tecnologías de la información, la expansión de las comunicaciones digitales y la creciente interdependencia económica comenzaron a modificar las formas de trabajo, consumo y relacionamiento social. Castells (1999) describió este proceso como la transición hacia una “sociedad red”, caracterizada por estructuras más flexibles, conectadas y descentralizadas. Paralelamente, se transformaron las configuraciones familiares, los roles de género, las dinámicas laborales y las expectativas ciudadanas. Como resultado, las organizaciones empezaron a enfrentar la necesidad de adaptarse a entornos más complejos, diversos y cambiantes, sentando las bases de las transformaciones institucionales contemporáneas."
        ],
        "presente": [
          "En la actualidad, las transformaciones sociales y organizacionales constituyen uno de los fenómenos más relevantes para gobiernos, empresas y organizaciones sociales. La convergencia entre digitalización, inteligencia artificial, trabajo híbrido, envejecimiento poblacional, nuevas formas de ciudadanía y cambios culturales está redefiniendo las relaciones entre individuos e instituciones. Según el World Economic Forum (2025), las organizaciones enfrentan un entorno caracterizado por cambios acelerados en habilidades laborales, expectativas de los trabajadores y adopción tecnológica, obligándolas a desarrollar capacidades permanentes de adaptación. Al mismo tiempo, la OCDE señala que fenómenos como la transición demográfica, la transformación digital y las nuevas demandas de bienestar están modificando profundamente los modelos organizacionales tradicionales (OCDE, 2024). En consecuencia, las estructuras rígidas están siendo reemplazadas por modelos más colaborativos, flexibles y orientados a la experiencia humana. Hoy, la capacidad de adaptación organizacional se ha convertido en un factor determinante para la sostenibilidad institucional y la generación de valor social."
        ],
        "futuro": [
          "Hacia las próximas décadas, las transformaciones sociales y organizacionales tenderán a profundizarse como resultado de la interacción entre inteligencia artificial, automatización, longevidad, transición climática, diversidad cultural y cambios en las formas de trabajo y convivencia. Diversos organismos internacionales proyectan que las organizaciones evolucionarán hacia modelos más ágiles, distribuidos y adaptativos, donde las fronteras entre lo físico y lo digital serán cada vez más difusas (World Economic Forum, 2025). Paralelamente, el aumento de la esperanza de vida, la reducción del tamaño de los hogares y la creciente demanda de personalización impulsarán nuevas formas de provisión de servicios y bienestar (ONU, 2024). En este contexto, la capacidad de aprendizaje continuo, innovación colaborativa y adaptación cultural será más importante que la estabilidad estructural. Las organizaciones del futuro deberán funcionar como sistemas dinámicos capaces de anticipar cambios, gestionar incertidumbre y responder rápidamente a necesidades emergentes, fortaleciendo resiliencia institucional, cohesión social y bienestar humano en entornos cada vez más complejos."
        ]
      },
      "colombia": {
        "pasado": [
          "En Colombia, las transformaciones sociales y organizacionales surgieron de un tránsito gradual entre instituciones diseñadas para sociedades más estables y una realidad marcada por urbanización, cambios familiares, digitalización, envejecimiento, nuevas ciudadanías y diversificación cultural. Durante décadas, muchas organizaciones sociales funcionaron bajo esquemas verticales, procesos lineales y servicios homogéneos. No obstante, la expansión de derechos, la modernización del Estado, la apertura económica y el avance tecnológico comenzaron a modificar las expectativas de los ciudadanos frente a la atención institucional. Castells (1999) explicó que la sociedad red transformó las formas de organización, comunicación y producción, dando lugar a estructuras más flexibles y conectadas. En Colombia, encuestas como la ECV del DANE permiten observar cambios en vivienda, salud, educación, cuidado, TIC, bienes del hogar y percepción de condiciones de vida, variables que evidencian nuevas demandas sociales (DANE, 2026)."
        ],
        "presente": [
          "Actualmente, Colombia vive transformaciones sociales que presionan a las organizaciones a rediseñar sus modelos de gestión y relación con la ciudadanía. La Encuesta Nacional de Calidad de Vida 2025 caracteriza condiciones de vivienda, salud, educación, cuidado, uso de TIC, tenencia de bienes y percepción de los hogares, lo que permite identificar nuevas configuraciones de bienestar y demanda social (DANE, 2026). Además, las proyecciones de población del DANE, elaboradas con base en el CNPV 2018 y actualizadas con información posterior a la pandemia, permiten analizar cambios demográficos hasta 2070, incluyendo dinámicas de envejecimiento, composición territorial y hogares (DANE, s. f.). Estos procesos modifican las necesidades de cuidado, empleo, recreación, educación, vivienda y protección social. Para las cajas de compensación, el presente exige pasar de servicios estandarizados a experiencias más flexibles, segmentadas y conectadas con ciclos de vida, territorios y expectativas culturales emergentes."
        ],
        "futuro": [
          "Hacia el futuro, las transformaciones sociales y organizacionales en Colombia estarán impulsadas por envejecimiento poblacional, reducción del tamaño de los hogares, cambios familiares, digitalización de la vida cotidiana, automatización del trabajo, nuevas formas de ciudadanía y mayor exigencia de servicios personalizados. Las proyecciones poblacionales del DANE permiten analizar la evolución demográfica nacional, departamental y municipal con horizonte hasta 2070, insumo clave para anticipar necesidades sociales (DANE, s. f.). A su vez, la ECV ofrece información sobre condiciones de vida y uso de TIC, lo que permite observar cómo cambian los hogares y sus demandas (DANE, 2026). Para el sistema de compensación familiar, estas tendencias implican rediseñar la experiencia del afiliado, integrar servicios físicos y digitales, fortalecer capacidades de cuidado, ampliar modelos de bienestar para hogares diversos y adoptar estructuras organizacionales más flexibles, colaborativas y orientadas a datos."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, este factor se expresó inicialmente en la consolidación de organizaciones empresariales, sociales y públicas con fuerte vocación de servicio, pero estructuradas bajo modelos administrativos tradicionales. Medellín y el Valle de Aburrá concentraron innovación institucional, oferta educativa, empleo formal y servicios especializados, mientras otras zonas del departamento avanzaron con ritmos distintos. Con el paso del tiempo, los cambios productivos, la urbanización, la expansión de la educación, las nuevas tecnologías y las brechas sociales obligaron a rediseñar la forma de llegar a los territorios. La Gobernación de Antioquia ha desarrollado instrumentos como el Anuario Estadístico, la Encuesta de Calidad de Vida y fichas municipales para leer estas diferencias y apoyar decisiones de planeación (Gobernación de Antioquia, s. f.). Así, la transformación organizacional dejó de ser únicamente modernización interna y empezó a relacionarse con capacidad de respuesta frente a hogares, comunidades y subregiones diversas."
        ],
        "presente": [
          "En Antioquia, el presente de este factor combina una alta capacidad institucional con brechas territoriales persistentes. Antioquia Datos reúne información del Anuario Estadístico, Encuesta de Calidad de Vida, fichas municipales y tableros sociales y económicos, insumos que permiten observar condiciones diferenciales de los hogares y territorios (Gobernación de Antioquia, s. f.). Esta infraestructura de información es clave porque las transformaciones sociales no se expresan igual en Medellín, el Oriente, Urabá o Bajo Cauca. Mientras algunos territorios demandan servicios digitales, bienestar laboral, salud mental y envejecimiento activo, otros requieren presencia institucional, inclusión productiva, educación, cuidado y fortalecimiento comunitario. En consecuencia, las organizaciones del bienestar enfrentan el reto de actuar con doble capacidad: eficiencia institucional y sensibilidad territorial. En el caso de Comfenalco Antioquia, esto implica adaptar portafolios, canales, cultura interna y modelos de relacionamiento con empresas, afiliados, familias y comunidades."
        ],
        "futuro": [
          "En Antioquia, las proyecciones sugieren una presión creciente sobre las organizaciones sociales para responder a territorios más complejos, poblaciones más diversas y demandas de bienestar más sofisticadas. La disponibilidad de Antioquia Datos y de las encuestas territoriales permitirá anticipar cambios en calidad de vida, estructura poblacional, brechas municipales y acceso a servicios (Gobernación de Antioquia, s. f.). En paralelo, la transformación digital y la inteligencia artificial modificarán la manera de planear, prestar y evaluar servicios sociales. Para Comfenalco Antioquia, el horizonte estratégico apunta hacia una organización más adaptativa: capaz de combinar sedes físicas, plataformas digitales, analítica social, alianzas comunitarias y gestión por experiencias. La transformación organizacional futura no consistirá solamente en digitalizar procesos, sino en construir una cultura institucional abierta al aprendizaje, la innovación social, la experimentación y el rediseño permanente de soluciones de bienestar."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las nueve subregiones antioqueñas, la trayectoria de las transformaciones sociales y organizacionales ha sido desigual. El Valle de Aburrá concentró procesos de urbanización, digitalización, educación superior y sofisticación institucional; Oriente combinó crecimiento empresarial, turismo, agroindustria y cambios residenciales; Urabá articuló dinámicas agroexportadoras, migratorias y logísticas; Suroeste y Occidente conservaron vínculos rurales, cafeteros y turísticos; Norte, Nordeste, Bajo Cauca y Magdalena Medio enfrentaron mayores retos de informalidad, dispersión geográfica, vulnerabilidad social y acceso institucional. TerriData, del DNP, permite observar estadísticas municipales y regionales comparables para comprender estas diferencias territoriales (DNP, s. f.). En esa perspectiva, las organizaciones que gestionan bienestar fueron entendiendo que no bastaba con replicar un mismo modelo de atención, sino que era necesario adaptar estructuras, lenguajes, servicios y alianzas a las realidades socioculturales de cada subregión."
        ],
        "presente": [
          "En las subregiones, el estado actual revela que las transformaciones sociales y organizacionales deben leerse desde la diversidad de condiciones locales. Valle de Aburrá requiere respuestas frente a envejecimiento, salud mental, movilidad, empleo y digitalización; Oriente exige equilibrio entre crecimiento económico, expansión urbana y ruralidad; Urabá demanda acompañamiento institucional ante desarrollo portuario, migración y cambios productivos; Suroeste y Occidente necesitan fortalecer turismo, ruralidad y acceso a servicios; Norte, Nordeste, Bajo Cauca y Magdalena Medio requieren mayor cohesión social, formalización, conectividad y capacidad comunitaria. TerriData facilita la visualización de indicadores municipales, departamentales y regionales para orientar decisiones territoriales diferenciadas (DNP, s. f.). Adicionalmente, la Superintendencia del Subsidio Familiar publica series históricas mensuales desde 2020 sobre población, infraestructura, recurso humano y coberturas de las cajas, útiles para evaluar presencia institucional y capacidad de respuesta (SSF, s. f.)."
        ],
        "futuro": [
          "En las nueve subregiones, las tendencias indican que la transformación social tendrá expresiones territoriales contrastantes. El Valle de Aburrá requerirá modelos de bienestar urbano, digital y preventivo; Oriente demandará servicios para hogares en expansión, población flotante y nuevas economías; Urabá necesitará instituciones preparadas para cambios logísticos, migratorios y laborales; Suroeste y Occidente podrán orientar su transformación hacia ruralidad, turismo y envejecimiento activo; Norte, Nordeste, Bajo Cauca y Magdalena Medio requerirán modelos organizacionales con mayor capilaridad, alianzas locales y atención flexible. El DNP señala que TerriData fortalece la gestión pública mediante datos estadísticos municipales, departamentales y regionales, promoviendo indicadores estandarizados y comparables (DNP, 2023). Desde una mirada prospectiva, la clave será convertir estas lecturas territoriales en rediseño institucional, pasando de organizaciones centradas en oferta a organizaciones capaces de aprender del territorio y co-crear bienestar."
        ]
      }
    },
    "sintesis": [
      "Las transformaciones sociales y organizacionales configuran una tendencia decisiva para el futuro del bienestar desde la compensación familiar. Su fuerza proviene de la interacción entre cambios demográficos, nuevas formas de hogar, digitalización, diversidad cultural, expectativas ciudadanas y reorganización institucional. En Colombia, las fuentes del DANE permiten leer cambios en calidad de vida y población; en el territorio, TerriData y Antioquia Datos ofrecen insumos para comprender diferencias regionales; y en el sistema de compensación, las series de la SSF muestran capacidades y coberturas institucionales (DANE, 2026; DNP, s. f.; SSF, s. f.). El reto será transformar estructuras sin perder cercanía humana."
    ],
    "fuentes": [
      {
        "nombre": "DANE – Encuesta Nacional de Calidad de Vida, ECV",
        "descripcion": [
          "Información sobre vivienda, salud, educación, cuidado, uso de TIC, tenencia de bienes, composición de hogares y percepción de condiciones de vida.",
          "ECV DANE. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/salud/calidad-de-vida-ecv/encuesta-nacional-de-calidad-de-vida-ecv-2025?utm_source"
        ]
      },
      {
        "nombre": "DANE – Proyecciones y retroproyecciones de población",
        "descripcion": [
          "Series nacionales, departamentales y municipales sobre evolución poblacional, hogares, viviendas, área y pertenencia étnico-racial, con horizontes de largo plazo.",
          "Proyecciones de población DANE. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/demografia-y-poblacion/proyecciones-de-poblacion?utm_source"
        ]
      },
      {
        "nombre": "DNP – TerriData",
        "descripcion": [
          "Indicadores municipales, departamentales y regionales sobre educación, salud, economía, población, gobierno, ruralidad, conflicto y condiciones territoriales.",
          "TerriData DNP. Disponible en: https://terridata.dnp.gov.co/?utm_source"
        ]
      },
      {
        "nombre": "Gobernación de Antioquia – Antioquia Datos",
        "descripcion": [
          "Anuario Estadístico, Encuesta de Calidad de Vida, tableros sociales y económicos, fichas municipales y datos territoriales de Antioquia.",
          "Antioquia Datos. Disponible en: https://www.antioquiadatos.gov.co/?utm_source"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar – Series históricas",
        "descripcion": [
          "Información mensual desde 2020 sobre población, infraestructura, recurso humano y coberturas de las cajas de compensación familiar.",
          "Series históricas SSF. Disponible en: https://www.ssf.gov.co/series-hist%C3%B3ricas?utm_source"
        ]
      }
    ]
  },
  f19: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica como una tendencia estructural de largo plazo, porque refleja una transformación consolidada en la manera de comprender el bienestar: ya no como crecimiento económico o sostenimiento institucional aislado, sino como equilibrio entre desarrollo humano, inclusión social, sostenibilidad ambiental, resiliencia territorial y justicia intergeneracional. En el sistema de compensación familiar, esta tendencia exige conectar subsidios, servicios, empleo, vivienda, educación, recreación, cuidado, ambiente y cohesión social. A su vez, contiene hechos portadores de futuro, como bienestar regenerativo, economía circular territorial, servicios sociales carbono-neutros, medición de sostenibilidad intergeneracional, infraestructura social resiliente al clima y ecosistemas de bienestar basados en datos. Si estas señales se consolidan, podrían redefinir el papel futuro de las cajas de compensación."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "A nivel global, el concepto de desarrollo sostenible emergió como respuesta a la creciente preocupación por los límites ambientales del crecimiento económico y sus impactos sociales. Durante gran parte del siglo XX predominó una visión centrada en la industrialización, el incremento de la productividad y la expansión económica como principales indicadores de progreso. Sin embargo, el deterioro ambiental, la pérdida de biodiversidad, la contaminación y el aumento de las desigualdades evidenciaron que el crecimiento económico por sí solo no garantizaba bienestar para las poblaciones. Un punto de inflexión ocurrió con la publicación del Informe Brundtland, que definió el desarrollo sostenible como la satisfacción de las necesidades presentes sin comprometer las capacidades de las generaciones futuras (Comisión Mundial sobre Medio Ambiente y Desarrollo [CMMAD], 1987). Posteriormente, las conferencias de Río de Janeiro (1992) y Johannesburgo (2002) consolidaron una visión que integró dimensiones económicas, sociales y ambientales, sentando las bases para un enfoque multidimensional del bienestar y la sostenibilidad (Naciones Unidas, 2015)."
        ],
        "presente": [
          "Actualmente, el desarrollo sostenible constituye uno de los principales marcos de referencia para orientar las políticas públicas, las estrategias empresariales y las iniciativas de desarrollo social en el mundo. La Agenda 2030 y los 17 Objetivos de Desarrollo Sostenible (ODS) representan el consenso internacional más amplio para abordar simultáneamente desafíos relacionados con pobreza, salud, educación, igualdad, trabajo decente, acción climática, consumo responsable y fortalecimiento institucional (Naciones Unidas, 2015). Sin embargo, los informes recientes de Naciones Unidas evidencian que el progreso global presenta importantes rezagos debido a conflictos geopolíticos, crisis económicas, efectos persistentes de la pandemia, aumento de eventos climáticos extremos y profundización de desigualdades territoriales y sociales (ONU, 2024). En consecuencia, la sostenibilidad ya no se limita a la protección ambiental, sino que se entiende como la capacidad de construir sociedades resilientes, inclusivas y prósperas, capaces de equilibrar bienestar humano, crecimiento económico y conservación de los ecosistemas en un contexto de creciente incertidumbre global."
        ],
        "futuro": [
          "Hacia las próximas décadas, el desarrollo sostenible se consolidará como un eje articulador de las grandes transformaciones económicas, sociales, tecnológicas y ambientales del planeta. Diversos organismos internacionales proyectan que fenómenos como el cambio climático, el envejecimiento poblacional, la transición energética, la automatización del trabajo, la urbanización acelerada y la presión sobre los recursos naturales redefinirán las condiciones para el bienestar humano (IPCC, 2023; ONU, 2024). En este contexto, la sostenibilidad evolucionará desde enfoques de mitigación hacia modelos regenerativos capaces de restaurar ecosistemas, fortalecer la cohesión social y garantizar prosperidad compartida. Asimismo, crecerá la relevancia de conceptos como resiliencia territorial, economía circular, infraestructura verde, justicia climática y sostenibilidad intergeneracional. Bajo esta perspectiva, el desarrollo sostenible dejará de ser un objetivo sectorial para convertirse en una capacidad sistémica orientada a construir ecosistemas humanos, sociales, económicos y ambientales adaptativos, inclusivos y regenerativos, capaces de sostener el bienestar de las generaciones presentes y futuras."
        ]
      },
      "colombia": {
        "pasado": [
          "En Colombia, el desarrollo sostenible pasó de entenderse como crecimiento económico y provisión básica de servicios a convertirse en una agenda integral de bienestar, equidad y sostenibilidad ambiental. Durante buena parte del siglo XX, las políticas sociales estuvieron centradas en ampliar cobertura, infraestructura, empleo y protección básica. Posteriormente, con la incorporación de agendas globales como los Objetivos de Desarrollo Sostenible, el país empezó a medir el progreso desde múltiples dimensiones: pobreza, salud, educación, trabajo decente, desigualdad, sostenibilidad urbana, acción climática y fortalecimiento institucional. El DANE dispone de una plataforma de seguimiento a los ODS que permite visualizar información oficial sobre estos objetivos en Colombia (Departamento Administrativo Nacional de Estadística [DANE], s. f.). De esta manera, el desarrollo sostenible dejó de ser una aspiración ambiental o económica y se convirtió en un marco articulador para evaluar bienestar humano, cohesión social y sostenibilidad territorial."
        ],
        "presente": [
          "Actualmente, Colombia cuenta con avances sociales relevantes, pero mantiene desafíos estructurales en desigualdad, informalidad, sostenibilidad fiscal, cambio climático y brechas territoriales. En 2025, la pobreza multidimensional nacional fue de 9,9 %, frente a 11,5 % en 2024, de acuerdo con el DANE; este resultado muestra una mejora en privaciones asociadas a educación, niñez, salud, trabajo, vivienda y servicios públicos (DANE, 2026). Además, Sinergia del DNP permite consultar el avance y cumplimiento de los 17 ODS y la Agenda 2030, mediante datos oficiales y herramientas de seguimiento (DNP, s. f.). Para la compensación familiar, el presente exige conectar sostenibilidad social y económica: reducir privaciones, fortalecer empleabilidad, ampliar acceso a servicios, responder al envejecimiento y construir bienestar sin profundizar desigualdades territoriales ni impactos ambientales."
        ],
        "futuro": [
          "Hacia el futuro, el desarrollo sostenible en Colombia dependerá de la capacidad de integrar transición climática, reducción de desigualdades, productividad, envejecimiento, empleos verdes, digitalización y sostenibilidad financiera de los sistemas sociales. El Explorador de Datos de los ODS de Sinergia facilita el acceso a indicadores oficiales, gráficos, mapas y tablas interactivas para analizar la evolución de los objetivos, identificar brechas y apoyar decisiones con información abierta (DNP, s. f.). Esta orientación anticipa una gestión pública y social más basada en evidencia. Para las cajas de compensación, la proyección consiste en diseñar portafolios que integren bienestar laboral, vivienda sostenible, formación para nuevas economías, recreación responsable, salud preventiva, cuidado y servicios territoriales resilientes. El desarrollo sostenible dejará de ser un marco externo de responsabilidad social para convertirse en criterio central de continuidad institucional y legitimidad social."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, la retrospectiva del desarrollo sostenible está marcada por el tránsito de una economía departamental históricamente industrial, agrícola, minera, comercial y de servicios hacia una visión más amplia del desarrollo territorial. Inicialmente, el progreso se midió por crecimiento productivo, infraestructura, urbanización y consolidación empresarial; sin embargo, las brechas entre Medellín, el Valle de Aburrá y las demás subregiones mostraron que el desarrollo no podía evaluarse solo por indicadores económicos. Los instrumentos estadísticos departamentales, como el Anuario Estadístico, la Encuesta de Calidad de Vida y las fichas municipales, han permitido observar condiciones sociales, económicas y territoriales para orientar la planeación pública (Gobernación de Antioquia, s. f.). Así, Antioquia avanzó hacia una comprensión más compleja del bienestar: una que integra ingreso, ruralidad, empleo, servicios, calidad de vida, sostenibilidad ambiental, capacidades locales y equidad subregional."
        ],
        "presente": [
          "En Antioquia, el desarrollo sostenible se expresa en una tensión entre dinamismo económico y persistencia de brechas sociales y territoriales. El departamento se destaca en producción agrícola, empleo y capacidades institucionales, pero enfrenta retos relacionados con ruralidad, envejecimiento, informalidad, conectividad, sostenibilidad ambiental y equilibrio urbano-rural. El Informe de Calidad de Vida de Antioquia 2023 señala que en Antioquia vive el 12 % de los campesinos del país y que, aunque la población urbana aumentó 88 % en los últimos 34 años, la población rural se redujo 6 %, lo que evidencia transformaciones territoriales relevantes (Antioquia Cómo Vamos, 2026). En este contexto, el bienestar desde la compensación familiar debe actuar como puente entre productividad, inclusión social y resiliencia territorial. No basta con ampliar cobertura; se requiere medir si los servicios contribuyen a condiciones de vida sostenibles y a cohesión social."
        ],
        "futuro": [
          "En Antioquia, las tendencias sugieren que el desarrollo sostenible deberá articular competitividad, transición ecológica, inclusión rural, cohesión social y resiliencia ante riesgos climáticos. La disponibilidad de datos territoriales, como Antioquia Datos y la Encuesta de Calidad de Vida, permitirá construir líneas base para evaluar condiciones sociales, económicas y ambientales. A medida que crezcan las presiones por urbanización, envejecimiento, automatización, informalidad y deterioro ambiental, las instituciones de bienestar tendrán que priorizar intervenciones con impacto intergeneracional. Para Comfenalco Antioquia, esto implica evolucionar hacia modelos de bienestar sostenible: infraestructura social eficiente, servicios con menor huella ambiental, programas de empleabilidad verde, turismo social responsable, educación para sostenibilidad, vivienda digna y alianzas subregionales. Esta transición no será únicamente ambiental; será una reorganización del valor social para asegurar que las respuestas presentes no comprometan las capacidades futuras de personas, comunidades y territorios."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las nueve subregiones antioqueñas, el desarrollo sostenible ha tenido trayectorias heterogéneas. El Valle de Aburrá concentró urbanización, servicios, empleo formal e infraestructura; Oriente combinó agroindustria, turismo, manufactura y expansión residencial; Urabá articuló agroexportación, logística y desarrollo portuario; Suroeste y Occidente conservaron vocaciones cafeteras, rurales y turísticas; Norte, Nordeste, Bajo Cauca y Magdalena Medio enfrentaron tensiones entre actividades extractivas, informalidad, pobreza, conectividad y presencia institucional. Herramientas como TerriData permiten consultar indicadores municipales y regionales para comparar condiciones sociales, económicas, institucionales y territoriales, facilitando la identificación de brechas de desarrollo (Departamento Nacional de Planeación [DNP], s. f.). Bajo esta mirada, la sostenibilidad subregional no se limita a proteger recursos naturales, sino a equilibrar oportunidades económicas, capacidades comunitarias, acceso a servicios, cohesión social y resiliencia frente a riesgos ambientales y productivos."
        ],
        "presente": [
          "En las subregiones, el desarrollo sostenible muestra retos concretos y diferenciados. Valle de Aburrá enfrenta presiones urbanas, contaminación, movilidad, salud mental y envejecimiento; Oriente vive una expansión económica y residencial que exige ordenamiento y sostenibilidad; Urabá proyecta oportunidades logísticas y portuarias, pero requiere inclusión social y gestión ambiental; Suroeste y Occidente necesitan fortalecer turismo sostenible, ruralidad y protección ecosistémica; Norte, Nordeste, Bajo Cauca y Magdalena Medio demandan alternativas productivas, formalización, seguridad alimentaria y resiliencia comunitaria. La Encuesta de Calidad de Vida de Antioquia 2025 se aplicará en 70.779 hogares de las nueve subregiones, incluyendo barrios, comunas, corregimientos y veredas de los 125 municipios, lo que permitirá fortalecer la planificación social y territorial del departamento (Gobernación de Antioquia, 2025). Por ello, el presente subregional exige intervenciones diferenciadas, medibles y ambientalmente responsables."
        ],
        "futuro": [
          "En perspectiva territorial, las nueve subregiones requerirán rutas diferenciadas de sostenibilidad. Valle de Aburrá deberá avanzar en bienestar urbano, movilidad sostenible, salud preventiva y transición demográfica; Oriente necesitará equilibrio entre crecimiento inmobiliario, turismo, ruralidad y ecosistemas; Urabá deberá armonizar desarrollo logístico-portuario con inclusión social y sostenibilidad ambiental; Suroeste y Occidente podrán posicionarse en turismo regenerativo, caficultura sostenible y economía rural; Norte y Nordeste requerirán reconversión productiva, conectividad y gestión ambiental; Bajo Cauca y Magdalena Medio demandarán cohesión social, seguridad alimentaria y alternativas económicas sostenibles. TerriData y Antioquia Datos ofrecen bases para monitorear estas diferencias mediante indicadores municipales y departamentales, lo que permite orientar decisiones con mayor precisión territorial (DNP, s. f.; Gobernación de Antioquia, 2025). Así, la sostenibilidad futura dependerá de combinar datos, pertinencia territorial y acción institucional coordinada."
        ]
      }
    },
    "sintesis": [
      "El desarrollo sostenible funciona como una dimensión integradora del bienestar porque conecta desarrollo humano, sostenibilidad económica, cohesión social, equilibrio ambiental y justicia intergeneracional. En Colombia, el seguimiento oficial de los ODS, la medición de pobreza multidimensional y las plataformas territoriales permiten observar avances y rezagos con evidencia (DANE, 2026; DNP, s. f.). Para Antioquia y sus subregiones, el reto será traducir estos datos en decisiones que reduzcan brechas, fortalezcan resiliencia territorial y promuevan ecosistemas de bienestar sostenibles. En las cajas de compensación, este factor será clave para sostener valor social presente y futuro."
    ],
    "fuentes": [
      {
        "nombre": "DANE – Objetivos de Desarrollo Sostenible, ODS",
        "descripcion": [
          "Plataforma oficial para visualizar indicadores ODS de Colombia y realizar seguimiento estadístico de la Agenda 2030.",
          "ODS DANE. Disponible en: https://sitios.dane.gov.co/objetivos-desarrollo-sostenible-ods/"
        ]
      },
      {
        "nombre": "DNP – Sinergia ODS",
        "descripcion": [
          "Seguimiento al avance y cumplimiento de los 17 ODS y la Agenda 2030; incluye explorador de datos, mapas, gráficos y tablas.",
          "Sinergia ODS. Disponible en: https://sinergia.dnp.gov.co/ods"
        ]
      },
      {
        "nombre": "DANE – Pobreza multidimensional",
        "descripcion": [
          "Incidencia de pobreza multidimensional y privaciones en educación, niñez, salud, trabajo, vivienda y servicios públicos.}",
          "Pobreza multidimensional DANE. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/pobreza-multidimensional?utm_source"
        ]
      },
      {
        "nombre": "DNP – TerriData",
        "descripcion": [
          "Indicadores territoriales municipales y departamentales en salud, educación, economía, población, conflicto, buen gobierno y características territoriales.",
          "TerriData DNP. Disponible en: https://terridata.dnp.gov.co/?utm_source"
        ]
      },
      {
        "nombre": "Gobernación de Antioquia – Antioquia Datos",
        "descripcion": [
          "Anuario Estadístico, Encuesta de Calidad de Vida, fichas municipales, tableros sociales y económicos para análisis departamental y subregional.",
          "Antioquia Datos. Disponible en: https://www.antioquiadatos.gov.co/?utm_source"
        ]
      }
    ]
  },
  f20: {
    "tipificacion": {
      "tipo": "Hecho portador de futuro",
      "justificacion": "Se clasifica principalmente como un hecho portador de futuro, porque aún no está plenamente consolidado en las cajas de compensación, pero aparece como una señal estratégica emergente: organizaciones más ágiles, líquidas, inteligentes, tecnológicas, colaborativas y escalables. No obstante, contiene una tendencia estructural asociada a la transformación digital, la innovación organizacional, el uso de datos, la automatización y la necesidad de responder con mayor velocidad a entornos sociales, laborales y territoriales cambiantes."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "En el nivel global, la capacidad adaptativa organizacional surgió como respuesta a modelos burocráticos, jerárquicos y lineales que dominaron buena parte del siglo XX. Las instituciones crecían por expansión física, aumento de personal y estandarización de procesos, pero con baja velocidad de respuesta frente a cambios tecnológicos o sociales. Posteriormente, la globalización, la digitalización, la automatización y las crisis económicas impulsaron estructuras más flexibles, basadas en redes, aprendizaje continuo e innovación. En el sector público y social, la OCDE ha señalado que la transformación digital del Estado requiere gobiernos más proactivos, orientados al usuario y basados en datos (OECD, 2026). Por tanto, la adaptación dejó de ser una reacción ocasional y comenzó a constituirse en una competencia institucional permanente para anticipar cambios, aprender rápidamente y escalar soluciones de impacto social."
        ],
        "presente": [
          "Actualmente, la capacidad adaptativa exponencial se expresa en la habilidad de las organizaciones para aprender, experimentar, digitalizar procesos, usar datos y escalar soluciones en menor tiempo. A nivel global, la adaptación institucional está asociada con gobiernos y organizaciones más abiertos, proactivos, centrados en el usuario y soportados en datos. La OCDE reporta que Colombia obtuvo en el Digital Government Outlook 2026 puntajes destacados en sector público basado en datos, apertura por defecto y proactividad, dimensiones que reflejan capacidades relevantes para la transformación institucional (OECD, 2026). En este contexto, las organizaciones sociales no solo deben responder a la incertidumbre, sino anticiparla mediante inteligencia colectiva, tecnología, automatización, innovación abierta y alianzas. La adaptación, por tanto, se convierte en una condición para sostener impacto social en escenarios de cambio acelerado"
        ],
        "futuro": [
          "Hacia el futuro, la capacidad adaptativa exponencial tenderá a consolidarse como una competencia central de las organizaciones de bienestar. A escala global, la convergencia entre inteligencia artificial, automatización, datos abiertos, plataformas digitales, innovación abierta y trabajo en red acelerará la transformación de instituciones rígidas hacia organizaciones líquidas, simbióticas y escalables. La OCDE ha destacado que los gobiernos digitales deben fortalecer fundamentos coherentes, humanos y basados en datos para gobernar con tecnologías emergentes como la inteligencia artificial (OECD, 2024). Por tanto, las organizaciones sociales deberán aprender a experimentar rápido, fallar de forma controlada, escalar soluciones exitosas y ajustar servicios según señales del entorno. En prospectiva, la adaptación dejará de ser una respuesta operativa y se convertirá en ventaja estratégica para ampliar impacto social."
        ]
      },
      "colombia": {
        "pasado": [
          "En Colombia, la retrospectiva de este factor se relaciona con la evolución de las organizaciones sociales y de las cajas de compensación desde esquemas administrativos tradicionales hacia modelos de gestión más técnicos, diversificados y orientados al servicio. Durante décadas, las cajas estructuraron su operación alrededor de subsidios, recreación, vivienda, educación y servicios sociales financiados por aportes empresariales, bajo el marco de la Ley 21 de 1982. Sin embargo, la expansión de necesidades sociales, la informalidad laboral y la transformación del empleo exigieron mayor capacidad de ajuste. En años recientes, la Superintendencia del Subsidio Familiar ha fortalecido la disponibilidad de estadísticas del sistema, incluyendo población afiliada, empresas, trabajadores y beneficiarios desde 2019, lo que permite pasar de una gestión descriptiva a una gestión más analítica y adaptativa (Superintendencia del Subsidio Familiar, 2024)."
        ],
        "presente": [
          "En Colombia, el presente del factor se observa en tres frentes: transformación digital, innovación pública y uso estratégico de información. El DANE mide el acceso y uso de tecnologías de información y comunicaciones en hogares y empresas; además, la Encuesta TIC en empresas ofrece información sobre transformación digital, inteligencia artificial y generación de valor social y económico mediante tecnologías (DANE, 2022). Por su parte, MinTIC mide el Índice de Gobierno Digital, que permite evaluar desempeño, fortalezas y brechas de digitalización en entidades públicas nacionales y territoriales (MinTIC, 2026). Aunque las cajas de compensación no son entidades públicas en sentido estricto, estos instrumentos sirven como referentes para medir madurez digital, orientación al usuario, gestión de datos y capacidad de innovación organizacional."
        ],
        "futuro": [
          "En Colombia, las proyecciones del factor estarán determinadas por la capacidad del sistema de compensación familiar para incorporar analítica, automatización, modelos predictivos, atención omnicanal y portafolios flexibles. La información pública del Sistema de Subsidio Familiar, disponible en datos abiertos, permite analizar desde 2019 empresas afiliadas, trabajadores afiliados, beneficiarios y población del sistema, lo cual puede alimentar modelos de segmentación, riesgo y oportunidad (Superintendencia del Subsidio Familiar, 2024). Igualmente, MinCiencias publica indicadores y datos abiertos relacionados con ciencia, tecnología e innovación, útiles para observar capacidades nacionales en innovación, formación, proyectos y producción de conocimiento (MinCiencias, 2026). En consecuencia, una caja exponencial será aquella capaz de convertir información institucional y territorial en decisiones ágiles, servicios escalables y aprendizajes organizacionales permanentes."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, la capacidad adaptativa se fue construyendo en medio de una estructura territorial contrastante: un Valle de Aburrá con alta concentración empresarial, institucional y tecnológica, y subregiones con mayores brechas de acceso, conectividad y formalización. Históricamente, esto obligó a las organizaciones de bienestar a combinar servicios centralizados con estrategias territoriales diferenciadas. La Gobernación de Antioquia dispone de información estadística, Anuario Estadístico, Encuesta de Calidad de Vida, cuentas económicas y fichas municipales, instrumentos que permiten observar cambios sociales, económicos y poblacionales del departamento (Gobernación de Antioquia, 2025). En consecuencia, la adaptación institucional en Antioquia no ha dependido únicamente de innovar servicios, sino de reconocer velocidades territoriales distintas, ajustar modelos operativos y responder a realidades subregionales heterogéneas."
        ],
        "presente": [
          "En Antioquia, la capacidad adaptativa actual está condicionada por la coexistencia de territorios altamente conectados y zonas con rezagos digitales, sociales y productivos. La adaptación organizacional exige leer datos territoriales, rediseñar servicios y construir portafolios flexibles de bienestar. Antioquia cuenta con plataformas de información como Antioquia Datos y sistemas complementarios de indicadores que permiten revisar variables económicas, sociales, ambientales y territoriales (Gobernación de Antioquia, 2025). Además, iniciativas como Antioquia Sostenible han propuesto baterías de indicadores departamentales, subregionales y municipales para seguimiento de ODS, lo cual fortalece la capacidad de análisis territorial (Proantioquia, 2021). En consecuencia, una caja de compensación que aspire a operar de forma exponencial debe integrar información, tecnología y conocimiento territorial para ajustar sus decisiones en tiempo real."
        ],
        "futuro": [
          "En Antioquia, la tendencia apunta hacia organizaciones capaces de operar con inteligencia territorial distribuida. Esto significa combinar datos, talento humano, alianzas, tecnología y lectura prospectiva para responder a dinámicas subregionales cambiantes. El departamento dispone de fuentes como Antioquia Datos, fichas municipales, cuentas económicas y encuestas de calidad de vida, que pueden convertirse en insumos para modelos de anticipación social (Gobernación de Antioquia, 2025). En este horizonte, Comfenalco Antioquia podría fortalecer laboratorios de innovación territorial, tableros predictivos de bienestar, modelos de atención híbrida y alianzas con universidades, empresas, municipios y comunidades. Así, la capacidad adaptativa exponencial no dependerá solamente de incorporar tecnología, sino de articular capacidades internas y externas para multiplicar impacto, reducir tiempos de respuesta y anticipar demandas emergentes."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las nueve subregiones de Antioquia, la retrospectiva muestra que la adaptación organizacional ha sido desigual. Valle de Aburrá concentró históricamente las condiciones para digitalización, sofisticación de servicios y economías de escala; Oriente y Suroeste avanzaron por dinámicas empresariales, turísticas y educativas; Urabá combinó oportunidades logísticas con rezagos sociales; Bajo Cauca, Nordeste y Magdalena Medio demandaron respuestas institucionales resilientes por conflictividad, informalidad y vulnerabilidad; mientras Norte y Occidente requirieron modelos de proximidad por ruralidad y dispersión. TerriData del DNP permite consultar indicadores municipales y departamentales comparables, útiles para reconstruir estas trayectorias territoriales (DNP, 2026). Así, la capacidad adaptativa se consolidó como una necesidad práctica: responder de manera distinta a territorios con capacidades, riesgos y ritmos de transformación diferentes."
        ],
        "presente": [
          "En las nueve subregiones, el presente del factor evidencia que la adaptación no puede ser uniforme. Valle de Aburrá exige servicios digitales, personalizados y de rápida respuesta; Oriente demanda innovación en bienestar por crecimiento urbano, empresarial y residencial; Urabá requiere soluciones escalables para formación, empleo y movilidad social; Bajo Cauca, Nordeste y Magdalena Medio necesitan modelos resilientes, flexibles y aliados con actores locales; Norte, Occidente y Suroeste requieren mecanismos híbridos que combinen presencialidad, itinerancia y canales digitales. TerriData permite comparar indicadores territoriales y construir diagnósticos diferenciales para municipios y departamentos (DNP, 2026). Por consiguiente, la capacidad adaptativa actual depende de diseñar arquitecturas de servicio modulares, territorializadas y tecnológicamente habilitadas."
        ],
        "futuro": [
          "En las nueve subregiones, las proyecciones exigen diseñar modelos diferenciados de escalabilidad. En Valle de Aburrá, la prioridad será la hiperpersonalización de servicios; en Oriente, soluciones para bienestar urbano y empresarial; en Urabá, plataformas de formación, empleabilidad y movilidad social; en Bajo Cauca, Nordeste y Magdalena Medio, innovación social para resiliencia comunitaria; y en Norte, Occidente y Suroeste, esquemas híbridos de proximidad, cuidado y acceso digital. El Índice de Gobierno Digital y los datos territoriales pueden servir como referentes para medir capacidades digitales, mientras TerriData permite identificar brechas por municipio (MinTIC, 2026; DNP, 2026). Por ende, el futuro de este factor dependerá de que la organización actúe como red adaptativa: flexible en la operación, inteligente en los datos, colaborativa en el territorio y exponencial en el impacto."
        ]
      }
    },
    "sintesis": [
      "La capacidad adaptativa exponencial representa una señal estratégica de alto valor para las cajas de compensación, porque anticipa el paso de organizaciones jerárquicas y reactivas hacia sistemas ágiles, inteligentes, colaborativos y escalables. En Colombia, su consolidación dependerá del uso de datos, innovación, digitalización y lectura anticipada del mercado laboral y social. En Antioquia, será decisiva para responder a realidades subregionales heterogéneas, combinando tecnología con proximidad territorial. Así, el futuro institucional estará marcado por la capacidad de aprender rápido, ajustar servicios, escalar soluciones y multiplicar impacto en bienestar integral (OECD, 2026; MinTIC, 2026; DNP, 2026)."
    ],
    "fuentes": [
      {
        "nombre": "DANE – Encuestas TIC hogares y empresas",
        "descripcion": [
          "Uso de internet, acceso TIC, transformación digital empresarial, uso de inteligencia artificial, tecnologías en procesos organizacionales y brechas urbano-rurales.",
          "DANE – Encuesta TIC hogares / DANE – Encuesta TIC empresas. Disponible en:",
          "https://www.dane.gov.co/index.php/estadisticas-por-tema/tecnologia-e-innovacion/tecnologias-de-la-informacion-y-las-comunicaciones-tic/encuesta-de-tecnologias-de-la-informacion-y-las-comunicaciones-en-hogares-entic-hogares?utm_source",
          "https://www.dane.gov.co/index.php/estadisticas-por-tema/tecnologia-e-innovacion/tecnologias-de-la-informacion-y-las-comunicaciones-tic/encuesta-de-tecnologias-de-la-informacion-y-las-comunicaciones-en-empresas-entic-empresas?utm_source"
        ]
      },
      {
        "nombre": "MinTIC – Índice de Gobierno Digital",
        "descripcion": [
          "Resultados históricos del desempeño digital de entidades nacionales y territoriales; respuestas FURAG; medición de capacidades digitales.",
          "Mediciones Gobierno Digital. Disponible en: https://gobiernodigital.mintic.gov.co/portal/Mediciones/"
        ]
      },
      {
        "nombre": "Datos Abiertos Colombia – Índice de Gobierno Digital histórico",
        "descripcion": [
          "Base descargable con resultados históricos del Índice de Gobierno Digital para análisis comparativo.",
          "Índice de Gobierno Digital histórico. Disponible en: https://www.datos.gov.co/Ciencia-Tecnolog-a-e-Innovaci-n/-ndice-de-Gobierno-Digital-Hist-rico/rtai-k9uh/about_data"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar – Datos abiertos",
        "descripcion": [
          "Empresas afiliadas, trabajadores afiliados, beneficiarios y población del Sistema de Subsidio Familiar desde 2019.",
          "Población del Sistema de Subsidio Familiar Consolidado. Disponible en: https://www.datos.gov.co/Trabajo/Poblaci-n-del-Sistema-de-Subsidio-Familiar-Consoli/ese3-e6sh/about_data"
        ]
      },
      {
        "nombre": "MinCiencias / OCyT – Indicadores de Ciencia, Tecnología e Innovación",
        "descripcion": [
          "Inversión en ACTI e I+D, capacidades de innovación, grupos de investigación, formación de talento, proyectos y producción científica.",
          "Datos abiertos MinCiencias / OCyT. Disponible en:",
          "https://minciencias.gov.co/ciudadano/datosabiertos?utm_source",
          "https://ocyt.org.co/?utm_source"
        ]
      }
    ]
  },
  f21: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica principalmente como una tendencia estructural, porque expresa una transformación sostenida en la forma de comprender, planear y gestionar el bienestar desde las particularidades de cada territorio. No obstante, incorpora hechos portadores de futuro, como la inteligencia territorial, los ecosistemas híbridos de bienestar, la analítica predictiva territorial y los modelos personalizados de atención, que aún operan como señales emergentes capaces de configurar futuros alternativos."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "A nivel global, la territorialidad y territorialización del bienestar surgieron como respuesta a las limitaciones de los modelos centralizados de desarrollo que predominaban durante gran parte del siglo XX. Inicialmente, las políticas públicas y los sistemas de bienestar se diseñaban desde enfoques homogéneos, bajo el supuesto de que las necesidades sociales podían atenderse mediante programas estandarizados aplicables a cualquier territorio. Sin embargo, el crecimiento urbano acelerado, las desigualdades regionales, las dinámicas rurales diferenciadas y la diversidad cultural evidenciaron que el bienestar se experimenta de manera distinta según las características sociales, económicas y ambientales de cada lugar. A partir de las décadas de 1980 y 1990, organismos como Naciones Unidas, la CEPAL y el Banco Mundial comenzaron a promover enfoques de desarrollo territorial que reconocían la importancia del contexto local para generar resultados sostenibles (CEPAL, 2000; PNUD, 1990). De esta manera, el territorio dejó de ser entendido únicamente como un espacio físico y pasó a concebirse como un ecosistema social donde interactúan comunidades, instituciones, economías y culturas."
        ],
        "presente": [
          "En la actualidad, la territorialización del bienestar constituye una de las principales estrategias para enfrentar desigualdades persistentes y mejorar la efectividad de las políticas sociales. Organismos internacionales reconocen que los desafíos relacionados con pobreza, acceso a servicios, cambio climático, migraciones y cohesión social presentan expresiones territoriales diferenciadas, por lo que requieren respuestas adaptadas a cada contexto. La OCDE ha señalado que las brechas regionales en productividad, ingreso, acceso a servicios y calidad de vida continúan siendo una de las principales fuentes de desigualdad dentro de los países (OCDE, 2024). Paralelamente, Naciones Unidas destaca que la localización de los Objetivos de Desarrollo Sostenible es fundamental para alcanzar resultados efectivos y sostenibles (ONU, 2023). En consecuencia, los sistemas contemporáneos de bienestar evolucionan hacia modelos basados en inteligencia territorial, participación comunitaria y análisis de necesidades específicas. El territorio se convierte así en una unidad estratégica para comprender realidades sociales complejas y orientar intervenciones más pertinentes, inclusivas y efectivas."
        ],
        "futuro": [
          "Durante las próximas décadas, la territorialización del bienestar evolucionará hacia modelos cada vez más inteligentes, personalizados y adaptativos. La integración de analítica avanzada, inteligencia artificial, sistemas de información geográfica, sensores urbanos y plataformas digitales permitirá comprender en tiempo real las dinámicas sociales, económicas y ambientales de los territorios. Diversos organismos internacionales proyectan que la resiliencia territorial será una de las capacidades más importantes para enfrentar los impactos del cambio climático, el envejecimiento poblacional, las migraciones y la transformación tecnológica (ONU-Hábitat, 2022; OCDE, 2024). En este escenario, emergerán ecosistemas territoriales de bienestar capaces de anticipar necesidades, personalizar servicios y coordinar actores públicos, privados y comunitarios. Además, la sostenibilidad dejará de medirse únicamente a escala nacional para incorporar indicadores específicos de cohesión social, acceso diferencial y calidad de vida territorial. Como resultado, el bienestar del futuro dependerá cada vez más de la capacidad de los territorios para adaptarse, innovar y responder dinámicamente a las necesidades cambiantes de sus comunidades."
        ]
      },
      "colombia": {
        "pasado": [
          "En Colombia, la territorialización del bienestar surgió históricamente asociada a la descentralización administrativa, la expansión de servicios sociales y la búsqueda de mayor cobertura institucional en regiones con profundas desigualdades. Desde la Constitución de 1991, el enfoque territorial ganó relevancia al reconocer la autonomía de entidades territoriales y la necesidad de responder a realidades sociales, económicas y culturales diferenciadas. Posteriormente, instrumentos como los planes de desarrollo, los sistemas de información territorial y las mediciones de pobreza permitieron evidenciar brechas entre zonas urbanas, rurales y regiones periféricas. En este proceso, el DANE consolidó mediciones como pobreza multidimensional y necesidades básicas insatisfechas para identificar privaciones territoriales en educación, salud, vivienda, trabajo y condiciones de vida (DANE, 2026). Así, la territorialidad pasó de entenderse como presencia física del Estado a convertirse en criterio para focalizar bienestar, equidad y desarrollo humano."
        ],
        "presente": [
          "Actualmente, la territorialización del bienestar en Colombia se expresa en la necesidad de cerrar brechas persistentes entre territorios urbanos, rurales, centrales y periféricos. Las mediciones oficiales muestran que las privaciones sociales no se distribuyen de forma uniforme, por lo que la planeación nacional requiere datos desagregados, focalización territorial y respuestas diferenciales. El DANE reportó que en 2025 la pobreza multidimensional nacional fue de 9,9 %, frente a 11,5 % en 2024, lo que evidencia avances, pero también la necesidad de observar desigualdades territoriales por región, área y grupos poblacionales (DANE, 2026). En paralelo, TerriData permite consultar indicadores municipales de agricultura, buen gobierno, características territoriales, conflicto, educación y salud (DNP, s. f.). En este presente, territorializar el bienestar significa integrar información social, económica e institucional para orientar intervenciones contextualizadas, anticipatorias y medibles."
        ],
        "futuro": [
          "Hacia el futuro, la territorialización del bienestar en Colombia tenderá a consolidarse como una capacidad estratégica de planeación anticipatoria. La combinación de datos administrativos, encuestas sociales, georreferenciación, inteligencia artificial y analítica predictiva permitirá identificar necesidades emergentes antes de que se conviertan en crisis sociales. En este sentido, fuentes como DANE, DNP y Supersubsidio serán claves para integrar información de pobreza, condiciones de vida, acceso institucional y presencia del sistema de compensación familiar. La Superintendencia del Subsidio Familiar dispone de estadísticas del sistema, boletines trimestrales, series históricas desde 2020 y datos sobre población, infraestructura, recurso humano y coberturas (Supersubsidio, s. f.). Prospectivamente, el bienestar territorial evolucionará hacia ecosistemas conectados que combinen servicios físicos, digitales, comunitarios y preventivos, orientados a equidad, proximidad y personalización."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, la retrospectiva de este factor muestra una transición desde una lógica centralizada en Medellín y el Valle de Aburrá hacia una comprensión más amplia de las brechas subregionales. Históricamente, el departamento ha presentado contrastes entre territorios con alta capacidad institucional, infraestructura y diversificación económica, y otros con mayores rezagos sociales, rurales y productivos. La Gobernación de Antioquia ha consolidado instrumentos como el Anuario Estadístico, la Encuesta de Calidad de Vida, las cuentas económicas departamentales y las fichas municipales, que permiten observar condiciones diferenciales de bienestar por municipio y subregión (Gobernación de Antioquia, s. f.). Esta trayectoria evidencia que el bienestar territorial no depende solo de ampliar cobertura, sino de comprender vocaciones productivas, condiciones sociales, conectividad, acceso institucional y capacidades comunitarias. Por ello, Antioquia avanzó de la expansión de infraestructura hacia modelos de planeación regional y lectura diferenciada de necesidades."
        ],
        "presente": [
          "En Antioquia, el presente del factor se caracteriza por una mayor disponibilidad de información territorial y por la necesidad de transformar esos datos en decisiones de bienestar. Antioquia Datos reúne el Anuario Estadístico, tableros económicos y sociales, Encuesta de Calidad de Vida, Plan Estadístico Territorial y fichas municipales, herramientas que permiten analizar diferencias entre municipios y subregiones (Gobernación de Antioquia, s. f.). Esta infraestructura estadística fortalece la posibilidad de diseñar servicios diferenciados en educación, recreación, vivienda, empleo, salud, cuidado y desarrollo comunitario. Sin embargo, el reto actual no es solo disponer de datos, sino convertirlos en inteligencia territorial para priorizar poblaciones, anticipar riesgos sociales y adaptar la oferta institucional. Para las cajas de compensación, esto implica ampliar la capilaridad territorial y pasar de una oferta estandarizada a modelos de bienestar ajustados a condiciones de acceso, vulnerabilidad, ciclo de vida y vocación local."
        ],
        "futuro": [
          "En Antioquia, las tendencias apuntan hacia modelos de bienestar territorial basados en inteligencia regional, segmentación poblacional y articulación interinstitucional. La disponibilidad de datos departamentales, municipales y subregionales permitirá anticipar brechas en educación, empleo, salud, vivienda, envejecimiento, cuidado y acceso a servicios. Antioquia Datos ya ofrece instrumentos para consultar información económica, social y de calidad de vida, lo que constituye una base para construir tableros prospectivos de bienestar (Gobernación de Antioquia, s. f.). A futuro, Comfenalco Antioquia podría fortalecer su rol mediante nodos subregionales de bienestar, servicios móviles, plataformas digitales, mapas de riesgo social y modelos predictivos de demanda. Así, la territorialización dejaría de ser solo una estrategia de cobertura para convertirse en una arquitectura adaptativa de bienestar, capaz de ajustar servicios según cambios demográficos, productivos, comunitarios y ambientales."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las 9 subregiones de Antioquia, la territorialización del bienestar ha estado marcada por una diversidad estructural: Valle de Aburrá concentra servicios, empleo formal y capacidades institucionales; Oriente combina industria, turismo y agroindustria; Urabá articula logística, agroexportación y dinámicas portuarias; Suroeste y Occidente conservan vocaciones rurales, cafeteras y turísticas; Norte, Nordeste, Bajo Cauca y Magdalena Medio presentan mayores desafíos en conectividad, formalización, seguridad, ingresos y acceso a servicios. Esta lectura territorial se conecta con la idea de “brechas territoriales” promovida por sistemas como TerriData, que facilita estadísticas municipales en temas sociales, económicos, institucionales, educativos y de salud (DNP, s. f.). En retrospectiva, las subregiones muestran que el bienestar no puede gestionarse mediante respuestas homogéneas, sino mediante modelos diferenciados según condiciones históricas, capacidades locales y necesidades comunitarias."
        ],
        "presente": [
          "En las 9 subregiones, el estado actual evidencia que el bienestar territorial requiere esquemas de intervención diferenciados. El Valle de Aburrá demanda soluciones para urbanización, empleo, salud mental, movilidad y envejecimiento; Oriente exige respuestas asociadas a crecimiento poblacional, transformación rural y presión inmobiliaria; Urabá requiere servicios articulados a logística, migración, empleo y desarrollo portuario; Suroeste y Occidente necesitan fortalecer ruralidad, turismo y conectividad; Norte, Nordeste, Bajo Cauca y Magdalena Medio demandan mayor presencia institucional, formalización, educación, seguridad alimentaria y cohesión comunitaria. Las estadísticas territoriales del DNP y la Gobernación permiten observar estas diferencias mediante indicadores municipales y departamentales (DNP, s. f.; Gobernación de Antioquia, s. f.). En el presente, la territorialización del bienestar exige pasar de la cobertura nominal a la pertinencia territorial: servicios cercanos, flexibles, híbridos y adaptados a realidades sociales específicas."
        ],
        "futuro": [
          "En las 9 subregiones, las proyecciones sugieren que el bienestar deberá organizarse según vocaciones y riesgos territoriales. Valle de Aburrá requerirá soluciones urbanas integradas; Oriente, modelos de equilibrio entre expansión económica y calidad de vida; Urabá, bienestar asociado a empleo, logística, migración y cohesión social; Suroeste y Occidente, servicios vinculados a ruralidad, turismo y envejecimiento; Norte y Nordeste, fortalecimiento de capacidades comunitarias y conectividad; Bajo Cauca y Magdalena Medio, intervenciones de inclusión, formalización y reconstrucción de tejido social. TerriData y Antioquia Datos permiten construir líneas base municipales para monitorear estas brechas y orientar decisiones territoriales (DNP, s. f.; Gobernación de Antioquia, s. f.). En perspectiva, la territorialización del bienestar dependerá de la capacidad de combinar presencia física, datos, alianzas locales y servicios personalizados."
        ]
      }
    },
    "sintesis": [
      "La territorialidad y territorialización del bienestar constituyen una tendencia estratégica para adaptar la acción social a las particularidades de cada comunidad. Su evolución muestra el paso de la expansión física de servicios hacia modelos basados en datos, proximidad, prevención e inteligencia territorial. En Colombia y Antioquia, fuentes como DANE, DNP, Supersubsidio y Antioquia Datos permiten identificar brechas y orientar decisiones diferenciadas (DANE, 2026; DNP, s. f.; Supersubsidio, s. f.). Para las cajas de compensación, el reto será construir ecosistemas territoriales híbridos, inclusivos y anticipatorios."
    ],
    "fuentes": [
      {
        "nombre": "DANE – Pobreza multidimensional",
        "descripcion": [
          "Incidencia de pobreza multidimensional nacional, cabecera, centros poblados y rural disperso; privaciones por educación, niñez, salud, trabajo y vivienda.",
          "Página oficial DANE. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/pobreza-multidimensional?utm_source"
        ]
      },
      {
        "nombre": "DANE – Necesidades Básicas Insatisfechas, NBI",
        "descripcion": [
          "Medición de pobreza estructural por carencias básicas en vivienda, servicios, hacinamiento, dependencia económica y asistencia escolar.",
          "Página oficial DANE. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/necesidades-basicas-insatisfechas-nbi?utm_source"
        ]
      },
      {
        "nombre": "DNP – TerriData",
        "descripcion": [
          "Indicadores municipales y departamentales en educación, salud, finanzas públicas, conflicto, ruralidad, economía, población y buen gobierno.",
          "Plataforma TerriData. Disponible en: https://terridata.dnp.gov.co/?utm_source"
        ]
      },
      {
        "nombre": "Gobernación de Antioquia – Antioquia Datos",
        "descripcion": [
          "Anuario Estadístico, Encuesta de Calidad de Vida, fichas municipales, tableros económicos y sociales, cuentas departamentales.",
          "Portal Antioquia Datos. Disponible en: https://www.antioquiadatos.gov.co/?utm_source"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar – Series históricas y estadísticas del sistema",
        "descripcion": [
          "Población afiliada, infraestructura, recurso humano, coberturas, servicios, boletines estadísticos y presencia regional de cajas.",
          "Series históricas y estadísticas SSF. Disponible en: https://www.ssf.gov.co/informaci%C3%B3n-de-las-cajas-de-compensaci%C3%B3n-familiar2?utm_source"
        ]
      }
    ]
  },
  f22: {
    "tipificacion": {
      "tipo": "Tendencia estructural",
      "justificacion": "Se clasifica como una tendencia estructural, porque representa una evolución sostenida de las organizaciones hacia modelos más flexibles, ágiles, digitales, colaborativos y orientados al aprendizaje continuo. No se trata de una señal aislada, sino de una presión creciente derivada de cambios tecnológicos, sociales, laborales, demográficos y regulatorios. En el campo del bienestar y la compensación familiar, esta tendencia implica pasar de estructuras rígidas de prestación de servicios a capacidades organizacionales adaptativas, capaces de rediseñar procesos, aprender del entorno y responder con oportunidad a nuevas necesidades humanas. Al mismo tiempo, contiene hechos portadores de futuro, como organizaciones líquidas, uso de inteligencia artificial en la gestión interna, automatización de procesos sociales, trabajo híbrido permanente, modelos de talento basados en habilidades y culturas organizacionales autogestionadas. Si estas señales se consolidan, podrían redefinir la operación de las cajas de compensación."
    },
    "caracterizacion": {
      "global": {
        "pasado": [
          "A escala global, la adaptabilidad transformacional surgió como respuesta a la creciente incapacidad de los modelos organizacionales tradicionales para enfrentar entornos complejos y cambiantes. Durante gran parte del siglo XX, las organizaciones fueron diseñadas bajo principios de estabilidad, control jerárquico, especialización funcional y planificación lineal, adecuados para contextos relativamente predecibles. Sin embargo, la aceleración de la globalización, la revolución digital, la expansión de Internet y el incremento de la competencia internacional comenzaron a evidenciar la necesidad de estructuras más flexibles y dinámicas. Autores como Senge (1990) introdujeron el concepto de organizaciones que aprenden, destacando la importancia de la adaptación continua como fuente de sostenibilidad institucional. Posteriormente, la transformación digital, la innovación abierta y los modelos ágiles impulsaron una transición desde estructuras rígidas hacia organizaciones más colaborativas y adaptativas. En consecuencia, la capacidad de desaprender prácticas obsoletas y reconfigurar procesos empezó a consolidarse como un activo estratégico para enfrentar la incertidumbre y sostener la competitividad."
        ],
        "presente": [
          "En el escenario actual, la adaptabilidad transformacional se ha convertido en una condición indispensable para la supervivencia y sostenibilidad de organizaciones públicas, privadas y sociales. La convergencia entre inteligencia artificial, automatización, transformación digital, cambios en las expectativas laborales y nuevas demandas ciudadanas ha incrementado la velocidad de los cambios organizacionales. El World Economic Forum (2025) señala que las empresas enfrentan una rápida transformación de habilidades, tecnologías y modelos de negocio, lo que exige capacidades permanentes de aprendizaje y reconversión. Paralelamente, la OCDE destaca que la resiliencia organizacional depende cada vez más de la capacidad para gestionar incertidumbre, innovar y adaptarse a contextos cambiantes (OCDE, 2024). En este entorno, las organizaciones más exitosas no son necesariamente las más grandes o eficientes, sino aquellas capaces de responder rápidamente a nuevas condiciones. La adaptabilidad ya no se limita a la adopción tecnológica, sino que involucra cultura organizacional, liderazgo, aprendizaje continuo y capacidad de transformación institucional."
        ],
        "futuro": [
          "Durante las próximas décadas, la adaptabilidad transformacional evolucionará hacia modelos organizacionales cada vez más líquidos, descentralizados y orientados al aprendizaje permanente. La inteligencia artificial, la automatización avanzada, la economía digital y la creciente complejidad de los desafíos globales transformarán profundamente las estructuras institucionales. Diversos estudios prospectivos proyectan que las organizaciones deberán operar como sistemas adaptativos capaces de anticipar cambios, responder en tiempo real y reconfigurar continuamente sus capacidades estratégicas (World Economic Forum, 2025). Asimismo, la ONU prevé que fenómenos como el envejecimiento poblacional, la transición climática y la transformación del trabajo incrementarán la necesidad de organizaciones resilientes y socialmente innovadoras (ONU, 2024). En este contexto, la ventaja competitiva dejará de depender principalmente de recursos físicos o financieros y estará asociada a la capacidad para aprender, experimentar, colaborar y evolucionar constantemente. La adaptabilidad transformacional se consolidará así como una competencia crítica para construir sostenibilidad institucional, bienestar humano y resiliencia frente a escenarios altamente inciertos."
        ]
      },
      "colombia": {
        "pasado": [
          "En Colombia, la adaptabilidad transformacional comenzó a tomar forma cuando las organizaciones públicas, privadas y sociales dejaron de operar bajo esquemas exclusivamente jerárquicos, presenciales y procedimentales. Durante buena parte del siglo XX, la estabilidad institucional, la especialización funcional y el cumplimiento normativo fueron los ejes de la gestión. Sin embargo, la apertura económica, la expansión tecnológica, la modernización administrativa y la presión por mejorar productividad hicieron evidente la necesidad de innovar. El CONPES 3975 de 2019 identificó rezagos asociados a la baja promoción y gestión de la innovación basada en tecnologías digitales, lo cual limitaba el crecimiento del país (Departamento Nacional de Planeación [DNP], 2019). Posteriormente, encuestas como la EDIT del DANE permitieron caracterizar la dinámica de innovación empresarial y el uso de instrumentos públicos de apoyo (Departamento Administrativo Nacional de Estadística [DANE], s. f.). Así, la adaptabilidad empezó a entenderse como capacidad estratégica, no solo como ajuste operativo."
        ],
        "presente": [
          "En el presente, la adaptabilidad transformacional se ha vuelto una condición para la sostenibilidad institucional. Las organizaciones colombianas enfrentan automatización, inteligencia artificial, cambios laborales, presión por eficiencia, nuevos hábitos ciudadanos y mayores expectativas de servicios digitales. El país cuenta con una Política Nacional de Inteligencia Artificial formalizada mediante el CONPES 4144 de 2025, orientada a desarrollar capacidades nacionales para la adopción ética y estratégica de esta tecnología (DNP, 2025). Además, el Índice de Gobierno Digital mide el desempeño y cumplimiento de entidades públicas frente a la política de gobierno digital, lo que evidencia una agenda institucional de transformación tecnológica (Ministerio de Tecnologías de la Información y las Comunicaciones [MinTIC], s. f.). Para el sistema de compensación familiar, el reto actual consiste en alinear cultura, talento, procesos, tecnología y propósito social. Adaptarse ya no significa reaccionar a cambios, sino aprender sistemáticamente y rediseñar la manera de generar bienestar."
        ],
        "futuro": [
          "En los próximos años, la adaptabilidad transformacional será impulsada por inteligencia artificial, automatización, analítica de datos, trabajo híbrido, modelos de gestión por capacidades y mayor exigencia ciudadana. El CONPES 4144 plantea que la inteligencia artificial puede contribuir a enfrentar desafíos sociales, económicos y ambientales, siempre que el país fortalezca capacidades, gobernanza y uso ético de la tecnología (DNP, 2025). Esta orientación anticipa organizaciones que deberán aprender más rápido, rediseñar procesos con evidencia y gestionar talento bajo esquemas flexibles. En el campo del bienestar, las cajas de compensación tendrán que evolucionar hacia plataformas ágiles que integren servicios físicos y digitales, anticipen necesidades y ajusten su portafolio de acuerdo con cambios demográficos, laborales y territoriales. La transformación futura no será solo tecnológica: será cultural, estratégica y profundamente humana."
        ]
      },
      "antioquia": {
        "pasado": [
          "En Antioquia, este factor se configuró alrededor de una tradición empresarial e institucional marcada por industria, servicios, comercio, cooperativismo, educación y organizaciones sociales con fuerte capacidad de gestión. Durante años, la transformación se expresó en modernización productiva, fortalecimiento administrativo, expansión de servicios y profesionalización del talento humano. No obstante, la digitalización, la competencia global, los cambios en el trabajo y las nuevas demandas sociales obligaron a revisar modelos organizacionales más rígidos. Las estadísticas departamentales y municipales de Antioquia han permitido observar transformaciones económicas, sociales y territoriales que influyen en la capacidad de respuesta institucional (Gobernación de Antioquia, s. f.). En el caso de las cajas de compensación, la adaptación ha significado ampliar servicios, incorporar canales digitales, diversificar programas y responder a afiliados con necesidades más cambiantes. En consecuencia, Antioquia pasó de una lógica de eficiencia institucional a una necesidad creciente de flexibilidad cultural y transformación continua."
        ],
        "presente": [
          "En Antioquia, la adaptabilidad transformacional se expresa en la coexistencia de organizaciones avanzadas en innovación, digitalización y gestión de datos, junto con entidades y territorios que aún enfrentan brechas de capacidades. Antioquia cuenta con sistemas de información como Antioquia Datos, que reúne Anuario Estadístico, Encuesta de Calidad de Vida, fichas municipales y tableros sociales y económicos, útiles para orientar decisiones territoriales (Gobernación de Antioquia, s. f.). Esta disponibilidad de información favorece procesos de planeación más ágiles, pero exige capacidades institucionales para interpretar datos y convertirlos en acción. En las cajas de compensación, la transformación actual implica digitalizar trámites, personalizar servicios, fortalecer talento humano, automatizar procesos y mantener cercanía comunitaria. Así, la adaptabilidad no se limita a incorporar tecnología; requiere modificar mentalidades, prácticas internas, modelos de liderazgo y formas de relacionamiento con afiliados, empresas y comunidades."
        ],
        "futuro": [
          "Para Antioquia, la proyección del factor apunta hacia organizaciones más líquidas, capaces de articular datos, talento, innovación social y gestión territorial. La Encuesta de Desarrollo e Innovación Tecnológica del DANE permite observar la dinámica de innovación realizada por empresas y el uso de instrumentos públicos de apoyo, información relevante para valorar capacidades de cambio en el tejido productivo (DANE, s. f.). A partir de esta base, Antioquia podrá fortalecer ecosistemas de aprendizaje institucional entre empresas, universidades, cajas, gobiernos locales y comunidades. Para Comfenalco Antioquia, la adaptabilidad transformacional podría expresarse en laboratorios de innovación social, formación interna permanente, modelos de gestión por proyectos, inteligencia organizacional y diseño ágil de servicios. En adelante, la ventaja institucional no estará solo en tener cobertura, sino en poder reconfigurar rápidamente servicios de bienestar ante nuevas demandas sociales, tecnológicas y comunitarias."
        ]
      },
      "subregiones": {
        "pasado": [
          "En las nueve subregiones de Antioquia, la adaptabilidad transformacional ha seguido ritmos distintos. El Valle de Aburrá acumuló mayor densidad empresarial, tecnológica y educativa, favoreciendo procesos de innovación organizacional. Oriente avanzó por su dinamismo industrial, aeroportuario, turístico y agroindustrial. Urabá, con su vocación logística y agroexportadora, empezó a demandar instituciones capaces de actuar en contextos de crecimiento acelerado. Suroeste, Occidente y Norte conservaron estructuras más rurales, donde la adaptación se relacionó con acceso, cercanía y pertinencia de servicios. Bajo Cauca, Nordeste y Magdalena Medio enfrentaron mayores tensiones por informalidad, vulnerabilidad social y dispersión territorial. Plataformas como TerriData permiten observar indicadores municipales y regionales para comprender estas diferencias en capacidades, condiciones sociales y desarrollo territorial (Departamento Nacional de Planeación [DNP], s. f.). Por ello, la adaptabilidad no puede leerse como una capacidad uniforme, sino como una respuesta situada ante realidades subregionales diversas."
        ],
        "presente": [
          "En las subregiones, el presente del factor evidencia que la capacidad adaptativa depende tanto de recursos institucionales como de condiciones territoriales. Valle de Aburrá demanda respuestas ágiles frente a envejecimiento, salud mental, empleo, movilidad y digitalización. Oriente requiere flexibilidad para gestionar crecimiento poblacional, transformación productiva y presión urbana-rural. Urabá exige instituciones capaces de acompañar cambios logísticos, portuarios y migratorios. Suroeste y Occidente necesitan modelos livianos, móviles y cercanos para territorios rurales y turísticos. Norte, Nordeste, Bajo Cauca y Magdalena Medio requieren adaptación frente a vulnerabilidad social, informalidad, dispersión geográfica y capacidades locales limitadas. Las series históricas de la Superintendencia del Subsidio Familiar presentan información mensual desde 2020 sobre población, infraestructura, recurso humano y coberturas de las cajas, lo cual permite analizar capacidades operativas y territoriales del sistema (Superintendencia del Subsidio Familiar [SSF], s. f.). La adaptabilidad subregional exige combinar tecnología, presencia física y alianzas locales."
        ],
        "futuro": [
          "En las nueve subregiones, las tendencias sugieren que la adaptabilidad deberá adoptar formas territoriales diferenciadas. Valle de Aburrá necesitará innovación rápida y escalable; Oriente, gestión flexible del crecimiento; Urabá, capacidades para acompañar cambios logísticos y sociales; Suroeste y Occidente, modelos híbridos para ruralidad y turismo; Norte, Nordeste, Bajo Cauca y Magdalena Medio, estructuras colaborativas que compensen brechas institucionales. En esta ruta, el Índice de Gobierno Digital histórico, disponible en Datos Abiertos Colombia, resulta útil para observar avances en transformación digital institucional y cumplimiento de la política de gobierno digital (MinTIC, s. f.). Aunque está orientado al sector público, ofrece una referencia metodológica para medir madurez digital, capacidad adaptativa y uso de tecnología en la gestión. Para el bienestar territorial, la clave será combinar agilidad organizacional, lectura local y continuidad del vínculo comunitario."
        ]
      }
    },
    "sintesis": [
      "La adaptabilidad transformacional será decisiva para que las cajas de compensación evolucionen en medio de entornos inciertos, tecnológicos y socialmente cambiantes. Su valor estará en aprender, desaprender y rediseñar servicios sin perder el propósito de bienestar integral. Colombia ya cuenta con políticas de transformación digital e inteligencia artificial, mediciones de innovación empresarial y herramientas de gobierno digital que muestran una trayectoria institucional hacia mayor flexibilidad (DNP, 2025; DANE, s. f.; MinTIC, s. f.). Para Comfenalco Antioquia, el desafío consistirá en construir una organización ágil, culturalmente resiliente y territorialmente sensible, capaz de anticipar cambios y transformarlos en valor social."
    ],
    "fuentes": [
      {
        "nombre": "DNP – CONPES 4144 de 2025, Política Nacional de Inteligencia Artificial",
        "descripcion": [
          "Lineamientos de política pública para adopción, gobernanza, capacidades, ética e innovación con inteligencia artificial en Colombia.",
          "Documento CONPES 4144. Disponible en: https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf?utm_source"
        ]
      },
      {
        "nombre": "DANE – Encuesta de Desarrollo e Innovación Tecnológica, EDIT",
        "descripcion": [
          "Información sobre innovación empresarial, actividades científicas, tecnológicas, inversión en innovación, capacidades y uso de instrumentos públicos de apoyo.",
          "EDIT – DANE. Disponible en: https://www.dane.gov.co/index.php/estadisticas-por-tema/tecnologia-e-innovacion/encuesta-de-desarrollo-e-innovacion-tecnologica-edit?utm_source"
        ]
      },
      {
        "nombre": "MinTIC – Índice de Gobierno Digital",
        "descripcion": [
          "Medición del desempeño de entidades públicas frente a la Política de Gobierno Digital, transformación digital, servicios digitales y capacidades institucionales.",
          "Índice de Gobierno Digital histórico. Disponible en: https://www.datos.gov.co/Ciencia-Tecnolog-a-e-Innovaci-n/-ndice-de-Gobierno-Digital-Hist-rico/rtai-k9uh/about_data"
        ]
      },
      {
        "nombre": "Gobernación de Antioquia – Antioquia Datos",
        "descripcion": [
          "Anuario Estadístico, Encuesta de Calidad de Vida, fichas municipales, tableros sociales y económicos para análisis territorial y planeación adaptativa.",
          "Antioquia Datos. Disponible en: https://www.antioquiadatos.gov.co/?utm_source"
        ]
      },
      {
        "nombre": "Superintendencia del Subsidio Familiar – Series históricas",
        "descripcion": [
          "Datos mensuales desde 2020 sobre población, infraestructura, recurso humano y coberturas de cajas de compensación familiar.",
          "Series históricas SSF. Disponible en: https://www.ssf.gov.co/series-hist%C3%B3ricas?utm_source"
        ]
      }
    ]
  },
};
