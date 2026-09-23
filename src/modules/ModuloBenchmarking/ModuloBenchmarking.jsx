/**
 * ModuloBenchmarking — Sección "Benchmarking" del menú fijo.
 *
 * Artículo "Concepción del bienestar. Análisis comparativo" con el
 * contenido FIJO en el código, mismo patrón de los artículos de
 * tendencias: sin lecturas de .docx/.json en runtime, texto transcrito
 * literal del Word del cliente y las 5 imágenes como WebP optimizados
 * (~86 % más livianos que los PNG, nitidez verificada) con carga
 * perezosa. Particularidades del documento: DOS niveles de encabezado
 * (secciones y apartados — el índice los muestra jerarquizados) y las
 * imágenes NO llevan rótulo numerado, solo su línea "Fuente:" debajo.
 *
 * Ajustes mínimos documentados (avisados al cliente en el CHANGELOG):
 * el título "CONCEPCIÓN DEL BIENESTAR" viene duplicado al inicio del
 * cuerpo (se compone una sola vez, en el encabezado); la línea de
 * guiones bajos decorativa bajo el título no se reproduce (la separación
 * la pone el diseño del portal); las negritas parciales accidentales de
 * algunas citas (paréntesis y espacios a medio ennegrecer) se componen
 * en peso normal con el texto intacto; y el encabezado "Ventajas
 * Competitivas…" se compone SIN el numeral "1.4.3." que trae el Word
 * (0.49.1, petición del cliente: ningún otro apartado va numerado); las
 * referencias van bajo un título "Referencias" (no "REFERENCIAS") que es
 * un ACORDEÓN plegado por defecto (0.49.2, cliente: quien quiera verlas
 * las despliega; patrón de las fuentes de Factores de cambio). La
 * sexta imagen del archivo es el logo del encabezado de página del
 * documento y no se porta.
 *
 * Cambios del artículo = editar este código y recompilar.
 */
import { useId, useRef, useState } from 'react';
import TablaContenido from '../../components/TablaContenido/TablaContenido.jsx';
import './modulo-benchmarking.css';

import figura01 from '../../assets/benchmarking/figura-01.webp';
import figura02 from '../../assets/benchmarking/figura-02.webp';
import figura03 from '../../assets/benchmarking/figura-03.webp';
import figura04 from '../../assets/benchmarking/figura-04.webp';
import figura05 from '../../assets/benchmarking/figura-05.webp';

/* Imagen del documento: sin rótulo numerado, con su fuente debajo. */
function Imagen({ imagen, alt, fuente }) {
  return (
    <figure className="modulo-benchmarking__figura">
      <img
        className="modulo-benchmarking__figura-imagen"
        src={imagen}
        alt={alt}
        loading="lazy"
      />
      <p className="modulo-benchmarking__figura-fuente">
        <strong>Fuente:</strong> {fuente}
      </p>
    </figure>
  );
}

const P = ({ children }) => <p className="modulo-benchmarking__parrafo">{children}</p>;
const H2 = ({ children }) => <h2 className="modulo-benchmarking__seccion">{children}</h2>;
const H3 = ({ children }) => <h3 className="modulo-benchmarking__apartado">{children}</h3>;
const Ref = ({ children }) => <li className="modulo-benchmarking__referencia">{children}</li>;
const Enlace = ({ url }) => (
  <a href={url} target="_blank" rel="noreferrer">
    {url}
  </a>
);

