/**
 * ModuloGastoSocial — Tendencia "Gasto social".
 *
 * Artículo "Proyección del gasto social público en Colombia, 2025–2050"
 * con el contenido FIJO en el código (decisión del cliente, 2026-08-17):
 * el documento no variará, así que no se lee ningún .docx ni .json en
 * tiempo de ejecución — texto, ecuaciones y figuras viajan en el propio
 * bundle y cargan al instante. El texto es transcripción literal del
 * Word del cliente (incluidos sus guiones y encabezados tal cual); las
 * ecuaciones se componen con HTML/CSS propios (sin librerías, compatible
 * con la CSP) siguiendo la estructura OMML del documento; las 14 figuras
 * son las imágenes del documento, servidas como assets estáticos con
 * hash (caché inmutable).
 *
 * Si el cliente entrega una versión nueva del artículo, este módulo se
 * actualiza editando el código y recompilando (no aplica el contrato de
 * reemplazo de archivos de las demás tendencias).
 */
import './modulo-gasto-social.css';

import figura01 from '../../assets/gasto-social/figura-01.png';
import figura02 from '../../assets/gasto-social/figura-02.png';
import figura03 from '../../assets/gasto-social/figura-03.png';
import figura04 from '../../assets/gasto-social/figura-04.png';
import figura05 from '../../assets/gasto-social/figura-05.png';
import figura06 from '../../assets/gasto-social/figura-06.png';
import figura07 from '../../assets/gasto-social/figura-07.png';
import figura08 from '../../assets/gasto-social/figura-08.png';
import figura09 from '../../assets/gasto-social/figura-09.png';
import figura10 from '../../assets/gasto-social/figura-10.png';
import figura11 from '../../assets/gasto-social/figura-11.png';
import figura12 from '../../assets/gasto-social/figura-12.png';
import figura13 from '../../assets/gasto-social/figura-13.png';
import figura14 from '../../assets/gasto-social/figura-14.png';

/* ── Piezas de composición matemática (HTML/CSS, sin librerías) ──── */

/** Variable en cursiva (los operadores y funciones van rectos). */
const V = ({ children }) => <i className="modulo-gasto-social__var">{children}</i>;

/** Fracción vertical. */
const Frac = ({ num, den }) => (
  <span className="modulo-gasto-social__frac">
    <span className="modulo-gasto-social__frac-num">{num}</span>
    <span className="modulo-gasto-social__frac-den">{den}</span>
  </span>
);

/** Sumatoria con su índice debajo, como en el documento. */
const Suma = ({ indice }) => (
  <span className="modulo-gasto-social__suma">
    <span className="modulo-gasto-social__suma-signo">∑</span>
    <span className="modulo-gasto-social__suma-indice">{indice}</span>
  </span>
);

/** Ecuación de bloque: se expone como imagen con lectura textual. */
const Ecuacion = ({ lectura, children }) => (
  <div className="modulo-gasto-social__ecuacion" role="img" aria-label={lectura}>
    {children}
  </div>
);

/** Ecuación en línea dentro de un párrafo. */
const Mat = ({ lectura, children }) => (
  <span className="modulo-gasto-social__mate" role="img" aria-label={lectura}>
    {children}
  </span>
);

/** Marcador de cita [n], en negrita como en el documento. */
const Cita = ({ n }) => <strong className="modulo-gasto-social__cita">[{n}]</strong>;

/* ── Figura del artículo ─────────────────────────────────────────── */

function Figura({ numero, titulo, imagen, alt, nota }) {
  return (
    <figure className="modulo-gasto-social__figura">
      <figcaption className="modulo-gasto-social__figura-rotulo">
        Figura {numero}. <strong>{titulo}</strong>
      </figcaption>
      <img className="modulo-gasto-social__figura-imagen" src={imagen} alt={alt} loading="lazy" />
      <p className="modulo-gasto-social__figura-nota">
        <strong>Nota.</strong> {nota}
      </p>
    </figure>
  );
}

/* Nota común de las figuras 1 a 8 (texto del documento). */
const NOTA_SERIE =
  'La línea continua corresponde a la serie observada 2010-2024 y la línea punteada a la ' +
  'proyección 2025-2050. La franja indica el rango prospectivo de la estimación.';

const P = ({ children }) => <p className="modulo-gasto-social__parrafo">{children}</p>;
const H2 = ({ children }) => <h2 className="modulo-gasto-social__seccion">{children}</h2>;
const H3 = ({ children }) => <h3 className="modulo-gasto-social__apartado">{children}</h3>;

