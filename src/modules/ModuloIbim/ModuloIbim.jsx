/**
 * ModuloIbim — Artículo territorial del IBiM (id 'ibim-articulo'; desde
 * 0.47.0 se llega por la portada de IBiM o por su submenú).
 *
 * Artículo "El bienestar también tiene geografía. Lectura territorial del Índice de Bienestar Multidimensional (IBiM) en Antioquia" con el contenido FIJO en el código,
 * mismo patrón de los artículos del portal (Benchmarking, tendencias-
 * artículo): sin lecturas de .docx/.json en runtime, texto transcrito
 * literal del Word del cliente (JSX generado por script desde el
 * documento para evitar errores de transcripción), 13 figuras como WebP
 * calidad 90 (21,4 MB en PNG → 1,67 MB) con carga perezosa y caché
 * inmutable, DOS citas destacadas (Rosling y Sen), 6 apartados de un
 * solo nivel y 4 referencias con sangría a la francesa y URL enlazadas.
 *
 * Ajustes de composición documentados: el rótulo de la Figura 13 viene
 * partido en dos párrafos en el Word (se compone como los demás); las
 * notas de las Figuras 9 y 10 vienen sin el estilo de nota (se
 * uniforman); los encabezados traen un espacio inicial (se recorta).
 * Transcritos tal cual y por avisar al cliente: "Retrieved from" en
 * inglés en tres referencias, "Gobernación de Antioquia ." con espacio
 * antes del punto, y el nombre de la editorial dentro de la cursiva del
 * título en la primera referencia.
 *
 * Cambios del artículo = editar este código y recompilar.
 */
import { useRef } from 'react';
import TablaContenido from '../../components/TablaContenido/TablaContenido.jsx';
import './modulo-ibim.css';

import figura01 from '../../assets/ibim/figura-01.webp';
import figura02 from '../../assets/ibim/figura-02.webp';
import figura03 from '../../assets/ibim/figura-03.webp';
import figura04 from '../../assets/ibim/figura-04.webp';
import figura05 from '../../assets/ibim/figura-05.webp';
import figura06 from '../../assets/ibim/figura-06.webp';
import figura07 from '../../assets/ibim/figura-07.webp';
import figura08 from '../../assets/ibim/figura-08.webp';
import figura09 from '../../assets/ibim/figura-09.webp';
import figura10 from '../../assets/ibim/figura-10.webp';
import figura11 from '../../assets/ibim/figura-11.webp';
import figura12 from '../../assets/ibim/figura-12.webp';
import figura13 from '../../assets/ibim/figura-13.webp';

/* Rótulo al estilo del documento: "Figura N." en negrita, título plano. */
function Figura({ numero, titulo, imagen, alt, nota }) {
  return (
    <figure className="modulo-ibim__figura">
      <figcaption className="modulo-ibim__figura-rotulo">
        <strong>Figura {numero}.</strong> {titulo}
      </figcaption>
      <img className="modulo-ibim__figura-imagen" src={imagen} alt={alt} loading="lazy" />
      <p className="modulo-ibim__figura-nota">
        <strong>Nota.</strong> {nota}
      </p>
    </figure>
  );
}

const P = ({ children }) => <p className="modulo-ibim__parrafo">{children}</p>;
const H2 = ({ children }) => <h2 className="modulo-ibim__seccion">{children}</h2>;
const Cita = ({ children }) => (
  <blockquote className="modulo-ibim__cita-destacada">{children}</blockquote>
);
const Ref = ({ children }) => <li className="modulo-ibim__referencia">{children}</li>;
const Enlace = ({ url }) => (
  <a href={url} target="_blank" rel="noreferrer">
    {url}
  </a>
);