function ModuloBenchmarking() {
  /* El índice lee secciones y apartados del artículo por esta ref. */
  const articuloRef = useRef(null);
  const [referenciasAbiertas, setReferenciasAbiertas] = useState(false);
  const idReferencias = useId();

  return (
    <section className="modulo-benchmarking" aria-labelledby="titulo-benchmarking">
      <header className="modulo-benchmarking__encabezado">
        <h1 id="titulo-benchmarking" className="modulo-benchmarking__titulo">
          Benchmarking
        </h1>
        <p className="modulo-benchmarking__titulo-articulo">CONCEPCIÓN DEL BIENESTAR</p>
        <p className="modulo-benchmarking__subtitulo-articulo">Análisis comparativo</p>
      </header>

      {/* Rejilla índice + artículo (tabla de contenido del cliente) */}
      <div className="articulo-con-indice">
        <TablaContenido articuloRef={articuloRef} />
        <article ref={articuloRef} className="modulo-benchmarking__panel">
        <H2>Análisis global</H2>
        <P>
          La concepción global del bienestar ha transitado de manera irreversible desde enfoques
          asistenciales tradicionales, estrictamente centrados en los ingresos, el empleo formal y
          la asistencia social básica, hacia paradigmas multidimensionales y holísticos de
          desarrollo humano integral (Sen, 1999; Stiglitz et al., 2009; OECD, 2024); es así como
          en este nuevo escenario, la protección social no se limita a mitigar la pobreza o
          transferir subsidios económicos, sino que prioriza de forma estratégica la potenciación
          de las capacidades individuales, la autonomía de las personas (Sen, 1999) y, de manera
          muy especial, la salud mental y el bienestar socioemocional. Esta evolución responde a
          un entorno global interconectado que exige rediseñar las estructuras de apoyo para
          garantizar condiciones dignas de vida a lo largo de todo el ciclo vital, reconociendo a
          los individuos como sujetos plenos de derechos (Arenas de Mesa, 2023).
        </P>
        <P>
          A nivel internacional, coexisten diversos modelos de protección social que ilustran este
          cambio de perspectiva; mientras el modelo europeo de Estado de bienestar y el enfoque
          escandinavo se fundamentan en un rol central del Estado como garante universal de la
          cohesión social mediante transferencias robustas y corresponsabilidad con las familias,
          el esquema anglosajón liberal delega en el mercado la movilidad económica, asumiendo un
          carácter netamente subsidiario y focalizado. Por su parte, el modelo latinoamericano
          clásico ha estado históricamente vinculado a la seguridad social derivada del trabajo
          formal (Arenas de Mesa, 2023), lo que genera una alta fragmentación institucional y deja
          vulnerables a amplios sectores informales. Frente a estas realidades, el modelo
          colombiano de compensación familiar opera mediante una arquitectura mixta singular,
          donde las Cajas de Compensación actúan como corporaciones privadas con una función
          social delegada y regulada por el Estado, orientada originalmente a redistribuir de
          forma solidaria los ingresos de los trabajadores y sus familias.
        </P>
        <P>
          Esta evolución conceptual obliga a las Cajas de Compensación Familiar a trascender de
          forma inmediata su rol histórico como simples pagadoras de subsidios económicos y
          administradoras de cobertura de servicios. Las instituciones del sector deben
          reconvertirse estratégicamente en articuladoras dinámicas de verdaderos ecosistemas de
          bienestar integral (Arenas de Mesa, 2023; Robles &amp; Holz, 2024); ya que este giro
          disruptivo implica integrar servicios que respondan de manera unificada a las
          dimensiones física, mental, relacional, ambiental y cultural del ser humano (OECD, 2024;
          Ura et al., 2023)., dejando atrás la fragmentación operativa que tradicionalmente ha
          caracterizado a los servicios sociales compartimentados.
        </P>
        <P>
          Asimismo, la noción misma de familia se transforma: ya no es una estructura estática,
          sino una red diversa de cuidado, afecto y soporte emocional que continúa siendo el eje
          central del tejido social, adaptándose de manera flexible a las diferentes
          configuraciones culturales contemporáneas. En este sentido, el escenario ideal para las
          Cajas de Compensación radica en su evolución hacia plataformas inteligentes y
          colaborativas que utilicen analítica avanzada y datos sociales para anticipar riesgos
          estructurales, fortalecer la cohesión en el territorio y consolidarse como motores
          fundamentales para la resiliencia de los hogares y el desarrollo sostenible.
        </P>
        <Imagen
          imagen={figura01}
          alt="Cuadro comparativo de la concepción del bienestar en el marco de la compensación familiar a nivel global, por enfoque o modelo internacional"
          fuente="Elaboración propia a partir de Esping-Andersen (1990, 1999), Arenas de mesa (2023) y OECD (2024), con análisis prospectivo propio (2026)."
        />
        <P>
          Como se aprecia en la imagen anterior, el advenimiento de la denominada "era de la
          singularidad" introduce una tensión estructural profunda en este ecosistema. La
          convergencia acelerada entre la inteligencia artificial, la biotecnología, la
          neurotecnología y la hiperestimulación digital promete expandir las capacidades humanas
          a niveles inéditos; sin embargo, al mismo tiempo genera riesgos críticos como la
          automatización laboral masiva (Arenas de Mesa, 2023; Robles &amp; Holz, 2024), la
          emergencia de nuevas formas de dependencia, la vigilancia digitalizada, la
          homogeneización conductual y la erosión directa de la autonomía humana. En este contexto
          de incertidumbre existencial, la salud mental emerge como un activo estratégico y un
          campo de batalla clínico y social de primer orden, debido a la exposición permanente a
          entornos altamente tecnologizados que detonan fenómenos alarmantes de ansiedad, soledad
          y pérdida de sentido de pertenencia (OECD, 2019).
        </P>
        <P>
          Frente a estos desafíos civilizatorios, que se entrelazan con el envejecimiento
          población masivo y la crisis climática (Arenas de Mesa, 2023; Robles &amp; Holz, 2024),
          las Cajas de Compensación Familiar deben implementar con urgencia:
        </P>
        <P>Modelos predictivos, preventivos, personalizados y de base territorial.</P>
        <P>
          Para mitigar las amenazas del entorno tecnológico y capitalizar la digitalización ética,
          las organizaciones de protección social del futuro están llamadas a reconfigurar sus
          portafolios mediante la incorporación de programas estratégicos de salud mental
          preventiva y bienestar emocional, alfabetización digital orientada a la ética
          algorítmica, y el acompañamiento directo en transiciones laborales derivadas de la
          automatización (OECD, 2019; Robles &amp; Holz, 2024).
        </P>
        <P>
          Asimismo, resulta imperativo diseñar espacios físicos y virtuales de desconexión y
          reconstrucción del tejido comunitario, junto con el desarrollo de habilidades
          adaptativas para el aprendizaje permanente.
        </P>
        <P>
          Con base en lo anterior, el bienestar ya no puede medirse únicamente a través de
          variables económicas tradicionales o de consumo (Stiglitz et al., 2009; OECD, 2024),
          sino por la capacidad real de las personas para desarrollar una vida plena, consciente y
          autónoma (Sen, 1999); debido a que la singularidad tecnológica obliga a replantear el
          concepto mismo de la compensación familiar: en adelante, ya no bastará con compensar las
          desigualdades económicas materiales del ingreso; será estrictamente necesario proteger y
          potenciar la integridad cognitiva, emocional y relacional del individuo dentro de una
          sociedad crecientemente mediada por inteligencias artificiales y plataformas digitales,
          asegurando una convergencia global hacia un bienestar regenerativo, adaptativo y
          profundamente centrado en el ser humano.
        </P>

        <H2>Análisis Latinoamérica y Bután</H2>
        <P>
          A continuación, se presenta el comparativo de Latinoamérica y Bután de la concepción de
          bienestar:
        </P>
        <Imagen
          imagen={figura02}
          alt="Cuadro comparativo de la concepción del bienestar en Latinoamérica y Bután"
          fuente="Elaboración propia a partir de Arenas de mesa (2023), Cecchini, Abramo y Morales (2019), Congreso de Colombia (1982) y Ura et al., 2023), con análisis prospectivo propio (2026)."
        />
        <H3>El Panorama Regional y el Giro hacia la Multidimensionalidad</H3>
        <P>
          América Latina atraviesa una transición estructural crítica en sus sistemas de
          protección social, migrando desde el modelo tradicional de salario familiar y
          transferencias monetarias básicas hacia esquemas de bienestar multidimensionales e
          integrales (Arenas de Mesa, 2023). Esta evolución regional responde a la necesidad de
          mirar más allá del alivio inmediato de la pobreza, incorporando dimensiones complejas y
          urgentes como la salud mental, el cuidado de personas dependientes, la empleabilidad
          adaptativa y la cohesión territorial (Arenas de Mesa, 2023; Robles &amp; Holz, 2024),
          todo ell o sustentado por la creciente digitalización de los sistemas de información;
          para lo cual la diversidad de enfoques conceptuales e instrumentos en la región es
          amplia: conviven desde transferencias condicionadas masivas como Bolsa Família en Brasil
          o los programas de asistencia en México, hasta sistemas públicos con fuerte
          institucionalidad estatal en Argentina y Uruguay, e incluso visiones disruptivas
          globales como el modelo de Felicidad Nacional Bruta de Bután (Ura et al., 2023), el cual
          sirve de referente para armonizar el bienestar material con la salud psicológica y la
          sostenibilidad ambiental.
        </P>
        <H3>Divergencias en la Ejecución y Desafíos del Entorno</H3>
        <P>
          A pesar de compartir el horizonte estratégico de un bienestar integral, persisten
          marcadas asimetrías institucionales en la ejecución de estas políticas a lo largo del
          continente (Arenas de mesa, 2023; Robles &amp; Holz, 2024). Países como Uruguay y Costa
          Rica avanzan decididamente hacia un modelo universalista estatal y de
          corresponsabilidad, mientras que economías como Brasil, México y Perú priorizan enfoques
          focalizados en la asistencia social para hogares en pobreza extrema y el desarrollo de
          capacidades básicas. Por otro lado, Chile y Colombia operan bajo categorías híbridas que
          integran los aportes laborales directos con la prestación de servicios de protección
          social; donde el gran desafío común para toda la región radica en la urgencia de adaptar
          estos sistemas a un panorama prospectivo, caracterizado por desafíos altamente
          disruptivos como el envejecimiento acelerado de la población, el cambio climático, la
          automatización del trabajo y la persistente informalidad laboral (Arenas de Mesa, 2023;
          Robles &amp; Holz, 2024).
        </P>
        <H3>La Singularidad de Colombia y el Futuro de la Compensación</H3>
        <P>
          En este entramado regional, Colombia presenta una singularidad institucional notable
          gracias al rol de las Cajas de Compensación Familiar. A diferencia de los sistemas
          puramente estatales o basados en subsidios directos, el modelo colombiano destaca por
          ser un esquema parafiscal único, privado de función social, que gestiona subsidios en
          dinero, especie y servicios de salud, vivienda, educación y recreación (Congreso de
          Colombia, 1982; Superintendencia del Subsidio Familiar, s. f.); donde si bien este
          modelo goza de una robusta capacidad operativa en el territorio, enfrenta tensiones
          crecientes asociadas a su sostenibilidad financiera y a su legitimidad redistributiva en
          un mercado con alta informalidad; por lo que el éxito de esta estructura en el mediano
          plazo dependerá críticamente de su habilidad para transformarse en ecosistemas
          inteligentes de bienestar preventivo; plataformas capaces de migrar definitivamente de
          la simple lógica del subsidio económico hacia una protección social resiliente, de
          alcance universal, fuertemente articulada con el empleo, el cuidado de la vida y el
          desarrollo integral de capacidades (Arenas de Mesa, 2023; Robles &amp; Holz, 2024).
        </P>

        <H2>Entidades colombianas relacionadas con el bienestar y la compensación familiar</H2>
        <P>
          Las siguientes imágenes ilustran el comparativo de la concepción de bienestar que tienen
          algunas de las entidades estatales que desarrollan sus funciones en el marco del
          bienestar y de la compensación familiar en Colombia:
        </P>
        <Imagen
          imagen={figura03}
          alt="Primer cuadro comparativo de la concepción del bienestar de las entidades estatales colombianas vinculadas a la protección social"
          fuente="Elaboración propia a partir de información institucional de la Superintendencia del Subsidio Familiar, Asocajas, Ministerio del Trabajo, DANE, DNP, Ministerio de Salud y Protección Social, ICBF, Prosperidad Social y SENA, con análisis prospectivo propio (2026)."
        />
        <Imagen
          imagen={figura04}
          alt="Segundo cuadro comparativo de la concepción del bienestar de las entidades estatales colombianas vinculadas a la protección social"
          fuente="Elaboración propia a partir de información institucional de la Superintendencia del Subsidio Familiar, Asocajas, Ministerio del Trabajo, DANE, DNP, Ministerio de Salud y Protección Social, ICBF, Prosperidad Social y SENA, con análisis prospectivo propio (2026)."
        />
        <H3>La Convergencia Institucional hacia la Multidimensionalidad</H3>
        <P>
          El análisis comparado de las entidades colombianas vinculadas directa o indirectamente
          al sistema de protección social evidencia una transición estructural profunda: se ha
          transitado progresivamente desde concepciones tradicionales de bienestar, asociadas
          exclusivamente al ingreso material o a la asistencia social básica, hacia enfoques
          multidimensionales de desarrollo humano integral (Sen, 1999; Stiglitz et al., 2009;
          OECD, 2024); donde en este ecosistema, cada institución conserva un énfasis específico
          derivado de su naturaleza funcional. Mientras entes como la Superintendencia del
          Subsidio Familiar (SuperSubsidio) y el Ministerio del Trabajo mantienen una visión
          jurídicamente ligada a la protección del empleo formal, el trabajo digno y la correcta
          destinación de los aportes parafiscales (Ministerio del Trabajo, s. f.; Superintendencia
          del Subsidio Familiar, s. f.), agencias técnicas y de planificación como el Departamento
          Nacional de Planeación (DNP), el DANE, el Ministerio de Salud y Prosperidad Social
          incorporan aproximaciones más amplias enfocadas en la medición de la calidad de vida, la
          equidad, el desarrollo de capacidades y la salud mental (DANE, 2025.; DNP, s. f.;
          Ministerio de Salud y Protección Social, s. f.; Prosperidad Social, s. f.). Por su
          parte, las Cajas de Compensación Familiar operan de manera sistémica en el territorio
          administrando subsidios y articulando una oferta que comprende, entre otros componentes,
          educación, vivienda, recreación y servicios sociales (Congreso de Colombia, 1982;
          Superintendencia del Subsidio Familiar, s. f.), consolidándose como actores relevantes
          para mitigar desigualdades socioeconómicas y fortalecer el bienestar de los trabajadores
          y sus familias.
        </P>
        <H3>Desafíos Futuros y la Era de los Ecosistemas Inteligentes</H3>
        <P>
          Desde una perspectiva de futuro, las tendencias de estas organizaciones convergen hacia
          la configuración de ecosistemas integrados de bienestar, donde las fronteras sectoriales
          entre protección social, salud, educación, empleabilidad y desarrollo territorial
          tienden a ser cada vez más difusas, en consonancia con la evolución hacia sistemas de
          protección social integrales y articulados (Arenas de Mesa, 2023; Robles &amp; Holz,
          2024). Este cambio de paradigma exige que tanto las Cajas de Compensación como las
          entidades estatales evolucionen desde esquemas operativos fragmentados hacia plataformas
          articuladas de inteligencia social y bienestar predictivo; donde la urgencia de esta
          transformación radica en la necesidad de anticipar y responder con resiliencia a
          fenómenos estructurales complejos como el envejecimiento poblacional, la crisis
          climática, las transformaciones tecnológicas del mercado laboral y la persistente
          desigualdad territorial (Arenas de Mesa, 2023; Robles &amp; Holz, 2024). Es así que, el
          éxito del modelo dependerá, en última instancia, de la capacidad de estas instituciones
          para diseñar soluciones adaptativas y personalizadas basadas en datos, logrando un
          balance eficiente entre la sostenibilidad financiera y una protección social robusta que
          posicione a las personas y a sus diversas configuraciones familiares como sujetos plenos
          de derechos.
        </P>

        <H2>Cajas de compensación familiar</H2>
        <Imagen
          imagen={figura05}
          alt="Cuadro comparativo de la concepción del bienestar de las principales cajas de compensación familiar de Colombia"
          fuente="Elaboración propia a partir de información institucional de Compensar, Colsubsidio, Cafam, Comfama, Comfenalco Antioquia, Comfandi y Comfenalco Valle, con análisis prospectivo propio (2026)."
        />
        <H3>La Redefinición del Bienestar en las Cajas de Compensación</H3>
        <P>
          Las Cajas de Compensación Familiar en Colombia evidencian una evolución desde su función
          histórica asociada a la administración del subsidio familiar y la prestación de
          servicios sociales hacia aproximaciones más amplias de bienestar y desarrollo humano,
          adaptadas a las particularidades del territorio, la población y la estrategia
          organizacional (Congreso de Colombia, 1982; Superintendencia del Subsidio Familiar,
          s. f.; Asocajas, 2024). En este nuevo ecosistema, el bienestar trasciende una
          perspectiva exclusivamente económica para comprenderse desde una aproximación
          multidimensional que incorpora condiciones materiales y dimensiones relacionadas con la
          salud, las relaciones sociales, el bienestar subjetivo, el desarrollo de capacidades y
          la sostenibilidad (Sen, 1999; Stiglitz et al., 2009; OECD, 2024).
        </P>
        <P>
          Esta evolución conceptual se evidencia en la diversificación de sus enfoques
          estratégicos: mientras entidades como Compensar integran soluciones apoyadas en la
          tecnología y la eficiencia empresarial para las pymes (Compensar, 2026), organizaciones
          como Colsubsidio orientan sus esfuerzos al cierre de brechas sociales mediante una
          robusta cultura ESG (Ambiental, Social y Gobernanza) e incorporan criterios de
          sostenibilidad en su gestión (Colsubsidio, 2026), y Cafam desarrolla una propuesta
          institucional centrado en un modelo de humanismo enfocado, de la vida personal, familiar
          y laboral (Cafam, 2026).
        </P>
        <H3>Identidad Territorial y Diversificación Estratégica</H3>
        <P>
          Esta transformación no se asume de manera homogénea, sino que se nutre de las realidades
          y vocaciones socioculturales de las regiones donde operan las instituciones. En el
          departamento de Antioquia, por ejemplo, Comfama destaca por promover el progreso y el
          aprendizaje continuo bajo la filosofía del capitalismo consciente, utilizando el poder
          de la cultura y el cuidado como determinantes de la salud mental; por su parte,
          Comfenalco Antioquia prioriza de manera estratégica la presencia en el territorio con un
          fuerte enfoque de inclusión, llevando programas integrales y sostenibles a las
          comunidades rurales y vulnerables más alejadas de las urbes.
        </P>
        <P>
          De igual forma, en el Valle del Cauca, la gestión de Comfandi se soporta en una medición
          científica a través de un índice de armonía multidimensional de ocho dimensiones que
          actúa como un habilitador de la productividad laboral, mientras que Comfenalco Valle
          destaca por humanizar el acceso a la seguridad social mediante una atención diferencial,
          cálida y de alta cercanía con los trabajadores independientes y de menores ingresos.
        </P>
        <H3>Ventajas Competitivas y Plataformas de Futuro</H3>
        <P>
          Prospectivamente, el éxito y la legitimidad futura de las cajas de compensación
          dependerán de su capacidad para transformar estas visiones en ventajas competitivas
          diferenciadas y alineadas con las megatendencias globales. La incorporación de
          herramientas disruptivas como la inteligencia artificial para la personalización de
          servicios, el diseño de programas de bienestar preventivo en salud mental y el
          fortalecimiento del tejido comunitario frente a la crisis climática y la automatización
          laboral, marcan la ruta hacia la sostenibilidad del sistema (OECD, 2024; Robles &amp;
          Holz, 2024).
        </P>
        <P>
          Al migrar de manera definitiva de la fragmentación operativa hacia plataformas
          inteligentes e integrales de bienestar anticipatorio, las cajas no solo garantizan su
          vigencia institucional y financiera, sino que se consolidan como motores esenciales de
          desarrollo humano sostenible. Su valor estratégico radicará en su agilidad para generar
          experiencias hiperpersonalizadas, mitigar nuevas vulnerabilidades socioemocionales y
          reconstruir la cohesión social en un entorno crecientemente volátil (OECD, 2024; Robles
          &amp; Holz, 2024).
        </P>

        {/* Referencias plegadas por defecto (0.49.2, cliente): el título es un
            botón acordeón como las "Fuentes de información" de Factores de
            cambio; el índice lateral lee el rótulo limpio de data-indice. */}
        <h2 className="modulo-benchmarking__seccion-referencias" data-indice="Referencias">
          <button
            type="button"
            className="modulo-benchmarking__referencias-boton"
            aria-expanded={referenciasAbiertas}
            aria-controls={idReferencias}
            onClick={() => setReferenciasAbiertas((estado) => !estado)}
          >
            Referencias
            <span className="modulo-benchmarking__referencias-conteo">(21)</span>
            <span
              className={`modulo-benchmarking__cheuron${
                referenciasAbiertas ? ' modulo-benchmarking__cheuron--abierto' : ''
              }`}
              aria-hidden="true"
            />
          </button>
        </h2>
        {referenciasAbiertas && (
          <ul id={idReferencias} className="modulo-benchmarking__referencias">
            <Ref>
              Arenas de Mesa, A. (2023). Protección social universal, integral, sostenible y
              resiliente para erradicar la pobreza, reducir la desigualdad y avanzar hacia un
              desarrollo social inclusivo. Revista CEPAL, 141, 193–215. Comisión Económica para
              América Latina y el Caribe.
            </Ref>
            <Ref>
              Asociación Nacional de Cajas de Compensación Familiar [Asocajas]. (2024). Informe de
              gestión 2024. Asocajas.
            </Ref>
            <Ref>
              Cecchini, S. (Comp.). (2019). Protección social universal en América Latina y el
              Caribe: Textos seleccionados 2006–2019. Comisión Económica para América Latina y el
              Caribe.
            </Ref>
            <Ref>
              Cecchini, S., Abramo, L., &amp; Morales, B. (2019). Programas sociales, superación de
              la pobreza e inclusión laboral: Aprendizajes desde América Latina y el Caribe.
              Comisión Económica para América Latina y el Caribe.
            </Ref>
            <Ref>
              Comfama. (2025). Informe de sostenibilidad 2025. Caja de Compensación Familiar de
              Antioquia Comfama.
            </Ref>
            <Ref>
              Compensar. (2026). Información institucional y oferta de bienestar. Caja de
              Compensación Familiar Compensar.
            </Ref>
            <Ref>
              Congreso de Colombia. (1982, 22 de enero). Ley 21 de 1982, por la cual se modifica el
              régimen del subsidio familiar y se dictan otras disposiciones. Diario Oficial No.
              35.939.
            </Ref>
            <Ref>
              Departamento Administrativo Nacional de Estadística -DANE-. (2025). Encuesta Nacional
              de Calidad de Vida (ECV) 2024. DANE.
            </Ref>
            <Ref>
              Departamento Nacional de Planeación -DNP-. (s. f.). Calidad de vida y desarrollo
              social. Departamento Nacional de Planeación.
            </Ref>
            <Ref>
              Esping-Andersen, G. (1990). The three worlds of welfare capitalism. Princeton
              University Press.
            </Ref>
            <Ref>
              Esping-Andersen, G. (1999). Social foundations of postindustrial economies. Oxford
              University Press.
            </Ref>
            <Ref>
              Ministerio de Salud y Protección Social. (s. f.). Salud mental. Gobierno de Colombia.
            </Ref>
            <Ref>
              Ministerio del Trabajo. (s. f.). Funciones y deberes. Ministerio del Trabajo, Gobierno
              de Colombia.
            </Ref>
            <Ref>
              Organisation for Economic Co-operation and Development -OECD-. (2019). How’s life in
              the digital age? Opportunities and risks of the digital transformation for people’s
              well-being. OECD Publishing. <Enlace url="https://doi.org/10.1787/9789264311800-en" />
            </Ref>
            <Ref>
              Organisation for Economic Co-operation and Development -OECD-. (2024). How’s life?
              2024: Well-being and resilience in times of crisis. OECD Publishing.{' '}
              <Enlace url="https://doi.org/10.1787/90ba854a-en" />
            </Ref>
            <Ref>
              Prosperidad Social. (s. f.). Objetivos y funciones. Departamento Administrativo para
              la Prosperidad Social.
            </Ref>
            <Ref>
              Robles, C., &amp; Holz, R. (Eds.). (2024). El futuro de la protección social ante la
              crisis social prolongada en América Latina: Claves para avanzar hacia sistemas
              universales, integrales, sostenibles y resilientes. Comisión Económica para América
              Latina y el Caribe.
            </Ref>
            <Ref>Sen, A. (1999). Development as freedom. Alfred A. Knopf.</Ref>
            <Ref>
              Stiglitz, J. E., Sen, A., &amp; Fitoussi, J.-P. (2009). Report by the Commission on
              the Measurement of Economic Performance and Social Progress. Commission on the
              Measurement of Economic Performance and Social Progress.
            </Ref>
            <Ref>
              Superintendencia del Subsidio Familiar. (s. f.). Misión y visión. Superintendencia del
              Subsidio Familiar.
            </Ref>
            <Ref>
              Ura, K., Alkire, S., Wangdi, K., &amp; Zangmo, T. (2023). GNH 2022. Centre for Bhutan
              &amp; GNH Studies.
            </Ref>
          </ul>
        )}
        </article>
      </div>
    </section>
  );
}

export default ModuloBenchmarking;
