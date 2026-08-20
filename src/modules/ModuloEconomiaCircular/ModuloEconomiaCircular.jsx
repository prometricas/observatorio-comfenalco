/**
 * ModuloEconomiaCircular — Tendencia "Economía circular".
 *
 * Artículo "Prospectivas de Ecología y Economía Circular en Colombia"
 * con el contenido FIJO en el código, igual que los demás artículos de
 * tendencias (decisión del cliente): sin lecturas de .docx/.json en
 * runtime. Texto transcrito literal del Word del cliente, incluidas sus
 * SIETE citas destacadas centradas; las 16 figuras van como WebP
 * optimizados (~93 % más livianos que los PNG del documento, nitidez
 * verificada) con carga perezosa y caché inmutable.
 *
 * Ajuste mínimo documentado: la nota de la Figura 6 termina en el Word
 * con la palabra suelta "GLOSARIO" (resto de edición sin contenido
 * asociado); se omite y quedó avisado al cliente en el CHANGELOG.
 *
 * Cambios del artículo = editar este código y recompilar (no aplica el
 * contrato de reemplazo de archivos de las tendencias con datos vivos).
 */
import { useRef } from 'react';
import TablaContenido from '../../components/TablaContenido/TablaContenido.jsx';
import './modulo-economia-circular.css';

import figura01 from '../../assets/economia-circular/figura-01.webp';
import figura02 from '../../assets/economia-circular/figura-02.webp';
import figura03 from '../../assets/economia-circular/figura-03.webp';
import figura04 from '../../assets/economia-circular/figura-04.webp';
import figura05 from '../../assets/economia-circular/figura-05.webp';
import figura06 from '../../assets/economia-circular/figura-06.webp';
import figura07 from '../../assets/economia-circular/figura-07.webp';
import figura08 from '../../assets/economia-circular/figura-08.webp';
import figura09 from '../../assets/economia-circular/figura-09.webp';
import figura10 from '../../assets/economia-circular/figura-10.webp';
import figura11 from '../../assets/economia-circular/figura-11.webp';
import figura12 from '../../assets/economia-circular/figura-12.webp';
import figura13 from '../../assets/economia-circular/figura-13.webp';
import figura14 from '../../assets/economia-circular/figura-14.webp';
import figura15 from '../../assets/economia-circular/figura-15.webp';
import figura16 from '../../assets/economia-circular/figura-16.webp';

/* Rótulo al estilo del documento: "Figura N." en negrita, título plano. */
function Figura({ numero, titulo, imagen, alt, nota }) {
  return (
    <figure className="modulo-economia-circular__figura">
      <figcaption className="modulo-economia-circular__figura-rotulo">
        <strong>Figura {numero}.</strong> {titulo}
      </figcaption>
      <img
        className="modulo-economia-circular__figura-imagen"
        src={imagen}
        alt={alt}
        loading="lazy"
      />
      <p className="modulo-economia-circular__figura-nota">
        <strong>Nota.</strong> {nota}
      </p>
    </figure>
  );
}

const P = ({ children }) => <p className="modulo-economia-circular__parrafo">{children}</p>;
const H3 = ({ children }) => <h3 className="modulo-economia-circular__apartado">{children}</h3>;
const Cita = ({ children }) => (
  <blockquote className="modulo-economia-circular__cita-destacada">{children}</blockquote>
);
const Ref = ({ children }) => (
  <li className="modulo-economia-circular__referencia">{children}</li>
);
const Enlace = ({ url }) => (
  <a href={url} target="_blank" rel="noreferrer">
    {url}
  </a>
);

