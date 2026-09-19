/**
 * RuedaFactores — Rueda interactiva del modelo de factores de cambio.
 *
 * Gráfica SVG propia (sin librerías, como el mapa de Colombia) inspirada
 * en la rueda de megatendencias del observatorio del Ceplan: tres anillos
 * concéntricos que recorren la jerarquía del modelo — dimensiones en el
 * anillo interior, componentes estratégicos en la banda intermedia y
 * factores de cambio en el anillo exterior. El ancho angular de cada arco
 * es proporcional a su número de factores (22 porciones iguales).
 *
 * Decisiones de diseño y accesibilidad:
 *  - Cada arco es un botón de verdad (role="button", foco visible con
 *    trazo verde, Enter/Espacio). La rueda usa tabindex ITINERANTE, el
 *    mismo patrón de MapaColombia: una sola parada de tabulación y las
 *    flechas del teclado (más Inicio/Fin) recorren los 40 arcos — sin
 *    él, atravesar el módulo exigiría hasta 40 pulsaciones de Tab.
 *  - El centro de la rueda anuncia el elemento bajo el puntero o el foco
 *    y, en reposo, el elemento seleccionado; el detalle completo vive en
 *    el panel del módulo.
 *  - Al seleccionar, la familia del elemento (dimensión + componentes +
 *    factores relacionados) queda en color pleno y el resto se atenúa.
 *  - Colores: asignación de marca por dimensión VALIDADA por computación
 *    (pares adyacentes de la rueda con separación deután/protán ΔE ≥ 11 y
 *    contraste AA en todos los rótulos; el arco de la dimensión 4 se
 *    aclara mínimamente para AA con texto oscuro — ver rueda-factores.css).
 *  - Los rótulos del anillo exterior son radiales (patrón sunburst). La
 *    rueda solo se muestra en escritorio (≥1100 px): en pantallas
 *    angostas el módulo la oculta y presenta el modelo como acordeón
 *    (ajuste del cliente: escalada deja de ser legible).
 *  - La rueda no lleva leyenda propia: la línea de migas de la selección
 *    ("Dimensión: … › Componente estratégico: … › Factor: …") la pone el
 *    módulo sobre la rejilla (ajuste del cliente, 2026-09-19).
 */
import { useMemo, useRef, useState } from 'react';
import {
  DIMENSIONES_FACTORES,
  NOMBRES_TIPO,
  TOTAL_COMPONENTES,
  TOTAL_FACTORES,
  resolverNodo,
} from '../../data/factores-cambio.js';
import './rueda-factores.css';

/* ── Geometría del lienzo (unidades del viewBox) ─────────────────── */
const TAMANO = 640;
const CENTRO = TAMANO / 2;
const RADIO_CENTRO = 96;      /* círculo central de anuncio */
const DIM_INT = 102;
const DIM_EXT = 174;          /* anillo de dimensiones */
const COMP_INT = 178;
const COMP_EXT = 206;         /* banda de componentes (sin rótulo) */
const FACT_INT = 210;
const FACT_EXT = 306;         /* anillo de factores */
const MARGEN_ROTULO = 5;      /* respiro radial de los rótulos de factor */
const ALTO_LINEA = 12;        /* interlineado de los rótulos radiales */
const MAX_CARACTERES_LINEA = 18;

const PORCION = 360 / TOTAL_FACTORES;
/* La dimensión 1 (3 factores) queda centrada en la parte superior. */
const ANGULO_INICIO = -1.5 * PORCION;

/* Punto en coordenadas de brújula: 0° arriba, sentido horario. */
const polar = (radio, angulo) => {
  const rad = (angulo * Math.PI) / 180;
  return [
    +(CENTRO + radio * Math.sin(rad)).toFixed(2),
    +(CENTRO - radio * Math.cos(rad)).toFixed(2),
  ];
};

/* Sector de anillo (dos arcos y dos radios) como trazo SVG. */
function trazoSector(radioInterior, radioExterior, a1, a2) {
  const arcoGrande = a2 - a1 > 180 ? 1 : 0;
  const [x1, y1] = polar(radioExterior, a1);
  const [x2, y2] = polar(radioExterior, a2);
  const [x3, y3] = polar(radioInterior, a2);
  const [x4, y4] = polar(radioInterior, a1);
  return (
    `M ${x1} ${y1} A ${radioExterior} ${radioExterior} 0 ${arcoGrande} 1 ${x2} ${y2} ` +
    `L ${x3} ${y3} A ${radioInterior} ${radioInterior} 0 ${arcoGrande} 0 ${x4} ${y4} Z`
  );
}

