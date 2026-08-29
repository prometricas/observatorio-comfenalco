/**
 * ModuloElObservatorio — Sección "El Observatorio" del menú fijo.
 *
 * Texto conceptual del Observatorio de Futuro del Bienestar con el
 * contenido FIJO en el código, mismo patrón de los artículos del portal
 * (Benchmarking): transcripción literal del Word del cliente, DOS
 * niveles de encabezado (secciones y apartados, jerarquizados en el
 * índice) y tabla de contenido de navegación. El documento no trae
 * imágenes, tablas, fecha ni lista de referencias; las negritas de los
 * términos clave son énfasis INTENCIONAL del texto y se conservan (los
 * términos partidos en varias corridas de negrita del Word —
 * "prospectiva estratégica", "inteligencia anticipatoria", "vigilancia
 * estratégica" — se componen como un solo énfasis).
 *
 * Por avisar al cliente (erratas del Word, transcritas tal cual):
 * "fortalecer las capacidades adaptativas de mediante procesos" (falta
 * la palabra tras "de") y "el SIE pasa a para convertirse" (sobra "a" o
 * "para"); además, el documento cita autores (Godet, Miller, Ostrom…)
 * pero no trae lista de referencias.
 *
 * Cambios del texto = editar este código y recompilar.
 */
import { useRef } from 'react';
import TablaContenido from '../../components/TablaContenido/TablaContenido.jsx';
import './modulo-el-observatorio.css';

const P = ({ children }) => <p className="modulo-el-observatorio__parrafo">{children}</p>;
const H2 = ({ children }) => <h2 className="modulo-el-observatorio__seccion">{children}</h2>;
const H3 = ({ children }) => <h3 className="modulo-el-observatorio__apartado">{children}</h3>;

