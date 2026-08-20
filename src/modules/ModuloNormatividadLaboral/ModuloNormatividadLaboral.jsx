/**
 * ModuloNormatividadLaboral — Tendencia "Normatividad laboral".
 *
 * Artículo "Prospectivas de cambios en normas laborales en Colombia,
 * 2026-2050" con el contenido FIJO en el código, igual que Gasto social
 * y Estructura familiar (decisión del cliente): sin lecturas de
 * .docx/.json en runtime. El texto es transcripción literal del Word del
 * cliente (incluidas sus dos citas destacadas centradas); las 13 figuras
 * van como WebP optimizados (~91 % más livianos que los PNG del
 * documento, nitidez verificada) con carga perezosa y caché inmutable.
 *
 * OJO fidelidad: en el Word la Figura 6 incrusta LA MISMA imagen de la
 * Figura 1 (probable error del documento, avisado al cliente); se porta
 * tal cual. Las figuras 1 y 11 comparten además título parecido
 * ("Frentes normativos prioritarios") con imágenes distintas.
 *
 * Cambios del artículo = editar este código y recompilar (no aplica el
 * contrato de reemplazo de archivos de las tendencias con datos vivos).
 */
import { useRef } from 'react';
import TablaContenido from '../../components/TablaContenido/TablaContenido.jsx';
import './modulo-normatividad-laboral.css';

import figura01 from '../../assets/normatividad-laboral/figura-01.webp';
import figura02 from '../../assets/normatividad-laboral/figura-02.webp';
import figura03 from '../../assets/normatividad-laboral/figura-03.webp';
import figura04 from '../../assets/normatividad-laboral/figura-04.webp';
import figura05 from '../../assets/normatividad-laboral/figura-05.webp';
import figura06 from '../../assets/normatividad-laboral/figura-06.webp';
import figura07 from '../../assets/normatividad-laboral/figura-07.webp';
import figura08 from '../../assets/normatividad-laboral/figura-08.webp';
import figura09 from '../../assets/normatividad-laboral/figura-09.webp';
import figura10 from '../../assets/normatividad-laboral/figura-10.webp';
import figura11 from '../../assets/normatividad-laboral/figura-11.webp';
import figura12 from '../../assets/normatividad-laboral/figura-12.webp';
import figura13 from '../../assets/normatividad-laboral/figura-13.webp';

/* Rótulo al estilo del documento: "Figura N." en negrita, título plano. */
function Figura({ numero, titulo, imagen, alt, nota }) {
  return (
    <figure className="modulo-normatividad-laboral__figura">
      <figcaption className="modulo-normatividad-laboral__figura-rotulo">
        <strong>Figura {numero}.</strong> {titulo}
      </figcaption>
      <img
        className="modulo-normatividad-laboral__figura-imagen"
        src={imagen}
        alt={alt}
        loading="lazy"
      />
      <p className="modulo-normatividad-laboral__figura-nota">
        <strong>Nota.</strong> {nota}
      </p>
    </figure>
  );
}

const P = ({ children }) => <p className="modulo-normatividad-laboral__parrafo">{children}</p>;
const H3 = ({ children }) => <h3 className="modulo-normatividad-laboral__apartado">{children}</h3>;
const Cita = ({ children }) => (
  <blockquote className="modulo-normatividad-laboral__cita-destacada">{children}</blockquote>
);

