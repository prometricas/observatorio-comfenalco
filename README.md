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
│   │   └── tendencias/<tendencia>/{textos,excel}/
│   └── favicon.svg
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

Los archivos de datos viven en `public/data/tendencias/<tendencia>/`:

- `textos/`: un documento Word por departamento, nombrado en kebab-case y
  sin tildes (por ejemplo `antioquia.docx`, `norte-de-santander.docx`).
- `excel/`: la base de datos de la tendencia (`base-poblacion.xlsx`).

Basta con reemplazar el archivo correspondiente en el servidor para que el
portal muestre la información actualizada.

## Despliegue

El build usa rutas relativas, por lo que la carpeta `dist/` puede copiarse a
cualquier directorio o subdirectorio del servidor web sin configuración
adicional:

```bash
npm run build
```
