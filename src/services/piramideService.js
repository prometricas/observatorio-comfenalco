/**
 * piramideService — Puerto JavaScript del script Python del Observatorio.
 *
 * Reproduce 1:1 la lógica del cuaderno de Google Colab que genera la
 * pirámide poblacional relativa (App_Envejecimiento): agrupación de edades
 * en rangos de 5 o 10 años, porcentajes sobre el Total General y la figura
 * Plotly con hombres a la izquierda (x negativa) y mujeres a la derecha,
 * en modo overlay con rango simétrico ±máximo·1.8.
 *
 * Plotly de Python y Plotly.js comparten el mismo motor: estos traces y
 * layout producen la misma gráfica original del cuaderno, con los colores
 * adaptados al manual de marca (decisión confirmada del proyecto).
 */

/* Agrupación por defecto de la pirámide (quinquenios, como el cuaderno). */
const AGRUPACION_QUINQUENAL = 5;

/* Colores de marca para las series (equivalen a --color-verde-oscuro y
   --color-verde-agua de variables.css; Plotly no lee variables CSS). */
const COLOR_HOMBRES = '#005744';
const COLOR_MUJERES = '#74c1a2';

/* Tipografía de marca para los rótulos de la gráfica. */
const FUENTE_GRAFICA = "'Catamaran', 'Segoe UI', sans-serif";

/**
 * Agrupa la población de una fila del panel en rangos etarios relativos.
 * Réplica de `group_ages_relative(df, step)` del cuaderno: para cada rango
 * suma las edades simples y calcula el porcentaje sobre el Total General;
 * cierra con el rango "100+".
 *
 * @param {{hombres: number[], mujeres: number[], totalGeneral: number}|null} fila
 * @param {number} paso 5 o 10 años por rango
 * @returns {Array<{rango: string, hombresPorcentaje: number, mujeresPorcentaje: number}>|null}
 *          null si la fila no existe o su total no permite calcular porcentajes
 */
export function agruparEdadesRelativas(fila, paso = AGRUPACION_QUINQUENAL) {
  const total = fila?.totalGeneral;

  /* Sin un total válido no hay porcentajes posibles (celda vacía o columna
     renombrada en un Excel editado por el cliente): se devuelve null para
     que la interfaz muestre su aviso de "sin datos" en vez de una gráfica
     con divisiones por cero. */
  if (!(total > 0)) return null;

  const grupos = [];

  for (let inicio = 0; inicio < 100; inicio += paso) {
    let hombres = 0;
    let mujeres = 0;
    for (let edad = inicio; edad < inicio + paso; edad += 1) {
      hombres += fila.hombres[edad] ?? 0;
      mujeres += fila.mujeres[edad] ?? 0;
    }
    grupos.push({
      rango: `${inicio}-${inicio + paso - 1}`,
      hombresPorcentaje: (hombres / total) * 100,
      mujeresPorcentaje: (mujeres / total) * 100,
    });
  }

  /* Rango final "100 y más" (índice 100 del panel compactado). */
  grupos.push({
    rango: '100+',
    hombresPorcentaje: ((fila.hombres[100] ?? 0) / total) * 100,
    mujeresPorcentaje: ((fila.mujeres[100] ?? 0) / total) * 100,
  });

  return grupos;
}

/**
 * Construye los traces y el layout Plotly de la pirámide relativa, con la
 * misma configuración visual del cuaderno: barras horizontales overlay,
 * texto de porcentaje con 2 decimales en cada barra, leyenda horizontal
 * arriba, eje X oculto con rango simétrico ±máximo·1.8 y título
 * "Pirámide Relativa: {departamento} ({año})".
 *
 * @param {ReturnType<typeof agruparEdadesRelativas>} grupos
 * @param {string} nombreDepartamento
 * @param {number} anio
 * @returns {{data: object[], layout: object}}
 */
export function construirFiguraPiramide(grupos, nombreDepartamento, anio) {
  const rangos = grupos.map((grupo) => grupo.rango);
  const hombres = grupos.map((grupo) => grupo.hombresPorcentaje);
  const mujeres = grupos.map((grupo) => grupo.mujeresPorcentaje);
  const maximo = Math.max(...hombres, ...mujeres);

  const data = [
    {
      y: rangos,
      x: hombres.map((valor) => -valor),
      name: 'Hombres',
      type: 'bar',
      orientation: 'h',
      marker: { color: COLOR_HOMBRES },
      text: hombres.map((valor) => `${valor.toFixed(2)}%`),
      textposition: 'auto',
      textfont: { size: 10 },
      insidetextanchor: 'middle',
      cliponaxis: false,
      hovertemplate: 'Hombres: %{text}<extra></extra>',
    },
    {
      y: rangos,
      x: mujeres,
      name: 'Mujeres',
      type: 'bar',
      orientation: 'h',
      marker: { color: COLOR_MUJERES },
      text: mujeres.map((valor) => `${valor.toFixed(2)}%`),
      textposition: 'auto',
      textfont: { size: 10 },
      insidetextanchor: 'middle',
      cliponaxis: false,
      hovertemplate: 'Mujeres: %{text}<extra></extra>',
    },
  ];

  const layout = {
    /* El texto del cuaderno se conserva íntegro; el salto de línea y la
       fuente reducida evitan que nombres largos (p. ej. "San Andrés y
       Providencia") se recorten en el ancho de la tarjeta. */
    title: {
      text: `Pirámide Relativa:<br>${nombreDepartamento} (${anio})`,
      x: 0.5,
      font: { size: 13 },
    },
    barmode: 'overlay',
    bargap: 0.1,
    plot_bgcolor: 'white',
    paper_bgcolor: 'white',
    font: { family: FUENTE_GRAFICA },
    /* Sin zoom ni paneo (decisión del cliente: los usuarios lo activaban
       sin querer y perdían la vista); el hover sigue funcionando. */
    dragmode: false,
    xaxis: {
      showticklabels: false,
      range: [-maximo * 1.8, maximo * 1.8],
      showgrid: false,
      fixedrange: true,
    },
    yaxis: { title: { text: 'Edad' }, fixedrange: true },
    legend: { orientation: 'h', yanchor: 'bottom', y: 1.02, xanchor: 'center', x: 0.5 },
    margin: { l: 50, r: 50, t: 100, b: 50 },
    uniformtext: { mode: 'show', minsize: 9 },
  };

  return { data, layout };
}