/* Arco guía para texto curvo. Invertido (antihorario) en la mitad
   inferior de la rueda, para que el rótulo no quede boca abajo. */
function trazoArcoTexto(radio, a1, a2, invertir) {
  const arcoGrande = a2 - a1 > 180 ? 1 : 0;
  const [xi, yi] = polar(radio, invertir ? a2 : a1);
  const [xf, yf] = polar(radio, invertir ? a1 : a2);
  return `M ${xi} ${yi} A ${radio} ${radio} 0 ${arcoGrande} ${invertir ? 0 : 1} ${xf} ${yf}`;
}

/* Parte un nombre en líneas cortas para el rótulo radial. */
function partirEnLineas(texto, maximo = MAX_CARACTERES_LINEA) {
  const lineas = [];
  let actual = '';
  for (const palabra of texto.split(' ')) {
    const candidata = actual ? `${actual} ${palabra}` : palabra;
    if (candidata.length <= maximo) {
      actual = candidata;
    } else {
      if (actual) lineas.push(actual);
      actual = palabra;
    }
  }
  if (actual) lineas.push(actual);
  return lineas;
}

const normalizarAngulo = (angulo) => ((angulo % 360) + 360) % 360;

/* Radios de las líneas base del rótulo curvo de dimensión. Con trazo
   normal (horario) las letras crecen hacia afuera de la línea base; con
   trazo invertido crecen hacia adentro — los radios lo compensan.
   Calibrados para MÁXIMO 2 líneas por etiqueta: una longitud mayor cae
   a la calibración de 2 (las líneas sobrantes reutilizan el último
   radio) en vez de tumbar el módulo al editar el catálogo. */
const RADIOS_ETIQUETA_DIMENSION = {
  normal: { 1: [134], 2: [150, 122] },
  invertido: { 1: [146], 2: [174, 146] },
};

/**
 * Distribuye la jerarquía completa sobre la rueda. La geometría es fija
 * (el catálogo es constante), así que se calcula una sola vez al cargar
 * el módulo.
 */
function construirGeometria() {
  const dimensiones = [];
  const componentes = [];
  const factores = [];
  let cursor = ANGULO_INICIO;

  for (const dimension of DIMENSIONES_FACTORES) {
    const factoresDeDimension = dimension.componentes.reduce(
      (suma, componente) => suma + componente.factores.length,
      0,
    );
    const inicioDimension = cursor;
    const finDimension = cursor + factoresDeDimension * PORCION;
    const mitad = normalizarAngulo((inicioDimension + finDimension) / 2);
    const invertir = mitad > 90 && mitad < 270;
    const tablaRadios = RADIOS_ETIQUETA_DIMENSION[invertir ? 'invertido' : 'normal'];
    const radiosLineas = tablaRadios[dimension.lineasEtiqueta.length] ?? tablaRadios[2];

    dimensiones.push({
      id: dimension.id,
      idDimension: dimension.id,
      trazo: trazoSector(DIM_INT, DIM_EXT, inicioDimension, finDimension),
      aria: `Dimensión ${dimension.nro} de ${DIMENSIONES_FACTORES.length}: ${dimension.nombre}`,
      lineas: dimension.lineasEtiqueta.map((texto, indice) => ({
        texto,
        idRuta: `rueda-fc-ruta-${dimension.id}-${indice}`,
        trazo: trazoArcoTexto(
          radiosLineas[Math.min(indice, radiosLineas.length - 1)],
          inicioDimension,
          finDimension,
          invertir,
        ),
      })),
    });

    for (const componente of dimension.componentes) {
      const finComponente = cursor + componente.factores.length * PORCION;
      componentes.push({
        id: componente.id,
        idDimension: dimension.id,
        trazo: trazoSector(COMP_INT, COMP_EXT, cursor, finComponente),
        aria:
          `Componente estratégico ${componente.nro} de ${TOTAL_COMPONENTES}: ` +
          `${componente.nombre}. Dimensión ${dimension.nombre}`,
      });

      for (const factor of componente.factores) {
        const finFactor = cursor + PORCION;
        const mitadFactor = normalizarAngulo((cursor + finFactor) / 2);
        /* Rótulo radial: en la mitad derecha ancla en el borde interior y
           corre hacia afuera; en la izquierda ancla en el exterior y corre
           hacia el centro, para leerse siempre de izquierda a derecha. */
        const enDerecha = mitadFactor < 180;
        const [x, y] = polar(
          enDerecha ? FACT_INT + MARGEN_ROTULO : FACT_EXT - MARGEN_ROTULO,
          mitadFactor,
        );
        const lineas = partirEnLineas(factor.nombre);
        factores.push({
          id: factor.id,
          idDimension: dimension.id,
          trazo: trazoSector(FACT_INT, FACT_EXT, cursor, finFactor),
          aria:
            `Factor de cambio ${factor.nro} de ${TOTAL_FACTORES}: ${factor.nombre}. ` +
            `Dimensión ${dimension.nombre}`,
          etiqueta: {
            x,
            y,
            rotacion: normalizarAngulo(enDerecha ? mitadFactor - 90 : mitadFactor + 90),
            lineas,
            /* Centra el bloque de líneas sobre el eje del arco. */
            desplazamientoInicial: 3.5 - ((lineas.length - 1) / 2) * ALTO_LINEA,
          },
        });
        cursor = finFactor;
      }
    }
  }

  return { dimensiones, componentes, factores };
}

