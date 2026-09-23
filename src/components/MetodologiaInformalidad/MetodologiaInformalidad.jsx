/**
 * MetodologiaInformalidad — "Las ecuaciones detrás de la proyección"
 * (tendencia Informalidad laboral, 0.50.0, petición del cliente).
 *
 * Contenido de la ventana emergente de metodología (pieza compartida
 * `VentanaMetodologia`, 0.51.0): la econometría del pronóstico — modelo
 * Lee-Carter adaptado, camino aleatorio con deriva del índice temporal,
 * intervalos de confianza y paso de tasas a ocupados. Contenido FIJO en el
 * código, sintetizado de las cuatro primeras páginas del Word del cliente
 * (`articulo-informalidad.docx`, apartado "Introducción"). Ajuste
 * documentado: el Word remite a "Figura 1/2/3" y "Tabla 1" que no viajan
 * en el documento (sus imágenes son las gráficas por ciudad que el portal
 * muestra en vivo), por lo que esas remisiones se omiten. Editar el texto
 * = editar este archivo y recompilar.
 */
import VentanaMetodologia, {
  Definiciones,
  Ecuacion,
  H3,
  Mat,
  P,
  Referencias,
} from '../VentanaMetodologia/VentanaMetodologia.jsx';

const REFERENCIAS = [
  {
    texto:
      'Lee, R. D. & Carter, L. R. (1992). Modeling and Forecasting U.S. Mortality. Journal of the American Statistical Association, 87(419), 659–671. ',
    url: 'https://pages.stern.nyu.edu/~dbackus/BCH/demography/LeeCarter_JASA_92.pdf',
  },
  {
    texto:
      'DANE (2025). Nota Técnica PPED — Proyecciones de Población y Estudios Demográficos. Actualización 2025. Dirección de Censos y Demografía. Bogotá: DANE. ',
    url: 'https://www.dane.gov.co/files/censo2018/proyecciones-de-poblacion/Nacional/NotaTecnica-PPED-jul2025.pdf',
  },
  {
    texto:
      'DANE (2024). Gran Encuesta Integrada de Hogares — Mercado Laboral. Módulo de informalidad. Bogotá: DANE. ',
    url: 'https://www.dane.gov.co/files/operaciones/GEIH/bol-GEIH-dic2024.pdf',
  },
];

/* Curva histórica que se abre en un abanico de proyección */
const ICONO = (
  <svg viewBox="0 0 64 64" width="36" height="36" focusable="false">
    <path
      d="M10 44c8-2 12-12 18-14s8 6 14 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M42 34l12-10M42 34l12 4M42 34l12 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="1 6"
    />
  </svg>
);

