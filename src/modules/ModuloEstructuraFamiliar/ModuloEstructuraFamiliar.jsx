/**
 * ModuloEstructuraFamiliar — Tendencia "Estructura familiar".
 *
 * Artículo "La familia colombiana ya no cabe en una sola imagen. Cambios
 * en la estructura familiar y prospectiva hacia 2050-2060" con el
 * contenido FIJO en el código, igual que Gasto social (decisión del
 * cliente): sin lecturas de .docx/.json en runtime. El texto es
 * transcripción literal del Word del cliente; las 12 figuras van como
 * WebP optimizados (~80 % más livianos que los PNG del documento, texto
 * verificado nítido) con carga perezosa y caché inmutable por hash.
 *
 * Cambios del artículo = editar este código y recompilar (no aplica el
 * contrato de reemplazo de archivos de las tendencias con datos vivos).
 */
import './modulo-estructura-familiar.css';

import figura01 from '../../assets/estructura-familiar/figura-01.webp';
import figura02 from '../../assets/estructura-familiar/figura-02.webp';
import figura03 from '../../assets/estructura-familiar/figura-03.webp';
import figura04 from '../../assets/estructura-familiar/figura-04.webp';
import figura05 from '../../assets/estructura-familiar/figura-05.webp';
import figura06 from '../../assets/estructura-familiar/figura-06.webp';
import figura07 from '../../assets/estructura-familiar/figura-07.webp';
import figura08 from '../../assets/estructura-familiar/figura-08.webp';
import figura09 from '../../assets/estructura-familiar/figura-09.webp';
import figura10 from '../../assets/estructura-familiar/figura-10.webp';
import figura11 from '../../assets/estructura-familiar/figura-11.webp';
import figura12 from '../../assets/estructura-familiar/figura-12.webp';

/* En este documento la parte en negrita del rótulo es "Figura N." y el
   título va en texto normal (al revés que en Gasto social). */
function Figura({ numero, titulo, imagen, alt, nota }) {
  return (
    <figure className="modulo-estructura-familiar__figura">
      <figcaption className="modulo-estructura-familiar__figura-rotulo">
        <strong>Figura {numero}.</strong> {titulo}
      </figcaption>
      <img
        className="modulo-estructura-familiar__figura-imagen"
        src={imagen}
        alt={alt}
        loading="lazy"
      />
      <p className="modulo-estructura-familiar__figura-nota">
        <strong>Nota.</strong> {nota}
      </p>
    </figure>
  );
}

const P = ({ children }) => <p className="modulo-estructura-familiar__parrafo">{children}</p>;
const H3 = ({ children }) => <h3 className="modulo-estructura-familiar__apartado">{children}</h3>;

