/**
 * ModuloIbimDescripcion — "Qué es el IBiM" (submenú de IBiM, 0.47.0).
 *
 * Artículo corto de contenido FIJO que sintetiza, con tono periodístico,
 * las páginas de presentación y metodología del "Índice de Bienestar
 * Multidimensional de Comfenalco Antioquia 2023" (Centro de Estudios de
 * Opinión, Universidad de Antioquia): qué es el índice, sus nueve
 * dimensiones y cómo se construye estadísticamente (umbrales, fórmula y
 * el cálculo del 89,3). NO transcribe el informe: lo resume. Excluye a
 * propósito la sección "Muestra" y la ficha técnica (decisión del cliente
 * 2026-09-23) y el flujograma de dimensiones de la página 7, que se
 * hará interactivo más adelante.
 *
 * Patrón visual de los artículos del portal (Benchmarking/IBiM): tabla de
 * contenido, apartados h2, cita destacada, referencias. Elementos
 * propios: rejilla de las nueve dimensiones (`__dimensiones`), tabla de
 * umbrales y ecuación en HTML/CSS (`__ecuacion`, role="img" con lectura
 * textual, patrón de Gasto social).
 */
import { useRef } from 'react';
import TablaContenido from '../../components/TablaContenido/TablaContenido.jsx';
import './modulo-ibim-descripcion.css';

const P = ({ children }) => <p className="modulo-ibim-descripcion__parrafo">{children}</p>;
const H2 = ({ children }) => <h2 className="modulo-ibim-descripcion__seccion">{children}</h2>;

/* Las nueve dimensiones del modelo de medición, en el orden del informe */
const DIMENSIONES = [
  { nombre: 'Disfrute', pista: 'Tiempo libre, recreación y ocio' },
  { nombre: 'Salud mental', pista: 'Estar libre de estrés y ansiedad' },
  { nombre: 'Salud física', pista: 'Salud y acceso a servicios médicos' },
  { nombre: 'Educación', pista: 'Logros educativos' },
  { nombre: 'Vínculos sociales', pista: 'Redes de apoyo y vida en comunidad' },
  { nombre: 'Integridad física', pista: 'Vivir sin agresiones ni intimidaciones' },
  { nombre: 'Ingresos, gastos y deudas', pista: 'Suficiencia y respaldo económico' },
  { nombre: 'Empleo', pista: 'Condiciones del trabajo' },
  { nombre: 'Vivienda, activos y servicios', pista: 'Dónde y cómo se habita' },
];

