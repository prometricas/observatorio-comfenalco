# Despliegue del portal en cualquier servidor

El build (`npm run build`) deja en `dist/` un sitio **100 % estático y
portable**: rutas relativas (funciona en la raíz o en cualquier
subcarpeta), sin reescrituras de URL, sin backend y sin variables de
entorno. Para publicar, se sube **el contenido de `dist/`** (quitando
antes los `.gitkeep`) a la carpeta pública del servidor.

`dist/` incluye la configuración para los servidores más comunes; cada
uno lee la suya e ignora las demás:

| Servidor | Archivo | Se aplica… |
|---|---|---|
| Netlify | `_headers` | automáticamente |
| Apache | `.htaccess` | automáticamente, si el directorio permite `.htaccess` (ver abajo) |
| IIS (Windows Server) | `web.config` | automáticamente |
| nginx | — | copiar `deploy/nginx-observatorio.conf.ejemplo` a la configuración del servidor |

Los tres archivos llevan lo mismo: las **cabeceras de seguridad** de la
auditoría del portal (CSP, nosniff, X-Frame-Options, Referrer-Policy,
Permissions-Policy), los **tipos MIME** que algunas instalaciones no
declaran (`.json`, `.webp`, `.gz`, `.xlsx`, `.docx`) y la **política de
caché**: bundles con hash inmutables por un año y `/data/*` siempre
fresco — esto último es importante porque el cliente puede reemplazar
los Excel/Word de `data/` sin recompilar y el portal valida los cambios
con peticiones HEAD.

## Notas por servidor

- **Apache:** si las cabeceras no aparecen, el hosting tiene
  `AllowOverride None`; pedir que lo habiliten (`AllowOverride
  FileInfo`) o trasladar el contenido de `.htaccess` al `VirtualHost`.
  Requiere los módulos habituales `mod_headers` y `mod_mime` (el archivo
  los protege con `IfModule`: si faltan, el sitio funciona igual, solo
  sin esa parte).
- **IIS:** no requiere pasos extra; `web.config` se aplica al copiar los
  archivos. Si el sitio vive en una subcarpeta de otra aplicación .NET,
  verificar que no haya herencia de configuración en conflicto.
- **nginx:** ajustar `server_name` y `root` en el ejemplo. Para HTTPS,
  añadir el bloque de certificados de la organización.
- **Cualquier otro servidor o CDN:** el sitio funciona sirviendo los
  archivos tal cual; lo único recomendable es replicar las cabeceras de
  seguridad y la regla "no cachear `/data/*`".

## Comprobación rápida tras publicar

1. Abrir el portal y navegar a una tendencia con datos (Envejecimiento):
   si carga el mapa y las pirámides, los `.json`/`.gz` se sirven bien.
2. En las herramientas del navegador (pestaña Red), confirmar que la
   respuesta de `index.html` trae `Content-Security-Policy`.
3. Confirmar que `data/...precalculado.json` responde `Cache-Control:
   no-cache` y los archivos de `assets/` responden `max-age=31536000`.
