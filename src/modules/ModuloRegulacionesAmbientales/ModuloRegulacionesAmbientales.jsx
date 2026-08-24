/**
 * ModuloRegulacionesAmbientales — Tendencia "Regulaciones ambientales".
 *
 * Artículo "Colombia 2040: cuando el ambiente entra en la cuenta.
 * Prospectivas del fortalecimiento de la regulación ambiental para el
 * bienestar integral" con el contenido FIJO en el código, igual que los
 * demás artículos de tendencias (decisión del cliente): sin lecturas de
 * .docx/.json en runtime. Texto transcrito literal del Word del cliente,
 * incluidas sus DOS citas destacadas centradas; las 14 figuras van como
 * WebP optimizados (~88 % más livianos que los PNG del documento,
 * nitidez verificada) con carga perezosa y caché inmutable. Trae UNA
 * tabla de datos con desplazamiento horizontal contenido (patrón de
 * Hiper-personalización) y entradilla centrada (el documento tampoco
 * trae fecha).
 *
 * Ajuste mínimo documentado (avisado al cliente en el CHANGELOG): un
 * párrafo del apartado "La huella deja de ser un dato invisible" termina
 * con la cita "(Instituto de Hidrología, Meteorología y Estudios
 * Ambientales." SIN cerrar el paréntesis ni traer el año — se transcribe
 * tal cual el Word.
 *
 * Cambios del artículo = editar este código y recompilar (no aplica el
 * contrato de reemplazo de archivos de las tendencias con datos vivos).
 */
import { useRef } from 'react';
import TablaContenido from '../../components/TablaContenido/TablaContenido.jsx';
import './modulo-regulaciones-ambientales.css';

import figura01 from '../../assets/regulaciones-ambientales/figura-01.webp';
import figura02 from '../../assets/regulaciones-ambientales/figura-02.webp';
import figura03 from '../../assets/regulaciones-ambientales/figura-03.webp';
import figura04 from '../../assets/regulaciones-ambientales/figura-04.webp';
import figura05 from '../../assets/regulaciones-ambientales/figura-05.webp';
import figura06 from '../../assets/regulaciones-ambientales/figura-06.webp';
import figura07 from '../../assets/regulaciones-ambientales/figura-07.webp';
import figura08 from '../../assets/regulaciones-ambientales/figura-08.webp';
import figura09 from '../../assets/regulaciones-ambientales/figura-09.webp';
import figura10 from '../../assets/regulaciones-ambientales/figura-10.webp';
import figura11 from '../../assets/regulaciones-ambientales/figura-11.webp';
import figura12 from '../../assets/regulaciones-ambientales/figura-12.webp';
import figura13 from '../../assets/regulaciones-ambientales/figura-13.webp';
import figura14 from '../../assets/regulaciones-ambientales/figura-14.webp';

/* Rótulo al estilo del documento: "Figura N." en negrita, título plano. */
function Figura({ numero, titulo, imagen, alt, nota }) {
  return (
    <figure className="modulo-regulaciones-ambientales__figura">
      <figcaption className="modulo-regulaciones-ambientales__figura-rotulo">
        <strong>Figura {numero}.</strong> {titulo}
      </figcaption>
      <img
        className="modulo-regulaciones-ambientales__figura-imagen"
        src={imagen}
        alt={alt}
        loading="lazy"
      />
      <p className="modulo-regulaciones-ambientales__figura-nota">
        <strong>Nota.</strong> {nota}
      </p>
    </figure>
  );
}

const P = ({ children }) => (
  <p className="modulo-regulaciones-ambientales__parrafo">{children}</p>
);
const H3 = ({ children }) => (
  <h3 className="modulo-regulaciones-ambientales__apartado">{children}</h3>
);
const Cita = ({ children }) => (
  <blockquote className="modulo-regulaciones-ambientales__cita-destacada">{children}</blockquote>
);
const Ref = ({ children }) => (
  <li className="modulo-regulaciones-ambientales__referencia">{children}</li>
);
const Enlace = ({ url }) => (
  <a href={url} target="_blank" rel="noreferrer">
    {url}
  </a>
);