function ModuloIbim() {
  /* El índice lee los apartados del artículo renderizado por esta ref. */
  const articuloRef = useRef(null);

  return (
    <section className="modulo-ibim" aria-labelledby="titulo-ibim">
      <header className="modulo-ibim__encabezado">
        <h1 id="titulo-ibim" className="modulo-ibim__titulo">
          IBiM
        </h1>
        <p className="modulo-ibim__titulo-articulo">El bienestar también tiene geografía</p>
        <p className="modulo-ibim__subtitulo-articulo">Lectura territorial del Índice de Bienestar Multidimensional (IBiM) en Antioquia</p>
        <p className="modulo-ibim__fecha-articulo">Antioquia, 2022</p>
      </header>

      {/* Rejilla índice + artículo (tabla de contenido del cliente) */}
      <div className="articulo-con-indice">
        <TablaContenido articuloRef={articuloRef} />
        <article ref={articuloRef} className="modulo-ibim__panel">
        <Cita>“Lo interesante no son los números. Lo interesante es lo que cuentan sobre las vidas detrás de los números.” — Hans Rosling</Cita>
        <P>El bienestar suele resumirse en una cifra, pero rara vez se distribuye de manera uniforme sobre el territorio. En Antioquia, el Índice de Bienestar Multidimensional (IBiM) permite observar esa geografía con una lente más amplia: reúne dimensiones materiales, sociales, laborales, de salud, educación, disfrute, seguridad y condiciones de vida para mostrar que la experiencia de bienestar cambia cuando cambia el lugar donde transcurre la vida cotidiana.</P>
        <P>En este contexto, la lectura territorial parte de un valor general de 89,3 puntos. A primera vista, la cifra describe un nivel agregado; al descomponerla por subregión, sin embargo, aparece una amplitud de 9,3 puntos entre Oriente, con 93,9, y Aburrá Centro, con 84,6. Esa distancia se vuelve más elocuente cuando se observan los niveles internos de bienestar: la insuficiencia oscila entre 13,5 % y 31,9 %, mientras el bienestar alto varía entre 15,0 % y 39,2 %. El promedio, por tanto, funciona como punto de referencia, pero no agota la historia territorial.</P>
        <P>A partir de esa idea, el artículo recorre las nueve subregiones incluidas en la medición mediante mapas y gráficas que permiten cambiar de escala sin perder el hilo. Primero se observa dónde se ubican los valores más altos y bajos del IBiM; después se examina cómo se distribuyen la insuficiencia, el bienestar moderado y el bienestar alto; finalmente, la mirada se desplaza hacia dimensiones concretas como vínculos sociales, trabajo, vivienda y entorno. El propósito no es acumular cifras, sino seguir las señales que dejan. Allí donde el mapa cambia de color, también cambia la forma en que se combinan los recursos, las redes de apoyo, la seguridad, la vivienda, la salud y las posibilidades de desarrollar la vida cotidiana</P>
        <H2>El índice dibuja una geografía propia</H2>
        <P>El bienestar no se reparte de la misma manera en todo Antioquia. Oriente aparece en la parte más alta del mapa, con un IBiM de 93,9 puntos, mientras Aburrá Centro se ubica en el extremo opuesto, con 84,6. Entre ambos quedan casi diez puntos de distancia y, sobre todo, nueve territorios que cuentan historias distintas sobre cómo se vive, se trabaja, se habita y se accede a oportunidades dentro del mismo departamento.</P>
        <P>La diferencia no sigue una lógica geográfica sencilla. Occidente, Aburrá Sur, Nordeste–Magdalena Medio y Suroeste también se ubican por encima del referente departamental, mientras Aburrá Norte, Urabá y Norte–Bajo Cauca permanecen por debajo. El mapa, por tanto, no separa con nitidez un centro favorecido de una periferia rezagada. Lo que aparece es un mosaico más complejo, donde territorios cercanos pueden tener resultados muy distintos y donde la proximidad física no garantiza experiencias semejantes de bienestar.</P>
        <P>La distancia entre Oriente y Aburrá Centro alcanza 9,3 puntos. Esa brecha importa porque muestra que el promedio de 89,3 funciona apenas como una referencia general. Detrás de ese valor conviven subregiones con ventajas más claras y otras donde las condiciones de bienestar se estrechan. La Figura 1 deja ver esa distribución de manera directa: los tonos más intensos se concentran en los territorios con mayores valores del índice, mientras los registros más bajos aparecen en una franja territorial distinta.</P>
        <P>Pero el mapa también advierte algo más. Dos subregiones pueden tener puntajes cercanos y, aun así, llegar a ellos por caminos diferentes. Una puede sostener su posición por mejores condiciones de vivienda o salud; otra puede hacerlo a pesar de mayores presiones económicas, laborales o sociales. El IBiM resume esas combinaciones en una sola cifra, pero no las explica por completo. Para comprenderlas, es necesario abrir el índice y mirar qué ocurre con la insuficiencia, el bienestar alto y las dimensiones que componen la experiencia cotidiana. La <strong>Figura 1</strong> funciona, entonces, como la puerta de entrada al territorio. Permite reconocer dónde se concentra el mayor nivel general de bienestar, pero también prepara una segunda pregunta: qué ocurre dentro de cada subregión cuando el promedio deja de ser suficiente y aparecen las diferencias internas.</P>
        <Figura
          numero={1}
          titulo="Índice de Bienestar Multidimensional (IBiM) por subregión"
          imagen={figura01}
          alt="Mapa de Antioquia por subregiones coloreado según el IBiM, con el ranking de mayor a menor: Oriente 93,9; Occidente 92,6; Aburrá Sur 91,8; Nordeste–Magdalena Medio 91,6; Suroeste 90,5; Aburrá Norte 87,7; Urabá 87,2; Norte–Bajo Cauca 87,0 y Aburrá Centro 84,6"
          nota="El mapa representa el valor territorial del IBiM. Los tonos más intensos corresponden a valores más altos del índice."
        />
        <P>Por otra parte, cuando el foco se desplaza del puntaje general hacia la insuficiencia, el mapa cambia de tono. Aburrá Centro aparece con la mayor proporción, 31,9 %, seguido por Norte–Bajo Cauca y Urabá, ambos próximos al 30 %. En Oriente, en cambio, la insuficiencia desciende hasta 13,5 %, mientras Occidente permanece en 16,3 %. Entre los extremos se abre una distancia superior a 18 puntos porcentuales. La cifra revela algo que el IBiM general apenas insinúa: dentro de un mismo departamento, la posibilidad de alcanzar condiciones suficientes de bienestar cambia de manera considerable según el territorio.</P>
        <P>La insuficiencia cuenta una historia distinta a la del índice agregado. No basta con saber qué subregión obtiene un puntaje mayor o menor; también importa conocer cuánta población permanece en la parte más vulnerable de la distribución. Un territorio puede situarse relativamente cerca del promedio departamental y, al mismo tiempo, concentrar una proporción importante de personas con privaciones. Como muestra la <strong>Figura 2</strong>, Aburrá Centro, Norte–Bajo Cauca y Urabá forman la franja donde esta condición adquiere mayor presencia, mientras Oriente y Occidente muestran una incidencia considerablemente menor.</P>
        <P>Esa diferencia modifica la manera de leer el bienestar territorial. Allí donde la insuficiencia gana espacio, el promedio convive con una base más amplia de carencias; donde retrocede, una mayor proporción de la población logra superar ese umbral. El mapa deja entonces de ser una simple escala de colores y se convierte en una radiografía de las brechas internas del departamento. La <strong>Figura 2</strong> permite reconocer esa geografía: no solo señala dónde hay más insuficiencia, sino dónde las condiciones de bienestar parecen llegar con menor intensidad a una parte de la población.</P>
        <Figura
          numero={2}
          titulo="Insuficiencia de bienestar por subregión"
          imagen={figura02}
          alt="Mapa de Antioquia en tonos naranja con la insuficiencia de bienestar por subregión, de mayor a menor: Aburrá Centro 31,9 %; Norte–Bajo Cauca 28,8 %; Urabá 28,0 %; Aburrá Norte 26,0 %; Suroeste 21,0 %; Nordeste–Magdalena Medio 18,1 %; Aburrá Sur 18,0 %; Occidente 16,3 % y Oriente 13,5 %"
          nota="El mapa muestra la proporción de población clasificada en insuficiencia de bienestar. Los tonos más intensos corresponden a porcentajes más altos."
        />
        <P>De manera complementaria, el mapa de bienestar alto completa la escena. Oriente y Aburrá Sur comparten el valor más elevado, con 39,2 %, mientras Urabá registra 15,0 % y Norte–Bajo Cauca 18,3 %. El contraste es especialmente útil porque un territorio puede combinar una proporción relevante de bienestar alto con una presencia también significativa de insuficiencia. Aburrá Norte, por ejemplo, alcanza 30,2 % de bienestar alto, pero al mismo tiempo registra 26,0 % de insuficiencia. En consecuencia, la coexistencia de ambos extremos obliga a mirar más allá del promedio.</P>
        <P>A partir de esta comparación, el bienestar alto introduce otra capa de diferenciación. Oriente y Aburrá Sur alcanzan 39,2 %, pese a que sus valores globales del IBiM no son idénticos, mientras Urabá se mantiene en 15,0 %. Como se observa en la <strong>Figura 3</strong>, la proporción de población ubicada en el nivel más alto no sigue de manera automática el orden del índice general. Esta diferencia refuerza la necesidad de leer el territorio desde la composición del bienestar y no únicamente desde la posición que ocupa cada subregión en el índice.</P>
        <Figura
          numero={3}
          titulo="Bienestar alto por subregión"
          imagen={figura03}
          alt="Mapa de Antioquia en tonos verdes con el bienestar alto por subregión, de mayor a menor: Oriente y Aburrá Sur 39,2 %; Aburrá Norte 30,2 %; Occidente 27,9 %; Nordeste–Magdalena Medio 27,7 %; Aburrá Centro 25,1 %; Suroeste 22,4 %; Norte–Bajo Cauca 18,3 % y Urabá 15,0 %"
          nota="El mapa muestra la proporción de población clasificada en bienestar alto. Los tonos más intensos corresponden a porcentajes mayores."
        />
        <H2>El promedio ordena, pero también puede esconder</H2>
        <Cita>“El desarrollo puede entenderse como un proceso de expansión de las libertades reales que disfrutan las personas.” — Amartya Sen</Cita>
        <P>El valor departamental de 89,3 puntos divide el mapa en dos grandes grupos. Cinco subregiones quedan por encima de esa referencia y cuatro por debajo. Oriente marca la mayor distancia positiva, con 4,6 puntos sobre el promedio, mientras Aburrá Centro se ubica 4,7 puntos por debajo. Entre ambos extremos aparecen territorios mucho más próximos a la media, donde la distancia se reduce y las diferencias dejan de ser tan visibles a simple vista. La <strong>Figura 4</strong> permite reconocer esta distribución territorial y ubicar rápidamente qué subregiones se alejan más del valor agregado.</P>
        <P>Sin embargo, el promedio funciona mejor como una brújula que como una frontera. Estar por encima de 89,3 no significa que las privaciones desaparezcan, del mismo modo que quedar por debajo no implica que todas las condiciones de bienestar sean desfavorables. El dato organiza la comparación, pero no explica por sí solo qué ocurre dentro de cada territorio. Una subregión puede encontrarse cerca de la media y, aun así, combinar niveles muy distintos de salud, vivienda, empleo, seguridad o vínculos sociales.</P>
        <P>Esa es precisamente una de las claves del enfoque multidimensional. El puntaje permite saber dónde se encuentra cada territorio dentro del conjunto, pero la posición no revela todavía cómo se construye ese resultado. Dos subregiones separadas por pocos puntos pueden llegar a valores semejantes a través de realidades sociales completamente distintas.</P>
        <P>La distancia respecto al promedio adquiere mayor sentido cuando se observa su magnitud. Oriente se separa con claridad hacia arriba, mientras Aburrá Centro ocupa el extremo contrario. Suroeste y Aburrá Norte, en cambio, permanecen mucho más cerca de la línea departamental. Esa cercanía muestra que unas pocas décimas o puntos pueden modificar la posición relativa sin transformar necesariamente la estructura cotidiana del bienestar. El interés, entonces, no está solamente en saber quién queda arriba o abajo, sino en entender qué hay detrás de esa diferencia.</P>
        <Figura
          numero={4}
          titulo="Clasificación territorial del IBiM frente al promedio de Antioquia"
          imagen={figura04}
          alt="Infografía que clasifica las subregiones frente al promedio departamental de 89,3: cinco por encima (Oriente, Occidente, Aburrá Sur, Nordeste–Magdalena Medio y Suroeste) y cuatro por debajo (Aburrá Norte, Urabá, Norte–Bajo Cauca y Aburrá Centro)"
          nota="La figura ordena las subregiones según su posición respecto del valor territorial de referencia del IBiM (89,3)."
        />
        <P>En ese marco, la brecha frente al promedio permite ver la magnitud de las distancias sin perder de vista que el valor de referencia es una media territorial. Oriente no solo ocupa el primer lugar: se separa con claridad del centro de la distribución. Aburrá Centro, en cambio, aparece como el territorio más alejado por debajo. Entre ambos se forma un corredor intermedio en el que varias subregiones se encuentran relativamente próximas, aunque sus perfiles internos de privación no sean necesariamente semejantes.</P>
        <P>De forma adicional, la distancia frente al promedio permite diferenciar posiciones cercanas de rezagos más amplios. Suroeste permanece apenas 1,2 puntos por encima del referente, mientras Aburrá Norte se encuentra 1,6 puntos por debajo; ambos están relativamente próximos a la media. En cambio, Oriente y Aburrá Centro ocupan los extremos opuestos de esta comparación. La <strong>Figura 5</strong> muestra que la variación territorial no depende solo del signo de la brecha, sino también de su tamaño.</P>
        <Figura
          numero={5}
          titulo="Brecha de cada subregión frente al promedio territorial del IBiM"
          imagen={figura05}
          alt="Gráfica de barras horizontales con la diferencia en puntos de cada subregión frente al promedio de 89,3: Oriente +4,6; Occidente +3,3; Aburrá Sur +2,5; Nordeste–Magdalena Medio +2,3; Suroeste +1,2; Aburrá Norte −1,6; Urabá −2,1; Norte–Bajo Cauca −2,3 y Aburrá Centro −4,7"
          nota="La figura expresa, en puntos, la distancia de cada subregión frente al valor de referencia de Antioquia (89,3). Los valores positivos indican resultados superiores al promedio y los negativos, inferiores."
        />
        <P>A su vez, cuando se cruzan insuficiencia y bienestar alto, la geografía deja de ser lineal. Oriente y Aburrá Sur ocupan el cuadrante más favorable por combinar proporciones altas de bienestar alto con insuficiencias inferiores al promedio. Urabá y Norte–Bajo Cauca se desplazan hacia el cuadrante de mayor rezago relativo, donde la insuficiencia supera el promedio y el bienestar alto se mantiene por debajo de la referencia. Aburrá Centro presenta una configuración particular: registra la mayor insuficiencia, pero su proporción de bienestar alto supera la de Urabá y Norte–Bajo Cauca. Así, los territorios no se ordenan de la misma forma cuando cambia la variable observada.</P>
        <P>En contraste, el cruce entre ambos extremos revela configuraciones que el promedio no distingue. Oriente combina 13,5 % de insuficiencia con 39,2 % de bienestar alto, mientras Aburrá Centro reúne 31,9 % de insuficiencia y 25,1 % de bienestar alto. Urabá y Norte–Bajo Cauca también se ubican en una zona de mayor insuficiencia y menor bienestar alto. Como se aprecia en la <strong>Figura 6</strong>, la posición relativa cambia cuando se consideran simultáneamente los dos extremos de la distribución.</P>
        <Figura
          numero={6}
          titulo="Matriz territorial entre insuficiencia y bienestar alto"
          imagen={figura06}
          alt="Diagrama de dispersión que cruza insuficiencia (eje horizontal) y bienestar alto (eje vertical) por subregión, con líneas discontinuas en los promedios de 22,9 % y 28,7 %; Oriente y Aburrá Sur en la zona más favorable, Urabá y Norte–Bajo Cauca en la de mayor rezago relativo"
          nota="La figura cruza la proporción de insuficiencia de bienestar con la proporción de bienestar alto. Las líneas discontinuas corresponden a los promedios territoriales de ambas variables."
        />
        <P>La distribución interna del bienestar cuenta una historia que el puntaje general no alcanza a mostrar. En varias subregiones, la mayor parte de la población no se concentra ni en la insuficiencia ni en el bienestar alto, sino en una franja intermedia. Occidente, Nordeste–Magdalena Medio, Suroeste, Urabá y Norte–Bajo Cauca tienen más de la mitad de su población en bienestar moderado. Esa presencia amplia de la zona media revela territorios donde una parte importante de la población se mantiene lejos de los extremos, pero todavía sin consolidarse en los niveles más altos de bienestar.</P>
        <P>Aburrá Sur introduce un contraste distinto. Allí, el bienestar alto alcanza 39,2 %, mientras la insuficiencia se mantiene en 18,0 % y el nivel moderado representa 42,8 %. La composición es más repartida y muestra que un territorio puede registrar un IBiM elevado sin concentrar necesariamente a la mayoría de su población en una sola categoría. La <strong>Figura 7</strong> permite observar estas diferencias y confirma que territorios con valores globales relativamente próximos pueden estar construidos sobre estructuras internas muy distintas.</P>
        <Figura
          numero={7}
          titulo="Distribución de los niveles de bienestar por subregión"
          imagen={figura07}
          alt="Gráfica de barras apiladas al 100 % con la proporción de insuficiencia, bienestar moderado y bienestar alto en cada subregión; Oriente y Aburrá Sur tienen la mayor proporción de bienestar alto (39,2 %) y Aburrá Centro la mayor insuficiencia (31,9 %)"
          nota="Las barras muestran la composición porcentual de insuficiencia, bienestar moderado y bienestar alto en cada subregión."
        />
        <P>La distancia entre bienestar alto e insuficiencia permite ver con mayor nitidez hacia qué extremo se inclina cada territorio. Oriente presenta la ventaja más amplia, con una brecha positiva de 25,7 puntos porcentuales, seguido por Aburrá Sur, con 21,2. Suroeste, en cambio, se mueve casi sobre una línea de equilibrio: apenas 1,4 puntos separan a quienes se encuentran en bienestar alto de quienes permanecen en insuficiencia. La diferencia deja de ser un simple cálculo y empieza a mostrar cómo se distribuyen las oportunidades de bienestar dentro de cada subregión.</P>
        <P>El panorama cambia al llegar a Urabá, Norte–Bajo Cauca y Aburrá Centro. Allí la balanza se inclina en sentido contrario: la insuficiencia supera al bienestar alto en 13,0, 10,5 y 6,8 puntos porcentuales, respectivamente. La señal territorial es clara: no todas las subregiones llegan al mismo resultado por la misma vía, y algunas concentran una proporción mayor de población en el extremo más desfavorable de la distribución.</P>
        <P>La <strong>Figura 8</strong> convierte esa diferencia en una lectura inmediata del territorio. Las brechas positivas muestran dónde el bienestar alto tiene mayor peso relativo; las negativas revelan dónde la insuficiencia ocupa más espacio. Más que establecer un nuevo ranking, la comparación permite observar el equilibrio interno de cada subregión y entender por qué dos territorios con valores globales cercanos pueden presentar realidades sociales muy distintas.</P>
        <Figura
          numero={8}
          titulo="Brecha entre bienestar alto e insuficiencia por subregión"
          imagen={figura08}
          alt="Gráfica de puntos conectados que compara bienestar alto e insuficiencia por subregión y muestra la brecha en puntos porcentuales: de +25,7 en Oriente a −13,0 en Urabá"
          nota="La brecha corresponde a la diferencia, en puntos porcentuales, entre la proporción de bienestar alto y la de insuficiencia en cada territorio."
        />
        <H2>Un mismo índice puede esconder estructuras distintas</H2>
        <P>Comparar territorios contrastantes permite observar que el IBiM no responde a una única combinación de factores. Oriente reúne el valor más alto del índice, una insuficiencia de 13,5 % y una proporción de bienestar alto de 39,2 %. Urabá, con 87,2 puntos, combina una insuficiencia de 28,0 % con privaciones relevantes en actividad física, respaldo económico, vivienda y movilidad. Aburrá Centro, con 84,6 puntos, concentra la mayor insuficiencia y presenta tensiones relacionadas con entorno, acceso a especialistas, desplazamientos y seguridad. Suroeste, con 90,5, se ubica por encima del promedio general, aunque registra desafíos asociados a disfrute y condiciones económicas.</P>
        <P>En esta comparación, las diferencias dejan de ser abstractas y adquieren contenido territorial. Oriente combina un IBiM de 93,9 con menor incidencia en varios indicadores seleccionados; Urabá, con 87,2, concentra privaciones en actividad física, respaldo económico, ingreso, vivienda y movilidad; Aburrá Centro, con 84,6, presenta tensiones en acceso a especialistas, entorno, desplazamiento y vínculos; Suroeste, con 90,5, exhibe retos específicos en recreación, cultura, capacitación y respaldo económico. La <strong>Figura 9</strong> permite leer estas configuraciones como perfiles distintos y no como una simple escala de mejor a peor.</P>
        <Figura
          numero={9}
          titulo="Perfil comparativo de territorios con configuraciones contrastantes"
          imagen={figura09}
          alt="Infografía con cuatro fichas territoriales: Oriente (IBiM 93,9, insuficiencia 13,5 %), Urabá (87,2, 28,0 %), Aburrá Centro (84,6, 31,9 %) y Suroeste (90,5, 21,0 %), cada una con sus indicadores seleccionados de privación"
          nota="La figura sintetiza indicadores seleccionados para mostrar que valores distintos del IBiM pueden responder a estructuras de privación también distintas."
        />
        <P>A su vez, la matriz territorio–dimensión amplía esta lectura al mostrar que las privaciones no se reparten de manera idéntica. Disfrute e ingresos aparecen como dimensiones recurrentes en buena parte del territorio, mientras otros componentes adquieren peso específico según la subregión. Urabá y Aburrá Centro muestran una mayor presión relativa en integridad física; Oriente y Nordeste–Magdalena Medio resaltan por vínculos sociales; y Suroeste y Aburrá Norte presentan señales más fuertes en empleo. De este modo, la lectura reconoce que el mismo valor agregado puede surgir de combinaciones diferentes de carencias y fortalezas.</P>
        <P>En efecto, la matriz permite reconocer que algunas dimensiones atraviesan varias subregiones, mientras otras adquieren mayor peso en territorios específicos. Disfrute e ingresos aparecen de manera recurrente, pero salud mental, integridad física, vivienda, vínculos sociales, empleo y educación cambian de intensidad según la subregión. Como sintetiza la <strong>Figura 10</strong>, el carácter multidimensional del índice se expresa precisamente en esa diversidad de combinaciones.</P>
        <Figura
          numero={10}
          titulo="Matriz territorio-dimensión del bienestar multidimensional"
          imagen={figura10}
          alt="Matriz de puntos que cruza las nueve subregiones con las dimensiones disfrute, ingresos, salud mental, integridad física, vivienda, vínculos sociales, empleo y educación, con cuatro niveles de contribución relativa al bienestar (baja, media, alta y muy alta)"
          nota="La matriz resume la intensidad relativa de las dimensiones del bienestar entre subregiones. La lectura es comparativa y permite identificar perfiles territoriales diferenciados."
        />
        <H2>Las redes sociales también hacen territorio</H2>
        <P>Los vínculos sociales introducen una dimensión menos visible del bienestar, pero no menos territorial. La no participación en grupos sociales alcanza 86,1 % como privación general, lo que la convierte en uno de los indicadores sociales más extendidos. En los demás componentes de esta dimensión, Aburrá Centro presenta las mayores incidencias específicas: 28,9 % en apoyo económico, 17,7 % en relaciones personales, 14,4 % en discriminación y 12,8 % en vida familiar, todos por encima de los valores generales de referencia de 23,8 %, 13,9 %, 10,1 % y 9,2 %, respectivamente.</P>
        <P>En este marco, el dato de participación social funciona como una señal transversal: 86,1 % no participa en grupos sociales. Sin embargo, las diferencias territoriales se hacen más visibles cuando se observan otros indicadores. Aburrá Centro registra 28,9 % en apoyo económico, 17,7 % en relaciones personales, 14,4 % en discriminación y 12,8 % en vida familiar, todos por encima de los valores generales utilizados como referencia en la <strong>Figura 11</strong>.</P>
        <P>En particular, las diferencias de Aburrá Centro frente a los valores generales oscilan entre 3,6 y 5,1 puntos porcentuales: 5,1 puntos en apoyo económico, 3,8 en relaciones personales, 4,3 en discriminación y 3,6 en vida familiar. Esta concentración simultánea permite reconocer una expresión territorial del bienestar relacional que complementa las dimensiones materiales y económicas.</P>
        <P>De esta manera, los vínculos sociales muestran que el bienestar también depende de redes de apoyo, confianza y calidad de las relaciones. La distancia no se expresa únicamente en recursos monetarios: también aparece en la posibilidad de contar con apoyo ante una emergencia, mantener relaciones satisfactorias y transitar por espacios libres de discriminación.</P>
        <Figura
          numero={11}
          titulo="Redes y vínculos sociales por subregión"
          imagen={figura11}
          alt="Infografía de redes y vínculos sociales: 86,1 % de los hogares no participa en grupos sociales; comparación de Aburrá Centro frente al promedio general en apoyo económico (28,9 frente a 23,8), relaciones personales (17,7 frente a 13,9), discriminación (14,4 frente a 10,1) y vida familiar (12,8 frente a 9,2)"
          nota="La figura sintetiza indicadores de participación social, apoyo económico, relaciones personales, discriminación y vida familiar, con énfasis en las diferencias territoriales observadas."
        />
        <H2>El trabajo: entre remuneración, reconocimiento y flexibilidad</H2>
        <P>La dimensión laboral muestra otra cartografía de tensiones. La inconformidad con la remuneración supera 40 % en varias subregiones y alcanza 49,4 % en Aburrá Norte, 43,5 % en Aburrá Centro, 42,3 % en Aburrá Sur y 40,8 % en Norte–Bajo Cauca. La ausencia o no asistencia a capacitaciones en seguridad y salud en el trabajo tiene mayor incidencia en Suroeste (35,9 %), Norte–Bajo Cauca (33,7 %) y Urabá (30,7 %). En reconocimiento laboral, Aburrá Centro y Aburrá Norte concentran los valores más altos entre los territorios destacados, con 31,2 % y 30,4 %.</P>
        <P>En este escenario, la remuneración constituye la privación laboral más extendida entre los indicadores seleccionados. Aburrá Norte alcanza 49,4 %, seguida por Aburrá Centro con 43,5 %, Aburrá Sur con 42,3 % y Norte–Bajo Cauca con 40,8 %. Al mismo tiempo, la falta de capacitación en seguridad y salud en el trabajo se concentra con mayor fuerza en Suroeste, Norte–Bajo Cauca y Urabá.</P>
        <P>En conjunto, la lectura de los indicadores muestra que las tensiones laborales no se concentran en una sola zona. Cambian de forma entre subregiones: en unas domina la remuneración, en otras la capacitación, el reconocimiento o la flexibilidad. Por tanto, el trabajo aparece como una dimensión que cruza el territorio de manera desigual y ayuda a explicar por qué el bienestar agregado puede moverse en direcciones diferentes aun cuando los territorios compartan un mismo marco económico departamental. La comparación territorial de estas condiciones se resume en <strong>Figura 12.</strong></P>
        <P>Por otra parte, el reconocimiento en el trabajo alcanza 31,2 % en Aburrá Centro y 30,4 % en Aburrá Norte, mientras la carencia de flexibilidad laboral se reporta con mayor frecuencia en Aburrá Centro, Norte–Bajo Cauca, Urabá y Occidente. Estos contrastes permiten interpretar la dimensión laboral como una combinación de remuneración, reconocimiento, apoyo entre colegas, capacitación y capacidad de conciliar tiempos.</P>
        <Figura
          numero={12}
          titulo="Condiciones laborales por territorio"
          imagen={figura12}
          alt="Infografía de condiciones laborales por territorio: inconformidad con la remuneración (Aburrá Norte 49,4 %, Aburrá Centro 43,5 %, Aburrá Sur 42,3 % y Norte–Bajo Cauca 40,8 %), capacitaciones en seguridad y salud en el trabajo (Suroeste 35,9 %, Norte–Bajo Cauca 33,7 % y Urabá 30,7 %), reconocimiento (Aburrá Centro 31,2 % y Aburrá Norte 30,4 %) y síntesis cualitativa sobre relaciones laborales y flexibilidad"
          nota="La figura presenta indicadores seleccionados de remuneración, capacitación en seguridad y salud en el trabajo, reconocimiento, relaciones laborales y flexibilidad."
        />
        <H2>Vivienda y entorno: el bienestar también se construye desde la puerta de casa</H2>
        <P>La vivienda es el punto donde muchas dimensiones del bienestar terminan encontrándose. No es únicamente un techo: es el lugar desde el cual se accede a servicios, conectividad, descanso, seguridad y oportunidades. Por eso, las diferencias territoriales en dotaciones, deterioro y entorno adquieren un peso especial. Urabá sobresale por la alta privación asociada al deterioro de la vivienda, mientras Oriente registra una incidencia considerablemente menor. En dotaciones del hogar también aparecen contrastes importantes, con Occidente y Urabá en niveles altos y Aburrá Sur en una posición más favorable.</P>
        <P>El entorno inmediato amplía esa historia. Aburrá Centro, Urabá y Aburrá Norte presentan mayores incidencias de problemas asociados al lugar donde se vive, mientras Oriente aparece con una frecuencia menor. Esta dimensión resulta especialmente relevante porque el entorno conecta la vivienda con el espacio público: ruido, contaminación, residuos, seguridad y condiciones del vecindario pueden modificar la experiencia diaria incluso cuando la vivienda, tomada de forma aislada, parece adecuada.</P>
        <P>La conectividad y los servicios básicos completan el panorama. La privación por acceso a internet supera 30 % en varias subregiones y vuelve a mostrar que la brecha territorial no se limita a condiciones físicas tradicionales. Urabá, además, presenta la mayor incidencia de déficit habitacional y de privación por agua potable entre los territorios destacados. Estos datos enlazan infraestructura, acceso a información, salud y posibilidades de participación económica y educativa. La vivienda se convierte así en una plataforma desde la cual se habilitan o se restringen otras dimensiones del bienestar. La <strong>Figura 13</strong> permite reunir esas piezas sin convertirlas en una enumeración aislada. Allí aparecen territorios donde las privaciones materiales se acumulan y otros donde varias condiciones muestran una posición relativamente más favorable. La vivienda, el entorno, los servicios y la conectividad forman una misma trama cotidiana. Cuando esa trama se debilita, sus efectos pueden extenderse hacia la salud, la educación, el empleo y la seguridad; cuando se fortalece, amplía las condiciones desde las cuales las personas pueden desarrollar otras capacidades. Esa interdependencia devuelve el análisis al sentido central del IBiM: el bienestar no depende de una sola dimensión, sino de la manera como varias condiciones se sostienen entre sí.</P>
        <Figura
          numero={13}
          titulo="Brechas territoriales en vivienda y entorno"
          imagen={figura13}
          alt="Infografía de vivienda y entorno: privación en dotaciones del hogar (Occidente 54,1 %, Urabá 49,9 %, Aburrá Sur 22,6 %), deterioro de la vivienda (Urabá 60,3 %, Nordeste–Magdalena Medio 47,2 %, Oriente 30,6 %), problemas del entorno (Aburrá Centro 46,9 %, Urabá 44,0 %, Aburrá Norte 43,8 %, Oriente 19,0 %) y otros hallazgos sobre internet, déficit habitacional y agua potable"
          nota="La figura compara privaciones seleccionadas de dotaciones del hogar, deterioro de la vivienda, entorno, conectividad y servicios básicos."
        />
        <h2 className="modulo-ibim__seccion-referencias">Referencias</h2>
        <ul className="modulo-ibim__referencias">
          <Ref>Centro de Estudios de Opinión, Universidad de Antioquia, &amp; Comfenalco Antioquia. (2023). <em>Índice de Bienestar Multidimensional de Comfenalco Antioquia 2023. Universidad de Antioquia.</em></Ref>
          <Ref>CONPES. (2012). <em>Metodologías oficiales y arreglos institucionales para la medición de la pobreza en Colombia (Documento CONPES Social 150).</em> Bogotá, Colombia: Departamento Nacional de Planeación. Retrieved from <Enlace url="https://colaboracion.dnp.gov.co/CDT/Conpes/Social/150.pdf" /></Ref>
          <Ref>DANE. (2023). <em>Encuesta Nacional de Calidad de Vida (ECV) 2022: Boletín técnico.</em> Bogotá, Colombia. Retrieved from <Enlace url="https://www.dane.gov.co/files/investigaciones/condiciones_vida/calidad_vida/2022/Boletin_Tecnico_ECV_2022.pdf" /></Ref>
          <Ref>Gobernación de Antioquia . (2023). <em>Informe de gestión 2022: Plan de Desarrollo Unidos por la Vida 2020–2023.</em> Medellín, Colombia: Gobernación de Antioquia. Retrieved from <Enlace url="https://www.antioquia.gov.co/images/PDF2/Transparencia/2023/05/informe-de-gestion-cierre-2022-corte-31-dic-1.pdf" /></Ref>
        </ul>
        </article>
      </div>
    </section>
  );
}

export default ModuloIbim;
