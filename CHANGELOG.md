# Registro de cambios — Observatorio Comfenalco Antioquia

Registro de tecnologías, plugins y versiones incorporadas al proyecto.
El formato sigue las convenciones de [Keep a Changelog](https://keepachangelog.com/es/)
y el versionado de [SemVer](https://semver.org/lang/es/).

## [0.53.0] — 2026-09-23

### Agregado
- **Calidad vida digital con subtítulo, descripción y guía flotante** (petición del cliente: era el único
  indicador sin la pieza `DescripcionIndicador` de 0.43.0/0.45.0). Se creó el Word propio
  `public/data/indicadores/calidad-vida-digital/textos/calidad-vida-digital.docx` con la misma plantilla de
  los otros cuatro (título Heading1 + descripción + "Cómo usar el visualizador." en negrita; generado
  desde el de Desempeño ambiental con el ZIP propio, scratchpad docx/crear-vida-digital.mjs) y los textos
  ya redactados para el DQL en 0.43.0: subtítulo "Calidad de vida digital: el bienestar también se juega en
  línea", descripción (asequibilidad y calidad de internet, infraestructura, seguridad y gobierno
  electrónicos; 37 países y promedio OCDE hasta 2030) y guía en tres pasos (Trayectoria y escenarios /
  Comparador por escenario / cursor). Precalculado generado (1 KB). `ModuloVidaDigital` monta
  `DescripcionIndicador` bajo el h1 (misma carga con docxService, Reintentar) y se RETIRÓ el código
  comentado del antiguo panel "Análisis" (JSX y CSS), que el cliente había dejado en pausa el 2026-08-14.
  Verificado a 1280 (botón 380×92 px a la derecha, globo con 3 pasos) y 375 sin scroll horizontal.

## [0.52.2] — 2026-09-23

### Corregido
- **Hiper-personalización — Figura 18 sin el título superpuesto** (petición del cliente): la matriz de
  intensidad traía en la imagen un título y un subtítulo montados. Esta vez el título se BORRÓ pintando
  de blanco la franja superior (filas 0–41, fondo blanco puro) y se aplicó solo un recorte leve de 32 px,
  de modo que la matriz y la barra de color conservan margen encima; 1600×766 → 1600×734 px, 94 → 82 KB.
  Rótulo y nota del portal sin cambios.

## [0.52.1] — 2026-09-23

### Corregido
- **Hiper-personalización — Figura 16 sin el título superpuesto** (petición del cliente): el gráfico de
  síntesis de las cinco variables traía dentro de la imagen un título y un subtítulo montados uno
  sobre otro. Se recortó la franja superior de la imagen (48 px: el texto ocupaba las filas 14–40 y el
  eje vertical empieza en la 63), conservando el eje completo y unos milímetros de margen encima;
  1600×1208 → 1600×1160 px, 92 → 78 KB. El rótulo "Figura 16." y su nota en el portal no cambian.

## [0.52.0] — 2026-09-23

### Cambiado
- **"Gasto social" pasa a llamarse "Inversión social"** (petición del cliente): rótulo del menú Tendencias y
  del panal PESTEL (`etiqueta` en `navegacion.js`; el h1 del módulo la hereda), título del artículo
  ("Proyección de la inversión social pública en Colombia, 2025–2050…") y toda la prosa de
  `ModuloGastoSocial` reescrita en femenino (53 sustituciones: "la inversión social pública", "la
  inversión dirigida a vejez", "una inversión estable", "invertirá el Estado", "cuánto se destina"…).
  Se conserva "gasto" donde el cliente lo pidió o donde es el término propio: títulos, textos
  alternativos y notas de las 14 figuras, "gasto pensional" y el nombre oficial de la fuente
  "Cuentas Nacionales — Gasto Social Público y Privado (SOCX)". A nivel de código NADA cambia de
  nombre (slug `gasto-social`, módulo, carpeta de assets, clases CSS) para no romper rutas ni datos.
- **Inversión social — referencias desplegables**: el título "Referencias" es ahora un acordeón plegado
  por defecto (h3 > botón de 44 px con conteo "(8)" y cheurón, `aria-expanded`/`aria-controls`,
  `data-indice` para el índice lateral), igual que Benchmarking y Factores de cambio.

## [0.51.0] — 2026-09-23

### Agregado
- **Ventana "Las ecuaciones detrás de las pirámides" en Envejecimiento** (`MetodologiaEnvejecimiento`,
  petición del cliente): misma invitación y ventana emergente que Informalidad, sobre el panel derecho
  de las pirámides ("¿Cómo se proyecta la población hasta 2050?"). El Word del cliente
  (`articulo-envejecimiento.docx`; el `Art_Envejecimiento.docx` entregado es el mismo texto salvo un
  sufijo `?utm_source` en una URL de referencia; el Excel `Base_Población.xlsx` es idéntico byte a
  byte a `base-poblacion.xlsx`) NO trae ecuaciones ni apartado metodológico, así que la técnica se
  INDUJO (decisión del cliente) del Excel (fórmulas de los tres indicadores en los encabezados de la
  hoja "Totales e Indices"), de la Nota Técnica PPED julio 2025 del DANE y de su Documento
  metodológico: ecuación compensadora `P(T) = P(0) + B − D + I − E`; método de componentes por
  cohortes `P(x+1,t+1) = P(x,t)·S(x,t) + M(x,t)` con tabla de vida (`l(x+1) = l(x)(1 − q(x))`,
  `L(x)`, `S(x) = L(x+1)/L(x)`, `e(x) = T(x)/l(x)`); nacimientos `B(t) = Σ f(x,t)·W(x,t)` (10–49) y
  TGF, sobrevivencia inversa (Hauer & Schmertmann), fecundidad proyectada con Lee-Carter penalizado
  (`ln f(x,t) = a(x) + b(x)κ(t) + ε`) y grupos de convergencia (Bolivia / Costa Rica / Argentina 2050);
  mortalidad en dos etapas (niveles e0, e100, q0 con K-Means y países de referencia WPP 2024: Chile,
  México, Brasil, Guyana; patrón por edad con la ley de Heligman-Pollard de 8 parámetros, ajuste
  iterativo CELADE); migración internacional bayesiana (Azose-Raftery, Rogers-Castro) y migración
  interna origen-destino (Willekens, ISM) en un modelo multirregional `P(t+1) = G(t)·P(t)` bottom-up
  con 22 regiones; y los tres indicadores del portal (tasa e índice de envejecimiento y dependencia
  de mayores, numerador 60+) con las cifras nacionales del Word (6,9 → 24,6 %; índice > 100 hacia
  2036; 11,9 → 39,8) y del DANE (índice 65+ 36,7 → 135,9; crecimiento negativo desde 2044). Ocho
  ecuaciones HTML/CSS con lectura textual, seis referencias; sin gráficas (decisión del cliente).
- **Pieza compartida `VentanaMetodologia`** (`src/components/VentanaMetodologia`): la invitación, el
  `<dialog>` y los componentes de composición (P, H3, Ecuacion, Mat, Definiciones, Referencias) salen
  de `MetodologiaInformalidad` para que ambas tendencias los compartan (bloque BEM
  `ventana-metodologia`; `metodologia-informalidad.css` eliminado). `ModuloTendencia` despacha la
  metodología por slug con el mapa `METODOLOGIAS_TENDENCIA`. En angosto (<640 px) las ecuaciones
  largas se pliegan por sus operadores en lugar de desbordar. Verificado a 1280 (botón 809×88 px
  sobre las pirámides; caja 780 px; el mapa no se mueve) y 375 (ocho ecuaciones sin desborde, sin
  scroll horizontal); Informalidad revalidada con la pieza compartida.

## [0.50.0] — 2026-09-23

### Agregado
- **Ventana "Las ecuaciones detrás de la proyección" en Informalidad laboral** (`MetodologiaInformalidad`,
  petición del cliente): invitación grande en la columna derecha del módulo, ENCIMA de la gráfica
  interactiva y visible aun sin departamento elegido ("¿Cómo se proyecta la informalidad hasta
  2042?", mismo lenguaje del botón de guía de los indicadores: icono en pistacho con halo que late,
  cheurón), que abre una VENTANA EMERGENTE centrada con `<dialog>` nativo (`showModal`: velo verde
  oscuro con desenfoque, foco atrapado, Escape cierra; también cierran el botón ×, el botón "Cerrar" del
  pie y el clic sobre el velo). No desplaza el mapa ni la gráfica (verificado: el mapa conserva su
  posición con la ventana abierta). Caja de 780 px máx., 88 vh, cabecera y pie fijos y solo el cuerpo
  con scroll. Contenido FIJO en el código, sintetizado de las cuatro primeras páginas del Word del
  cliente (`articulo-informalidad.docx`, mismo texto que el `Art_Informalidad.docx` entregado —
  solo difieren los títulos de ciudad con "(Departamento)" que necesita el intérprete): modelo
  Lee-Carter adaptado (`ln(r_c,t) = a_c + b_c × κ_t + ε_c,t`, definiciones, SVD, 99,1 % de la
  varianza), camino aleatorio con deriva (`Δκ_t = d + ε_t`, d = −0,132494, σ_ε = 0,3844),
  intervalos al 95 % (`κ_T+h ± 1,96 × σ_ε × √h`), paso de tasas a ocupados vía PEA 15–64 de las PPED
  2025, cargas b_c (Medellín 0,075, Cali 0,059, Pasto 0,033, Quibdó 0,032), brecha 41,4 %–77,6 % y
  cifras agregadas (50,9 % → 47,4 %; 8,1 → 7,4 millones) y tres referencias con URL enlazadas. Las
  cuatro ecuaciones van en HTML/CSS con pila serif matemática y lectura textual (`role="img"`,
  patrón de Gasto social). Ajuste documentado: las remisiones del Word a "Figura 1/2/3" y "Tabla 1"
  se omiten (las imágenes del documento son las gráficas por ciudad que el portal muestra en vivo).
  Verificado a 1280 (botón 701×88 px a la derecha del mapa; caja 780 px centrada) y 375 (caja 343 px,
  ecuaciones sin desbordar, sin scroll horizontal); consola limpia.

## [0.49.3] — 2026-09-23

### Eliminado
- **Tendencia "Cambios estructura familiar"** (petición del cliente: estaba vacía y no se usará): entrada
  retirada del catálogo `TENDENCIAS` de `src/data/navegacion.js` (el menú Tendencias pasa de 9 a 8
  subopciones, todas con contenido) y carpeta vacía `public/data/tendencias/cambios-estructura-familiar/`
  eliminada; la nota `como-actualizar-los-datos.txt` lista ahora los 8 temas. El tema sigue cubierto por
  el artículo "Estructura familiar" ('estructura-familiar'). Sin cambios en `TENDENCIAS_HABILITADAS`.

## [0.49.2] — 2026-09-23

### Cambiado
- **Benchmarking — referencias desplegables** (`ModuloBenchmarking`, petición del cliente): el título
  "REFERENCIAS" pasa a "Referencias" y se convierte en un acordeón plegado por defecto (h2 que envuelve
  un botón de 44 px con `aria-expanded`/`aria-controls`, conteo "(21)" y cheurón), con el mismo
  lenguaje de las "Fuentes de información" de Factores de cambio; la lista solo se renderiza al abrir.
  `TablaContenido` lee ahora el rótulo limpio de `data-indice` cuando el título lo trae (así el índice
  muestra "Referencias" y no el conteo ni el botón); sin el atributo sigue usando el texto visible.

## [0.49.1] — 2026-09-23

### Cambiado
- **Benchmarking — apartado sin numeral** (`ModuloBenchmarking`, petición del cliente): el h3
  "1.4.3. Ventajas Competitivas y Plataformas de Futuro" pasa a "Ventajas Competitivas y Plataformas
  de Futuro", como los demás apartados del artículo (ninguno va numerado). Es la única desviación
  nueva respecto al Word de origen; queda anotada en la cabecera del módulo.

## [0.49.0] — 2026-09-23

### Cambiado
- **"Qué es el IBiM" — gráfico del cliente en lugar de la rejilla de dimensiones** (`ModuloIbimDescripcion`,
  apartado "Las nueve dimensiones"): la rejilla de nueve tarjetas numeradas se reemplazó por la figura
  "Nuestra comprensión del bienestar" entregada por Comfenalco (persona al centro, nueve dimensiones
  con sus variables). Imagen convertida a WebP calidad 90 (1600×900, 278 KB JPG → 163 KB) en
  `src/assets/ibim/dimensiones-bienestar.webp`, importada estáticamente (hash + caché inmutable,
  `loading="lazy"`), a todo el ancho de la columna de lectura con esquinas redondeadas, sombra suave
  y rótulo debajo ("Fuente: Comfenalco Antioquia, 2026", redacción del cliente). El `alt` enumera
  las nueve dimensiones tal como las rotula el gráfico. Texto ajustado para leerse con la figura: el
  párrafo previo la presenta, uno nuevo la interpreta por grupos (cuerpo y emociones, seguridad,
  condiciones materiales, educación, tiempo propio y vínculos) y remite a la pieza interactiva
  "Las nueve dimensiones" para leer las variables. Bloque CSS `__dimensiones` retirado y sustituido
  por `__figura`/`__figura-imagen`/`__figura-rotulo`. Verificado a 1280 (883×497 px) y 375
  (301×169 px) sin scroll horizontal ni errores de consola.

## [0.48.1] — 2026-09-23

### Cambiado
- **Flujograma de dimensiones más compacto** (`ModuloIbimDimensiones`, petición del cliente): radio del
  anillo 41 % → 32 % del lienzo, nodos 19 % → 16 %, anillo guía `inset` 18 %, centro 22 %, lienzo
  `min(100 %, 560 px)` (medido: nodos de 90 px a 179 px del centro, 73 px de aire hasta "Bienestar" y
  123 px entre vecinos, sin solapes). La línea de fuente ya no menciona "Figura 2".

## [0.48.0] — 2026-09-23

### Agregado
- **Flujograma interactivo de las nueve dimensiones del IBiM** (`ModuloIbimDimensiones`, id
  `ibim-dimensiones`, tercera entrada del submenú y de la portada de IBiM): versión inicial simple de
  la Figura 2 del informe 2023 — la persona ("Bienestar") al centro y nueve botones circulares
  posicionados por porcentaje (patrón del panal PESTEL) con el color de marca de cada dimensión; al
  pulsar uno (aria-pressed) el panel lateral pegajoso (región viva) muestra la dimensión, un resumen y
  sus variables como fichas; segundo clic deselecciona; los demás se atenúan. Bajo 700 px el círculo
  pasa a rejilla de botones y el panel va debajo. Datos en `src/data/dimensiones-ibim.js` (9
  dimensiones, 30 variables transcritas de la figura; colores AA para rótulos). Pictograma
  `ibim-dimensiones`. La portada de IBiM pasa a tres tarjetas (horizontal desde 1200 px).

## [0.47.0] — 2026-09-23

### Agregado
- **IBiM como sección con portada y submenú** (patrón de Tendencias e Indicadores): el menú fijo gana
  BOTÓN DIVIDIDO (`NavFijo` replica la mecánica del menú temático: rótulo → portada, cheurón →
  submenú con aria-expanded; acordeón en móvil, panel flotante en escritorio). Portada
  `ModuloIbimPortada` (id `ibim`): presentación, tres cifras clave (89,3; 9 dimensiones; 77,1 %) y dos
  tarjetas con pictograma —"Qué es el IBiM" (`ibim-descripcion`) y "El bienestar también tiene
  geografía" (`ibim-articulo`, el artículo existente)—. Catálogo: `subOpciones` en la opción
  `ibim` de OPCIONES_NAV_FIJO; ETIQUETAS_SECCIONES ahora recorre también las subopciones del menú fijo.
- **Artículo "Un índice para mirar el bienestar entero"** (`ModuloIbimDescripcion`): síntesis
  periodística (no transcripción) de las páginas de presentación y metodología del informe IBiM 2023
  del Centro de Estudios de Opinión (UdeA) hasta antes de "Muestra": qué es el índice (0–100,
  enfoque de capacidades, puerta de entrada y desagregaciones), las nueve dimensiones (rejilla
  numerada), niveles de bienestar (tabla: alto > 76 %, moderado 62–75,9 %, bajo < 62 %), la fórmula
  IBiM = Hsuf + Hpriv × Asuf en HTML/CSS (role="img") y el cálculo 89,3 = 77,1 % + 22,9 % × 53,5 %;
  tabla de contenido y referencia al informe. El flujograma de dimensiones (p. 7) queda para una
  versión interactiva posterior. Pictograma nuevo `ibim-descripcion` (lupa sobre gráfica).

## [0.46.4] — 2026-09-23

### Cambiado
- **Sigla "IBiM"** (Índice de Bienestar Multidimensional) con la segunda i en minúscula en TODO el
  portal: menú fijo, antetítulo del módulo, catálogo de navegación, caracterización de factores y
  comentarios de código (antes "IBIM" en 12 lugares). El artículo ya la escribía bien.

## [0.46.3] — 2026-09-23

### Cambiado
- **Nombre oficial del portal**: "Observatorio prospectivo del bienestar integral" en el banner de
  inicio (título a 24ch: dos líneas en escritorio), en la pestaña del navegador (`index.html` y
  `TITULO_PORTAL`; las secciones usan la forma corta `TITULO_PORTAL_CORTO` "Observatorio prospectivo")
  y en el título de la primera columna del pie.
- **Logotipo textual de la cabecera**: "Observatorio" en verde oscuro y, debajo, "Prospectivo" en
  pistacho con letras espaciadas, al estilo del imagotipo de Comfenalco (`__titulo-principal` /
  `__titulo-secundario`; nombre accesible completo; el pistacho va como parte del logotipo).
- **Aviso de transparencia** en el pie (`__aviso`): uso ético de IA en la redacción de algunos
  artículos y en el diseño de algunas imágenes y gráficas, con reconocimiento y cita de los autores
  originales en las referencias. Al final del pie, centrado, letra 0,78 rem en gris claro #7f8b85
  (3,5:1: por debajo de AA a pedido expreso del cliente para que pase desapercibido).

## [0.46.2] — 2026-09-21

### Cambiado
- **Pie**: el cuerpo se monta sobre ~50 % del alto del dibujo de montañas (`--pie-solape`
  8vw desde 700 px —el dibujo mide 260/1600 del ancho—, 3,5 rem en angosto), así los títulos
  arrancan justo por debajo de la mitad de la imagen. Aves reducidas de nueve a CUATRO y a escala
  0,2–0,3 (15–25 px de envergadura en escritorio: tamaño creíble a la distancia de las
  montañas), un poco más opacas (0,72) para que se distingan.

## [0.46.1] — 2026-09-21

### Cambiado
- **Montañas del pie** (ajustes del cliente): perfiles SUAVES (curvas Catmull-Rom → Bézier por
  los puntos de cada cordillera, calculadas en `siluetaSuave` dentro de Footer.jsx) en lugar de
  polígonos; nueve AVES en silueta rellena (gaviota planeando y ave aleteando, algunas en espejo)
  repartidas a ambos lados y al centro; lienzo 1600×260 con más cielo. El cuerpo del pie se monta
  sobre la franja baja del dibujo (`--pie-solape` 2 rem / 4,5 rem) con fondo TRANSPARENTE en esa
  franja, así las crestas de las cordilleras pasan por DETRÁS de los títulos y el corte deja de
  ser brusco. Desde 700 px el SVG toma la proporción de su lienzo (`aspect-ratio 1600/260`, sin
  recortes: antes el recorte vertical de `slice` escondía las aves); en angosto, 7 rem y recorte
  de los lados.

## [0.46.0] — 2026-09-21

### Cambiado
- **Pie de página con montañas** (petición del cliente, referencia: pie de
  matriculascomfenalcoantioquia.com.co): fondo GRIS claro (#f2f3f1) que se distingue del degradado
  verde del portal, y borde superior con una silueta de MONTAÑAS hacia el centro —las que rodean a
  Medellín— en tres capas de gris (cordillera lejana y media angulosas, colinas cercanas suaves
  del color del pie) y seis aves en verde oscuro sobrevolando los picos. SVG de 1600×200 con
  `preserveAspectRatio="xMidYMax slice"`: conserva la proporción y recorta los lados en pantallas
  angostas para que las montañas centrales siempre se vean (6/8/10 rem de alto según ancho). Los
  puntos de las cordilleras y las aves son constantes al inicio de Footer.jsx (previsualización
  en scratchpad marca/montanas.mjs). Composición como la referencia: títulos verde oscuro, listas
  con viñeta verde y texto gris, redes en círculos pistacho (se invierten al pasar el puntero) y
  las entidades del sector (Ministerio del Trabajo, Servicio Público de Empleo, Vigilado
  Supersubsidio) apiladas bajo un filete en la columna "Síguenos"; la línea de derechos cierra el
  mismo bloque gris. Se retira la curva cóncava de 0.42.0.

### Verificado
- `npm run lint` y `npm run build` en verde; pie con la silueta a 1280 y 375 px (montañas
  centrales visibles), logos de las tres entidades cargados bajo el filete, sin scroll horizontal.

## [0.45.0] — 2026-09-21

Ajustes del cliente (2026-09-21): vuelve la marca de agua de cada módulo, degradado horizontal y
jerarquía coherente en los indicadores con la guía de uso como globo flotante.

### Corregido
- **La marca de agua (pictograma gigante) había desaparecido** en 0.43.0: al pasar el degradado a
  `.app`, su fondo —pintado como bloque en flujo— tapaba la capa fija `fondo-modulo` de
  `z-index: -1`. Solución: `isolation: isolate` en `.app`, que crea el contexto de apilamiento
  donde la capa negativa pinta ENCIMA del fondo de .app y debajo del contenido. Regla anotada en
  app.css y CLAUDE.md para no repetirla.

### Cambiado
- **Degradado del portal** de verde tenue a la IZQUIERDA a blanco a la derecha (`90deg`,
  #e3edd5 → #f2f7ea → #ffffff), en lugar de arriba → abajo.
- **Jerarquía de los indicadores** (los cinco módulos + `DescripcionIndicador`): un solo título
  principal (h1 con el nombre del indicador); el título del Word pasa a SUBTÍTULO explicativo
  (párrafo destacado en Mitr, no encabezado); la descripción ocupa todo el ancho hasta la
  invitación; la ficha técnica de la figura (rangos de años, países…) que iba bajo el título se
  mueve DEBAJO del panel gráfico como nota (`__nota-tecnica`, script scratchpad
  refactor-indicadores-2.mjs).
- **Guía de uso como GLOBO FLOTANTE**: la invitación "¿Cómo usar el visualizador?" abre un globo
  en posición absoluta bajo el botón (alineado a la derecha, 480 px máx., flechita pistacho,
  sombra) que se superpone al contenido sin desplazar la figura; se cierra con el mismo botón,
  con Escape o al pulsar fuera (listeners solo mientras está abierto). aria-expanded /
  aria-controls / role="region"; sin sticky.

### Verificado
- `npm run lint` y `npm run build` en verde. Navegador: `.app` con isolation isolate y degradado
  horizontal; pictograma de fondo presente; sin descripción técnica en el encabezado y nota
  técnica bajo la gráfica; subtítulo como párrafo; el globo se abre sin mover la figura (mismo
  `top` del panel antes y después) y se cierra con Escape.

## [0.44.0] — 2026-09-21

Cuarta ronda de ajustes (petición del cliente 2026-09-21): guía de uso de los indicadores como
invitación desplegable, banner que sí rota (corrección), pictogramas propios en la portada de
Indicadores, portadas de publicaciones a la misma altura, Tanques más angosto y Publicaciones en el
menú temático en lugar de Innovación.

### Corregido
- **El banner no rotaba** en el equipo del cliente: el navegador reportaba
  `prefers-reduced-motion: reduce` (Windows con "Mostrar animaciones" apagado lo activa) y desde
  0.41.0 la rotación automática se desactivaba con esa preferencia. Ahora la rotación corre
  SIEMPRE y con movimiento reducido solo se suprime el fundido (la foto cambia en seco); se añade
  un botón de PAUSA/reanudación (aria-pressed, 44 px) como control explícito. Además se retiró la
  pausa al pasar el puntero (se percibía como "no cambia") y la pausa por foco solo aplica al foco
  de TECLADO (`:focus-visible`): un clic de ratón en una flecha ya no deja el banner detenido.
  Intervalo a 4 s (fundido de 0,7 s), como pidió el cliente.

### Agregado
- **Guía de uso desplegable en los indicadores** (`DescripcionIndicador`): en escritorio la
  descripción va a la izquierda y, en el espacio vacío de la derecha, una INVITACIÓN grande
  ("¿Cómo usar el visualizador?", icono en pistacho con halo que late; sin latido con movimiento
  reducido) que al pulsarse despliega la guía como LISTA NUMERADA de pasos (el párrafo del Word se
  parte por punto y coma o por punto seguido de mayúscula) y vuelve a ocultarla
  (aria-expanded/aria-controls, panel siempre en el DOM con `hidden`). Bajo 1000 px la invitación
  va bajo la descripción a todo el ancho. En escritorio la guía es pegajosa mientras la columna de
  texto sea más alta.
- **Pictogramas propios de los cinco indicadores** (catálogo `Pictogramas`): globo terráqueo
  (OCDE), caras sonrientes (FNB), birrete (Capital humano), árbol (Desempeño ambiental) y teléfono
  con señal (Calidad de vida digital). Los usa el tablero de la portada de Indicadores y también
  la marca de agua de fondo de cada indicador (`resolverPictograma` prefiere el id exacto).
- **Botón de pausa del banner** (ver Corregido).

### Cambiado
- **Portada de Indicadores** (`ModuloIndicadores`): las tarjetas cambian el medidor semicircular
  simbólico (0.34.1) por el pictograma alusivo al estilo Comfenalco (104 px; gris → dos verdes al
  pasar el puntero o enfocar), toda la tarjeta se eleva y navega (clic redundante; el botón
  Explorar sigue siendo el control accesible). Se elimina `MedidorIndicador.jsx` y su CSS de arco
  y aguja; la animación de entrada escalonada se conserva.
- **`IconoInicio` → `IconoPictograma`** (`src/components/Pictogramas/`, bloque
  `icono-pictograma`, variables `--icono-pictograma-fondo/-trazo/-tamano`): el mismo icono con
  círculo de fondo ahora es compartido por el inicio y la portada de Indicadores.
- **Portadas de publicaciones a la MISMA altura** (inicio 270/300 px, módulo 280/260 px) con la
  proporción intacta: se fija solo la altura y el ancho sigue a la imagen (antes se fijaba el
  ancho y las alturas diferían).
- **Tanques de pensamiento** más angosto (1100 px; antes la columna de lectura de 1320): las
  tarjetas de la cronología se leían demasiado anchas frente a los artículos.
- **Menús**: "Publicaciones" pasa de la barra fija al menú temático, en el lugar de "Innovación",
  que se retira del portal (catálogo, pie y pictograma). Barra fija: Inicio, El Observatorio,
  Línea de tiempo, IBIM, Benchmarking, Tanques; temático: Tendencias, Indicadores, Factores de
  cambio, Riesgos y oportunidades, Publicaciones. El pie lista 10 enlaces.

### Verificado
- `npm run lint` y `npm run build` en verde. Navegador: el banner avanza de foto con el
  temporizador (comprobado forzando la visibilidad de la pestaña) y el botón de pausa lo detiene;
  la invitación abre y cierra la guía con aria-expanded y lista de pasos; la portada de
  Indicadores muestra los cinco pictogramas; menús con Publicaciones en la barra temática;
  portadas alineadas a la misma altura; 1280 y 375 px sin scroll horizontal ni errores.

## [0.43.0] — 2026-09-21

Tercera ronda de mejoras (petición del cliente 2026-09-21): sección Publicaciones con visor en
línea y franja en el inicio, descripción de los indicadores encima del visualizador con textos
reescritos en los Word, entidades del sector en el pie, degradado de todo el portal y banner a 5 s.

### Agregado
- **Módulo Publicaciones** (`src/modules/ModuloPublicaciones/`, menú fijo; antes "en construcción"):
  catálogo `src/data/publicaciones.js` (id, título, tipo, entidad, descripción, archivo, páginas,
  peso, portada) + PDF en `public/data/publicaciones/` + portadas WebP en
  `src/assets/publicaciones/` (primera página a 480 px, 26–32 KB, generadas con pdf.js y canvas
  nativo desde el scratchpad publicaciones/portadas.mjs). Lectura EN LÍNEA: al elegir una
  publicación se monta un iframe con el visor de PDF del navegador (`#view=FitH`, 80 vh) encima
  del catálogo, con "Abrir en una pestaña nueva", "Cerrar el visor", aviso del peso y foco al
  título; el iframe solo existe con una publicación abierta (el e-book pesa 61 MB). Dos
  publicaciones del Laboratorio Innóvate: "E-book de herramientas para innovar" (53 págs., 61 MB)
  y "Memorias de innovación social" (20 págs., 5,3 MB; PDF de solo imágenes, sin texto
  extraíble). Añadir una publicación = copiar el PDF, generar la portada y registrar la entrada.
  CSP: `frame-src` cae en `default-src 'self'` (mismo origen) y `object-src 'none'` obliga a
  iframe (no embed/object).
- **Franja "Publicaciones" en el inicio** (`PublicacionesInicio`, patrón del observatorio del
  Ceplan): barra verde oscura con icono, carrusel horizontal con scroll-snap y flechas de 44 px
  (scrollBy; respeta movimiento reducido), portadas con sombra de libro que se elevan al pasar el
  puntero, título y tipo; el clic pide esa publicación (`solicitarPublicacion` →
  `consumirPublicacionSolicitada` en el módulo) y navega; enlace "Ver más publicaciones".
- **Descripción de los indicadores ENCIMA del visualizador** (`DescripcionIndicador`, bloque
  `descripcion-indicador`): título propio del Word, párrafos de descripción y la guía "Cómo usar
  el visualizador" como bloque destacado (filete pistacho, icono, tinte leve), directamente
  sobre el fondo (sin tarjeta blanca) y sin la palabra "Análisis"; omite los párrafos
  "Figura N." y "Nota." del resumen (describen figuras estáticas del cuaderno); estados
  cargando / error con Reintentar / en preparación. Aplicado a Vida Mejor, FNB, Capital humano
  y Desempeño ambiental (script scratchpad refactor-indicadores.mjs: retira
  `renderizarPanelTexto`, el `<article __panel--texto>` y seis reglas CSS por módulo). Calidad
  de vida digital sigue sin texto (panel comentado, decisión pendiente del cliente).
- **Entidades del sector en la franja legal del pie** (referencia: pie de Comfenalco Valle):
  Ministerio del Trabajo y Servicio Público de Empleo (logos WebP con transparencia a 160 px de
  alto, tomados de ese pie) junto al sello Vigilado Supersubsidio, cada uno enlazado. NO se
  incluyen "Colombia Potencia de la Vida" (marca del gobierno 2022–2026, ya cerrado) ni
  "Vigilado Supersalud" (aplica a cajas con servicios de salud vigilados; confirmar con
  Comfenalco Antioquia). Añadir una entidad = una entrada en ENTIDADES.

### Cambiado
- **Textos de los Word de indicadores REESCRITOS** (cortos, dirigidos al usuario, sin Google
  Colab): descripción + "Cómo usar el visualizador." (rótulo en negrita) en
  `felicidad-nacional-bruta.docx`, `capital-humano.docx`, `desempeno-ambiental.docx` y en las
  CINCO secciones de `resumen-indicadores.docx` (incluida Calidad de vida digital, para el día
  que se active). Edición directa del `word/document.xml` (scratchpad docx/reescribir.mjs:
  conserva pPr y rPr, negrita solo en el rótulo) y reempaquetado con un escritor ZIP propio
  (docx/empaquetar.mjs): Compress-Archive y ZipFile de .NET Framework escriben las entradas con
  «\» y mammoth no encuentra word/document.xml. Precalculados regenerados.
- **Fondo del portal**: el degradado ya no es por pantalla (capa fija) sino de TODO el documento
  (`.app`: blanco → #f6f9f0 → #e4eed7); `fondo-modulo` conserva solo el halo pistacho y el
  pictograma. Pie más claro (#f6f9f0) para que la curva cóncava se lea sobre el verde final.
- **Banner**: 5 s por foto (antes 7) con fundido de 0,9 s (antes 1,2): la foto queda quieta
  ~4 s, tiempo de leer el pie de foto; 4 s competía con la lectura del lema.
- **Layout de indicadores**: gráfica a todo el ancho y descripción encima; desaparece la
  columna/tarjeta de análisis con scroll interior (la regla de "texto de análisis con scroll
  contenido" queda solo para las tendencias).

### Verificado
- `npm run lint` y `npm run build` en verde; precalculados de los cuatro Word regenerados con los
  textos nuevos (mammoth los lee). Navegador (1280 y 375 px): franja de publicaciones con dos
  portadas cargadas; clic en una portada abre el módulo con el visor (iframe apuntando al PDF) y
  el foco en el título; logos de las tres entidades cargados; degradado en `.app`; consola sin
  errores; sin scroll horizontal.

## [0.42.0] — 2026-09-21

Segunda ronda de mejoras de forma (petición del cliente 2026-09-21): banner con doce fotos y
esquinas redondeadas, tarjetas del inicio reactivas, pie claro con curva, fondo de página por
módulo, menú temático con botón dividido y corrección del servidor de desarrollo.

### Agregado
- **Fondo de página por módulo** (`src/components/FondoModulo/`, bloque `fondo-modulo`): capa FIJA
  detrás de todo el contenido con degradado blanco → verde tenue (#f6f9f0 → #e9f0e1) y halo
  pistacho arriba a la derecha, más el pictograma de la sección activa gigante (70 vmin, anclado
  abajo a la derecha; círculo pistacho al 16 % y trazo verde oscuro al 8 %, el texto conserva su
  contraste) que entra con un fundido de 0,9 s al cambiar de sección (sin animación con movimiento
  reducido). El inicio no lleva pictograma. Decisión técnica: `position: fixed` + `z-index: -1`
  en vez de un fondo en `main`, porque `overflow: hidden` en el contenedor rompería los paneles
  pegajosos (tabla de contenido, panel de la rueda). Los bloques con tarjetas blancas siguen
  blancos: solo cambia el lienzo.
- **Catálogo compartido de pictogramas** (`src/components/Pictogramas/Pictogramas.jsx`):
  `TRAZOS_PICTOGRAMAS` (los 6 de la portada + ojo, marcador, libro, balanza y destello para El
  Observatorio, IBIM, Publicaciones, Riesgos y oportunidades e Innovación) y
  `resolverPictograma(id)` (las subsecciones tendencias-*/indicadores-* heredan el del eje).
  `IconoInicio` y `FondoModulo` lo consumen.
- **Menú temático con BOTÓN DIVIDIDO** en Tendencias e Indicadores (`NavDesplegable`): el rótulo
  navega a la PORTADA del eje (la misma de las tarjetas del inicio) y un cheurón aparte
  (`__desplegador`, `aria-expanded` + `aria-label` "Mostrar/Ocultar las opciones de…") abre el
  submenú; el hover del ratón sigue abriéndolo; Escape enfoca el cheurón; el estado activo
  (portada o subopción) se pinta sobre el grupo completo. En el panel móvil el cheurón mide 48×44 px
  con filete separador. Antes, tocar el rótulo solo abría el submenú.

### Cambiado
- **Banner de inicio**: DOCE fotografías (ocho nuevas de la carpeta fotos_1: Acuaparque Ditaires,
  Agencia de empleo de Rionegro, Hotel Recinto Quirama, Hotel y Parque Piedras Blancas y su lago,
  gimnasio y biblioteca Héctor González Mejía de la sede La Playa, Sede Educativa Girardot) en
  orden alternado de temas, con su pie de foto; esquinas INFERIORES redondeadas (1,75 rem; 3 rem
  desde 900 px) como el banner del portal de Comfenalco; carga por VENTANA (solo se montan la foto
  activa, sus dos vecinas y las ya vistas: la portada descarga 3 fotos, no 12; estado
  `{indice, montadas}` en una sola transición); bajo 640 px se ocultan los puntos (quedan las
  flechas). Peso total de las 24 WebP: 2,8 MB, servidos bajo demanda.
- **Tarjetas de "¿Qué desea explorar?"**: reacciona TODA la tarjeta al puntero y al foco interior:
  se eleva 6 px y crece un 2 %, gana sombra y borde pistacho, se tiñe con un degradado
  pistacho → verde agua bajo el contenido (pseudoelemento con z-index −1 en contexto aislado), la
  barra de acento se engrosa, el pictograma pasa a los dos verdes y la flecha avanza; clic
  redundante en cualquier punto de la tarjeta (el botón "Explorar" sigue siendo el control
  accesible y detiene la propagación). Con movimiento reducido solo cambian colores y sombra.
- **Pie de página CLARO**: fondo verde tenue (#e6eedb) sobre el degradado del portal, borde
  superior CÓNCAVO (SVG `viewBox 0 0 100 12` estirado a lo ancho, 2,25/3,25 rem: el fondo del
  portal se asoma en el centro), títulos verde oscuro con filete pistacho, listas COMPACTAS (filas
  de 34 px en ≥ 900 px con ratón; 44 px táctiles debajo; sin separación entre filas), rótulos de
  contacto en verde oscuro, redes en botones circulares verde oscuro → pistacho al pasar el
  puntero, franja legal blanca con filete gris.
- **Fondo del portal**: de blanco plano a degradado leve (ver Fondo de página por módulo);
  `--color-fondo` sigue blanco como base.

### Corregido
- **Servidor de desarrollo**: Vite vigilaba la biblioteca temporal `src/assets/_fotos_prueba/`
  (1,6 GB y un .zip que Windows mantiene bloqueado) y el vigilante moría con `EBUSY`, apagando el
  servidor en silencio: por eso "a veces" dejaban de verse las fotos del banner y de Tanques de
  pensamiento a mitad de sesión. `server.watch.ignored` en `vite.config.js` la excluye. No afecta
  al build ni al sitio publicado.

### Verificado
- `npm run lint` y `npm run build` en verde. Navegador (1280 y 375 px): sin scroll horizontal ni
  errores de consola; 12 puntos y 3 fotos montadas al abrir (todas cargadas); radio inferior del
  banner 48 px; clic en el rótulo "Tendencias" abre la portada del eje y marca el grupo activo; el
  cheurón alterna el submenú con aria-expanded; fondo fijo con pictograma en las secciones y sin
  él en el inicio; curva del pie de 52 px y filas de enlaces de 34 px en escritorio.

## [0.41.0] — 2026-09-21

Rediseño de la portada, el ancho y el pie del portal para acercarlo al sitio institucional de
Comfenalco Antioquia (petición del cliente 2026-09-21).

### Agregado
- **Banner de inicio con fotografías** (`src/modules/ModuloInicio/BannerInicio.jsx`, bloque
  `banner-inicio`): carrusel de SEIS fotografías de la biblioteca del cliente (Parque Los
  Tamarindos y su zona de camping —Occidente—, parque recreativo de Caucasia y escuela de
  patinaje —Bajo Cauca—, estimulación temprana en Puerto Berrío —Magdalena Medio—) elegidas
  por variedad de subregiones y servicios, en `src/assets/inicio/` como WebP 1920×1080 (q66,
  70–360 KB) más variante 960×540 para pantallas angostas (`srcset`/`sizes`). Velo verde
  degradado encima (0,92 → 0,50 de alfa de izquierda a derecha) para el contraste del texto:
  medido por muestreo en canvas sobre las seis fotos, el título blanco queda entre 5,1:1 y
  6,8:1 en el peor píxel según la foto (AA ≥ 4,5:1). Rotación automática cada 7 s con fundido CSS (solo
  cambia la opacidad de la foto activa; todas van apiladas, la primera con
  `fetchpriority=high` y las demás perezosas); flechas y puntos de 44 px; pie de foto con el
  lugar como región viva (`aria-live`); flechas del teclado sobre los controles; pausa al
  pasar el puntero, con foco dentro y con la pestaña oculta; cada cambio manual reinicia el
  temporizador; sin rotación ni fundido bajo `prefers-reduced-motion`.
- **Pictogramas estilo Comfenalco** en las tarjetas de "¿Qué desea explorar?"
  (`IconoInicio.jsx`, bloque `icono-inicio`): seis dibujos SVG propios de línea (tendencia,
  medidor, rueda de anillos, cronología, barras, bombilla) sobre un círculo gris desplazado
  abajo-izquierda, como los accesos del portal de Comfenalco; al pasar el puntero o enfocar la
  tarjeta el círculo pasa a pistacho claro (#dbe699) y el trazo a verde oscuro (dos tonos de
  verde). Contrato por variables CSS (`--icono-inicio-fondo`/`--icono-inicio-trazo`) que fija
  la tarjeta. Desde 1000 px la tarjeta se compone en horizontal (pictograma | texto). Los
  accesos y descripciones se conservan tal cual.
- **Sello "Vigilado Supersubsidio"** (`src/assets/marca/vigilado-supersubsidio.webp`, 900×139,
  21 KB, WebP sin pérdida con transparencia a partir del PNG oficial del sitio de Comfenalco)
  enlazado a https://www.ssf.gov.co/ (obligatorio para las cajas de compensación), a la derecha
  de la franja legal del pie.

### Cambiado
- **Ancho del portal**: `--ancho-maximo` pasa de 1200 a 1760 px (cabecera, menús, pie, portada,
  tendencias con mapa, portadas de eje, indicadores y factores de cambio ocupan la pantalla
  como el sitio de Comfenalco Antioquia). Nueva variable `--ancho-lectura` (1320 px) para los
  NUEVE artículos, la Línea de tiempo y los Tanques de pensamiento, de modo que las líneas de
  texto no pasen de ~100 caracteres.
- **Pie de página** rediseñado con la distribución del observatorio del Ceplan: cuatro columnas
  (presentación del Observatorio; enlaces de interés a las 11 secciones de ambos menús, en dos
  columnas; contacto de Comfenalco Antioquia; redes sociales con seis pictogramas propios de
  44 px) y franja legal BLANCA con los derechos reservados y el sello Vigilado. Datos de
  contacto tomados del portal de Comfenalco (canales de atención y listado de sedes 2025):
  Sede Administrativa Palacé, Carrera 50 # 53-43, Medellín; Área Metropolitana (604) 444 71 10;
  resto del departamento 01 8000 427 111; lunes a viernes 7:00 a. m.–5:00 p. m. y sábados
  8:00 a. m.–12:00 m.; portal www.comfenalcoantioquia.com.co; Facebook, Instagram, X, YouTube,
  TikTok y LinkedIn oficiales.
- **Imagotipo** de la cabecera: ahora es un enlace a https://www.comfenalcoantioquia.com.co/personas
  (pestaña nueva, texto oculto para lectores de pantalla; `URL_COMFENALCO_ANTIOQUIA` exportada
  de `Logo.jsx`). Hover con leve atenuación (el manual prohíbe recolorear o sombrear).
- **"Publicaciones"** retirada del menú desplegable: queda solo en el menú fijo (estaba repetida).
- Título del banner más grande (hasta 3,1 rem) con sombra suave; tarjetas de la portada con
  sombra al pasar el puntero.

### Verificado
- `npm run lint` y `npm run build` en verde. Navegador: 1280 px y 375 px sin scroll
  horizontal, consola sin errores; seis fotos cargadas y variante móvil servida en 375 px;
  enlaces del imagotipo y del sello correctos; menú desplegable con cinco opciones; 11 enlaces
  de interés en el pie; controles del banner y redes de 44 px; pictogramas cambian a los dos
  verdes al pasar el puntero (fill/stroke computados).
- Nada del código apunta a la carpeta temporal `src/assets/_fotos_prueba/` (excluida en
  `.gitignore`; el usuario la borrará).

## [0.40.3] — 2026-09-20

### Corregido
- **Ejemplo de nginx (`deploy/nginx-observatorio.conf.ejemplo`):** se retira el bloque `types { … }`
  del `server`. En nginx ese bloque REEMPLAZA la tabla de tipos MIME en lugar de ampliarla, con lo
  que `.html` pasaba a `application/octet-stream` y el navegador descargaba `index.html` en vez de
  renderizarlo (detectado en el primer despliegue real en el servidor de Comfenalco, Ubuntu 24.04 +
  nginx). El `mime.types` de la distribución ya cubre json/webp/xlsx/docx; `.json.gz` queda como
  binario opaco, que es lo que el portal espera.

## [0.40.2] — 2026-09-19

### Factores de cambio: línea de migas de la selección

- La línea sobre la rueda pasa a ser una **línea de migas de la
  selección** (ajuste del cliente): informa en qué punto del modelo se
  está — "Dimensión: Desarrollo Humano Integral › Componente estratégico:
  Desarrollo de capacidades humanas › Factor: Desarrollo humano centrado en
  la persona" — hasta el nivel elegido; sin selección muestra los tres
  niveles a secas. Va alineada a la izquierda sobre la rejilla rueda +
  panel, en letra pequeña (0,82 rem) y en UN solo renglón: entre 1100 y
  1199 px el rótulo "Componente estratégico" pasa a "Componente" por CSS
  para que quepa la ruta más larga del modelo, con recorte de puntos
  suspensivos como red de seguridad. Es informativa (texto, sin clics).
- Se retira la leyenda de anillos de la rueda de la 0.40.1 (botones que
  resaltaban un anillo): la rueda vuelve a no llevar leyenda propia.
- Verificado en navegador (1100, 1280 y 375 px): la ruta más larga del
  modelo cabe en un renglón en ambos anchos de escritorio con el rótulo
  que corresponde, la línea no existe en angosto, sin desborde y consola
  limpia; lint y build en verde.

## [0.40.1] — 2026-09-19

### Factores de cambio: leyenda en línea de migas y panel solo descriptivo

- La leyenda encima de la rueda pasa de botones-píldora a una **línea de
  migas de texto** al uso de las páginas web (ajuste del cliente):
  "Anillo interior: Dimensión › Banda intermedia: Componente estratégico
  › Anillo exterior: Factor de cambio", con los rótulos y el separador
  "›" en texto de apoyo y cada término como enlace de texto (verde
  oscuro, subrayado pistacho al pasar el puntero y al activarse). Es ante
  todo informativa, pero conserva la respuesta al clic: resalta su anillo,
  atenúa los otros dos y lleva el foco al primer arco (aria-pressed;
  objetivo de 44 px sin caja visible).
- El **panel de detalle deja de ofrecer navegación** (ajuste del cliente):
  se retiran las fichas navegables de la ruta y las listas de componentes
  o factores hijos; la ruta dimensión › componente se conserva como texto
  informativo con el punto de color de la dimensión. Toda la navegación
  del eje es desde la rueda; con ello el título del panel ya no necesita
  recibir el foco por código y el módulo pierde el componente FichaNodo.
- Verificado en navegador (1280 y 375 px): leyenda en una línea de texto
  con "›", término activo subrayado y 39 arcos atenuados al fijar
  "Dimensión", panel sin botones, sin desborde, consola limpia; lint y
  build en verde.

## [0.40.0] — 2026-09-19

### Factores de cambio: caracterización prospectiva de los 22 factores

- Cada factor de cambio suma su **caracterización** del anexo Excel del
  cliente (hojas D1_F1 … D5_F22): tres escenarios — **Pasado**
  (retrospectiva), **Presente** y **Futuro** — leídos bajo una de cuatro
  **agrupaciones regionales** (Global, Colombia, Antioquia y las 9
  subregiones de Antioquia) que se eligen con píldoras conmutables, el
  patrón de la barra de espacios de Tanques de pensamiento; la
  agrupación elegida se conserva al cambiar de factor y abre en
  Antioquia. Se suman también la **tipificación** del factor (tendencia,
  tendencia estructural, tendencia estructural emergente o hecho
  portador de futuro; como etiqueta bajo el título, con su
  justificación), la **síntesis prospectiva** y las **fuentes de
  información** en un desplegable con las URL enlazadas. Los indicadores
  y las referencias bibliográficas del anexo no se muestran (decisión
  del cliente).
- **Disposición.** En escritorio, al elegir un factor en la rueda la
  caracterización se abre a ANCHO COMPLETO bajo la rejilla rueda + panel
  (tres columnas, como la tabla del anexo) y el panel gana el botón "Ver
  la caracterización", que desplaza hasta ella y deja el foco en su
  título. En pantallas angostas va dentro del desplegable de cada factor
  del acordeón, con los tres escenarios apilados (nueva pieza compartida
  `CaracterizacionFactor` + bloque `caracterizacion-factor`).
- **Contenido generado por script** (scratchpad
  factores/generar-caracterizacion.mjs → `src/data/caracterizacion-factores.js`):
  transcripción literal de las celdas, retirando solo el rótulo regional
  con que empieza cada una ("Global.", "9 subregiones de Antioquia") porque
  en pantalla lo pone el filtro. **Fidelidad validada** (validar-caracterizacion.mjs):
  264 celdas carácter a carácter, 0 diferencias; 22 tipificaciones, 22
  síntesis y 117 fuentes (todas con URL).
- **Eficiencia de carga.** Los 340 KB de texto viven en un fragmento
  DIFERIDO propio (332 KB, 78 KB comprimido) que el módulo importa al
  montarse, en segundo plano: el eje sigue pintando con su fragmento de
  51 KB y, si el texto aún no llegó al elegir un factor, se muestra el
  cargador (con aviso y "Reintentar" ante un fallo de red).
- **Leyenda navegable encima de la rueda** (ajuste del cliente): la línea
  "Anillo interior: Dimensión · Banda intermedia: Componente estratégico ·
  Anillo exterior: Factor de cambio" pasa de pie a cabecera de la rueda y
  cada término es un botón-píldora (44 px, `aria-pressed`) que resalta su
  anillo — los otros dos se atenúan — y lleva el foco al primer arco de
  ese anillo; el puntero sobre el término lo previsualiza y elegir un arco
  despeja el resalte.
- El panel deja de numerar los elementos ("Factor de cambio 1 de 22":
  ajuste del cliente); conserva el rótulo del tipo. Las etiquetas
  accesibles de los arcos siguen numeradas para los lectores de pantalla.
- Por avisar al cliente (transcrito tal cual): en el factor 11
  (Legitimidad y confianza institucional) la celda Presente · Global habla
  de "las nueve subregiones de Antioquia" y de tendencias futuras (parece
  copiada del sitio equivocado); en los factores 3, 5, 10, 12, 13 y 15 los
  bloques de Colombia son muy cortos y arrancan como continuación del
  bloque global ("Este proceso…", "Estas dinámicas…"); y los rótulos
  regionales alternan con y sin punto y "9 Subregiones" con mayúscula (el
  portal los uniforma al retirarlos).
- Verificado en navegador (escritorio 1280 y móvil 375): leyenda encima de
  la rueda con botones de 44 px, sección de caracterización en tres
  columnas con el filtro, síntesis y fuentes (5 enlaces), foco correcto
  desde el botón del panel y desde la leyenda (39 arcos atenuados al
  fijar "Dimensión"), acordeón angosto con la variante apilada, sin
  desborde horizontal, consola limpia; lint y build en verde.

## [0.39.0] — 2026-09-19

### Sección IBIM: artículo "El bienestar también tiene geografía" (menú fijo)

- Nueva sección habilitada del menú fijo: **IBIM**, con el artículo "El
  bienestar también tiene geografía. Lectura territorial del Índice de
  Bienestar Multidimensional (IBiM) en Antioquia" (Antioquia, 2022) —
  contenido FIJO en el código con el patrón de los artículos del portal
  (rama propia en App.jsx como Benchmarking, sin antetítulo de contexto,
  tabla de contenido de navegación, texto justificado, referencias con
  sangría a la francesa y URL enlazadas). El JSX se GENERÓ por script
  desde el Word (scratchpad ibim/generar-modulo.mjs) para eliminar
  errores de transcripción.
- Estructura portada: título, subtítulo y fecha centrados; DOS citas
  destacadas (Hans Rosling y Amartya Sen, estilo "Cita destacada" del
  Word); 6 apartados de un solo nivel (índice de 7 entradas con
  Referencias); 40 párrafos; 13 figuras con rótulo "Figura N." en
  negrita, título plano y nota; 4 referencias (3 con URL).
- Las 13 figuras del Word (1448 × 1086 px, 21,4 MB en PNG) van como
  **WebP calidad 90** en `src/assets/ibim/` (1,67 MB, −92 %) con carga
  perezosa y caché inmutable; textos alternativos con las cifras que
  muestra cada figura.
- **Fidelidad validada por script** (scratchpad ibim/validar-fidelidad.mjs,
  render SSR de Vite contra los bloques extraídos con mammoth): 81
  bloques carácter a carácter, 0 diferencias.
- Ajustes de composición documentados: el rótulo de la Figura 13 viene
  partido en dos párrafos (se compone como los demás); las notas de las
  Figuras 9 y 10 no llevan el estilo de nota en el Word (se uniforman);
  los encabezados traen un espacio inicial (se recorta); los espacios de
  borde dentro de negritas quedan fuera de la etiqueta.
- Por avisar al cliente (transcrito tal cual): tres referencias dicen
  "Retrieved from" en inglés; "Gobernación de Antioquia ." lleva un
  espacio antes del punto; y en la primera referencia la editorial quedó
  dentro de la cursiva del título.
- Comentarios rezagados de App.jsx sobre la portada de Indicadores
  actualizados a los medidores simbólicos (0.34.1).

## [0.38.0] — 2026-09-19

### Imagotipo oficial de Comfenalco Antioquia

- El marcador de posición del logo (dos círculos + nombre en texto) se
  reemplaza por el **imagotipo oficial** entregado por el cliente. El
  archivo llegó como PNG de 371 × 136 px sobre fondo blanco; se preparó
  como **WebP sin pérdida con fondo transparente** a 1600 × 542 px en
  `src/assets/logo/comfenalco-antioquia.webp` (64 KB): escalado 8× con
  Lanczos y suavizado leve, canal alfa reconstruido a partir de la mezcla
  con el blanco (los dos colores de marca tienen un canal en cero, así que
  la distancia al blanco es la opacidad exacta) con el borde reafinado, y
  cada píxel llevado a su color de marca exacto (#005744 / #c4d600), los
  mismos del original. Verificado sobre blanco y sobre verde oscuro: sin
  halo ni franjas.
- `Logo.jsx` queda como único punto de cambio: una imagen con texto
  alternativo "Comfenalco Antioquia", dimensiones intrínsecas declaradas
  (sin saltos de maquetación) y carga con hash inmutable. El CSS fija solo
  la altura (3 rem; 2,4 rem bajo 480 px) y deja el ancho automático, en
  línea con la prohibición del manual de marca de distorsionar el
  imagotipo; la regla anterior que ocultaba el nombre en teléfonos ya no
  aplica (el nombre forma parte de la imagen).
- El favicon conserva el símbolo provisional SVG (pendiente un símbolo
  vectorial oficial si el cliente lo entrega).

## [0.37.0] — 2026-09-13

### dist/ portable a cualquier servidor (no solo Netlify)

- Revisión de portabilidad del despliegue: lo único atado a Netlify era
  `_headers` (cabeceras de seguridad y caché, que solo Netlify lee). El
  build ya era portable en lo demás: rutas RELATIVAS (`base: './'`,
  funciona en raíz o subcarpeta), sin rewrites, sin backend ni variables
  de entorno.
- `public/` ahora incluye — y Vite copia a `dist/` en cada build — los
  equivalentes que cada servidor lee automáticamente e ignora si no es
  el suyo: **`.htaccess`** para Apache (protegido con IfModule: sin el
  módulo no hay error 500, solo se omite esa parte; RemoveEncoding .gz
  para servir los .json.gz como binario opaco) y **`web.config`** para
  IIS (mimeMap con remove previo para no chocar con tipos ya
  declarados; `<location>` para assets y data). Ambos replican EXACTO lo
  de `_headers`: CSP y cabeceras de la auditoría 0.17.0, tipos MIME que
  algunas instalaciones no traen (.json, .webp, .gz, .xlsx, .docx) y la
  política de caché (assets inmutables un año; html y /data siempre
  frescos — clave para el contrato "el cliente reemplaza Excel/Word sin
  recompilar", que valida con HEAD).
- Para nginx (que no lee archivos dentro del sitio): ejemplo completo en
  `deploy/nginx-observatorio.conf.ejemplo` (con la nota de que
  add_header no se hereda en locations). Guía general en
  `deploy/README-despliegue.md` (tabla por servidor, notas de
  AllowOverride en Apache y comprobación rápida tras publicar);
  `_headers` remite a los cuatro lugares si se cambia una cabecera.
- Verificado: XML de web.config bien formado, build en verde con
  `.htaccess`, `web.config` y `_headers` presentes en dist/, y el
  empaquetado zip (Compress-Archive) incluye los tres; lint en verde.

## [0.36.0] — 2026-08-29

### La sección visible sobrevive a la recarga (estado por sesión)

- Recargar el portal (F5) ya no devuelve al inicio: la sección activa se
  guarda en **sessionStorage** con cada navegación y se restaura al
  cargar — sobrevive a la recarga pero muere al cerrar la pestaña, así
  que una visita nueva siempre abre en el inicio de la SPA (petición del
  cliente: no perder el punto de lectura ante un refresco accidental).
- Robustez: el id guardado se valida contra el catálogo de navegación
  (`existeSeccion`) — un id desconocido o viejo cae al inicio en vez del
  404 —, y toda lectura/escritura va en try/catch (sin almacenamiento de
  sesión, el portal se comporta como antes: recarga = inicio).
- Verificado en navegador: Benchmarking → F5 restaura Benchmarking;
  sesión limpia (visita nueva) → inicio; id inválido guardado → inicio
  sin errores de consola; lint y build en verde.

## [0.35.1] — 2026-08-29

### Tablero de Indicadores: tarjetas centradas en teléfonos

- En anchos de teléfono (~393 px) la tarjeta única del tablero llenaba
  el bloque de borde a borde y quedaba "pegada" a la derecha cuando el
  navegador dibuja barra de desplazamiento clásica (reporte del
  cliente). Bajo 520 px la rejilla pasa a UNA columna centrada de máximo
  340 px, con aire igual a ambos lados (verificado: 27/27 px en 393,
  45/45 px en 430, 20/20 px en 375); el espaciado de la rejilla ahora es
  fluido (clamp 0,9–1,25 rem). De 520 px en adelante el auto-ajuste
  sigue igual (2 columnas en 560, 5 en 1280).

### Tanques de pensamiento: reversión del acordeón y barra entre espacios

- **Reversión** (decisión del usuario): las secciones desplegables de la
  0.35.0 no convencieron; Objetivo, Temas abordados y Cuestionamientos
  claves vuelven al texto plano original (subtítulos con marcador
  pistacho, todo visible). Las referencias en letra menor de la 0.35.0
  se conservan.
- En su lugar, **barra pegajosa de navegación entre espacios**: píldoras
  "Espacio 1/2/3" sobre la cronología que quedan fijas bajo la cabecera
  (mide `--alto-cabecera`, patrón de la tabla de contenido) mientras se
  recorre la sección. El clic desplaza a la tarjeta descontando cabecera
  y barra (suave, salvo movimiento reducido) y enfoca su título
  (tabIndex -1); la píldora del espacio a la vista se marca activa
  (pistacho + aria-current, comparación directa de tres títulos en el
  evento de scroll).
- La barra va alineada al LADO DERECHO del módulo (ajuste del cliente:
  equilibra la espina verde de la cronología, que corre por la
  izquierda) y en teléfonos (<640 px) va CENTRADA (segundo ajuste del
  cliente; verificado 18 px de margen a cada lado en 375 y 430, y
  derecha intacta desde 768).
- Verificado en navegador (escritorio y 375 px): 0 acordeones, los 9
  subtítulos y todo el contenido visibles de nuevo, barra sticky a la
  altura de la cabecera (166 px) con su borde derecho alineado al del
  contenido (1217 px = 1217 px), clic en "Espacio 3" enfoca su título,
  píldoras de 44 px en una fila en móvil, sin desborde, consola limpia;
  lint y build en verde. (El desplazamiento programático es inerte con
  el panel oculto: se verificó el cálculo del destino y el foco, no el
  scrollY — límite documentado.)

## [0.35.0] — 2026-08-29

### Referencias más pequeñas en todo el portal y secciones desplegables en Tanques

- **Referencias en letra más pequeña** (petición del cliente): las
  entradas de referencia de todo el sitio bajan de 0,98 rem a
  **0,85 rem** (13,6 px, línea 1,6) — los 6 artículos de tendencias
  (Gasto social, Estructura familiar, Normatividad laboral, Economía
  circular, Hiper-personalización, Regulaciones ambientales), la sección
  Benchmarking y las referencias de los artículos con datos vivos
  (Envejecimiento e Informalidad, vía TextoDepartamento). Los títulos
  "Referencias" conservan su jerarquía; la leyenda de la Línea de tiempo
  ya estaba en 0,85 rem.
- **Tanques de pensamiento — secciones desplegables** (ajuste del
  cliente, para concentrar la lectura de cada bloque): dentro de cada
  tarjeta, Objetivo, Temas abordados y Cuestionamientos claves pasan a
  DESPLEGABLES con el patrón de acordeón de la Línea de tiempo (h3 >
  botón aria-expanded/aria-controls, contenido cerrado sin renderizar,
  varios abiertos a la vez, cheurón y marcador pistacho). Como incentivo
  de lectura, la cabecera lleva una **insignia con el conteo** ("5
  temas", "2 preguntas") que adelanta lo que hay dentro; la fecha y las
  fotografías del taller siguen siempre visibles como ancla de la
  tarjeta. Revelado suave y giro del cheurón anulados con
  `prefers-reduced-motion`; los enlaces vivos a Benchmarking y Factores
  de cambio quedan dentro de su sección de temas, intactos.
- Verificado en navegador (escritorio y 375 px): 9 desplegables (3 por
  espacio) cerrados al llegar, conteos correctos, abrir/cerrar monta y
  desmonta el contenido, botones ≥48 px, referencias de Benchmarking a
  13,6 px, sin desborde horizontal, consola limpia; lint y build en
  verde.

## [0.34.1] — 2026-08-29

### Tablero de Indicadores: medidores simbólicos, sin datos

- Los medidores del tablero dejan de marcar cifras reales (decisión del
  usuario: las cifras quemadas complicarían el mantenimiento futuro del
  portal — habría que actualizarlas a mano al reemplazar un Excel). Se
  retiran del catálogo y de la tarjeta la fracción, la cifra grande, el
  rótulo del índice y el detalle; queda título, descripción corta y
  Explorar.
- El medidor pasa a ser SIMBÓLICO: arco lleno a dos tercios y aguja en
  reposo a 58°; al pasar el puntero sobre la tarjeta, la aguja avanza a
  148° con una transición con rebote (0,7 s). Se conserva la animación
  de entrada (la tarjeta aparece y el medidor se enciende escalonado);
  con movimiento reducido, ni la entrada ni el hover mueven la aguja.
- Verificado en navegador: sin restos de los elementos de datos en el
  DOM, reposo del arco a 87,96 px (65 %) y aguja a 58° comprobados por
  cascada, regla de hover a 148° presente; lint y build en verde.

## [0.34.0] — 2026-08-29

### Portada del eje Indicadores: tablero de medidores con cifras reales

- Nueva sección viva: la entrada **Indicadores** del menú desplegable (y
  el Explorar del inicio) abre `ModuloIndicadores`, un tablero de cinco
  tarjetas-medidor — una por indicador — con un **medidor semicircular
  SVG propio** (pista, arco de acento y aguja pivotada) que marca la
  CIFRA REAL de Colombia en cada índice, extraída de los precalculados
  vigentes y cotejada con las cifras validadas de cada módulo:
  OCDE 3,89/10 (2025, puesto 36 de 38) · FNB 72,7/100 (2025, tendencial
  2050: 66,8) · Capital humano 0,281/1 (2025, a 2040: 0,386) ·
  EPI 48,8/100 (oficial 2026, puesto 48 de 177) · DQL 0,478/1 (2025, a
  2030: 0,525). Catálogo en `src/data/tablero-indicadores.js` — OJO: es
  un retrato quemado de los precalculados; si el cliente reemplaza un
  Excel de indicadores hay que actualizar la cifra ahí.
- Animación con el patrón de la Línea de tiempo (`--animado` solo con
  IntersectionObserver y sin movimiento reducido): cada tarjeta aparece
  escalonada y su medidor se llena — el arco avanza (stroke-dashoffset) y
  la aguja gira de 0 a su fracción — con retardo por tarjeta. El estado
  final vive en la regla base: sin script todo se ve completo.
- El medidor es decorativo (aria-hidden): la información real va como
  texto (cifra grande con unidad, rótulo del índice, detalle con año,
  fuente y proyección, y descripción del módulo). La cifra va DEBAJO del
  medidor, en flujo (la primera versión la superponía al lienzo y
  chocaba con la aguja y el pivote — corregido el mismo día). Botón Explorar con el
  patrón del inicio (píldora pistacho, ≥44 px, aria-label por indicador)
  que navega por onNavegar.
- Verificado en navegador: cascada CSS comprobada en ambos estados
  (reposo: arco vacío y aguja a 0°; visible: arco al 38,9 % y aguja a
  70° en la primera tarjeta, transiciones de 1 s con escalonado),
  navegación a Felicidad nacional bruta de punta a punta, 5 columnas en
  1280 y 1 en 375 sin desborde; lint y build en verde.

## [0.33.0] — 2026-08-29

### Inicio: las seis tarjetas navegan a secciones con contenido

- Las tres tarjetas de ejes aún en preparación (Riesgos y oportunidades,
  Publicaciones e Innovación) se reemplazan por tres secciones vivas del
  menú fijo (ajuste del cliente): **Línea de tiempo**, **Benchmarking** y
  **Tanques de pensamiento**, con descripciones cortas propias. Las seis
  tarjetas del inicio quedan "Disponible" y funcionales.
- ModuloInicio deja de mapear el menú desplegable y usa un catálogo
  propio `TARJETAS_INICIO` (id + etiqueta + descripción); el mecanismo
  del chip de estado (`EJES_DISPONIBLES`) se conserva por si se agrega
  una tarjeta de una sección aún vacía. Los modificadores de color del
  CSS pasan a los ids nuevos conservando el acento de cada posición
  (naranja/azul petróleo/verde medio).
- Verificado en navegador (escritorio y 375 px): las tres tarjetas
  nuevas navegan a su sección (títulos de pestaña comprobados), chips
  "Disponible" en las seis, acentos correctos, sin desborde horizontal;
  lint y build en verde.

## [0.32.3] — 2026-08-29

### Menú fijo: botón "Inicio" (petición del cliente)

- Se agrega **Inicio** como primera opción del menú fijo institucional
  (como en el observatorio del Ceplan): navega a la portada del portal y,
  estando en ella, se marca activo con aria-current. Una sola línea en el
  catálogo `OPCIONES_NAV_FIJO` (el id es el de la sección de inicio que
  ya existía); NavFijo, el estado activo y el panel móvil lo recogen sin
  cambios de código.
- Verificado en navegador: barra en una sola fila con las 7 opciones
  desde 920 px (donde entra el panel móvil hacia abajo), primera opción
  del panel móvil con cierre al elegir, navegación de ida y vuelta
  (Benchmarking → Inicio), consola limpia, sin desborde horizontal; lint
  y build en verde.

## [0.32.2] — 2026-08-29

### Tanques de pensamiento: ancho alineado con el resto del portal

- La introducción y la cronología del módulo tenían un tope de lectura de
  60 rem (960 px) que dejaba una franja vacía a la derecha, rompiendo la
  simetría con los demás módulos (ajuste del cliente). Se retiró el tope:
  ambas ocupan ahora el ancho completo del bloque (1200 px), y el borde
  derecho de las tarjetas queda alineado con el imagotipo de la cabecera
  (verificado al píxel: 1238 px en ambos a 1322 de viewport).
- Verificado en navegador (escritorio y 375 px): mosaico de fotos
  proporcionado (518×345 por foto), sin desborde horizontal, consola
  limpia; lint y build en verde.

## [0.32.1] — 2026-08-29

### Inicio: lema del hero actualizado al concepto del Observatorio

- El texto del hero del inicio se reemplaza por un resumen del documento
  conceptual del cliente ("El observatorio.docx", el mismo texto de la
  sección El Observatorio): el portal se presenta como plataforma de
  inteligencia estratégica que produce conocimiento prospectivo sobre el
  bienestar y anticipa tendencias, riesgos y oportunidades para las
  personas, las familias, las empresas y los territorios. Redacción de
  síntesis propia fiel a los conceptos del documento (antes describía
  "información sobre tendencias, indicadores…" del entorno colombiano).
- Verificado en navegador (escritorio y 375 px): el lema fluye sin
  desborde, consola limpia; lint y build en verde.

## [0.32.0] — 2026-08-29

### Portada del eje Tendencias: panal PESTEL con accesos directos

- Nueva sección viva: la entrada **Tendencias** del menú desplegable (y el
  botón Explorar del inicio) deja el aviso de construcción y abre el
  módulo `ModuloTendencias`, portada del eje con un **panal hexagonal del
  marco PESTEL** inspirado en el referente del cliente: seis hexágonos de
  punta arriba en anillo alrededor de un centro vacío (rótulo "PESTEL"),
  borde discontinuo guion-punto y relleno tenue del color de cada
  dimensión.
- Al elegir una dimensión, el panel lateral muestra su descripción y los
  **accesos directos** a las tendencias que agrupa (asignación del
  cliente): Política → Gasto social; Económica → Informalidad laboral y
  Economía circular; Social → Envejecimiento y Estructura familiar;
  Tecnológica → Hiper-personalización de servicios; Ecológica →
  Regulaciones ambientales; Legal → Normatividad laboral. Cada acceso
  navega a la sección viva de la tendencia (mismo contrato onNavegar de
  Tanques de pensamiento). Catálogo en `src/data/pestel-tendencias.js`.
- Interacción con el patrón de la rueda de factores: clic selecciona
  (aria-pressed), segundo clic deselecciona, lo no seleccionado se atenúa
  (el puntero o el foco lo restituyen). Los hexágonos son botones nativos
  posicionados por porcentaje sobre un lienzo con relación de aspecto
  fija (100×108): el panal escala completo sin recalcular geometría, con
  trazo de grosor constante (`vector-effect: non-scaling-stroke`). Orden
  de tabulación = acrónimo PESTEL (no el orden visual del anillo).
- Colores del manual de marca por dimensión (borde y relleno,
  decorativos) con variante de TEXTO oscurecida al mínimo para AA 4,5:1
  sobre blanco (original anotado en el catálogo): Económica
  #f3bc52→#9e6c0b, Social #ed7a3f→#c85013, Tecnológica #3399a3→#2b818a,
  Ecológica #58b250→#41853b, Legal #5eb2ae→#3e817e; Política usa el
  verde oscuro de marca (8,58:1 tal cual).
- Accesibilidad: botones nativos (Tab y Enter/Espacio sin código
  adicional), foco visible, objetivos táctiles ≥44 px (hexágono de
  114×132 px en 375), panel con aria-live="polite"; en pantallas
  angostas, al seleccionar, el panel apilado se acerca a la vista
  (scrollIntoView 'nearest', suave salvo con movimiento reducido).
- Verificado en navegador (escritorio 1280 y 375 px): los seis accesos
  navegan a su módulo destino, anillo bien compuesto (Social arriba,
  Tecnológica abajo), deselección y atenuado correctos, sin desborde
  horizontal, consola limpia; lint y build en verde.

## [0.31.0] — 2026-08-29

### Línea de tiempo: bosquejo actualizado del cliente y cascada de títulos

- Contenido actualizado al bosquejo entregado por el cliente el
  2026-08-29 ("Subsidio familiar y mirada territorial de Comfenalco
  Antioquia", nuevo subtítulo): la cronología pasa de 11 a **12 hitos** y
  suma la mirada territorial de la caja — nuevos "Inicia Comfenalco
  Antioquia" (1957, Mirada regional, 185 empresas y 1.000 trabajadores) y
  "Portafolio territorial" (2000s–Hoy, Comfenalco hoy, 26 programas);
  los hitos de 2024 ("Nuevas familias, nuevas necesidades"), 2025-2026
  ("Entorno PESTEL") y 2030 ("Modelo integral adaptativo") se reemplazan
  por "Más bienestar en Antioquia" (2024, Impacto regional, 870.000
  afiliados) y "Objetivo retador" (2030, Prospectiva). Los textos de los
  hitos que permanecen también se actualizan al bosquejo.
- Referencias: de 3 a **5 fuentes** (se agregan "Comfenalco Antioquia:
  Nuestra historia / Quiénes somos" y "Comfenalco Antioquia: Gestión
  social 2024"); la leyenda sobre la cronología las genera del catálogo,
  sin cambios de código.
- Paleta nueva muestreada del bosquejo (moda de color sobre cada
  distintivo, render a 2x del PDF): seis acentos cumplen AA tal cual y
  seis se oscurecieron lo mínimo —mismo tono, menos luminosidad— para el
  4,5:1 del texto blanco del distintivo y del color sobre blanco
  (originales anotados en el catálogo): Mirada regional #04848a→#048288,
  Bienestar social #399a4b→#318641, Bienestar integral #e94b1c→#d74115,
  Protección social 2002 #0c849b→#0c8299, Bienestar laboral
  #34a65c→#2a874b y Comfenalco hoy #d76934→#bf5826.
- Ajuste de composición documentado: el bosquejo corre el aporte en la
  línea de la etiqueta ("Aporte al bienestar: fortalece…"); como la
  tarjeta pone la etiqueta en línea propia, el aporte inicia con
  mayúscula (texto idéntico palabra por palabra). Rangos con guion largo
  como el bosquejo ("1999–2008", "2000s–Hoy").
- **Animación sutil de los títulos** (petición del cliente): al revelarse
  cada tarjeta, el año y el título entran en cascada con un leve
  deslizamiento escalonado y un filete del color de acento se traza bajo
  el título (nuevo elemento decorativo, visible siempre). Todo vive bajo
  el modificador `--animado`: sin JavaScript o con `prefers-reduced-motion`
  no actúa y el encabezado se ve completo de inmediato.
- **Tarjetas compactas** (ajuste del cliente: las tarjetas eran muy
  altas, sobre todo en pantallas pequeñas): se corrigió un relleno DOBLE
  en escritorio (la tarjeta conservaba su padding de antes de volverse
  desplegable, sumado al del botón de cabecera) y se ajustó la escala —
  título de clamp(1.25–1.5 rem) a clamp(1.05–1.2 rem), año de 1.05 a
  0.9 rem, rellenos y separación entre hitos reducidos, distintivo más
  esbelto y radio de 16 a 14 px. Tarjeta cerrada: de ~130 px a 86 px en
  escritorio y 78 px en móvil; el botón de cabecera se mantiene ≥44 px
  de objetivo táctil.
- Verificado en navegador (escritorio 1280 y 375 px): 12 hitos con su
  acento, leyenda con las 5 referencias, cascada con retardos
  0,2 s/0,32 s/0,6 s y relleno `backwards`, alturas de tarjeta 86/78 px,
  consola limpia, sin desborde horizontal; lint y build en verde.

## [0.30.0] — 2026-08-27

### Sección El Observatorio: concepto y funciones (menú fijo)

- Nueva sección habilitada del menú fijo: **El Observatorio**, con el
  texto conceptual del Observatorio de Futuro del Bienestar — contenido
  FIJO en el código con el patrón de artículo de Benchmarking: DOS
  niveles de encabezado (4 secciones h2 con filete pistacho: la
  conceptualización del bienestar, el ecosistema de bienestar, el
  Observatorio de Futuro con sus apartados de Conceptualización y
  Funciones, y los estudios de futuro como fundamento metodológico; 2
  apartados h3) y tabla de contenido jerarquizada (6 entradas).
- El documento no trae imágenes, tablas, fecha ni lista de referencias;
  las negritas de los términos clave ("Ecosistema del Bienestar",
  "gobernanza colaborativa", "inteligencia anticipatoria"…) son énfasis
  intencional del texto y SE CONSERVAN — los términos partidos en varias
  corridas de negrita del Word ("prospectiva estratégica", "vigilancia
  estratégica", "inteligencia anticipatoria") se componen como un solo
  énfasis. 29 párrafos justificados con 19 énfasis.
- **Fidelidad validada por script**: 32 bloques carácter a carácter, 0
  diferencias.
- Por avisar al cliente (erratas del Word, transcritas tal cual):
  "fortalecer las capacidades adaptativas de mediante procesos" (falta
  la palabra tras "de"), "el SIE pasa a para convertirse" (sobra "a" o
  "para"), y el documento cita autores (Godet, Miller, Ostrom, Ansell &
  Gash…) pero no trae lista de referencias, a diferencia de las demás
  secciones.
- Verificado en navegador (escritorio y 375 px): índice con 6 entradas
  en dos niveles, consola limpia, sin desborde horizontal; lint y build
  en verde.

## [0.29.0] — 2026-08-27

### Sección Tanques de pensamiento: cronología de los espacios del Tanque

- Nueva sección habilitada del menú fijo: **Tanques de pensamiento**,
  con la crónica de los tres espacios (talleres) del Tanque de
  Pensamiento Prospectivo de 2026. El contenido es una serie de eventos
  con estructura repetida, así que NO sigue el patrón de artículo: se
  compone como **cronología de tarjetas** (diseño propuesto y aprobado
  por el cliente) — espina vertical con degradado de marca (pistacho →
  verde agua), insignia numerada por espacio (pistacho con número verde
  oscuro, AA 5,3:1) y tarjetas con la fecha en ficha crema, las
  **fotografías reales del taller como ancla visual**, el objetivo, los
  temas abordados con viñetas pistacho y los **cuestionamientos claves
  como bloques de pregunta destacados** con filete pistacho.
- **Enlaces cruzados vivos**: dos temas del Espacio 2 ("Concepción del
  bienestar – Benchmarking" y "Factores de cambio") navegan a sus
  secciones reales del portal mediante la prop onNavegar (estado
  interno, como las tarjetas del inicio) — verificado en navegador.
- Las 5 fotografías van como WebP **calidad 82** (ajuste para
  fotografías: a 90 dos de ellas pesaban MÁS que el JPEG de origen) en
  `src/assets/tanques-pensamiento/` (0,93 MB → 0,48 MB, −48 %, calidad
  verificada) con recorte uniforme 3:2, carga perezosa y mosaico de dos
  columnas cuando el espacio tiene dos fotos.
- Aparición progresiva de las tarjetas al desplazarse (patrón de la
  Línea de tiempo, con los mismos respaldos: sin IntersectionObserver o
  con movimiento reducido todo queda visible). Un espacio nuevo del
  Tanque = una entrada más en el catálogo ESPACIOS del módulo.
- **Fidelidad validada por script**: 42 bloques carácter a carácter, 0
  diferencias. Ajustes de composición documentados: las etiquetas
  estructurales del Word ("Fecha de desarrollo", "Fotografías") se
  convierten en la propia interfaz, el objetivo del Espacio 2 viene en
  negrita accidental completa y se compone en peso normal, las fotos
  van al inicio de cada tarjeta como ancla visual y los estilos de
  viñeta mezclados se uniforman.
- Por avisar al cliente (erratas del Word, transcritas tal cual): "las
  realidades moderna", "¿Porque se caracterizarán?" y el duplicado "Se
  realizó se realizó" del Espacio 3.
- Verificado en navegador (escritorio y 375 px): 3 tarjetas con sus
  insignias y fechas, 5 fotos servidas, 18 temas y 8 preguntas, enlaces
  cruzados navegando, consola limpia, sin desborde horizontal; lint y
  build en verde.

## [0.28.0] — 2026-08-26

### Sección Benchmarking: artículo comparativo (segunda sección del menú fijo)

- Nueva sección habilitada del menú fijo: **Benchmarking**, con el
  artículo "Concepción del bienestar. Análisis comparativo" — contenido
  FIJO en el código con el mismo patrón de los artículos de tendencias.
  Se despacha con rama propia en App.jsx (como la Línea de tiempo) y su
  encabezado sigue la convención de las secciones del menú fijo (sin
  antetítulo de contexto).
- **Jerarquía de DOS niveles**, la primera en un artículo del portal
  aparte de Gasto social: 4 secciones (h2, con filete pistacho superior)
  y 8 apartados (h3); la tabla de contenido los muestra jerarquizados
  (5 entradas de primer nivel + 8 sangradas).
- **Figuras sin rótulo numerado**: el documento no numera sus imágenes;
  cada una lleva debajo su línea "Fuente:" tal cual el Word (nuevo
  elemento `__figura-fuente`). Las 5 imágenes del cuerpo (9 MB en PNG)
  van como WebP calidad 90 y máx. 1600 px en `src/assets/benchmarking/`
  (1,28 MB, −86 %, nitidez verificada); la sexta imagen del archivo es
  el logo del encabezado de página del Word y no se porta.
- 23 párrafos justificados y 21 referencias con sangría francesa (2 con
  DOI enlazado). **Fidelidad validada por script** (comparador adaptado
  al componente Imagen): 61 bloques carácter a carácter, 0 diferencias
  de contenido.
- Ajustes de composición documentados: el título "CONCEPCIÓN DEL
  BIENESTAR" viene duplicado al inicio del cuerpo (se compone una sola
  vez, en el encabezado), la línea decorativa de guiones bajos no se
  reproduce (la separación la pone el diseño), y las negritas parciales
  accidentales de algunas citas (paréntesis y espacios a medio
  ennegrecer) se componen en peso normal con el texto intacto.
- Por avisar al cliente (defectos del Word, transcritos tal cual): el
  encabezado "1.4.3. Ventajas Competitivas…" conserva una numeración
  suelta que el resto del documento no usa; los textos citan
  (Colsubsidio, 2026) y (Cafam, 2026) pero la lista de referencias no
  trae esas dos entradas; y hay erratas menores transcritas literales
  ("envejecimiento población masivo", "todo ell o sustentado", un
  paréntesis desbalanceado en la fuente de la segunda imagen y
  "(OECD, 2024; Ura et al., 2023).," con doble puntuación).
- Verificado en navegador (escritorio y 375 px): índice con 13 entradas
  en dos niveles, 5 imágenes servidas, consola limpia, sin desborde
  horizontal; lint y build en verde.

## [0.27.0] — 2026-08-24

### Octava tendencia: Regulaciones ambientales (artículo con contenido fijo)

- Nueva tendencia habilitada: **Regulaciones ambientales**, con el
  artículo "Colombia 2040: cuando el ambiente entra en la cuenta"
  (subtítulo "Prospectivas del fortalecimiento de la regulación
  ambiental para el bienestar integral", con entradilla centrada — el
  documento tampoco trae fecha). Mismo patrón de artículo fijo de
  Hiper-personalización; se despacha por MODULOS_TENDENCIA_PROPIOS.
- Estructura portada: 13 apartados, 54 párrafos justificados, 14 figuras
  con rótulo y nota, DOS citas destacadas centradas, UNA tabla de datos
  (los cinco elementos estratégicos de vigilancia, 4 columnas × 5 filas)
  con desplazamiento horizontal contenido, y 17 referencias con sangría
  francesa, todas con URL enlazada.
- Las 14 figuras del Word (14,7 MB en PNG) van como WebP calidad 90 y
  máx. 1600 px en `src/assets/regulaciones-ambientales/` (1,78 MB,
  −88 %, nitidez verificada) con carga perezosa y caché inmutable.
- **Fidelidad validada por script** (mismo comparador de
  Hiper-personalización): los 143 bloques del documento — párrafos,
  citas, rótulos, notas, celdas y referencias — coinciden carácter a
  carácter con el Word.
- Detalle del documento transcrito tal cual y por avisar al cliente: un
  párrafo del apartado "La huella deja de ser un dato invisible" termina
  con la cita "(Instituto de Hidrología, Meteorología y Estudios
  Ambientales." sin cerrar el paréntesis ni traer el año.
- Verificado en navegador (escritorio y 375 px): índice con 14
  entradas, 14 imágenes servidas, tabla con desplazamiento interior sin
  desborde de página, consola limpia; lint y build en verde.

## [0.26.0] — 2026-08-24

### Séptima tendencia: Hiper-personalización de servicios (artículo con contenido fijo)

- Nueva tendencia habilitada: **Hiper-personalización de servicios**, con
  el artículo "EL BIENESTAR DEJARÁ DE SER IGUAL PARA TODOS" (subtítulo
  "Prospectivas de la hiperpersonalización de servicios y el
  agenciamiento en Antioquia, 2026–2040", con entradilla centrada — el
  documento no trae fecha). Mismo patrón de artículo fijo de Economía
  circular; se despacha por MODULOS_TENDENCIA_PROPIOS.
- Estructura portada: 13 apartados, 55 párrafos justificados, 18 figuras
  con rótulo ("Figura N." en negrita + título plano) y nota, OCHO citas
  destacadas centradas con filetes pistacho y 26 referencias con sangría
  francesa (24 con URL enlazada mostrando la URL como texto).
- **Elemento nuevo: DOS tablas de datos** (indicadores y metas
  prospectivas; escenarios hacia 2040) compuestas como tablas HTML
  reales con encabezados th/scope, rótulo y nota al estilo de las
  figuras, y desplazamiento horizontal CONTENIDO en su propio
  contenedor en pantallas angostas (enfocable por teclado, nunca
  desborda la página).
- Las 18 figuras del Word (16,5 MB en PNG) van como **WebP calidad 90 y
  máx. 1600 px** en `src/assets/hiper-personalizacion/` (2,33 MB, −86 %,
  nitidez verificada) con carga perezosa y caché inmutable por hash.
- **Fidelidad validada por script** (nuevo validador de transcripción,
  scratchpad hiper-personalizacion/validar-fidelidad.mjs): los 211
  bloques del documento — párrafos, citas, rótulos, notas, celdas de
  tabla y referencias — coinciden carácter a carácter con el Word
  (las diferencias de espaciado del rótulo compuesto son composición
  deliberada).
- Detalles del documento transcritos tal cual y por avisar al cliente:
  el encabezado "Referencias" viene DUPLICADO (se compone una sola
  vez), un párrafo sobre los siete países latinoamericanos aparece casi
  duplicado en el apartado de confianza (se transcriben ambos), una
  referencia quedó huérfana y solo dice "Obtenido de <url>" (es la URL
  de la Ley 1581; se transcribe tal cual) y la nota de la Figura 16 no
  trae el prefijo "Nota." (el componente lo uniforma).
- Verificado en navegador (escritorio y 375 px): índice con 14
  entradas, 18 imágenes servidas, tablas con desplazamiento interior
  sin desborde de página, consola limpia; lint y build en verde.

## [0.25.1] — 2026-08-21

### Factores de cambio en pantallas angostas: acordeón en lugar de rueda

- Ajuste del cliente: en la disposición angosta (<1100 px) la rueda
  escalada no se veía bien y la navegación lista→panel resultaba
  confusa. La rueda y su leyenda ahora son EXCLUSIVAS del escritorio; en
  angosto el módulo presenta la jerarquía completa como un **acordeón de
  tres niveles** (dimensión → componente estratégico → factor, el patrón
  de la Línea de tiempo: encabezados h2/h3/h4 con botón interior
  aria-expanded y cheurón) donde cada elemento **despliega su texto en
  el sitio** — definiciones en los dos primeros niveles; resumen
  destacado y descripción en los factores — sin saltos de vista ni panel
  aparte.
- Plegado, solo las cinco dimensiones están en el orden de tabulación
  (el contenido cerrado no se renderiza); los desplegables son
  independientes (varios pueden quedar abiertos), los botones conservan
  los 44 px de objetivo táctil y el cheurón respeta el movimiento
  reducido.
- El panel de detalle también queda solo en escritorio; se retiraron el
  desplazamiento automático al panel y el umbral en JS que ya no hacían
  falta, y las reglas móviles de la rueda (ocultar rótulos, centro
  compensado) que quedaron muertas.
- Verificado en navegador: en 375 px la rueda y el panel no existen, el
  acordeón abre y cierra en los tres niveles con el texto en el sitio y
  sin desborde horizontal; en 1280 px la rueda, el panel pegajoso y la
  selección siguen intactos; consola limpia, lint y build en verde.

## [0.25.0] — 2026-08-20

### Eje "Factores de cambio": rueda interactiva del modelo (séptima sección habilitada)

- Nueva sección **Factores de cambio** (menú desplegable), inspirada en
  la rueda de megatendencias del observatorio del Ceplan pero construida
  desde el diagrama propio del cliente (PowerPoint "Presentación factores
  de cambio"): una rueda SVG propia (`RuedaFactores`, sin librerías, como
  el mapa de Colombia) de **tres anillos concéntricos** — 5 dimensiones
  en el anillo interior, 13 componentes estratégicos en la banda
  intermedia y 22 factores de cambio en el anillo exterior — con el ancho
  angular proporcional al número de factores (22 porciones iguales).
- **Contenido fijo en el código** (`src/data/factores-cambio.js`,
  generado por script desde el anexo Excel del cliente para eliminar
  errores de transcripción): definiciones de dimensiones y componentes y,
  por factor, las columnas "Resumen" y "Descripción" de la hoja
  "Descripción factores de cambio". Al elegir cualquier elemento, el
  panel de detalle muestra su texto; los factores llevan el resumen
  destacado (filete pistacho) antes de la descripción, y la ruta
  dimensión › componente aparece como fichas navegables.
- **Interacción:** cada arco es un botón real (Enter/Espacio, foco
  visible con trazo verde siguiendo la silueta, `aria-pressed`); el
  centro de la rueda anuncia el elemento bajo el puntero o el foco; al
  seleccionar, la familia del elemento queda en color pleno y el resto se
  atenúa; segundo clic deselecciona. Anuncio `aria-live` para lectores de
  pantalla.
- **Colores por computación** (validador del método de visualización +
  script propio de contraste): asignación de marca por dimensión
  (naranja, verde oscuro, amarillo, azul petróleo, verde agua) con
  separación para daltonismo ΔE ≥ 11 en todos los pares adyacentes de la
  rueda (piso recomendado 8; la asignación inicial naranja↔verde medio
  daba 4,2 y se descartó) y contraste AA verificado en cada par
  texto/fondo (mínimo real 4,83:1; el arco de la dimensión 4 se aclara
  mínimamente a #52a8b1, mismo criterio de la Línea de tiempo). Tintes
  por anillo documentados en `rueda-factores.css`.
- **Rótulos:** dimensiones en texto curvo sobre arco guía (1–2 líneas,
  invertido en la mitad inferior para no quedar boca abajo; todos caben
  con margen — peor caso 88 % del arco), factores en rótulos radiales
  tipo sunburst (hasta 4 líneas, ancho máximo 80 px de 86 disponibles).
- **Disposición:** escritorio (≥1100 px) rueda a la izquierda + panel
  pegajoso bajo la cabecera con desplazamiento interior (patrón de la
  tabla de contenido); en angosto, rueda arriba (acotada a 720 px),
  lista de botones por dimensión (objetivos táctiles 44 px) y panel al
  final con desplazamiento automático al elegir (suave salvo movimiento
  reducido). Los rótulos del SVG escalan con la rueda: los de factor se
  ocultan bajo 640 px y los de dimensión bajo 480 px, donde el centro
  compensa la escala y la lista es el selector legible.
- Habilitada en `App.jsx` (rama propia + carga diferida) y anunciada
  "Disponible" en la tarjeta del inicio (`EJES_DISPONIBLES`).
- **Corrección transversal:** 11 reglas CSS en 7 archivos usaban la
  variable inexistente `--fuente-titulos` (la real es `--font-titulos`),
  con lo que esos títulos caían en silencio a Catamaran en vez de Mitr
  (títulos de artículo, citas destacadas, tabla de contenido, rótulos de
  la Línea de tiempo). Corregidas todas las referencias.
- **Revisión cruzada aplicada** (cuatro frentes — correctitud,
  accesibilidad, convenciones y fidelidad de datos — con verificación
  adversarial de cada hallazgo; la fidelidad de los 22 textos contra el
  anexo se confirmó sin discrepancias): tabindex ITINERANTE en la rueda
  (patrón del mapa de Colombia: una sola parada de Tab y las flechas +
  Inicio/Fin recorren los 40 arcos), foco visible sobre el arco verde
  oscuro de la dimensión 2 (contorno pistacho; trazo oscuro en su
  banda), el panel vuelve al inicio de su desplazamiento interior al
  cambiar de selección y el foco pasa a su título cuando la activación
  desmonta la ficha pulsada o se elige desde la lista angosta, los 13
  componentes entraron a la lista angosta (su banda queda de ~15 px al
  escalar la rueda; la lista es su objetivo táctil equivalente de
  44 px), anuncio con concordancia ("Dimensión seleccionada"), paleta
  --fc-* declarada UNA sola vez en la raíz del módulo (cascada a la
  rueda, puntos y fichas), estados activos como modificadores BEM (no
  selectores de atributo), utilidad global `oculto-accesible` en el
  anuncio y `NOMBRES_TIPO` único exportado del catálogo.
- **Corrección transversal 2:** el antetítulo de contexto ("Tendencias"
  / "Ejes temáticos") de los cuatro módulos-artículo y del eje nuevo iba
  en verde agua sobre blanco (2,1:1, bajo el AA): ahora en verde oscuro
  (8,6:1), como ya hacía el módulo compartido de tendencias.
- Verificado en navegador (1280 y 375): 40 arcos, consola limpia, sin
  desborde horizontal, interacción completa con puntero y teclado
  (flechas incluidas), hover del centro con retorno al estado de reposo,
  panel pegajoso con reinicio de desplazamiento, lista móvil completa
  con objetivos de 44 px y foco recolocado; lint y build en verde.

## [0.24.1] — 2026-08-19

### Botón flotante "subir" a la tabla de contenido (pantallas angostas)

- En los cuatro artículos, un botón flotante circular (48 px, verde
  oscuro con flecha blanca) aparece en la esquina inferior derecha tras
  avanzar en la lectura (más de 700 px de desplazamiento) y vuelve a la
  tabla de contenido con desplazamiento suave (instantáneo con
  movimiento reducido), dejando el foco en el botón "Contenido": abrirla
  queda a un solo toque, también con teclado y lector de pantalla.
- Solo existe en pantallas angostas (<1100 px): en escritorio la columna
  pegajosa ya acompaña la lectura. Respeta las zonas seguras de los
  teléfonos (safe-area-inset) y se apila por debajo de la cabecera.
- Verificado en 375 px: oculto al inicio, aparece tras el umbral
  (48×48 px, aria-label "Volver a la tabla de contenido"), el clic deja
  el foco en el botón "Contenido", y en escritorio queda oculto por CSS;
  lint y build en verde.

## [0.24.0] — 2026-08-19

### Tabla de contenido en los cuatro artículos de tendencias

- Los módulos-artículo (Gasto social, Estructura familiar, Normatividad
  laboral y Economía circular) ganan una **tabla de contenido de
  navegación** al estilo del panel de Word (petición del cliente), con el
  nuevo componente compartido `TablaContenido` + el bloque de rejilla
  `articulo-con-indice` (mismo archivo CSS: forman una sola pieza).
- **Escritorio (≥1100 px):** columna izquierda de 260 px PEGAJOSA que
  acompaña la lectura (descuenta la altura real de la cabecera, medida
  en vivo), con la sección activa resaltada por scrollspy
  (IntersectionObserver con el respaldo de siempre) — barra de acento
  pistacho + verde oscuro y `aria-current`.
- **Pantallas angostas (<1100 px):** desplegable "Contenido" al inicio
  del artículo (patrón de acordeón de la Línea de tiempo, botón 44 px
  con aria-expanded); elegir un apartado navega y cierra el desplegable.
- El índice **lee los apartados del artículo renderizado** (h2/h3 de la
  ref): una sola fuente de verdad, sin listas duplicadas; asigna ids
  estables y jerarquiza en dos niveles (las secciones h2 de Gasto social
  sin sangría, los apartados h3 sangrados). El clic desplaza suave
  (instantáneo con movimiento reducido) descontando la cabecera pegajosa
  y mueve el foco al título de destino (tabindex -1 + foco visible).
- Los cuatro paneles ceden su margen superior a la rejilla compartida
  (sin doble margen); `scroll-margin-top` como respaldo de anclaje.
- Verificado en navegador: 22/12/13/14 entradas según el artículo,
  columna pegajosa con botón oculto en escritorio, desplegable
  abre-elige-cierra en 375 px, cálculo del destino de scroll correcto
  (posición del título − cabecera − 12 px), foco y resaltado activos,
  cero desborde; lint y build en verde. (El desplazamiento animado no es
  observable en el panel de verificación oculto — limitación del
  entorno, no del código.)

## [0.23.0] — 2026-08-19

### Sexta tendencia: Economía circular (artículo con contenido fijo)

- Nueva tendencia habilitada: **Economía circular**, con el artículo
  "Prospectivas de Ecología y Economía Circular en Colombia" (subtítulo
  "Residuos, productividad material, clima, territorio y convergencia
  regulatoria", fecha "07-julio-2026"). Mismo patrón de artículo fijo;
  se despacha por MODULOS_TENDENCIA_PROPIOS.
- Estructura portada: 13 apartados (12 con estilo de título del Word más
  el encabezado en negrita "El metabolismo circular: menos huella, más
  recuperación", que el documento trae como párrafo en negrita y aquí se
  compone como apartado), 61 párrafos justificados, 16 figuras con
  rótulo y nota, SIETE citas destacadas centradas y 30 referencias con
  sangría a la francesa (28 con URL enlazada; las 2 bases de trabajo
  internas del Observatorio van sin enlace, como en el documento).
- **Figuras optimizadas a WebP calidad 90** (máx. 1600 px): de 25,6 MB
  en PNG a 1,72 MB totales (−93 %), nitidez verificada visualmente en la
  matriz de convergencia (figura 14: 2.216 KB → 151 KB).
- Ajuste mínimo documentado: la nota de la Figura 6 termina en el Word
  con la palabra suelta "GLOSARIO" (resto de edición sin contenido
  asociado); se omite en el portal — avisar al cliente.
- Verificado en navegador (escritorio y móvil 375): estructura completa,
  WebP servido, cero desborde, consola limpia; lint y build en verde.

## [0.22.0] — 2026-08-19

### Quinta tendencia: Normatividad laboral (artículo con contenido fijo)

- Nueva tendencia habilitada: **Normatividad laboral**, con el artículo
  "Prospectivas de cambios en normas laborales en Colombia, 2026-2050"
  (subtítulo y fecha "3-julio-2026" del documento). Mismo patrón de
  artículo fijo de Gasto social y Estructura familiar: contenido quemado
  en el código, sin lecturas de .docx/.json en runtime; se despacha por
  MODULOS_TENDENCIA_PROPIOS.
- Estructura portada: 12 apartados, 45 párrafos justificados, 14 figuras
  con rótulo ("Figura N." en negrita) y nota al pie, DOS citas
  destacadas centradas (elemento nuevo de este artículo: blockquote con
  filetes de pistacho, Mitr verde oscuro) y 8 referencias con URL
  enlazadas (la URL siempre como texto visible).
- **Figuras optimizadas a WebP calidad 90** (ancho máximo 1600 px): de
  19,4 MB en PNG a 1,76 MB totales (−91 %), nitidez del texto verificada
  visualmente en la más pesada (figura 13: 2.248 KB → 181 KB). Carga
  perezosa y caché inmutable por hash.
- Fidelidad documentada: en el Word la Figura 6 incrusta LA MISMA imagen
  de la Figura 1 (probable error del documento — avisar al cliente); se
  porta tal cual. Las Figuras 1 y 11 comparten título similar ("Frentes
  normativos prioritarios") con imágenes distintas, como en el original.
- Verificado en navegador (escritorio y móvil 375): estructura completa,
  WebP servido, cero desborde, consola limpia; lint y build en verde.

## [0.21.0] — 2026-08-17

### Tarjetas desplegables en la Línea de tiempo

- Las tarjetas de la Línea de tiempo pasan a ser DESPLEGABLES
  (recomendación del cliente): cerradas muestran solo el año y el título;
  al pulsarlas se revela la descripción, el aporte al bienestar y las
  citas [n]. Con esto queda resuelta la definición pendiente sobre si las
  tarjetas serían informativas o interactivas.
- Implementación con el patrón de acordeón accesible: el título conserva
  su jerarquía (h2) y contiene el botón de revelación (aria-expanded +
  aria-controls, foco visible, cabecera completa como objetivo de
  pulsación ≥44 px); cheurón que gira al abrir (solo visual, el estado lo
  anuncia aria-expanded); varias tarjetas pueden abrirse a la vez (estado
  independiente por tarjeta); despliegue con deslizamiento suave anulado
  bajo movimiento reducido. El separador bajo el título ahora encabeza el
  contenido revelado (cerradas no muestran línea colgante).
- Verificado en navegador: 11 tarjetas cerradas al abrir el módulo,
  conmutación correcta (abrir/cerrar/reabrir), vínculo aria-controls
  válido, las demás tarjetas permanecen cerradas al abrir una, sin
  desborde en móvil 375 y consola limpia.

## [0.20.1] — 2026-08-17

### Referencias de la Línea de tiempo arriba de la cronología

- La banda de referencias de la Línea de tiempo pasa del pie a la parte
  superior, entre el subtítulo y la cronología (ajuste del cliente): así
  el lector conoce el significado de los rótulos [1], [2], [3] antes de
  encontrarlos en las tarjetas. Conserva la banda de tinta del bosquejo;
  el bloque pasa de `<footer>` a `<aside>` con rótulo accesible
  "Referencias de la cronología". Verificado en escritorio y móvil
  (orden correcto, sin desborde, consola limpia).

## [0.20.0] — 2026-08-17

### Cuarta tendencia: Estructura familiar (artículo con contenido fijo)

- Nueva tendencia habilitada: **Estructura familiar**, con el artículo
  "La familia colombiana ya no cabe en una sola imagen. Cambios en la
  estructura familiar y prospectiva hacia 2050-2060" (incluida su fecha
  "02-julio-2026", como en el documento). Mismo patrón de artículo fijo
  de Gasto social: contenido quemado en el código, sin lecturas de
  .docx/.json en runtime; se despacha por MODULOS_TENDENCIA_PROPIOS.
- Estructura portada: título/subtítulo/fecha centrados, 10 apartados,
  37 párrafos justificados, 12 figuras con rótulo ("Figura N." en
  negrita, como el documento) y nota al pie, y 7 referencias
  bibliográficas con sangría a la francesa (sin URL en este artículo;
  sin ecuaciones).
- **Figuras optimizadas a WebP calidad 90** (ancho máximo 1600 px): de
  4,9 MB en PNG a 0,96 MB totales (−80 %), con la nitidez del texto
  verificada visualmente en la conversión más agresiva (figura 11:
  1.010 KB → 86 KB). Carga perezosa y caché inmutable por hash. La
  imagen 13 del Word no está referenciada en el texto y no se porta.
- Verificado en navegador (escritorio y móvil 375): estructura completa,
  imágenes servidas, cero desborde, consola limpia; lint y build en
  verde.
- Nota de catálogo: el menú trae "Estructura familiar" y "Cambios
  estructura familiar" como tendencias distintas; este artículo (carpeta
  1.4_Cambios_estructura_familiar del cliente) quedó en la primera por
  indicación del usuario. Si el cliente lo quería en la segunda, basta
  mover el slug en MODULOS_TENDENCIA_PROPIOS y TENDENCIAS_HABILITADAS.

## [0.19.1] — 2026-08-17

### Informalidad laboral con el formato de artículo

- La tendencia Informalidad laboral activa el mismo `formatoArticulo` de
  Envejecimiento: cada sección de ciudad muestra su título propio (el
  primer párrafo, en Mitr verde oscuro), los párrafos justificados y su
  bloque "Referencias" con sangría a la francesa y URL enlazadas. La
  estructura del artículo ya encajaba con el clasificador (verificado
  contra el precalculado: 23 secciones con título y referencias propias;
  sin líneas "Fuente:", esa regla no aplica aquí). Sin cambios en el
  documento del cliente ni en su contrato de reemplazo.
- Verificado en navegador con Medellín y Bogotá: título, 3 párrafos,
  referencias enlazadas y la serie intacta; consola limpia.

## [0.19.0] — 2026-08-17

### Envejecimiento: análisis por departamento desde el documento único

- La tendencia Envejecimiento pasa del esquema "un Word por departamento"
  al **documento único con secciones** (`articulo-envejecimiento.docx`,
  el artículo del cliente con las 33 secciones tituladas con el nombre
  del departamento a secas). Conserva la vía Word→JSON del build: el
  precalculado del artículo viaja en 32 KB comprimidos y el cliente puede
  reemplazar el Word en el servidor sin recompilar (la interpretación de
  respaldo sigue disponible).
- El detector de títulos de sección gana la bandera por tendencia
  `titulosDepartamentoASecas`: con ella, los 33 nombres del catálogo
  valen como título directo ("Antioquia", "Boyacá"…). "Bogotá, D.C." casa
  por normalización con el catálogo y "Archipiélago de San Andrés" se
  declara en `titulosDirectos` (el catálogo lo nombra "San Andrés y
  Providencia"). Las tendencias sin la bandera conservan la protección
  anterior (un nombre suelto jamás abre sección).
- El cuadro de análisis (`TextoDepartamento`) gana el **formato de
  artículo** de Gasto social, activado por tendencia (`formatoArticulo`):
  el primer párrafo de la sección es su título propio (Mitr, verde
  oscuro), las líneas "Fuente: …" van como nota, y tras "Referencias"
  cada entrada lleva sangría a la francesa con sus URL convertidas en
  enlaces (target _blank + rel noreferrer). Por seguridad, los enlaces
  muestran SIEMPRE la propia URL como texto: un documento manipulado no
  puede disfrazar un destino con un rótulo inocente. Informalidad
  mantiene su renderizado plano actual (sin la bandera).
- Los archivos del esquema anterior (`antioquia.docx` y su precalculado)
  se retiran; las imágenes del Word (pirámides estáticas por
  departamento) no se usan: el módulo conserva sus pirámides interactivas
  y toma del documento el texto y las referencias.
- Verificado en navegador: Antioquia, Bogotá y San Andrés con título,
  3 párrafos, fuente, y referencias enlazadas; 33/33 títulos de sección
  presentes en el precalculado; consola limpia; lint y build en verde.
- Pendiente para el cliente: el artículo trae además una introducción
  general (con la Tabla 1 y las Figuras 1–3 nacionales) que hoy no se
  muestra en el portal; si se quiere publicar, iría como artículo fijo al
  estilo de Gasto social (decisión por definir).

## [0.18.0] — 2026-08-17

### Tercera tendencia: Gasto social (artículo con contenido fijo)

- Nueva tendencia habilitada: **Gasto social**, con el artículo
  "Proyección del gasto social público en Colombia, 2025–2050: un modelo
  VAR composicional con choque estructural". A diferencia de las demás
  tendencias, su contenido es FIJO en el código (decisión del cliente:
  el documento no variará y así carga al instante): no lee .docx ni
  .json en tiempo de ejecución — el texto viaja en el bundle del módulo,
  las 14 figuras son imágenes estáticas con hash (caché inmutable) y
  carga diferida, y las 7 ecuaciones se componen con HTML/CSS propios
  (fracciones, sumatorias con índice, subíndices y primas siguiendo la
  estructura OMML del documento; pila serif matemática con Cambria Math
  primero; cada una con lectura textual accesible vía role="img").
- El texto es transcripción literal del Word del cliente, incluidos sus
  guiones y el encabezado "Un modelo para datos" tal como está en el
  original. Marcadores de cita [1]–[8] en negrita como en el documento;
  8 referencias con enlaces externos (target _blank + rel noreferrer).
  Dos ajustes mínimos de composición documentados: el exponente 2 de la
  ecuación del encogimiento se muestra como superíndice y la ecuación
  softmax cierra su paréntesis (en el Word están como texto a nivel de
  línea y sin cerrar, respectivamente).
- Arquitectura: nuevo mapa `MODULOS_TENDENCIA_PROPIOS` en App.jsx para
  tendencias-artículo con módulo propio (el resto sigue usando el módulo
  compartido de mapa y gráficas); slug añadido a TENDENCIAS_HABILITADAS.
  El módulo es diferido como los demás.
- Verificado en navegador (escritorio 1280 y móvil 375): estructura
  completa (3 secciones, 19 apartados, 76 párrafos, 6 ecuaciones de
  bloque + 7 en línea, 14 figuras, 8 referencias), imágenes servidas
  correctamente, cero desborde horizontal y consola limpia; lint y build
  en verde.

## [0.17.0] — 2026-08-15

### Auditoría de seguridad: escape de figuras, cabeceras de despliegue y dependencias

Análisis de seguridad integral (SPA estática sin backend). Modelo de
amenazas central: los .xlsx/.docx que el cliente reemplaza en el
servidor sin recompilar son entrada semi-confiable. Hallazgos
verificados —el escape, probado en el navegador contra vectores reales;
la CSP, validada funcionalmente inyectándola como meta y ejercitando
Plotly, el worker, los JSON del mismo origen y las fuentes—:

**Inyección en figuras (media) — corregida**

- Plotly renderiza un subconjunto de pseudo-HTML en hover, anotaciones,
  nombres de traza (leyenda) y títulos de eje que incluye `<a href>`
  (enlaces clicables) y `<span style>` (CSS). Los nombres de país,
  entidad, los encabezados de columna y las unidades que vienen del
  Excel se interpolaban SIN escapar en cinco servicios
  (`desempenoAmbientalService`, `vidaDigitalService`, `felicidadService`,
  `capitalHumanoService`, `vidaMejorFiguras`). Un nombre malicioso en un
  Excel publicado sin recompilar podía inyectar enlaces de phishing o
  suplantación visual dentro de una figura del portal (no hay ejecución
  de JavaScript: Plotly bloquea el protocolo `javascript:` y no crea
  `<img>`/`<script>` desde texto). Se añade el helper común
  `textoFigura.escaparTextoFigura`, aplicado en el punto de interpolación
  de cada figura (no en la normalización, para que React siga mostrando
  los nombres legítimos con sus `&` intactos en desplegables y tablas).
  Probado en navegador: `<a href>`, `<span style>` y un `&lt;` ya
  codificado quedan como texto inerte; "Chile"/"Colombia"/"Mexico" se
  ven intactos.

**Cabeceras de seguridad (media) — añadidas**

- El despliegue no enviaba ninguna cabecera de seguridad. Se agrega
  `public/_headers` (Vite lo copia a `dist/`, Netlify lo aplica) con una
  Content-Security-Policy estricta —sin `unsafe-eval` (verificado: cero
  `eval`/`new Function` ejecutables en el bundle), `worker-src 'self'`
  (worker de mismo origen), `object-src 'none'`, `frame-ancestors 'none'`,
  `base-uri`/`form-action 'self'`—, más `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy` y `Permissions-Policy`, y las
  reglas de caché (`/data/*` sin caché para la validación por HEAD,
  `/assets/*` inmutable). En el servidor propio de Comfenalco hay que
  trasladar estas mismas cabeceras a su configuración (el `_headers` solo
  lo lee Netlify). CSP validada en el navegador sin romper ninguna vista.

**Dependencias y cadena de suministro**

- `npm audit fix`: resuelta la única vulnerabilidad (nanoid <3.3.18, alta,
  transitiva de vite→postcss; solo build, no viaja al navegador). Estado
  final: 0 vulnerabilidades.
- Verificado: el tarball de SheetJS (`xlsx` 0.20.3 desde cdn.sheetjs.com
  —única vía de la versión parcheada frente a CVE-2023-30533 y
  CVE-2024-22363; npm quedó en 0.18.5 vulnerable—) lleva su hash SHA-512
  de integridad en `package-lock.json`, así que `npm ci` rechazaría un
  tarball manipulado. Recomendación de proceso: usar `npm ci` en los
  builds de entrega y cotejar el hash al subir de versión.
- Sin secretos ni `.env` en el repo; `dist/` publica solo estáticos
  esperados (sin sourcemaps, sin `.git`); mammoth usa solo
  `extractRawText` (texto plano); cero `dangerouslySetInnerHTML`/`eval`
  en `src/`; sin prototype pollution (asignaciones por clave dinámica solo
  con primitivos). URLs de datos armadas solo con slugs de catálogos
  internos: sin path traversal.

**Pendiente recomendado (no aplicado, decisión del cliente):**
autohospedar las tipografías Mitr y Catamaran para no exponer la IP de
cada visitante a Google Fonts y poder cerrar `style-src`/`font-src` sin
terceros.

## [0.16.0] — 2026-08-15

### Auditoría QA integral: correcciones de robustez, contraste y limpieza

Auditoría de calidad sobre todo el portal (código estático por tres
frentes —servicios de datos y simulación, componentes React, cadena de
carga/precálculo— más pruebas reales en navegador de las 12 vistas de
indicadores, 2 tendencias y Línea de tiempo, en escritorio 1280 y móvil
375). Las pruebas de runtime pasaron completas sin errores; los
hallazgos del código, todos verificados contra el código real antes de
corregirse:

**Correcciones funcionales**

- Treemap del EPI: la fórmula de contraste de `colorTextoSobre` usaba un
  denominador errado (0,0092 en lugar de 0,0772 = luminancia de
  `#22312c` + 0,05), con lo que el texto oscuro se "aprobaba" ~8× por
  encima de su contraste real y las cajas más oscuras llevaban rótulo
  oscuro con contraste 2,2:1 (violaba la decisión AA del proyecto).
  Verificado tras el arreglo: 38 cajas rotuladas, la peor en 4,53:1 y
  cero por debajo de AA (la caja más profunda ahora rotula en blanco).
- Informalidad: una celda de tasa vacía en un Excel reemplazado (null
  canónico de la normalización) reventaba la figura con `TypeError` en
  los `.toFixed` del hover; ahora la serie incompleta cae al aviso "sin
  datos" ya existente. Además, los intervalos de confianza se alinean
  por AÑO contra la hoja de tasas (antes era por posición: una fila de
  más o de menos en `IC_95pct` desplazaba la banda del 95 % en
  silencio).
- Cadena de carga: una página HTML de error 5xx del servidor ya no se
  disfraza de "en preparación" (se exige `respuesta.ok` en la rama HTML
  de excelService y docxService; cierra el pendiente "distinguir 503 de
  404"); la firma de la caché IndexedDB se construye desde el HEAD (las
  cabeceras del GET pueden diferir con compresión intermedia y forzaban
  reinterpretaciones eternas); un abort de transacción de IndexedDB
  (cuota llena) ya no deja la promesa colgada con el módulo cargando
  para siempre (`transaccion.onabort` en lectura y escritura); un HEAD
  404 en `tamanoPublicado` corta la vía sin disparar el rango ni sumar
  404 extra a la consola; y el worker maneja `messageerror`.
- Script de precálculo: ignora los archivos de bloqueo de Office
  (`~$…`, presentes cuando la base está abierta en Excel al compilar) y
  envuelve cada archivo en try/catch — un .xlsx/.docx corrupto nombra el
  archivo exacto y termina el build con error en lugar de morir con un
  stack anónimo (verificado con archivo de bloqueo y zip corrupto);
  además borra el precalculado huérfano de una base que dejó de
  reconocerse.
- FNB: el año del radar se sanea contra los hitos que la base cubre (si
  un Excel reemplazado no llega a 2025, cae al último año disponible en
  lugar de dibujar el radar en ceros con el selector en blanco); PCHIP
  tolera abscisas duplicadas (año puente repetido en base regenerada
  producía una curva entera de NaN); y en la simulación,
  `cambios.map(escalaRobusta)` colaba el índice del `map` como
  `minimoUnico` (latente hoy, inconsistente con la llamada correcta del
  DQL).

**Mejoras y limpieza**

- Treemap del EPI: el globito se actualiza como mucho una vez por cuadro
  de animación (antes cada `mousemove` re-renderizaba el módulo entero),
  con cancelación al salir del lienzo y al desmontar.
- SelectorCampo: eliminada la selección múltiple muerta (`multiple`,
  `filas`, `ayuda` y su CSS) — fue rechazada por el cliente y ningún
  llamador la usaba; cabecera actualizada con los patrones vigentes
  (píldoras / cápsulas).
- Claves de párrafos por índice en los cinco módulos con texto (dos
  párrafos del Word con el mismo arranque duplicaban la clave).
- DQL: cabeceras y comentarios actualizados al tope real de 3 países; la
  descripción y la etiqueta accesible interpolan los años de la base en
  lugar de "2022–2025 / 2026–2030" en duro.
- Retirado el `export` de nueve símbolos sin ningún importador externo
  (constantes de simulación, `residuosEts`, `PROMEDIO_OCDE_DQL`,
  `PAIS_PRINCIPAL`, `calcularIndicadoresClave`); las 2 figuras portadas
  sin uso de vidaMejorFiguras se conservan a propósito, como estaba
  documentado.

Verificación: lint y build en verde; treemap, globito, informalidad
(Antioquia→Medellín, 6 trazas con banda), radar FNB y las dos vistas del
DQL re-probados en navegador sobre la build de producción con consola
limpia; móvil 375 sin desborde horizontal.

## [0.15.5] — 2026-08-14

### Letra del treemap del EPI reducida en teléfonos

- En pantallas de teléfono (hasta 640 px) los rótulos del treemap de la
  estructura del EPI bajan de ~11,5 px a ~9 px, con relleno e
  interlineado más compactos: las cajas se encogen con el lienzo y la
  letra anterior las desbordaba (ajuste del cliente). El escritorio no
  cambia, y la ficha completa de cada indicador sigue disponible en el
  globito y en la tabla accesible.

## [0.15.4] — 2026-08-14

### Panel de análisis del DQL desactivado (a la espera de definición)

- El panel "Análisis" de "Calidad vida digital" queda desactivado a
  pedido del cliente: aún no se define si el indicador llevará texto. El
  código NO se eliminó — imports, estado, efecto de lectura, render y
  tarjeta permanecen comentados en bloques marcados "ANÁLISIS
  DESACTIVADO", con la indicación de reactivación (basta descomentarlos
  para volver a leer `calidad-vida-digital.docx` con el sondeo único de
  siempre); los estilos del texto se conservan con su nota. La tarjeta
  de la gráfica queda sola en la banda y el portal deja de sondear el
  documento inexistente (verificado: cero peticiones .docx en la vista).

## [0.15.3] — 2026-08-14

### Alineación del panel de control del DQL y tope de tres países

- El panel de controles de las dos vistas de "Calidad vida digital" se
  reorganiza en tres niveles: el título "Países" arriba, la FILA ÚNICA de
  controles al medio —desplegable "Agregar país", cápsulas, selector de
  escenario y casilla, todos alineados por su línea base inferior
  (verificado: mismo borde inferior al píxel)— y la ayuda abajo (petición
  del cliente: el escenario y la casilla quedaban descolgados del resto).
- El tope de selección baja de cuatro a TRES países (petición del
  cliente), igualando al comparador de FNB: al tercer país el desplegable
  se deshabilita ("Tope alcanzado") y el comparador por escenario abre
  ahora con Colombia, Chile y México.

## [0.15.2] — 2026-08-14

### Cápsulas removibles en la selección de países del DQL

- Las dos vistas de "Calidad vida digital" reemplazan el selector
  múltiple de 38 países —que se estiraba a todo el ancho con un gran
  vacío interior y exigía Ctrl + clic— por el patrón de listas largas:
  un desplegable **"Agregar país"** que suma de a uno (solo ofrece los
  aún no elegidos) y las **cápsulas removibles** de los seleccionados,
  en la misma tarjeta de fondo suave del comparador de FNB. Toda la
  cápsula es el botón de quitar (objetivo táctil completo de 44 px, con
  la equis como refuerzo visual y nombre accesible "Quitar {país}").
- El tope de cuatro se autoexplica: al alcanzarlo, el desplegable se
  deshabilita con el rótulo "Tope alcanzado" hasta soltar una cápsula;
  por debajo del mínimo de cada vista, el aviso de siempre. La selección
  queda siempre visible (antes había que desplazar el listbox para ver
  qué estaba marcado) y el bloque pasa de ~300 px a ~160 px de alto.
- `SelectorCampo` gana la propiedad genérica `deshabilitado` para los
  selectores de acción que esperan turno.
- La tarjeta de fondo suave envuelve el bloque COMPLETO de controles de
  cada vista —países, escenario y casilla— como panel general de control
  (petición del cliente), en lugar de agrupar solo a los países.

## [0.15.1] — 2026-08-14

### Píldoras conmutables en el comparador de indicadores del FNB

- El selector múltiple del comparador de FNB se reemplaza por **seis
  píldoras conmutables**, una por indicador (ajuste de experiencia de uso
  aprobado por el cliente): cada indicador se marca o suelta con un clic
  o un toque —sin Ctrl + clic ni texto de ayuda largo—, con el mismo
  lenguaje visual del portal (pistacho al activarse, borde verde en
  reposo, 44 px de alto). Al llegar al tope de tres, las restantes se
  deshabilitan hasta soltar una; con menos de dos, el aviso de siempre.
  El bloque de controles se compacta y desaparece el espacio muerto junto
  al selector; la casilla del proxy OCDE queda en la misma fila. Las
  píldoras viven en su propia tarjeta con fondo suave (verde agua al 9 %
  sobre borde de marca), que las distingue de los botones que alternan
  las gráficas (petición del cliente).
- El selector múltiple se conserva únicamente donde corresponde: la
  lista de 38 países de Calidad vida digital (con listas largas las
  píldoras no son viables; con seis opciones, sí).

## [0.15.0] — 2026-08-14

### Comparador por escenario del DQL (segunda vista de Calidad vida digital)

- El módulo "Calidad vida digital" gana el conmutador de dos botones de
  los demás indicadores: "Trayectoria y escenarios" (la vista inicial) y
  el nuevo **"Comparador por escenario"** — el comparador multipaís de la
  celda de escenarios prospectivos del cuaderno. De DOS a CUATRO países
  (mismo tope del cliente; el cuaderno admite seis) bajo un mismo
  escenario nombrado: **pesimista** (trayectoria simulada completa
  próxima al percentil 20 del cierre 2030), **tendencial** (exactamente
  la proyección central del Excel) u **optimista** (percentil 80), con la
  aclaración metodológica bajo la figura. Color por país y trazo por
  escenario (punteado/guiones/sólido, los del cuaderno).
- Controles: selector múltiple de países (abre con Colombia, Chile,
  México y Costa Rica, la selección del cuaderno), selector de escenario
  y casilla destacada "Mostrar límites 95 %" (bordes punteados por país,
  sin relleno; arranca apagada, como el cuaderno). Caja "Valores 2030"
  con el cierre de cada país bajo el escenario elegido — verificada:
  los tendenciales son exactos al Excel (Chile 0,5768 · Colombia 0,5249 ·
  Costa Rica 0,5003 · México 0,4639) y los simulados equivalentes al
  cuaderno (Colombia optimista 0,5452 frente a 0,5447), con la jerarquía
  pesimista < tendencial < optimista comprobada.
- Los escenarios nombrados se seleccionan en la misma simulación
  precalculada (el formato del precalculado sube a 2; 71 KB, 21 KB
  comprimido) y la tabla accesible de la vista entrega la trayectoria
  anual del escenario por país.

## [0.14.0] — 2026-08-14

### Quinto indicador completo: Calidad vida digital (DQL)

- El eje Indicadores queda COMPLETO: el módulo **"Calidad vida digital"**
  porta el visualizador del cuaderno "App_Vida_Digital" — Digital Quality
  of Life Index (Surfshark) de los 37 países OCDE de la base más su
  promedio, con histórico oficial 2022–2025 y pronóstico econométrico
  2026–2030 (suavizamiento exponencial de tendencia amortiguada,
  documentado en las notas de la propia hoja). La figura reúne los tres
  exploradores del cuaderno en una sola vista parametrizada (petición del
  cliente): con un país, el visualizador individual completo (banda del
  95 %, 18 trayectorias simuladas, cajas de indicadores clave); con
  varios, la comparación multipaís.
- Controles acordados: selector múltiple de **país** (de uno a CUATRO,
  tope pedido por el cliente — el cuaderno admite seis; al intentar un
  quinto la selección se acota), selector de **escenario** ("Proyección
  central" o uno de los 24 escenarios simulados representativos, con la
  trayectoria destacada y su caja de lectura — reemplaza al deslizador
  con botón Play del cuaderno, que es herramienta de analista) y
  **casilla destacada** para mostrar u ocultar el intervalo de predicción
  del 95 %. Actualización automática, leyenda abajo y ejes fijos sin
  zoom.
- La simulación del cuaderno (8000 corridas, semilla 2030: residuos ETS
  amortiguado α=0.50/β=0.30/φ=0.85, volatilidad MAD contraída hacia la
  agrupada de los 37 países, innovaciones t de Student y recentrado sobre
  el pronóstico central) está portada paso a paso en
  `prospectivaVidaDigital.js` y corre en el BUILD; el promedio OCDE
  promedia las corridas país a país, como el cuaderno (su banda es más
  estrecha). Misma adaptación documentada de FNB: generador determinista
  propio (las utilidades comunes viven ahora en
  `simulacionDeterminista.js`, compartidas por ambas simulaciones — la de
  FNB se revalidó sin cambios tras la reorganización), histórico y
  proyección central EXACTOS al Excel, simulados equivalentes.
  Verificado contra el cuaderno para España: ranking mundial 20, 2022
  0,6632, 2025 0,6626, 2030 0,7014, Δ +0,0388 — exactos —, y Colombia
  0,4778 (2025) / 0,5249 (2030).
- Hallazgo anotado: la celda decorativa "PROMEDIO OCDE 2030: 0.6719" de
  la cabecera del Excel no coincide con el promedio de su propia tabla
  (0,6701, el mismo que calcula el cuaderno y que muestra el portal).
- Precalculado de 67 KB (20 KB comprimido). El texto del análisis espera
  su documento (`calidad-vida-digital.docx`): la tarjeta muestra
  "contenido en preparación" y el instructivo del cliente ya documenta
  las reglas de la base y del documento.

## [0.13.0] — 2026-08-14

### Treemap de la estructura del EPI (tercera vista de Desempeño ambiental)

- El conmutador de "Desempeño ambiental" gana la vista **"Estructura del
  EPI"**: el explorador de la arquitectura de pesos del cuaderno — un
  treemap jerárquico objetivo → categoría → indicador donde el área de
  cada caja es su peso en el índice y el color sigue una rampa por peso
  (verde claro → azul petróleo, adaptación de marca de la escala del
  cuaderno). Desplegable de **objetivo** ("Todos" y los tres objetivos;
  en el cuaderno también es un desplegable — con una casilla no se elige
  uno entre cuatro) y **globito de información al pasar el puntero** por
  cada caja, con la ficha del cuaderno: peso EPI (3 decimales), código,
  unidad, polaridad y cobertura. Validado contra la imagen: Species
  Protection Index 2,970 %, unidad %, polaridad positive, cobertura
  2025–2025 — exactos —, y el resumen de pesos por objetivo (Ecosystem
  Vitality 45,0 % · Climate Change 30,0 % · Environmental Health 25,0 %)
  se muestra bajo la figura, como la tabla del cuaderno.
- El paquete básico de Plotly no trae trazas treemap, así que la vista se
  dibuja con cajas HTML propias: el reparto lo calcula el servicio con el
  algoritmo cuadrificado clásico (el mismo de Plotly), los rótulos solo
  aparecen donde el contraste alcanza AA y la caja tiene tamaño legible
  (el globito y la tabla accesible conservan siempre la información), y
  la caja bajo el puntero se realza con un contorno. Rampa de referencia
  con mínimo y máximo al costado; equivalente accesible en tabla con los
  47 indicadores.
- La normalización pasa al formato 3: además de las 186 entidades, la
  estructura incluye la hoja DICCIONARIO (47 indicadores, pesos que suman
  1,000000). Si un Excel reemplazado no trae esa hoja, la vista lo indica
  sin afectar a las otras dos. Precalculado: 141 KB, 46 KB comprimido.

## [0.12.0] — 2026-08-14

### Explorador por entidad del EPI (segunda vista de Desempeño ambiental)

- El módulo "Desempeño ambiental" gana el conmutador de dos botones de los
  demás indicadores: "Trayectoria y escenarios" (la vista aprobada de
  Colombia, intacta) y el nuevo **"Explorador por entidad"** — el
  visualizador individual del cuaderno para cualquiera de los **177
  países**, los **8 promedios regionales** o el **promedio global** (186
  entidades, el mismo catálogo del cuaderno), con desplegable de entidad
  y la misma figura: histórico armonizado, estrella del dato oficial
  2026 (con su puente sutil), corredor restrictivo–optimista,
  trayectorias intermedias y cajas de indicadores clave.
- Las dos casillas del cuaderno ("Mostrar trayectorias intermedias" y
  "Mostrar los tres escenarios") van como **píldoras destacadas** que se
  encienden en pistacho de marca al marcarse (petición del cliente: que
  llamen la atención para que se usen); el estado no depende solo del
  color — la casilla nativa sigue visible — y el modificador BEM lo pone
  el componente desde su estado, sin depender de `:has()`. Sin la casilla
  de los tres escenarios queda solo el tendencial (el corredor se
  conserva), como en el cuaderno.
- En el explorador la leyenda va ABAJO, con letra mayor y aire propio
  (petición del cliente: etiquetas más visibles; en el cuaderno quedaban
  diminutas y montadas con la nota, que aquí vive fuera del lienzo). Los
  hover llevan ahora el nombre de la entidad, como el cuaderno.
- La estructura precalculada pasa al formato 2: conserva TODAS las
  entidades en forma compacta (arreglos alineados a los años compartidos,
  2 decimales) y el servicio las rehidrata al cargar. El precalculado
  pasa de 3 KB (solo Colombia) a 131 KB —44 KB comprimido— y el ranking
  2026 se calcula para cada país (empates con la misma posición, como el
  cuaderno). Validado contra la imagen del cuaderno para Bolivia:
  ranking 98 de 177, oficial 39,25, tendencial 41,78 (2030) y 45,94
  (2040), cierre 2050 R/T/O 44,39/48,17/51,96, cambio +8,92, calidad
  Alta — todas exactas; Colombia, verificada como regresión (48 de 177 y
  54,17/57,56/60,96). Las entidades agregadas muestran "Agregada" como
  calidad y omiten el ranking, como el cuaderno.
- Tabla accesible por entidad (histórico, oficial y los tres escenarios
  por año) y sin desborde horizontal en móvil.

## [0.11.1] — 2026-08-14

### Puente histórico→oficial en la figura del EPI

- La trayectoria de "Desempeño ambiental" ya no se ve cortada entre el
  último punto del histórico armonizado (2025: 47,07) y el dato oficial
  del EPI 2026 (48,83): un segmento fino punteado, en el mismo verde del
  histórico y sin entrada en la leyenda, une ambos puntos (ajuste
  aprobado por el cliente). El cuaderno original NO trae ese segmento —
  allí el hueco es de diseño, porque las dos series tienen metodologías
  distintas —, así que la nota al pie conserva la aclaración
  ("2000–2025: histórico armonizado. 2026: dato oficial") y el puente es
  solo visual: no se inventa ningún dato. Es el mismo empalme que ya usan
  las figuras de FNB, OCDE e informalidad.

## [0.11.0] — 2026-08-14

### Comparador multiindicador del FNB (cuarta vista)

- El conmutador del módulo "Felicidad nacional bruta" gana la vista
  **"Comparador de indicadores"**: el comparador lineal del cuaderno, con
  la evolución completa 2015–2050 (histórica y tendencial) de los
  indicadores elegidos superpuesta en un mismo panel. Cada indicador
  conserva el color que tiene en la vista principal; curvas PCHIP suaves
  con el hover en los marcadores anuales, corte histórico/proyección
  sombreado, leyenda abajo y ejes fijos sin zoom.
- Selección múltiple con el desplegable múltiple del portal
  (`SelectorCampo`), de DOS a TRES indicadores (tope pedido por el
  cliente; el cuaderno admite hasta seis): al intentar un cuarto, la
  selección se acota, y con menos de dos la vista lo pide con un aviso en
  lugar de dibujar. El texto de ayuda explica la selección con Ctrl + clic
  (o toque en móvil). Abre con el índice FNB, Salud y Educación.
- Casilla "Comparar con el promedio OCDE (proxy)": añade la referencia
  visual del cuaderno (línea punteada gris en 73/100) con su aclaración
  bajo la figura — es un proxy, no un equivalente metodológico del
  índice. Arranca desactivada, como en el cuaderno.
- Actualización automática al cambiar la selección o la casilla (el botón
  "Comparar con líneas" del cuaderno sobra en la web). Tabla accesible
  con los años × indicadores elegidos (y la columna del proxy cuando está
  activo). Las "líneas de fondo" simuladas del cuaderno no se portan: los
  parámetros acordados solo contemplan la comparación de series y el
  proxy OCDE.

## [0.10.0] — 2026-08-12

### Vistas prospectivas del indicador FNB, con conmutador de tres botones

- El módulo "Felicidad nacional bruta" pasa de una a TRES gráficas del
  cuaderno, alternadas por el mismo conmutador de botones del indicador
  OCDE (petición del cliente): "Índice y componentes" (la vista
  existente), "Escenarios por indicador" y "Estructura del índice".
- **Escenarios por indicador**: para el indicador elegido en el
  desplegable (el índice o cualquiera de los cinco componentes), la serie
  histórica suavizada, los escenarios tendencial, pesimista y optimista,
  la banda simulada del 95 % y las 18 trayectorias intermedias de fondo,
  con dos casillas ("Mostrar trayectorias intermedias" y "Mostrar los
  tres escenarios") que replican los controles del cuaderno — sin el
  botón "Actualizar gráfica": aquí la figura responde al instante. Las
  cajas de cifras del cuaderno se portan completas (indicadores clave,
  inicio de la proyección, cierre 2050 con banda y resumen de los tres
  escenarios). La leyenda va ABAJO y legible (petición del cliente: en el
  cuaderno quedaba montada sobre la nota de fuente; la nota va fuera del
  lienzo, como en todo el portal), y los ejes quedan fijos, sin zoom ni
  traslación.
- **Estructura del índice**: el radar de los cinco componentes con
  desplegables de año (2015–2050, los hitos del cuaderno) y de escenario,
  y el valor del índice al centro. El paquete básico de Plotly no incluye
  trazas polares, así que el radar se dibuja en coordenadas cartesianas
  (anillos y radios como formas; el polígono, como traza con hover en los
  vértices) — mismo aspecto, sin cambiar de paquete ni engordar el
  bundle.
- La simulación prospectiva del cuaderno (7000 corridas, semilla 2050:
  volatilidad robusta MAD de los cambios históricos, correlación
  regularizada con choque común y colas t, recentrado sobre el tendencial
  y escenarios por percentiles 20/80 del cierre) está portada paso a paso
  en `prospectivaFelicidad.js` y se ejecuta en el BUILD: el navegador
  recibe el resultado en el precalculado (34 KB). **Adaptación
  documentada**: el generador aleatorio de numpy no es reproducible fuera
  de Python; se usa un generador determinista propio con la misma semilla,
  así que el histórico y el tendencial son EXACTOS al Excel (2025: 72,73;
  2026: 72,60; 2030: 71,99; 2050: 66,81; Δ −5,92 pp — verificados contra
  el cuaderno) y las cifras simuladas son estadísticamente equivalentes,
  no idénticas (2050 pesimista 66,21 frente a 66,22 del cuaderno;
  optimista 67,35 igual; banda [65,35–68,14] frente a [65,39–68,13]). El
  propio cuaderno las rotula como simulaciones ilustrativas, y la vista
  lo advierte bajo la figura.
- Las curvas prospectivas se suavizan con la interpolación PCHIP monótona
  del cuaderno (implementada en el servicio; la densificación no viaja en
  el JSON). Si el cliente reemplaza el Excel sin recompilar, la
  simulación corre en el navegador (~1 s) dentro de la misma
  normalización compartida; si la base reemplazada no alcanza para
  simular (celdas vacías o histórico corto), las vistas prospectivas lo
  indican y la vista principal sigue funcionando. El formato del
  precalculado sube a 2 (invalida los anteriores).
- Tablas accesibles propias por vista: serie completa con los tres
  escenarios por año, y componentes del año/escenario del radar.

## [0.9.0] — 2026-08-12

### Segunda gráfica del indicador OCDE, con conmutador

- El módulo "Una vida mejor OCDE" muestra ahora DOS gráficas que se
  alternan con un conmutador de dos botones (petición del cliente: una a
  la vez, para aprovechar el espacio visual sin apilar figuras ni alargar
  el desplazamiento). El botón activo va en pistacho de marca; el estado
  se anuncia a lectores de pantalla (`aria-pressed`) y cada vista conserva
  su selección al alternar.
- La gráfica nueva es el **abanico de escenarios** del cuaderno (bloque 1,
  ya portado y validado en `vidaMejorFiguras`, ahora habilitado): serie
  observada 2000–2025 con relleno, escenarios tendencial, optimista y
  restrictivo a 2050 con la banda de incertidumbre entre ellos, y corte
  observado/proyectado. Controles de **país** (los 38 de la OCDE) y de
  **indicador** (los 8 de la base); abre con Colombia y el puntaje de
  bienestar.
- Sobre la figura, cuatro tarjetas de cifras clave del país e indicador
  consultados: último dato observado, cierres tendencial y optimista al
  horizonte y posición en el ranking al año de corte, cada una con el
  color de su serie. Verificadas contra el cuaderno para Colombia:
  puntaje 3,89 (2025), 5,47 tendencial y 5,96 optimista (2050), posición
  36. El cálculo vive en `calcularCifrasClave` (vidaMejorService).
- Sin interactividad de ejes en la figura nueva, como en el resto del
  portal: se retiró el control de rango inferior (rangeslider) que traía
  el porte original, los ejes van fijos y sin zoom, y se quitó el título
  interno (la leyenda de cuatro series ocupa la franja superior; el
  encabezado lo pone la tarjeta). Hover y leyenda se conservan.
- La tabla accesible de la vista de escenarios entrega la serie completa
  (observado y tres escenarios) del país e indicador elegidos, con los
  decimales propios del indicador.
- El selector "Desde el año" del ranking queda desactivado (petición del
  cliente: la figura ya muestra el horizonte completo 2015–2050 y el
  control no se necesita). El código NO se eliminó: permanece comentado en
  el módulo con la indicación de cómo reactivarlo si se requiere.

## [0.8.0] — 2026-08-08

### Sección "Línea de tiempo" (primera del menú institucional con contenido)

- La opción "Línea de tiempo" del menú fijo deja el aviso de construcción y
  muestra la cronología **"Evolución hacia el Bienestar Integral"**
  (1945–2030), recreada del bosquejo aprobado por el cliente: espina
  vertical con un punto por hito, distintivo de categoría de bienestar y
  once tarjetas con año, título, descripción, "Aporte al bienestar" y
  referencias, cerradas por el pie de fuentes. A pedido del cliente, la
  franja azul y el fondo gris del bosquejo se retiraron: el título va en el
  verde oscuro de los títulos del portal sobre fondo blanco, equilibrado
  con los demás módulos. El
  contenido se transcribió literalmente del bosquejo y vive en
  `src/data/linea-tiempo.js`; el componente es `ModuloLineaTiempo`, diferido
  en su propio fragmento como el resto de los módulos.
- Las tarjetas son informativas por ahora: el cliente aún define si
  llevarán contenido propio o funcionarán como accesos, así que no navegan
  ni simulan ser botones (tampoco reciben foco de teclado, por no ser
  interactivas).
- Interacción sutil, como se pidió: cada hito aparece con un desplazamiento
  suave al entrar en pantalla (IntersectionObserver) y la tarjeta se realza
  al pasar el puntero. Ambos efectos se anulan bajo `prefers-reduced-motion`,
  y sin JavaScript o sin la API del navegador la cronología se muestra
  completa desde el primer instante (nada queda oculto).
- Paleta propia del bosquejo en el cuerpo de la cronología (azul marino
  `#17182f` en títulos de tarjeta y pie, espina gris y once acentos en
  progresión azul→verde→naranja→rojo→púrpura) en variables locales del
  bloque, independiente del manual de marca. Seis
  acentos se oscurecieron lo mínimo necesario —mismo tono— para que el
  texto blanco de los distintivos y el año sobre blanco cumplan el
  contraste AA (4,5:1) del portal; el valor original queda anotado junto a
  cada ajuste en el catálogo. Tipografías de marca (Mitr/Catamaran) en
  lugar de la sans genérica del bosquejo, como en el resto de portes.
- En móvil la espina se pega al borde izquierdo con el distintivo sobre la
  tarjeta (sin desborde horizontal); desde 900 px rige la composición del
  bosquejo: distintivo | espina | tarjeta con el conector horizontal.

## [0.7.0] — 2026-08-07

### Eje Indicadores y módulo "Una vida mejor OCDE"

- El botón "Indicadores" del menú temático despliega ahora su propio
  submenú con los cinco índices del eje: Una vida mejor OCDE, Felicidad
  nacional bruta, Capital humano (WB), Desempeño ambiental y Calidad vida
  digital. El componente del menú ya era genérico; solo se añadió el
  catálogo (`INDICADORES` en `navegacion.js`). Los índices sin datos
  muestran el aviso de construcción.
- Primer indicador completo: **Una vida mejor OCDE**, en vista de banda
  completa (ajuste aprobado por el cliente): la gráfica de evolución de
  posiciones en el ranking OCDE ocupa todo el ancho del módulo —Colombia
  siempre dibujada y destacada, con desplegables uniformes para elegir el
  país de comparación, el escenario y el año inicial; eje invertido
  (1 = mejor)— y el texto de análisis va debajo, extraído del documento
  de resumen del eje (`resumen-indicadores.docx`) por el título de su
  sección. En escritorio el cuerpo del texto se desplaza dentro de su
  tarjeta con la misma altura contenida que el análisis de las
  tendencias; en móvil fluye completo.
- El documento de resumen es único para los cinco índices: cada indicador
  toma su sección (comparación de títulos sin tildes ni signos) y el
  archivo se descarga e interpreta una sola vez. Los indicadores también
  pueden traer su documento propio: el catálogo de configuración decide
  de dónde sale el texto de cada uno.
- Las gráficas ya no hacen zoom ni paneo (decisión del cliente: en las
  pruebas los usuarios lo activaban sin querer —sobre todo en móvil— y
  perdían la vista). Se conservan el hover con valores exactos y la
  leyenda interactiva. Aplica a las cuatro figuras: pirámides,
  informalidad, ranking OCDE y FNB (`fixedrange` en ambos ejes,
  `dragmode: false` y sin zoom por rueda ni doble clic).
- El usuario final solo descarga JSON en la operación normal (ajuste
  aprobado por el cliente, variante híbrida): las bases de los
  indicadores OCDE y Felicidad y la de informalidad laboral también se
  precalculan en el build (normalizaciones compartidas en
  `normalizacionVidaMejor.js`, `normalizacionFelicidad.js` y
  `normalizacionInformalidad.js` — la de informalidad pasa de descargar
  140 KB de Excel más 357 KB de intérprete a un JSON de 14 KB), los precalculados grandes se publican
  además comprimidos (`.json.gz`, descomprimidos por el propio navegador:
  la base OCDE viaja en 284 KB y la de población en 883 KB, sirva como
  sirva el servidor) y los intérpretes de Excel y Word salieron del
  paquete inicial — SheetJS y mammoth ahora son fragmentos aparte que
  solo se descargan si el cliente reemplazó un archivo en el servidor sin
  recompilar (la promesa de actualizar sin recompilar sigue viva como
  respaldo). Además, tras pintar el inicio el portal precarga en tiempo
  ocioso los módulos pesados (arrastran Plotly), de modo que la primera
  navegación a una tendencia o indicador se siente inmediata.
- Los textos Word también se precalculan en el build: junto a cada .docx
  queda un `.precalculado.json` con sus párrafos ya extraídos, generado
  con la misma normalización que usa el navegador
  (`normalizacionTexto.js`). El artículo de informalidad pasa de 2,4 MB a
  99 KB y el resumen de indicadores de 880 KB a 12 KB, y el intérprete de
  Word no se descarga en la vía rápida. La validación es la misma de las
  bases (tamaño del archivo publicado, con `content-length` o una
  petición de rango como respaldo): si el cliente reemplaza un Word en el
  servidor, el portal lo detecta y lo interpreta en el navegador como
  siempre.
- La primera visita a Envejecimiento pasa de ~40 segundos a ~2: cada
  build deja junto al Excel de población un archivo ya interpretado
  (`base-poblacion.precalculado.json`, 2,2 MB frente a los 13 MB del
  Excel), generado por `scripts/precalcular-bases.mjs` con la MISMA
  normalización que usa el navegador (compartida en
  `normalizacionPoblacion.js`). El portal lo usa solo si el Excel
  publicado pesa exactamente lo que pesaba al generarlo; si el cliente
  reemplaza el archivo en el servidor, lo detecta y vuelve a interpretar
  en el navegador como siempre — el reemplazo sin recompilar se conserva,
  y la vía rápida se recupera en el siguiente build. Orden de carga:
  caché IndexedDB del navegador, precalculado del build, interpretación
  completa en el worker.
- Segundo indicador completo: **Felicidad nacional bruta**, con la misma
  vista en banda completa. La gráfica porta el explorador multiindicador del
  cuaderno "App_Felicidad_Nacional": el índice FNB adaptado y sus cinco
  componentes (0–100), histórico 2015–2025 con puntos y escenario
  tendencial del propio Excel a 2050 con rombos, corte
  observado/proyectado y caja con los valores al horizonte. Las cuatro
  series de la vista por defecto del cuaderno arrancan visibles; Salud y
  Resiliencia ecológica se activan desde la leyenda (una indicación sobre
  la figura explica ese control). La nota metodológica de la propia base
  acompaña a la gráfica, y los valores a 2050 se validaron contra el
  Excel (índice 66,81; educación 92,59; no pobreza 44,61; vivienda 3,58).
  Las trayectorias simuladas y los escenarios pesimista y optimista del
  cuaderno no se portan: son construcciones estadísticas de análisis, no
  datos de la base — mismo criterio que el constructor de escenarios de
  la OCDE.
- Las demás figuras del cuaderno (abanico por país con cifras clave,
  Colombia frente al promedio OCDE y comparador multipaís) quedaron
  portadas y validadas en `vidaMejorFiguras`, listas para habilitarse si
  se necesitan; el empaquetador excluye del paquete las que no se usan.
- Los valores se validaron contra el Excel celda por celda (Colombia
  2025: 3,89 puntos, posición 36 de 38; 2050 tendencial 5,47 y optimista
  5,96).
- Arquitectura distinta a las tendencias, porque la base es por PAÍS (38
  miembros de la OCDE) y no por departamento: sin mapa y sin worker — el
  archivo pesa 590 kB y se lee en medio segundo en el hilo principal, con
  caché de promesas por URL. Los países se muestran en español traducidos
  por código ISO (identificador estable, como el código DANE en las
  tendencias), y el histórico y el año de corte se detectan por el año más
  antiguo del archivo, no por etiquetas literales.
- Piezas nuevas reutilizables: `SelectorCampo` (lista desplegable
  etiquetada genérica, con variante múltiple) y `GraficaOcde` (envoltorio
  Plotly con tabla accesible oculta y desplazamiento horizontal señalizado
  en pantallas angostas). Paleta adaptada a la marca: verde oscuro para lo
  observado y para Colombia, azul petróleo/verde medio/naranja para los
  tres escenarios.
- Subbotones de los submenús a 44 px de alto (medían 42 px, por debajo del
  mínimo táctil; afectaba también a Tendencias).
- Auditoría de experiencia de uso sobre el portal completo (las seis
  vistas, en escritorio y móvil). El contraste, la jerarquía de
  encabezados, el foco visible y los equivalentes accesibles ya estaban a
  nivel; se corrigió lo restante:
  - Feedback de pulsación uniforme: todo botón se hunde un punto al
    pulsarlo (`:active`); antes ninguna interacción respondía al tacto.
  - Las tarjetas del inicio anuncian el estado de su eje —"Disponible" o
    "En preparación"— para que nadie llegue a una sección vacía sin
    aviso.
  - El desplazamiento decorativo de las tarjetas del inicio al pasar el
    puntero se desactiva bajo movimiento reducido.
  - `theme-color` verde oscuro: el marco del navegador móvil toma el
    color de marca.
- Cada módulo de indicador viaja en su propio paquete diferido de pocos
  kilobytes que solo se descarga al entrar; el intérprete de Excel dejó
  de acompañarlos (ver el punto de la carga solo-JSON).
- Tercer indicador completo: **Capital humano (WB)**, con la misma vista
  en banda completa. La gráfica porta los escenarios prospectivos del
  cuaderno "App_Capital_Humano": para el indicador elegido en el
  desplegable (once disponibles; abre con el índice equivalente), la
  banda entre los escenarios optimista y pesimista alrededor de la
  trayectoria tendencial, construidos con la fórmula exacta del cuaderno
  (separación proporcional a la desviación del ancla, acotada a la
  escala de cada indicador e invertida donde bajar es mejorar), y el
  histórico observado en punteado con el corte observado/proyectado
  cuando la serie lo trae. Validado contra el cuaderno al sexto decimal
  (índice equivalente 2040: tendencial 0,3858, optimista 0,426762,
  pesimista 0,344838). La base viaja precalculada (26 KB frente al Excel
  más SheetJS) y la nota de fuente del Banco Mundial acompaña a la
  figura; el texto sale del documento propio del indicador
  (`capital-humano.docx`). Las figuras de evolución comparada y
  comparación internacional del cuaderno no se portan en esta entrega.
- Cuarto indicador completo: **Desempeño ambiental**, con la misma vista
  en banda completa. La gráfica porta el visualizador individual del
  cuaderno "App_Desempeño_Ambiental" para Colombia: histórico armonizado
  2000–2025, la estrella del dato oficial del EPI 2026 con su línea de
  corte, los escenarios anuales 2027–2050 (pesimista/restrictivo,
  tendencial y optimista) dentro del corredor sombreado con sus dieciséis
  trayectorias intermedias, y las cajas de indicadores clave (ranking
  2026 derivado del dato oficial de los 177 países) y del cierre 2050.
  Cifras validadas contra el cuaderno (2026: 48,83; 2030: 51,31; 2040:
  55,37; 2050 R/T/O: 54,17/57,56/60,96; cambio +8,73; ranking 48 de
  177). La base de 1 MB viaja precalculada en 3 KB —solo la serie de
  Colombia y su ranking— y la nota metodológica del pie acompaña a la
  figura; el texto sale del documento propio del indicador
  (`desempeno-ambiental.docx`). Los exploradores animados, comparadores
  y la arquitectura del EPI del cuaderno no se portan en esta entrega.
- Auditoría de limpieza sobre todo el proyecto. Al seleccionar un
  departamento sin documento Word, el portal hacía dos peticiones
  fallidas (la consulta de la vía rápida y la descarga de respaldo);
  ahora un único sondeo resuelve la existencia, valida el precalculado y
  evita la descarga — una sola línea en la consola por departamento
  pendiente, que es la comprobación que permite que un Word recién
  subido aparezca sin recompilar. Además: las celdas no numéricas de la
  base de informalidad se normalizan igual en el build y en el navegador
  (antes las dos vías podían divergir), se eliminó un documento huérfano
  que el portal nunca leía (`vida-mejor-ocde.docx`; el texto de ese
  indicador sale del resumen del eje), se retiró código sin uso del
  servicio OCDE, se unificaron los avisos de error de los módulos de
  indicadores con los de tendencias (`role="alert"` y botón
  "Reintentar") y se actualizaron los comentarios y el README que aún
  describían la arquitectura anterior.

## [0.6.2] — 2026-08-04

### Revisión de accesibilidad y uso táctil

Revisión del portal completo en 320, 375, 480, 768 y 1280 px, midiendo
contraste, jerarquía de encabezados, desbordes y tamaño de los controles.
El contraste de texto no presentó ni un solo incumplimiento en ninguna
pantalla; los hallazgos fueron de tamaño táctil y de desbordamiento.

- La gráfica de serie por ciudad ya no arrastra el scroll horizontal a
  toda la página en móvil: las rejillas del módulo pasan de `1fr` a
  `minmax(0, 1fr)` y la tarjeta de gráfica recibe `min-width: 0`. Con
  `1fr` el mínimo de la columna es el contenido, de modo que la figura de
  ancho fijo ensanchaba la rejilla entera en lugar de desplazarse dentro
  de su propia tarjeta, como estaba previsto.
- Botón de menú móvil: recupera sus 44×44 px. Al ser un elemento de una
  fila flexible sin `flex-shrink: 0`, cedía ancho al título y su área de
  pulsación quedaba en la mitad (22 px).
- El imagotipo tampoco se comprime ya (`flex-shrink: 0`), en línea con la
  prohibición del manual de marca de distorsionarlo. Por debajo de 480 px
  su nombre se oculta solo a la vista —permanece disponible para lectores
  de pantalla— para que el símbolo conserve tamaño y proporciones.
- Objetivos táctiles a 44 px de alto mínimo: título de la cabecera,
  botones de las tarjetas del inicio, enlaces del pie y listas
  desplegables de año y ciudad. La separación entre enlaces del pie sube a
  8 px, el mínimo para evitar pulsaciones erróneas.
- Los selectores de año y ciudad usan 16 px de fuente en móvil: por debajo
  de ese tamaño, iOS amplía la página al enfocar el control.
- La gráfica de informalidad anuncia su desplazamiento en pantallas
  angostas: aviso de texto sobre la figura y barra fina en verde de marca
  siempre presente, incluso en los sistemas que la ocultan hasta que el
  usuario arrastra. Sin esas señales el recorte de la figura se leía como
  un fallo de la página. Ambas desaparecen desde 640 px, donde la figura
  cabe completa.

## [0.6.1] — 2026-08-03

### Ajuste de legibilidad del análisis por departamento

- El texto del documento Word aprovecha todo el ancho de su tarjeta, sin
  límite de columna: se eliminó el recorte de línea que dejaba espacio sin
  usar a la derecha.
- Cuerpo del análisis a 17 px con interlineado 1.75, por tratarse de
  lectura extensa: compensa la mayor longitud de línea.
- Se conserva el desplazamiento vertical propio del cuadro en escritorio
  (altura contenida y barra fina de marca); en móvil el texto sigue
  fluyendo completo para no anidar desplazamientos táctiles.

## [0.6.0] — 2026-08-03

### Indicador de carga y módulo 404

- `Cargador`: indicador circular único del portal (arco en verde oscuro de
  marca sobre aro neutro), con tres tamaños y variante en bloque. Sustituye
  todos los avisos de espera sueltos: carga de un módulo, lectura del
  Excel, preparación de la base de datos y lectura de los textos Word. Es
  región de estado para lectores de pantalla y ralentiza su giro cuando el
  sistema pide movimiento reducido.
- `ModuloNoEncontrado`: módulo 404 con la identidad del portal (código en
  verde oscuro, acento pistacho) y botón de regreso al inicio. Se muestra
  ante una sección desconocida (`existeSeccion` en el catálogo de
  navegación) o ante un módulo que no se pudo cargar.
- `LimiteDeError`: envuelve el contenedor principal y captura los fallos de
  renderizado —sobre todo que el archivo de un módulo no llegue al
  navegador por una conexión caída o una actualización del servidor— para
  mostrar el 404 en lugar de dejar el portal en blanco. Se reinicia al
  navegar a otra sección.

## [0.5.1] — 2026-08-03

### Ajustes de la tendencia Informalidad laboral

- Equilibrio visual del módulo: cuando la tendencia tiene una sola
  gráfica, la rejilla pasa a dos columnas (mapa 5 / gráfica 7) en lugar de
  tres, y el alto de la figura baja a 520 px. Mapa y gráfica quedan de
  tamaño comparable (473×673 y 663×654 a 1280 px) en vez de la
  desproporción anterior.
- `SelectorCiudad`: el desplegable de ciudades del cuaderno original se
  incorpora como control del portal, con las 23 ciudades del Excel en
  orden alfabético y sincronizado con el mapa en ambos sentidos (elegir
  una ciudad selecciona su departamento en el croquis y viceversa). Si el
  departamento activo no tiene ciudad en la base, el control lo indica.

## [0.5.0] — 2026-08-03

### Tendencia Informalidad laboral (segunda tendencia habilitada)

- Configuración de contenido por tendencia (`src/data/tendencias.js`): el
  módulo único de tendencias ahora define por slug el tipo de gráfica, el
  archivo de Excel y el modo de texto. Envejecimiento conserva sus dos
  pirámides; Informalidad usa una serie por ciudad en tarjeta amplia.
- `informalidadService` + `GraficaInformalidad`: porteo 1:1 del cuaderno
  de informalidad (histórico DANE-GEIH 2007–2025, dato parcial 2026,
  proyección Lee-Carter 2026–2042 con banda IC 95 %, anotaciones de
  COVID, hitos e indicadores clave). Colores adaptados a la marca; el
  selector de ciudad del cuaderno lo reemplaza el mapa mediante el
  catálogo departamento → ciudad capital (`src/data/informalidad.js`,
  derivado de los títulos del documento del Observatorio). Tabla oculta
  accesible con la serie completa.
- `excelWorker`/`excelService` generalizados por tipo de base
  ('poblacion' | 'informalidad') con la misma caché IndexedDB firmada.
- `docxService` en modo documento único: divide un solo .docx en
  secciones por departamento a partir de títulos "Ciudad (Departamento)"
  (o el territorio a secas, como "Bogotá"), con comparación insensible a
  tildes; `TextoDepartamento` elige el modo según la tendencia.
- Datos reales en `public/data/tendencias/informalidad-laboral/`
  (base-informalidad.xlsx y articulo-informalidad.docx) e instructivo del
  cliente actualizado con las convenciones del documento único.

### Verificación de la fase (robustez de datos, móvil y accesibilidad)

- Lectura del Excel de informalidad estructuralmente dinámica: la frontera
  histórico/proyección se detecta por el año repetido en la fila de años
  (si falta la marca, "datos en preparación" en vez de series corridas),
  las ciudades se leen hasta la primera fila vacía (sin tope de 23) y las
  búsquedas de ciudad ignoran tildes. Rótulos de años de la figura
  (2042, Ene-Mar 2026, indicadores clave) tomados de la propia base; un
  dato parcial vacío omite su marcador en lugar de mostrar "NaN%".
- Detector de títulos del documento único endurecido: títulos sin
  paréntesis solo desde la lista explícita de la tendencia, títulos
  "Ciudad (Departamento)" validados por partida doble contra el catálogo
  de capitales, y tolerancia a puntuación final. Un documento legible sin
  secciones ya no se re-descarga en cada selección.
- Móvil: la serie conserva su composición y se recorre con desplazamiento
  horizontal dentro de la tarjeta (recorrible también por teclado).
- Nota metodológica como párrafo visible bajo la gráfica (contraste AA y
  accesible a lectores de pantalla) y título de la figura restituido a
  18px como el cuaderno.

## [0.4.1] — 2026-08-02

### Estructura de datos lista para las 9 tendencias

- Carpetas `textos/` y `excel/` creadas para los 9 temas del menú de
  Tendencias en `public/data/tendencias/`, con el instructivo
  `como-actualizar-los-datos.txt` para el cliente (nombres de archivo,
  hoja del Excel y reglas de actualización sin recompilar).

### Ajuste de layout solicitado por el cliente

- El módulo de tendencia pasa a tres tarjetas de igual ancho en escritorio
  (mapa | pirámide | pirámide) con el cuadro de texto en banda completa
  debajo: composición más equilibrada, gráficas ~35% más anchas y mejor
  aprovechamiento del espacio. Los párrafos del análisis limitan su ancho
  de línea (~85 caracteres) para una lectura cómoda. En móvil se conserva
  el apilado (mapa arriba, contenido debajo).

## [0.4.0] — 2026-08-02

### Pirámides poblacionales desde Excel (Reto 3)

**Dependencias de producción**

| Paquete | Versión | Para qué |
|---|---|---|
| xlsx (SheetJS, build oficial) | 0.20.3 | Lectura del Excel de población en el navegador |
| react-plotly.js | 4.1.0 | Integración de Plotly con React |
| plotly.js-basic-dist-min | 3.7.0 | Motor de gráficas (bundle básico: solo los tipos necesarios) |

**Servicios y componentes**

- `excelService`: descarga `base-poblacion.xlsx` de la tendencia, lo
  interpreta con SheetJS (carga diferida) y lo normaliza: solo filas con
  ÁREA GEOGRÁFICA = Total, indexadas por código DANE y año (nunca por
  nombre), con los años disponibles detectados dinámicamente. Una sola
  lectura por tendencia (caché en memoria).
- `piramideService`: porteo 1:1 del script Python del cuaderno de Colab
  (agrupación etaria de 5/10 años, porcentajes sobre Total General, rango
  100+, figura con overlay, rango simétrico ±máximo·1.8, texto con 2
  decimales, leyenda superior). Colores de marca: hombres #005744,
  mujeres #74c1a2. Validado número a número contra las capturas del
  cuaderno (Huila 2018 y 2050: coincidencia exacta en los 21 rangos).
- `PiramidePoblacional`: wrapper de react-plotly.js con el bundle básico;
  Plotly viaja en su propio chunk y solo se descarga al seleccionar el
  primer departamento.
- `SelectorAnio`: selector accesible por gráfica, alimentado por los años
  del Excel; vista por defecto 2018 frente a 2050.
- `ModuloTendencia`: el Excel se pide al entrar al módulo (los datos
  suelen estar listos antes del primer clic), con estados de carga, datos
  en preparación y error con reintento.

### Verificación de la fase (rendimiento, datos y accesibilidad)

- La interpretación del Excel (decenas de segundos por su tamaño) se movió
  a un **Web Worker** (`excelWorker`): la interfaz nunca se congela. El
  resultado compacto se guarda en **IndexedDB** con la firma del archivo
  (tamaño + fecha): las visitas siguientes cargan al instante con una
  validación HEAD, y un Excel reemplazado por el cliente se reinterpreta
  solo. Aviso visible mientras se preparan los datos por primera vez.
- Casos borde del Excel editable: panel sin filas útiles (hoja renombrada
  o columna de área alterada) → "datos en preparación" en vez de interfaz
  rota; encabezados tomados de la fila de títulos real; Total General
  vacío o en cero → aviso "sin datos" en lugar de porcentajes infinitos.
- Título de la gráfica en dos líneas con fuente 13 (los nombres largos
  como "San Andrés y Providencia" ya no se recortan), conservando el texto
  exacto del cuaderno.
- Accesibilidad: tabla oculta con los porcentajes por rango etario junto a
  cada gráfica (equivalente textual, WCAG 1.1.1), selectores de año con
  nombre accesible diferenciado, anuncio de años en la región viva y error
  del Excel con el naranja de marca y botón Reintentar.
- BEM: modificador `--compacto` en lugar de selector anidado; comentarios
  de módulo actualizados al estado real.

## [0.3.0] — 2026-08-02

### Lectura de textos Word (Reto 2)

**Dependencias de producción**

| Paquete | Versión | Para qué |
|---|---|---|
| mammoth | 1.12.0 | Extracción de texto plano de documentos .docx en el navegador |

**Servicios y componentes**

- `docxService`: descarga el documento del departamento desde
  `public/data/tendencias/<tendencia>/textos/<slug>.docx`, extrae el texto
  plano con mammoth (carga diferida en su propio chunk) y lo divide en
  párrafos. Caché en memoria por URL; los archivos inexistentes (404, o un
  servidor que responda HTML) se informan como "en preparación" y no se
  cachean para que aparezcan al subirlos sin recargar.
- `TextoDepartamento`: cuadro de texto del departamento con estados
  cargando / disponible / en preparación / error. Los párrafos se
  renderizan como `<p>` estilizados solo por el CSS del portal (Catamaran);
  los documentos largos se contienen en una región desplazable accesible.
- `ModuloTendencia`: el espacio del cuadro de texto queda conectado al
  documento Word real del departamento seleccionado.

### Verificación de la fase (UX, testing y accesibilidad)

- Descarga del documento y del intérprete en paralelo; la promesa del
  intérprete se libera si su descarga falla (permite reintentar sin
  recargar).
- Errores del servidor (5xx) distinguidos del archivo inexistente (404) y
  botón "Reintentar" en el aviso de error, con contraste AA (el naranja de
  marca queda solo como acento del borde).
- El aviso "Cargando…" solo aparece si la respuesta tarda (sin parpadeo en
  documentos cacheados); documentos vacíos se tratan como "en preparación"
  y no se cachean.
- Anuncio accesible de la selección con región viva breve (el panel ya no
  lee el documento completo); avisos con role status/alert; región de
  texto rotulada por el título visible.
- En móvil el texto fluye completo (sin scroll anidado); en escritorio la
  región desplazable muestra barra fina con color de marca.
- Probado en dev y en build de producción (vite preview) con el documento
  real de Antioquia y departamentos sin documento.

## [0.2.1] — 2026-08-02

### Ajustes solicitados por el cliente

- Fondo del portal en blanco para mayor limpieza visual; el mapa se integra
  al fondo y su contenedor pierde borde, sombra y relleno de tarjeta.
- El croquis de Cauca conserva solo su territorio continental (se retira la
  isla Gorgona; la información del departamento se consulta en el
  continente).
- Se elimina el recuadro de foco que el navegador dibujaba al hacer clic en
  un departamento; la selección se señala con el verde pistacho y el borde
  engrosado, y el foco por teclado conserva su indicador propio.

## [0.2.0] — 2026-08-02

### Fase 2 — Mapa interactivo de Colombia (Reto 1)

**Herramientas de preparación de datos (uso único, fuera del proyecto)**

| Herramienta | Versión | Para qué |
|---|---|---|
| mapshaper (vía npx) | última estable | Simplificación de la geometría oficial a estilo croquis (retención 10%, `keep-shapes`, limpieza topológica) |

**Datos**

- `src/data/colombia-departamentos.json`: geometría de los 32 departamentos
  + Bogotá D.C. derivada del marco geoestadístico del DANE (shapefiles
  oficiales convertidos a GeoJSON EPSG:4326), simplificada a croquis y
  pre-proyectada una sola vez a paths SVG (viewBox 679×920 con margen).
  En ejecución no se proyecta nada. San Andrés, Providencia y Santa
  Catalina van en recuadro inset (islas ampliadas, no a escala, tomadas de
  la geometría original y decimadas para el croquis).

**Componentes**

- `MapaColombia`: croquis SVG inline con 33 zonas clicables como botones
  accesibles, identificadas por código DANE y con `data-departamento`
  legible. Estados de marca: blanco/borde verde oscuro, hover crema,
  seleccionado verde pistacho con borde engrosado (refuerzo no cromático).
  Teclado con tabindex itinerante: una sola parada de Tab y flechas para
  recorrer los departamentos (Inicio/Fin incluidos). San Andrés y
  Providencia como recuadro inset estilo DANE que amplía el área de
  pulsación.
- `ModuloTendencia`: módulo único parametrizado por tendencia; mapa a la
  izquierda y panel derecho renderizado al seleccionar departamento, con
  los espacios de las dos pirámides (Fase 3) y del cuadro de texto
  (Fase 4). Carga diferida con `React.lazy` + `Suspense`; en móvil el mapa
  va arriba, el panel debajo y la selección desplaza el panel a la vista
  (respetando la preferencia de movimiento reducido).

## [0.1.0] — 2026-08-01

### Fase 0 — Andamiaje del proyecto

**Entorno de ejecución**

| Tecnología | Versión | Para qué |
|---|---|---|
| Node.js | 24.18.1 (LTS) | Entorno de ejecución de las herramientas de desarrollo |
| npm | 11.16.0 | Gestor de paquetes |

**Dependencias de producción**

| Paquete | Versión | Para qué |
|---|---|---|
| react | 19.2.8 | Librería de interfaz de usuario (SPA) |
| react-dom | 19.2.8 | Renderizado de React en el navegador |

**Dependencias de desarrollo**

| Paquete | Versión | Para qué |
|---|---|---|
| vite | 8.2.0 | Empaquetador y servidor de desarrollo; build estático con rutas relativas (`base: './'`) |
| @vitejs/plugin-react | 6.0.5 | Integración de React (JSX y recarga en caliente) en Vite |
| eslint | 10.8.0 | Análisis estático de calidad del código |
| @eslint/js | 10.0.1 | Reglas recomendadas de JavaScript para ESLint |
| eslint-plugin-react-hooks | 7.1.1 | Reglas de uso correcto de los hooks de React |
| eslint-plugin-react-refresh | 0.5.3 | Reglas para la recarga en caliente de componentes |
| globals | 17.8.0 | Catálogo de variables globales del navegador para ESLint |

**Estructura creada**

- Estructura de carpetas profesional: `src/components`, `src/modules`,
  `src/services`, `src/data`, `src/styles` y `public/data` (carpeta editable
  por el cliente, fuera del bundle).
- `src/styles/variables.css`: colores y tipografías del manual de marca de
  Comfenalco Antioquia como custom properties.
- `src/styles/base.css`: reset, tipografía global y utilidades de
  accesibilidad.
- Tipografías Google Fonts: **Mitr** (títulos) y **Catamaran** (texto), con
  `display=swap`.
- Datos reales de la tendencia Envejecimiento en
  `public/data/tendencias/envejecimiento/` (`excel/base-poblacion.xlsx` y
  `textos/antioquia.docx` de prueba).

### Fase 1 — Esqueleto del portal

- `Header`: cabecera fija con título del portal, botón hamburguesa (móvil) y
  logo alineado a la derecha según el manual de marca.
- `Logo`: marcador de posición aislado del imagotipo (se reemplazará por el
  SVG oficial en un solo archivo).
- `NavFijo`: menú fijo institucional con sus seis secciones.
- `NavDesplegable`: menú temático con submenú de las nueve tendencias,
  operable con ratón y teclado (hover, clic, Escape, foco visible).
- `App`: navegación por estado interno de React (sin rutas), módulo
  principal único y catálogos de navegación y departamentos en `src/data`.
- `ModuloInicio`: bienvenida provisional con tarjetas de los ejes temáticos.
- `ModuloEnConstruccion`: aviso discreto para secciones sin contenido.
- `Footer`: pie institucional de tres columnas con la marca Comfenalco.
- CSS con metodología BEM estricta: un archivo por bloque, 100% responsive
  (mobile-first).

### Verificación de la entrega (UX, testing y accesibilidad)

- Contraste AA en estados hover y en el anillo de foco (verde oscuro sobre
  superficies claras, pistacho sobre las oscuras) y `scroll-padding` para la
  cabecera pegajosa.
- Título del documento y foco del contenido actualizados al cambiar de
  sección (navegación anunciada a lectores de pantalla).
- Menú desplegable robusto en Safari/Firefox de macOS (blur sin destino) y
  en pantallas táctiles (cierre del submenú al navegar por opción simple).
- Estados activo/hover unificados entre los dos menús en la vista móvil.
- Lint sin errores y build de producción con rutas relativas verificados en
  360 px, 768 px y 1280 px, con navegación completa por teclado.
