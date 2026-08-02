/**
 * main.jsx — Punto de entrada de la aplicación.
 *
 * Monta el componente raíz <App /> en el nodo #root de index.html y carga
 * los estilos globales (variables de marca y reset tipográfico).
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/variables.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
