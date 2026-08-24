/**
 * ModuloHiperPersonalizacion — Tendencia "Hiper-personalización de servicios".
 *
 * Artículo "El bienestar dejará de ser igual para todos. Prospectivas de
 * la hiperpersonalización de servicios y el agenciamiento en Antioquia,
 * 2026–2040" con el contenido FIJO en el código, igual que los demás
 * artículos de tendencias (decisión del cliente): sin lecturas de
 * .docx/.json en runtime. Texto transcrito literal del Word del cliente,
 * incluidas sus OCHO citas destacadas centradas; las 18 figuras van como
 * WebP optimizados (~86 % más livianos que los PNG del documento,
 * nitidez verificada) con carga perezosa y caché inmutable. Elemento
 * propio: DOS tablas de datos con desplazamiento horizontal contenido.
 *
 * Ajustes mínimos documentados (avisados al cliente en el CHANGELOG):
 * el Word trae el encabezado "Referencias" DUPLICADO (se compone una
 * sola vez), un párrafo casi duplicado sobre los siete países
 * latinoamericanos (se transcriben ambos, tal cual), una referencia
 * huérfana que solo dice "Obtenido de <url>" (se transcribe tal cual) y
 * la nota de la Figura 16 sin el prefijo "Nota." (el componente lo
 * uniforma).
 *
 * Cambios del artículo = editar este código y recompilar (no aplica el
 * contrato de reemplazo de archivos de las tendencias con datos vivos).
 */
import { useRef } from 'react';
import TablaContenido from '../../components/TablaContenido/TablaContenido.jsx';
import './modulo-hiper-personalizacion.css';

import figura01 from '../../assets/hiper-personalizacion/figura-01.webp';
import figura02 from '../../assets/hiper-personalizacion/figura-02.webp';
import figura03 from '../../assets/hiper-personalizacion/figura-03.webp';
import figura04 from '../../assets/hiper-personalizacion/figura-04.webp';
import figura05 from '../../assets/hiper-personalizacion/figura-05.webp';
import figura06 from '../../assets/hiper-personalizacion/figura-06.webp';
import figura07 from '../../assets/hiper-personalizacion/figura-07.webp';
import figura08 from '../../assets/hiper-personalizacion/figura-08.webp';
import figura09 from '../../assets/hiper-personalizacion/figura-09.webp';
import figura10 from '../../assets/hiper-personalizacion/figura-10.webp';
import figura11 from '../../assets/hiper-personalizacion/figura-11.webp';
import figura12 from '../../assets/hiper-personalizacion/figura-12.webp';
import figura13 from '../../assets/hiper-personalizacion/figura-13.webp';
import figura14 from '../../assets/hiper-personalizacion/figura-14.webp';
import figura15 from '../../assets/hiper-personalizacion/figura-15.webp';
import figura16 from '../../assets/hiper-personalizacion/figura-16.webp';
import figura17 from '../../assets/hiper-personalizacion/figura-17.webp';
import figura18 from '../../assets/hiper-personalizacion/figura-18.webp';

/* Rótulo al estilo del documento: "Figura N." en negrita, título plano. */
function Figura({ numero, titulo, imagen, alt, nota }) {
  return (
    <figure className="modulo-hiper-personalizacion__figura">
      <figcaption className="modulo-hiper-personalizacion__figura-rotulo">
        <strong>Figura {numero}.</strong> {titulo}
      </figcaption>
      <img
        className="modulo-hiper-personalizacion__figura-imagen"
        src={imagen}
        alt={alt}
        loading="lazy"
      />
      <p className="modulo-hiper-personalizacion__figura-nota">
        <strong>Nota.</strong> {nota}
      </p>
    </figure>
  );
}

const P = ({ children }) => <p className="modulo-hiper-personalizacion__parrafo">{children}</p>;
const H3 = ({ children }) => <h3 className="modulo-hiper-personalizacion__apartado">{children}</h3>;
const Cita = ({ children }) => (
  <blockquote className="modulo-hiper-personalizacion__cita-destacada">{children}</blockquote>
);
const Ref = ({ children }) => (
  <li className="modulo-hiper-personalizacion__referencia">{children}</li>
);
const Enlace = ({ url }) => (
  <a href={url} target="_blank" rel="noreferrer">
    {url}
  </a>
);