function MetodologiaInformalidad() {
  return (
    <VentanaMetodologia
      contexto="Informalidad laboral"
      titulo="Las ecuaciones detrás de la proyección"
      invitacionTitulo="¿Cómo se proyecta la informalidad hasta 2042?"
      invitacionPista="Pulse para ver las ecuaciones detrás del pronóstico"
      icono={ICONO}
    >
      <P>
        Las trayectorias que muestra el visualizador no son una simple prolongación de la línea
        histórica. Se construyeron con el modelo estadístico Lee-Carter adaptado, el mismo enfoque
        que el DANE emplea en sus proyecciones oficiales de población (Actualización PPED 2025), a
        partir de los promedios anuales de la Gran Encuesta Integrada de Hogares (GEIH) entre 2007 y
        2024 para 23 ciudades. Se aplica el criterio de informalidad del DANE: es informal quien
        trabaja en un establecimiento con cinco o menos trabajadores.
      </P>

      <H3>Una herramienta de la demografía, aplicada al empleo</H3>
      <P>
        El modelo fue propuesto en 1992 por Ronald D. Lee y Lawrence R. Carter para proyectar la
        mortalidad en Estados Unidos. Su idea es sencilla: la evolución de una tasa en el tiempo
        puede separarse en dos elementos: <strong>quién</strong> es más o menos informal (el perfil
        estructural de cada ciudad) y <strong>cuándo</strong> tiende a bajar o subir esa
        informalidad (una tendencia temporal común a todas las ciudades). Formalmente:
      </P>
      <Ecuacion lectura="logaritmo natural de r sub c coma t, igual a a sub c, más b sub c por kappa sub t, más épsilon sub c coma t">
        ln(<i>r</i>
        <sub>c,t</sub>) = <i>a</i>
        <sub>c</sub> + <i>b</i>
        <sub>c</sub> × <i>κ</i>
        <sub>t</sub> + <i>ε</i>
        <sub>c,t</sub>
      </Ecuacion>
      <Definiciones>
        <li>
          <Mat lectura="r sub c coma t">
            <i>r</i>
            <sub>c,t</sub>
          </Mat>{' '}
          es la tasa de informalidad de la ciudad{' '}
          <Mat lectura="c">
            <i>c</i>
          </Mat>{' '}
          en el año{' '}
          <Mat lectura="t">
            <i>t</i>
          </Mat>
          .
        </li>
        <li>
          <Mat lectura="a sub c">
            <i>a</i>
            <sub>c</sub>
          </Mat>{' '}
          captura el perfil propio de cada ciudad: las de alta informalidad estructural tienen
          valores altos; las más formalizadas, valores menores.
        </li>
        <li>
          <Mat lectura="b sub c">
            <i>b</i>
            <sub>c</sub>
          </Mat>{' '}
          es la sensibilidad al cambio: cuánto responde cada ciudad cuando la tendencia nacional
          mejora o empeora.
        </li>
        <li>
          <Mat lectura="kappa sub t">
            <i>κ</i>
            <sub>t</sub>
          </Mat>{' '}
          es el índice temporal común, una sola variable que resume la trayectoria de la
          informalidad en el conjunto de las 23 ciudades.
        </li>
        <li>
          <Mat lectura="épsilon sub c coma t">
            <i>ε</i>
            <sub>c,t</sub>
          </Mat>{' '}
          recoge las fluctuaciones particulares de cada ciudad que no siguen el patrón general.
        </li>
      </Definiciones>
      <P>
        Los parámetros se estiman por <strong>descomposición en valores singulares (SVD)</strong>{' '}
        de la matriz de logaritmos de las tasas históricas, una vez descontado el efecto de ciudad.
        Se retiene solo el primer componente, que explica el{' '}
        <strong>99,1 % de la varianza total</strong> entre ciudades y años: casi todo el
        movimiento conjunto de la informalidad puede atribuirse a una única dinámica temporal
        compartida.
      </P>

      <H3>Cómo se proyecta el índice temporal: el camino aleatorio con deriva</H3>
      <P>
        Una vez estimado el índice histórico, su proyección hasta 2042 sigue un{' '}
        <strong>ARIMA(0,1,0) con intercepto</strong>, también llamado <em>random walk</em> con
        deriva, el procedimiento que Lee y Carter propusieron originalmente y que el DANE retoma en
        su metodología PPED 2025:
      </P>
      <Ecuacion lectura="delta kappa sub t igual a d más épsilon sub t, con épsilon sub t distribuido normal de media cero y varianza sigma sub épsilon al cuadrado">
        Δ<i>κ</i>
        <sub>t</sub> = <i>d</i> + <i>ε</i>
        <sub>t</sub>,&nbsp;&nbsp; <i>ε</i>
        <sub>t</sub> ∼ N(0, <i>σ</i>
        <sub>ε</sub>
        <sup>2</sup>)
      </Ecuacion>
      <P>
        El término{' '}
        <Mat lectura="delta kappa sub t igual a kappa sub t menos kappa sub t menos uno">
          Δ<i>κ</i>
          <sub>t</sub> = <i>κ</i>
          <sub>t</sub> − <i>κ</i>
          <sub>t−1</sub>
        </Mat>{' '}
        es el cambio anual del índice. La deriva estimada es{' '}
        <Mat lectura="d igual a menos 0,132494">
          <i>d</i> = −0,132494
        </Mat>
        : negativa, lo que significa que el modelo anticipa que la informalidad seguirá
        reduciéndose año a año, aunque lentamente. La desviación estándar de las innovaciones es{' '}
        <Mat lectura="sigma sub épsilon igual a 0,3844">
          <i>σ</i>
          <sub>ε</sub> = 0,3844
        </Mat>
        : el ritmo de cambio no es perfectamente estable; hay años de avance rápido y años de
        estancamiento.
      </P>
      <P>Para cuantificar esa incertidumbre se construyeron intervalos de confianza al 95 %:</P>
      <Ecuacion lectura="kappa sub T más h, más o menos 1,96 por sigma sub épsilon por raíz cuadrada de h">
        <i>κ</i>
        <sub>T+h</sub> ± 1,96 × <i>σ</i>
        <sub>ε</sub> ×{' '}
        <span className="ventana-metodologia__raiz">
          √
          <span className="ventana-metodologia__radicando">
            <i>h</i>
          </span>
        </span>
      </Ecuacion>
      <P>
        Donde{' '}
        <Mat lectura="h">
          <i>h</i>
        </Mat>{' '}
        es el número de años de proyección. La amplitud del intervalo crece con la raíz cuadrada del
        horizonte: cuanto más lejos en el tiempo, mayor es la incertidumbre. Por eso la banda verde
        del visualizador se abre como un abanico hacia 2042. El quiebre al alza de 2020 corresponde
        al impacto de la pandemia por COVID-19, que interrumpió temporalmente la tendencia de
        reducción.
      </P>

      <H3>Del índice temporal a los ocupados informales</H3>
      <P>
        La tasa de informalidad se calcula sobre el total de ocupados, pero no existen proyecciones
        de ocupados por ciudad para 2026–2042. Como aproximación se usó la Población Económicamente
        Activa (PEA) de 15 a 64 años de las proyecciones PPED 2025 del DANE como denominador:
      </P>
      <Ecuacion lectura="ocupados informales sub c coma t igual a PEA sub c coma t por r sub c coma t; ocupados formales sub c coma t igual a PEA sub c coma t por, uno menos r sub c coma t">
        Informales<sub>c,t</sub> = PEA<sub>c,t</sub> × <i>r</i>
        <sub>c,t</sub>
        <span className="ventana-metodologia__separador" aria-hidden="true" />
        Formales<sub>c,t</sub> = PEA<sub>c,t</sub> × (1 − <i>r</i>
        <sub>c,t</sub>)
      </Ecuacion>
      <P>
        Esta aproximación asume que la proporción de personas activas que efectivamente trabaja
        permanece estable en el horizonte. Las cifras absolutas deben leerse, por tanto, como
        estimaciones proyectadas y no como conteos definitivos de ocupados.
      </P>

      <H3>Ciudades que convergen, pero no al mismo ritmo</H3>
      <P>
        El modelo no impone una convergencia forzada: no supone que todas las ciudades terminarán en
        el mismo nivel de informalidad en 2042. Cada una tiene su propia carga{' '}
        <Mat lectura="b sub c">
          <i>b</i>
          <sub>c</sub>
        </Mat>
        . Ciudades con cargas altas, como Medellín (
        <Mat lectura="b sub c igual a 0,075">0,075</Mat>) o Cali (
        <Mat lectura="b sub c igual a 0,059">0,059</Mat>), responden con mayor intensidad a la
        tendencia nacional de reducción; ciudades con cargas bajas, como Pasto (
        <Mat lectura="b sub c igual a 0,033">0,033</Mat>) o Quibdó (
        <Mat lectura="b sub c igual a 0,032">0,032</Mat>), siguen la misma dirección pero más
        despacio. En 2026 la informalidad oscila entre 41,4 % en Bogotá y 77,6 % en Quibdó, una
        brecha de más de 36 puntos que el modelo anticipa prácticamente sin cambios hasta 2042.
      </P>
      <P>
        En conjunto, el promedio ponderado de las 23 ciudades pasa de 50,9 % en 2026 a 47,4 % en
        2042: unos 3,5 puntos menos en dieciséis años, un ritmo modesto pero sostenido. En términos
        absolutos, el modelo estima cerca de 8,1 millones de trabajadores informales en 2026, cifra
        que desciende hacia 7,4 millones en 2042.
      </P>

      <Referencias entradas={REFERENCIAS} />
    </VentanaMetodologia>
  );
}

export default MetodologiaInformalidad;
