/**
 * MetodologiaEnvejecimiento — "Las ecuaciones detrás de las pirámides"
 * (tendencia Envejecimiento, 0.51.0, petición del cliente).
 *
 * Contenido de la ventana emergente de metodología (pieza compartida
 * `VentanaMetodologia`): cómo el DANE proyecta la población por sexo y
 * edad simple que alimenta las pirámides 1985–2050 del módulo. El Word del
 * cliente (`articulo-envejecimiento.docx`) NO trae ecuaciones ni apartado
 * metodológico — su introducción caracteriza los grupos etarios y define
 * tres indicadores —, por lo que la técnica se INDUJO (decisión del
 * cliente 2026-09-23) de tres fuentes: la base Excel del portal (hoja
 * "Totales e Indices": fórmulas de los tres indicadores en sus
 * encabezados; panel por departamento, área, sexo y edad simple 0–100+),
 * la Nota Técnica PPED julio 2025 del DANE (ecuación compensadora, modelo
 * multirregional bottom-up con 22 regiones, población base con
 * sobrevivencia inversa, fecundidad por Lee-Carter penalizado con grupos
 * de convergencia, mortalidad en dos etapas con K-Means y Heligman-Pollard,
 * migración bayesiana Azose-Raftery / Rogers-Castro, migración interna
 * Willekens + ISM) y el Documento metodológico de las proyecciones
 * (definiciones de tabla de vida y relaciones de supervivencia). Las
 * ecuaciones del método de componentes por cohortes son la formulación
 * estándar (CELADE/Naciones Unidas) que esos documentos describen en prosa.
 * Sin gráficas (decisión del cliente). Editar el texto = editar este
 * archivo y recompilar.
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
      'DANE (2025). Nota Técnica PPED — Proyecciones de Población y Estudios Demográficos. Actualización 2025. Dirección de Censos y Demografía. Bogotá: DANE. ',
    url: 'https://www.dane.gov.co/files/censo2018/proyecciones-de-poblacion/Nacional/NotaTecnica-PPED-jul2025.pdf',
  },
  {
    texto:
      'DANE. Documento metodológico. Estimaciones y proyecciones de población nacional, departamental y municipal 1950–2070. Dirección de Censos y Demografía. Bogotá: DANE. ',
    url: 'https://www.dane.gov.co/files/censo2018/proyecciones-de-poblacion/Documento-metodologico-proyecciones.pdf',
  },
  {
    texto:
      'Lee, R. D. & Carter, L. R. (1992). Modeling and Forecasting U.S. Mortality. Journal of the American Statistical Association, 87(419), 659–671. ',
    url: 'https://pages.stern.nyu.edu/~dbackus/BCH/demography/LeeCarter_JASA_92.pdf',
  },
  {
    texto:
      'Heligman, L. & Pollard, J. H. (1980). The age pattern of mortality. Journal of the Institute of Actuaries, 107(1), 49–80.',
  },
  {
    texto:
      'Rogers, A. (2015). Applied Multiregional Demography: Migration and Population Redistribution. Springer. ',
    url: 'https://link.springer.com/book/10.1007/978-3-319-22318-6',
  },
  {
    texto:
      'Azose, J. J. & Raftery, A. E. (2015). Bayesian Probabilistic Projection of International Migration. Demography, 52(5), 1627–1650. ',
    url: 'https://link.springer.com/article/10.1007/s13524-015-0415-0',
  },
];

/* Pirámide poblacional con flecha de proyección */
const ICONO = (
  <svg viewBox="0 0 64 64" width="36" height="36" focusable="false">
    <path
      d="M26 12h12v9h6v9h6v9h6v10H8V39h6v-9h6v-9h6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path d="M32 21v28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 5" />
  </svg>
);