function ModuloNormatividadLaboral({ tendencia }) {
  /* El índice lee los apartados del artículo renderizado por esta ref. */
  const articuloRef = useRef(null);

  return (
    <section
      className="modulo-normatividad-laboral"
      aria-labelledby="titulo-normatividad-laboral"
    >
      <header className="modulo-normatividad-laboral__encabezado">
        <p className="modulo-normatividad-laboral__contexto">Tendencias</p>
        <h1 id="titulo-normatividad-laboral" className="modulo-normatividad-laboral__titulo">
          {tendencia.etiqueta}
        </h1>
        <p className="modulo-normatividad-laboral__titulo-articulo">
          Prospectivas de cambios en normas laborales en Colombia, 2026-2050
        </p>
        <p className="modulo-normatividad-laboral__subtitulo-articulo">
          Una interpretación cualitativa sobre las leyes que podrían adaptarse en un país que
          converge con estándares OCDE
        </p>
        <p className="modulo-normatividad-laboral__fecha-articulo">3-julio-2026</p>
      </header>

      {/* Rejilla índice + artículo (tabla de contenido del cliente) */}
      <div className="articulo-con-indice">
        <TablaContenido articuloRef={articuloRef} />
        <article ref={articuloRef} className="modulo-normatividad-laboral__panel">
        <Cita>
          “El futuro del trabajo no se regula mirando solo el empleo que existe, sino el empleo que
          está naciendo.”
        </Cita>

        <H3>El trabajo cambió antes que muchas de sus reglas</H3>
        <P>
          En Colombia, la discusión sobre normas laborales suele aparecer cuando una reforma entra
          al Congreso, cuando cambia una jornada, cuando aumenta un recargo o cuando una sentencia
          mueve la frontera entre lo permitido y lo pendiente. Sin embargo, el cambio más profundo
          no ocurre únicamente en los textos legales. Ocurre en la vida cotidiana de quienes
          trabajan desde una sala, reparten por aplicación, alternan un contrato con un
          emprendimiento, prestan servicios por temporadas, cuidan a otros sin remuneración visible
          o envejecen sin una trayectoria laboral completa. Allí empieza la pregunta que orienta
          este artículo: qué normas laborales tendrá que adaptar Colombia entre 2026 y 2050 para
          que el derecho no llegue tarde al país que ya se está formando.
        </P>
        <P>
          Por esa razón, la variable Prospectivas de cambios en Normas Laborales no se entiende
          como una lista de proyectos de ley ni como un calendario legislativo. Se entiende como
          una lectura cualitativa de futuro. La proyección no busca anticipar cifras, porcentajes o
          fechas exactas de aprobación normativa; busca identificar qué campos legales tienen mayor
          probabilidad de ajuste si Colombia continúa acercándose a las prácticas regulatorias de
          países de la OCDE, especialmente en protección del empleo, trabajo digital, seguridad
          social, formalización, jornada, cuidado, inspección y gobernanza laboral.
        </P>
        <P>
          Desde esa perspectiva, el normograma histórico 1946-2026 permite ver que la legislación
          laboral colombiana ha avanzado por capas. Primero se organizó la seguridad social; luego
          se consolidaron el subsidio familiar, los aportes parafiscales y las cajas como parte del
          sistema de bienestar laboral; más tarde aparecieron las normas de protección al cesante,
          riesgos laborales, teletrabajo, desconexión, jornada y reforma laboral. El horizonte
          2026-2050 no parte, entonces, de una página en blanco. Parte de una arquitectura
          normativa ya existente que deberá moverse para responder a trabajos más fragmentados,
          hogares más diversos y vínculos laborales menos lineales.
        </P>
        <Figura
          numero="1"
          titulo="Prospectivas de cambios en normas laborales en Colombia, 2026-2050"
          imagen={figura01}
          alt="Panorama general de la variable: proyección cualitativa de adaptación normativa laboral en Colombia 2026-2050 con referente OCDE"
          nota="La figura presenta la lectura general de la variable analizada: una proyección cualitativa de adaptación normativa con referente OCDE. No corresponde a una predicción numérica, sino a una mirada de futuro sobre los campos legales que podrían adquirir mayor presión de ajuste."
        />

        <H3>La OCDE como brújula, no como copia automática</H3>
        <P>
          Ahora bien, la pertenencia de Colombia a la OCDE no significa que el país importará
          mecánicamente las leyes de otros miembros. La convergencia normativa opera de manera más
          lenta y menos visible: primero aparece como comparación, luego como presión técnica,
          después como recomendación de política pública y, finalmente, como adaptación local. Así
          ocurrió con varias discusiones laborales recientes y podría ocurrir con mayor intensidad
          en los próximos años, sobre todo en temas donde el mercado ya cambió, pero la regulación
          todavía conserva categorías del siglo anterior.
        </P>
        <P>
          En efecto, la OCDE mide la protección del empleo a través de indicadores que observan
          reglas de despido, contratos regulares, contratación temporal y despidos colectivos. Esa
          medición no determina por sí sola el contenido de una reforma colombiana, pero sí instala
          una pregunta recurrente: cómo equilibrar flexibilidad productiva con protección efectiva
          para los trabajadores. En una economía con informalidad persistente, trabajo
          independiente creciente y nuevas modalidades digitales, la respuesta difícilmente vendrá
          de una sola ley; probablemente surgirá de ajustes acumulados al Código Sustantivo del
          Trabajo, la Ley 100 de 1993, la Ley 21 de 1982, la Ley 789 de 2002, la Ley 1636 de 2013,
          el Decreto 1072 de 2015, la Ley 2101 de 2021, la Ley 2191 de 2022 y la Ley 2466 de 2025.
        </P>
        <P>
          Además, los referentes internacionales más avanzados ya están moviendo el debate hacia
          asuntos que Colombia apenas empieza a ordenar: plataformas digitales, gestión
          algorítmica, presunción de laboralidad, portabilidad de derechos, transparencia en la
          asignación de tareas, protección del tiempo de descanso y cobertura social para quienes
          no encajan en el empleo asalariado tradicional. La Directiva (UE) 2024/2831 sobre trabajo
          en plataformas es un ejemplo de esa nueva agenda: no solo discute si existe o no contrato
          laboral, sino quién controla los datos, cómo se toman decisiones automatizadas y qué
          explicación recibe una persona cuando un algoritmo afecta su trabajo.
        </P>
        <Figura
          numero="2"
          titulo="Ruta metodológica del pronóstico normativo 2026-2050"
          imagen={figura02}
          alt="Diagrama de la ruta metodológica: del normograma histórico y los referentes internacionales a las convergencias regulatorias y las adaptaciones normativas por horizonte temporal"
          nota="La figura resume la forma en que se organiza el pronóstico: parte del normograma histórico, incorpora referentes internacionales, identifica convergencias regulatorias y ordena las posibles adaptaciones normativas por horizonte temporal."
        />
        <P>
          Por tanto, la estrategia prospectiva se basa en un razonamiento simple, pero exigente: si
          Colombia quiere sostener su convergencia con estándares OCDE, tendrá que adaptar su
          normatividad laboral allí donde la brecha entre la ley escrita y el trabajo real sea más
          amplia. Esa brecha no se ubica únicamente en la contratación formal. También aparece en
          la protección social, en el trabajo remoto, en la economía de plataformas, en el cuidado,
          en la formación para el trabajo, en la inspección laboral y en la capacidad del Estado
          para leer datos laborales sin convertir la vigilancia en una carga burocrática más.
        </P>
        <Figura
          numero="3"
          titulo="Secuencia cualitativa de construcción del pronóstico"
          imagen={figura03}
          alt="Secuencia de pasos cualitativos con que se construye el pronóstico normativo, desde la evidencia jurídica y comparada hasta los cambios plausibles 2026-2050"
          nota="La figura complementa la ruta metodológica y muestra que el ejercicio no proyecta cifras. Su función es ordenar, desde la evidencia jurídica y comparada, los cambios normativos plausibles para Colombia entre 2026 y 2050."
        />

        <H3>2026-2030: ordenar la reforma laboral y cerrar vacíos inmediatos</H3>
        <P>
          En el primer tramo del horizonte, la adaptación normativa más probable no sería una
          revolución legal, sino una etapa de ordenamiento. La Ley 2466 de 2025 modificó
          parcialmente normas laborales y adoptó una reforma laboral para el trabajo decente y
          digno; por ello, el periodo 2026-2030 podría estar marcado por reglamentaciones, ajustes
          administrativos, interpretaciones sectoriales y correcciones necesarias para que la
          reforma opere en la práctica. La pregunta inicial no será si Colombia cambia su
          legislación laboral, porque ya empezó a hacerlo, sino cómo implementa esos cambios sin
          dejar nuevas zonas grises.
        </P>
        <P>
          En este punto, el Código Sustantivo del Trabajo, el Decreto 1072 de 2015 y la propia Ley
          2466 de 2025 se convierten en el primer frente de adaptación. Allí se ubican temas como
          jornada, recargos, estabilidad, tercerización, formalización, inspección y condiciones
          mínimas de trabajo. La prospectiva normativa sugiere que estos asuntos no quedarán
          cerrados con una sola reforma, pues cada cambio legal tiende a revelar nuevas preguntas:
          cómo se controla su cumplimiento, qué ocurre con los sectores de baja productividad, qué
          pasa con los independientes económicamente dependientes y cómo se evita que la formalidad
          se vuelva tan costosa que termine empujando más ocupación hacia la informalidad.
        </P>
        <P>
          Asimismo, el periodo 2026-2030 podría acelerar la adaptación de la Ley 100 de 1993 y del
          sistema de riesgos laborales para reconocer trayectorias laborales discontinuas. El
          problema ya no consiste solamente en proteger al trabajador asalariado de tiempo
          completo. La presión se desplaza hacia personas con ingresos variables, contratos breves,
          pluriactividad, prestación de servicios, trabajo por cuenta propia y ocupaciones
          digitales. La norma laboral del futuro cercano tendrá que preguntarse menos por la forma
          ideal del contrato y más por la continuidad real de la protección.
        </P>
        <Cita>
          “Una ley laboral envejece cuando deja de reconocer la forma concreta en que los hogares
          producen ingresos, cuidan y sobreviven.”
        </Cita>
        <P>
          De manera paralela, las normas sobre trabajo en casa, teletrabajo, trabajo remoto y
          desconexión laboral podrían entrar en una segunda etapa. La Ley 2088 de 2021 reguló el
          trabajo en casa; la Ley 2191 de 2022 creó y promovió la desconexión laboral; y la
          reforma laboral de 2025 abre nuevas preguntas sobre tiempo de trabajo, disponibilidad y
          equilibrio entre vida laboral y personal. Hacia 2030, el foco no estará únicamente en
          permitir trabajar fuera de la oficina, sino en definir límites más claros frente a la
          hiperconexión, la vigilancia digital, las jornadas extendidas y la salud mental asociada
          al trabajo.
        </P>
        <Figura
          numero="4"
          titulo="Prioridades del pronóstico normativo"
          imagen={figura04}
          alt="Distribución temporal de los 40 hitos analizados: ajustes de alta prioridad en el corto plazo, agenda sectorial en el mediano y transformaciones estructurales después"
          nota="La figura muestra la concentración temporal de los 40 hitos analizados. En el corto plazo predominan los ajustes de alta prioridad; en el mediano plazo se amplía la agenda sectorial; y posteriormente se abren transformaciones estructurales."
        />

        <H3>2031-2035: la formalización dejará de ser un trámite y pasará a ser una estrategia social</H3>
        <P>
          En un segundo momento, la agenda normativa podría desplazarse hacia la formalización
          laboral y la protección de hogares diversos. La Ley 789 de 2002, la Ley 1636 de 2013 y
          las normas asociadas al Mecanismo de Protección al Cesante probablemente requerirán
          ajustes para responder a un mercado donde perder el empleo ya no siempre significa salir
          de una empresa, sino transitar entre contratos, plataformas, servicios, emprendimientos y
          periodos de inactividad. La protección al cesante tendría que volverse más compatible con
          la reconversión laboral, la formación corta, la movilidad sectorial y la intermediación
          basada en datos.
        </P>
        <P>
          A su vez, el sistema de subsidio familiar, organizado principalmente alrededor de la Ley
          21 de 1982 y normas posteriores, podría enfrentar una presión de modernización. El cambio
          no debería entenderse como una discusión cerrada sobre instituciones, sino como una
          pregunta social más amplia: cómo se protege a hogares que ya no responden a un único
          modelo de familia, a una sola fuente de ingreso ni a una trayectoria laboral estable. En
          ese escenario, la adaptación normativa podría moverse hacia servicios más flexibles,
          cobertura para hogares con ingresos discontinuos, cuidado infantil, bienestar preventivo
          y apoyo a transiciones laborales.
        </P>
        <P>
          En consecuencia, la formalización no podría reducirse a registrar empresas o exigir
          aportes. Tendría que convertirse en una ruta gradual para que micronegocios, trabajadores
          domésticos, independientes, cuidadores remunerados, pequeños comercios y oficios de baja
          escala puedan entrar a la protección sin quedar asfixiados por reglas diseñadas para
          empresas más grandes. Allí cobrarían relevancia normas como el Decreto 721 de 2013 sobre
          afiliación de trabajadores del servicio doméstico, el Decreto 1563 de 2016 sobre riesgos
          laborales para independientes y las regulaciones que permitan combinar aportes,
          protección y flexibilidad sin normalizar precariedad.
        </P>
        <Figura
          numero="5"
          titulo="Ejes de adaptación normativa esperados, 2026-2050"
          imagen={figura05}
          alt="Síntesis de los ejes con mayor posibilidad de ajuste normativo: protección social, trabajo digital, jornada, subsidio familiar, supervisión, datos, formación, empleabilidad y formalización"
          nota="La figura sintetiza los ejes que concentran mayor posibilidad de ajuste normativo: protección social, trabajo digital, jornada, subsidio familiar, supervisión, datos, formación, empleabilidad y formalización."
        />
        <P>
          En este horizonte, la pregunta central no será cuántas normas existen, sino si esas
          normas logran acompañar trayectorias reales. Un trabajador que hoy alterna domicilios por
          aplicación, ventas digitales, servicios ocasionales y cuidado familiar no puede ser leído
          únicamente con categorías pensadas para una fábrica, una oficina fija o una nómina
          mensual. Por ello, la legislación laboral colombiana podría avanzar hacia figuras de
          protección más portables: derechos que sigan a la persona, aunque cambie de ocupación,
          empleador, plataforma o modalidad contractual.
        </P>
        <Figura
          numero="6"
          titulo="Frentes normativos prioritarios, 2026-2050"
          imagen={figura01}
          alt="Frentes con mayor probabilidad de adaptación normativa: seguridad social, subsidio familiar, protección al cesante, régimen laboral, trabajo remoto y reforma laboral"
          nota="La figura identifica las leyes y ámbitos con mayor probabilidad de adaptación: seguridad social, subsidio familiar, protección al cesante, régimen laboral, trabajo remoto y reforma laboral."
        />

        <H3>2036-2040: plataformas, algoritmos y el nuevo rostro de la subordinación</H3>
        <P>
          Más adelante, entre 2036 y 2040, el debate normativo podría concentrarse en la frontera
          más incómoda del trabajo contemporáneo: la relación entre autonomía, dependencia
          económica y control digital. Las plataformas ya no son solo intermediarias tecnológicas;
          en muchos casos organizan horarios, asignan tareas, califican desempeño, bloquean cuentas
          y modifican ingresos mediante sistemas automatizados. Esa realidad obligará a Colombia a
          decidir si su legislación laboral seguirá preguntando únicamente quién firma el contrato
          o si también observará quién controla, mide y condiciona el trabajo.
        </P>
        <P>
          En ese sentido, los referentes europeos y las discusiones de la OCDE anticipan una agenda
          que podría llegar con fuerza al país: presunción de laboralidad en ciertos casos,
          transparencia algorítmica, derecho a explicación frente a decisiones automatizadas,
          límites a la desconexión unilateral de trabajadores de plataformas, protección de datos
          laborales y obligaciones de seguridad social para modelos de intermediación digital. La
          adaptación colombiana no tendría que copiar literalmente esos instrumentos, pero sí
          podría tomar de ellos una idea decisiva: la subordinación del siglo XXI no siempre se
          parece a una orden escrita; a veces aparece como una calificación, una ruta asignada, una
          tarifa variable o una cuenta suspendida.
        </P>
        <P>
          Por otra parte, la jornada laboral también entraría en una fase más compleja. La Ley 2101
          de 2021 abrió la reducción progresiva de la jornada ordinaria, mientras la Ley 2466 de
          2025 reubicó varias discusiones sobre trabajo decente. Hacia 2040, la pregunta podría
          dejar de girar únicamente alrededor del número de horas y desplazarse hacia la calidad
          del tiempo: disponibilidad permanente, derecho al descanso, productividad, salud mental,
          desconexión, automatización, conciliación y reparto del cuidado. Una legislación laboral
          moderna no solo mide cuánto se trabaja; también mira bajo qué intensidad, con qué control
          y con qué posibilidad real de recuperar tiempo para la vida.
        </P>
        <Figura
          numero="7"
          titulo="Cómo se construye el pronóstico 2026-2050"
          imagen={figura06}
          alt="Esquema del paso de los hitos históricos a los cambios esperados, con la función de los referentes OCDE y las áreas de convergencia normativa"
          nota="La figura explica el paso de los hitos históricos a los cambios esperados, destacando la función de los referentes OCDE y de las áreas de convergencia normativa."
        />

        <H3>2041-2050: menos normas aisladas y más arquitectura de protección</H3>
        <P>
          Hacia el tramo final del horizonte, la prospectiva sugiere que Colombia podría necesitar
          algo más que reformas parciales. El país podría avanzar hacia una arquitectura laboral
          más integrada, capaz de conectar seguridad social, empleo, formación, cuidado, subsidio
          familiar, protección al cesante, riesgos laborales y gobernanza digital. Esta
          transformación no significa eliminar las leyes existentes, sino actualizarlas para que
          funcionen juntas. La Ley 100 de 1993, la Ley 21 de 1982, la Ley 789 de 2002, la Ley 1636
          de 2013, el Decreto 1072 de 2015, la Ley 2088 de 2021, la Ley 2191 de 2022, la Ley 2101
          de 2021 y la Ley 2466 de 2025 podrían leerse como piezas de un mismo sistema de
          protección, no como compartimentos separados.
        </P>
        <P>
          En ese contexto, el concepto de protección social portable podría ganar centralidad. La
          idea resulta relevante porque el trabajador de 2050 probablemente no tendrá una única
          forma de vinculación durante toda su vida. Podría asalariarse durante unos años,
          independiente en otros, cuidador en un tramo, trabajador remoto, contratista,
          emprendedor, empleado de plataforma o participante de economías comunitarias y digitales.
          Si la normatividad laboral continúa atando la protección a una sola forma de empleo,
          muchos ciudadanos quedarán dentro del trabajo, pero fuera de la seguridad.
        </P>
        <P>
          Asimismo, la inspección laboral y la supervisión institucional podrían evolucionar hacia
          modelos basados en datos, interoperabilidad y prevención. Las resoluciones y circulares
          de supervisión, junto con la regulación administrativa del sistema laboral y del subsidio
          familiar, podrían adquirir mayor peso. No se trataría solo de sancionar incumplimientos,
          sino de anticipar riesgos: sectores con alta rotación, empresas con evasión recurrente,
          plataformas con decisiones automatizadas opacas, micronegocios en tránsito hacia la
          formalidad y hogares con trayectorias laborales vulnerables. La norma laboral del futuro
          tendrá que aprender a mirar patrones, no solamente expedientes.
        </P>
        <Figura
          numero="8"
          titulo="Hoja de ruta normativa laboral en Colombia, 2026-2050"
          imagen={figura07}
          alt="Hoja de ruta que organiza los posibles cambios por horizontes cualitativos: ajustes inmediatos de la reforma laboral, convergencia regulatoria de mediano plazo e integración avanzada hacia 2050"
          nota="La figura organiza los posibles cambios por horizontes cualitativos. Permite diferenciar los ajustes inmediatos de la reforma laboral, la convergencia regulatoria de mediano plazo y la integración avanzada esperada hacia 2050."
        />
        <P>
          En paralelo, la dimensión territorial no podría quedar por fuera. La misma norma laboral
          no produce los mismos efectos en Bogotá, Quibdó, Riohacha, Pasto, Medellín o Florencia.
          La convergencia con la OCDE puede orientar estándares, pero Colombia tendrá que adaptar
          esos estándares a mercados laborales profundamente desiguales. Hacia 2050, la discusión
          normativa podría incorporar mecanismos diferenciales para zonas rurales, economías
          fronterizas, territorios con alta informalidad, regiones con envejecimiento acelerado y
          ciudades donde el trabajo digital crece más rápido que la capacidad institucional para
          regularlo.
        </P>
        <Figura
          numero="9"
          titulo="Pronóstico normativo 2026-2050 por horizonte de adaptación"
          imagen={figura08}
          alt="Resumen de los horizontes de adaptación normativa: ajustes inmediatos, expansión regulatoria, transformación estructural y consolidación"
          nota="La figura resume los horizontes de adaptación: ajustes inmediatos, expansión regulatoria, transformación estructural y consolidación. Su lectura permite ubicar qué temas aparecen primero y cuáles maduran hacia el cierre del periodo."
        />

        <H3>Las leyes que probablemente tendrán que moverse</H3>
        <P>
          Así, el pronóstico normativo permite identificar un conjunto de leyes y marcos
          regulatorios que podrían concentrar la adaptación entre 2026 y 2050. En seguridad social,
          la Ley 100 de 1993 y el Decreto 1072 de 2015 aparecen como columnas que deberán dialogar
          con nuevas trayectorias laborales, especialmente en riesgos, cotización, protección de
          independientes y articulación con ingresos variables. En trabajo decente y condiciones
          laborales, la Ley 2466 de 2025 funcionaría como punto de partida para ajustes
          reglamentarios, interpretación administrativa y reformas posteriores al Código Sustantivo
          del Trabajo.
        </P>
        <P>
          Del mismo modo, en protección al cesante y empleabilidad, la Ley 789 de 2002 y la Ley
          1636 de 2013 podrían adaptarse para responder a transiciones laborales más frecuentes, no
          solo a episodios clásicos de desempleo. En trabajo remoto y tiempo laboral, la Ley 2088
          de 2021, la Ley 2191 de 2022 y la Ley 2101 de 2021 podrían evolucionar hacia un marco más
          amplio sobre trabajo híbrido, disponibilidad digital, desconexión, productividad y
          bienestar. En subsidio familiar y servicios sociales, la Ley 21 de 1982 podría requerir
          una lectura más contemporánea frente a hogares diversos, cuidado, primera infancia,
          formación y bienestar preventivo.
        </P>
        <P>
          Por último, en trabajo digital y plataformas, Colombia podría necesitar una regulación
          más específica que hoy no está plenamente consolidada. Allí entrarían en juego los
          aprendizajes de países OCDE y de la Unión Europea sobre plataformas digitales, algoritmos
          y transparencia. La adaptación esperada no consiste únicamente en decidir si un
          repartidor, conductor o trabajador digital es empleado o independiente. La cuestión más
          profunda es qué derechos mínimos debe conservar cualquier persona cuando su ingreso
          depende de una infraestructura digital que asigna, evalúa y limita su trabajo.
        </P>
        <Figura
          numero="10"
          titulo="Ejes estratégicos del pronóstico normativo"
          imagen={figura09}
          alt="Integración de los ocho campos normativos del análisis prospectivo: seguridad social, compensación familiar, trabajo remoto, jornada, cuidado, empleabilidad, formalización y gobernanza de datos"
          nota="La figura integra los ocho campos normativos que ordenan el análisis prospectivo: seguridad social, compensación familiar, trabajo remoto, jornada, cuidado, empleabilidad, formalización y gobernanza de datos."
        />

        <H3>Una prospectiva normativa para leer el país que viene</H3>
        <P>
          A medida que avance la convergencia con la OCDE, la discusión laboral colombiana tendrá
          que abandonar la idea de que cada reforma se resuelve de manera aislada. Lo que aparece
          hacia 2050 es una conversación normativa más amplia sobre seguridad social, empleo,
          formación, cuidado, plataformas, tiempo de trabajo y datos. En ese escenario, la ley no
          solo define obligaciones; también organiza la manera en que una sociedad reconoce el
          trabajo que sostiene su vida económica y familiar.
        </P>
        <P>
          Por ahora, las señales más consistentes se ubican en cuatro frentes de seguimiento: la
          reglamentación de la reforma laboral de 2025, la adaptación de la protección social para
          trayectorias no estándar, la regulación del trabajo digital y la actualización de los
          instrumentos de formalización. Allí se concentrará buena parte de la presión normativa de
          los próximos años, especialmente si el país mantiene su propósito de acercarse a
          estándares laborales más avanzados sin desconocer las condiciones reales de su mercado de
          trabajo.
        </P>

        <H3>Los frentes donde la legislación laboral empezará a moverse</H3>
        <P>
          En primer lugar, el pronóstico normativo permite observar seis campos donde la
          legislación colombiana podría concentrar sus ajustes más visibles. No se trata de una
          lista cerrada de reformas, sino de una señal de prioridad: seguridad social, subsidio
          familiar, protección al cesante, régimen laboral, trabajo remoto y reforma laboral
          aparecen como piezas que ya existen en el ordenamiento jurídico, pero que deberán
          dialogar con una realidad laboral más móvil. La Ley 100 de 1993, la Ley 21 de 1982, la
          Ley 789 de 2002, el Decreto 1072 de 2015, la Ley 2088 de 2021 y la Ley 2466 de 2025
          funcionan como puntos de partida, no como estaciones finales.
        </P>
        <Figura
          numero="11"
          titulo="Frentes normativos prioritarios, 2026–2050"
          imagen={figura10}
          alt="Frentes normativos prioritarios del pronóstico construido con el normograma histórico 1946–2026, la matriz prospectiva cualitativa y referentes de convergencia OCDE"
          nota="Elaboración propia con base en el normograma histórico 1946–2026, la matriz prospectiva cualitativa 2026–2050 y referentes de convergencia OCDE."
        />
        <P>
          Así, el primer mensaje de la figura es que la adaptación normativa no debería entenderse
          como una reforma única, sino como una secuencia de ajustes conectados. La seguridad
          social tendería a discutir coberturas más portables para trabajadores independientes, por
          encargo o con ingresos variables. El subsidio familiar podría moverse hacia hogares más
          diversos y trayectorias familiares menos tradicionales. La protección al cesante tendría
          que conversar con empleabilidad, reconversión y formación continua, mientras el régimen
          laboral podría exigir una actualización compilatoria capaz de ordenar reglas dispersas y
          hacerlas comprensibles para empleadores, trabajadores y autoridades.
        </P>
        <P>
          Al mismo tiempo, el trabajo remoto y la reforma laboral reciente abren una zona de
          transición normativa. La regulación del teletrabajo, del trabajo en casa y del trabajo
          híbrido ya no puede limitarse a señalar el lugar donde se presta el servicio; tendrá que
          reconocer disponibilidad, desconexión, salud mental, control digital, productividad y
          corresponsabilidad. En paralelo, la Ley 2466 de 2025 opera como una bisagra: actualiza
          parte del régimen laboral, pero también deja abierta la pregunta por los ajustes
          posteriores que podrían madurar cuando el país enfrente con mayor intensidad plataformas,
          algoritmos, multiactividad y protección social portátil.
        </P>

        <H3>Una hoja de ruta para no confundir urgencia con maduración</H3>
        <P>
          En segundo lugar, la lectura temporal permite distinguir entre cambios inmediatos y
          cambios de maduración lenta. Entre 2026 y 2030, la agenda plausible se concentra en
          reglamentación, implementación y ajustes operativos: seguridad social para trabajo no
          estándar, aplicación de la reforma laboral, trabajo remoto, riesgos laborales para
          independientes y supervisión basada en datos. En cambio, desde 2031 en adelante, el
          énfasis se desplaza hacia reformas más estructurales, como la modernización del subsidio
          familiar, la territorialidad laboral, la portabilidad de derechos y la interoperabilidad
          institucional.
        </P>
        <Figura
          numero="12"
          titulo="Pronóstico normativo laboral en Colombia, 2026–2050"
          imagen={figura11}
          alt="Organización interpretativa de la adaptación normativa por horizontes de la matriz prospectiva cualitativa 2026–2050"
          nota="Elaboración propia con base en la matriz prospectiva cualitativa 2026–2050; los horizontes representan una organización interpretativa de adaptación normativa, no una predicción numérica."
        />
        <P>
          De este modo, el horizonte 2026–2030 aparece como una etapa de ajustes inmediatos porque
          varias discusiones ya están abiertas. Allí se ubican la reglamentación de la Ley 2466 de
          2025, la consolidación del derecho a la desconexión, la protección frente a riesgos
          laborales de trabajadores independientes y la capacidad del Estado para vigilar con
          información más trazable. La presión inicial no proviene de una idea abstracta de
          modernización, sino de necesidades visibles: personas que trabajan desde la casa, que
          alternan contratos, que prestan servicios por encargo o que sostienen ingresos sin una
          relación laboral clásica.
        </P>
        <P>
          Posteriormente, entre 2031 y 2035, la discusión podría pasar de la urgencia a la
          arquitectura institucional. La modernización de la Ley 21 de 1982, la flexibilización del
          subsidio familiar, la protección al cesante y la empleabilidad podrían adquirir mayor
          relevancia porque la protección social tendría que responder a hogares diversos, cambios
          en la composición familiar y ciclos laborales más intermitentes. Por su parte, entre 2036
          y 2040, el foco se desplazaría hacia territorialidad, inversión social, gobierno
          corporativo y estándares de calidad, especialmente si la brecha entre grandes centros
          urbanos y territorios periféricos sigue marcando la capacidad real de acceder a derechos
          laborales.
        </P>
        <P>
          Más adelante, durante el periodo 2041–2050, la agenda se vuelve más sofisticada. La
          regulación algorítmica, la portabilidad de derechos, la interoperabilidad institucional y
          la protección para trayectorias discontinuas podrían dejar de ser temas emergentes y
          convertirse en condiciones básicas de funcionamiento del sistema. En esa fase, el país no
          estaría discutiendo únicamente si una persona tiene contrato o no, sino cómo se acumulan
          derechos cuando una vida laboral pasa por empleo formal, prestación de servicios,
          plataformas, trabajo independiente, pausas de cuidado, desempleo y reconversión.
        </P>

        <H3>Los ejes de adaptación: donde la norma toca la vida cotidiana</H3>
        <P>
          En tercer lugar, los ejes de adaptación muestran que la discusión laboral del futuro no
          estará confinada al Código Sustantivo del Trabajo. La protección social, el trabajo
          digital, la jornada, el subsidio, la supervisión y la formación aparecen como campos
          conectados. Esta lectura es importante porque muchas de las tensiones laborales hacia
          2050 no nacerán dentro de una sola ley: surgirán en la frontera entre empleo, tecnología,
          hogares, cuidado, productividad y datos.
        </P>
        <Figura
          numero="13"
          titulo="Ejes de adaptación normativa esperados, 2026–2050"
          imagen={figura12}
          alt="Síntesis de los ejes de adaptación normativa esperados, construida a partir de 40 hitos del normograma histórico y referentes internacionales de protección del empleo, trabajo digital y gobernanza laboral"
          nota="Elaboración propia con base en la síntesis de 40 hitos del normograma histórico y referentes internacionales de protección del empleo, trabajo digital y gobernanza laboral."
        />
        <P>
          Por una parte, la protección y la seguridad sociales deberán adaptarse a trayectorias no
          estándar. La idea de cobertura no podrá depender exclusivamente de una relación laboral
          permanente, porque una proporción relevante de ciudadanos alternará entre empleo formal,
          ocupación independiente, contratos por prestación de servicios, emprendimientos,
          plataformas o periodos de cuidado. En ese contexto, la portabilidad de derechos podría
          convertirse en una de las palabras clave del futuro: no derechos atados solo al puesto,
          sino derechos que acompañen a la persona a través de sus transiciones laborales.
        </P>
        <P>
          Por otra parte, el trabajo digital, remoto y por plataformas obligará a precisar
          responsabilidades que hoy suelen quedar en zonas grises. La referencia internacional ya
          empieza a marcar un camino: mayor transparencia en algoritmos, explicación de decisiones
          automatizadas, supervisión humana, protección de datos y criterios más claros para
          diferenciar autonomía real de subordinación encubierta. Para Colombia, esa adaptación
          podría implicar reglas específicas sobre asignación de tareas, evaluación digital,
          desconexión, vigilancia tecnológica, remuneración por tiempos efectivos y mecanismos de
          reclamación frente a decisiones automatizadas.
        </P>
        <P>
          A su vez, la jornada, la productividad y la desconexión podrían convertirse en una nueva
          frontera del derecho laboral. La reducción de horas de trabajo, la expansión del trabajo
          híbrido y el aumento de herramientas digitales obligan a repensar cómo se mide el tiempo
          laboral. En adelante, el debate podría moverse desde la presencia física hacia la carga
          efectiva, la disponibilidad permanente, el derecho al descanso y la prevención de riesgos
          psicosociales. La norma laboral, por tanto, tendría que proteger no solo el ingreso, sino
          también el tiempo como recurso social.
        </P>
        <P>
          De manera complementaria, la compensación familiar y el subsidio podrían adquirir un
          sentido más flexible frente a hogares diversos. La protección social del futuro tendrá
          que reconocer familias monoparentales, hogares unipersonales, cuidadores, trabajadores
          mayores, jóvenes con inserciones laborales tardías y hogares que combinan ingresos
          formales e informales. En esa línea, los servicios sociales, la formación, la
          empleabilidad y el cuidado podrían ganar peso frente a una lectura exclusivamente
          monetaria del beneficio.
        </P>

        <H3>Las presiones que empujan el cambio normativo</H3>
        <P>
          Finalmente, la prospectiva normativa no surge de una preferencia por reformar, sino de
          presiones estructurales que ya están modificando el trabajo. La automatización, las
          plataformas digitales, el envejecimiento, la informalidad, la productividad, la calidad
          del empleo, el teletrabajo, la transparencia de datos y la territorialidad obligan a que
          el derecho laboral sea más anticipatorio. Cuando estas fuerzas se combinan, la norma deja
          de ser únicamente un instrumento de regulación del conflicto entre empleador y
          trabajador; pasa a ser una forma de ordenar riesgos sociales que se expanden más allá de
          la empresa tradicional.
        </P>
        <Figura
          numero="14"
          titulo="Factores que impulsan el cambio normativo laboral"
          imagen={figura13}
          alt="Presiones estructurales del pronóstico 2026-2050: automatización, plataformas digitales, envejecimiento, informalidad, productividad, calidad del empleo, teletrabajo, transparencia de datos y territorialidad alrededor del cambio normativo laboral"
          nota="Elaboración propia con base en la lectura prospectiva del normograma laboral, la agenda OCDE de protección del empleo y referentes internacionales sobre trabajo digital y plataformas."
        />
        <P>
          En consecuencia, uno de los principales motores del cambio será la necesidad de proteger
          el trabajo no estándar sin destruir su diversidad. La economía colombiana seguirá
          teniendo trabajadores por cuenta propia, independientes, contratistas, personas en
          plataformas, cuidadores no remunerados que entran y salen del mercado, jóvenes con
          trayectorias intermitentes y personas mayores que prolongan su vida laboral. La pregunta
          normativa será cómo ampliar protección, seguridad social y prevención de riesgos sin
          imponer una sola forma de trabajo para todos los casos.
        </P>
        <P>
          Además, la gestión algorítmica obligará a una conversación más precisa sobre poder
          laboral. En las plataformas y en entornos altamente digitalizados, una decisión sobre
          asignación de pedidos, calificación, bloqueo, rendimiento o continuidad puede estar
          mediada por sistemas automatizados. Por ello, la futura adaptación normativa podría
          exigir explicabilidad, acceso a información, revisión humana, trazabilidad y canales de
          controversia. La tecnología no eliminaría la necesidad de regulación; por el contrario,
          podría hacerla más necesaria para saber quién decide, con qué datos y bajo qué
          responsabilidad.
        </P>
        <P>
          Igualmente, la portabilidad de derechos se perfila como un eje transversal. Si una
          persona cambia de ocupación, combina fuentes de ingreso o atraviesa periodos sin
          contrato, la protección no debería reiniciarse desde cero en cada transición. Por eso,
          hacia 2050 podrían fortalecerse cuentas individuales, registros interoperables, historias
          laborales más completas, acumulación flexible de aportes, certificados de competencias y
          mecanismos de protección que acompañen a la persona durante su ciclo de vida laboral.
        </P>
        <P>
          Por último, la exigencia a empleadores, autoridades y entidades del sistema podría
          aumentar en tres planos: cumplimiento verificable, datos de calidad y coordinación
          institucional. La inspección laboral del futuro no dependería solo de visitas y
          denuncias, sino de información interoperable, análisis de riesgo, trazabilidad de
          aportes, alertas tempranas y sanciones efectivas. Bajo esa lógica, la convergencia con
          referentes OCDE no se expresaría únicamente en nuevas leyes, sino en una capacidad más
          fina para hacerlas cumplir en empresas grandes, micronegocios, plataformas y territorios
          con baja densidad institucional.
        </P>
        <P>
          En este horizonte, las normas laborales que se espera adaptar no operan como piezas
          separadas. La Ley 100 de 1993, la Ley 21 de 1982, la Ley 789 de 2002, el Decreto 1072 de
          2015, la Ley 2088 de 2021 y la Ley 2466 de 2025 forman una cadena que podría reordenarse
          gradualmente para responder a nuevas formas de trabajo, protección portátil, regulación
          digital, empleabilidad y bienestar. La prospectiva 2026–2050 señala, entonces, una
          tendencia general: mayor protección, flexibilidad regulada y convergencia gradual con
          estándares internacionales, sin perder de vista que la norma laboral colombiana deberá
          seguir resolviendo tensiones propias de su mercado de trabajo: informalidad, desigualdad
          territorial, baja productividad y trayectorias laborales incompletas.
        </P>

        <h2 className="modulo-normatividad-laboral__seccion-referencias">Referencias</h2>
        <ul className="modulo-normatividad-laboral__referencias">
          <li className="modulo-normatividad-laboral__referencia">
            European Parliament and Council of the European Union. (2024). Directive (EU) 2024/2831
            of 23 October 2024 on improving working conditions in platform work. EUR-Lex. Obtenido
            de{' '}
            <a href="https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng" target="_blank" rel="noreferrer">
              https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng
            </a>
          </li>
          <li className="modulo-normatividad-laboral__referencia">
            Ley 2088. (2021). de 2021, por la cual se regula el trabajo en casa y se dictan otras
            disposiciones. Congreso de Colombia. Obtenido de{' '}
            <a
              href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=162970"
              target="_blank"
              rel="noreferrer"
            >
              https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=162970
            </a>
          </li>
          <li className="modulo-normatividad-laboral__referencia">
            Ley 2191. (2022). Ley 2191 de 2022, por medio de la cual se regula la desconexión
            laboral. Congreso de Colombia. Función Pública. Obtenido de{' '}
            <a
              href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=177586"
              target="_blank"
              rel="noreferrer"
            >
              https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=177586
            </a>
          </li>
          <li className="modulo-normatividad-laboral__referencia">
            Ley 2466 . (2025). Ley 2466 de 2025, por medio de la cual se modifica parcialmente
            normas laborales y se adopta una reforma laboral para el trabajo decente y digno en
            Colombia. Congreso de Colombia. Obtenido de{' '}
            <a
              href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=260676"
              target="_blank"
              rel="noreferrer"
            >
              https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=260676
            </a>
          </li>
          <li className="modulo-normatividad-laboral__referencia">
            Organisation for Economic Co-operation and Development. (2025). OECD Employment Outlook
            2025. Obtenido de{' '}
            <a
              href="https://www.oecd.org/en/publications/oecd-employment-outlook-2025_194a947b-en.html"
              target="_blank"
              rel="noreferrer"
            >
              https://www.oecd.org/en/publications/oecd-employment-outlook-2025_194a947b-en.html
            </a>
          </li>
          <li className="modulo-normatividad-laboral__referencia">
            Organisation for Economic Co-operation and Development. (2026). Future of work.
            Obtenido de{' '}
            <a
              href="https://www.oecd.org/en/topics/future-of-work.html"
              target="_blank"
              rel="noreferrer"
            >
              https://www.oecd.org/en/topics/future-of-work.html
            </a>
          </li>
          <li className="modulo-normatividad-laboral__referencia">
            Organisation for Economic Co-operation and Development. (2026). OECD indicators of
            employment protection. Obtenido de{' '}
            <a
              href="https://www.oecd.org/en/data/datasets/oecd-indicators-of-employment-protection.html"
              target="_blank"
              rel="noreferrer"
            >
              https://www.oecd.org/en/data/datasets/oecd-indicators-of-employment-protection.html
            </a>
          </li>
          <li className="modulo-normatividad-laboral__referencia">
            Organización Internacional del Trabajo. (2026). ILOSTAT: Labour statistics data tools.
            Obtenido de{' '}
            <a href="https://ilostat.ilo.org/data/" target="_blank" rel="noreferrer">
              https://ilostat.ilo.org/data/
            </a>
          </li>
        </ul>
        </article>
      </div>
    </section>
  );
}

export default ModuloNormatividadLaboral;