const GEOMETRIA = construirGeometria();

/* Orden de recorrido con flechas (tabindex itinerante): dimensiones →
   componentes → factores, el mismo orden de pintado. */
const ORDEN_ARCOS = [
  ...GEOMETRIA.dimensiones.map((arco) => arco.id),
  ...GEOMETRIA.componentes.map((arco) => arco.id),
  ...GEOMETRIA.factores.map((arco) => arco.id),
];
const INDICE_ARCO = new Map(ORDEN_ARCOS.map((id, indice) => [id, indice]));

/* Ids del elemento seleccionado y toda su familia (ascendientes y
   descendientes): son los arcos que permanecen en color pleno. */
function familiaDe(seleccionId) {
  const entrada = resolverNodo(seleccionId);
  if (!entrada) return null;
  const ids = new Set([entrada.dimension.id]);
  if (entrada.tipo === 'dimension') {
    for (const componente of entrada.dimension.componentes) {
      ids.add(componente.id);
      for (const factor of componente.factores) ids.add(factor.id);
    }
  } else {
    ids.add(entrada.componente.id);
    if (entrada.tipo === 'componente') {
      for (const factor of entrada.componente.factores) ids.add(factor.id);
    } else {
      ids.add(entrada.nodo.id);
    }
  }
  return ids;
}

