# Observatorio Comfenalco Antioquia

Portal web del Observatorio de Comfenalco Antioquia: visualización de
indicadores socioeconómicos de Colombia por departamento mediante un mapa
interactivo, gráficas de pirámide poblacional y textos de análisis.

## Características

- **SPA estática** construida con React y Vite, sin backend.
- Los contenidos se alimentan de **archivos planos** (`.docx` y `.xlsx`)
  ubicados en `public/data/`, que pueden reemplazarse en el servidor sin
  recompilar el proyecto.
- CSS con **metodología BEM** estricta y variables de marca centralizadas.
- 100% responsive (enfoque mobile-first) y navegable por teclado.

## Requisitos

- Node.js 20.19 o superior (desarrollado con Node.js 24 LTS).

## Puesta en marcha

```bash
npm install
```

```bash
npm run dev
```

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Build de producción en `dist/` (rutas relativas) |
| `npm run preview` | Previsualización local del build de producción |
| `npm run lint` | Análisis estático del código con ESLint |

## Estructura del proyecto

```
├── public/
│   ├── data/                  # Archivos editables por el cliente (fuera del bundle)
│   │   ├── tendencias/<tendencia>/{textos,excel}/
│   │   └── indicadores/<indicador>/{textos,excel}/
│   └── favicon.svg
├── scripts/
│   └── precalcular-bases.mjs  # Precálculo de bases y textos en cada build
├── src/
│   ├── components/            # Bloques de interfaz reutilizables (un .css BEM por bloque)
│   ├── modules/               # Módulos que se renderizan en el contenedor principal
│   ├── services/              # Lectura y normalización de datos (.docx / .xlsx)
│   ├── data/                  # Catálogos internos (navegación, departamentos)
│   └── styles/                # Variables de marca y estilos base
├── CHANGELOG.md               # Tecnologías, plugins y versiones del proyecto
└── vite.config.js             # Build con rutas relativas (base: './')
```

## Actualización de contenidos

Los archivos de datos viven en `public/data/`, organizados por sección:

- `tendencias/<tendencia>/textos/`: un documento Word por departamento en
  kebab-case y sin tildes (`antioquia.docx`, `norte-de-santander.docx`), o
  un documento único con secciones tituladas por territorio (informalidad
  laboral: `articulo-informalidad.docx`).
- `tendencias/<tendencia>/excel/`: la base de datos de la tendencia
  (`base-poblacion.xlsx`, `base-informalidad.xlsx`).
- `indicadores/<indicador>/`: misma estructura para el eje Indicadores
  (`base-vida-mejor.xlsx`, `resumen-indicadores.docx`…).

Basta con reemplazar el archivo correspondiente en el servidor para que el
portal muestre la información actualizada.

Junto a cada base y documento, el build deja un `.precalculado.json` (y
una variante comprimida `.json.gz` para los grandes) con el contenido ya
interpretado: es lo único que descarga el visitante en la operación
normal. Si un archivo se reemplaza en el servidor sin recompilar, el
portal detecta que el precalculado ya no corresponde y lo interpreta en el
navegador; la vía rápida vuelve con el siguiente `npm run build` (el
precálculo corre automáticamente antes de cada build).

## Despliegue

El build usa rutas relativas, por lo que la carpeta `dist/` puede copiarse a
cualquier directorio o subdirectorio del servidor web sin configuración
adicional:

```bash
npm run build
```
