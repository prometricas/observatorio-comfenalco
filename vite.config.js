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
});