function RuedaFactores({ seleccionId, onSeleccionar }) {
  /* Elemento bajo el puntero o con foco de teclado (solo informativo). */
  const [resaltadoId, setResaltadoId] = useState(null);

  /* Tabindex itinerante: solo el arco "enfocable" tiene tabIndex 0; las
     flechas mueven el foco por ORDEN_ARCOS con recorrido circular. */
  const [indiceEnfocado, setIndiceEnfocado] = useState(0);
  const refsArcos = useRef(new Map());

  const moverFoco = (indice) => {
    const total = ORDEN_ARCOS.length;
    const destino = ((indice % total) + total) % total;
    setIndiceEnfocado(destino);
    refsArcos.current.get(ORDEN_ARCOS[destino])?.focus();
  };

  const familia = useMemo(() => familiaDe(seleccionId), [seleccionId]);

  /* El centro anuncia el elemento resaltado y, en reposo, el elegido. */
  const anunciado = resolverNodo(resaltadoId ?? seleccionId);

  const claseArco = (tipo, arco) => {
    let clases = `rueda-factores__arco rueda-factores__arco--${tipo} rueda-factores__arco--${arco.idDimension}`;
    if (seleccionId === arco.id) clases += ' rueda-factores__arco--activo';
    if (familia && !familia.has(arco.id)) clases += ' rueda-factores__arco--atenuado';
    return clases;
  };

  const propiedadesInteraccion = (arco) => {
    const indice = INDICE_ARCO.get(arco.id);
    return {
      role: 'button',
      tabIndex: indice === indiceEnfocado ? 0 : -1,
      ref: (elemento) => {
        if (elemento) refsArcos.current.set(arco.id, elemento);
        else refsArcos.current.delete(arco.id);
      },
      'aria-label': arco.aria,
      'aria-pressed': seleccionId === arco.id,
      onClick: () => onSeleccionar(arco.id),
      onKeyDown: (evento) => {
        if (evento.key === 'Enter' || evento.key === ' ') {
          evento.preventDefault();
          onSeleccionar(arco.id);
        } else if (evento.key === 'ArrowRight' || evento.key === 'ArrowDown') {
          evento.preventDefault();
          moverFoco(indice + 1);
        } else if (evento.key === 'ArrowLeft' || evento.key === 'ArrowUp') {
          evento.preventDefault();
          moverFoco(indice - 1);
        } else if (evento.key === 'Home') {
          evento.preventDefault();
          moverFoco(0);
        } else if (evento.key === 'End') {
          evento.preventDefault();
          moverFoco(ORDEN_ARCOS.length - 1);
        }
      },
      onMouseEnter: () => setResaltadoId(arco.id),
      onMouseLeave: () => setResaltadoId(null),
      onFocus: () => {
        setResaltadoId(arco.id);
        setIndiceEnfocado(indice);
      },
      onBlur: () => setResaltadoId(null),
    };
  };

  return (
    <div className="rueda-factores">
      <svg
        className="rueda-factores__svg"
        viewBox={`0 0 ${TAMANO} ${TAMANO}`}
        role="group"
        aria-label="Rueda interactiva del modelo de factores de cambio; use las flechas del teclado para recorrer sus elementos"
      >
        {/* ── Arcos (primero, para que los rótulos queden encima) ── */}
        <g>
          {GEOMETRIA.dimensiones.map((arco) => (
            <path
              key={arco.id}
              d={arco.trazo}
              className={claseArco('dimension', arco)}
              {...propiedadesInteraccion(arco)}
            />
          ))}
          {GEOMETRIA.componentes.map((arco) => (
            <path
              key={arco.id}
              d={arco.trazo}
              className={claseArco('componente', arco)}
              {...propiedadesInteraccion(arco)}
            />
          ))}
          {GEOMETRIA.factores.map((arco) => (
            <path
              key={arco.id}
              d={arco.trazo}
              className={claseArco('factor', arco)}
              {...propiedadesInteraccion(arco)}
            />
          ))}
        </g>

        {/* ── Rótulos curvos de las dimensiones ── */}
        <g aria-hidden="true" className="rueda-factores__rotulos">
          {GEOMETRIA.dimensiones.map((arco) =>
            arco.lineas.map((linea) => (
              <g key={linea.idRuta}>
                <path id={linea.idRuta} d={linea.trazo} fill="none" />
                <text
                  className={`rueda-factores__etiqueta-dimension rueda-factores__etiqueta-dimension--${arco.id}`}
                >
                  <textPath href={`#${linea.idRuta}`} startOffset="50%">
                    {linea.texto}
                  </textPath>
                </text>
              </g>
            )),
          )}

          {/* ── Rótulos radiales de los factores ── */}
          {GEOMETRIA.factores.map((arco) => (
            <text
              key={arco.id}
              x={arco.etiqueta.x}
              y={arco.etiqueta.y}
              transform={`rotate(${arco.etiqueta.rotacion} ${arco.etiqueta.x} ${arco.etiqueta.y})`}
              className={`rueda-factores__etiqueta-factor${
                seleccionId === arco.id ? ' rueda-factores__etiqueta-factor--activa' : ''
              }`}
            >
              {arco.etiqueta.lineas.map((linea, indice) => (
                <tspan
                  key={linea}
                  x={arco.etiqueta.x}
                  dy={indice === 0 ? arco.etiqueta.desplazamientoInicial : ALTO_LINEA}
                >
                  {linea}
                </tspan>
              ))}
            </text>
          ))}
        </g>

        {/* ── Centro: anuncio del elemento resaltado o seleccionado ── */}
        <circle
          className="rueda-factores__centro"
          cx={CENTRO}
          cy={CENTRO}
          r={RADIO_CENTRO}
          aria-hidden="true"
        />
        <foreignObject
          x={CENTRO - 68}
          y={CENTRO - 68}
          width="136"
          height="136"
          aria-hidden="true"
          className="rueda-factores__centro-marco"
        >
          {anunciado ? (
            <div className="rueda-factores__centro-contenido">
              <p className="rueda-factores__centro-tipo">{NOMBRES_TIPO[anunciado.tipo]}</p>
              <p className="rueda-factores__centro-nombre">{anunciado.nodo.nombre}</p>
            </div>
          ) : (
            <div className="rueda-factores__centro-contenido">
              <p className="rueda-factores__centro-nombre">Factores de cambio</p>
              <p className="rueda-factores__centro-cifras">
                {DIMENSIONES_FACTORES.length} dimensiones · {TOTAL_COMPONENTES} componentes ·{' '}
                {TOTAL_FACTORES} factores
              </p>
            </div>
          )}
        </foreignObject>
      </svg>
    </div>
  );
}

export default RuedaFactores;