function ModuloHiperPersonalizacion({ tendencia }) {
  /* El índice lee los apartados del artículo renderizado por esta ref. */
  const articuloRef = useRef(null);

  return (
    <section
      className="modulo-hiper-personalizacion"
      aria-labelledby="titulo-hiper-personalizacion"
    >
      <header className="modulo-hiper-personalizacion__encabezado">
        <p className="modulo-hiper-personalizacion__contexto">Tendencias</p>
        <h1 id="titulo-hiper-personalizacion" className="modulo-hiper-personalizacion__titulo">
          {tendencia.etiqueta}
        </h1>
        <p className="modulo-hiper-personalizacion__titulo-articulo">
          EL BIENESTAR DEJARÁ DE SER IGUAL PARA TODOS
        </p>
        <p className="modulo-hiper-personalizacion__subtitulo-articulo">
          Prospectivas de la hiperpersonalización de servicios y el agenciamiento en Antioquia,
          2026–2040
        </p>
        <p className="modulo-hiper-personalizacion__entradilla">
          Datos, inteligencia artificial, autonomía y territorio en la transición desde un
          portafolio homogéneo hacia experiencias de bienestar capaces de anticipar necesidades
          sin reemplazar la decisión humana.
        </p>
      </header>

      {/* Rejilla índice + artículo (tabla de contenido del cliente) */}
      <div className="articulo-con-indice">
        <TablaContenido articuloRef={articuloRef} />
        <article ref={articuloRef} className="modulo-hiper-personalizacion__panel">
        <Cita>
          “Cuando el bienestar aprende a leer trayectorias, la oferta deja de esperar una
          solicitud y empieza a reconocer el momento oportuno.”
        </Cita>
        <P>
          En 2040, una persona podría ingresar a un ecosistema de bienestar que ya conoce parte de
          su trayectoria. La plataforma no le mostraría el mismo catálogo que recibe el resto de
          los afiliados: relacionaría su edad, composición familiar, territorio, historial de uso,
          condiciones de conectividad y señales de bienestar para ordenar opciones distintas. Una
          familia con niños pequeños podría recibir acompañamiento preventivo en nutrición y
          cuidado; un trabajador que cambia de ocupación encontraría rutas de formación ajustadas
          a su experiencia; una persona mayor obtendría recomendaciones de actividad, salud y
          participación compatibles con su autonomía. El servicio dejaría de empezar en la
          ventanilla y comenzaría mucho antes, en la capacidad institucional de interpretar
          necesidades que todavía no se han convertido en una solicitud.
        </P>
        <P>
          Ese desplazamiento define la hiperpersonalización de servicios y el agenciamiento. No se
          trata únicamente de predecir gustos ni de trasladar técnicas comerciales al bienestar.
          La transformación consiste en pasar de un modelo homogéneo —un mismo beneficio para
          poblaciones tratadas como si fueran equivalentes— a una arquitectura capaz de adaptar
          recomendaciones, canales y experiencias a las condiciones reales de cada persona. La
          inteligencia artificial, la analítica predictiva y la interoperabilidad aportan la
          capacidad de reconocer patrones; el agenciamiento establece el límite y el propósito: la
          persona debe comprender, elegir, corregir y conducir su propia trayectoria de bienestar.
        </P>
        <P>
          La lectura prospectiva combina dos capas. La primera reúne indicadores cuantitativos
          sobre protección de datos, gobernanza de inteligencia artificial, conectividad, medición
          multidimensional y cobertura de servicios. La segunda organiza 67 instrumentos globales,
          nacionales y departamentales que muestran cómo la regulación, la ética, la telesalud, la
          interoperabilidad y la política digital fueron construyendo el terreno de esta
          transición. De ese universo, 63 registros cuentan con un elemento clave asignado y 58
          poseen un año de inicio válido para el análisis temporal; esta diferencia metodológica
          permite que cada visualización utilice únicamente la información compatible con su
          propósito.
        </P>
        <P>
          La tensión que atraviesa todo el horizonte es sencilla de formular y difícil de
          resolver: cuanto más sabe una institución sobre una persona, mayor puede ser la
          pertinencia de sus servicios, pero también crece la responsabilidad sobre el
          consentimiento, la seguridad, la explicación de las decisiones y la posibilidad de
          corregir un perfil. La hiperpersonalización puede ampliar la autonomía cuando transforma
          información dispersa en opciones comprensibles; también puede reducirla cuando el
          algoritmo clasifica, recomienda o excluye sin que el usuario conozca las razones. El
          futuro del bienestar dependerá menos de la cantidad de datos disponibles que de la forma
          en que esos datos se conviertan en decisiones legítimas.
        </P>

        <H3>El bienestar deja de hablarle a una multitud</H3>
        <P>
          La hiperpersonalización se construye en tres escalas que avanzan a ritmos diferentes. En
          el nivel global se consolidan reglas sobre protección de datos, inteligencia artificial
          confiable y servicios centrados en la persona. Colombia traduce esos referentes en
          políticas, marcos de hábeas data, telesalud, historia clínica interoperable y una hoja
          de ruta nacional de inteligencia artificial. Antioquia convierte esa arquitectura en una
          pregunta territorial: cómo utilizar capacidades digitales y mediciones de bienestar para
          reconocer diferencias entre el Valle de Aburrá, Urabá, Oriente, Bajo Cauca y las demás
          subregiones sin reproducir las brechas existentes.
        </P>
        <P>
          El mapa multinivel permite leer la variable como una cadena de condiciones y no como una
          herramienta aislada. La cobertura mundial de leyes de protección de datos se ubica
          alrededor del 74 % de los países en la base observada y el escenario del Observatorio la
          lleva al 95 % hacia 2040. Las estrategias nacionales de inteligencia artificial pasan de
          cerca de 70 países a 130 en el mismo horizonte. Colombia dispone de un marco general de
          protección de datos y de una política nacional de IA, pero la capacidad efectiva de
          personalizar depende de la conectividad, la interoperabilidad y la aplicación cotidiana
          de esas reglas. En Antioquia, la penetración de internet fijo parte de 23,9 accesos por
          cada 100 habitantes y se plantea una meta indicativa de 41; al mismo tiempo, la
          eliminación de municipios con brecha crítica se convierte en una condición para que la
          personalización no quede concentrada en las zonas con mayor infraestructura.
        </P>
        <Figura
          numero="1"
          titulo="Mapa multinivel de la hiperpersonalización del bienestar"
          imagen={figura01}
          alt="Diagrama que conecta los habilitadores globales, las capacidades nacionales y el impacto territorial en Antioquia de la hiperpersonalización del bienestar"
          nota="La figura conecta habilitadores globales, capacidades nacionales e impacto territorial en Antioquia. Los valores de 2030, 2035 y 2040 corresponden a metas indicativas del Observatorio y no a pronósticos oficiales."
        />
        <P>
          Las cifras centrales del horizonte muestran que el cambio no depende de un solo
          indicador. El crecimiento de la regulación y de las estrategias de IA crea el marco; la
          conectividad amplía la posibilidad de acceso; el Índice de Bienestar Multidimensional
          aporta una lectura de necesidades; y la cobertura institucional determina cuántas
          personas pueden convertir esa infraestructura en experiencias concretas. La{' '}
          <strong>Tabla 1</strong> sintetiza los hitos utilizados para observar el avance conjunto
          de la variable.
        </P>

        <div className="modulo-hiper-personalizacion__tabla-bloque">
          <p className="modulo-hiper-personalizacion__figura-rotulo">
            <strong>Tabla 1.</strong> Indicadores observados y metas prospectivas de
            hiperpersonalización y agenciamiento
          </p>
          <div
            className="modulo-hiper-personalizacion__tabla-envoltura"
            tabIndex={0}
            role="region"
            aria-label="Tabla 1: indicadores observados y metas prospectivas"
          >
            <table className="modulo-hiper-personalizacion__tabla">
              <thead>
                <tr>
                  <th scope="col">Indicador</th>
                  <th scope="col">Base observada</th>
                  <th scope="col">2030</th>
                  <th scope="col">2035</th>
                  <th scope="col">2040</th>
                  <th scope="col">Lectura prospectiva</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Países con ley de protección de datos</th>
                  <td>74 % (2025)</td>
                  <td>82 %</td>
                  <td>88 %</td>
                  <td>95 %</td>
                  <td>Expansión del piso regulatorio global.</td>
                </tr>
                <tr>
                  <th scope="row">Países con estrategia nacional de IA</th>
                  <td>70 (2025)</td>
                  <td>95</td>
                  <td>110</td>
                  <td>130</td>
                  <td>Mayor institucionalización de la gobernanza algorítmica.</td>
                </tr>
                <tr>
                  <th scope="row">Bienestar alto o suficiente según IBiM</th>
                  <td>28 % (2024)</td>
                  <td>34 %</td>
                  <td>41 %</td>
                  <td>48 %</td>
                  <td>Mayor capacidad de gestionar trayectorias de bienestar.</td>
                </tr>
                <tr>
                  <th scope="row">Internet fijo en Antioquia</th>
                  <td>23,9 accesos/100 hab. (2025)</td>
                  <td>29</td>
                  <td>35</td>
                  <td>41</td>
                  <td>Ampliación del soporte territorial de los servicios digitales.</td>
                </tr>
                <tr>
                  <th scope="row">Municipios antioqueños con brecha crítica</th>
                  <td>25 (2024)</td>
                  <td>10</td>
                  <td>3</td>
                  <td>0</td>
                  <td>Cierre gradual de exclusiones por conectividad.</td>
                </tr>
                <tr>
                  <th scope="row">Personas evaluadas mediante el IBiM</th>
                  <td>6.662 (2024)</td>
                  <td>12.000</td>
                  <td>18.000</td>
                  <td>25.000</td>
                  <td>Base más amplia para segmentación y seguimiento.</td>
                </tr>
                <tr>
                  <th scope="row">Cobertura de servicios de bienestar</th>
                  <td>5,6 millones (2025)</td>
                  <td>6,2 M</td>
                  <td>6,8 M</td>
                  <td>7,4 M</td>
                  <td>Escala institucional para experiencias más diferenciadas.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="modulo-hiper-personalizacion__figura-nota">
            <strong>Nota.</strong> Las bases observadas corresponden a años distintos dentro del
            período 2024–2026. Las cifras de 2030–2040 son metas de referencia para análisis de
            escenarios; su uso exige actualización periódica y validación con nuevas series.
          </p>
        </div>

        <Cita>“Cada dato puede afinar una recomendación, pero también ampliar una responsabilidad.”</Cita>

        <H3>De la privacidad al perfilado responsable</H3>
        <P>
          La historia de la hiperpersonalización empezó antes de que existieran los motores de
          recomendación actuales. El Convenio 108 de 1981 introdujo una primera frontera
          internacional frente al tratamiento automatizado de datos. Una década después, el
          artículo 15 de la Constitución colombiana reconoció el derecho a conocer, actualizar y
          rectificar la información personal. Entre 2008 y 2013, el hábeas data financiero, la Ley
          1581 y su reglamentación convirtieron esa protección en una arquitectura operativa de
          autorización, finalidad y tratamiento. La regulación no nació para diseñar portafolios
          de bienestar, pero terminó creando las condiciones jurídicas que hoy determinan hasta
          dónde puede llegar la personalización.
        </P>
        <P>
          El giro posterior fue más profundo. El Reglamento General de Protección de Datos de la
          Unión Europea reconoció límites a las decisiones automatizadas y a la elaboración de
          perfiles; los principios de la OCDE y la recomendación de la UNESCO desplazaron la
          discusión hacia una inteligencia artificial centrada en el ser humano; la Ley de IA de
          la Unión Europea incorporó una lógica de riesgo, transparencia y supervisión. Colombia
          avanzó de manera paralela con telesalud, historia clínica electrónica interoperable,
          políticas de transformación digital y el CONPES 4144 de 2025. Antioquia sumó
          instrumentos de planeación, cultura de datos y medición multidimensional. La trayectoria
          revela que la personalización no aparece como un salto tecnológico aislado, sino como la
          convergencia gradual de derechos, infraestructura y capacidades institucionales (Consejo
          de Europa, 1981; OCDE, 2024; UNESCO, 2021; Unión Europea, 2024).
        </P>
        <P>
          La <strong>Figura 2</strong> ordena esa evolución por niveles y deja visible un cambio
          de densidad: los hitos son más escasos en las primeras décadas y se concentran entre
          2019 y 2026. Esa aceleración no significa que todos los instrumentos tengan el mismo
          alcance. Algunos crean derechos, otros habilitan datos, otros organizan servicios y
          otros fijan principios éticos. La línea de tiempo permite observar el momento en que
          esas piezas comienzan a superponerse y convierten la hiperpersonalización en una
          posibilidad institucional cercana.
        </P>
        <Figura
          numero="2"
          titulo="Línea de tiempo prospectiva de la hiperpersonalización y el agenciamiento, 1981–2040"
          imagen={figura02}
          alt="Línea de tiempo de instrumentos globales, nacionales y departamentales entre 1981 y 2040, con los horizontes 2035 y 2040 marcados"
          nota="Cada segmento representa un instrumento, hito o elemento normativo identificado en el normograma. La visualización utiliza 58 registros con año de inicio válido y separa los horizontes analíticos de 2035 y 2040."
        />
        <P>
          El futuro no será vivido de la misma manera por todas las generaciones. Los adultos que
          en 2026 se formaron en servicios principalmente presenciales deberán transitar hacia
          canales híbridos y modelos de atención asistida. Los jóvenes llegarán a 2040 con mayor
          familiaridad en el control de datos, la portabilidad y las recomendaciones
          personalizadas. Los niños y adolescentes crecerán dentro de ecosistemas digitales en los
          que la predicción será una condición habitual del servicio. La diferencia generacional
          no se reducirá a la habilidad para usar una aplicación; también afectará la forma de
          otorgar consentimiento, interpretar una recomendación y exigir una explicación cuando el
          sistema se equivoca.
        </P>
        <P>
          La <strong>Figura 3</strong> combina la base histórica con cinco escenarios de futuro.
          La transformación avanzada supone datos interoperables, conectividad amplia y servicios
          preventivos; la expansión responsable mantiene la personalización bajo consentimiento y
          supervisión humana; la transición gradual conserva avances desiguales; la fragmentación
          territorial concentra los beneficios en quienes disponen de conectividad y capacidades
          digitales; y la personalización de alto riesgo intensifica el perfilado sin controles
          suficientes. Ninguno de esos escenarios es automático. Su utilidad está en mostrar que
          la misma tecnología puede conducir a resultados diferentes según la calidad de la
          gobernanza y la distribución territorial de las capacidades.
        </P>
        <Figura
          numero="3"
          titulo="Trayectorias prospectivas de la hiperpersonalización y el agenciamiento del bienestar"
          imagen={figura03}
          alt="Gráfica de trayectorias que combina la base histórica con cinco escenarios prospectivos de la hiperpersonalización hacia 2040"
          nota="La trayectoria histórica reúne fundamentos jurídicos, tecnológicos e institucionales hasta 2026. Los escenarios de 2030–2040 y las trayectorias generacionales son construcciones prospectivas para orientar vigilancia y deliberación."
        />

        <Cita>“Personalizar no es decidir por la persona; es devolverle mejores condiciones para decidir.”</Cita>

        <H3>La persona no puede desaparecer detrás del algoritmo</H3>
        <P>
          La hiperpersonalización suele describirse como una secuencia técnica: capturar datos,
          identificar patrones y recomendar una opción. Esa definición es insuficiente para el
          bienestar integral. La recomendación puede ser estadísticamente precisa y, al mismo
          tiempo, resultar inadecuada para una persona que no comprende cómo se construyó, no
          puede corregir sus datos o carece de una alternativa. El agenciamiento introduce una
          diferencia decisiva: el sistema no debe limitarse a acertar, sino que debe ampliar la
          capacidad del usuario para comprender su situación y actuar sobre ella.
        </P>
        <P>
          Los cinco elementos centrales del Observatorio —protección de datos, gobernanza de IA,
          autonomía, equidad digital y medición multidimensional— requieren tres condiciones
          transversales. La primera es la interoperabilidad y trazabilidad, porque una
          recomendación útil necesita información conectada y verificable. La segunda es la
          transparencia, la explicabilidad y la supervisión humana, indispensables cuando una
          decisión afecta salud, acceso, prioridad o continuidad de atención. La tercera es la
          articulación institucional y regulatoria, debido a que los datos pueden circular entre
          prestadores, plataformas, entidades territoriales y aliados tecnológicos. La{' '}
          <strong>Figura 4</strong> reúne estas ocho dimensiones en una misma arquitectura.
        </P>
        <Figura
          numero="4"
          titulo="Arquitectura de condiciones para una hiperpersonalización responsable"
          imagen={figura04}
          alt="Mapa conceptual con los cinco componentes sustantivos y las tres condiciones transversales de una hiperpersonalización responsable"
          nota="La figura organiza ocho frentes de vigilancia: cinco componentes sustantivos y tres condiciones transversales. No corresponde a una medición de desempeño, sino a un mapa conceptual de capacidades, derechos y salvaguardas."
        />
        <P>
          El Índice de Bienestar Multidimensional ofrece una vía para evitar que la
          personalización se reduzca al historial de clics o consumos. Sus nueve dimensiones
          permiten reconocer que una misma persona puede mostrar suficiencia en salud y vínculos
          sociales, pero fragilidad en ingresos, vivienda o empleo. En la base observada, el 28 %
          de las personas evaluadas se ubica en bienestar alto o suficiente, el 48,4 % en un nivel
          moderado y el 22,9 % en insuficiencia. Además, el 75 % reporta dificultades para cumplir
          obligaciones financieras a tiempo y el 69 % carece de respaldo suficiente ante una
          pérdida de ingresos. Estos datos no describen preferencias; describen restricciones que
          cambian el significado de cualquier recomendación.
        </P>
        <P>
          Una ruta de bienestar personalizada tendría que distinguir entre lo deseado y lo
          posible. Recomendar actividad física a una persona con limitaciones de tiempo,
          transporte o cuidado puede ser técnicamente pertinente, pero operacionalmente inviable.
          Sugerir formación laboral sin reconocer conectividad, horarios o responsabilidades
          familiares puede convertir la personalización en una lista de oportunidades
          inaccesibles. El valor del agenciamiento aparece cuando el sistema ofrece alternativas,
          explica prioridades y permite ajustar la ruta a medida que cambian las condiciones de
          vida. La persona no recibe una orden encubierta; recibe información organizada para
          ejercer una decisión.
        </P>

        <H3>La brecha digital también personaliza la desigualdad</H3>
        <P>
          La sofisticación de los servicios puede avanzar más rápido que la capacidad territorial
          para utilizarlos. Colombia registra 17,4 accesos de internet fijo por cada 100
          habitantes en la base de 2025, mientras Antioquia alcanza 23,9. El escenario del
          Observatorio plantea 34 accesos para el país y 41 para el departamento hacia 2040. Los
          accesos móviles nacionales pasarían de 49 a 73 millones y la conectividad general se
          acercaría al 90 %. Sin embargo, el promedio departamental puede ocultar municipios y
          hogares que permanecen en los bordes de la infraestructura digital (Ministerio de
          Tecnologías de la Información y las Comunicaciones [MinTIC], 2025).
        </P>
        <P>
          El riesgo no consiste únicamente en que una persona carezca de conexión. La
          hiperpersonalización se alimenta de interacciones, registros y retroalimentación. Quien
          utiliza canales digitales deja una trayectoria visible; quien depende de atención
          esporádica, conectividad inestable o intermediación presencial produce menos señales.
          Con el tiempo, esa diferencia puede traducirse en perfiles más completos para unos y
          recomendaciones más genéricas para otros. La brecha digital deja entonces de ser una
          distancia de acceso y se convierte en una distancia de representación: algunos usuarios
          son comprendidos con mayor detalle porque el sistema dispone de más datos sobre ellos.
        </P>
        <P>
          La meta de reducir de 25 a cero los municipios antioqueños con penetración crítica y
          ampliar la nueva conectividad de hogares de estratos 1 y 2 desde 53 mil hasta 384 mil
          representa una condición de equidad, no un complemento tecnológico. Aun con cobertura,
          el acceso efectivo dependerá de alfabetización digital, dispositivos, confianza,
          lenguaje comprensible y alternativas presenciales. Una estrategia de bienestar centrada
          en la persona tendrá que ofrecer continuidad entre canales, de modo que la recomendación
          no se pierda cuando el usuario cambia de plataforma, territorio o forma de atención.
        </P>

        <Cita>
          “La brecha digital no solo separa conectados y desconectados: también decide quién puede
          ser visto por los sistemas predictivos.”
        </Cita>

        <H3>Las fuerzas de cambio no avanzan por separado</H3>
        <P>
          La lectura PESTEL revela que la hiperpersonalización del bienestar está condicionada por
          fuerzas políticas, económicas, sociales, tecnológicas, ambientales y legales que avanzan
          con distinta intensidad. La base contiene siete registros con dimensión PESTEL
          codificada de manera explícita, por lo que el radar de la <strong>Figura 5</strong>{' '}
          representa una aproximación parcial y no una distribución exhaustiva de los 67
          instrumentos analizados. Dentro de este subconjunto, la dimensión social concentra tres
          registros, la política reúne dos y las dimensiones económica y tecnológica registran uno
          cada una. La ausencia de elementos clasificados en los componentes ambiental y legal no
          indica que estas dimensiones carezcan de relevancia, sino que evidencia una cobertura
          todavía limitada dentro de la codificación disponible.
        </P>
        <P>
          La segunda parte de la visualización utiliza una clasificación derivada para toda la
          base y ofrece una señal más robusta. Las fuerzas sistémicas o convergentes reúnen 25
          registros, las regulatorias o normativas 19 y las socioculturales o conductuales 16. La
          hiperpersonalización aparece así como una transformación de convergencia: ninguna norma,
          plataforma o comportamiento puede explicarla por separado. La regulación define límites,
          la tecnología amplía capacidades, la cultura modifica expectativas y la organización
          institucional determina si esas piezas logran operar como un sistema.
        </P>
        <Figura
          numero="5"
          titulo="Dimensión PESTEL y fuerzas de cambio en la hiperpersonalización del bienestar"
          imagen={figura05}
          alt="Radar de la dimensión PESTEL y clasificación de las fuerzas de cambio en la hiperpersonalización del bienestar"
          nota="El panel izquierdo utiliza únicamente los siete registros con dimensión PESTEL explícita. El panel derecho clasifica los registros mediante reglas documentadas de tipo de fuerza e intensidad de impacto; por ello, ambas lecturas tienen alcances diferentes."
        />
        <P>
          La distribución por nivel de aplicación confirma esa convergencia. Los 19 registros que
          integran simultáneamente protección de datos y autonomía se reparten entre seis
          globales, siete nacionales y seis departamentales. Los 17 registros asociados de manera
          dominante a datos y perfilado se concentran en el nivel nacional, mientras los 14
          vinculados a autonomía y autogestión mantienen una distribución equilibrada entre los
          tres niveles. La señal central no está en cuál escala acumula más instrumentos, sino en
          la imposibilidad de desarrollar la variable desde una sola jurisdicción.
        </P>
        <P>
          La Figura 6 permite observar que las categorías más densas son precisamente aquellas que
          conectan datos, perfilado y autonomía. Los instrumentos transversales más específicos
          —marco regulatorio, medición multidimensional, gobernanza de IA y brecha digital—
          aparecen con menor frecuencia porque operan como piezas de síntesis dentro de una
          estructura más amplia. En términos prospectivos, la densidad normativa no garantiza
          capacidad institucional, pero ayuda a identificar dónde existe mayor soporte y dónde
          persisten vacíos de medición o implementación.
        </P>
        <Figura
          numero="6"
          titulo="Distribución de registros por elemento clave y nivel de aplicación"
          imagen={figura06}
          alt="Gráfica de barras de la distribución de los registros del normograma por elemento clave y nivel de aplicación"
          nota="La figura utiliza 63 registros con elemento clave asignado. Las categorías de convergencia reúnen hitos en los que protección de datos, perfilado y autonomía operan de manera simultánea."
        />
        <P>
          El flujo entre elemento clave, nivel de aplicación y horizonte analítico revela una
          diferencia temporal. Los instrumentos globales alimentan con mayor fuerza el horizonte
          2035, debido a que muchos de ellos fijan estándares que requieren adaptación gradual.
          Los niveles nacional y departamental muestran un peso mayor hacia 2040, cuando la
          regulación debe convertirse en interoperabilidad, capacidad territorial, medición y
          experiencia de servicio. La <strong>Figura 7</strong> no representa una cadena causal
          cerrada; muestra cómo los registros se agrupan y hacia qué horizonte aportan mayor
          contenido analítico.
        </P>
        <Figura
          numero="7"
          titulo="Flujo prospectivo entre elementos clave, niveles de aplicación y horizontes analíticos"
          imagen={figura07}
          alt="Diagrama de flujo tipo Sankey entre elementos clave, niveles de aplicación y horizontes analíticos"
          nota="Diagrama tipo Sankey construido con 63 registros que cuentan con elemento clave asignado. El ancho de cada cinta es proporcional al número de registros que comparten la combinación de categorías."
        />

        <H3>Una ruta que no termina en 2040</H3>
        <P>
          La transición puede organizarse en cinco momentos, aunque su desarrollo no será lineal.
          Entre 2026 y 2030 predominan los ajustes inmediatos: aplicación de reglas de datos,
          lineamientos de perfilado, interoperabilidad básica y gestión de riesgos algorítmicos.
          El tramo 2031–2035 concentra la convergencia normativa, el consentimiento robusto, la
          integración gradual de servicios y la formalización ética de auditorías. Entre 2036 y
          2040 aparece la consolidación: trazabilidad, gobierno corporativo del dato, innovación
          social territorial y ciudadanía del dato con inclusión digital.
        </P>
        <P>
          La hoja de ruta extiende el análisis más allá de 2040 para mostrar que la madurez
          regulatoria y la integración avanzada seguirán abiertas. Entre 2041 y 2045 se ubican la
          portabilidad de derechos, la supervisión especializada y la predicción responsable;
          entre 2046 y 2050, la protección social basada en datos, los servicios preventivos
          invisibles y la convergencia con estándares internacionales. Esa extensión no modifica
          el horizonte principal del artículo. Funciona como una advertencia: el año 2040 no
          representa un punto final, sino el momento en que varias capacidades podrían dejar de
          ser pilotos y convertirse en infraestructura ordinaria del bienestar.
        </P>
        <P>
          La <strong>Figura 8</strong> distribuye los 67 registros del normograma entre esas
          fases. El mayor volumen aparece en 2031–2035, con 21 registros, seguido por los 17
          ajustes inmediatos y los 12 instrumentos de integración avanzada. La concentración
          intermedia sugiere que la década de 2030 será el espacio decisivo para traducir
          principios en reglas operativas y reglas en capacidades de servicio. Si esa conversión
          se retrasa, la tecnología podría avanzar sobre estructuras institucionales todavía
          fragmentadas; si se acelera sin salvaguardas, la personalización podría ganar precisión
          antes de ganar legitimidad.
        </P>
        <Figura
          numero="8"
          titulo="Hoja de ruta prospectiva de la hiperpersonalización de servicios y el agenciamiento"
          imagen={figura08}
          alt="Hoja de ruta que distribuye los 67 registros del normograma en fases entre 2026 y 2050"
          nota="La hoja de ruta organiza 67 registros globales, nacionales y departamentales. El horizonte 2026–2040 corresponde al foco del análisis; los períodos 2041–2050 constituyen una extensión exploratoria para visualizar procesos de maduración e integración avanzada."
        />

        <Cita>“El futuro del bienestar será menos un catálogo y más una conversación que aprende.”</Cita>

        <H3>Del dato a la experiencia cotidiana</H3>
        <P>
          La hiperpersonalización solo adquiere sentido cuando se transforma en una experiencia
          comprensible para el usuario. El ciclo operativo comienza con la captura de información,
          continúa con la integración de fuentes, pasa por el análisis y la recomendación, se
          materializa en una interacción y regresa al sistema mediante retroalimentación. Cada
          etapa puede mejorar la pertinencia, pero también introduce un punto de riesgo. Una
          captura excesiva amplía la exposición; una integración deficiente fragmenta el perfil;
          un análisis sesgado distorsiona la recomendación; una interacción compleja reduce la
          adopción; y una retroalimentación inexistente impide corregir errores.
        </P>
        <P>
          Las capacidades habilitadoras son, por tanto, organizacionales además de tecnológicas.
          La integración de fuentes necesita reglas de calidad y linaje; la analítica predictiva
          exige segmentación responsable; el diseño centrado en la persona requiere investigación
          con usuarios; los equipos interdisciplinarios deben combinar conocimiento social,
          jurídico, estadístico y territorial; y el monitoreo permanente debe observar resultados,
          no solo actividad digital. La satisfacción, la cobertura efectiva, el uso de canales y
          la adopción de recomendaciones son indicadores iniciales, pero la vigilancia también
          tendrá que medir abandono, exclusión, correcciones de perfil y diferencias
          territoriales.
        </P>
        <P>
          La <strong>Figura 9</strong> reúne beneficios, capacidades, actores, riesgos y
          resultados esperados. Su centro no está ocupado por el algoritmo, sino por la persona.
          Alrededor aparecen el valor público y la confianza, el aprendizaje continuo y las
          decisiones basadas en evidencia. Esa disposición resume el criterio que separa una
          hiperpersonalización orientada al bienestar de una automatización centrada en
          eficiencia: la primera utiliza la predicción para ampliar opciones y continuidad; la
          segunda corre el riesgo de convertir a la persona en una secuencia de probabilidades.
        </P>
        <Figura
          numero="9"
          titulo="Modelo operativo de hiperpersonalización del bienestar"
          imagen={figura09}
          alt="Modelo operativo con la persona en el centro, rodeada de beneficios, capacidades habilitadoras, actores, riesgos y resultados esperados"
          nota="Síntesis conceptual de beneficios, capacidades habilitadoras, riesgos, actores y resultados. La ruta de seis etapas representa un ciclo de aprendizaje institucional y no un modelo algorítmico específico."
        />
        <P>
          Los escenarios del horizonte 2040 permiten convertir esa arquitectura en una agenda de
          vigilancia. La atención no debe limitarse al crecimiento de la conectividad o al número
          de modelos implementados. También debe observarse la calidad del consentimiento, la
          proporción de recomendaciones explicables, la posibilidad de intervención humana, la
          cobertura de poblaciones con baja huella digital, la portabilidad de datos y la
          capacidad de demostrar mejoras reales en bienestar. La <strong>Tabla 2</strong> organiza
          cinco configuraciones posibles para seguir esas señales sin asumir que la evolución
          tecnológica conducirá por sí sola al escenario más favorable.
        </P>

        <div className="modulo-hiper-personalizacion__tabla-bloque">
          <p className="modulo-hiper-personalizacion__figura-rotulo">
            <strong>Tabla 2.</strong> Escenarios prospectivos para la hiperpersonalización del
            bienestar hacia 2040
          </p>
          <div
            className="modulo-hiper-personalizacion__tabla-envoltura"
            tabIndex={0}
            role="region"
            aria-label="Tabla 2: escenarios prospectivos hacia 2040"
          >
            <table className="modulo-hiper-personalizacion__tabla">
              <thead>
                <tr>
                  <th scope="col">Escenario</th>
                  <th scope="col">Configuración dominante</th>
                  <th scope="col">Señal de vigilancia para el Observatorio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Transformación avanzada</th>
                  <td>
                    Gobernanza sólida, datos interoperables, conectividad amplia y servicios
                    preventivos hiperpersonalizados.
                  </td>
                  <td>
                    Verificar que la mejora de pertinencia alcance territorios y grupos con menor
                    huella digital.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Expansión responsable</th>
                  <td>
                    Personalización creciente con consentimiento, supervisión humana y modelos de
                    IA confiable.
                  </td>
                  <td>
                    Medir explicabilidad, corrección de perfiles, revocación del consentimiento y
                    control del usuario.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Transición gradual</th>
                  <td>
                    Avances regulatorios y tecnológicos desiguales; coexistencia de servicios
                    homogéneos y personalizados.
                  </td>
                  <td>
                    Identificar cuellos de botella entre regulación, infraestructura, talento y
                    adopción.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Fragmentación territorial</th>
                  <td>
                    Brechas de conectividad y capacidades institucionales producen acceso
                    desigual.
                  </td>
                  <td>
                    Comparar cobertura efectiva, calidad de la experiencia y resultados por
                    subregión y condición socioeconómica.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Personalización de alto riesgo</th>
                  <td>
                    Perfilado intensivo sin transparencia suficiente, dependencia tecnológica y
                    débil control humano.
                  </td>
                  <td>
                    Registrar sesgos, exclusiones, decisiones adversas, incidentes de datos y
                    mecanismos de reparación.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="modulo-hiper-personalizacion__figura-nota">
            <strong>Nota.</strong> Los escenarios son configuraciones cualitativas construidas
            para vigilancia prospectiva. No representan probabilidades ni predicciones cerradas y
            deben actualizarse cuando cambien la regulación, la conectividad, la disponibilidad de
            datos o los resultados de bienestar.
          </p>
        </div>

        <H3>Cuando la prospectiva baja al detalle</H3>
        <P>
          El futuro de la hiperpersonalización no avanza en una sola línea. Entre 2025 y 2040, la
          protección de datos amplía su alcance, la gobernanza de la inteligencia artificial gana
          densidad, el Índice de Bienestar Multidimensional extiende su cobertura, la conectividad
          territorial reduce distancias y los indicadores de bienestar describen una población con
          mayor capacidad de decisión. Sin embargo, ninguna de estas trayectorias bastará por
          separado. El cambio decisivo aparecerá cuando las reglas, los datos, la infraestructura
          y la autonomía del usuario empiecen a operar como un mismo sistema.
        </P>
        <P>
          A la vez, el horizonte revela una tensión que acompañará toda la transición. Cada avance
          abre una posibilidad y, al mismo tiempo, una nueva exigencia: más datos pueden producir
          recomendaciones más pertinentes, pero también elevar el riesgo de vigilancia; una mayor
          conectividad puede acercar servicios, aunque dejar atrás a quienes aún no tienen acceso
          estable; una medición más fina del bienestar puede anticipar necesidades, pero también
          reducir a las personas a perfiles rígidos. La hiperpersonalización responsable dependerá
          de la capacidad de sostener ese equilibrio sin sacrificar derechos ni diversidad
          territorial.
        </P>

        <H3>La confianza se convierte en infraestructura</H3>
        <P>
          La hiperpersonalización comienza antes de que aparezca cualquier recomendación
          automatizada. Su primera frontera se encuentra en las reglas que determinan qué datos
          pueden recopilarse, con qué finalidad deben utilizarse, durante cuánto tiempo pueden
          conservarse y bajo qué condiciones se obtiene el consentimiento. En este escenario, la
          cobertura mundial de leyes de protección de datos pasó del 56 % de los países en 2016 al
          74 % en 2025 y podría aproximarse al 95 % hacia 2040. La trayectoria anticipa una
          expansión sostenida del marco regulatorio, aunque también evidencia que la existencia
          formal de una ley no garantiza, por sí sola, una protección efectiva frente al perfilado
          algorítmico, la reutilización de información o las decisiones automatizadas.
        </P>
        <P>
          En Colombia, el marco nacional de protección de datos y su aplicación territorial en
          Antioquia constituyen la base jurídica sobre la cual podrían desarrollarse servicios más
          personalizados. No obstante, a medida que aumenten la integración de fuentes, la
          analítica predictiva y la circulación de información entre actores institucionales,
          también crecerá la exigencia de demostrar la finalidad, proporcionalidad y trazabilidad
          de cada tratamiento. La confianza dejará de depender únicamente de la aceptación inicial
          de una política de privacidad y comenzará a construirse mediante decisiones
          comprensibles, mecanismos de corrección y posibilidades reales de revocar el
          consentimiento.
        </P>
        <P>
          El escenario prospectivo del Observatorio estima que las investigaciones relacionadas
          con el tratamiento indebido de información podrían pasar de 101 casos de referencia en
          2025 a 270 en 2040. Este crecimiento no debe interpretarse exclusivamente como un
          aumento de los incumplimientos, pues también puede reflejar una ciudadanía más
          consciente de sus derechos, autoridades con mayores capacidades de supervisión y
          organizaciones sometidas a estándares más estrictos de responsabilidad. En ese
          horizonte, cada institución deberá explicar no solo por qué utiliza un dato, sino
          también cómo este influye en la recomendación, clasificación o decisión que recibe la
          persona, como se observa en la <strong>Figura 10</strong>.
        </P>
        <P>
          En el grupo de siete países latinoamericanos priorizados, el número de países con
          estrategia nacional de inteligencia artificial se mantiene estable dentro del escenario
          prospectivo. Colombia, por su parte, actualizó su hoja de ruta mediante el CONPES 4144
          de 2025, mientras Antioquia dispone de un Plan Estratégico de Tecnologías de la
          Información que puede actuar como habilitador territorial. No obstante, la continuidad
          presupuestal, la calidad de los datos y la capacidad de supervisión determinarán si
          estos marcos se traducen en servicios confiables o permanecen como estructuras formales
          con un efecto operativo limitado.
        </P>

        <Cita>“La confianza no se agrega al final del algoritmo; se diseña desde el primer dato.”</Cita>

        <Figura
          numero="10"
          titulo="Protección de datos y perfilado algorítmico: tendencias y marcos de referencia"
          imagen={figura10}
          alt="Paneles con la cobertura mundial de leyes de protección de datos, los marcos vigentes y la trayectoria de investigaciones de la Superintendencia de Industria y Comercio"
          nota="Los paneles integran la cobertura mundial de leyes de protección de datos, la vigencia del Reglamento General de Protección de Datos y de la Ley 1581 de 2012, la trayectoria de investigaciones de la Superintendencia de Industria y Comercio y la aplicabilidad del marco nacional en Antioquia. Las cifras de 2030–2040 corresponden a metas o proyecciones del Observatorio."
        />
        <P>
          Sin embargo, la regulación solo delimita el terreno. La verdadera disputa se trasladará
          a la forma como se gobiernen los modelos que procesan la información y convierten
          patrones en decisiones. El número de países con estrategias nacionales de inteligencia
          artificial pasó de 42 en 2019 a 70 en 2025 y podría llegar a 130 en 2040. De manera
          paralela, los instrumentos de política registrados internacionalmente aumentarían de
          cerca de 650 en 2023 a 1.300 al final del horizonte. La señal ya no es únicamente
          tecnológica: la inteligencia artificial empieza a convertirse en un asunto de gobernanza
          pública, control institucional y legitimidad social.
        </P>
        <P>
          En el grupo de siete países latinoamericanos priorizados, el número de países con
          estrategia nacional de inteligencia artificial se mantiene estable dentro del escenario
          prospectivo. Colombia, por su parte, actualizó su hoja de ruta mediante el CONPES 4144
          de 2025, mientras el PETI 2024–2027 de Antioquia constituye un habilitador territorial
          observado. La continuidad representada después de 2027 corresponde a una proyección
          prospectiva del soporte institucional requerido y no a la vigencia normativa del mismo
          instrumento. La continuidad presupuestal, la calidad de los datos y la capacidad de
          supervisión determinarán si estos marcos se traducen en servicios confiables o
          permanecen como estructuras formales con un efecto operativo limitado, como se observa
          en la <strong>Figura 11</strong>.
        </P>
        <Figura
          numero="11"
          titulo="Gobernanza y adopción de inteligencia artificial en la personalización de servicios"
          imagen={figura11}
          alt="Paneles sobre estrategias nacionales de inteligencia artificial, instrumentos internacionales de política y el marco departamental de Antioquia"
          nota="La figura combina estrategias nacionales de inteligencia artificial, instrumentos internacionales de política, el comportamiento de siete países priorizados de América Latina y el marco departamental habilitante de Antioquia. Las proyecciones posteriores a 2025 representan escenarios de continuidad y expansión, no compromisos oficiales."
        />

        <H3>Medir para devolver capacidad de decisión</H3>
        <P>
          El agenciamiento no nace de una mayor cantidad de mensajes, sino de una mejor capacidad
          para decidir. El Índice de Bienestar Multidimensional desplaza la mirada desde el
          historial de consumo hacia nueve dimensiones que registran suficiencias, tensiones y
          necesidades simultáneas. En la línea base de 2024, 28 % de los afiliados evaluados se
          ubicó en bienestar alto, 48,4 % en nivel moderado y 22,9 % en insuficiencia. Hacia 2040,
          el escenario eleva el bienestar alto a 48 % y reduce la insuficiencia a 12 %, una
          trayectoria que describe más que un cambio porcentual: sugiere una población con mayor
          margen para elegir, anticiparse y sostener decisiones sobre su propio bienestar.
        </P>
        <P>
          Además, la ampliación de la muestra desde 6.662 personas evaluadas en 2024 hasta 25.000
          en 2040 aumentaría la capacidad de reconocer diferencias entre edades, hogares,
          territorios y trayectorias. El salto, sin embargo, no garantiza representatividad total.
          La fuerza del instrumento dependerá de su actualización, de la diversidad de quienes
          participan y del uso que se haga de los resultados. En esa misma dirección, los marcos
          de autonomía del paciente, telesalud y salud digital consolidan una idea central: la
          persona no debe limitarse a recibir recomendaciones, sino conservar la posibilidad de
          comprenderlas, discutirlas y rechazarlas.
        </P>
        <P>
          Por otra parte, la escala institucional transforma la magnitud del reto. La cobertura de
          servicios de bienestar de Comfenalco Antioquia pasaría de 5,6 millones de atenciones en
          la referencia de 2025 a 7,4 millones en 2040. Cada nueva interacción amplía la
          posibilidad de personalizar, pero también multiplica el volumen de datos, las decisiones
          automatizadas y los puntos donde puede perderse la trazabilidad. La expansión del
          servicio y la expansión del conocimiento sobre el usuario avanzarán juntas; por eso, la
          calidad de la experiencia dependerá tanto de la capacidad analítica como de la confianza
          que sostenga esa relación.
        </P>

        <Cita>“No existe agenciamiento si el usuario solo puede aceptar lo que la plataforma decide mostrar.”</Cita>

        <Figura
          numero="12"
          titulo="Autonomía y autogestión: trayectoria del IBiM, alcance de la medición y cobertura de servicios"
          imagen={figura12}
          alt="Paneles con la distribución prospectiva del bienestar multidimensional, la ampliación de la muestra evaluada y la cobertura de servicios de bienestar"
          nota="La figura relaciona la distribución prospectiva del bienestar multidimensional, la ampliación de la muestra evaluada, los marcos habilitantes de autonomía en salud y la cobertura de servicios de bienestar. La expansión de la muestra no equivale a representatividad poblacional total."
        />

        <H3>La conectividad decide quién puede ser visible</H3>
        <P>
          La personalización digital necesita señales. Quien consulta, responde, actualiza
          información y retroalimenta un servicio deja una huella capaz de orientar
          recomendaciones futuras; quien permanece desconectado aparece de manera fragmentaria o
          desaparece del campo predictivo. En 2025, Colombia registraba cerca de 17,4 accesos de
          internet fijo por cada 100 habitantes, mientras Antioquia se ubicaba alrededor de 23,9.
          Hacia 2040, las metas de referencia alcanzan 34 y 41 accesos, respectivamente, y
          mantienen una ventaja departamental de seis a siete puntos sobre el promedio nacional.
        </P>
        <P>
          Aun así, el promedio esconde el territorio. La conectividad general del país podría
          pasar de cerca de 60 % en 2024 a 90 % en 2040, mientras los accesos móviles crecerían de
          49 a 73 millones. En Antioquia, la señal más sensible está en los municipios con
          penetración inferior a 12 %: la trayectoria propone reducirlos de 25 en 2024 a diez en
          2030, tres en 2035 y ninguno en 2040. En paralelo, los hogares de estratos 1 y 2
          beneficiados con nueva conectividad aumentarían de 53.000 en 2025 a 384.000 al cierre
          del horizonte.
        </P>
        <P>
          Sin embargo, una conexión no equivale automáticamente a inclusión. El acceso limitado,
          costoso o inestable puede permitir una consulta ocasional, pero no una interacción
          continua con servicios predictivos. La equidad digital exigirá infraestructura,
          dispositivos, alfabetización, acompañamiento y rutas presenciales capaces de sostener a
          quienes no pueden depender por completo de un canal digital. De otro modo, la
          hiperpersonalización podría concentrarse precisamente en quienes ya cuentan con mejores
          condiciones para ser visibles, medidos y atendidos por el sistema.
        </P>
        <Figura
          numero="13"
          titulo="Brecha digital y equidad territorial en el acceso a servicios hiperpersonalizados"
          imagen={figura13}
          alt="Paneles que comparan la penetración de internet fijo en Colombia y Antioquia, la conectividad general y móvil y la reducción de municipios con brecha crítica"
          nota="Los paneles comparan la penetración de internet fijo en Colombia y Antioquia, la conectividad general y móvil, la reducción de municipios con brecha crítica y la ampliación de hogares vulnerables con nueva conectividad. Los valores de 2030–2040 corresponden a metas del escenario del Observatorio."
        />
        <P>
          El cierre territorial tendrá dos velocidades. La reducción de 25 a diez municipios entre
          2024 y 2030 concentra 60 % del ajuste esperado; después, la pendiente se estrecha porque
          los territorios restantes suelen reunir mayores barreras geográficas, económicas y
          operativas. Por consiguiente, llegar de tres municipios a cero entre 2035 y 2040 podría
          exigir más recursos por hogar conectado que todo el tramo anterior. La última milla no
          será la más numerosa, pero sí la que determinará si la transformación digital alcanza
          realmente a las subregiones con menor capacidad de acceso.
        </P>

        <Cita>
          “La última conexión no será la más numerosa, pero sí la que pondrá a prueba la equidad
          del sistema.”
        </Cita>

        <Figura
          numero="14"
          titulo="Cierre prospectivo de la brecha digital crítica en Antioquia"
          imagen={figura14}
          alt="Gráfica del número de municipios antioqueños con penetración de internet inferior al 12 por ciento y de los hogares vulnerables con nueva banda ancha"
          nota="La figura presenta el número de municipios antioqueños con penetración de internet inferior a 12 % y destaca la ampliación esperada de hogares vulnerables con banda ancha. El cierre total en 2040 es una meta prospectiva y no un resultado garantizado. Fuente: MinTIC y Observatorio Prospectivo de Comfenalco Antioquia–Universidad de Antioquia."
        />

        <H3>El bienestar no cabe en un solo indicador</H3>
        <P>
          Una experiencia puede estar altamente personalizada y, al mismo tiempo, resultar
          irrelevante para la vida de una persona. Por esa razón, el horizonte incorpora
          indicadores que van más allá del uso de canales. La satisfacción con la vida en Colombia
          pasa de 6,4 puntos en 2025 a 7,6 en 2040 dentro del escenario, mientras la referencia
          OCDE se mueve de 6,8 a 7,7. La distancia se reduce, aunque no desaparece: el país
          mejora, pero lo hace dentro de un entorno internacional que también eleva sus propios
          estándares de bienestar.
        </P>
        <P>
          En Antioquia, el aumento del bienestar alto de 28 % a 48 % adquiere otra profundidad
          cuando se cruza con la vulnerabilidad financiera. La proporción de afiliados con
          dificultad para cumplir obligaciones podría disminuir de 75 % a 45 %, mientras quienes
          no cuentan con respaldo ante una pérdida de ingresos bajarían de 69 % a 36 %. De este
          modo, el bienestar deja de ser una percepción aislada y empieza a leerse junto con la
          capacidad de resistir una enfermedad, una pérdida de empleo o una interrupción de
          ingresos.
        </P>
        <P>
          A la vez, la convergencia esperada hacia 2040 ubica el bienestar alto en 48 % y la
          dificultad financiera en 45 %. La cercanía de ambas cifras no significa que describan a
          los mismos hogares ni que una variable cause la otra. Su valor está en la advertencia:
          la satisfacción, la autonomía y la estabilidad económica deben avanzar de manera
          articulada para que una recomendación personalizada no confunda un momento favorable con
          una trayectoria realmente sostenible.
        </P>
        <Figura
          numero="15"
          titulo="Bienestar multidimensional, satisfacción con la vida y vulnerabilidad financiera, 2019–2040"
          imagen={figura15}
          alt="Gráficas de la satisfacción con la vida en Colombia y la referencia OCDE, el bienestar alto del IBiM y dos indicadores de vulnerabilidad financiera"
          nota="La figura integra la satisfacción con la vida en Colombia y la referencia OCDE, el bienestar alto medido mediante el IBiM, dos indicadores de vulnerabilidad financiera y su convergencia prospectiva. Las trayectorias 2030–2040 son metas de referencia del Observatorio."
        />
        <P>
          Las cinco variables priorizadas describen un movimiento conjunto sin fundirse en un
          único índice. Entre 2025 y 2040, la cobertura normativa mundial aumenta 21 puntos
          porcentuales; los países con estrategia nacional de IA suman 60; el bienestar alto
          medido por el IBiM gana 20 puntos; los municipios con brecha digital crítica disminuyen
          en 25; y la satisfacción con la vida en Colombia aumenta 1,2 puntos. Las unidades son
          distintas y no admiten una comparación directa, pero la dirección compartida revela una
          transición que combina regulación, tecnología, autonomía, territorio y bienestar.
        </P>
        <P>
          Por consiguiente, el valor del tablero está en la relación entre las señales. Una
          estrategia de IA puede expandirse sin mejorar la vida de las personas; la conectividad
          puede crecer sin reducir la vulnerabilidad; la regulación puede mantenerse vigente sin
          producir confianza. La prospectiva exige observar qué variable avanza, cuál se rezaga y
          dónde una promesa tecnológica puede perder fuerza por falta de inclusión, gobernanza o
          capacidad institucional.
        </P>
        <Figura
          numero="16"
          titulo="Síntesis integrada de las cinco variables priorizadas, línea base 2024–2025 y escenario 2040"
          imagen={figura16}
          alt="Gráfica posicional que conecta la base observada de cada una de las cinco variables priorizadas con su escenario prospectivo de 2040"
          nota="Cada línea conecta la base observada de 2024 o 2025, según la disponibilidad de cada indicador, con el escenario prospectivo de 2040. Las escalas son heterogéneas y la visualización es posicional; no constituye un ranking ni permite comparar directamente las magnitudes entre variables."
        />

        <H3>Los ritmos importan tanto como las metas</H3>
        <P>
          En 2025, la cobertura normativa y la gobernanza de IA ya acumulaban un recorrido
          histórico, mientras el bienestar alto conservaba un margen amplio de mejora. Hacia 2040,
          los cinco ejes se acercan al mejor valor definido dentro de su propia trayectoria. Esa
          aproximación no significa que hayan alcanzado el mismo nivel real; muestra, más bien,
          que cada variable entra en una fase distinta de maduración y que la velocidad del cambio
          será desigual.
        </P>
        <P>
          En particular, la brecha digital exige una lectura inversa: menos municipios en
          situación crítica representan un mejor resultado. Por ello, el tamaño de los polígonos
          no funciona como un índice compuesto ni permite declarar una superioridad absoluta entre
          variables. La señal relevante está en el ritmo relativo: dónde el avance se acelera,
          dónde se estabiliza y dónde la última parte del recorrido puede requerir más tiempo y
          recursos que el tramo inicial.
        </P>
        <Figura
          numero="17"
          titulo="Perfil normalizado del Observatorio Prospectivo"
          imagen={figura17}
          alt="Gráfica de radar con los cinco ejes normalizados de cero a uno según su propio rango histórico y prospectivo"
          nota="Cada eje se normaliza de 0 a 1 según su propio rango histórico y prospectivo. El eje de brecha digital se interpreta de forma inversa, pues menos municipios en situación crítica representan una mejora. El área de los polígonos no constituye un índice agregado y solo permite comparar ritmos relativos."
        />
        <P>
          La intensidad del cambio tampoco se distribuye de manera uniforme en el tiempo. La
          cobertura normativa avanza de forma continua; las investigaciones de la SIC y las
          estrategias nacionales de IA ganan densidad desde 2023; el bienestar alto y la
          conectividad concentran sus mayores movimientos en los horizontes de 2030, 2035 y 2040;
          y la reducción de la insuficiencia y de la brecha crítica adquiere mayor fuerza en los
          últimos tramos. El futuro no aparece, entonces, como una línea estable, sino como una
          secuencia de aceleraciones, pausas y puntos de presión.
        </P>
        <P>
          Asimismo, los años sin registro comparable no deben confundirse con estancamiento. Cada
          indicador conserva su propia escala y su propio ritmo, de modo que el tono más intenso
          señala el mejor valor alcanzado dentro de esa trayectoria particular. Bajo esta lectura,
          los momentos que exigirán mayor vigilancia quedan claramente delimitados: expansión
          regulatoria, crecimiento de la capacidad analítica, ampliación del IBiM y cierre
          territorial de la conectividad. Allí se concentrará buena parte de la legitimidad futura
          de la hiperpersonalización del bienestar.
        </P>
        <Figura
          numero="18"
          titulo="Matriz de intensidad normalizada de indicadores representativos, 2016–2040"
          imagen={figura18}
          alt="Matriz de calor con la intensidad normalizada por fila de los indicadores representativos entre 2016 y 2040"
          nota="La intensidad se normaliza por fila entre el mínimo y el máximo de cada serie. Las celdas vacías indican ausencia de dato comparable y no valores iguales a cero. En brecha crítica e insuficiencia de bienestar la escala fue invertida para que los tonos más oscuros representen siempre el escenario más favorable."
        />

        <h3 className="modulo-hiper-personalizacion__seccion-referencias">Referencias</h3>
        <ul className="modulo-hiper-personalizacion__referencias">
          <Ref>
            Comfenalco Antioquia &amp; Universidad de Antioquia. (2024). Índice de Bienestar
            Multidimensional (IBiM).
          </Ref>
          <Ref>
            Comfenalco Antioquia. (2025). Balance social y estrategia de bienestar integral.
            Retrieved from{' '}
            <Enlace url="https://www.comfenalcoantioquia.com.co/personas/nosotros/balance-social" />
          </Ref>
          <Ref>
            Consejo de Europa. (1981). Convenio para la protección de las personas con respecto al
            tratamiento automatizado de datos de carácter personal (Convenio 108). Retrieved from{' '}
            <Enlace url="https://www.coe.int/en/web/conventions/full-list?module=treaty-detail&treatynum=108" />
          </Ref>
          <Ref>
            Departamento Administrativo Nacional de Estadística. (2025). Encuesta Nacional de
            Calidad de Vida 2024. Retrieved from{' '}
            <Enlace url="https://www.dane.gov.co/index.php/estadisticas-por-tema/salud/calidad-de-vida-ecv" />
          </Ref>
          <Ref>
            Departamento Nacional de Planeación. (2019). Documento CONPES 3975: Política nacional
            para la transformación digital e inteligencia artificial.
          </Ref>
          <Ref>
            Departamento Nacional de Planeación. (2025). Documento CONPES 4144: Política nacional
            de inteligencia artificial. Departamento Nacional de Planeación. Obtenido de{' '}
            <Enlace url="https://www.dnp.gov.co/publicaciones/Planeacion/Paginas/conpes-4144-hoja-de-ruta-colombia-inteligencia-artificial-retos-actuales-transformacion-futura.aspx" />
          </Ref>
          <Ref>
            European Commission, Joint Research Centre. (2023). AI Watch: Monitoring the
            development, uptake and impact of artificial intelligence for Europe. Retrieved from{' '}
            <Enlace url="https://ai-watch.ec.europa.eu" />
          </Ref>
          <Ref>
            Gobernación de Antioquia. (2024). Plan de Desarrollo Departamental 2024–2027: Por
            Antioquia Firme. Gobernación de Antioquia. Obtenido de{' '}
            <Enlace url="https://asambleadeantioquia.gov.co/proyecto-de-ordenanza-n14-del-29-de-abril-de-2024-por-medio-del-cual-se-adopta-el-plan-de-desarrollo-2024-2027-por-antioquia-firme/" />
          </Ref>
          <Ref>
            Gobernación de Antioquia. (2025). Plan Estratégico de Tecnologías de la Información
            2024–2027. Retrieved from{' '}
            <Enlace url="https://antioquia.gov.co/images/PDF2/Transparencia/2025/02/plan-estrategico-de-tecnologia-de-la-informacion-peti-v2.pdf" />
          </Ref>
          <Ref>
            Ley 1419. (2010). Ley 1419 de 2010, por la cual se establecen los lineamientos para el
            desarrollo de la telesalud en Colombia. Retrieved from Congreso de la República de
            Colombia:{' '}
            <Enlace url="http://www.secretariasenado.gov.co/senado/basedoc/ley_1419_2010.html" />
          </Ref>
          <Ref>
            Ley 2015 . (2020). Ley 2015 de 2020, por medio de la cual se crea la historia clínica
            electrónica interoperable. Retrieved from Congreso de la República de Colombia:{' '}
            <Enlace url="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=105472" />
          </Ref>
          <Ref>
            Obtenido de{' '}
            <Enlace url="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981" />
          </Ref>
          <Ref>
            Ley Estatutaria 1751. (2015). Ley Estatutaria 1751 de 2015, por medio de la cual se
            regula el derecho fundamental a la salud. Retrieved from Congreso de la República de
            Colombia:{' '}
            <Enlace url="https://www.minsalud.gov.co/normatividad_nuevo/ley%201751%20de%202015.pdf" />
          </Ref>
          <Ref>
            Ministerio de Salud y Protección Social. (2019). Nuevo marco reglamentario para la
            telesalud en Colombia. Retrieved from{' '}
            <Enlace url="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/OT/nuevo-marco-reglamentario-para-la-telesalud-en-colombia-18122019.pdf" />
          </Ref>
          <Ref>
            Ministerio de Tecnologías de la Información y las Comunicaciones. (2025). Boletín
            trimestral de las TIC y portal Colombia TIC. Obtenido de{' '}
            <Enlace url="https://colombiatic.mintic.gov.co" />
          </Ref>
          <Ref>
            Ministerio de Tecnologías de la Información y las Comunicaciones. (2025). ConectiVIDAd
            para Cambiar Vidas. Obtenido de <Enlace url="https://www.mintic.gov.co/portal/inicio/" />
          </Ref>
          <Ref>
            OECD. (2025). National artificial intelligence policies and strategies. Retrieved from
            AI Policy Observatory: <Enlace url="https://oecd.ai/en/" />
          </Ref>
          <Ref>
            Organización de las Naciones Unidas. (2024). Pacto Digital Mundial. Retrieved from{' '}
            <Enlace url="https://www.un.org/en/global-digital-compact" />
          </Ref>
          <Ref>
            Organización de las Naciones Unidas para la Educación, la Ciencia y la Cultura.
            (2021). Recomendación sobre la ética de la inteligencia artificial. Retrieved from{' '}
            <Enlace url="https://www.unesco.org/en/artificial-intelligence/recommendation-ethics" />
          </Ref>
          <Ref>
            Organización Mundial de la Salud. (2021). Estrategia mundial sobre salud digital
            2020–2025. Retrieved from{' '}
            <Enlace url="https://www.who.int/publications/i/item/9789240020924" />
          </Ref>
          <Ref>
            Organización para la Cooperación y el Desarrollo Económicos. (2024). Principios de la
            OCDE sobre inteligencia artificial. OCDE. Obtenido de{' '}
            <Enlace url="https://oecd.ai/en/ai-principles" />
          </Ref>
          <Ref>
            Organización para la Cooperación y el Desarrollo Económicos. (2025). Better Life
            Index. Retrieved from <Enlace url="https://www.oecdbetterlifeindex.org" />
          </Ref>
          <Ref>
            Superintendencia de Industria y Comercio. (2025). Protección de datos personales e
            informes de gestión. Retrieved from <Enlace url="https://www.sic.gov.co" />
          </Ref>
          <Ref>
            Unión Europea. (2016). Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo,
            Reglamento General de Protección de Datos. Retrieved from{' '}
            <Enlace url="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679" />
          </Ref>
          <Ref>
            Unión Europea. (2024). Reglamento (UE) 2024/1689 por el que se establecen normas
            armonizadas en materia de inteligencia artificial. Retrieved from{' '}
            <Enlace url="https://eur-lex.europa.eu/eli/reg/2024/1689/oj" />
          </Ref>
          <Ref>
            United Nations Conference on Trade and Development. (2024). Data protection and
            privacy legislation worldwide. Retrieved from{' '}
            <Enlace url="https://unctad.org/page/data-protection-and-privacy-legislation-worldwide" />
          </Ref>
        </ul>
        </article>
      </div>
    </section>
  );
}

export default ModuloHiperPersonalizacion;