function ModuloRegulacionesAmbientales({ tendencia }) {
  /* El índice lee los apartados del artículo renderizado por esta ref. */
  const articuloRef = useRef(null);

  return (
    <section
      className="modulo-regulaciones-ambientales"
      aria-labelledby="titulo-regulaciones-ambientales"
    >
      <header className="modulo-regulaciones-ambientales__encabezado">
        <p className="modulo-regulaciones-ambientales__contexto">Tendencias</p>
        <h1 id="titulo-regulaciones-ambientales" className="modulo-regulaciones-ambientales__titulo">
          {tendencia.etiqueta}
        </h1>
        <p className="modulo-regulaciones-ambientales__titulo-articulo">
          Colombia 2040: cuando el ambiente entra en la cuenta
        </p>
        <p className="modulo-regulaciones-ambientales__subtitulo-articulo">
          Prospectivas del fortalecimiento de la regulación ambiental para el bienestar integral
        </p>
        <p className="modulo-regulaciones-ambientales__entradilla">
          Fiscalidad, emisiones, residuos, biodiversidad y finanzas sostenibles como nuevas
          fronteras de la gestión institucional
        </p>
      </header>

      {/* Rejilla índice + artículo (tabla de contenido del cliente) */}
      <div className="articulo-con-indice">
        <TablaContenido articuloRef={articuloRef} />
        <article ref={articuloRef} className="modulo-regulaciones-ambientales__panel">
        <Cita>
          “La regulación ambiental del futuro no llegará como una sola ley; llegará como una red
          de costos, datos, límites y obligaciones.”
        </Cita>
        <P>
          Colombia entra a 2040 con una regulación ambiental que ya no se limita a perseguir el
          daño. El nuevo ciclo empieza antes: en el precio de los combustibles, en la forma de
          contratar, en la selección de materiales, en la localización de una obra y en la
          obligación de demostrar resultados. La frontera ambiental se desplaza hacia la operación
          cotidiana. Producir, construir, movilizarse, financiar y prestar servicios quedarán cada
          vez más expuestos a costos, límites y datos que antes permanecían fuera de la cuenta.
        </P>
        <P>
          El cambio no ocurrió de un solo golpe. La Ley 23 de 1973 y el Código Nacional de
          Recursos Naturales Renovables de 1974 abrieron la etapa de prevención y control; la
          Constitución de 1991 convirtió el ambiente sano en un derecho colectivo; la Ley 99 de
          1993 levantó la arquitectura institucional del SINA; y el Decreto 1076 de 2015 reunió un
          régimen que ya tenía varias décadas de acumulación. Más tarde llegaron la acción
          climática, la reducción de plásticos, la restauración, los pasivos ambientales y la
          transparencia financiera. La regulación dejó de vigilar únicamente chimeneas,
          vertimientos y licencias: empezó a entrar en decisiones de inversión, consumo, movilidad
          y uso del territorio (Asamblea Nacional Constituyente, 1991; Congreso de Colombia, 1973,
          1993; Presidencia de la República, 1974, 2015).
        </P>
        <P>
          Las normas y los datos cuentan la misma historia. Entre 1973 y 2026 se acumularon 84
          instrumentos internacionales, nacionales y territoriales, mientras las series oficiales
          registraron el avance del impuesto al carbono, las emisiones, los residuos, la
          deforestación y las finanzas sostenibles. El movimiento es común: asuntos que antes
          dependían de la voluntad institucional empiezan a convertirse en condiciones
          verificables.
        </P>
        <P>
          El efecto llegará mucho más allá de las oficinas jurídicas. Una regla sobre emisiones
          puede alterar la factura energética y la calidad del aire; una obligación sobre residuos
          puede reordenar hoteles, centros recreativos, servicios de alimentación y salud; una
          restricción sobre el suelo puede cambiar el destino de un proyecto; y un estándar ESG
          puede decidir qué inversión avanza y qué proveedor queda por fuera. En ese cruce, el
          ambiente deja de ser un capítulo separado y entra en la salud, el empleo, la seguridad
          económica, la habitabilidad y la resiliencia cotidiana.
        </P>
        <P>
          El horizonte ya está en movimiento. Carbono, emisiones, residuos, biodiversidad y
          transparencia ambiental avanzan hacia una agenda común que transformará costos,
          infraestructura y servicios.
        </P>
        <P>
          Cinco presiones concentran el cambio que se aproxima. No avanzan en carriles separados:
          el precio al carbono empuja la eficiencia; el control de emisiones alcanza la
          infraestructura; la circularidad modifica compras y servicios; la biodiversidad impone
          condiciones territoriales; y la divulgación ESG convierte el desempeño ambiental en
          información exigible. La <strong>Tabla 1</strong> reúne ese entramado y muestra dónde la
          regulación puede tocar con mayor fuerza la gestión del bienestar integral.
        </P>

        <div className="modulo-regulaciones-ambientales__tabla-bloque">
          <p className="modulo-regulaciones-ambientales__figura-rotulo">
            <strong>Tabla 1.</strong> Elementos clave para la vigilancia prospectiva del
            fortalecimiento regulatorio ambiental
          </p>
          <div
            className="modulo-regulaciones-ambientales__tabla-envoltura"
            tabIndex={0}
            role="region"
            aria-label="Tabla 1: elementos clave para la vigilancia prospectiva"
          >
            <table className="modulo-regulaciones-ambientales__tabla">
              <thead>
                <tr>
                  <th scope="col">Elemento estratégico</th>
                  <th scope="col">Indicadores históricos sugeridos</th>
                  <th scope="col">Señal prospectiva hacia 2040</th>
                  <th scope="col">Relación con el bienestar integral</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Precio al carbono e impuestos ambientales</th>
                  <td>Tarifas del impuesto al carbono, combustibles gravados y límites a la no causación.</td>
                  <td>Aumento de la señal de precio y ampliación de costos asociados a emisiones.</td>
                  <td>
                    Eficiencia energética, movilidad, costos operativos e inversión en
                    infraestructura baja en carbono.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Regulación y control de emisiones de GEI</th>
                  <td>Emisiones totales, netas y sectoriales; absorciones e intensidad climática.</td>
                  <td>
                    Mayor exigencia de medición, reducción, trazabilidad y gestión de riesgos de
                    transición.
                  </td>
                  <td>
                    Calidad del aire, salud, edificaciones, energía, proveedores y movilidad
                    institucional.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Economía circular y gestión de residuos</th>
                  <td>
                    Emisiones asociadas a desechos, saneamiento, alojamiento, alimentación, salud
                    y recreación.
                  </td>
                  <td>
                    Más obligaciones de separación, valorización, compras sostenibles y
                    responsabilidad posconsumo.
                  </td>
                  <td>
                    Servicios más limpios, reducción de riesgos sanitarios y nuevas competencias y
                    empleos verdes.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Biodiversidad, uso del suelo y soluciones basadas en la naturaleza</th>
                  <td>Deforestación, superficie de bosque, participación territorial y restauración.</td>
                  <td>
                    Restricciones más finas sobre localización, intervención, compensación y
                    restauración ecológica.
                  </td>
                  <td>Agua, turismo, recreación, resiliencia territorial y acceso a entornos saludables.</td>
                </tr>
                <tr>
                  <th scope="row">Divulgación ESG y finanzas sostenibles</th>
                  <td>
                    Marcos de revelación, Taxonomía Verde, objetivos ambientales, bonos
                    sostenibles y SARAS.
                  </td>
                  <td>
                    La sostenibilidad deberá demostrarse mediante información comparable,
                    verificable y trazable.
                  </td>
                  <td>
                    Gobernanza, reputación, acceso a financiación, selección de inversiones y
                    gestión preventiva del riesgo.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="modulo-regulaciones-ambientales__figura-nota">
            <strong>Nota.</strong> Síntesis de cinco frentes construida con series oficiales. Los
            horizontes futuros son escenarios de referencia.
          </p>
        </div>

        <H3>La norma dejó de mirar solo el daño</H3>
        <P>
          La primera regulación ambiental colombiana habló de contaminación, recursos naturales y
          autoridad. Después llegaron las instituciones, los procedimientos y las licencias. Ahora
          el lenguaje cambia otra vez: metas climáticas, responsabilidad del productor,
          restauración, movilidad sostenible, financiamiento verde y trazabilidad. Cada nueva capa
          conserva la anterior, pero desplaza el centro de gravedad hacia preguntas más incómodas:
          quién mide, quién reporta, quién compensa y quién paga la transición.
        </P>
        <P>
          Ese desplazamiento aparece condensado en la <strong>Figura 1</strong>. La línea parte de
          la prevención de la contaminación y termina en un escenario donde la planeación
          territorial, la descarbonización, los plásticos de un solo uso y la resiliencia
          climática comparten el mismo tablero. Entre 2021 y 2026, la agenda se ensancha con
          pasivos ambientales, compensaciones bióticas, agua, ciudades verdes y desplazamiento por
          causas climáticas. El horizonte 2040 no empieza desde cero; empieza sobre una estructura
          que ya aprendió a intervenir más actividades y a exigir más evidencia.
        </P>
        <Figura
          numero="1"
          titulo="Evolución del marco regulatorio ambiental en Colombia, 1973–2026"
          imagen={figura01}
          alt="Línea de tiempo de los hitos del marco regulatorio ambiental colombiano entre 1973 y 2026"
          nota="Selección de hitos vigentes que orientan el horizonte 2040. Fuente: elaboración propia con base en instrumentos oficiales compilados en el normograma PESTEL, con corte al 22 de julio de 2026."
        />
        <P>
          El endurecimiento no siempre llega con una multa más alta. A veces aparece cuando una
          obligación gana detalle, cuando un sector entra por primera vez en el radar o cuando un
          dato voluntario se vuelve requisito. El Decreto 1076 de 2015 consolidó un régimen
          disperso; la Ley 1931 de 2018 llevó el cambio climático a la planeación; y la Ley 2169
          de 2021 trasladó la descarbonización desde la declaración política hacia metas y
          responsabilidades institucionales (Congreso de Colombia, 2018, 2021; Presidencia de la
          República, 2015).
        </P>
        <P>
          La etapa 2023–2026 añade una señal distinta. La agenda empieza a seguir daños acumulados
          y vulnerabilidades sociales: pasivos ambientales, humedales, compensaciones, gobernanza
          del agua y desplazamiento climático. El foco ya no está únicamente en el recurso natural
          aislado, sino en la cadena de consecuencias que alcanza territorios, comunidades,
          infraestructura y condiciones de vida.
        </P>

        <H3>Del acuerdo global al territorio cotidiano</H3>
        <P>
          La presión viaja por capas. Los acuerdos internacionales elevan la ambición; la
          legislación nacional la convierte en reglas concretas; y los gobiernos territoriales la
          acercan al aire, la movilidad, el turismo, la restauración y el riesgo. Así se forma una
          red que termina tocando la operación diaria.
        </P>
        <P>
          La <strong>Figura 2</strong> lleva esa red al terreno del bienestar. Salud, ambiente
          sano, desarrollo económico sostenible y equidad intergeneracional aparecen conectados
          con hitos que marcaron la política ambiental del país. Detrás del mapa hay una realidad
          concreta: la regulación termina materializándose en aire respirable, agua disponible,
          seguridad frente a desastres, protección de ecosistemas y nuevas condiciones para
          producir y habitar el territorio.
        </P>
        <Figura
          numero="2"
          titulo="Hitos normativos e impacto en el bienestar integral"
          imagen={figura02}
          alt="Mapa que conecta hitos normativos ambientales con sus impactos en salud, ambiente sano, desarrollo sostenible y equidad intergeneracional"
          nota="Síntesis nacional de hitos e impactos sobre el bienestar; el mapa no compara el cumplimiento departamental. Fuente: elaboración propia con base en IDEAM, Ministerio de Ambiente, Secretaría Jurídica de la Presidencia y DANE."
        />
        <P>
          En Antioquia y el Valle de Aburrá esa transición ya tiene expresión propia. Educación
          ambiental, movilidad sostenible, gestión del riesgo, cambio climático, recuperación de
          suelos, eficiencia energética, turismo sostenible y calidad del aire forman una capa
          territorial que se acerca a los lugares donde se prestan servicios, se movilizan
          familias, se construye infraestructura y se concentra la exposición ambiental.
        </P>
        <P>
          La <strong>Figura 3</strong> retrata esa arquitectura. Nueve instrumentos
          internacionales orientan la dirección; 59 normas nacionales sostienen el núcleo del
          sistema; y 16 disposiciones territoriales once de Antioquia y cinco del Valle de Aburrá
          acercan la regulación al suelo donde ocurre la operación. El peso nacional sigue siendo
          dominante, pero la capa regional ya tiene densidad suficiente para modificar decisiones
          cotidianas.
        </P>
        <Figura
          numero="3"
          titulo="Arquitectura territorial de las regulaciones ambientales vigentes"
          imagen={figura03}
          alt="Diagrama de la arquitectura territorial de las 84 regulaciones ambientales vigentes por nivel internacional, nacional y territorial"
          nota="La intensidad visual indica presencia normativa, no cumplimiento. Se incluyen 84 instrumentos: nueve internacionales, 59 nacionales y 16 territoriales. Fuente: elaboración propia con base en el normograma PESTEL de regulaciones ambientales vigentes, 2026."
        />
        <P>
          Por eso, anticipar la regulación exige mirar más allá del Congreso. Un acuerdo
          internacional puede elevar la meta climática; una autoridad nacional puede convertirla
          en precio, reporte o estándar; y un gobierno territorial puede añadir restricciones
          sobre movilidad, construcción, uso del suelo o calidad del aire. La presión final nace
          de esa combinación.
        </P>

        <H3>Cinco frentes donde la regulación empieza a apretar</H3>
        <P>
          Seguir norma por norma puede ocultar el movimiento de fondo. La <strong>Figura 4</strong>{' '}
          reúne cinco fuerzas que ya empiezan a empujarse entre sí: fiscalidad ambiental, control
          de emisiones, economía circular, biodiversidad y divulgación ESG. El carbono entra en la
          factura; la huella llega a la infraestructura; los residuos alcanzan la compra; el
          territorio condiciona la expansión; y la sostenibilidad se convierte en información
          financiera.
        </P>
        <Figura
          numero="4"
          titulo="Cinco elementos estratégicos del fortalecimiento regulatorio ambiental"
          imagen={figura04}
          alt="Síntesis de los cinco elementos estratégicos del fortalecimiento regulatorio ambiental y sus fuentes oficiales"
          nota="Síntesis de los cinco frentes y de sus fuentes oficiales para el seguimiento prospectivo. Fuente: elaboración propia con base en DIAN, IDEAM, DANE, Ministerio de Ambiente, Parques Nacionales, Ministerio de Hacienda, OCDE y Superintendencia Financiera de Colombia."
        />
        <P>
          La exigencia crece cuando esas piezas operan al mismo tiempo. Una tarifa ambiental
          vuelve atractiva la eficiencia; un reporte revela riesgos antes invisibles; una regla de
          residuos cambia especificaciones de compra; y una compensación ecológica modifica el
          diseño de una obra. La regulación futura no se reconocerá por una norma aislada, sino
          por la forma en que varias obligaciones empiezan a cerrar el margen de improvisación.
        </P>
        <P>
          La <strong>Figura 5</strong> localiza los momentos de mayor aceleración. Entre 2015 y
          2019 se concentra la expansión regulatoria sobre emisiones y descarbonización; entre
          2023 y 2026 ganan espacio la biodiversidad, el suelo y la gobernanza transversal. La
          fiscalidad ambiental aparece con menos instrumentos, pero su peso es desproporcionado:
          convierte la contaminación en una señal de precio capaz de entrar de inmediato en los
          presupuestos.
        </P>
        <Figura
          numero="5"
          titulo="Concentración histórica de instrumentos por eje regulatorio, 1973–2026"
          imagen={figura05}
          alt="Mapa de calor con el número de instrumentos regulatorios por eje y periodo entre 1973 y 2026"
          nota="Las celdas cuentan instrumentos por periodo; no miden severidad ni impacto. Fuente: elaboración propia con base en el normograma PESTEL de regulaciones ambientales vigentes, 2026."
        />
        <P>
          El periodo 2015–2019 estuvo marcado por el Acuerdo de París, SISCLIMA, la Ley 1931, los
          sistemas de monitoreo y la política de crecimiento verde. El ciclo 2023–2026 amplía el
          foco hacia pasivos ambientales, humedales, ciudades verdes, compensaciones y agua. La
          próxima etapa se perfila como una mezcla de descarbonización, adaptación territorial y
          restauración ecológica.
        </P>

        <H3>El carbono entra en la factura</H3>
        <Cita>
          “Cuando emitir tiene precio, la eficiencia deja de ser un discurso y empieza a entrar en
          la contabilidad.”
        </Cita>
        <P>
          La fiscalidad ambiental rompe una vieja comodidad: contaminar deja de ser un costo
          difuso. La tarifa del impuesto nacional al carbono pasó de 15.000 pesos por tonelada de
          CO₂ equivalente en 2016 a 29.070,49 pesos en 2026. Gasolina, ACPM y gas natural
          siguieron la misma dirección, mientras el carbón entró al esquema con una gradualidad
          que alcanza 50 % de la tarifa plena en 2026 y 100 % desde 2028 (Dirección de Impuestos y
          Aduanas Nacionales [DIAN], 2026).
        </P>
        <P>
          La señal no termina en el recaudo. Cuando el carbono tiene precio, cambian las
          comparaciones entre combustibles, equipos, proveedores y proyectos. Transporte,
          climatización, generación térmica, mantenimiento y logística empiezan a compartir una
          misma presión. La eficiencia energética deja de ser únicamente una promesa ambiental y
          gana peso dentro de la decisión financiera.
        </P>
        <P>
          En la <strong>Figura 6</strong>, la curva se acerca a 49.709,80 pesos por tonelada en
          2040 y a 65.044,95 pesos en 2050. La imagen deja una advertencia presupuestal: si la
          trayectoria continúa, la dependencia de combustibles fósiles ocupará una porción cada
          vez más visible de los costos operativos.
        </P>
        <Figura
          numero="6"
          titulo="Fiscalidad ambiental y trayectoria del precio al carbono, 2016–2050"
          imagen={figura06}
          alt="Curva de la tarifa del impuesto nacional al carbono entre 2016 y 2050, con el tramo futuro como prolongación de tendencia"
          nota="El tramo observado reúne tarifas oficiales; el tramo futuro prolonga la tendencia histórica y no corresponde a tarifas decretadas. Fuente: DIAN, compilación del Impuesto Nacional al Carbono."
        />
        <P>
          Esa presión puede acelerar tres movimientos: consumir menos, sustituir tecnología y
          compensar emisiones. Sin embargo, la regulación reciente ya cerró parte del atajo. La no
          causación por certificación de carbono neutralidad quedó limitada al 50 % del impuesto
          causado, una señal de que compensar no reemplazará por completo la reducción en la
          fuente.
        </P>
        <P>
          Para el bienestar integral, la fiscalidad abre una tensión. Puede encarecer movilidad y
          servicios, pero también acelerar aire más limpio, menor exposición a combustibles y
          renovación de infraestructura. El resultado dependerá de quién absorba el costo y de si
          el cumplimiento se convierte en eficiencia, salud ambiental y resiliencia.
        </P>

        <H3>La huella deja de ser un dato invisible</H3>
        <P>
          La contabilidad climática pasó años lejos de la operación cotidiana. Ese margen se
          reduce. Inventarios, sistemas de medición, reporte y verificación, metas climáticas y
          estándares de divulgación acercan las emisiones a la energía, la movilidad, las
          edificaciones y las cadenas de suministro. Ya no bastará con conocer la huella; la
          presión estará en demostrar cómo se reduce y quién responde por ella.
        </P>
        <P>
          Las cifras nacionales mantienen abierta esa presión. Las emisiones totales pasaron de
          228.410,59 Gg de CO₂ equivalente en 1990 a 302.934,03 Gg en 2021; las netas avanzaron
          de 222.664,78 a 280.101,98 Gg. El sector energía aportó 91.610,55 Gg en 2021, suficiente
          para mantener bajo observación combustibles, transporte, generación y eficiencia
          (Instituto de Hidrología, Meteorología y Estudios Ambientales.
        </P>
        <P>
          En la <strong>Figura 7</strong>, la curva mantiene el ascenso hasta 2040 y 2050. La
          imagen expone la distancia que podría abrirse entre la tendencia de las emisiones y los
          compromisos climáticos. Cuanto mayor sea esa brecha, mayor será la presión para
          intervenir energía, movilidad, infraestructura y proveedores.
        </P>
        <Figura
          numero="7"
          titulo="Trayectoria de emisiones nacionales de gases de efecto invernadero, 1990–2050"
          imagen={figura07}
          alt="Curvas de las emisiones nacionales de gases de efecto invernadero totales, netas y del sector energía entre 1990 y 2050"
          nota="El tramo histórico proviene del Inventario Nacional de GEI; el tramo futuro prolonga la tendencia observada y no sustituye las metas climáticas oficiales."
        />
        <P>
          La brecha entre tendencia y meta suele convertirse en regulación. Allí aparecen
          estándares energéticos, construcción sostenible, compras con criterios de huella,
          movilidad de bajas emisiones y nuevas condiciones para los proveedores. Pueden llegar
          por impuestos, licencias, contratos o decisiones territoriales, pero todas terminan
          encontrándose en la operación.
        </P>
        <P>
          El bienestar queda atravesado por esa disputa. Reducir emisiones puede mejorar el aire y
          la salud, pero exige inversión y nuevas capacidades laborales. Adaptarse protege
          infraestructura y continuidad de servicios; descarbonizar cambia empleos, oficios y
          cadenas de valor. La discusión no será únicamente cuánto reducir, sino cómo repartir el
          costo social de hacerlo.
        </P>

        <H3>La regulación se convierte en un sistema de fuerzas</H3>
        <P>
          El futuro ambiental no avanzará por una sola vía. Fiscalidad, emisiones, economía
          circular, biodiversidad, recursos naturales, gobernanza y resiliencia empiezan a actuar
          como partes de un mismo sistema. Cada frente empuja decisiones distintas, pero todos
          convergen sobre una pregunta común: cuánto deberá transformarse la operación para
          sostener servicios, territorio y bienestar en un entorno regulatorio más exigente.
        </P>
        <P>
          Los próximos años pueden abrir trayectorias regulatorias distintas. Algunas combinarán
          mayor control con adaptación gradual; otras elevarán con rapidez los costos, los
          estándares y las obligaciones de reporte. La diferencia estará en la capacidad de
          anticipar la transición antes de que la exigencia llegue convertida en sanción, pérdida
          de competitividad o presión sobre los servicios.
        </P>
        <P>
          La secuencia temporal sitúa tres movimientos que ya están en marcha: el carbono entra de
          forma progresiva en los costos, la biodiversidad gana protección territorial y las
          finanzas sostenibles amplían su influencia sobre inversiones y proveedores. Hacia 2040 y
          2050, esos movimientos podrían converger en una economía baja en carbono, una protección
          ecológica más amplia y una circularidad con mayor presencia institucional.
        </P>

        <H3>Los residuos de los servicios salen del cuarto de atrás</H3>
        <P>
          En los servicios, la economía circular ya no termina en el contenedor. Las reglas sobre
          envases, plásticos, residuos de construcción, aparatos eléctricos y sustancias químicas
          empiezan mucho antes: en la compra, el diseño del servicio, la selección del proveedor y
          la forma de disponer cada material. Alojamiento, alimentación, salud, recreación y
          mantenimiento quedan dentro de esa cadena.
        </P>
        <P>
          La Cuenta de Economía Circular deja una señal directa sobre los servicios. En 2021, las
          actividades de desechos registraron 114,41 Gg de CO₂ equivalente; el saneamiento, 9,93
          Gg; y el alojamiento, 184,99 Gg. No son tasas de reciclaje: son huellas asociadas a
          actividades que concentran materiales, agua, energía, alimentos y disposición final.
          Allí es donde el fortalecimiento regulatorio puede introducir trazabilidad, prevención,
          compras sostenibles y reducción de residuos (Departamento Administrativo Nacional de
          Estadística [DANE], s. f.).
        </P>
        <P>
          En la <strong>Figura 8</strong>, el alojamiento conserva la huella más alta y alcanza
          423,48 Gg hacia 2040; los desechos llegan a 319,70 Gg y el saneamiento a 19,17 Gg. La
          escena es clara: si los servicios crecen sin cambiar materiales, tecnología y operación,
          también crecerá la presión para intervenir compras, proveedores y disposición final.
        </P>
        <Figura
          numero="8"
          titulo="Economía circular y gestión de residuos en actividades de servicios, 2017–2050"
          imagen={figura08}
          alt="Curvas de emisiones asociadas a desechos, saneamiento y alojamiento entre 2017 y 2050"
          nota="La figura presenta emisiones asociadas a desechos, saneamiento y alojamiento, no tasas de reciclaje. El tramo futuro ofrece una referencia de tendencia."
        />
        <P>
          El alojamiento concentra la señal más fuerte. Agua, energía, alimentos, lavandería, aseo
          y residuos convergen en una misma actividad. El fortalecimiento regulatorio puede
          recorrer toda esa cadena mediante restricciones sobre productos, metas de
          aprovechamiento, separación en la fuente, compras sostenibles y reportes de desempeño.
          El efecto alcanzaría costos, experiencia del usuario, diseño del servicio y formación
          del personal.
        </P>
        <P>
          La <strong>Figura 9</strong> deja la idea central: la regulación no empieza cuando el
          residuo llega al contenedor. Empieza al sustituir materiales, prolongar la vida útil de
          los equipos y exigir a los proveedores información sobre composición, recuperación y
          disposición.
        </P>
        <Figura
          numero="9"
          titulo="Actividades asociadas a residuos y servicios: señal prospectiva de presión regulatoria"
          imagen={figura09}
          alt="Gráfica de emisiones vinculadas con desechos, saneamiento y alojamiento con la zona del horizonte futuro sombreada"
          nota="Emisiones vinculadas con desechos, saneamiento y alojamiento; la zona sombreada señala el horizonte futuro. Fuente: DANE, Cuenta de Economía Circular."
        />
        <P>
          El bienestar recibe el impacto por dos vías. Una gestión más limpia reduce riesgos
          sanitarios, contaminación local y presión sobre rellenos; al mismo tiempo, abre espacio
          para empleos verdes, mantenimiento especializado, medición de huella, diseño circular y
          educación ambiental. La regulación de residuos puede convertirse en política de salud y
          trabajo, siempre que la transición no descargue el costo sobre el último eslabón.
        </P>

        <H3>El territorio deja de ser telón de fondo</H3>
        <P>
          Bosques, humedales, páramos y suelos ya no son un escenario pasivo. Las reglas sobre
          reservas, compensaciones y restauración convierten el territorio en una condición de
          entrada: importa dónde cabe una actividad, pero también qué ecosistemas altera y qué
          deberá reparar.
        </P>
        <P>
          La deforestación nacional cayó de 219.973 hectáreas en 2017 a 79.256 en 2023, pero
          repuntó a 113.608 en 2024. Antioquia registró 7.197 hectáreas y 6,33 % del total
          nacional. La caída, por tanto, no dibuja una ruta segura: la presión puede reaparecer y
          desplazarse entre territorios.
        </P>
        <P>
          En la <strong>Figura 10</strong>, la curva llega a cero después de 2035. No anuncia el
          fin de la deforestación; recuerda que una serie irregular no puede leerse como caída
          automática. La atención seguirá en las alertas territoriales, las coberturas y la
          restauración.
        </P>
        <Figura
          numero="10"
          titulo="Deforestación anual y señales territoriales en Colombia y Antioquia"
          imagen={figura10}
          alt="Curvas de la deforestación anual en Colombia y Antioquia con el tramo futuro llegando a un piso de cero"
          nota="La curva futura alcanza un piso de cero, pero no representa una meta ni la desaparición de la deforestación. Fuente: IDEAM, monitoreo de bosque y deforestación."
        />
        <P>
          En Antioquia, biodiversidad y uso del suelo ya se cruzan con turismo, recreación,
          movilidad e infraestructura. Las políticas de Turismo Sostenible y Crecimiento Verde
          2023–2040 anticipan proyectos con más preguntas sobre agua, conectividad ecológica,
          restauración y resiliencia climática (Asamblea Departamental de Antioquia, 2023a,
          2023b).
        </P>
        <P>
          Esa geografía también sostiene el bienestar. Los bosques regulan agua y temperatura,
          reducen riesgos y respaldan actividades recreativas. Protegerlos significa intervenir
          salud, seguridad y habitabilidad, no solo conservar flora y fauna.
        </P>

        <H3>La sostenibilidad entra al balance</H3>
        <P>
          Desde 2021, la sostenibilidad empezó a pesar más en las decisiones financieras. La
          revelación climática, la Taxonomía Verde y la gestión de riesgos ambientales permiten
          diferenciar proyectos, inversiones y proveedores (Superintendencia Financiera de
          Colombia, 2021, 2022, 2026).
        </P>
        <P>
          La Taxonomía Verde cubre siete objetivos ambientales y diez sectores. Su fuerza está en
          separar lo sostenible de lo que solo se presenta como tal, una distinción que puede
          inclinar créditos, bonos e inversiones. La <strong>Figura 11</strong> muestra la
          dirección del cambio: más transparencia climática, mayor clasificación verde y más peso
          de los datos ambientales en las decisiones financieras.
        </P>
        <Figura
          numero="11"
          titulo="Evolución del marco de divulgación ESG y finanzas sostenibles"
          imagen={figura11}
          alt="Línea de tiempo de la vigencia y acumulación de los marcos de divulgación ESG y finanzas sostenibles"
          nota="La figura registra la vigencia y acumulación de marcos ambientales; el tramo futuro expresa continuidad regulatoria, no una agenda oficial. Fuente: Superintendencia Financiera de Colombia."
        />
        <P>
          Para las organizaciones no financieras, la exigencia puede llegar por la puerta de
          bancos, aseguradores, contratantes o grandes proveedores. Emisiones, agua, residuos,
          biodiversidad y planes de transición empezarán a formar parte de solicitudes de
          información y procesos de evaluación. La trazabilidad dejará de ser un archivo de
          soporte y se convertirá en una condición de relacionamiento.
        </P>
        <P>
          La gobernanza conecta esta exigencia con el bienestar. La información ambiental puede
          anticipar riesgos sobre infraestructura, continuidad de servicios y comunidades; también
          puede evitar que recursos presentados como verdes lleguen a actividades sin resultados
          suficientes. El reporte deja de ser vitrina y se convierte en una forma de administrar
          el riesgo.
        </P>

        <H3>La presión climática no cede</H3>
        <P>
          Las emisiones siguen marcando el pulso del fortalecimiento regulatorio. Cuando la
          trayectoria histórica se mantiene alta, la respuesta institucional suele llegar por la
          vía de estándares energéticos, reportes obligatorios, movilidad baja en carbono y
          exigencias sobre edificaciones, proveedores y cadenas de suministro. La presión no nace
          de una consigna abstracta: nace de la distancia persistente entre lo que emite la
          economía y lo que prometen las metas climáticas. Esta escena vuelve más visible esa
          tensión. Las emisiones totales, las netas y las del sector energía avanzan como
          recordatorio de que la política climática todavía tiene un amplio margen para traducirse
          en controles más precisos sobre consumo de energía, combustibles e infraestructura (
          <strong>Figura 12</strong>).
        </P>
        <Figura
          numero="12"
          titulo="Emisiones de GEI: tendencia histórica y escenario exploratorio de presión regulatoria"
          imagen={figura12}
          alt="Gráfica de las emisiones de gases de efecto invernadero observadas junto con un escenario exploratorio de continuidad"
          nota="La figura integra datos observados de emisiones totales, netas y del sector energía, junto con un escenario exploratorio de continuidad de tendencia. Fuente: IDEAM, Inventario Nacional de Emisiones y Absorciones de GEI."
        />

        <H3>La caída de la deforestación no cierra la discusión</H3>
        <P>
          La reducción reciente de la deforestación mejora la foto, pero no elimina la
          inestabilidad del fondo. La serie nacional sigue mostrando repuntes, desplazamientos
          territoriales y una sensibilidad alta frente al control institucional, la presión
          económica y la ocupación del suelo. Antioquia, aunque hoy representa una fracción menor
          del total nacional, continúa siendo un territorio decisivo para anticipar restricciones
          sobre restauración, compensaciones, turismo, infraestructura y uso del suelo.
        </P>
        <P>
          La <strong>Figura 13</strong> resume esa paradoja. El descenso reciente convive con una
          volatilidad suficiente para mantener abierta la intervención pública sobre bosques,
          agua, biodiversidad y ordenamiento territorial.
        </P>
        <Figura
          numero="13"
          titulo="Deforestación en Colombia y Antioquia: reducción reciente y persistencia de alta volatilidad"
          imagen={figura13}
          alt="Gráfica de la deforestación en Colombia y Antioquia con índice base 2020 igual a 100 y su variación reciente"
          nota="La figura presenta datos observados con índice base 2020=100 y resalta la variación reciente en Colombia y Antioquia. Fuente: IDEAM, monitoreo de bosque y deforestación."
        />

        <H3>La sostenibilidad gana espesor financiero</H3>
        <P>
          La agenda ESG dejó de ser un lenguaje periférico. La divulgación ambiental, la Taxonomía
          Verde, la arquitectura institucional de finanzas sostenibles y la ampliación de
          instrumentos de reporte dibujan un marco que ya no se limita a las entidades
          financieras. Ese movimiento puede trasladarse con rapidez a contratistas, proveedores,
          aseguradores, operadores de infraestructura y organizaciones que dependen de crédito o
          reputación para sostener sus proyectos.
        </P>
        <P>
          Esta secuencia muestra cómo la transparencia ambiental gana continuidad y amplitud
          sectorial. Lo decisivo no es solo la fecha de arranque, sino la permanencia del marco
          hasta 2050 y su capacidad para volver rutinarias preguntas que antes parecían
          excepcionales: qué se emite, cómo se mitiga y qué tan verde es una inversión (
          <strong>Figura 14</strong>).
        </P>
        <Figura
          numero="14"
          titulo="Evolución del marco ESG y de finanzas sostenibles"
          imagen={figura14}
          alt="Línea de tiempo de la vigencia y continuidad de los instrumentos de divulgación ESG, Taxonomía Verde y finanzas sostenibles"
          nota="La figura registra la vigencia y continuidad de instrumentos de divulgación ESG, Taxonomía Verde y finanzas sostenibles. Fuente: Superintendencia Financiera de Colombia y Ministerio de Hacienda y Crédito Público."
        />

        <H3>El bienestar recibe el cambio por varios canales al mismo tiempo</H3>
        <P>
          El fortalecimiento regulatorio no impacta el bienestar de manera lineal. Primero
          modifica costos, tecnologías, compras, edificios, movilidad, residuos, restauración o
          sistemas de reporte. Luego esos cambios se trasladan a la calidad del aire, la salud, el
          empleo verde, la confianza institucional, la sostenibilidad financiera y la seguridad de
          los territorios. El resultado es una noción de bienestar cada vez más ligada a la
          capacidad de adaptarse sin perder calidad en los servicios.
        </P>
        <P>
          Para Antioquia, esa cadena de efectos atraviesa las decisiones cotidianas. La eficiencia
          energética protege presupuestos, la circularidad reorganiza proveedores, la restauración
          territorial incide sobre recreación y turismo, y la gobernanza ambiental fortalece la
          continuidad de la operación. El ambiente deja de ser un asunto de soporte para
          convertirse en una dimensión activa del bienestar integral. La síntesis conceptual
          cierra este recorrido con una idea central: cada frente regulatorio activa
          transformaciones operativas que terminan tocando el bienestar económico, físico, social,
          ambiental e institucional.
        </P>

        <h3 className="modulo-regulaciones-ambientales__seccion-referencias">Referencias</h3>
        <ul className="modulo-regulaciones-ambientales__referencias">
          <Ref>
            Circular Externa 031. (2021). Circular Externa 031 de 2021: Revelación de asuntos
            sociales, ambientales y climáticos. Retrieved from{' '}
            <Enlace url="https://www.superfinanciera.gov.co/publicaciones/10104699/industrias-supervisadasfinanzas-sosteniblesdocumentos-tecnicos-y-normativa-10104699/" />
          </Ref>
          <Ref>
            Constitución Política de Colombia. (1991). Constitución Política de Colombia.
            Retrieved from <Enlace url="https://www.secretariasenado.gov.co/constitucion-politica" />
          </Ref>
          <Ref>
            Decreto 1076. (2015). Decreto 1076 de 2015: Decreto Único Reglamentario del Sector
            Ambiente. Retrieved from{' '}
            <Enlace url="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=78153" />
          </Ref>
          <Ref>
            Decreto-Ley 2811. (1974). Decreto-Ley 2811 de 1974: Código Nacional de Recursos
            Naturales Renovables. Retrieved from{' '}
            <Enlace url="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=1551" />
          </Ref>
          <Ref>
            Departamento Administrativo Nacional de Estadística. (2026). Cuenta de Economía
            Circular. Retrieved from{' '}
            <Enlace url="https://www.dane.gov.co/index.php/estadisticas-por-tema/ambientales/economia-circular" />
          </Ref>
          <Ref>
            Dirección de Impuestos y Aduanas Nacionales. (2026). Compilación del Impuesto Nacional
            al Carbono. Retrieved from{' '}
            <Enlace url="https://normograma.dian.gov.co/dian/compilacion/tnt_impuesto_nacional_carbono.html" />
          </Ref>
          <Ref>
            Instituto de Hidrología, Meteorología y Estudios Ambientales. (2026). Informe anual
            del monitoreo de bosque y la deforestación. Retrieved from{' '}
            <Enlace url="https://www.ideam.gov.co/sala-de-prensa/informes/Informe%20anual%20del%20monitoreo%20de%20bosque%20y%20la%20deforestacion" />
          </Ref>
          <Ref>
            Instituto de Hidrología, Meteorología y Estudios Ambientales. (2026). Inventario
            Nacional de Gases de Efecto Invernadero. Retrieved from{' '}
            <Enlace url="https://www.ideam.gov.co/transparencia/datos-abiertos/seccion-de-datos-abiertos/inventario-nacional-gases-efecto-invernadero" />
          </Ref>
          <Ref>
            Ley 1931. (2018). Ley 1931 de 2018: Directrices para la gestión del cambio climático.
            Retrieved from{' '}
            <Enlace url="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=87765" />
          </Ref>
          <Ref>
            Ley 2169. (2021). Ley 2169 de 2021: Ley de Acción Climática. Retrieved from{' '}
            <Enlace url="https://www.secretariasenado.gov.co/senado/basedoc/ley_2169_2021.html" />
          </Ref>
          <Ref>
            Ley 2232. (2022). Ley 2232 de 2022: Reducción gradual de plásticos de un solo uso.
            Retrieved from{' '}
            <Enlace url="https://www.secretariasenado.gov.co/senado/basedoc/ley_2232_2022.html" />
          </Ref>
          <Ref>
            Ley 23. (1973). Ley 23 de 1973: Prevención y control de la contaminación. Retrieved
            from <Enlace url="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=9018" />
          </Ref>
          <Ref>
            Ley 99. (1993). Ley 99 de 1993: Organización del Sistema Nacional Ambiental. Retrieved
            from <Enlace url="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=297" />
          </Ref>
          <Ref>
            Ordenanza 02. (2023). Ordenanza 02 de 2023: Política Pública de Turismo Sostenible de
            Antioquia. Retrieved from{' '}
            <Enlace url="https://www.antioquia.gov.co/index.php/ordenanzas-2023" />
          </Ref>
          <Ref>
            Ordenanza 21. (2023). Ordenanza 21 de 2023: Política Pública de Crecimiento Verde de
            Antioquia 2023–2040. Retrieved from{' '}
            <Enlace url="https://www.antioquia.gov.co/index.php/ordenanzas-2023" />
          </Ref>
          <Ref>
            Superintendencia Financiera de Colombia. (2022). Taxonomía Verde de Colombia.
            Retrieved from{' '}
            <Enlace url="https://www.superfinanciera.gov.co/publicaciones/10111014/sala-de-prensacomunicados-de-prensa-comunicados-de-prensa-colombia-es-el-primer-pais-de-america-en-publicar-una-taxonomia-verde-10111014/" />
          </Ref>
          <Ref>
            Superintendencia Financiera de Colombia. (2026). Documentos técnicos y normativa de
            finanzas sostenibles y marco SARAS. Retrieved from{' '}
            <Enlace url="https://www.superfinanciera.gov.co/publicaciones/10104699/industrias-supervisadasfinanzas-sosteniblesdocumentos-tecnicos-y-normativa-10104699/" />
          </Ref>
        </ul>
        </article>
      </div>
    </section>
  );
}

export default ModuloRegulacionesAmbientales;