function MetodologiaEnvejecimiento() {
  return (
    <VentanaMetodologia
      contexto="Envejecimiento"
      titulo="Las ecuaciones detrás de las pirámides"
      invitacionTitulo="¿Cómo se proyecta la población hasta 2050?"
      invitacionPista="Pulse para ver el método del DANE y sus ecuaciones"
      icono={ICONO}
    >
      <P>
        Las pirámides del visualizador se dibujan con la serie de población por departamento, área,
        sexo y edad simple (0 a 100 y más años) para 1985–2050 que publica el DANE en sus
        Proyecciones de Población y Estudios Demográficos (PPED), actualizadas en julio de 2025 con
        base en el Censo Nacional de Población y Vivienda 2018. Los años anteriores al censo son
        estimaciones retrospectivas; los posteriores, proyecciones. No son una tendencia
        extrapolada: cada cohorte se envejece año a año con sus propias probabilidades de
        sobrevivir, tener hijos y migrar.
      </P>

      <H3>La ecuación compensadora</H3>
      <P>
        El método es el de <strong>componentes demográficos</strong>: el cambio de una población es
        el resultado de sus nacimientos, defunciones, inmigrantes y emigrantes. En su forma más
        simple, el tamaño de la población en el momento <Mat lectura="T"><i>T</i></Mat> es:
      </P>
      <Ecuacion lectura="P de T igual a P de 0, más B de 0 coma T, menos D de 0 coma T, más I de 0 coma T, menos E de 0 coma T">
        <i>P</i>(<i>T</i>) = <i>P</i>(0) + <i>B</i>(0,<i>T</i>) − <i>D</i>(0,<i>T</i>) + <i>I</i>
        (0,<i>T</i>) − <i>E</i>(0,<i>T</i>)
      </Ecuacion>
      <Definiciones>
        <li>
          <Mat lectura="P de 0"><i>P</i>(0)</Mat> es la población de partida y{' '}
          <Mat lectura="P de T"><i>P</i>(<i>T</i>)</Mat> la población proyectada.
        </li>
        <li>
          <Mat lectura="B"><i>B</i></Mat> y <Mat lectura="D"><i>D</i></Mat> son los nacimientos y
          las defunciones ocurridos entre 0 y <Mat lectura="T"><i>T</i></Mat>.
        </li>
        <li>
          <Mat lectura="I"><i>I</i></Mat> y <Mat lectura="E"><i>E</i></Mat> son los inmigrantes y
          los emigrantes del mismo periodo.
        </li>
      </Definiciones>
      <P>
        Lo que distingue al método de componentes es que esa identidad no se aplica al total, sino a
        cada <strong>cohorte</strong>: cada grupo de personas nacidas en un mismo año se sigue
        edad por edad a lo largo del horizonte.
      </P>

      <H3>Envejecer cada cohorte: la relación de supervivencia</H3>
      <P>
        Para avanzar la población un año, quienes tienen edad{' '}
        <Mat lectura="x"><i>x</i></Mat> en el año <Mat lectura="t"><i>t</i></Mat> pasan a tener
        edad <Mat lectura="x más uno"><i>x</i>+1</Mat> en <Mat lectura="t más uno"><i>t</i>+1</Mat>,
        descontados los fallecidos y sumado el saldo migratorio, por sexo:
      </P>
      <Ecuacion lectura="P sub x más uno coma t más uno, igual a P sub x coma t por S sub x coma t, más M sub x coma t">
        <i>P</i>
        <sub>x+1, t+1</sub> = <i>P</i>
        <sub>x, t</sub> × <i>S</i>
        <sub>x, t</sub> + <i>M</i>
        <sub>x, t</sub>
      </Ecuacion>
      <P>
        La <strong>relación de supervivencia</strong>{' '}
        <Mat lectura="S sub x"><i>S</i><sub>x</sub></Mat> sale de la tabla de vida de cada región,
        sexo y año: es la probabilidad de que quienes tienen edad{' '}
        <Mat lectura="x"><i>x</i></Mat> sobrevivan hasta la edad siguiente. Se construye a partir de
        las probabilidades de morir <Mat lectura="q sub x"><i>q</i><sub>x</sub></Mat>:
      </P>
      <Ecuacion lectura="l sub x más uno igual a l sub x por, uno menos q sub x; L sub x igual a l sub x más uno más k sub x por, l sub x menos l sub x más uno; S sub x igual a L sub x más uno sobre L sub x">
        <i>l</i>
        <sub>x+1</sub> = <i>l</i>
        <sub>x</sub> × (1 − <i>q</i>
        <sub>x</sub>)
        <span className="ventana-metodologia__separador" aria-hidden="true" />
        <i>L</i>
        <sub>x</sub> = <i>l</i>
        <sub>x+1</sub> + <i>k</i>
        <sub>x</sub> × (<i>l</i>
        <sub>x</sub> − <i>l</i>
        <sub>x+1</sub>)
        <span className="ventana-metodologia__separador" aria-hidden="true" />
        <i>S</i>
        <sub>x</sub> = <i>L</i>
        <sub>x+1</sub> / <i>L</i>
        <sub>x</sub>
      </Ecuacion>
      <Definiciones>
        <li>
          <Mat lectura="l sub x"><i>l</i><sub>x</sub></Mat>: sobrevivientes a la edad exacta{' '}
          <Mat lectura="x"><i>x</i></Mat> de una generación inicial de{' '}
          <Mat lectura="l sub cero"><i>l</i><sub>0</sub></Mat> nacimientos.
        </li>
        <li>
          <Mat lectura="L sub x"><i>L</i><sub>x</sub></Mat>: población de la tabla de vida, los
          años-persona vividos entre <Mat lectura="x"><i>x</i></Mat> y{' '}
          <Mat lectura="x más uno"><i>x</i>+1</Mat>; <Mat lectura="k sub x"><i>k</i><sub>x</sub></Mat>{' '}
          es el factor de separación de las defunciones dentro del intervalo.
        </li>
        <li>
          La esperanza de vida a la edad <Mat lectura="x"><i>x</i></Mat> es{' '}
          <Mat lectura="e sub x igual a T sub x sobre l sub x">
            <i>e</i>
            <sub>x</sub> = <i>T</i>
            <sub>x</sub> / <i>l</i>
            <sub>x</sub>
          </Mat>
          , con <Mat lectura="T sub x"><i>T</i><sub>x</sub></Mat> la suma de los{' '}
          <Mat lectura="L"><i>L</i></Mat> desde <Mat lectura="x"><i>x</i></Mat> hasta el límite de
          la vida.
        </li>
      </Definiciones>

      <H3>Los nacimientos que forman la base de la pirámide</H3>
      <P>
        La edad 0 de cada año no viene de ninguna cohorte anterior: se calcula aplicando las{' '}
        <strong>tasas específicas de fecundidad</strong>{' '}
        <Mat lectura="f sub x"><i>f</i><sub>x</sub></Mat> (nacidos vivos por mujer de edad{' '}
        <Mat lectura="x"><i>x</i></Mat>) a las mujeres en edad fértil, de 10 a 49 años:
      </P>
      <Ecuacion lectura="B sub t igual a la sumatoria, para x de 10 a 49, de f sub x coma t por W sub x coma t; y TGF sub t igual a la sumatoria de f sub x coma t">
        <i>B</i>
        <sub>t</sub> = Σ<sub>x=10</sub>
        <sup>49</sup> <i>f</i>
        <sub>x, t</sub> × <i>W</i>
        <sub>x, t</sub>
        <span className="ventana-metodologia__separador" aria-hidden="true" />
        TGF<sub>t</sub> = Σ<sub>x=10</sub>
        <sup>49</sup> <i>f</i>
        <sub>x, t</sub>
      </Ecuacion>
      <P>
        La Tasa Global de Fecundidad (TGF) resume el nivel: los hijos que tendría cada mujer si
        atravesara su vida fértil con esas tasas. Los nacimientos se reparten por sexo con la razón
        de masculinidad al nacer y sobreviven hasta cumplir el primer año con la relación{' '}
        <Mat lectura="L sub cero sobre l sub cero">
          <i>L</i>
          <sub>0</sub> / <i>l</i>
          <sub>0</sub>
        </Mat>
        . La actualización 2025 nació precisamente de una caída de los nacimientos posterior a la
        pandemia más fuerte de lo proyectado: el nivel de partida se reestimó por{' '}
        <strong>sobrevivencia inversa</strong> (los niños censados se "devuelven" a su año de
        nacimiento con la mortalidad intercensal), ajustado con las extensiones de Hauer y
        Schmertmann (2020).
      </P>
      <P>
        Para proyectar la estructura por edad de la fecundidad, el DANE suaviza las tasas
        observadas de las estadísticas vitales con regresiones Loess y las proyecta con una
        extensión del modelo Lee-Carter (1992), el mismo que usa la tendencia de Informalidad:
      </P>
      <Ecuacion lectura="logaritmo natural de f sub x coma t, igual a a sub x, más b sub x por kappa sub t, más épsilon sub x coma t">
        ln(<i>f</i>
        <sub>x, t</sub>) = <i>a</i>
        <sub>x</sub> + <i>b</i>
        <sub>x</sub> × <i>κ</i>
        <sub>t</sub> + <i>ε</i>
        <sub>x, t</sub>
      </Ecuacion>
      <P>
        Aquí <Mat lectura="a sub x"><i>a</i><sub>x</sub></Mat> es el perfil por edad de la madre,{' '}
        <Mat lectura="b sub x"><i>b</i><sub>x</sub></Mat> cuánto cambia cada edad cuando el nivel
        general se mueve y <Mat lectura="kappa sub t"><i>κ</i><sub>t</sub></Mat> el índice temporal
        de la fecundidad. El modelo se <strong>penaliza</strong> para inducir el corrimiento de la
        maternidad hacia edades mayores, y las regiones se agrupan en clústeres de convergencia
        según su TGF histórica: las de fecundidad alta siguen la senda proyectada por Naciones
        Unidas para Bolivia; las medias, la de Costa Rica; y las bajas, la estructura de Argentina
        en 2050.
      </P>

      <H3>La mortalidad en dos etapas</H3>
      <P>
        Primero se proyectan, como series de tiempo independientes, tres niveles: la esperanza de
        vida al nacer <Mat lectura="e sub cero"><i>e</i><sub>0</sub></Mat>, la esperanza de vida a
        los 100 años <Mat lectura="e sub cien"><i>e</i><sub>100</sub></Mat> y la mortalidad infantil{' '}
        <Mat lectura="q sub cero"><i>q</i><sub>0</sub></Mat>, incorporando la tendencia observada en
        las estadísticas vitales después de 2019 para capturar el choque de la COVID-19 en cada
        región. Los valores de convergencia al año 2100 se fijaron agrupando las regiones con el
        algoritmo K-Means en cuatro clústeres de mortalidad, cada uno alineado con un país de
        referencia del World Population Prospects 2024: baja (Chile,{' '}
        <Mat lectura="e sub cero de 86,9 años en hombres y 89,1 en mujeres">
          <i>e</i>
          <sub>0</sub> = 86,9 / 89,1
        </Mat>
        ), media baja (México, 81,5 / 84,6), media alta (Brasil, 80,8 / 85,1) y alta (Guyana,
        75,5 / 79,8), hombres y mujeres respectivamente.
      </P>
      <P>
        Después se reconstruye el patrón por edad, las tasas centrales de mortalidad{' '}
        <Mat lectura="m sub x"><i>m</i><sub>x</sub></Mat> o las probabilidades{' '}
        <Mat lectura="q sub x"><i>q</i><sub>x</sub></Mat>, a partir de las estadísticas vitales y la
        pregunta censal sobre fallecidos en el hogar, suavizado con la ley de Heligman y Pollard
        (1980), que describe la curva completa de mortalidad con ocho parámetros:
      </P>
      <Ecuacion lectura="q sub x sobre p sub x igual a A elevado a, x más B, elevado a C; más D por exponencial de menos E por, logaritmo de x menos logaritmo de F, al cuadrado; más G por H elevado a x">
        <i>q</i>
        <sub>x</sub> / <i>p</i>
        <sub>x</sub> = <i>A</i>
        <sup>(x+B)<sup>C</sup></sup> + <i>D</i>·e<sup>−E (ln x − ln F)²</sup> + <i>G</i>·<i>H</i>
        <sup>x</sup>
      </Ecuacion>
      <P>
        Los tres sumandos son la mortalidad infantil, que cae rápidamente con la edad; la "joroba"
        de accidentes de la juventud, centrada en la edad{' '}
        <Mat lectura="F"><i>F</i></Mat>; y el crecimiento exponencial de la mortalidad adulta
        (ley de Gompertz). Los patrones se ajustan iterativamente, con plantillas de CELADE, hasta
        que las tablas de vida reproducen los niveles{' '}
        <Mat lectura="e sub cero, e sub cien y q sub cero">
          <i>e</i>
          <sub>0</sub>, <i>e</i>
          <sub>100</sub>, <i>q</i>
          <sub>0</sub>
        </Mat>{' '}
        fijados en la primera etapa.
      </P>

      <H3>La migración: el componente más incierto</H3>
      <P>
        La <strong>migración internacional</strong> se proyecta con el modelo bayesiano jerárquico
        de Azose y Raftery (2015) sobre las estimaciones del World Population Prospects, contrastado
        con la GEIH y el stock de colombianos en el exterior estimado por Naciones Unidas. Los
        patrones por edad y sexo se suavizan con el modelo de Rogers y Castro, y el supuesto de
        largo plazo es que inmigración y emigración vuelven al promedio histórico anterior a 2014.
      </P>
      <P>
        La <strong>migración interna</strong> se modela como una matriz origen-destino entre 22
        regiones, con tasas por sexo y edad simple (Willekens, 1999), suavizadas por regresión
        kernel y resumidas en un Índice Sintético de Migración que decrece a lo largo del horizonte.
        Es lo que convierte el ejercicio en un modelo <strong>multirregional</strong>: la población
        de todas las regiones se proyecta a la vez, en un solo sistema matricial, de modo que los
        emigrantes de una región son exactamente los inmigrantes de otra:
      </P>
      <Ecuacion lectura="el vector de población en t más uno es igual a la matriz de crecimiento G por el vector de población en t">
        <b>P</b>
        <sub>t+1</sub> = <b>G</b>
        <sub>t</sub> · <b>P</b>
        <sub>t</sub>
      </Ecuacion>
      <P>
        Donde <Mat lectura="P sub t"><b>P</b><sub>t</sub></Mat> apila la población por región,
        sexo y edad, y <Mat lectura="G sub t"><b>G</b><sub>t</sub></Mat> reúne en una sola matriz
        las supervivencias, las fecundidades y las tasas de migración entre regiones (Rogers, 2015).
        El DANE adoptó la estrategia <em>bottom-up</em>: cada región se proyecta de forma autónoma
        y el total nacional es la suma de las 22; los departamentos se obtienen por agregación de
        sus municipios.
      </P>

      <H3>De la pirámide a los indicadores de envejecimiento</H3>
      <P>
        Sobre esa serie, la base del portal calcula por departamento y año los tres indicadores que
        acompañan el análisis, con la población de 60 años o más como numerador:
      </P>
      <Ecuacion lectura="tasa de envejecimiento igual a población de 60 y más sobre población total por 100; índice de envejecimiento igual a población de 60 y más sobre población menor de 15 por 100; relación de dependencia de mayores igual a población de 60 y más sobre población de 15 a 59 por 100">
        Tasa de envejecimiento = <i>P</i>
        <sub>60+</sub> / <i>P</i>
        <sub>total</sub> × 100
        <span className="ventana-metodologia__separador" aria-hidden="true" />
        Índice de envejecimiento = <i>P</i>
        <sub>60+</sub> / <i>P</i>
        <sub>&lt;15</sub> × 100
        <span className="ventana-metodologia__separador" aria-hidden="true" />
        Dependencia de mayores = <i>P</i>
        <sub>60+</sub> / <i>P</i>
        <sub>15–59</sub> × 100
      </Ecuacion>
      <P>
        Para Colombia, la tasa de envejecimiento pasa de 6,9 % en 1985 a 14,9 % en 2025 y 24,6 % en
        2050; el índice cruza el umbral de 100 hacia 2036, cuando habrá más personas de 60 años o
        más que menores de 15; y la dependencia de mayores sube de 11,9 a 39,8 por cada 100
        personas de 15 a 59 años. El propio DANE, con el corte en 65 años, estima que el índice de
        envejecimiento pasa de 36,7 en 2018 a 135,9 en 2050, y que la tasa de crecimiento de la
        población será negativa desde 2044.
      </P>

      <Referencias entradas={REFERENCIAS} />
    </VentanaMetodologia>
  );
}

export default MetodologiaEnvejecimiento;
