# Registro de cambios — Observatorio Comfenalco Antioquia

Registro de tecnologías, plugins y versiones incorporadas al proyecto.
El formato sigue las convenciones de [Keep a Changelog](https://keepachangelog.com/es/)
y el versionado de [SemVer](https://semver.org/lang/es/).

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