function ModuloGastoSocial({ tendencia }) {
  return (
    <section className="modulo-gasto-social" aria-labelledby="titulo-gasto-social">
      <header className="modulo-gasto-social__encabezado">
        <p className="modulo-gasto-social__contexto">Tendencias</p>
        <h1 id="titulo-gasto-social" className="modulo-gasto-social__titulo">
          {tendencia.etiqueta}
        </h1>
        <p className="modulo-gasto-social__titulo-articulo">
          Proyección del gasto social público en Colombia, 2025–2050: un modelo VAR composicional
          con choque estructural
        </p>
      </header>

      <article className="modulo-gasto-social__panel">
        {/* ═══ Introducción y metodología ═══ */}
        <H2>Introducción</H2>
        <P>
          El presupuesto público suele leerse como una cifra que crece o se contrae de un año a
          otro. Pero hay otra forma, menos obvia y más informativa, de leer el gasto social: no
          como un monto, sino como una composición — una torta que siempre suma 100 % y cuyas
          porciones se disputan espacio entre sí. Cuando la porción de vejez crece, alguna otra
          familia, vivienda, empleo necesariamente se encoge. Proyectar el gasto social hacia 2050
          no es, entonces, solo un ejercicio de extrapolar tendencias: es anticipar cómo se reparte
          una torta de tamaño fijo entre nueve necesidades que envejecen, se transforman y compiten
          de manera distinta con el paso del tiempo.
        </P>
        <P>
          La pregunta que orienta este pronóstico no es, por tanto, cuánto gastará el Estado
          colombiano en protección social durante los próximos 25 años, sino en qué se concentrará
          ese gasto, y por qué. Responderla exige un modelo que entienda tres cosas a la vez: que
          las nueve áreas de política social se mueven en conjunto y no de forma aislada; que el
          entorno macroeconómico —crecimiento, inflación, empleo, envejecimiento— deja huellas
          medibles sobre esa composición; y que, de tanto en tanto, una reforma de política pública
          rompe la tendencia en lugar de acompañarla suavemente.
        </P>

        <H3>Un modelo para datos</H3>
        <P>
          Las nueve áreas del gasto social público vejez, salud, familia, programas de mercado
          laboral, desempleo, vivienda, sobrevivientes, prestaciones por incapacidad y otras áreas—
          no son series independientes. Son datos composicionales: proporciones que, por
          definición, suman 100 % cada año <Cita n="1" />. Una regresión lineal ordinaria, ajustada
          serie por serie, ignoraría esa restricción y podría producir pronósticos que no cuadran
          entre sí o que se extrapolan sin límite. Por esa razón se utilizó un{' '}
          <strong>Vector Autorregresivo (VAR)</strong> — la metodología natural cuando varias
          series comparten dinámica conjunta —, aplicado sobre una transformación que traslada las
          proporciones a un espacio sin restricciones.
        </P>
        <P>
          La transformación utilizada es el logaritmo-cociente centrado (centered log-ratio, CLR),
          estándar en el análisis de datos composicionales <Cita n="1" />:
        </P>
        <Ecuacion lectura="y sub i coma t igual a logaritmo natural de p sub i coma t, menos un noveno por la sumatoria en j del logaritmo natural de p sub j coma t">
          <span>
            <V>y</V>
            <sub>
              <V>i</V>,<V>t</V>
            </sub>{' '}
            = ln <V>p</V>
            <sub>
              <V>i</V>,<V>t</V>
            </sub>{' '}
            −
          </span>
          <Frac num="1" den="9" />
          <Suma indice="j" />
          <span>
            ln <V>p</V>
            <sub>
              <V>j</V>,<V>t</V>
            </sub>
          </span>
        </Ecuacion>
        <P>
          donde{' '}
          <Mat lectura="p sub i coma t">
            <V>p</V>
            <sub>
              <V>i</V>,<V>t</V>
            </sub>
          </Mat>{' '}
          es la participación porcentual del área <V>i</V> en el año <V>t</V>, y{' '}
          <Mat lectura="y sub i coma t">
            <V>y</V>
            <sub>
              <V>i</V>,<V>t</V>
            </sub>
          </Mat>{' '}
          es su valor transformado, comparado contra la media geométrica de las nueve áreas en ese
          mismo año. En este espacio, un VAR estándar es matemáticamente válido; al final del
          proceso, una transformación inversa devuelve los resultados a proporciones que vuelven a
          sumar 100 %.
        </P>

        <H3>Estimar mucho con pocos datos: el encogimiento bayesiano</H3>
        <P>
          Un VAR sin restricciones, con nueve series y solo quince observaciones anuales
          (2010-2024), requeriría estimar más parámetros que datos disponibles — el problema
          clásico de sobreparametrización en muestras cortas <Cita n="2" />. La solución adoptada
          es un <strong>VAR bayesiano con encogimiento tipo Minnesota</strong> <Cita n="2" />: cada
          coeficiente se contrae hacia un valor previo (un prior) informado por el comportamiento
          típico de cada serie, en lugar de dejar que los datos —pocos y ruidosos— lo determinen
          libremente. Formalmente, cada ecuación del sistema se estima minimizando:
        </P>
        <Ecuacion lectura="mínimo de la norma dos de y menos X b, más la sumatoria en k del cuadrado de, b sub k menos mu sub k, dividido entre tau sub k">
          <span>
            min ‖<V>y</V> − <V>Xb</V>‖<sub>2</sub> +
          </span>
          <Suma indice="k" />
          <span>[</span>
          <Frac
            num={
              <span>
                <V>b</V>
                <sub>
                  <V>k</V>
                </sub>{' '}
                − <V>μ</V>
                <sub>
                  <V>k</V>
                </sub>
              </span>
            }
            den={
              <span>
                <V>τ</V>
                <sub>
                  <V>k</V>
                </sub>
              </span>
            }
          />
          <span>
            ]<sup>2</sup>
          </span>
        </Ecuacion>
        <P>
          donde{' '}
          <Mat lectura="mu sub k">
            <V>μ</V>
            <sub>
              <V>k</V>
            </sub>
          </Mat>{' '}
          es el valor esperado del coeficiente <V>k</V> según la teoría económica (por ejemplo, una
          sensibilidad positiva de vejez al envejecimiento poblacional) y{' '}
          <Mat lectura="tau sub k">
            <V>τ</V>
            <sub>
              <V>k</V>
            </sub>
          </Mat>{' '}
          controla cuánto se le permite a los datos desviarse de ese valor esperado. Esta es
          exactamente la lógica de una regresión ridge generalizada, equivalente a la media
          posterior bajo un prior normal <Cita n="2" />
          <Cita n="3" />.
        </P>

        <H3>Un VAR que escucha al entorno macroeconómico (VARX)</H3>
        <P>
          La composición del gasto social no evoluciona en el vacío: responde al ciclo económico, a
          la inflación, a la informalidad laboral y al envejecimiento de la población. Por ello, el
          modelo central no es un VAR autónomo sino un <strong>VARX(1)</strong> — un VAR con
          regresores exógenos — especificado como:
        </P>
        <Ecuacion lectura="y sub t igual a c, más A por y sub t menos uno, más B por x sub t, más e sub t">
          <span>
            <V>y</V>
            <sub>
              <V>t</V>
            </sub>{' '}
            = <V>c</V> + <V>A</V> <V>y</V>
            <sub>
              <V>t</V>−1
            </sub>{' '}
            + <V>B</V> <V>x</V>
            <sub>
              <V>t</V>
            </sub>{' '}
            + <V>e</V>
            <sub>
              <V>t</V>
            </sub>
          </span>
        </Ecuacion>
        <P>
          Aquí{' '}
          <Mat lectura="y sub t">
            <V>y</V>
            <sub>
              <V>t</V>
            </sub>
          </Mat>{' '}
          es el vector de las nueve participaciones (en espacio CLR), <V>A</V> captura cómo cada
          área influye sobre sí misma y sobre las demás de un año a otro, y{' '}
          <Mat lectura="x sub t">
            <V>x</V>
            <sub>
              <V>t</V>
            </sub>
          </Mat>{' '}
          es el vector de cuatro variables macroeconómicas exógenas: crecimiento del PIB real,
          inflación, tasa de informalidad laboral y porcentaje de población de 60 años y más{' '}
          <Cita n="4" />
          <Cita n="5" />. La matriz <V>B</V> mide cuánto se transmite cada una de esas condiciones
          hacia la composición del gasto — por ejemplo, una sensibilidad positiva de vejez y salud
          al envejecimiento poblacional, o una sensibilidad contra-cíclica de los programas de
          mercado laboral al crecimiento económico.
        </P>

        <H3>Cuando la tendencia no basta: el choque estructural</H3>
        <P>
          Ni la inercia propia ni el ciclo macroeconómico explican todos los cambios relevantes.
          Ley 2381 de 2024 <Cita n="6" />, creó un Pilar Solidario de renta básica para cerca de
          2,5 millones de adultos mayores en pobreza, financiado directamente con el Presupuesto
          General de la Nación. Se trata de gasto público nuevo y permanente bajo la categoría de
          vejez, no de una tendencia gradual — un quiebre fechado que ningún coeficiente
          autorregresivo, estimado sobre datos previos a su existencia, podría anticipar. Se modeló
          como un desplazamiento de nivel aplicado directamente sobre la trayectoria ya proyectada:
        </P>
        <Ecuacion lectura="y prima sub vejez coma t igual a y sub vejez coma t, más delta por D sub t">
          <span>
            <V>y</V>
            <sub>
              vejez,<V>t</V>′
            </sub>{' '}
            = <V>y</V>
            <sub>
              vejez,<V>t</V>
            </sub>{' '}
            + <V>δ</V> · <V>D</V>
            <sub>
              <V>t</V>
            </sub>
          </span>
        </Ecuacion>
        <P>
          donde{' '}
          <Mat lectura="D sub t">
            <V>D</V>
            <sub>
              <V>t</V>
            </sub>
          </Mat>{' '}
          es una función escalón con rampa de implementación administrativa de tres años
          (2025-2028), que pasa de 0 a 1, y <V>δ</V> es la magnitud calibrada del quiebre. Al
          añadirse después de la recursión autorregresiva —y no dentro de ella— se evita que el
          propio VAR amplifique artificialmente un choque que no tiene variación en la muestra
          histórica utilizada para su estimación.
        </P>

        <H3>De vuelta a las proporciones</H3>
        <P>
          Una vez proyectada la trayectoria en el espacio CLR, se aplica la transformación inversa
          matemáticamente equivalente a una función softmax para recuperar proporciones
          interpretables que, por construcción, vuelven a sumar exactamente 100 % cada año:
        </P>
        <Ecuacion lectura="p sub i coma t igual a exponencial de y sub i coma t, dividido entre la sumatoria en j de la exponencial de y sub j coma t">
          <span>
            <V>p</V>
            <sub>
              <V>i</V>,<V>t</V>
            </sub>{' '}
            =
          </span>
          <Frac
            num={
              <span>
                exp(<V>y</V>
                <sub>
                  <V>i</V>,<V>t</V>
                </sub>
                )
              </span>
            }
            den={
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                <Suma indice="j" />
                <span>
                  exp(<V>y</V>
                  <sub>
                    <V>j</V>,<V>t</V>
                  </sub>
                  )
                </span>
              </span>
            }
          />
        </Ecuacion>
        <P>
          La incertidumbre del pronóstico se cuantifica mediante la propagación analítica de la
          varianza propia de un VAR <Cita n="3" />, acumulada recursivamente a lo largo del
          horizonte:
        </P>
        <Ecuacion lectura="Sigma sub h igual a A por Sigma sub h menos uno por A transpuesta, más Sigma sub e">
          <span>
            <V>Σ</V>
            <sub>
              <V>h</V>
            </sub>{' '}
            = <V>A</V> <V>Σ</V>
            <sub>
              <V>h</V>−1
            </sub>{' '}
            <V>A</V>
            <sup>′</sup> + <V>Σ</V>
            <sub>
              <V>e</V>
            </sub>
          </span>
        </Ecuacion>
        <P>
          Esta expresión, en lugar de un GARCH univariado, es la que sustenta las bandas de
          confianza del 90 % reportadas junto a cada serie proyectada: con apenas catorce
          variaciones anuales históricas disponibles, un GARCH(1,1) explorado sobre las áreas más
          volátiles no arrojó parámetros estadísticamente significativos — una limitación de tamaño
          de muestra que se documenta por transparencia, no se oculta.
        </P>

        {/* ═══ Señales por área ═══ */}
        <H2>
          El gasto social público que viene: señales para leer el horizonte colombiano de 2050
        </H2>
        <P>
          El futuro social de Colombia no se está escribiendo únicamente en planes de gobierno ni
          en discursos de campaña. También se está escribiendo en una fila de porcentajes: salud,
          vejez, familia, vivienda, empleo, incapacidad, desempleo, sobrevivientes y atención a la
          vulnerabilidad. Allí, en la forma como el gasto público reparte sus prioridades, aparece
          una radiografía incómoda del país que se aproxima.
        </P>
        <P>
          La prospectiva sirve precisamente para eso: no para predecir con arrogancia, sino para
          mirar antes de que la presión se vuelva crisis. La serie histórica 2010-2024 y la
          proyección 2025-2050 muestran un patrón difícil de ignorar: el gasto social público
          seguirá orbitando alrededor de dos fuerzas dominantes, salud y vejez. En 2024, estas dos
          áreas concentraban la mayor parte del gasto social público; hacia 2050 seguirán marcando
          el pulso de la protección social.
        </P>
        <P>
          La pregunta de fondo no es si el Estado gastará más o menos. La pregunta es qué tipo de
          vida estará tratando de sostener. Una sociedad que envejece trabaja de manera más
          fragmentada, arrienda más de lo que compra, cuida más de lo que reconoce y enferma de
          forma más crónica necesitará algo distinto a programas separados. Necesitará redes de
          bienestar capaces de acompañar trayectorias completas de vida.
        </P>
        <P>
          El presupuesto suele clasificar por compartimentos. La vida no. Una enfermedad afecta el
          empleo; una vejez sin cuidado reorganiza a toda una familia; una vivienda lejana encarece
          el transporte y reduce el tiempo; un trabajo inestable fragiliza la salud mental; una
          pérdida familiar puede empujar a un hogar entero hacia la precariedad. Por eso, el gasto
          social debe leerse como un sistema de señales, no como una lista de rubros.
        </P>
        <P>
          La información que sigue busca mirar el dato con una pregunta humana: qué anuncia cada
          área sobre el ciudadano colombiano que llegará a 2050. La utilidad estratégica está en
          detectar dónde crecerá la demanda social, dónde el Estado parece llegar tarde y dónde
          surgirán necesidades de bienestar, cuidado, formación, recreación, prevención, vivienda y
          acompañamiento territorial.
        </P>
        <P>
          El país de 2050 no solo necesitará más gasto social; necesitará una lectura más fina de
          las personas que ese gasto intenta proteger.
        </P>

        <H3>Salud: el bienestar como nuevo territorio de competencia social</H3>
        <P>
          Salud aparece como el primer gran frente del futuro social. En 2024 representó 41,49% de
          la participación pública por áreas y movilizó cerca de 105,2 billones de pesos. La
          proyección la ubica en 39,38% para 2050. No se trata de una cifra fría: detrás hay una
          población que vivirá más años, demandará más controles, enfrentará enfermedades crónicas
          y exigirá formas de bienestar menos hospitalarias y más cotidianas.
        </P>
        <P>
          El dato más revelador no está solo en el tamaño de salud, sino en su persistencia. El
          gasto sanitario seguirá siendo una de las mayores columnas del sistema, aun cuando la
          sociedad empiece a exigir que la salud no se limite a consultas, medicamentos y
          urgencias. El bienestar se volverá un terreno de disputa: prevenir, acompañar, educar,
          activar físicamente y cuidar la salud mental será tan importante como atender la
          enfermedad.
        </P>
        <P>
          En el detalle del gasto, los servicios médicos, hospitalarios y farmacéuticos concentran
          el peso decisivo. Esa composición deja una advertencia: si la prevención no gana terreno,
          el sistema seguirá pagando tarde lo que pudo atender temprano. El habitante colombiano de
          2050 no pedirá únicamente curación; pedirá tiempo de vida funcional, autonomía y entornos
          que no enfermen.
        </P>
        <Figura
          numero="1"
          titulo="Participación del gasto social público en salud, 2010-2050"
          imagen={figura01}
          alt="Serie de la participación del gasto social público en salud: línea observada 2010-2024 que sube hasta cerca del 42 % y proyección punteada 2025-2050 con banda ilustrativa, cerrando en 39,38 % hacia 2050"
          nota={NOTA_SERIE}
        />
        <P>
          La trayectoria proyectada no muestra un alivio real de la presión sanitaria. Muestra una
          permanencia alta, con oscilaciones que no borran la centralidad del tema. Esta es una
          alerta para cualquier institución que piense bienestar a largo plazo: la salud será cada
          vez menos un asunto exclusivo del consultorio y cada vez más una condición transversal de
          la vida social.
        </P>
        <P>
          El punto crítico está en el cambio de lenguaje: salud dejará de significar solo atención
          médica. Significará alimentación, movimiento, descanso, vínculos, salud emocional,
          cuidado de personas mayores y prevención de riesgos laborales. Quien no lea esa
          transformación llegará tarde al ciudadano de 2050.
        </P>

        <H3>Vejez: el país que envejece antes de sentirse preparado</H3>
        <P>
          Vejez es la segunda gran señal del gasto social público. En 2024 representó 41,02% y
          movió alrededor de 104,0 billones de pesos; hacia 2050 se proyecta en 42,51%. El dato
          habla de pensiones, pero también de una pregunta más profunda: quién cuidará, cómo se
          financiará el cuidado y qué lugar ocuparán las personas mayores en la vida económica,
          familiar y comunitaria.
        </P>
        <P>
          La vejez no será un grupo homogéneo. Habrá personas mayores activas, cuidadoras,
          trabajadoras, solas, dependientes, endeudadas, conectadas digitalmente o excluidas de esa
          conexión. La política pública suele mirar la vejez por ingreso; la vida real la vive por
          salud, movilidad, afecto, autonomía y compañía.
        </P>
        <P>
          La reforma pensional introduce un quiebre estructural que hace más visible esta tensión.
          Si la vejez gana peso, las demás áreas deberán competir por un espacio fiscal más
          estrecho. Pero el problema no termina en la pensión. Una sociedad longeva necesita
          servicios intergeneracionales, espacios de participación, formación permanente,
          recreación adaptada y redes contra la soledad.
        </P>
        <Figura
          numero="2"
          titulo="Participación del gasto social público en vejez, 2010-2050"
          imagen={figura02}
          alt="Serie de la participación del gasto social público en vejez: línea observada 2010-2024 alrededor del 41 % y proyección punteada 2025-2050 con banda ilustrativa, cerrando en 42,51 % hacia 2050"
          nota={NOTA_SERIE}
        />
        <P>
          La curva proyectada confirma una presencia pesada y estable. Esa estabilidad no debe
          confundirse con tranquilidad: mantener una proporción tan alta durante décadas significa
          que la vejez condicionará buena parte de las decisiones sociales del país.
        </P>
        <P>
          La señal prospectiva es directa. El envejecimiento no será un tema de adultos mayores;
          será un tema de hogares completos. Cada persona mayor con dependencia altera horarios,
          ingresos, vivienda, empleo y cuidado familiar. El país que no prepare servicios para esa
          realidad trasladará el costo a la intimidad de los hogares.
        </P>

        <H3>Familia: el gasto donde más cambia la vida cotidiana</H3>
        <P>
          Familia muestra una paradoja difícil de justificar. En 2024 representó 7,55% del gasto
          social público y movilizó cerca de 19,2 billones de pesos; hacia 2050 se proyecta en
          10,57%. La caída frente al pico histórico no significa que las familias necesiten menos
          apoyo. Significa que una parte de sus tensiones está quedando fuera del centro
          presupuestal.
        </P>
        <P>
          La vida familiar está cambiando más rápido que muchas políticas. Hogares más pequeños,
          jefaturas femeninas, crianza con menos redes, cuidado de personas mayores, inestabilidad
          laboral y presión sobre el tiempo configuran una escena muy distinta a la de hace dos
          décadas. Sin embargo, el gasto parece retroceder justo donde la vida cotidiana se vuelve
          más compleja.
        </P>
        <P>
          El detalle muestra subsidios a servicios públicos, alimentación escolar, primera
          infancia, licencias, transporte escolar y transferencias. Allí está la vida diaria:
          comer, desplazarse, estudiar, cuidar, pagar servicios, sostener a niños. Cuando esta área
          pierde peso, no desaparecen las necesidades; se privatizan en silencio dentro del hogar.
        </P>
        <Figura
          numero="3"
          titulo="Participación del gasto social público en familia, 2010-2050"
          imagen={figura03}
          alt="Serie de la participación del gasto social público en familia: línea observada 2010-2024, caída fuerte entre 2024 y 2025 y proyección punteada con recuperación parcial hacia 10,57 % en 2050"
          nota={NOTA_SERIE}
        />
        <P>
          La figura muestra una caída fuerte entre 2024 y 2025, seguida por una recuperación
          parcial. La lectura periodística del dato es clara: el país reduce presión presupuestal
          en familia en el mismo momento histórico en que los arreglos familiares se vuelven más
          frágiles y más diversos.
        </P>
        <P>
          Hacia 2050, la familia no debería entenderse como una unidad estable que resuelve sola
          sus cargas. Será un sistema de cuidado sometido a presiones de tiempo, ingreso, crianza y
          vejez. Si el gasto no acompaña esa transformación, crecerá la demanda de servicios que
          alivien la vida cotidiana: cuidado, recreación, apoyo escolar, nutrición, salud mental y
          orientación familiar.
        </P>

        <H3>Mercado laboral: formación, empleo y la promesa incompleta de movilidad</H3>
        <P>
          Los programas de mercado laboral ocupan una franja modesta, pero estratégica. En 2024
          representaron 2,92%, con cerca de 7,4 billones de pesos; hacia 2050 se proyectan en
          2,65%. Su tamaño no refleja su importancia. En un país con informalidad persistente y
          cambios tecnológicos acelerados, la formación laboral será una de las puertas más
          disputadas de la movilidad social.
        </P>
        <P>
          El gasto público se concentra en educación para el trabajo, sostenimiento de aprendices,
          competencias laborales y programas de activación. Es decir, intenta conectar personas con
          capacidades productivas. Pero la pregunta prospectiva es más exigente: qué tipo de
          capacidades serán útiles cuando el trabajo cambie de forma, de contrato, de lugar y de
          velocidad.
        </P>
        <P>
          La formación no podrá seguir pensándose como una etapa previa al empleo. Tendrá que
          convertirse en una práctica permanente. El ciudadano de 2050 probablemente entrará y
          saldrá varias veces del aprendizaje formal, cambiará de oficio, combinará ingresos y
          necesitará certificaciones rápidas para no quedar atrapado en ocupaciones que pierden
          demanda.
        </P>
        <Figura
          numero="4"
          titulo="Participación del gasto social público en programas de mercado laboral, 2010-2050"
          imagen={figura04}
          alt="Serie de la participación del gasto social público en programas de mercado laboral: línea observada 2010-2024 con picos al inicio de la década de 2020 y proyección punteada estabilizada en torno a 2,65 % hacia 2050"
          nota={NOTA_SERIE}
        />
        <P>
          La trayectoria proyectada se estabiliza por debajo de los niveles excepcionales
          observados al inicio de la década de 2020. Esa moderación puede ser riesgosa si el
          mercado laboral se vuelve más incierto. Un gasto estable no garantiza preparación
          suficiente frente a automatización, transición digital, envejecimiento de la fuerza
          laboral y nuevas formas de contratación.
        </P>
        <P>
          La señal útil está en las transiciones. Más que preparar a una persona para un empleo, el
          país deberá acompañarla entre empleos, entre oficios y entre etapas de vida. Formación,
          orientación, reconversión y bienestar laboral serán piezas de una misma política de
          futuro.
        </P>

        <H3>Incapacidad: la protección que aparece cuando el trabajo ya dejó huella</H3>
        <P>
          Las prestaciones relacionadas con la incapacidad representaron 0,64% en 2024, con
          alrededor de 1,6 billones de pesos; hacia 2050 se proyectan en 0,50%. Aunque el
          porcentaje parece pequeño, el tema toca una zona sensible: el cuerpo que trabaja, se
          enferma, se accidenta o pierde capacidad antes de lo previsto.
        </P>
        <P>
          Esta área permite leer el costo oculto de las trayectorias laborales. La incapacidad no
          es solo un trámite médico o administrativo; es una interrupción de ingreso, una
          reorganización familiar, una carga emocional y, muchas veces, una señal de ambientes
          laborales que deterioran más de lo que protegen.
        </P>
        <P>
          La prospectiva invita a mirar más allá del pago de incapacidades. El reto está en
          prevenir riesgos físicos y psicosociales, adaptar puestos de trabajo, acompañar retornos
          laborales y evitar que una limitación temporal se convierta en exclusión permanente. El
          trabajo del futuro no será sostenible si produce vidas funcionalmente agotadas.
        </P>
        <Figura
          numero="5"
          titulo="Participación del gasto social público en prestaciones relacionadas con la incapacidad, 2010-2050"
          imagen={figura05}
          alt="Serie de la participación del gasto social público en prestaciones por incapacidad: línea observada 2010-2024 y proyección punteada que desciende desde los niveles recientes y se estabiliza en torno a 0,50 % hacia 2050"
          nota={NOTA_SERIE}
        />
        <P>
          La figura muestra una reducción desde los niveles recientes y luego una relativa
          estabilidad. Esa estabilidad puede ocultar presiones nuevas: salud mental, agotamiento
          laboral, enfermedades crónicas, envejecimiento de trabajadores y accidentes asociados a
          nuevas formas de producción.
        </P>
        <P>
          La señal es preventiva. La protección más valiosa no será únicamente pagar cuando el daño
          ya ocurrió, sino intervenir antes: ergonomía, pausas activas, salud mental, vigilancia
          ocupacional, acompañamiento familiar y rediseño de tareas. El futuro laboral se medirá
          también por la capacidad de no romper a quienes lo sostienen.
        </P>

        <H3>Vivienda: el gasto pequeño en un país que aún vive en arriendo</H3>
        <P>
          Vivienda tiene un peso bajo frente a su enorme influencia en la vida social. En 2024
          representó 1,50%, con cerca de 3,8 billones de pesos; hacia 2050 se proyecta en 1,60%. La
          cifra parece estable, pero la estabilidad no equivale a suficiencia.
        </P>
        <P>
          La vivienda decide más de lo que suele reconocerse. Define cuánto tiempo se pierde en
          transporte, qué tan cerca queda el empleo, si un niño puede estudiar sin hacinamiento, si
          una persona mayor puede moverse sin riesgo y si un hogar puede sostenerse sin destinar la
          mayor parte del ingreso al arriendo.
        </P>
        <P>
          El detalle del gasto habla de subsidios, tasas de interés, vivienda de interés social,
          mejoramiento y saneamiento básico. Sin embargo, la pregunta de 2050 será más amplia que
          la propiedad: cómo vivir cerca de oportunidades, cómo arrendar sin fragilidad, cómo
          adaptar viviendas al envejecimiento y cómo convertir el barrio en una plataforma real de
          bienestar.
        </P>
        <Figura
          numero="6"
          titulo="Participación del gasto social público en vivienda, 2010-2050"
          imagen={figura06}
          alt="Serie de la participación del gasto social público en vivienda: línea observada 2010-2024 y proyección punteada casi plana en torno a 1,60 % hacia 2050"
          nota={NOTA_SERIE}
        />
        <P>
          La curva proyectada es casi plana. Ese trazo discreto contrasta con una realidad urbana
          mucho más intensa. En un país de arrendatarios, periferias largas y tiempos de viaje
          costosos, una política de vivienda pequeña deja demasiadas cargas en manos del hogar.
        </P>
        <P>
          La señal prospectiva es territorial. Vivienda no es solamente techo; es localización,
          cuidado, movilidad, seguridad, redes vecinales y acceso a servicios. Allí donde la
          vivienda falla, otras áreas pagan el costo: salud, familia, empleo y educación.
        </P>

        <H3>Desempleo: una red delgada frente a trayectorias laborales frágiles</H3>
        <P>
          Desempleo casi no aparece en la escala del gasto social público. En 2024 su participación
          fue de 0,00%, con cerca de 0,0 billones de pesos; hacia 2050 se mantendría alrededor de
          0,01%. Pero pocas experiencias alteran tanto la vida de un hogar como la pérdida de
          ingreso.
        </P>
        <P>
          El gasto público se concentra en colocación laboral y en una fracción mínima asociada a
          intermediación y formación para desempleados. La señal es inquietante: el país mantiene
          una red delgada para un mercado laboral cada vez más discontinuo.
        </P>
        <P>
          El desempleo del futuro no siempre tendrá la forma clásica de una persona sin trabajo.
          Puede aparecer como subempleo, ingresos intermitentes, trabajo por encargo, pausas por
          cuidado, rotación, informalidad digital o empleos que ya no alcanzan para sostener un
          hogar.
        </P>
        <Figura
          numero="7"
          titulo="Participación del gasto social público en desempleo, 2010-2050"
          imagen={figura07}
          alt="Serie de la participación del gasto social público en desempleo: línea observada 2010-2024 y proyección punteada baja y casi plana alrededor de 0,01 % hacia 2050"
          nota={NOTA_SERIE}
        />
        <P>
          La figura muestra una participación baja y casi plana. No es necesariamente una buena
          noticia. Puede significar que el presupuesto todavía mira el desempleo con lentes
          antiguos, mientras la inseguridad laboral adopta formas más difíciles de medir.
        </P>
        <P>
          La señal útil está antes de la pérdida del empleo. Orientación, reconversión, salud
          mental, certificación de competencias y acompañamiento en transiciones serán más
          importantes que una respuesta tardía cuando el ingreso ya cayó.
        </P>

        <H3>Sobrevivientes: la protección mínima cuando el hogar pierde su centro</H3>
        <P>
          Sobrevivientes es una de las áreas más pequeñas del gasto. En 2024 representó 0,12%, con
          cerca de 0,3 billones de pesos; hacia 2050 se proyecta en 0,06%. Su tamaño presupuestal
          es bajo, pero su significado humano es enorme: aparece cuando un hogar pierde a alguien
          que sostenía ingreso, cuidado o estabilidad.
        </P>
        <P>
          El rubro se asocia principalmente con auxilios funerarios y de entierro. La respuesta
          pública aparece en un momento límite, pero el duelo no termina en el trámite. Después
          vienen deudas, cambios de residencia, redistribución de cuidados y pérdida de ingresos.
        </P>
        <P>
          Esta área recuerda que la protección social también se mide en los momentos donde la vida
          se rompe. Un gasto pequeño puede parecer razonable en las cuentas, pero insuficiente
          frente a hogares que deben reconstruir su economía y su rutina después de una pérdida.
        </P>
        <Figura
          numero="8"
          titulo="Participación del gasto social público en sobrevivientes, 2010-2050"
          imagen={figura08}
          alt="Serie de la participación del gasto social público en sobrevivientes: línea observada 2010-2024 y proyección punteada que desciende y se estabiliza en niveles bajos, en torno a 0,06 % hacia 2050"
          nota={NOTA_SERIE}
        />
        <P>
          La trayectoria proyectada desciende y luego se estabiliza en niveles bajos. La señal no
          es expansión, sino mínima presencia. Eso exige pensar si la respuesta social ante la
          muerte seguirá limitada a cubrir un evento puntual o si deberá acompañar sus efectos
          posteriores.
        </P>
        <P>
          Hacia 2050, el envejecimiento hará más frecuente la experiencia de pérdida en hogares con
          responsabilidades cruzadas. La pregunta será si la protección llega solo al rito funerario
          o también a la reorganización económica y emocional que queda después.
        </P>

        <H3>Otras áreas de política social: el gasto que crece cuando la vulnerabilidad se acumula</H3>
        <P>
          Las otras áreas de política social funcionan como una caja de resonancia de problemas que
          no encajan con comodidad en las categorías clásicas. Allí aparecen población desplazada y
          vulnerable, promoción social, reparación, asistencia a víctimas y apoyos que responden a
          heridas territoriales persistentes. El salto reciente de esta área muestra que la
          vulnerabilidad no es residual; puede irrumpir y reordenar el gasto cuando el país acumula
          conflictos no resueltos.
        </P>
        <P>
          La proyección muestra una reducción posterior y una estabilización en niveles más bajos
          que el pico reciente. Esto no significa que la vulnerabilidad desaparezca. Significa que
          el gasto puede normalizar administrativamente situaciones que socialmente continúan
          abiertas.
        </P>
        <Figura
          numero="9"
          titulo="Participación proyectada del gasto social público en otras áreas de política social, 2010-2050"
          imagen={figura09}
          alt="Serie de la participación del gasto social público en otras áreas de política social: salto reciente en la serie observada y proyección que se reduce y estabiliza en niveles más bajos que el pico"
          nota="La línea continua corresponde a la serie observada 2010-2024 y la línea discontinua a la proyección 2025-2050."
        />
        <P>
          El crecimiento no dependerá solo de atraer trabajadores estables, sino de acompañar
          procesos de formalización y movilidad social. En este terreno, pueden surgir puentes
          entre acceso a servicios, orientación institucional, formación, inclusión financiera,
          bienestar familiar y alianzas territoriales para poblaciones que ingresan al empleo
          formal con rezagos acumulados.
        </P>
        <P>
          Allí se ubican señales de fragilidad social que pueden anticipar nuevas demandas de
          bienestar. Leerlas con cuidado permite evitar una visión demasiado cómoda del ciudadano
          colombiano, como si todas las personas llegaran al sistema social desde el mismo punto de
          partida. La prospectiva del gasto muestra lo contrario: el bienestar futuro también
          dependerá de la capacidad institucional y territorial para integrar trayectorias
          laborales y sociales desiguales.
        </P>

        <H3>Reforma pensional y vejez: el futuro empieza a envejecer</H3>
        <P>
          La reforma pensional no solo movió las reglas del sistema. También dejó una pista
          incómoda sobre el país que viene: la vejez empezará a pesar más en la bolsa del gasto
          social público. Según la proyección, cuando se incorpora el quiebre asociado a la
          reforma, el gasto dirigido a vejez queda por encima del escenario sin reforma durante
          buena parte del camino hacia 2050. Al final del periodo, la diferencia llega a 1,22
          puntos porcentuales. Dicho de otra forma: el país comienza a reservar más espacio para
          una población que ya no será minoritaria en las decisiones de bienestar.
        </P>
        <P>
          Antes de observar la figura, el dato pide una lectura menos contable y más social.
          Colombia no solo tendrá más personas mayores; tendrá más hogares dependiendo de
          pensiones, transferencias, medicamentos, cuidados y redes familiares cada vez más
          presionadas. La vejez dejará de ser una preocupación privada de cada familia y pasará a
          ocupar un lugar central en la agenda pública.
        </P>
        <Figura
          numero="10"
          titulo="Efecto de la reforma pensional sobre la participación del gasto social público en vejez, 2025-2050"
          imagen={figura10}
          alt="Comparación de la participación de vejez con y sin reforma pensional entre 2025 y 2050: la trayectoria con quiebre pensional se mantiene por encima de la trayectoria sin quiebre, con un efecto neto de 1,22 puntos porcentuales en 2050"
          nota="La figura compara la trayectoria proyectada del gasto social público en vejez con reforma pensional frente a un escenario sin quiebre estructural. El efecto neto estimado hacia 2050 es de 1,22 puntos porcentuales adicionales."
        />
        <P>
          La figura cuenta una historia clara: con reforma, la vejez gana terreno. Ese aumento no
          habla únicamente de pensiones. Habla de una sociedad que tendrá que atender más
          enfermedades crónicas, más necesidades de cuidado, más adultos mayores viviendo solos,
          más presión sobre los ingresos familiares y más demanda por servicios que hoy todavía
          suelen pensarse como complementarios. La pensión será apenas la puerta de entrada; detrás
          vendrán la salud, la vivienda, la movilidad, la recreación y la compañía.
        </P>
        <P>
          La segunda figura cumple un papel menos vistoso, pero decisivo. El total del gasto social
          público se mantiene alrededor del 100 %, lo que indica que el cambio no es una expansión
          ilimitada de recursos, sino una pelea interna por el peso de cada área. Cuando vejez
          sube, el resto del mapa social debe acomodarse.
        </P>
        <Figura
          numero="11"
          titulo="Participación total del gasto social público, 2010-2050"
          imagen={figura11}
          alt="Serie de la participación total del gasto social público 2010-2050, cerrada alrededor del 100 % durante todo el periodo"
          nota="La figura muestra que la composición total del gasto social público se mantiene cerrada alrededor del 100 %, lo cual permite interpretar los cambios por área como movimientos relativos dentro de la estructura general del gasto."
        />
        <P>
          Ahí está la advertencia. El futuro del gasto social no será solo una discusión sobre
          cuánto se invierte, sino sobre quién logra ocupar espacio dentro de una canasta limitada.
          Si la vejez gana protagonismo, infancia, vivienda, mercado laboral, desempleo y cuidado
          tendrán que competir por visibilidad presupuestal. La reforma pensional, entonces, no
          debe leerse como un trámite técnico: es una señal temprana de cómo empezará a
          reorganizarse el contrato social colombiano.
        </P>
        <P>
          Hacia 2050, entender la vejez será entender buena parte del bienestar nacional. En ese
          terreno se cruzarán empleo formal, ingresos familiares, salud, cuidado, vivienda y
          cohesión comunitaria. El país que no anticipe esa convergencia llegará tarde a una
          transformación que ya empezó.
        </P>

        {/* ═══ Tres tensiones ═══ */}
        <H2>Tres tensiones del gasto social público para entender el bienestar colombiano hacia 2050</H2>

        <H3>Vejez y salud: el país que envejece también se vuelve más costoso de cuidar</H3>
        <P>
          La comparación entre vejez y salud muestra una de las tensiones más fuertes del gasto
          social colombiano. Durante varios años, salud ocupó el lugar dominante dentro de la
          estructura del gasto público social; sin embargo, la proyección sugiere que vejez gana
          terreno y se mantiene en niveles altos hacia 2050. La lectura no es menor: el país no
          solo tendrá que pagar pensiones o transferencias a personas mayores, también tendrá que
          sostener vidas más largas, con más enfermedades crónicas, más medicamentos, más
          rehabilitación y más necesidades de cuidado.
        </P>
        <Figura
          numero="12"
          titulo="Comparación entre vejez y salud en la participación del gasto social público, 2010-2050"
          imagen={figura12}
          alt="Comparación de las trayectorias históricas y proyectadas de vejez y salud dentro del gasto social público, con la línea vertical del inicio del pronóstico en 2025; vejez disputa el lugar dominante de salud hacia 2050"
          nota="La figura compara la trayectoria histórica y proyectada de las áreas de vejez y salud dentro del gasto social público. La línea vertical marca el inicio del pronóstico en 2025 y el escenario incorpora el quiebre estructural asociado a la reforma pensional."
        />
        <P>
          La figura deja ver un cambio de época. Salud sigue siendo una de las áreas más pesadas,
          pero vejez empieza a disputar el centro del gasto social. Esto significa que el bienestar
          de 2050 estará cada vez más organizado alrededor del envejecimiento. El punto crítico
          está en que vejez y salud no son áreas separadas: se alimentan mutuamente. Una población
          más vieja presiona el gasto pensional, pero también aumenta la demanda médica. El futuro
          social colombiano, por tanto, no se juega solo en hospitales ni solo en pensiones, sino
          en la capacidad de articular ingresos, prevención, cuidado y vida digna para una
          población que vivirá más años.
        </P>

        <H3>Mercado laboral y desempleo: se invierte poco antes y después de perder el trabajo</H3>
        <P>
          El cruce entre programas de mercado laboral y desempleo revela una paradoja. La política
          activa de empleo mantiene una participación baja, aunque visible, mientras el gasto
          asociado directamente al desempleo permanece casi plano y mínimo. Esta diferencia muestra
          que el país no parece construir una red fuerte ni antes ni después de la pérdida del
          trabajo. La formación, la reconversión laboral, la intermediación y la protección frente
          al desempleo siguen ocupando un espacio reducido frente a otras prioridades del gasto
          social.
        </P>
        <Figura
          numero="13"
          titulo="Comparación entre programas de mercado laboral y desempleo en la participación del gasto social público, 2010-2050"
          imagen={figura13}
          alt="Comparación de las trayectorias de programas de mercado laboral y desempleo dentro del gasto social público: la política activa se mantiene baja y el gasto en desempleo casi plano y mínimo durante todo el horizonte"
          nota="La figura presenta la evolución histórica y proyectada de los programas de mercado laboral y desempleo dentro del gasto social público. El pronóstico inicia en 2025 y permite observar la distancia persistente entre prevención laboral y protección frente a la pérdida de empleo."
        />
        <P>
          La imagen es contundente: el mercado laboral aparece como una preocupación secundaria en
          la estructura del gasto, y el desempleo como una red demasiado delgada para un país con
          trayectorias laborales frágiles. En perspectiva, esto abre una pregunta incómoda: ¿cómo
          sostener la protección social futura si no se fortalece el trabajo que debe financiarla?
          La vejez, la salud y la familia dependen, en buena parte, de la capacidad de las personas
          para permanecer en empleos formales, productivos y estables. Si esa base no crece, el
          gasto social puede terminar atendiendo consecuencias sin transformar el origen de la
          vulnerabilidad.
        </P>

        <H3>Familia y vivienda: el bienestar empieza en casa, pero la casa pesa poco en el gasto</H3>
        <P>
          La comparación entre familia y vivienda permite mirar el gasto social desde la vida
          cotidiana. Familia conserva un peso mucho mayor que vivienda, aunque después de una caída
          fuerte hacia el inicio del pronóstico intenta recuperar parte de su participación.
          Vivienda, en cambio, se mantiene en niveles bajos y casi estables. El contraste es
          revelador: el hogar sigue siendo el lugar donde se cuida, se alimenta, se estudia, se
          envejece y se enfrenta la precariedad, pero la política de vivienda continúa ocupando un
          espacio pequeño dentro del gasto social público.
        </P>
        <Figura
          numero="14"
          titulo="Comparación entre familia y vivienda en la participación del gasto social público, 2010-2050"
          imagen={figura14}
          alt="Comparación de las trayectorias de familia y vivienda dentro del gasto social público: brecha persistente entre el peso mayor de familia y la participación baja y casi estable de vivienda"
          nota="La figura compara la evolución histórica y proyectada de las áreas de familia y vivienda dentro del gasto social público. La trayectoria muestra una brecha persistente entre el peso del gasto orientado a familia y la baja participación relativa de vivienda."
        />
        <P>
          La figura muestra una brecha que no debería pasar inadvertida. El país habla de
          bienestar, pero la vivienda sigue siendo una pieza pequeña dentro de la arquitectura
          social. Esta tensión importa porque ningún programa familiar ocurre en el vacío: ocurre
          en una casa, en un barrio, en una distancia diaria hacia el colegio, el trabajo o el
          centro de salud. Si vivienda permanece rezagada, parte del esfuerzo en familia puede
          perder fuerza frente a arriendos altos, hacinamiento, informalidad habitacional o
          entornos urbanos poco adecuados para cuidar. Hacia 2050, la pregunta no será solo cuántos
          apoyos reciben los hogares, sino en qué condiciones materiales podrán convertir esos
          apoyos en bienestar real.
        </P>

        {/* ═══ Referencias ═══ */}
        <H3>Referencias</H3>
        <ul className="modulo-gasto-social__referencias">
          <li className="modulo-gasto-social__referencia">
            <strong>[1] Aitchison</strong>, J. (1986). The Statistical Analysis of Compositional
            Data. Chapman and Hall.{' '}
            <a href="https://doi.org/10.1007/978-94-009-4109-0" target="_blank" rel="noreferrer">
              https://doi.org/10.1007/978-94-009-4109-0
            </a>
          </li>
          <li className="modulo-gasto-social__referencia">
            <strong>[2] Litterman</strong>, R. B. (1986). Forecasting with Bayesian Vector
            Autoregressions — Five Years of Experience. Journal of Business &amp; Economic
            Statistics, 4(1), 25–38.{' '}
            <a href="https://doi.org/10.1080/07350015.1986.10509491" target="_blank" rel="noreferrer">
              https://doi.org/10.1080/07350015.1986.10509491
            </a>
          </li>
          <li className="modulo-gasto-social__referencia">
            <strong>[3] Lütkepohl</strong>, H. (2005). New Introduction to Multiple Time Series
            Analysis. Springer.{' '}
            <a href="https://doi.org/10.1007/978-3-540-27752-1" target="_blank" rel="noreferrer">
              https://doi.org/10.1007/978-3-540-27752-1
            </a>
          </li>
          <li className="modulo-gasto-social__referencia">
            <strong>[4] Departamento</strong> Administrativo Nacional de Estadística [DANE].
            (2025). Proyecciones de Población a Nivel Nacional, Actualización 2025. Dirección de
            Censos y Demografía.{' '}
            <a
              href="https://www.dane.gov.co/index.php/estadisticas-por-tema/demografia-y-poblacion/proyecciones-de-poblacion"
              target="_blank"
              rel="noreferrer"
            >
              https://www.dane.gov.co/index.php/estadisticas-por-tema/demografia-y-poblacion/proyecciones-de-poblacion
            </a>
          </li>
          <li className="modulo-gasto-social__referencia">
            <strong>[5] Banco</strong> de la República. (2026). Informe de Política Monetaria,
            enero de 2026.{' '}
            <a
              href="https://www.banrep.gov.co/es/publicaciones-investigaciones/informe-politica-monetaria"
              target="_blank"
              rel="noreferrer"
            >
              https://www.banrep.gov.co/es/publicaciones-investigaciones/informe-politica-monetaria
            </a>
          </li>
          <li className="modulo-gasto-social__referencia">
            <strong>[6] Congreso</strong> de Colombia. (2024). Ley 2381 de 2024, por medio de la
            cual se establece el Sistema de Protección Social Integral para la Vejez. Diario
            Oficial No. 52.819.{' '}
            <a
              href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=246356"
              target="_blank"
              rel="noreferrer"
            >
              https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=246356
            </a>
          </li>
          <li className="modulo-gasto-social__referencia">
            <strong>[7] Departamento</strong> Administrativo Nacional de Estadística [DANE].
            (2025). Cuentas Nacionales — Gasto Social Público y Privado (SOCX), 2024.{' '}
            <a
              href="https://www.dane.gov.co/index.php/estadisticas-por-tema/cuentas-nacionales/cuentas-nacionales-anuales"
              target="_blank"
              rel="noreferrer"
            >
              https://www.dane.gov.co/index.php/estadisticas-por-tema/cuentas-nacionales/cuentas-nacionales-anuales
            </a>
          </li>
          <li className="modulo-gasto-social__referencia">
            <strong>[8] Engle</strong>, R. F. (1982). Autoregressive Conditional Heteroscedasticity
            with Estimates of the Variance of United Kingdom Inflation. Econometrica, 50(4),
            987–1007.{' '}
            <a href="https://doi.org/10.2307/1912773" target="_blank" rel="noreferrer">
              https://doi.org/10.2307/1912773
            </a>
          </li>
        </ul>
      </article>
    </section>
  );
}

export default ModuloGastoSocial;
