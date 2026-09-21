/**
 * Configuración de Vite para el portal Observatorio Comfenalco.
 *
 * `base: './'` genera el build con rutas RELATIVAS: el sitio funciona en
 * cualquier subdirectorio del servidor propio de Comfenalco sin necesidad
 * de reescrituras (rewrites) ni configuración adicional del servidor.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    watch: {
      /* La biblioteca temporal de fotos del cliente (cientos de archivos de
         10–30 MB y un .zip que Windows mantiene bloqueado) NO se vigila: el
         vigilante de Vite se caía con EBUSY al intentar observarla y el
         servidor moría en silencio (las imágenes dejaban de servirse). */
      ignored: ['**/src/assets/_fotos_prueba/**'],
    },
  },
});