function ModuloEconomiaCircular({ tendencia }) {
  /* El índice lee los apartados del artículo renderizado por esta ref. */
  const articuloRef = useRef(null);

  return (
    <section className="modulo-economia-circular" aria-labelledby="titulo-economia-circular">
      <header className="modulo-economia-circular__encabezado">
        <p className="modulo-economia-circular__contexto">Tendencias</p>
        <h1 id="titulo-economia-circular" className="modulo-economia-circular__titulo">
          {tendencia.etiqueta}
        </h1>
        <p className="modulo-economia-circular__titulo-articulo">
          Prospectivas de Ecología y Economía Circular en Colombia
        </p>
        <p className="modulo-economia-circular__subtitulo-articulo">
          Residuos, productividad material, clima, territorio y convergencia regulatoria
        </p>
        <p className="modulo-economia-circular__fecha-articulo">07-julio-2026</p>
      </header>

      {/* Rejilla índice + artículo (tabla de contenido del cliente) */}
      <div className="articulo-con-indice">
        <TablaContenido articuloRef={articuloRef} />
        <article ref={articuloRef} className="modulo-economia-circular__panel">
        <Cita>
          “La economía circular no pregunta cuánta basura se recoge, sino cuánta materia deja de
          desperdiciarse antes de llegar al basurero.”
        </Cita>
        <P>
          La economía circular dejó de ser una conversación ambiental reservada a especialistas
          para convertirse en una prueba de adaptación económica, territorial y social. En
          Colombia, el debate ya no gira solamente alrededor de reciclar más, sino de producir
          bienestar con menos presión sobre los materiales, reducir residuos antes de que
          aparezcan, convertir desechos en recursos, abrir empleos verdes y llevar la
          sostenibilidad desde el discurso institucional hacia la vida cotidiana de hogares,
          empresas y ciudades.
        </P>
        <P>
          Por esa razón, la variable Prospectivas de Ecología - Economía Circular se entiende como
          una señal estructural de futuro. Su utilidad está en observar si el país podrá desacoplar
          crecimiento económico y uso de materiales, si la generación de residuos podrá bajar al
          mismo tiempo que aumenta el aprovechamiento, si la circularidad empresarial dejará de ser
          un nicho y si la transición ecológica tendrá efectos medibles sobre empleo, consumo,
          clima y bienestar territorial.
        </P>
        <P>
          Además, el análisis integra dos planos complementarios. El primero observa trayectorias
          cuantitativas: productividad material, intensidad material, residuos sólidos por
          habitante, reciclaje, aprovechamiento orgánico, empleos verdes, empresas con estrategias
          circulares, intensidad de carbono, materiales recuperados, emisiones evitadas, gasto
          sostenible y huella material. El segundo incorpora el plano regulatorio, donde las reglas
          internacionales, nacionales y territoriales empujan la transición desde la gestión
          sanitaria de residuos hacia una economía que busca cerrar ciclos.
        </P>
        <P>
          En términos prospectivos, la señal decisiva no está en una sola cifra. Está en la
          dirección conjunta del movimiento. Entre 2023 y 2040, Colombia aparece en un tránsito
          donde la productividad material aumenta, la intensidad material baja, la recuperación de
          materiales se expande, las empresas circulares ganan presencia y la intensidad de carbono
          disminuye. Sin embargo, el cambio no ocurre por inercia: la frontera real estará en la
          capacidad de convertir políticas, normas, inversiones, tecnología, hábitos de consumo y
          cadenas empresariales en una transformación visible de la economía material.
        </P>

        <H3>Una transición que ya no se mide solo por reciclar</H3>
        <P>
          La circularidad colombiana entra al horizonte 2040 con una señal doble. La tasa de
          reciclaje y aprovechamiento pasaría de 17% en 2023 a 40% en 2040, mientras la proporción
          de empresas con estrategias circulares aumentaría de 19% a 55%. La diferencia entre ambos
          ritmos es importante: la adopción empresarial podría avanzar más rápido que la capacidad
          agregada del país para transformar residuos en materiales aprovechados.
        </P>
        <P>
          A la vez, esta brecha revela una tensión frecuente en las transiciones ecológicas. Las
          empresas pueden declarar estrategias, rediseñar procesos, incorporar certificaciones o
          participar en cadenas de valorización antes de que el sistema urbano y territorial logre
          mover la infraestructura necesaria para recolectar, separar, clasificar, transformar y
          reincorporar materiales. En otras palabras, la economía circular puede empezar en la
          empresa, pero solo se consolida cuando la logística, la regulación, los hogares, los
          recicladores, los municipios y los mercados secundarios funcionan como una misma red.
        </P>
        <P>
          En ese punto, la imagen inicial deja ver dos velocidades dentro de una misma transición.
          La circularidad empresarial crece con mayor pendiente, mientras el reciclaje avanza de
          manera sostenida, pero más gradual. Para el bienestar territorial, esa distancia importa
          porque los residuos no se reducen por declaración estratégica; se reducen cuando el
          sistema completo logra convertirlos en insumos, ingresos, menor contaminación y presión
          sobre rellenos sanitarios.
        </P>
        <Figura
          numero="1"
          titulo="Comparación de variables seleccionadas — economía circular"
          imagen={figura01}
          alt="Trayectoria observada y proyectada de la tasa de reciclaje y aprovechamiento frente a la adopción empresarial de estrategias circulares, con el tramo prospectivo en línea discontinua"
          nota="La figura muestra la trayectoria observada y proyectada del reciclaje y aprovechamiento frente a la adopción empresarial de estrategias circulares. La línea discontinua marca el tramo prospectivo. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />

        <H3>El metabolismo circular: menos huella, más recuperación</H3>
        <Cita>
          “El futuro circular no se mide por producir menos, sino por desperdiciar menos para
          sostener mejor la vida.”
        </Cita>
        <P>
          La economía de un país también puede entenderse como un metabolismo. Entra materia, se
          transforma en bienes, circula por hogares y empresas, y finalmente sale como residuo,
          emisión o recurso recuperado. Desde esa mirada, Colombia enfrenta una pregunta central
          hacia 2040: si la huella material por habitante baja, pero los materiales recuperados
          suben, el país estaría empezando a cerrar una parte del ciclo que antes terminaba en
          disposición final.
        </P>
        <P>
          Además, la proyección muestra un avance relevante. Los materiales recuperados pasarían de
          2,3 millones de toneladas en 2023 a cerca de 5,8 millones de toneladas en 2040. Al mismo
          tiempo, la huella material por habitante bajaría de 9,8 a 8,6 toneladas por persona. Este
          movimiento no elimina la presión material, pero sí cambia su dirección: menos carga por
          habitante y más capacidad de recuperación dentro de la economía.
        </P>
        <P>
          Así, el metabolismo circular condensa una trayectoria de fondo: cada punto temporal se
          desplaza hacia menor huella y mayor recuperación. La señal prospectiva es clara: el país
          no solo necesitará reciclar más, sino recuperar mejor, diferenciar materiales, incorporar
          orgánicos, estabilizar mercados secundarios y evitar que la recuperación dependa
          exclusivamente de esfuerzos informales o fragmentados.
        </P>
        <Figura
          numero="2"
          titulo="Metabolismo circular de Colombia, 2023-2040"
          imagen={figura02}
          alt="Relación entre la reducción de la huella material por habitante y el aumento de materiales recuperados, con burbujas que representan el avance de la tasa de reciclaje en cada hito temporal"
          nota="La figura relaciona la reducción de la huella material por habitante con el aumento de materiales recuperados. Las burbujas representan el avance de la tasa de reciclaje y aprovechamiento en cada hito temporal. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />

        <H3>La frontera ecológico-circular: residuos, carbono y empresa</H3>
        <P>
          La transición circular colombiana no se juega únicamente en toneladas de residuos.
          También se juega en la relación entre residuos por habitante, intensidad de carbono y
          adopción empresarial. Una economía puede reducir emisiones por cambios energéticos y, aun
          así, seguir produciendo demasiados residuos. También puede adoptar estrategias
          empresariales circulares sin resolver la presión territorial de la basura.
        </P>
        <P>
          En 2023, Colombia se ubicaba en una zona de mayor presión: 285 kg de residuos sólidos por
          habitante al año, intensidad de carbono cercana a 215 toneladas de CO2e por millón de
          dólares de PIB y 19% de empresas con estrategias circulares. Hacia 2040, el escenario
          desplaza el punto hacia 230 kg por habitante al año, 120 toneladas de CO2e por millón de
          dólares de PIB y 55% de empresas circulares. La imagen no sugiere una transición
          terminada, sino un cambio de cuadrante: menos carbono, menos residuos y mayor apropiación
          empresarial.
        </P>
        <P>
          En clave territorial, la reducción de residuos por habitante aliviaría la presión sobre
          rellenos, rutas de recolección, conflictos por disposición final y costos ambientales
          locales. La caída en intensidad de carbono, por su parte, muestra que la circularidad
          puede operar como política climática indirecta: menos materiales vírgenes, más
          recuperación, menos extracción y menores emisiones asociadas al ciclo de vida.
        </P>
        <Figura
          numero="3"
          titulo="Frontera ecológico-circular de Colombia, 2023-2040"
          imagen={figura03}
          alt="Cruce de residuos sólidos por habitante, intensidad de carbono y proporción de empresas con estrategias circulares en cuadrantes, con el desplazamiento desde presión ecológica alta hacia una transición más avanzada"
          nota="La figura cruza residuos sólidos por habitante, intensidad de carbono de la economía y proporción de empresas con estrategias circulares. Los cuadrantes permiten observar el desplazamiento desde una zona de presión ecológica alta hacia una transición ecológico-circular más avanzada. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />

        <H3>El desacople material: producir valor sin multiplicar la presión física</H3>
        <P>
          El desacople es una de las ideas más exigentes de la economía circular. No basta con
          crecer económicamente; el reto está en que cada unidad de producto requiera menos
          materiales y genere menos presión ecológica. En la serie proyectada, Colombia mejora su
          productividad material de 1.450 USD por tonelada en 2023 a 2.500 USD por tonelada en
          2040, mientras su intensidad material baja de 0,53 a 0,34 toneladas por unidad de PIB.
        </P>
        <P>
          Sin embargo, la referencia OCDE se mantiene por encima, con niveles de productividad
          material que pasan de 2.950 a 4.200 USD por tonelada en el mismo horizonte. Esa distancia
          no expresa únicamente un rezago estadístico. También refleja diferencias en estructura
          productiva, tecnología, eficiencia energética, diseño industrial, formalización de
          cadenas de reciclaje, escala empresarial, infraestructura y capacidad de convertir
          materiales en bienes de mayor valor agregado.
        </P>
        <P>
          Por consiguiente, la trayectoria del desacople muestra dos caminos paralelos. Colombia
          mejora, pero todavía se mantiene lejos del estándar comparativo. La advertencia
          prospectiva está en la velocidad: si la productividad material nacional aumenta sin
          cerrar la brecha de intensidad, el país podría celebrar avances relativos mientras
          conserva una economía más pesada en recursos que las referencias internacionales.
        </P>
        <Figura
          numero="4"
          titulo="Trayectoria prospectiva del desacople material, 2023-2040"
          imagen={figura04}
          alt="Contraste de la trayectoria de Colombia con una referencia OCDE en la relación entre intensidad material y productividad material, con dirección hacia menor presión y mayor valor por tonelada"
          nota="La figura contrasta la trayectoria de Colombia con una referencia OCDE, a partir de la relación entre intensidad material y productividad material. La dirección esperada indica menor presión material por unidad de producto y mayor capacidad de generación de valor por tonelada utilizada. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />

        <H3>Circularidad como política climática</H3>
        <P>
          La economía circular suele entrar al debate por la puerta de los residuos, pero su efecto
          más amplio aparece cuando se conecta con la mitigación climática. En el escenario
          2023-2040, las emisiones evitadas por reciclaje y aprovechamiento pasarían de 1,7 a 5,5
          millones de toneladas de CO2 equivalente. Ese aumento no surge de una sola tecnología,
          sino de la suma de materiales que no se extraen, residuos que no se entierran, procesos
          que se optimizan y cadenas que reducen pérdidas.
        </P>
        <P>
          Además, la relación entre reciclaje y emisiones evitadas permite entender la circularidad
          como una política de clima aplicada desde la gestión material. Cuando la tasa de
          aprovechamiento sube, el beneficio no se limita a la limpieza urbana. También se reduce
          el peso climático de la producción y disposición de materiales. Esta conexión acerca la
          agenda ambiental a decisiones concretas de municipios, empresas, hogares y prestadores de
          servicios.
        </P>
        <P>
          Así mismo, los cuadrantes de transición muestran una trayectoria progresiva. En 2023, el
          país aparece cerca del rezago circular. En 2030 cruza la frontera de aprovechamiento
          medio; en 2035 entra en una zona de mayor contribución, y en 2040 se aproxima al
          cuadrante de alto impacto circular. El movimiento proyectado sugiere que la gestión de
          residuos puede convertirse en un instrumento climático si la tasa de aprovechamiento
          crece con trazabilidad, calidad del material recuperado y encadenamientos productivos.
        </P>
        <Figura
          numero="5"
          titulo="Reciclaje y contribución climática"
          imagen={figura05}
          alt="Cuadrantes de transición que relacionan la tasa de reciclaje y aprovechamiento con las emisiones evitadas, con desplazamiento hacia el cuadrante de alto impacto circular"
          nota="La figura organiza la transición circular mediante cuadrantes que relacionan tasa de reciclaje y aprovechamiento con emisiones evitadas. El desplazamiento hacia el cuadrante de alto impacto circular muestra la conexión entre valorización de residuos y mitigación climática. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />

        <H3>Cuando las variables empujan en la misma dirección</H3>
        <Cita>
          “Una transición no se reconoce por una variable aislada, sino por la forma en que muchas
          variables empiezan a empujar en la misma dirección.”
        </Cita>
        <P>
          El análisis mixto permite pasar de la descripción de indicadores a la identificación de
          un patrón estructural. La pregunta ya no es solamente cuánto sube el reciclaje o cuánto
          baja la huella material, sino qué variables avanzan juntas y cuáles expresan tensión. El
          biplot de componentes principales muestra que el primer componente concentra alrededor
          del 94% de la variabilidad de las trayectorias.
        </P>
        <P>
          En esa dirección, buena parte de la transformación circular puede verse como un eje
          dominante: de un lado, presión material, huella e intensidad de carbono; del otro,
          productividad, reciclaje, aprovechamiento orgánico, empleos verdes, empresas circulares y
          gasto sostenible. El país se mueve desde una zona asociada a intensidad material, huella
          e intensidad de carbono, hacia una zona asociada con productividad material, reciclaje,
          aprovechamiento orgánico, empresas circulares y gasto sostenible.
        </P>
        <P>
          Por tanto, el biplot ayuda a ubicar el corazón estadístico del cambio. La economía
          circular no aparece como una suma de programas dispersos, sino como un sistema de
          variables que, si se articulan, pueden empujar un nuevo metabolismo económico. La clave
          estará en sostener la dirección del desplazamiento sin reducir la transición a una sola
          dimensión ambiental.
        </P>
        <Figura
          numero="6"
          titulo="Biplot PCA de transformación circular"
          imagen={figura06}
          alt="Biplot de componentes principales que sintetiza la dirección conjunta de los indicadores de economía circular; el primer componente concentra cerca del 94 % de la variabilidad"
          nota="La figura sintetiza, mediante componentes principales, la dirección conjunta de los indicadores de economía circular. El primer componente concentra aproximadamente el 94% de la variabilidad y separa las variables de presión material de las variables de circularidad y productividad. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />
        <P>
          Además, la matriz de correlaciones confirma ese movimiento. Productividad material,
          reciclaje, aprovechamiento orgánico, empleos verdes, empresas circulares y gasto
          sostenible presentan asociaciones positivas altas. En sentido contrario, huella material,
          intensidad material e intensidad de carbono se relacionan negativamente con las variables
          de circularidad. La señal es consistente: cuando la economía mejora su capacidad
          circular, las presiones materiales y climáticas tienden a ceder.
        </P>
        <P>
          No obstante, una correlación exploratoria no debe confundirse con causalidad cerrada. Su
          valor está en mostrar patrones de trayectoria. El vínculo entre reciclaje y
          aprovechamiento orgánico indica que la valorización de materiales secos y la recuperación
          de orgánicos deberían avanzar como una agenda integrada. Del mismo modo, la asociación
          entre empleos verdes y empresas circulares sugiere que la transformación empresarial
          puede convertirse en un frente laboral si se traduce en ocupaciones formales, técnicas y
          de mayor productividad.
        </P>
        <Figura
          numero="7"
          titulo="Relaciones entre variables estructurales de la economía circular"
          imagen={figura07}
          alt="Matriz de correlaciones exploratorias de Pearson entre las trayectorias proyectadas de las variables de economía circular, con asociaciones positivas y negativas"
          nota="La matriz muestra correlaciones exploratorias de Pearson entre trayectorias proyectadas. Las asociaciones positivas indican variables que avanzan en la misma dirección; las negativas muestran tensiones entre presión material, intensidad de carbono y variables de circularidad. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />

        <H3>Colombia, Antioquia y las referencias internacionales</H3>
        <P>
          La transición circular no ocurre en el vacío. Colombia se mueve frente a referentes
          internacionales y, dentro del país, Antioquia aparece como un territorio con potencial de
          convergencia. La comparación distributiva permite observar diferencias entre la línea
          base de 2023 y las proyecciones a 2040 en cuatro variables: productividad material,
          reciclaje y aprovechamiento, empresas con estrategias circulares y gasto sostenible de
          los hogares.
        </P>
        <P>
          En productividad material, Colombia pasaría de 1.450 a 2.500 USD por tonelada, mientras
          Antioquia avanzaría de 1.310 a 2.300 USD por tonelada. Ambas trayectorias mejoran, pero
          todavía quedan por debajo de la referencia OCDE, que se desplaza de 2.950 a 4.200 USD por
          tonelada. En reciclaje y aprovechamiento, Colombia subiría de 17% a 40%, y Antioquia de
          21% a 46%, una diferencia regional que puede leerse desde la mayor densidad
          institucional, empresarial y metropolitana del Valle de Aburrá.
        </P>
        <P>
          Asimismo, en circularidad empresarial el salto es visible. Colombia pasaría de 19% a 55%
          de empresas con estrategias circulares, mientras Antioquia avanzaría de 22% a 60%. Un
          territorio donde las empresas adoptan modelos circulares más rápido puede construir
          ventajas en encadenamientos industriales, servicios ambientales, gestión de residuos,
          innovación y empleo verde. En gasto sostenible de los hogares, en cambio, el aumento
          sigue siendo más moderado: allí aparece una advertencia social, porque la circularidad
          del consumo suele avanzar más lentamente que la circularidad empresarial.
        </P>
        <Figura
          numero="8"
          titulo="Comparación distributiva de variables circulares"
          imagen={figura08}
          alt="Diagramas de violín que comparan valores observados en 2023 y proyectados a 2040 para Colombia, Antioquia y referencias internacionales en cuatro variables circulares"
          nota="La figura compara valores observados en 2023 y proyectados a 2040 para Colombia, Antioquia y referencias internacionales. Las formas de violín permiten observar concentración, dispersión y desplazamiento esperado de los indicadores. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />

        <H3>La norma también recicla: convierte principios en decisiones</H3>
        <Cita>“La basura no empieza en el canasto; empieza cuando el diseño no pensó en el retorno.”</Cita>
        <P>
          El tránsito descrito por los indicadores necesita una raíz normativa. La economía
          circular colombiana no nace de una sola política, sino de una acumulación de capas
          regulatorias. Primero apareció la gestión sanitaria de residuos; luego la planeación
          ambiental; más tarde la gestión integral de residuos sólidos; después la inclusión de
          recicladores, la política nacional de economía circular, la reducción de plásticos de un
          solo uso y los instrumentos territoriales de aprovechamiento.
        </P>
        <P>
          En ese marco, el normograma muestra que la economía circular se organiza alrededor de dos
          capas que no pueden separarse. La primera corresponde a variables priorizadas: tasa de
          reciclaje y aprovechamiento, productividad material, responsabilidad extendida del
          productor, residuos, trazabilidad y gobernanza territorial. La segunda corresponde a los
          niveles regulatorios que les dan dirección: global, nacional y departamental.
        </P>
        <P>
          Así, el cruce entre variables y niveles abre la pregunta prospectiva central: qué tan
          preparada está Colombia para convertir la convergencia normativa en cambios medibles del
          metabolismo económico. Sin esa arquitectura, la transición circular queda expuesta a una
          acumulación de reglas, planes y metas sin suficiente fuerza operativa.
        </P>
        <Figura
          numero="9"
          titulo="Estructura del normograma prospectivo de economía circular"
          imagen={figura09}
          alt="Organización de los componentes del normograma prospectivo alrededor de variables priorizadas y tres niveles de observación: global, nacional y departamental"
          nota="La figura organiza los componentes del normograma prospectivo alrededor de variables priorizadas y tres niveles de observación: global, nacional y departamental. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />
        <P>
          De esta forma, la estructura deja una señal importante: la economía circular ya no puede
          evaluarse solo por programas ambientales aislados. Debe analizarse como un campo de
          política pública donde la productividad material, el reciclaje y la gestión de residuos
          dialogan con el comercio, la industria, el consumo, el aseo, la planeación urbana y la
          gestión territorial. En esa convergencia aparece una forma distinta de gobernar: menos
          concentrada en el residuo final y más atenta al ciclo completo de los materiales.
        </P>
        <P>
          Ahora bien, la convergencia regulatoria no ocurre de manera lineal ni automática. Una
          directriz global puede tardar años en convertirse en política nacional, y una política
          nacional puede tardar todavía más en aterrizar en capacidades municipales,
          infraestructura, rutas de aprovechamiento, educación ciudadana y reportes comparables.
          Por eso, el mapa de influencia normativa ayuda a observar que las reglas no bajan como
          una orden perfecta, sino como una cadena de traducciones institucionales.
        </P>
        <P>
          En el nivel global, instrumentos como la Agenda 21, el Convenio de Basilea, las
          directivas europeas sobre residuos y los paquetes de economía circular ayudan a fijar el
          lenguaje de la transición. En el nivel nacional, la Ley 99 de 1993, el CONPES 3874 de
          2016, la Política Nacional de Economía Circular y los reportes de la SSPD-SUI empiezan a
          convertir ese lenguaje en institucionalidad colombiana. En el nivel departamental, la
          creación del AMVA, los PGAR, los PGIRS regionales y el Plan de Desarrollo de Antioquia
          aparecen como escenarios de implementación.
        </P>
        <Figura
          numero="10"
          titulo="Mapa de influencia normativa entre niveles de gobierno"
          imagen={figura10}
          alt="Mapa de relaciones de antecedente y alineación entre instrumentos normativos globales, nacionales y departamentales, con flechas que indican conexiones documentadas"
          nota="La figura sintetiza relaciones de antecedente y alineación entre instrumentos globales, nacionales y departamentales. Las flechas indican conexiones documentadas y no equivalen a jerarquía jurídica directa en todos los casos. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />

        <H3>Los hitos no son pasados: son capas de futuro</H3>
        <P>
          La línea de tiempo normativa muestra una transición lenta, pero acumulativa. En 1992, la
          Agenda 21 instaló la eficiencia material dentro de la conversación internacional sobre
          desarrollo sostenible. En 1993, Colombia creó el Sistema Nacional Ambiental mediante la
          Ley 99. En 2008 y 2018, la Unión Europea actualizó su marco sobre residuos y jerarquía de
          gestión. En 2016, Colombia adoptó el CONPES 3874 como política nacional para la gestión
          integral de residuos sólidos. En 2019, la política nacional de economía circular
          incorporó un lenguaje más amplio sobre productividad, cierre de ciclos y nuevos modelos
          de producción y consumo.
        </P>
        <P>
          A partir de allí, la secuencia revela una tensión típica de la prospectiva normativa: las
          leyes suelen llegar después de la presión social, tecnológica y ambiental. Sin embargo,
          una vez instaladas, pueden acelerar cambios que antes dependían de decisiones
          voluntarias. La economía circular entra justamente en ese punto: ya no basta con promover
          buenas prácticas; será necesario definir responsabilidades, medir resultados, corregir
          rezagos y crear incentivos para que el residuo deje de ser un costo escondido.
        </P>
        <P>
          En consecuencia, los hitos principales de la economía circular deben verse como capas
          sucesivas de gobernanza ambiental: primero principios, luego institucionalidad, después
          metas, y finalmente instrumentos de seguimiento y responsabilidad. Esa acumulación
          explica por qué la transición circular no se decreta de un día para otro; se forma por
          sedimentación normativa, presión territorial y capacidad de medición.
        </P>
        <Figura
          numero="11"
          titulo="Hitos normativos clave — economía circular, 1991-2026"
          imagen={figura11}
          alt="Línea de tiempo de hitos normativos seleccionados de economía circular entre 1991 y 2026 en los niveles global, nacional y departamental"
          nota="La figura ubica hitos seleccionados en los niveles global, nacional y departamental. La secuencia prioriza instrumentos con función estructurante para residuos, productividad material, economía circular y gestión territorial. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />
        <Cita>“Lo que no se mide, no se gobierna; y lo que no se gobierna, termina gobernando el territorio.”</Cita>

        <H3>Metas con distancia: el problema no es solo llegar, sino llegar a tiempo</H3>
        <P>
          La brecha más visible aparece en las metas prospectivas. La referencia europea se ubica
          en un nivel de mayor ambición: 60% de reciclaje en 2030 y 65% en 2035, mientras Colombia
          registra 30% en 2035 y 45% en 2040. La productividad material también muestra distancia:
          el referente global plantea 4.200 USD por tonelada en 2040, frente a 2.500 USD por
          tonelada en el escenario nacional. Esta diferencia no debe leerse como simple rezago
          estadístico; debe entenderse como una brecha de transformación productiva.
        </P>
        <P>
          En esa línea, Colombia podría avanzar, pero lo haría desde una base menos exigente y con
          un horizonte más largo. Esa diferencia abre una pregunta de política pública: si la
          economía global empieza a exigir productos con menor huella material, trazabilidad y
          mayor reciclabilidad, qué ocurrirá con los territorios y sectores que todavía midan la
          circularidad como una actividad marginal. La competitividad futura no dependerá solo del
          precio o de la producción; dependerá también de la capacidad de demostrar eficiencia
          material.
        </P>
        <P>
          Por esta razón, la comparación de metas permite observar la distancia entre referencia
          global y trayectoria nacional, así como la ausencia de una meta numérica propia para
          Antioquia dentro de la información revisada. Esa ausencia no elimina la acción
          territorial, pero sí obliga a diferenciar entre alineación cualitativa y compromiso
          cuantificado.
        </P>
        <Figura
          numero="12"
          titulo="Metas prospectivas documentadas, 2030-2040"
          imagen={figura12}
          alt="Resumen de metas de reciclaje y productividad material en el horizonte 2030-2040; Antioquia aparece como nivel de alineación territorial sin meta numérica propia"
          nota="La figura resume metas de reciclaje y productividad material en el horizonte 2030-2040. Antioquia se presenta como nivel de alineación territorial sin meta numérica propia en la información analizada. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />
        <P>
          La economía circular necesita ambición, pero también necesita traducción. La brecha
          regulatoria entre Unión Europea, Colombia y Antioquia muestra precisamente esa
          diferencia. El referente global se mueve con metas crecientes y valores cuantificados.
          Colombia presenta metas nacionales que avanzan, aunque con menor intensidad. Antioquia
          aparece con compromiso de alineación, instrumentos regionales y gestión territorial, pero
          sin una meta propia expresada en porcentaje o valor de productividad.
        </P>
        <P>
          Por su parte, esta condición no debe interpretarse como ausencia de política ambiental
          departamental. Su sentido es más preciso: el territorio dispone de instrumentos,
          autoridades y marcos de acción, pero el lenguaje de seguimiento podría requerir mayor
          densidad cuantitativa. La transición circular del departamento necesitará pasar de la
          alineación al indicador, del indicador al tablero, y del tablero a la decisión.
        </P>
        <P>
          De ahí que la brecha de ambición funcione como advertencia institucional. Una referencia
          internacional con metas crecientes, una trayectoria nacional con metas estables o
          progresivas y un nivel departamental más asociado a instrumentos que a cifras propias no
          tienen el mismo peso prospectivo. La diferencia marcará qué tan exigible, verificable y
          comparable será la transición.
        </P>
        <Figura
          numero="13"
          titulo="Brecha de ambición regulatoria: global, nacional y departamental"
          imagen={figura13}
          alt="Comparación de la ambición regulatoria entre la referencia europea, Colombia y Antioquia, con flechas que indican crecimiento cuantitativo, estabilidad o alineación cualitativa"
          nota="La figura compara la ambición regulatoria entre la referencia europea, Colombia y Antioquia. Las flechas indican crecimiento cuantitativo, estabilidad o alineación cualitativa, y ausencia de meta numérica propia. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />

        <H3>La circularidad como sistema de responsabilidades</H3>
        <P>
          La matriz de convergencia regulatoria muestra que la economía circular no puede seguir
          entendida como una sola política de reciclaje. Aparecen seis frentes conectados:
          reciclaje, productividad material, responsabilidad extendida del productor y plásticos,
          PGIRS y residuos, datos y trazabilidad, y gobernanza territorial. Cada frente tiene un
          referente global, una respuesta nacional y una expresión departamental.
        </P>
        <P>
          En ese contexto, el punto más sensible está en la diferencia entre convergencia formal y
          convergencia efectiva. La primera ocurre cuando las normas hablan el mismo idioma. La
          segunda ocurre cuando los datos, los presupuestos, las empresas, los municipios y los
          ciudadanos empiezan a comportarse de acuerdo con ese idioma. En economía circular, esa
          distancia puede ser amplia: una meta nacional de aprovechamiento no garantiza rutas
          eficientes de separación en la fuente; una política de plásticos no garantiza ecodiseño;
          un PGIRS actualizado no garantiza trazabilidad ni cultura ciudadana.
        </P>
        <P>
          Así, la matriz permite identificar dónde hay metas explícitas, dónde existen instrumentos
          de alineación y dónde persisten vacíos que deberán observarse con mayor detalle. La
          circularidad exige medir resultados, pero también condiciones habilitantes: calidad de
          datos, reporte de gestores, actualización municipal, responsabilidad empresarial y
          apropiación ciudadana.
        </P>
        <Figura
          numero="14"
          titulo="Matriz de convergencia regulatoria, 2030-2040"
          imagen={figura14}
          alt="Matriz que organiza la relación entre la referencia global, Colombia y Antioquia para seis frentes de economía circular: reciclaje, productividad material, REP y plásticos, PGIRS y residuos, datos y trazabilidad, y gobernanza territorial"
          nota="La figura organiza la relación entre referencia global, Colombia y Antioquia para seis frentes de economía circular. Su función es ordenar metas, instrumentos e implementación territorial. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />
        <P>
          La prospectiva cualitativa permite ordenar aquello que todavía no puede convertirse
          completamente en serie estadística. En economía circular, muchos cambios empiezan como
          normas, planes, capacidades institucionales y decisiones empresariales antes de aparecer
          como datos consolidados. Por eso, el pronóstico cualitativo 2026-2040 no afirma que todo
          ocurrirá con exactitud calendaria; identifica los ejes donde la presión de cambio será
          más probable y más relevante.
        </P>
        <P>
          En esa dirección, los seis ejes de la proyección son consistentes con la estructura
          regulatoria: aprovechamiento y reciclaje, responsabilidad extendida del productor y
          ecodiseño, productividad material, gobernanza multinivel, trazabilidad y datos, e
          inclusión territorial. Leídos en conjunto, estos frentes muestran que la economía
          circular será menos una campaña ambiental y más una transformación institucional.
        </P>
        <P>
          Por consiguiente, separar residuos en la fuente seguirá siendo necesario, pero
          insuficiente si no se articula con diseño de productos, datos, compras sostenibles,
          infraestructura de aprovechamiento y mercados para materiales recuperados. El centro del
          pronóstico no es una cifra aislada, sino una arquitectura de cambio: varias fuerzas
          conectadas alrededor de un mismo horizonte de transformación.
        </P>
        <Figura
          numero="15"
          titulo="Pronóstico cualitativo 2026-2040 — economía circular"
          imagen={figura15}
          alt="Organización de los seis frentes prospectivos de economía circular para el periodo 2026-2040, apoyada en la relación entre regulación, desempeño e implementación territorial"
          nota="La figura organiza seis frentes prospectivos de economía circular para el periodo 2026-2040. Su sentido es cualitativo y se apoya en la relación entre regulación, desempeño e implementación territorial. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />
        <Cita>
          “El futuro circular no se anuncia por decreto: se construye cuando la norma, el dato y el
          territorio empiezan a moverse en la misma dirección.”
        </Cita>
        <P>
          La hoja de ruta 2026-2040 permite observar la transición como una secuencia de
          maduración. En 2026, el país se ubica en una etapa de consolidación regulatoria y
          reportes; Antioquia aparece en alineación cualitativa con la meta nacional. Hacia 2030,
          la referencia global marca una meta de reciclaje de 60%, mientras el territorio empieza a
          operar instrumentos regionales como PGAR y PGIRS. En 2035, Colombia alcanza una meta
          intermedia de reciclaje, y Antioquia avanza hacia instrumentos territoriales articulados
          con el periodo de planeación. Para 2040, la referencia nacional ya combina reciclaje y
          productividad material como señales de resultado.
        </P>
        <P>
          Sin embargo, la secuencia muestra que el mayor riesgo no está en formular nuevas metas,
          sino en perder continuidad entre ellas. Una política ambiental puede cambiar de nombre,
          una administración puede modificar prioridades y un instrumento territorial puede quedar
          desactualizado. Por eso, la prospectiva cumple una función de memoria activa: conserva la
          línea de tiempo, observa compromisos, compara avances y advierte cuando el discurso
          avanza más rápido que la capacidad institucional.
        </P>
        <P>
          En consecuencia, la ruta de implementación articula tres escalas simultáneas: liderazgo
          global, regulación nacional y gestión territorial antioqueña. En esa simultaneidad se
          define el futuro circular: no por la fuerza de un solo nivel, sino por la coordinación
          entre todos.
        </P>
        <Figura
          numero="16"
          titulo="Hoja de ruta prospectiva 2026-2040 de economía circular"
          imagen={figura16}
          alt="Secuencia prospectiva de metas e instrumentos de economía circular 2026-2040 en tres niveles: global, Colombia y Antioquia"
          nota="La figura presenta una secuencia prospectiva de metas e instrumentos en tres niveles: global, Colombia y Antioquia. La nota interna señala que Antioquia no reporta una meta numérica propia y que su proyección se expresa como alineación territorial. Fuente: elaboración propia con datos del Observatorio de Prospectiva."
        />

        <H3>Lo que cambia para hogares, empresas y bienestar territorial</H3>
        <P>
          La economía circular suele presentarse como una agenda de residuos, pero sus efectos
          atraviesan la vida cotidiana. Para los hogares, implica cambios en separación en la
          fuente, consumo de bienes sostenibles, compra de productos durables, reparación,
          reutilización, acceso a información ambiental y participación en sistemas de devolución.
          El gasto en bienes sostenibles, aunque crecería de 2,7% a 8,0% del gasto de los hogares
          en Colombia, seguirá siendo una variable sensible al ingreso.
        </P>
        <P>
          De igual modo, para las empresas la circularidad implica rediseñar procesos, reducir
          desperdicio, reemplazar insumos, aprovechar subproductos, certificar prácticas, medir
          huella, participar en cadenas de reciclaje y construir nuevas formas de valor. La
          proyección de empresas con estrategias circulares, al pasar de 19% a 55%, muestra una
          transformación relevante; sin embargo, el cambio de fondo será más exigente que adoptar
          un lenguaje ambiental. La pregunta decisiva será cuántas de esas empresas logran
          modificar costos, productos, proveedores y modelos de negocio.
        </P>
        <P>
          Por otra parte, para el territorio el reto se concentra en infraestructura, logística y
          coordinación. Reducir residuos per cápita de 285 a 230 kg por habitante al año exige más
          que campañas de separación. Requiere rutas selectivas, estaciones de clasificación,
          plantas de aprovechamiento orgánico, formalización de recicladores, información pública,
          tarifas coherentes, demanda industrial por material recuperado y reglas de calidad. Allí
          se define si la economía circular entra en la operación diaria de las ciudades.
        </P>
        <P>
          Asimismo, para el empleo la señal de 180 mil a 400 mil empleos verdes sugiere un campo de
          transición laboral. No todos estos empleos serán nuevos en sentido absoluto; algunos
          serán reconversiones de ocupaciones existentes, otros surgirán en reciclaje, logística
          inversa, reparación, mantenimiento, eficiencia energética, análisis de datos ambientales,
          certificación, educación, compostaje, ecodiseño y servicios empresariales. La diferencia
          estará en la calidad: empleo verde no debería significar trabajo precario con lenguaje
          ambiental, sino ocupaciones protegidas, productivas y técnicamente reconocidas.
        </P>
        <P>
          Finalmente, la circularidad también puede modificar la forma como se entiende el
          bienestar. Menos residuos cerca de los hogares reducen riesgos sanitarios; mejor
          aprovechamiento orgánico puede disminuir presión sobre rellenos y emisiones; mayor
          productividad material puede fortalecer competitividad; más consumo responsable puede
          cambiar hábitos de compra; y más empresas circulares pueden abrir nuevas rutas laborales.
          Por tanto, la economía circular no opera al margen de la política social: redefine parte
          de las condiciones ambientales, laborales y territoriales sobre las cuales se sostiene la
          calidad de vida.
        </P>

        <H3>Señales de seguimiento para el Observatorio</H3>
        <Cita>
          “Lo circular no será lo que se promete en una política, sino lo que logra permanecer
          dentro del ciclo económico sin volver como contaminación.”
        </Cita>
        <P>
          El seguimiento prospectivo deberá concentrarse en señales medibles. La primera será la
          distancia entre adopción empresarial y aprovechamiento real. Si las empresas con
          estrategias circulares crecen más rápido que la recuperación material, el país podría
          tener circularidad declarada, pero no necesariamente circularidad operativa. La segunda
          será la relación entre residuos por habitante e intensidad de carbono. Si ambas variables
          bajan juntas, la gestión material estará aportando a la agenda climática.
        </P>
        <P>
          Además, la tercera señal será la brecha entre Colombia, Antioquia y las referencias
          internacionales. Antioquia presenta mejores niveles proyectados en reciclaje,
          circularidad empresarial y gasto sostenible, pero su reto estará en transformar esa
          ventaja relativa en una estructura regional más integrada. La cuarta señal será el empleo
          verde: su crecimiento solo tendrá valor social si se conecta con formación,
          formalización, seguridad laboral, tecnologías de valorización y nuevos servicios
          ambientales.
        </P>
        <P>
          También será necesario observar el consumo de los hogares. La economía circular no se
          consolida únicamente desde las empresas o desde el Estado. Requiere hogares capaces de
          comprar, separar, reparar, reutilizar y decidir con información. Si el gasto sostenible
          crece lentamente, la transición podría depender demasiado del lado productivo y dejar
          rezagada la dimensión cultural del cambio.
        </P>
        <P>
          En adelante, la actualización periódica de esta variable deberá observar la distancia
          entre las metas y la operación cotidiana: productividad por tonelada, intensidad
          material, recuperación de residuos, empresas circulares, empleo verde, intensidad de
          carbono, consumo sostenible y huella material. Allí se reconocerá si la transición
          circular se queda en un avance estadístico o si empieza a reorganizar sistemas cotidianos
          de producción, consumo, cuidado territorial y bienestar ambiental.
        </P>
        <P>
          Hacia 2040, el país podría tener más metas, más reportes y más empresas hablando de
          circularidad. La pregunta prospectiva será más exigente: si esa nueva arquitectura logra
          reducir la presión material, mejorar el aprovechamiento, elevar la productividad, incluir
          a los actores del territorio y convertir el residuo en una señal temprana de rediseño
          productivo, no solo en un problema que se recoge al final del camino.
        </P>

        <h2 className="modulo-economia-circular__seccion-referencias">Referencias</h2>
        <ul className="modulo-economia-circular__referencias">
          <Ref>
            ANDI. (2026). Estrategia de economía circular. Obtenido de{' '}
            <Enlace url="https://www.andi.com.co" />
          </Ref>
          <Ref>
            Área Metropolitana del Valle de Aburrá. (2026). Plan de Gestión Ambiental Regional.
            Obtenido de{' '}
            <Enlace url="https://www.metropol.gov.co/ambiental/Paginas/Plan-de-Gestion-Ambiental-Regional.aspx" />
          </Ref>
          <Ref>
            CECODES. (2026). Consejo Empresarial Colombiano para el Desarrollo Sostenible. Obtenido
            de <Enlace url="https://www.cecodes.org.co" />
          </Ref>
          <Ref>
            Circle Economy Foundation. (2026). Circularity Gap Report. Obtenido de{' '}
            <Enlace url="https://www.circularity-gap.world" />
          </Ref>
          <Ref>
            Departamento Administrativo Nacional de Estadística. (2026). Encuesta Nacional de
            Presupuestos de los Hogares. Obtenido de{' '}
            <Enlace url="https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/encuesta-nacional-de-presupuestos-de-los-hogares-enph" />
          </Ref>
          <Ref>
            Departamento Administrativo Nacional de Estadística. (2026). Mercado laboral. Obtenido
            de <Enlace url="https://www.dane.gov.co/index.php/estadisticas-por-tema/mercado-laboral" />
          </Ref>
          <Ref>
            Departamento Nacional de Planeación. (2016). Documento CONPES 3874: Política nacional
            para la gestión integral de residuos sólidos. Obtenido de{' '}
            <Enlace url="https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/3874.pdf" />
          </Ref>
          <Ref>
            European Commission. (2015). Closing the loop: An EU action plan for the circular
            economy. Obtenido de{' '}
            <Enlace url="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:52015DC0614" />
          </Ref>
          <Ref>
            European Commission. (2020). A new Circular Economy Action Plan. Obtenido de{' '}
            <Enlace url="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:52020DC0098" />
          </Ref>
          <Ref>
            European Parliament and Council of the European Union. (2008). Directive 2008/98/EC on
            waste and repealing certain directives. Obtenido de{' '}
            <Enlace url="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32008L0098" />
          </Ref>
          <Ref>
            European Parliament and Council of the European Union. (2018). Directive (EU) 2018/851
            amending Directive 2008/98/EC on waste. Obtenido de{' '}
            <Enlace url="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32018L0851" />
          </Ref>
          <Ref>
            Eurostat. (2026). Circular economy monitoring framework. Obtenido de{' '}
            <Enlace url="https://ec.europa.eu/eurostat/web/circular-economy/monitoring-framework" />
          </Ref>
          <Ref>
            International Energy Agency. (2026). Data and statistics. Obtenido de{' '}
            <Enlace url="https://www.iea.org/data-and-statistics" />
          </Ref>
          <Ref>
            International Labour Organization. (2026). Environment and decent work. Obtenido de{' '}
            <Enlace url="https://www.ilo.org/es/temas/medio-ambiente-y-trabajo-decente" />
          </Ref>
          <Ref>
            Ley 2232. (2022). Ley 2232 de 2022: Por la cual se establecen medidas tendientes a la
            reducción gradual de la producción y consumo de ciertos productos plásticos de un solo
            uso. Obtenido de{' '}
            <Enlace url="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=199869" />
          </Ref>
          <Ref>
            Ley 2294. (2023). Ley 2294 de 2023: Plan Nacional de Desarrollo 2022-2026. Obtenido de{' '}
            <Enlace url="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=130303" />
          </Ref>
          <Ref>
            Ley 9. (1979). Ley 9 de 1979: Código Sanitario Nacional. Obtenido de{' '}
            <Enlace url="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=1177" />
          </Ref>
          <Ref>
            Ley 99. (1993). Ley 99 de 1993: Por la cual se crea el Ministerio del Medio Ambiente y
            se organiza el Sistema Nacional Ambiental. Obtenido de{' '}
            <Enlace url="http://www.secretariasenado.gov.co/senado/basedoc/ley_0099_1993.html" />
          </Ref>
          <Ref>
            Ministerio de Ambiente y Desarrollo Sostenible. (2019). Política Nacional de Economía
            Circular. Obtenido de{' '}
            <Enlace url="https://www.minambiente.gov.co/wp-content/uploads/2021/08/Politica-Nacional-Economia-Circular.pdf" />
          </Ref>
          <Ref>
            Observatorio Prospectivo del Bienestar Integral. (2026).
            Normograma_Economia_Circular_Global-Nacional-Departamental [Base de trabajo interna].
          </Ref>
          <Ref>
            Observatorio Prospectivo del Bienestar Integral. (2026).
            Observatorio_Economia_Circular_2035-2040 [Base de trabajo interna].
          </Ref>
          <Ref>
            Organisation for Economic Co-operation and Development. (2011). OECD Green Growth
            Strategy. Obtenido de <Enlace url="https://www.oecd.org/greengrowth/" />
          </Ref>
          <Ref>
            Organisation for Economic Co-operation and Development. (2026). Circular Economy
            Dashboard. Obtenido de{' '}
            <Enlace url="https://www.oecd.org/en/data/dashboards/circular-economy-dashboard.html" />
          </Ref>
          <Ref>
            Organisation for Economic Co-operation and Development. (2026). Green Growth
            Indicators. Obtenido de{' '}
            <Enlace url="https://www.oecd.org/en/data/datasets/green-growth-indicators.html" />
          </Ref>
          <Ref>
            Superintendencia de Servicios Públicos Domiciliarios. (2026). Información sectorial y
            reportes del servicio público de aseo. Obtenido de{' '}
            <Enlace url="https://www.superservicios.gov.co" />
          </Ref>
          <Ref>
            Superintendencia de Servicios Públicos Domiciliarios. (2026). Sistema Único de
            Información. Obtenido de <Enlace url="https://www.sui.gov.co" />
          </Ref>
          <Ref>
            United Nations Environment Programme, International Resource Panel. (2026). Global
            Material Flows Database. Obtenido de{' '}
            <Enlace url="https://www.resourcepanel.org/global-material-flows-database" />
          </Ref>
          <Ref>
            World Bank. (2018). What a Waste 2.0: A global snapshot of solid waste management to
            2050. Obtenido de <Enlace url="https://datatopics.worldbank.org/what-a-waste/" />
          </Ref>
          <Ref>
            World Business Council for Sustainable Development. (2026). Circular economy. Obtenido
            de <Enlace url="https://www.wbcsd.org" />
          </Ref>
          <Ref>
            World Resources Institute. (2026). Climate Watch. Obtenido de{' '}
            <Enlace url="https://www.climatewatchdata.org" />
          </Ref>
        </ul>
        </article>
      </div>
    </section>
  );
}

export default ModuloEconomiaCircular;
