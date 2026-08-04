/**
 * LimiteDeError — Red de seguridad del contenedor principal.
 *
 * Envuelve el módulo que se está mostrando y captura cualquier fallo que
 * ocurra al renderizarlo, incluida la causa más probable en producción:
 * que el archivo de un módulo no llegue al navegador (conexión caída o
 * archivo ausente tras una actualización del servidor). En vez de dejar
 * el portal en blanco, muestra el módulo 404 con una salida al inicio.
 *
 * Es un componente de clase porque React solo ofrece la captura de
 * errores de renderizado (`getDerivedStateFromError`) en esta forma.
 *
 * Se le pasa `key` con la sección activa desde App: al navegar a otra
 * sección el límite se reinicia y vuelve a intentar el renderizado.
 */
import { Component } from 'react';
import ModuloNoEncontrado from '../../modules/ModuloNoEncontrado/ModuloNoEncontrado.jsx';

class LimiteDeError extends Component {
  constructor(props) {
    super(props);
    this.state = { hayFallo: false };
  }

  /* React llama a este método cuando un descendiente falla al renderizar. */
  static getDerivedStateFromError() {
    return { hayFallo: true };
  }

  render() {
    if (this.state.hayFallo) {
      return (
        <ModuloNoEncontrado
          descripcion="No fue posible cargar este contenido. Compruebe su conexión e inténtelo de nuevo."
          onVolver={this.props.onVolver}
        />
      );
    }

    return this.props.children;
  }
}

export default LimiteDeError;
