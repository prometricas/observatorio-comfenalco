# Registro de cambios — Observatorio Comfenalco Antioquia

Registro de tecnologías, plugins y versiones incorporadas al proyecto.
El formato sigue las convenciones de [Keep a Changelog](https://keepachangelog.com/es/)
y el versionado de [SemVer](https://semver.org/lang/es/).

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
