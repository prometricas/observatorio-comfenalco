/**
 * factores-cambio.js — Catálogo del eje "Factores de cambio".
 *
 * Modelo prospectivo del Observatorio hacia el bienestar integral:
 * 5 dimensiones → 13 componentes estratégicos → 22 factores de cambio.
 * Contenido FIJO en el código (decisión del cliente, igual que las
 * tendencias-artículo): los textos son transcripción literal del anexo
 * de factores de cambio del cliente — la columna "Resumen" y la columna
 * "Descripción" de cada factor, y las definiciones de dimensiones y
 * componentes. Cambios del contenido = editar este archivo y recompilar.
 *
 * La rueda (RuedaFactores) deriva de aquí su geometría: el ancho angular
 * de cada dimensión y componente es proporcional a su número de factores
 * (22 porciones iguales en total).
 */

/**
 * Jerarquía completa del modelo: dimensiones → componentes → factores.
 * OJO: `lineasEtiqueta` admite MÁXIMO 2 elementos — la rueda solo tiene
 * radios calibrados para rótulos curvos de 1 o 2 líneas (longitudes
 * mayores caen a la calibración de 2 líneas y se superponen).
 */
export const DIMENSIONES_FACTORES = [
  {
    id: 'd1',
    nro: 1,
    nombre: "Desarrollo Humano Integral",
    lineasEtiqueta: ["Desarrollo Humano","Integral"],
    definicion:
      "Dimensión orientada a ampliar las libertades, capacidades y oportunidades de las personas para alcanzar una vida digna y el pleno desarrollo de su proyecto de vida.",
    componentes: [
      {
        id: 'c1',
        nro: 1,
        nombre: "Desarrollo de capacidades humanas",
        definicion:
          "Desarrollo de capacidades individuales y colectivas que permiten a las personas aprender, trabajar, innovar, participar y adaptarse a los cambios sociales, económicos y tecnológicos durante todo el ciclo de vida.",
        factores: [
          {
            id: 'f1',
            nro: 1,
            nombre: "Desarrollo humano centrado en la persona",
            resumen:
              "Cambio de paradigma que sitúa a la persona como el eje de las políticas públicas, priorizando la expansión de capacidades, la autonomía y el bienestar integral por encima del crecimiento económico como fin último.",
            descripcion:
              "Consiste en la capacidad de reconocer a cada individuo como protagonista de su trayectoria de vida, autonomía y transformación integral. Se partieron de enfoques homogéneos centrados en cobertura y prestación masiva de servicios. Las conclusiones globales, latinoamericanas y de cajas de compensación evidencian una evolución hacia modelos personalizados, preventivos y humanizados, con énfasis en capacidades humanas, salud mental, inclusión y singularidad, evolucionando hacia modelos más inclusivos que incorporan diversidad, agenciamiento, singularidad humana y reconocimiento diferencial. En su evolución futura, se proyecta como una dimensión orientada a medir capacidades humanas, trayectorias de vida, inclusión adaptativa y personalización contextualizada del desarrollo humano integral mediante ecosistemas humano céntricos, inteligentes y colectivamente personalizados.",
          },
          {
            id: 'f2',
            nro: 2,
            nombre: "Empleos del futuro",
            resumen:
              "Transformación del mercado laboral impulsada por la digitalización, la automatización y la transición productiva, que exige nuevas competencias, aprendizaje permanente y reconversión laboral.",
            descripcion:
              "Los empleos del futuro representan la transformación de las dinámicas laborales, productivas y humanas frente a la automatización, la inteligencia artificial, las tecnologías convergentes y las nuevas economías del conocimiento. Históricamente, los sistemas de bienestar y compensación estuvieron vinculados a modelos tradicionales de empleo formal y estabilidad laboral. Posteriormente, las transformaciones tecnológicas y sociales comenzaron a modificar las relaciones entre trabajo, capacidades humanas y sostenibilidad económica. Las experiencias globales y latinoamericanas evidencian que los empleos del futuro demandarán habilidades adaptativas, pensamiento crítico, aprendizaje continuo y capacidades digitales (World Economic Forum, 2023). Las cajas de compensación y entidades colombianas muestran una creciente necesidad de reconversión laboral, formación continua y desarrollo de capacidades humanas emergentes. Bajo una perspectiva de futuro, esta dimensión se ve como un componente estratégico orientado a medir empleabilidad sostenible, reconversión laboral y adaptación de personas, empresas y territorios a nuevas dinámicas productivas y tecnológicas.",
          },
        ],
      },
      {
        id: 'c2',
        nro: 2,
        nombre: "Garantía de derechos y equidad",
        definicion:
          "Conjunto de mecanismos institucionales que aseguran el acceso efectivo a derechos, oportunidades y servicios, reduciendo las desigualdades sociales, territoriales y económicas.",
        factores: [
          {
            id: 'f3',
            nro: 3,
            nombre: "El enfoque de derechos",
            resumen:
              "Perspectiva que orienta las políticas hacia la protección y garantía efectiva de los derechos humanos, promoviendo la inclusión, la igualdad de oportunidades y la justicia social.",
            descripcion:
              "El enfoque de derechos representa la comprensión del desarrollo humano integral como una garantía social orientada al reconocimiento de dignidad, equidad, inclusión y acceso diferencial a oportunidades humanas. Históricamente, los sistemas de bienestar estuvieron centrados en modelos asistenciales y de cobertura básica. Posteriormente, las transformaciones normativas y sociales impulsaron la consolidación de enfoques basados en derechos humanos, inclusión y ciudadanía social (Nussbaum, 2012). Las experiencias globales, latinoamericanas y colombianas muestran una transición hacia modelos más preventivos, personalizados y centrados en capacidades humanas. En las cajas de compensación esta evolución se evidencia en el fortalecimiento de programas de inclusión, salud mental, cuidado y territorialización. A futuro, se proyecta el enfoque de derechos como una dimensión estratégica orientada a medir justicia social, acceso equitativo, inclusión adaptativa y fortalecimiento de capacidades humanas en contextos de transformación social y territorial (United Nations Development Programme [UNDP], 2020).",
          },
        ],
      },
    ],
  },
  {
    id: 'd2',
    nro: 2,
    nombre: "Compensación Familiar",
    lineasEtiqueta: ["Compensación Familiar"],
    definicion:
      "Dimensión que articula los mecanismos de protección social y solidaridad para mejorar las condiciones de vida de los trabajadores, sus familias y las comunidades.",
    componentes: [
      {
        id: 'c3',
        nro: 3,
        nombre: "Bienestar y protección social",
        definicion:
          "Integración de servicios, beneficios y acciones orientados a mejorar el bienestar físico, mental, social y económico de las personas y las familias durante todo su ciclo de vida.",
        factores: [
          {
            id: 'f4',
            nro: 4,
            nombre: "Bienestar socioemocional",
            resumen:
              "Reconocimiento creciente de la salud mental, el bienestar emocional y la resiliencia como determinantes fundamentales del bienestar y del desarrollo humano.",
            descripcion:
              "Representa la integración de salud mental, equilibrio emocional y relaciones humanas como componentes esenciales del desarrollo humano integral. Inicialmente la salud mental fue abordada desde perspectivas clínicas y reactivas. Las experiencias identifican la salud mental y el cuidado de las personas como prioridades emergentes frente a fenómenos de automatización, nuevas estructuras familiares y fragmentación social, viene evolucionando hacia enfoques preventivos, relacionales y de cuidado integral. En el mediano y largo plazo, se proyecta como un aspecto estratégico para medir resiliencia emocional, cohesión social, sentido de vida y capacidad adaptativa frente a fenómenos emergentes como soledad, estrés, hiperconectividad, nomadismo digital y fragmentación social.",
          },
          {
            id: 'f5',
            nro: 5,
            nombre: "La economía del cuidado",
            resumen:
              "Reconfiguración de la organización social del cuidado, promoviendo la corresponsabilidad entre Estado, mercado, familias y comunidad para garantizar el bienestar.",
            descripcion:
              "La economía del cuidado representa la capacidad institucional y social de reconocer, organizar y sostener las actividades relacionadas con el cuidado humano, emocional, familiar y comunitario como componentes esenciales del desarrollo humano integral. Históricamente, el cuidado permaneció invisibilizado y asociado principalmente al ámbito doméstico y familiar. Sin embargo, fenómenos como envejecimiento poblacional, nuevas estructuras familiares y aumento de problemáticas de salud mental impulsaron su reconocimiento como dimensión estratégica del bienestar (Comisión Económica para América Latina y el Caribe [CEPAL], 2022). Las experiencias latinoamericanas y de las cajas de compensación muestran una creciente incorporación de modelos de cuidado integral y apoyo a personas dependientes. A futuro, se proyecta la economía del cuidado como una dimensión fundamental para medir sostenibilidad humana, resiliencia familiar, cohesión social y equilibrio entre vida, trabajo y bienestar colectivo.",
          },
          {
            id: 'f6',
            nro: 6,
            nombre: "Integración sistémica del bienestar",
            resumen:
              "Evolución hacia modelos de atención articulados e interoperables que integran servicios, actores y políticas alrededor de las necesidades de las personas.",
            descripcion:
              "La integración sistémica representa la capacidad de conectar procesos, servicios, actores y capacidades alrededor de las necesidades humanas y territoriales. Inicialmente predominaban estructuras fragmentadas, operaciones aisladas y servicios desconectados. Posteriormente evolucionó hacia articulación institucional, interoperabilidad y rutas integrales de atención. Las conclusiones globales, colombianas y de cajas de compensación muestran una evolución hacia ecosistemas integrados que articulan protección social, salud, educación, cuidado, empleabilidad y desarrollo territorial. Con proyección futura, se proyecta como una dimensión estratégica para medir conectividad organizacional, integración de ecosistemas y capacidad institucional de responder de manera coordinada, inteligente y centrada en las trayectorias de vida de las personas y comunidades.",
          },
          {
            id: 'f7',
            nro: 7,
            nombre: "Ecosistema colectivo de bienestar personalizado",
            resumen:
              "Uso de inteligencia de datos y modelos centrados en el usuario para ofrecer soluciones de bienestar adaptadas a las características y necesidades de cada afiliado.",
            descripcion:
              "Representa la capacidad de articular hiperpersonalización, rutas integradas y atención contextualizada alrededor de las necesidades humanas. Inicialmente predominaban modelos homogéneos y segmentaciones básicas. Luego evolucionaron enfoques centrados en la persona y experiencias integradas. Las conclusiones globales y de cajas de compensación evidencian una evolución hacia servicios personalizados, preventivos, territoriales y centrados en la experiencia humana. En su evolución futura, se proyecta como una dimensión orientada a medir personalización adaptativa, inteligencia colectiva, autogestión y capacidad institucional de construir trayectorias integrales de desarrollo humano contextualizadas, sostenibles y colectivamente articuladas.",
          },
        ],
      },
      {
        id: 'c4',
        nro: 4,
        nombre: "Cohesión social y solidaridad",
        definicion:
          "Proceso de redistribuir oportunidades y recursos, fortaleciendo la integración social y disminuyendo las brechas de desigualdad.",
        factores: [
          {
            id: 'f8',
            nro: 8,
            nombre: "La esencia solidaria",
            resumen:
              "Reafirmación del principio de solidaridad como fundamento del sistema de compensación, fortaleciendo la redistribución y la inclusión social.",
            descripcion:
              "La esencia solidaria representa la base histórica, ética y cohesionadora sobre la cual se estructura la compensación familiar y la construcción colectiva del desarrollo humano integral. Desde sus orígenes, la solidaridad surgió como un mecanismo redistributivo orientado a disminuir desigualdades sociales mediante subsidios, protección social y acceso colectivo al bienestar (Marshall, 1998). En América Latina y Colombia, esta lógica permitió consolidar instituciones legitimadas territorialmente, sustentadas en principios de equidad, cohesión social y responsabilidad colectiva. Las conclusiones del análisis global y de las cajas de compensación evidencian que la solidaridad evoluciona hacia modelos de corresponsabilidad social, cooperación multisectorial y generación de valor público. De manera prospectiva, se proyecta la esencia solidaria como una dimensión estratégica orientada a medir cohesión social, confianza colectiva, equidad territorial y sostenibilidad humana en ecosistemas inteligentes de desarrollo humano integral (Sen, 1999).",
          },
        ],
      },
      {
        id: 'c5',
        nro: 5,
        nombre: "Valor público y desarrollo social",
        definicion:
          "Capacidad sistemica para generar beneficios colectivos sostenibles, legitimidad social e impactos verificables sobre el bienestar de la población.",
        factores: [
          {
            id: 'f9',
            nro: 9,
            nombre: "Impacto Social Transformador",
            resumen:
              "Orientación hacia la medición y generación de resultados que produzcan transformaciones estructurales en las personas, familias, organizaciones y territorios.",
            descripcion:
              "Consiste en la capacidad de generar cambios sostenibles en la calidad de vida, el desarrollo humano y la cohesión social de personas y comunidades. Se asocio a modelos asistenciales orientados a cobertura, compensación y protección básica. Las conclusiones globales y colombianas muestran una transición desde enfoques asistencialistas hacia modelos multidimensionales de desarrollo humano integral y ecosistemas integrados de bienestar. Posteriormente evolucionó hacia enfoques centrados en transformación comunitaria, movilidad social y desarrollo humano integral. De cara al futuro, se proyecta como una dimensión estratégica para medir valor social sostenible, fortalecimiento territorial y transformación estructural de las condiciones humanas desde una lógica regenerativa, multidimensional y orientada a generar impacto real y sostenible para personas, empresas y territorios.",
          },
        ],
      },
    ],
  },
  {
    id: 'd3',
    nro: 3,
    nombre: "Capacidades Institucionales",
    lineasEtiqueta: ["Capacidades Institucionales"],
    definicion:
      "Dimensión que reúne las capacidades organizacionales necesarias para anticipar, gestionar e impulsar la transformación sostenible del sistema de bienestar.",
    componentes: [
      {
        id: 'c6',
        nro: 6,
        nombre: "Gobernanza institucional",
        definicion:
          "Lidera, coordinar y articular actores públicos, privados y sociales mediante procesos transparentes, participativos y colaborativos.",
        factores: [
          {
            id: 'f10',
            nro: 10,
            nombre: "Gobernanza colaborativa del bienestar",
            resumen:
              "Evolución desde modelos jerárquicos hacia redes de gobernanza que comparten responsabilidades y generan valor mediante la cooperación.",
            descripcion:
              "Es la capacidad de articular actores públicos, privados, sociales y territoriales alrededor de objetivos compartidos de desarrollo humano integral. Inicialmente las alianzas respondían a dinámicas funcionales y operativas de cooperación institucional. Las experiencias están mostrando la evolución hacia la configuración ecosistemas colaborativos de valor, cooperación público-privada e integración de capacidades territoriales y organizacionales, orientadas por relacionamientos estratégicos y construcción colectiva de valor social. En las próximas décadas, será vital medir articulación institucional, inteligencia colectiva y cooperación territorial, mediante redes simbióticas capaces de integrar capacidades, movilizar innovación social y fortalecer ecosistemas inteligentes de desarrollo humano sostenible e impacto multidimensional.",
          },
          {
            id: 'f11',
            nro: 11,
            nombre: "Legitimidad y confianza institucional",
            resumen:
              "Fortalecimiento de la confianza ciudadana mediante transparencia, integridad, participación y rendición de cuentas.",
            descripcion:
              "Representa la capacidad de las organizaciones para generar credibilidad, reconocimiento social, cohesión colectiva y capital relacional mediante actuaciones éticas, legales, transparentes y territorialmente cercanas. Históricamente, estas capacidades surgieron desde la construcción de vínculos sociales, la cercanía comunitaria y el cumplimiento de propósitos de protección y desarrollo humano (Putnam, 1993). Las experiencias globales y colombiana evidencian que la sostenibilidad y legitimidad institucional serán determinantes para enfrentar envejecimiento, automatización y transformación social. A futuro, el IBIM las proyecta como dimensiones fundamentales para medir confianza social, liderazgo territorial y capacidad institucional de sostener ecosistemas inteligentes de desarrollo humano integral en contextos complejos, dinámicos y altamente interdependientes.",
          },
        ],
      },
      {
        id: 'c7',
        nro: 7,
        nombre: "Dirección y gestión estratégica",
        definicion:
          "Orientación institucional para anticipar escenarios, orientar decisiones y gestionar el desempeño con visión de largo plazo.",
        factores: [
          {
            id: 'f12',
            nro: 12,
            nombre: "Comunicación estratégica",
            resumen:
              "Evolución de la comunicación como instrumento para movilizar actores, construir cultura organizacional y fortalecer el posicionamiento institucional.",
            descripcion:
              "Representa la capacidad de visibilizar el valor social generado y fortalecer legitimidad institucional mediante narrativas transformadoras. Inicialmente la comunicación se enfocaba en informar servicios y resultados operativos. Posteriormente evolucionó hacia evidencia de impacto, reputación institucional y transformación social. Las conclusiones del benchmarking global y de cajas de compensación muestran que la legitimidad futura dependerá de demostrar impacto, sostenibilidad y transformación social mediante evidencia y confianza institucional. En el mediano y largo plazo, el bienestar se proyecta como una dimensión estratégica orientada a medir confianza colectiva, movilización social y capacidad institucional de demostrar cómo el desarrollo humano integral transforma sosteniblemente personas, comunidades y territorios.",
          },
          {
            id: 'f13',
            nro: 13,
            nombre: "Direccionamiento estratégico del bienestar",
            resumen:
              "Integración de la prospectiva, la planeación estratégica y la gestión basada en resultados para orientar el desarrollo institucional.",
            descripcion:
              "Representa la capacidad institucional de orientar decisiones mediante evidencia, medición integral de impacto y articulación multisectorial. Inicialmente se orientaba por enfoques administrativos y métricas operativas. Posteriormente evolucionó hacia modelos integrales de evaluación, evidencia del valor generado y gestión basada en resultados. Las conclusiones del benchmarking global y colombiano evidencian una transición hacia modelos de inteligencia social, medición del bienestar y evaluación integral del valor social generado. De manera prospectiva, se proyecta como una dimensión estratégica capaz de medir transformación social, orientar procesos adaptativos y fortalecer liderazgo institucional mediante evidencia multidimensional, impacto demostrable y construcción colectiva de ecosistemas sostenibles de desarrollo humano integral.",
          },
        ],
      },
      {
        id: 'c8',
        nro: 8,
        nombre: "Innovación y aprendizaje institucional",
        definicion:
          "Genera, gestiona y aplica conocimiento que fortalezca la innovación, el aprendizaje organizacional y la toma de decisiones basada en evidencia.",
        factores: [
          {
            id: 'f14',
            nro: 14,
            nombre: "Inteligencia estratégica del bienestar",
            resumen:
              "Desarrollo de capacidades analíticas y prospectivas para anticipar tendencias, identificar riesgos y apoyar decisiones estratégicas.",
            descripcion:
              "Expresa la capacidad de transformar datos e información en conocimiento para anticipar necesidades y orientar decisiones de desarrollo humano integral. La información inicialmente se utilizaba como un uso operativo y descriptivo. Las experiencias muestran que el futuro exige sistemas personalizados, preventivos y apalancados en datos, inteligencia artificial e inteligencia social para anticipar riesgos y fortalecer cohesión social. Viene evolucionando hacia analítica, inteligencia de negocio y modelos orientados a medir impacto y comprender dinámicas sociales. Se como una dimensión predictiva basada en inteligencia artificial, analítica avanzada, inteligencia territorial y autogestión inteligente, capaz de anticipar escenarios, personalizar intervenciones y fortalecer decisiones estratégicas multidimensionales.",
          },
          {
            id: 'f15',
            nro: 15,
            nombre: "La gestión del conocimiento",
            resumen:
              "Consolidación del conocimiento institucional como activo estratégico para innovar, aprender y mejorar continuamente.",
            descripcion:
              "Representa la capacidad institucional de transformar información, aprendizaje y experiencia en inteligencia organizacional orientada a la anticipación, innovación y toma de decisiones estratégicas para el desarrollo humano integral. Históricamente, las organizaciones operaban con modelos centrados en información operativa y administración funcional del conocimiento. Posteriormente evolucionaron hacia sistemas de analítica, inteligencia de negocio y aprendizaje institucional (Nonaka & Takeuchi, 1995). Las experiencias globales y de las cajas de compensación evidencian que la gestión del conocimiento se convierte en un activo estratégico para comprender dinámicas sociales, fortalecer capacidades adaptativas y construir inteligencia territorial. En horizontes futuros, se visualiza como una dimensión orientada a medir aprendizaje organizacional, inteligencia colectiva, transferencia de capacidades y capacidad institucional para anticipar escenarios complejos mediante tecnologías emergentes, inteligencia artificial y prospectiva estratégica (Organisation for Economic Co-operation and Development [OECD], 2020).",
          },
        ],
      },
      {
        id: 'c9',
        nro: 9,
        nombre: "Sostenibilidad institucional",
        definicion:
          "Capacidad para garantizar la permanencia, resiliencia y adaptación de la organización mediante el fortalecimiento de sus recursos financieros, humanos, tecnológicos y regulatorios.",
        factores: [
          {
            id: 'f16',
            nro: 16,
            nombre: "Sostenibilidad regulatoria del bienestar",
            resumen:
              "Adaptación continua al entorno normativo para asegurar cumplimiento, estabilidad jurídica y gestión de riesgos regulatorios.",
            descripcion:
              "La sostenibilidad regulatoria representa la capacidad institucional de mantener estabilidad y continuidad frente a exigencias normativas, financieras y jurídicas. Inicialmente las organizaciones operaban bajo marcos regulatorios relativamente estables. Posteriormente crecieron las presiones asociadas a recursos obligatorios y riesgos regulatorios. Las conclusiones del benchmarking colombiano y de cajas de compensación muestran que las transformaciones sociales, económicas y tecnológicas incrementan la necesidad de adaptación institucional y sostenibilidad del sistema. A futuro, se proyecta como una dimensión orientada a medir resiliencia jurídica, gobernanza regulatoria y capacidad adaptativa, garantizando continuidad operativa y sostenibilidad del desarrollo humano integral en contextos regulatorios dinámicos y complejos.",
          },
          {
            id: 'f17',
            nro: 17,
            nombre: "Sostenibilidad estratégica organizacional",
            resumen:
              "Desarrollo de capacidades financieras y organizacionales que aseguren la continuidad institucional y la creación de valor en el largo plazo.",
            descripcion:
              "Representa la capacidad institucional de sostener en el tiempo su propósito de desarrollo humano integral mediante resiliencia, eficiencia, viabilidad financiera y capacidad adaptativa. Inicialmente dependía de modelos tradicionales de financiación y operación. Luego evolucionó hacia diversificación de ingresos, fortalecimiento organizacional y sostenibilidad operativa. Las conclusiones de las cajas de compensación muestran la necesidad de construir ventajas competitivas mediante la profesionalización de servicios, diversificación de ingresos y financiamiento sostenible. A futuro, se proyecta como una dimensión orientada a medir resiliencia institucional, sostenibilidad del impacto social, equilibrio entre rentabilidad y propósito, autosostenibilidad y capacidad exponencial en contextos de alta incertidumbre y transformación permanente.",
          },
        ],
      },
    ],
  },
  {
    id: 'd4',
    nro: 4,
    nombre: "Transformación del Entorno",
    lineasEtiqueta: ["Transformación","del Entorno"],
    definicion:
      "Dimensión que analiza las dinámicas externas que modifican las condiciones sociales, económicas, ambientales y tecnológicas que inciden en el bienestar.",
    componentes: [
      {
        id: 'c10',
        nro: 10,
        nombre: "Innovación para la transformación social",
        definicion:
          "Promoción de procesos de innovación social, tecnológica e institucional que generan nuevas soluciones para responder a desafíos emergentes.",
        factores: [
          {
            id: 'f18',
            nro: 18,
            nombre: "La transformaciones sociales y organizacionales",
            resumen:
              "Cambios profundos en las formas de organización, interacción y creación de valor derivados de las nuevas dinámicas sociales y tecnológicas.",
            descripcion:
              "Las transformaciones sociales y organizacionales representan la capacidad de adaptación institucional frente a cambios culturales, tecnológicos, demográficos y territoriales que redefinen las dinámicas del desarrollo humano integral. Históricamente, las organizaciones operaban bajo estructuras rígidas, modelos lineales y paradigmas relativamente estables. Posteriormente, fenómenos como automatización, digitalización, cambios familiares, nuevas ciudadanías y transformaciones culturales impulsaron procesos de reconfiguración institucional y adaptación organizacional (Castells, 1999). Las experiencias globales, colombianas y de cajas de compensación muestran una evolución hacia organizaciones líquidas, ágiles, colaborativas y centradas en la experiencia humana. De cara al futuro, estas transformaciones como una dimensión estratégica orientada a medir resiliencia institucional, flexibilidad organizacional, innovación adaptativa y capacidad de respuesta frente a entornos complejos y altamente dinámicos.",
          },
        ],
      },
      {
        id: 'c11',
        nro: 11,
        nombre: "Sostenibilidad y resiliencia territorial",
        definicion:
          "Capacidad de los territorios para desarrollarse de manera equilibrada, sostenible y resiliente frente a riesgos ambientales, económicos y sociales.",
        factores: [
          {
            id: 'f19',
            nro: 19,
            nombre: "Desarrollo sostenible",
            resumen:
              "Transición hacia modelos de desarrollo que integran crecimiento económico, inclusión social y sostenibilidad ambiental.",
            descripcion:
              "Representa la capacidad de equilibrar desarrollo humano, sostenibilidad económica, cohesión social y equilibrio territorial en el largo plazo. Inicialmente se relacionaba principalmente con sostenimiento institucional y crecimiento económico. Posteriormente evolucionó hacia enfoques integrales que incorporan impacto social y sostenibilidad ambiental. Las conclusiones globales, latinoamericanas, colombianas y de cajas de compensación evidencian que el futuro del sistema dependerá de su capacidad para responder a envejecimiento, automatización, cambio climático, desigualdad territorial y sostenibilidad social. Con visión de futuro, se visualiza como una dimensión articuladora orientada a medir resiliencia territorial, sostenibilidad intergeneracional y capacidad de construir ecosistemas humanos, sociales, económicos y ambientales regenerativos, inclusivos y sostenibles.",
          },
        ],
      },
      {
        id: 'c12',
        nro: 12,
        nombre: "Desarrollo territorial sostenible",
        definicion:
          "Integración de capacidades territoriales para fortalecer la resiliencia, la adaptación y la competitividad regional desde una perspectiva de bienestar.",
        factores: [
          {
            id: 'f20',
            nro: 20,
            nombre: "Capacidad adaptativa exponencial",
            resumen:
              "Habilidad de las organizaciones y los territorios para responder rápidamente a cambios acelerados mediante innovación, anticipación y aprendizaje continuo.",
            descripcion:
              "La capacidad adaptativa exponencial representa la habilidad organizacional para responder ágilmente al cambio y expandir capacidades de impacto social. Inicialmente predominaban estructuras jerárquicas y modelos lineales de crecimiento. Posteriormente evolucionaron organizaciones más ágiles, flexibles y dinámicas. Las conclusiones de las cajas de compensación y del benchmarking global evidencian la necesidad de construir organizaciones ágiles, líquidas, inteligentes y exponenciales capaces de integrar tecnología, innovación y ecosistemas de valor. Con proyección futura, se proyecta como una dimensión orientada a medir escalabilidad, innovación continua, inteligencia colectiva y adaptación acelerada frente a dinámicas tecnológicas, humanas y territoriales emergentes, consolidando organizaciones líquidas, simbióticas y exponenciales.",
          },
        ],
      },
    ],
  },
  {
    id: 'd5',
    nro: 5,
    nombre: "Territorio",
    lineasEtiqueta: ["Territorio"],
    definicion:
      "Dimensión que incorpora el enfoque territorial como principio para garantizar que el bienestar responda a las particularidades sociales, económicas, culturales y ambientales de cada región.",
    componentes: [
      {
        id: 'c13',
        nro: 13,
        nombre: "Desarrollo territorial del bienestar",
        definicion:
          "Organización de políticas, servicios y capacidades institucionales con enfoque territorial para reducir brechas y promover un desarrollo equilibrado e inclusivo.",
        factores: [
          {
            id: 'f21',
            nro: 21,
            nombre: "Territorialidad y Territorialización del bienestar",
            resumen:
              "Proceso mediante el cual las políticas de bienestar se adaptan a las características y necesidades específicas de cada territorio.",
            descripcion:
              "Expresan la capacidad de comprender las dinámicas sociales, culturales, económicas y comunitarias de cada territorio para construir respuestas diferenciadas y contextualizadas de desarrollo humano integral. Inicialmente estuvieron asociadas a expansión física, descentralización de servicios y consolidación de infraestructura territorial. Las conclusiones del benchmarking latinoamericano y de las cajas de compensación evidencian una transición hacia modelos territoriales, preventivos anticipatorios y personalizados que fortalecen cohesión social y cercanía comunitaria. Posteriormente evolucionaron hacia modelos de cercanía regional, adaptación local y capilaridad territorial. Con visión de futuro, se proyecta como dimensiones estratégicas para medir equidad territorial, acceso diferencial, cohesión comunitaria e inteligencia territorial, mediante ecosistemas híbridos, conectados y adaptativos capaces de responder dinámicamente a las necesidades emergentes de personas, comunidades y territorios.",
          },
          {
            id: 'f22',
            nro: 22,
            nombre: "Adaptabilidad transformacional",
            resumen:
              "Capacidad de los territorios para anticipar, absorber y aprovechar los cambios mediante innovación, aprendizaje y gobernanza adaptativa.",
            descripcion:
              "Representa la capacidad de evolucionar cultural y organizacionalmente frente a cambios sociales, humanos y tecnológicos. Inicialmente predominaban estructuras rígidas y paradigmas estables. Luego surgió la necesidad de desaprender modelos tradicionales y promover transformación organizacional. Las conclusiones globales y de cajas de compensación evidencian que las organizaciones deberán evolucionar hacia estructuras ágiles, líquidas y adaptativas capaces de responder a automatización, inteligencia artificial y nuevas dinámicas sociales. Hacia el futuro, se proyecta como una dimensión orientada a medir aprendizaje adaptativo, flexibilidad institucional, resiliencia cultural y capacidad de transformación continua, permitiendo evolucionar hacia organizaciones líquidas, ágiles y adaptativas capaces de responder a entornos emergentes.",
          },
        ],
      },
    ],
  },
];