function ModuloEstructuraFamiliar({ tendencia }) {
  return (
    <section className="modulo-estructura-familiar" aria-labelledby="titulo-estructura-familiar">
      <header className="modulo-estructura-familiar__encabezado">
        <p className="modulo-estructura-familiar__contexto">Tendencias</p>
        <h1 id="titulo-estructura-familiar" className="modulo-estructura-familiar__titulo">
          {tendencia.etiqueta}
        </h1>
        <p className="modulo-estructura-familiar__titulo-articulo">
          La familia colombiana ya no cabe en una sola imagen
        </p>
        <p className="modulo-estructura-familiar__subtitulo-articulo">
          Cambios en la estructura familiar y prospectiva hacia 2050-2060
        </p>
        <p className="modulo-estructura-familiar__fecha-articulo">02-julio-2026</p>
      </header>

      <article className="modulo-estructura-familiar__panel">
        <H3>Una familia que cambió sin hacer ruido</H3>
        <P>
          De entrada, la familia colombiana no se está deshaciendo; está cambiando de forma. Esa
          diferencia es decisiva. El debate público suele moverse entre la nostalgia por un modelo
          familiar más estable y la sorpresa ante nuevas formas de convivencia, pero el movimiento
          de fondo es menos estridente y mucho más profundo: el hogar dejó de ser una unidad social
          homogénea. En una misma ciudad, e incluso en un mismo barrio, conviven parejas con hijos
          pequeños, madres que sostienen solas la crianza, adultos mayores que habitan sin compañía
          diaria, jóvenes que retrasan la unión conyugal, familias recompuestas después de
          separaciones, hogares extendidos que resisten por solidaridad económica y personas que
          comparten vivienda sin vínculos de parentesco. La familia sigue siendo un lugar de
          afecto, cuidado y protección, pero sus bordes se han vuelto más móviles.
        </P>
        <P>
          Durante décadas, buena parte de la organización social colombiana descansó sobre un
          supuesto tácito: detrás de cada trabajador, estudiante, paciente, niño o adulto mayor
          había un hogar relativamente amplio que absorbía parte de las tensiones de la vida
          cotidiana. Sin embargo, ese supuesto empezó a perder firmeza. La reducción de la
          fecundidad, el aumento de la esperanza de vida, la urbanización, la participación
          femenina en el mercado laboral, las separaciones conyugales, la movilidad territorial y
          la búsqueda de autonomía residencial fueron cambiando lentamente el tamaño y la
          composición de los hogares. La consecuencia no es una sociedad sin familia, sino una
          sociedad donde las familias ya no pueden ser leídas desde una sola fotografía.
        </P>
        <P>
          En perspectiva histórica, el cambio tiene una profundidad particular. En 1957, cuando el
          Decreto 118 estableció el subsidio familiar y creó el Servicio Nacional de Aprendizaje,
          Colombia era un país joven, con alta fecundidad, hogares numerosos y una estructura de
          protección social pensada alrededor de familias con varios dependientes. Hacia 2050 y
          2060, el mismo país se acercará a una realidad distinta: menos niños por hogar, más
          personas mayores, más hogares de una sola persona y una mayor diversidad de arreglos
          familiares. La prospectiva permite leer esa distancia temporal no como simple sucesión de
          años, sino como una transformación de la vida doméstica que reorganiza necesidades,
          vínculos y formas de apoyo.
        </P>
        <P>
          Por esa razón, la siguiente línea de tiempo resume una transición de época. No pretende
          reducir la historia familiar colombiana a unos pocos hitos, sino señalar el
          desplazamiento de fondo: de una sociedad donde el hogar numeroso era el punto de partida
          de la protección cotidiana, a otra donde el cuidado y la convivencia se distribuyen en
          hogares más pequeños, menos previsibles y más vulnerables a la pérdida de redes cercanas.
        </P>
        <Figura
          numero="1"
          titulo="Transición histórica de la estructura familiar colombiana y horizonte prospectivo hacia 2060"
          imagen={figura01}
          alt="Línea de tiempo desde el hito institucional de 1957 hasta el horizonte 2050-2060, con señales demográficas y escenarios familiares de largo plazo"
          nota="La línea conecta el hito institucional de 1957 con señales demográficas y escenarios familiares de largo plazo. El horizonte 2050-2060 corresponde a una lectura prospectiva construida a partir de series demográficas DANE-ONU, antecedentes del DNP y estimaciones tendenciales de estructura de hogares. Elaboración propia."
        />

        <H3>Cuando el hogar empezó a hacerse más pequeño</H3>
        <P>
          Para empezar, el primer indicio del cambio es sencillo, pero poderoso: Colombia tiene más
          hogares y, al mismo tiempo, hogares más pequeños. El boletín del Observatorio del
          Bienestar de la Niñez, construido a partir de la Encuesta Nacional de Calidad de Vida,
          muestra que entre 2018 y 2024 el número de hogares aumentó 19,3 %, mientras el promedio
          de personas por hogar cayó de 3,15 a 2,86. La cifra dice más de lo que parece. No solo
          hay más viviendas o más unidades domésticas; hay una forma distinta de organizar la vida
          cotidiana. Cada hogar carga con menos integrantes, pero también con menos manos
          disponibles para compartir tareas, gastos y cuidado.
        </P>
        <P>
          A la vez, la reducción del tamaño del hogar no ocurre aislada. El DNP ya había observado,
          con información de 1993, 2003 y 2014, que los hogares no familiares aumentaron con fuerza
          y que los unipersonales casi triplicaron su importancia relativa durante ese período. En
          1993, los hogares unipersonales representaban 5,1 % del total; en 2014 llegaron a
          13,1 %. La Encuesta de Calidad de Vida confirma que la tendencia continuó: en 2024, los
          hogares unipersonales alcanzaron 19,8 % y los hogares no familiares 20,4 %. El país no
          solo envejece o se urbaniza; también aprende a vivir en unidades domésticas más
          reducidas.
        </P>
        <P>
          En paralelo, el otro lado de la transformación aparece en la pérdida de centralidad
          relativa del hogar biparental. La familia con dos adultos y presencia de hijos continúa
          siendo relevante, pero ya no ordena el conjunto de la vida familiar con la fuerza de
          antes. Según la caracterización reciente, la proporción de hogares biparentales descendió
          de 56,9 % en 2018 a 51,5 % en 2024, mientras los monoparentales y unipersonales crecieron
          con mayor rapidez. En términos absolutos, entre 2018 y 2024 los hogares biparentales
          aumentaron 8,5 %, pero los monoparentales crecieron 30,3 % y los unipersonales 45,0 %. La
          diferencia de ritmo es la señal más reveladora: el hogar tradicional no desaparece, pero
          las formas alternativas avanzan mucho más rápido.
        </P>
        <P>
          A partir de allí, la figura siguiente permite mirar el cambio por grandes momentos. Su
          utilidad no está únicamente en mostrar diferencias entre pasado, presente y pronóstico,
          sino en hacer visible la dirección del movimiento: menos personas por hogar, menor peso
          de los arreglos biparentales, más hogares monoparentales, más hogares unipersonales y
          mayor presencia de jefatura femenina. La lectura prospectiva no consiste en asumir que el
          futuro repetirá mecánicamente el pasado, sino en reconocer que las tendencias recientes
          ya empujan al país hacia una estructura doméstica más fragmentada y diversa.
        </P>
        <Figura
          numero="2"
          titulo="El hogar colombiano empezó a moverse hacia una nueva escala"
          imagen={figura02}
          alt="Comparación de tres momentos de la transición familiar (histórico, observado y prospectivo) en tamaño del hogar, presencia biparental, vida unipersonal, monoparentalidad y jefatura femenina"
          nota="La figura compara tres momentos de la transición familiar: histórico, observado y prospectivo. Los rangos muestran cómo se desplazan el tamaño del hogar, la presencia biparental, la vida unipersonal, la monoparentalidad y la jefatura femenina. Fuente: cálculos propios con base en DNP/ECV 1993-2014, DANE ECV 2018-2024 y series demográficas DANE-ONU."
        />

        <H3>Vivir solo ya no es una excepción</H3>
        <P>
          Ahora bien, entre todos los cambios, el crecimiento del hogar unipersonal es quizá el más
          expresivo de la nueva vida social. Vivir solo puede significar independencia, estabilidad
          económica y capacidad de decisión, especialmente en adultos jóvenes o personas con
          ingresos suficientes. Pero también puede significar viudez, separación, fragilidad
          económica, aislamiento o ausencia de una red cotidiana de apoyo. La misma categoría
          estadística contiene realidades muy distintas. Por eso, la prospectiva no puede leer el
          hogar unipersonal como una simple preferencia residencial: debe entenderlo como una forma
          de vida que puede ser autonomía en una etapa y vulnerabilidad en otra.
        </P>
        <P>
          Al mismo tiempo, el aumento de los hogares unipersonales se conecta con dos procesos que
          avanzan juntos. Por un lado, las generaciones jóvenes prolongan la educación, retrasan la
          unión en pareja, postergan la llegada de los hijos o deciden no tenerlos. Por otro lado,
          la población mayor vive más años y, en muchos casos, atraviesa la vejez con menos hijos
          disponibles, hijos que migraron o redes familiares más dispersas. En los dos extremos del
          ciclo vital aparece la misma pregunta: qué ocurre cuando el hogar deja de ser amplio y la
          vida cotidiana depende de una sola persona.
        </P>
        <P>
          Por su parte, los hogares monoparentales plantean otra dimensión del cambio. No son
          nuevos, pero crecen y se hacen más visibles. Su expansión no debe interpretarse de manera
          uniforme, porque puede resultar de separaciones, viudez, maternidad o paternidad sin
          convivencia con pareja, migración o recomposición familiar. Sin embargo, hay una
          constante: concentran con mayor frecuencia cargas simultáneas de ingreso, crianza, tiempo
          y cuidado. El DNP ya señalaba que la monoparentalidad venía creciendo como una de las
          nuevas formas de organización familiar; la ECV 2024 confirma que estos hogares
          representan cerca de una cuarta parte de la estructura agregada cuando se incluyen
          núcleos y hogares amplios.
        </P>
        <P>
          En esa misma dirección, la tercera señal es la jefatura femenina. Entre 2018 y 2024, los
          hogares encabezados por mujeres pasaron de 37,3 % a 46,5 %, según la caracterización
          elaborada con la ECV. El dato no solo expresa mayor vulnerabilidad en algunos hogares;
          también muestra un cambio cultural en el reconocimiento de la autoridad, el ingreso y la
          responsabilidad doméstica de las mujeres. En los hogares monoparentales, la jefatura
          femenina sigue siendo predominante; en los biparentales, su aumento sugiere que la idea
          de un jefe masculino por defecto pierde fuerza. La transformación del hogar colombiano
          también es una transformación de género.
        </P>
        <P>
          Con esa perspectiva, la figura siguiente muestra el crecimiento proyectado de tres formas
          de hogar o liderazgo doméstico que ganan presencia en la estructura social: los hogares
          monoparentales, los hogares unipersonales y los hogares con jefatura femenina. El valor
          de la visualización está en mostrar que el cambio no se concentra en una sola categoría,
          sino que avanza por varios frentes: menos convivencia numerosa, más hogares sostenidos
          por una sola persona adulta y más reconocimiento femenino en la conducción del hogar.
        </P>
        <Figura
          numero="3"
          titulo="Formas de hogar en expansión, 2025-2050"
          imagen={figura03}
          alt="Series proyectadas 2025-2050 de hogares monoparentales, hogares unipersonales y hogares con jefatura femenina, con tramo observado y escenario tendencial"
          nota="La línea continua corresponde al tramo observado y la línea discontinua al escenario tendencial 2026-2050. Las cifras proyectadas deben leerse como trayectoria de referencia, no como pronóstico oficial. Fuente: cálculos propios con base en DNP/ECV 1993-2014, DANE ECV 2018-2024 y estimación tendencial."
        />

        <H3>El futuro no será una familia única, sino muchas formas de hogar</H3>
        <P>
          Desde una mirada de largo plazo, la pregunta prospectiva no es si la familia colombiana
          sobrevivirá al cambio, sino qué tipo de hogares organizarán la vida social hacia mitad de
          siglo. La evidencia disponible sugiere que el país no se dirige hacia una ruptura
          absoluta con la familia, sino hacia una mayor pluralidad de formas de convivencia. El
          hogar biparental seguirá existiendo, pero compartirá espacio con hogares unipersonales,
          monoparentales, recompuestos, extendidos por necesidad económica, parejas sin hijos,
          adultos mayores solos y arreglos residenciales más flexibles. El mosaico familiar será
          menos excepcional y más cotidiano.
        </P>
        <P>
          Sin embargo, ese mosaico no se distribuye de manera homogénea. Los hogares de mayores
          ingresos suelen avanzar primero hacia etapas más tardías de la transición demográfica:
          menos hijos, más hogares sin niños y más vida independiente. En los hogares de menores
          ingresos, las estructuras extensas pueden persistir como estrategia de sobrevivencia,
          porque compartir vivienda permite repartir gastos, cuidado y riesgos. El DNP ya había
          identificado que los hogares amplios eran más frecuentes en los grupos de menores
          ingresos, mientras que los hogares no familiares crecían en los quintiles altos. En otras
          palabras, la diversificación familiar no siempre significa libertad de elección; a veces
          expresa autonomía, y otras veces expresa adaptación frente a restricciones económicas.
        </P>
        <P>
          Bajo esa lectura, la distribución de los datos observados frente al pronóstico ayuda a
          reconocer la distancia entre el país que fue y el país que se está formando. El tamaño
          promedio del hogar se desplaza hacia niveles más bajos; los hogares biparentales se
          acercan a una proporción menor; los unipersonales y los monoparentales se ubican en
          rangos más altos; y la jefatura femenina aparece como una de las señales más fuertes de
          reorganización social. Esta lectura no debe asumirse como destino cerrado. Las
          trayectorias pueden acelerarse o moderarse según fecundidad, migración, empleo, vivienda,
          ingresos, salud, cuidado y cambios culturales. Sin embargo, el sentido general de la
          transformación ya está trazado.
        </P>
        <P>
          En consecuencia, la siguiente figura no debe verse como una pieza aislada de estadística,
          sino como una manera de observar el corrimiento del centro familiar. Allí el pasado y el
          escenario futuro dejan de aparecer como puntos separados: empiezan a verse como dos
          momentos de una misma historia social, una en la que el hogar numeroso pierde espacio y
          los hogares pequeños se vuelven cada vez más comunes.
        </P>
        <Figura
          numero="4"
          titulo="Dos países domésticos: el que fue y el que se aproxima"
          imagen={figura04}
          alt="Contraste entre la distribución observada y el escenario prospectivo de las variables familiares, con curvas y líneas de referencia que muestran el desplazamiento hacia hogares más pequeños y diversos"
          nota="La figura contrasta la distribución observada con el escenario prospectivo. Las curvas y las líneas de referencia permiten observar el desplazamiento de las variables familiares hacia hogares más pequeños, más diversos y menos dependientes de una estructura única. Fuente: cálculos propios con base en DNP/ECV 1993-2014, DANE ECV 2018-2024 y proyección tendencial 2026-2050."
        />

        <H3>Lo que cambia cuando cambia el hogar</H3>
        <P>
          En la vida cotidiana, la transformación familiar no se agota en la forma de convivencia.
          Cambia la manera como se resuelven las tareas básicas de la vida diaria. Un hogar amplio
          puede distribuir el cuidado infantil entre varios adultos; un hogar monoparental debe
          resolverlo con menos tiempo y menos margen de ingreso. Un hogar unipersonal joven puede
          necesitar vivienda flexible, conectividad y redes sociales; un hogar unipersonal mayor
          puede requerir acompañamiento, salud de proximidad y prevención de aislamiento. Un hogar
          extendido puede ofrecer apoyo interno, pero también enfrentar hacinamiento, dependencia
          económica y tensiones entre generaciones. La misma palabra hogar cubre arreglos con
          riesgos muy distintos.
        </P>
        <P>
          De manera complementaria, la evidencia de pobreza multidimensional refuerza esta lectura.
          El análisis del ICBF y el SNBF muestra que, aunque la pobreza multidimensional disminuyó
          entre 2018 y 2024, las privaciones se distribuyen de manera desigual según el ciclo de
          vida del hogar. Los hogares con hijos menores enfrentan mayores presiones en vivienda,
          cuidado, rezago escolar y percepción de insuficiencia de ingresos. Las parejas mayores
          sin hijos concentran privaciones educativas y de empleo, mientras que los hogares en
          etapas iniciales pueden enfrentar barreras de cuidado infantil que afectan la
          participación laboral, especialmente de las mujeres. La estructura del hogar, por tanto,
          no es un dato de contexto: es una clave para comprender cómo se acumulan o se alivian las
          vulnerabilidades.
        </P>
        <P>
          Por consiguiente, en un país más viejo, más urbano y con hogares más pequeños, el cuidado
          deja de ser una tarea escondida dentro de la familia y se convierte en una pregunta
          social de primer orden. La vejez no llegará solamente a hogares tradicionales con varios
          hijos disponibles; llegará también a personas que viven solas, parejas mayores sin hijos
          en casa, hogares con hijos adultos que aún no logran independencia económica y familias
          donde una sola persona adulta sostiene el ingreso y la crianza. La carga no será
          uniforme. Algunos hogares tendrán recursos para comprar servicios, adaptar vivienda o
          sostener redes privadas; otros dependerán de apoyos comunitarios, familiares e
          institucionales mucho más frágiles.
        </P>
        <P>
          Por eso, la siguiente figura debe entenderse como una síntesis interpretativa y no como
          una medición directa. Su propósito es ordenar, de manera prospectiva, las
          vulnerabilidades que podrían pesar de forma distinta según el tipo de hogar. La lectura
          permite observar que el hogar monoparental concentra presión de ingreso y cuidado
          infantil; el hogar unipersonal mayor expone con más fuerza la soledad, el cuidado mayor y
          las redes débiles; y el hogar extendido puede funcionar como refugio familiar, pero
          también concentrar hacinamiento y dependencia económica. La utilidad de esta mirada está
          en mostrar que el futuro de las familias no podrá leerse con un promedio nacional único.
        </P>
        <Figura
          numero="5"
          titulo="Vulnerabilidades diferenciales según tipo de hogar"
          imagen={figura05}
          alt="Escala analítica de 1 a 5 que compara riesgos relativos de hogares monoparentales, unipersonales mayores y extendidos en dimensiones como ingreso, cuidado, soledad y hacinamiento"
          nota="Escala analítica de 1 a 5 elaborada para fines prospectivos. Los valores sintetizan riesgos relativos asociados a hogares monoparentales, unipersonales mayores y extendidos; por tanto, deben interpretarse como lectura cualitativa basada en tendencias demográficas, evidencia de hogares e indicadores de bienestar. Elaboración propia."
        />

        <H3>El punto de quiebre: menos hijos, hogares más pequeños</H3>
        <P>
          En consecuencia, la transformación del hogar colombiano puede leerse desde una relación
          muy concreta: cuando la fecundidad desciende, el tamaño del hogar se reduce y la vida
          unipersonal gana espacio. No se trata solo de una secuencia demográfica. Detrás de esa
          curva hay decisiones íntimas, costos de vida, proyectos educativos, inserción laboral
          femenina, acceso a vivienda, postergación de la maternidad y nuevas formas de imaginar la
          independencia. El dato demográfico se convierte así en una ventana hacia la vida
          cotidiana: menos hijos por mujer no significa únicamente menos nacimientos, sino una
          reorganización de los tiempos, los gastos, las prioridades y las redes de apoyo.
        </P>
        <P>
          En ese sentido, la figura siguiente muestra la transición desde una Colombia de
          fecundidad alta y hogares numerosos hacia un escenario de menor fecundidad, hogares más
          pequeños y mayor presencia de hogares unipersonales. La burbuja crece a medida que vivir
          solo deja de ser marginal. El movimiento completo sugiere que la reducción del hogar no
          es un fenómeno secundario, sino una de las formas más visibles en que la transición
          demográfica entra a la casa.
        </P>
        <Figura
          numero="6"
          titulo="El punto de quiebre: fecundidad, tamaño del hogar y vida unipersonal"
          imagen={figura06}
          alt="Diagrama de burbujas con la tasa global de fecundidad en el eje horizontal, las personas por hogar en el vertical y el tamaño de la burbuja según la participación de hogares unipersonales, coloreado por año"
          nota="El eje horizontal representa la tasa global de fecundidad y el eje vertical el promedio de personas por hogar; el tamaño de la burbuja aproxima la participación de hogares unipersonales y el color identifica el año. Fuente: cálculos propios a partir de DNP/ECV 1993-2014, DANE ECV 2019-2025 y proyección tendencial 2026-2050."
        />

        <H3>Cuando envejece el hogar, también cambia quién lo encabeza</H3>
        <P>
          Asimismo, el envejecimiento del ciclo de vida no avanza solo. En el mismo movimiento
          crece el reconocimiento de mujeres como responsables del hogar, tanto por
          transformaciones culturales como por separaciones, viudez, autonomía económica y
          reorganización de los vínculos familiares. La trayectoria no debe leerse únicamente como
          aumento de jefatura femenina, sino como señal de una arquitectura doméstica menos
          dependiente de la figura masculina tradicional como eje reconocido del hogar.
        </P>
        <P>
          Al observar esta relación, se aprecia una transición de largo aliento: la sociedad pasa
          de una baja edad mediana y baja jefatura femenina hacia una combinación de mayor edad
          mediana y mayor reconocimiento femenino en la conducción del hogar. En términos sociales,
          esto significa que la autoridad doméstica, el cuidado y la administración del ingreso ya
          no se ordenan de la misma manera que en el pasado. El hogar cambia de tamaño, pero
          también cambia de mando, de responsabilidades y de equilibrios internos.
        </P>
        <Figura
          numero="7"
          titulo="Cuando envejece el hogar, también cambia quién lo encabeza"
          imagen={figura07}
          alt="Diagrama de burbujas que relaciona la edad mediana con el porcentaje de hogares con jefatura femenina; el tamaño de la burbuja representa el índice de envejecimiento y el color el año"
          nota="La figura ubica la relación entre edad mediana y porcentaje de hogares con jefatura femenina. El tamaño de la burbuja representa el índice de envejecimiento 60+/0-14 y el color corresponde al año. Fuente: cálculos propios a partir de series históricas y escenario prospectivo 2026-2050."
        />

        <H3>La expansión de la vida unipersonal</H3>
        <P>
          De igual manera, el crecimiento de los hogares unipersonales aparece como una señal
          especialmente reveladora porque condensa varias transiciones al mismo tiempo. La edad
          mediana aumenta, los hogares se hacen más pequeños y vivir solo deja de ser una situación
          marginal. En el tramo histórico, esta forma de hogar aparecía como excepción; en el
          escenario prospectivo, se convierte en una pieza central de la nueva vida residencial.
        </P>
        <P>
          Además, la vida unipersonal no puede entenderse como una sola experiencia. En unos casos
          se asocia con autonomía, educación, empleo urbano y capacidad de consumo; en otros, con
          vejez sin compañía cotidiana, viudez, separación o redes familiares debilitadas. Por
          ello, cuando la figura concentra el pronóstico en valores más altos de edad mediana y
          unipersonalidad, no solo habla de viviendas ocupadas por una persona: habla de una
          sociedad que tendrá que pensar la compañía, el cuidado, la seguridad y la pertenencia de
          manera distinta.
        </P>
        <Figura
          numero="8"
          titulo="La vida unipersonal como nuevo centro de gravedad residencial"
          imagen={figura08}
          alt="Comparación de la concentración histórica y observada frente al escenario pronosticado 2026-2050, según edad mediana y participación de hogares unipersonales, con líneas punteadas en los promedios por período"
          nota="La figura compara la concentración histórica/observada con el escenario pronosticado 2026-2050, a partir de edad mediana y participación de hogares unipersonales. Las líneas punteadas señalan los promedios por período. Fuente: elaboración propia con base en datos históricos, observados y proyección tendencial."
        />
        <P>
          Por consiguiente, la comparación entre el tramo histórico y el pronóstico ayuda a
          dimensionar el desplazamiento. El cambio no se limita a una variación gradual de
          porcentajes; implica un corrimiento del centro de gravedad de la vida doméstica. Donde
          antes predominaban hogares más numerosos, con más niños y mayor presencia biparental, el
          escenario futuro concentra hogares más pequeños, más envejecidos y con mayor presencia de
          personas solas o mujeres reconocidas como responsables del hogar.
        </P>
        <Figura
          numero="9"
          titulo="Una nueva distribución de la vida doméstica"
          imagen={figura09}
          alt="Diagramas de caja que comparan la distribución histórica y observada con el escenario de pronóstico 2026-2050 de las variables de la vida doméstica, con mediana y dispersión"
          nota="La figura compara la distribución histórica/observada con el escenario de pronóstico 2026-2050. Las cajas internas muestran mediana y dispersión. Fuente: cálculos propios a partir de DNP/ECV, DANE ECV y proyección tendencial."
        />

        <H3>La transformación vista como sistema</H3>
        <P>
          Ahora bien, la transición familiar no ocurre como una suma de fenómenos aislados. Las
          variables se mueven en conjunto y revelan la arquitectura interna del cambio: el descenso
          de la población infantil se asocia con hogares más pequeños y menor fecundidad, mientras
          el envejecimiento, la edad mediana, la unipersonalidad y la jefatura femenina tienden a
          avanzar en la misma dirección. La familia cambia como sistema, no como inventario de
          categorías sueltas.
        </P>
        <P>
          Por eso, la siguiente figura resulta útil cuando se lee sin perder de vista la historia
          que hay detrás de los números. Las relaciones estadísticas no sustituyen el análisis
          social, pero permiten reconocer qué señales caminan juntas. Allí se observa que el
          aumento de la población mayor, la edad mediana, el índice de envejecimiento, los hogares
          unipersonales y la jefatura femenina forman parte de una misma corriente de
          transformación; en sentido contrario, la fecundidad, la población infantil, las personas
          por hogar y el peso biparental quedan asociadas al país más joven y expansivo que se va
          quedando atrás.
        </P>
        <Figura
          numero="10"
          titulo="Las señales que se mueven juntas en el cambio familiar"
          imagen={figura10}
          alt="Matriz de correlaciones entre variables demográficas y familiares; los tonos azules indican relaciones negativas y los rojos relaciones positivas"
          nota="La figura cruza variables demográficas y familiares para identificar señales que avanzan en la misma dirección. Los tonos azules indican relaciones negativas y los tonos rojos relaciones positivas. Fuente: cálculos propios a partir de la base integrada de estructura familiar y transición demográfica."
        />
        <P>
          En esa misma línea, el mapa que sigue resume la dirección general del cambio. La
          trayectoria temporal se aleja del patrón asociado con mayor fecundidad, más población
          infantil, más personas por hogar y mayor peso biparental. En sentido contrario, se
          aproxima a un escenario marcado por envejecimiento, hogares unipersonales, mayor edad
          mediana y reconocimiento femenino en la jefatura del hogar. La figura permite ver, de una
          sola vez, el viaje social de varias décadas.
        </P>
        <Figura
          numero="11"
          titulo="El mapa de una familia que cambió de dirección"
          imagen={figura11}
          alt="Biplot de componentes principales con la trayectoria temporal 1950-2050 y flechas que indican la dirección de las variables familiares y demográficas"
          nota="La figura resume la dirección conjunta de las variables familiares y demográficas. Las flechas indican hacia dónde se mueve el cambio y los puntos muestran la trayectoria temporal. Fuente: elaboración propia con base en series históricas, observadas y pronosticadas."
        />

        <H3>La trama interna del cambio</H3>
        <P>
          Cuando el país envejece, también cambia el tamaño de los hogares; cuando los hogares se
          reducen, vivir solo deja de ser excepcional; cuando las trayectorias familiares se
          diversifican, la jefatura femenina gana visibilidad. La transición no se expresa en un
          solo indicador, sino en la forma como varios rasgos avanzan juntos y van dibujando una
          nueva vida doméstica.
        </P>
        <P>
          De este modo, la figura no solo confirma relaciones estadísticas. También deja ver una
          narración de fondo: el país que en el pasado tuvo hogares más grandes, más fecundidad y
          mayor presencia de niños empieza a moverse hacia un país con más años de vida, más
          hogares pequeños y mayor necesidad de redes que compensen la reducción del soporte
          familiar cotidiano. La familia sigue siendo central, pero ya no puede cargar sola con las
          mismas tareas.
        </P>
        <Figura
          numero="12"
          titulo="La trama interna del cambio familiar"
          imagen={figura12}
          alt="Matriz de dispersión que cruza edad mediana, personas por hogar, hogares unipersonales y hogares con jefatura femenina, diferenciando el período histórico del escenario de pronóstico"
          nota="La figura cruza edad mediana, personas por hogar, hogares unipersonales y hogares con jefatura femenina. El color diferencia el período histórico/observado del escenario de pronóstico 2026-2050. Fuente: elaboración propia con base en la base integrada del artículo."
        />
        <P>
          En conjunto, el cambio relevante no consiste solamente en que crezcan unos arreglos y
          disminuyan otros, sino en que la vida doméstica colombiana empieza a organizarse bajo
          reglas distintas: menos integrantes, más años de vida, más autonomía individual, más
          hogares sin niños y mayor necesidad de redes que compensen la reducción del soporte
          familiar cotidiano.
        </P>

        <H3>Una prospectiva para la vida cotidiana</H3>
        <P>
          De cara al horizonte 2050-2060, la estructura familiar colombiana entra con una tensión
          de fondo: habrá más hogares, pero no necesariamente más redes familiares disponibles
          dentro de cada hogar. Ese cambio altera la vida cotidiana de manera concreta. La crianza
          puede descansar sobre menos adultos; la vejez puede transcurrir con menos compañía; la
          vivienda puede requerir soluciones para personas solas, hogares pequeños o familias
          reconstituidas; la recreación y el bienestar pueden dejar de pensarse solo para familias
          nucleares con hijos; y la salud preventiva tendrá que reconocer que el aislamiento, el
          cuidado y la fragilidad económica también se organizan desde la composición del hogar.
        </P>
        <P>
          No obstante, el futuro familiar colombiano no será homogéneo. En unas zonas, la
          expansión de hogares unipersonales estará asociada con autonomía, educación, empleo
          urbano y cambios culturales. En otras, la persistencia de hogares extendidos seguirá
          siendo una forma de resistencia económica frente a ingresos insuficientes. En algunos
          grupos, la jefatura femenina expresará mayor autonomía y reconocimiento; en otros,
          seguirá concentrando cargas de cuidado, informalidad y menores ingresos. La prospectiva
          exige sostener esa ambivalencia: el mismo cambio puede ser avance para unos hogares y
          presión para otros.
        </P>
        <P>
          Así, la imagen dominante de la familia colombiana ya no puede ser una casa llena
          organizada alrededor de una sola estructura. Hacia mitad de siglo, el país se parecerá
          más a un conjunto de arreglos domésticos que conviven, se superponen y cambian durante el
          curso de vida. La familia seguirá siendo un lugar de pertenencia, pero cada vez dependerá
          más de redes externas, servicios de cercanía, protección económica, espacios comunitarios
          y formas de cuidado que reconozcan su diversidad real. En esa dirección, la pregunta de
          fondo no será cómo volver al hogar del pasado, sino cómo leer con suficiente anticipación
          los hogares que ya empezaron a formar el país del futuro.
        </P>

        <h2 className="modulo-estructura-familiar__seccion-referencias">Referencias</h2>
        <ul className="modulo-estructura-familiar__referencias">
          <li className="modulo-estructura-familiar__referencia">
            DANE. (2024). Encuesta Nacional de Calidad de Vida 2024.
          </li>
          <li className="modulo-estructura-familiar__referencia">
            DANE. (2025). Proyecciones de población y estudios demográficos.
          </li>
          <li className="modulo-estructura-familiar__referencia">
            Decreto 118. (1957). Decreto 118 de 1957: Por el cual se decretan aumentos de salarios,
            se establece el subsidio familiar y se crea el Servicio Nacional de Aprendizaje, SENA.
          </li>
          <li className="modulo-estructura-familiar__referencia">
            ICBF. (2024). Datos para el cambio: Caracterización de las familias en Colombia a
            partir de la Encuesta Nacional de Calidad de Vida (ECV).
          </li>
          <li className="modulo-estructura-familiar__referencia">
            Observatorio de Políticas de las Familias. (2016). Tipologías de familias en Colombia:
            Evolución 1993-2014.
          </li>
          <li className="modulo-estructura-familiar__referencia">
            Ullmann, H., Maldonado Valera, C., &amp; Rico, M. N. (2014). La evolución de las
            estructuras familiares en América Latina, 1990-2010: Los retos de la pobreza, la
            vulnerabilidad y el cuidado.
          </li>
          <li className="modulo-estructura-familiar__referencia">
            United Nations. (2024). World Population Prospects 2024. United Nations.
          </li>
        </ul>
      </article>
    </section>
  );
}

export default ModuloEstructuraFamiliar;