function ModuloElObservatorio() {
  /* El índice lee secciones y apartados del artículo por esta ref. */
  const articuloRef = useRef(null);

  return (
    <section className="modulo-el-observatorio" aria-labelledby="titulo-el-observatorio">
      <header className="modulo-el-observatorio__encabezado">
        <h1 id="titulo-el-observatorio" className="modulo-el-observatorio__titulo">
          El Observatorio
        </h1>
      </header>

      {/* Rejilla índice + artículo (tabla de contenido del cliente) */}
      <div className="articulo-con-indice">
        <TablaContenido articuloRef={articuloRef} />
        <article ref={articuloRef} className="modulo-el-observatorio__panel">
        <H2>Conceptualización del Bienestar</H2>
        <P>
          Comprender el bienestar como un fenómeno complejo, multidimensional y dinámico, cuya
          evolución depende de la interacción entre factores sociales, económicos, tecnológicos,
          ambientales, culturales y territoriales (Godet &amp; Durance, 2011; Miller, 2018); que
          lo llevan a presentar una singularidad como eje articulador de la compensación familiar
          y como fundamento para la construcción de capacidades humanas y territoriales.
        </P>
        <P>
          Es así, que al ser un fenómeno complejo no puede explicarse ni producirse desde la
          acción aislada de una organización; por el contrario, emerge de la interacción
          permanente entre instituciones públicas, empresas, organizaciones sociales, comunidades,
          universidades, centros de investigación y ciudadanos que, mediante relaciones de
          cooperación y corresponsabilidad, generan las condiciones necesarias para fortalecer el
          desarrollo humano.
        </P>

        <H2>Ecosistema de bienestar</H2>
        <P>
          Desde esta perspectiva, el <strong>Ecosistema del Bienestar</strong> puede definirse
          como un sistema abierto, dinámico e interdependiente en el que convergen múltiples
          actores, capacidades, recursos y conocimientos orientados a crear valor social
          sostenible. Esta concepción supera los enfoques tradicionales centrados exclusivamente
          en la prestación de servicios y reconoce que el bienestar es el resultado de procesos
          colaborativos, territoriales y adaptativos que evolucionan continuamente en función de
          las transformaciones del entorno (Morin, 2005; Ostrom, 2009).
        </P>
        <P>El ecosistema se estructura, en:</P>
        <P>
          primer lugar, sobre un <strong>ecosistema institucional</strong>, conformado por las
          cajas de compensación familiar, las entidades del Estado, las empresas, las
          organizaciones de cooperación, los gobiernos territoriales y demás instituciones
          responsables de formular, implementar y evaluar políticas y programas de bienestar.
        </P>
        <P>
          En segundo lugar, comprende un <strong>ecosistema social</strong>, integrado por
          afiliados, beneficiarios, organizaciones comunitarias, redes ciudadanas y demás actores
          que participan activamente en la construcción del bienestar y aportan conocimiento sobre
          las necesidades, expectativas y transformaciones sociales que experimentan los
          territorios.
        </P>
        <P>
          Complementariamente, se configura un <strong>ecosistema de inteligencia</strong>,
          conformado por universidades, centros de investigación, observatorios, tanques de
          pensamiento, redes internacionales de prospectiva y sistemas de información, cuya
          función consiste en generar evidencia, conocimiento e inteligencia estratégica para
          fortalecer las capacidades de anticipación y aprendizaje institucional.
        </P>
        <P>
          La interacción entre estos subsistemas se desarrolla mediante esquemas de{' '}
          <strong>gobernanza colaborativa</strong>, entendida como la capacidad para coordinar
          actores diversos alrededor de objetivos comunes, compartir conocimiento y construir
          decisiones colectivas sustentadas en confianza, cooperación y corresponsabilidad (Ansell
          &amp; Gash, 2008).
        </P>
        <P>
          En este contexto, las <strong>redes de actores</strong> representan el principal
          mecanismo de articulación del ecosistema, al facilitar el intercambio de capacidades,
          experiencias y recursos que fortalecen la inteligencia colectiva y la innovación.
        </P>

        <H2>El Observatorio de Futuro del Bienestar</H2>
        <P>
          Con base en el planteamiento anterior, en escenarios caracterizados por la
          incertidumbre, la complejidad y la aceleración del cambio, las instituciones requieren
          desarrollar capacidades permanentes para anticipar tendencias, identificar riesgos
          emergentes y construir escenarios que orienten la acción de largo plazo.
        </P>
        <H3>Conceptualización</H3>
        <P>
          En este contexto surge el <strong>Observatorio de Futuro del Bienestar</strong>,
          concebido como una plataforma institucional de inteligencia estratégica cuya finalidad
          consiste en producir conocimiento prospectivo para fortalecer la toma de decisiones, la
          innovación y la sostenibilidad del bienestar. Su propósito trasciende la recopilación de
          indicadores o la elaboración de diagnósticos sectoriales, orientándose hacia la
          generación de capacidades de anticipación que permitan comprender las transformaciones
          que configurarán el bienestar de las personas, las familias, las empresas y los
          territorios durante las próximas décadas (Godet, 2007; Godet &amp; Durance, 2011).
        </P>
        <P>
          Desde esta perspectiva, puede definirse como un sistema permanente de vigilancia
          estratégica, prospectiva, investigación aplicada, gestión del conocimiento e
          inteligencia territorial que integra información proveniente de múltiples fuentes para
          transformar datos en conocimiento y conocimiento en decisiones. Su naturaleza
          institucional responde a la necesidad de fortalecer las capacidades adaptativas de
          mediante procesos sistemáticos de observación, análisis, interpretación y construcción
          de escenarios de futuro.
        </P>
        <P>
          Esta concepción diferencia sustancialmente al Observatorio de Futuro de los
          observatorios tradicionales. Mientras estos últimos concentran sus esfuerzos en el
          monitoreo de indicadores, la producción de estadísticas y el seguimiento de fenómenos ya
          ocurridos, el Observatorio de Futuro incorpora metodologías propias de los estudios
          prospectivos para interpretar señales de cambio, analizar tendencias emergentes,
          identificar factores críticos de incertidumbre y construir escenarios alternativos que
          permitan anticipar oportunidades y riesgos. En otras palabras, el observatorio
          tradicional responde fundamentalmente a la pregunta{' '}
          <strong>¿qué está ocurriendo?</strong>, mientras que un observatorio de futuro busca
          responder adicionalmente{' '}
          <strong>
            ¿qué podría ocurrir?, ¿por qué podría ocurrir? y ¿qué decisiones deben adoptarse desde
            el presente para construir el futuro deseado?
          </strong>{' '}
          Esta evolución metodológica implica pasar de una lógica descriptiva hacia una lógica
          anticipatoria, donde la inteligencia estratégica se convierte en un activo esencial para
          la gestión institucional (Slaughter, 1996; Inayatullah, 2008).
        </P>
        <P>
          El Observatorio de Futuro del Bienestar se integra al{' '}
          <strong>Sistema Institucional de Inteligencia (SIE)</strong> como uno de sus componentes
          estratégicos. El SIE constituye la arquitectura organizacional encargada de articular
          procesos de vigilancia estratégica, analítica de datos, gestión del conocimiento,
          investigación, prospectiva e inteligencia competitiva para apoyar la formulación de
          políticas, programas y decisiones institucionales.
        </P>
        <P>
          En este marco, el Observatorio cumple la función de nodo articulador entre las
          diferentes fuentes de información internas y externas, promoviendo la interoperabilidad
          de datos, la integración de conocimiento especializado y el fortalecimiento de
          capacidades de análisis orientadas al bienestar. De esta manera, el SIE pasa a para
          convertirse en un modelo institucional de aprendizaje permanente que facilita la
          comprensión de fenómenos complejos y la adaptación organizacional frente a escenarios
          cambiantes (Nonaka &amp; Takeuchi, 1995).
        </P>
        <H3>Funciones:</H3>
        <P>
          Las funciones estratégicas del Observatorio se estructuran alrededor de cinco grandes
          capacidades institucionales, así:
        </P>
        <P>
          En primer lugar, desarrolla procesos permanentes de{' '}
          <strong>vigilancia estratégica</strong>, orientados a identificar tendencias globales,
          nacionales y territoriales que puedan afectar la evolución del bienestar y del sistema
          de compensación familiar.
        </P>
        <P>
          En segundo lugar, fortalece la <strong>prospectiva estratégica</strong> mediante la
          construcción de escenarios y el análisis de factores emergentes que permitan anticipar
          transformaciones de largo plazo.
        </P>
        <P>
          En tercer lugar, impulsa la <strong>gestión del conocimiento</strong>, integrando
          información proveniente de diversas fuentes para generar inteligencia institucional y
          aprendizaje organizacional.
        </P>
        <P>
          En cuarto lugar, promueve la <strong>articulación de redes de cooperación</strong>,
          vinculando universidades, centros de investigación, organismos públicos, empresas,
          organismos multilaterales y redes internacionales de prospectiva para fortalecer la
          inteligencia colectiva del sistema.
        </P>
        <P>
          Finalmente, proporciona <strong>soporte estratégico para la toma de decisiones</strong>,
          facilitando la formulación de políticas, programas e iniciativas sustentadas en
          evidencia y orientadas hacia la construcción de futuros sostenibles.
        </P>
        <P>
          En este contexto, el Observatorio de Futuro del Bienestar tiene como objeto central
          comprender el bienestar como un fenómeno complejo, multidimensional y dinámico que
          evoluciona en función de las transformaciones de las personas, los territorios y los
          sistemas de protección social. Esta perspectiva reconoce que el bienestar interpreta las
          trayectorias de vida, las capacidades humanas, las vulnerabilidades emergentes, las
          dinámicas territoriales y las tendencias globales que condicionarán el desarrollo humano
          en el futuro.
        </P>

        <H2>Los estudios de futuro y la prospectiva como fundamento metodológico</H2>
        <P>
          Los estudios de futuro constituyen el fundamento conceptual y metodológico del
          Observatorio de Futuro del Bienestar, al proporcionar concepciones, métodos y
          herramientas para comprender las transformaciones emergentes, reducir la incertidumbre
          y orientar la toma de decisiones hacia horizontes de largo plazo. A diferencia de los
          enfoques tradicionales de planificación, centrados en la extrapolación de tendencias o
          en la respuesta a problemas inmediatos, los estudios de futuro parten del reconocimiento
          de que el futuro no está predeterminado, sino que representa un espacio de posibilidades
          cuya configuración depende de las decisiones adoptadas en el presente.
        </P>
        <P>
          Desde esta perspectiva, la <strong>prospectiva estratégica</strong> se orienta a
          explorar futuros alternativos, identificar factores de cambio, construir escenarios y
          movilizar a los actores hacia la construcción de futuros deseables, más que a predecir
          acontecimientos futuros (Godet, 2007; Godet &amp; Durance, 2011).
        </P>
        <P>
          En este marco, el Observatorio incorpora la prospectiva como una capacidad institucional
          permanente para interpretar las dinámicas que transformarán el bienestar de las
          personas, las familias, las empresas y los territorios. La prospectiva estratégica
          permite integrar el análisis estructural, la evaluación de actores, la identificación de
          tendencias y la construcción de escenarios con el propósito de fortalecer la formulación
          de políticas, programas y estrategias institucionales.
        </P>
        <P>
          Complementariamente, los estudios de futuro aportan una visión interdisciplinaria que
          articula dimensiones sociales, económicas, tecnológicas, ambientales, culturales y
          políticas, favoreciendo una comprensión sistémica del bienestar y de los factores que
          condicionarán su evolución durante las próximas décadas (Bell, 2003; Inayatullah, 2008).
        </P>
        <P>
          Uno de los principales aportes de este enfoque es el desarrollo de capacidades de{' '}
          <strong>inteligencia anticipatoria</strong>, entendida como la habilidad institucional
          para identificar señales tempranas de cambio, interpretar riesgos emergentes y reconocer
          oportunidades antes de que se manifiesten plenamente. Esta capacidad se fortalece
          mediante procesos continuos de <strong>vigilancia estratégica</strong>, orientados al
          seguimiento sistemático de tendencias, innovaciones, transformaciones regulatorias,
          cambios demográficos, avances tecnológicos y dinámicas territoriales que puedan afectar
          el sistema de bienestar. La vigilancia estratégica trasciende la simple recolección de
          información, al convertir los datos en conocimiento útil para apoyar decisiones
          estratégicas y reducir la incertidumbre organizacional (OCDE, 2021).
        </P>
        <P>
          La construcción de escenarios constituye otro de los pilares metodológicos del
          Observatorio. Los escenarios prospectivos representan narrativas estructuradas sobre
          futuros plausibles que permiten analizar las consecuencias de diferentes trayectorias de
          cambio y evaluar alternativas de acción. Este ejercicio facilita la formulación de
          estrategias más robustas, incrementa la capacidad de adaptación institucional y promueve
          una cultura organizacional orientada al aprendizaje y la innovación. En este sentido, la
          construcción de escenarios se convierte en un instrumento para fortalecer la{' '}
          <strong>gobernanza anticipatoria</strong>, entendida como la capacidad de las
          instituciones para incorporar el pensamiento de largo plazo en los procesos de decisión,
          coordinar actores diversos y construir respuestas colectivas frente a desafíos complejos
          (Miller, 2018).
        </P>
        <P>
          Desde esta perspectiva, los estudios de futuro y la prospectiva estratégica proporcionan
          el soporte conceptual y metodológico que diferencia al Observatorio de Futuro del
          Bienestar de un observatorio convencional. Su finalidad consiste en desarrollar
          capacidades institucionales para anticipar transformaciones, orientar decisiones y
          construir futuros sostenibles.
        </P>
        </article>
      </div>
    </section>
  );
}

export default ModuloElObservatorio;