/**
 * Rótulos legibles por tipo de nodo (las claves son los valores de tipo
 * que produce resolverNodo). Únicos para todo el módulo: los usan el
 * centro de la rueda, el panel de detalle y el anuncio para lectores.
 */
export const NOMBRES_TIPO = {
  dimension: 'Dimensión',
  componente: 'Componente estratégico',
  factor: 'Factor de cambio',
};

/* Índice plano id → nodo con su contexto, para resolver selecciones de la
   rueda sin recorrer la jerarquía en cada render. */
const INDICE = new Map();
for (const dimension of DIMENSIONES_FACTORES) {
  INDICE.set(dimension.id, { tipo: 'dimension', nodo: dimension, dimension });
  for (const componente of dimension.componentes) {
    INDICE.set(componente.id, { tipo: 'componente', nodo: componente, dimension, componente });
    for (const factor of componente.factores) {
      INDICE.set(factor.id, { tipo: 'factor', nodo: factor, dimension, componente });
    }
  }
}

/** Total de factores de cambio del modelo (porciones de la rueda). */
export const TOTAL_FACTORES = [...INDICE.values()].filter((e) => e.tipo === 'factor').length;

/** Total de componentes estratégicos del modelo. */
export const TOTAL_COMPONENTES = [...INDICE.values()].filter(
  (e) => e.tipo === 'componente',
).length;

/**
 * Devuelve { tipo, nodo, dimension, componente } para un id de la rueda
 * ('d1'…'d5', 'c1'…'c13', 'f1'…'f22'), o null si no existe.
 */
export function resolverNodo(id) {
  return INDICE.get(id) ?? null;
}