function ModuloIbimDescripcion() {
  const articuloRef = useRef(null);

  return (
    <section className="modulo-ibim-descripcion" aria-labelledby="titulo-ibim-descripcion">
      <header className="modulo-ibim-descripcion__encabezado">
        <p className="modulo-ibim-descripcion__contexto">IBiM</p>
        <h1 id="titulo-ibim-descripcion" className="modulo-ibim-descripcion__titulo">
          Un índice para mirar el bienestar entero
        </h1>
        <p className="modulo-ibim-descripcion__subtitulo">
          Qué es el Índice de Bienestar Multidimensional, qué dimensiones lo componen y cómo se
          calcula
        </p>
      </header>

      <div className="articulo-con-indice">
        <TablaContenido articuloRef={articuloRef} />
        <article ref={articuloRef} className="modulo-ibim-descripcion__panel">
          <blockquote className="modulo-ibim-descripcion__cita">
            “Lo interesante no son los números. Lo interesante es lo que cuentan sobre las vidas
            detrás de los números.” — Hans Rosling
          </blockquote>
          <P>
            ¿Cuánto bienestar tiene una persona? La pregunta parece imposible de responder con un
            número, y sin embargo eso es lo que intenta el Índice de Bienestar Multidimensional,
            IBiM: una cifra entre 0 y 100 que condensa cómo les va a los afiliados de Comfenalco
            Antioquia en los distintos frentes de su vida. El 0 sería la privación completa; el
            100, el bienestar pleno. En su primera medición, los afiliados obtuvieron 89,3.
          </P>
          <P>
            El índice nació de un convenio entre Comfenalco Antioquia y el Centro de Estudios de
            Opinión de la Universidad de Antioquia, con una idea de fondo tomada del economista
            Amartya Sen: el bienestar no es solo tener cosas, sino poder ser y hacer lo que cada
            persona valora, con libertad para elegirlo. Medirlo, entonces, es mirar los logros y las
            privaciones que las personas enfrentan en su vida cotidiana, y compararlos.
          </P>

          <H2>Una cifra con muchas caras</H2>
          <P>
            El equipo investigador lo advierte desde la primera página: el IBiM es una
            simplificación. El bienestar es un concepto escurridizo y ningún número lo agota. Lo
            que hace el índice es volverlo manejable: reúne las respuestas de la Encuesta de
            Bienestar aplicada a los afiliados y las traduce en una medida que puede seguirse en el
            tiempo y compararse entre grupos, ya sea por subregión, por tipo de empresa, por edad o
            por cualquier otra característica.
          </P>
          <P>
            Por eso el informe lo describe como una puerta de entrada. La cifra global da una
            primera impresión; la conversación interesante empieza cuando se abre el índice y se
            pregunta qué hay detrás: en qué dimensiones se concentran las carencias, qué indicadores
            las explican y a qué grupos afectan más. Esa capacidad de desagregarse es lo que lo
            convierte en una herramienta para decidir, no solo para describir.
          </P>

          <H2>Las nueve dimensiones</H2>
          <P>
            La palabra clave es multidimensional. El bienestar no cabe en una sola faceta, ni en un
            estado de ánimo ni en un nivel de ingreso, y sus partes no se pueden intercambiar: más
            salario no compensa una enfermedad, ni un buen empleo reemplaza los vínculos con los
            demás. Tras revisar la literatura internacional, las mediciones nacionales y los propios
            estudios de la Caja, el equipo definió nueve dominios de la vida que el índice observa
            a la vez.
          </P>
          <ul className="modulo-ibim-descripcion__dimensiones" aria-label="Las nueve dimensiones del IBiM">
            {DIMENSIONES.map((dimension, indice) => (
              <li key={dimension.nombre} className="modulo-ibim-descripcion__dimension">
                <span className="modulo-ibim-descripcion__dimension-numero" aria-hidden="true">
                  {indice + 1}
                </span>
                <span className="modulo-ibim-descripcion__dimension-nombre">{dimension.nombre}</span>
                <span className="modulo-ibim-descripcion__dimension-pista">{dimension.pista}</span>
              </li>
            ))}
          </ul>
          <P>
            Cada dimensión se observa a través de indicadores concretos del cuestionario, con un
            peso asignado a cada uno. Para cada persona, cada indicador termina en un veredicto
            simple: suficiencia o privación. Sumando los pesos de los indicadores en los que la
            persona alcanza suficiencia se obtiene su porcentaje de bienestar, y con él su nivel.
          </P>

          <H2>Cómo se construye el índice</H2>
          <P>
            El primer paso es clasificar a cada afiliado según la proporción de indicadores
            ponderados en los que tiene suficiencia. El informe distingue tres niveles:
          </P>
          <table className="modulo-ibim-descripcion__tabla">
            <caption className="modulo-ibim-descripcion__tabla-rotulo">
              Niveles de bienestar multidimensional
            </caption>
            <thead>
              <tr>
                <th scope="col">Nivel</th>
                <th scope="col">Suficiencia en los indicadores ponderados</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Bienestar alto</th>
                <td>Más del 76 %</td>
              </tr>
              <tr>
                <th scope="row">Bienestar moderado</th>
                <td>Entre el 62 % y el 75,9 %</td>
              </tr>
              <tr>
                <th scope="row">Bienestar bajo o insuficiencia</th>
                <td>Menos del 62 % (es decir, privación en más del 38 % de los indicadores)</td>
              </tr>
            </tbody>
          </table>
          <P>
            Con esa clasificación, el índice se calcula con una fórmula tan breve como elocuente.
            Toma a quienes tienen bienestar suficiente (moderado o alto) y les suma, a quienes están
            en insuficiencia, la parte del bienestar que sí alcanzan:
          </P>
          <div
            className="modulo-ibim-descripcion__ecuacion"
            role="img"
            aria-label="IBiM es igual a H sub suf más H sub priv por A sub suf"
          >
            <span className="modulo-ibim-descripcion__ecuacion-texto">
              IBiM = H<sub>suf</sub> + H<sub>priv</sub> × A<sub>suf</sub>
            </span>
          </div>
          <ul className="modulo-ibim-descripcion__leyenda">
            <li>
              <strong>H<sub>suf</sub></strong>: proporción de personas con bienestar moderado o
              alto.
            </li>
            <li>
              <strong>H<sub>priv</sub></strong>: proporción de personas con bienestar bajo.
            </li>
            <li>
              <strong>A<sub>suf</sub></strong>: suficiencia media de esas personas con bienestar
              bajo.
            </li>
          </ul>
          <P>
            La lógica es generosa y exigente a la vez. Nadie queda fuera del índice: quien está en
            insuficiencia no cuenta como cero, sino con lo que realmente logra. Pero la cifra
            global sube solo si más personas cruzan el umbral de suficiencia o si quienes no lo
            cruzan mejoran. En la medición de 2022, el 77,1 % de los afiliados tenía bienestar
            suficiente, el 22,9 % estaba en insuficiencia y estos últimos alcanzaban, en promedio,
            una suficiencia del 53,5 %. Al llevar esos datos a la fórmula:
          </P>
          <div
            className="modulo-ibim-descripcion__ecuacion"
            role="img"
            aria-label="89,3 es igual a 77,1 por ciento más 22,9 por ciento por 53,5 por ciento"
          >
            <span className="modulo-ibim-descripcion__ecuacion-texto">
              89,3 = 77,1 % + (22,9 % × 53,5 %)
            </span>
          </div>
          <P>
            Ese 89,3 es el punto de partida de todo lo demás. Leído por subregión, por segmento
            empresarial o por dimensión, el índice deja de ser un promedio y se convierte en un
            mapa de dónde el bienestar llega y dónde todavía falta, la historia que cuenta el
            artículo <em>El bienestar también tiene geografía</em>.
          </P>

          <h2 className="modulo-ibim-descripcion__seccion">Fuente</h2>
          <ul className="modulo-ibim-descripcion__referencias">
            <li className="modulo-ibim-descripcion__referencia">
              Centro de Estudios de Opinión, Facultad de Ciencias Sociales y Humanas, Universidad
              de Antioquia (2023). <em>Índice de Bienestar Multidimensional de Comfenalco Antioquia
              2023</em>. Informe de la primera medición del bienestar de los trabajadores afiliados
              a la Caja de Compensación Familiar Comfenalco Antioquia (contrato n.° 20220146).
              Medellín. Derechos de autor: Universidad de Antioquia y Comfenalco Antioquia.
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default ModuloIbimDescripcion;
