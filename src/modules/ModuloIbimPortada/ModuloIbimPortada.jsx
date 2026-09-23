/**
 * ModuloIbimPortada — Portada de la sección "IBiM" del menú fijo (0.47.0).
 *
 * Mismo patrón de las portadas de Tendencias e Indicadores: encabezado con
 * antetítulo, presentación corta del Índice de Bienestar Multidimensional
 * y dos tarjetas de acceso con pictograma estilo Comfenalco —"Qué es el
 * IBiM" (descripción, dimensiones y cálculo) y el artículo territorial
 * "El bienestar también tiene geografía"—, más una franja de cifras clave
 * del informe 2023. Navega con onNavegar (contrato de las demás portadas);
 * toda la tarjeta reacciona y navega (clic redundante, el botón es el
 * control accesible). Las entradas también viven en el submenú de IBiM.
 */
import IconoPictograma from '../../components/Pictogramas/IconoPictograma.jsx';
import './modulo-ibim-portada.css';

const ENTRADAS = [
  {
    id: 'ibim-descripcion',
    pictograma: 'ibim-descripcion',
    titulo: 'Qué es el IBiM',
    descripcion:
      'Un índice que mira el bienestar entero: qué mide, las nueve dimensiones que lo componen y la fórmula con la que se calcula.',
    boton: 'Conocer el índice',
  },
  {
    id: 'ibim-articulo',
    /* El artículo comparte el marcador de lugar del eje IBiM */
    pictograma: 'ibim',
    titulo: 'El bienestar también tiene geografía',
    descripcion:
      'Lectura territorial del IBiM en Antioquia: mapas y gráficas que recorren las nueve subregiones y sus brechas.',
    boton: 'Leer el artículo',
  },
];

const CIFRAS = [
  { valor: '89,3', rotulo: 'IBiM de los afiliados (escala de 0 a 100)' },
  { valor: '9', rotulo: 'dimensiones del bienestar' },
  { valor: '77,1 %', rotulo: 'de afiliados con bienestar suficiente' },
];

function ModuloIbimPortada({ onNavegar }) {
  return (
    <section className="modulo-ibim-portada" aria-labelledby="titulo-ibim-portada">
      <header className="modulo-ibim-portada__encabezado">
        <p className="modulo-ibim-portada__contexto">Índice de Bienestar Multidimensional</p>
        <h1 id="titulo-ibim-portada" className="modulo-ibim-portada__titulo">
          IBiM
        </h1>
        <p className="modulo-ibim-portada__descripcion">
          El IBiM resume en una sola cifra, de 0 a 100, cómo viven los afiliados de Comfenalco
          Antioquia en nueve dimensiones de su vida: de la salud y el empleo al disfrute, los
          vínculos y la vivienda. Aquí puede conocer cómo se construye el índice y recorrer lo
          que revela sobre cada subregión del departamento.
        </p>
      </header>

      <ul className="modulo-ibim-portada__cifras" aria-label="Cifras clave del IBiM 2023">
        {CIFRAS.map((cifra) => (
          <li key={cifra.rotulo} className="modulo-ibim-portada__cifra">
            <span className="modulo-ibim-portada__cifra-valor">{cifra.valor}</span>
            <span className="modulo-ibim-portada__cifra-rotulo">{cifra.rotulo}</span>
          </li>
        ))}
      </ul>

      <ul className="modulo-ibim-portada__tarjetas">
        {ENTRADAS.map((entrada) => (
          <li
            key={entrada.id}
            className="modulo-ibim-portada__tarjeta"
            onClick={() => onNavegar(entrada.id)}
          >
            <IconoPictograma id={entrada.pictograma} />
            <div className="modulo-ibim-portada__cuerpo">
              <h2 className="modulo-ibim-portada__tarjeta-titulo">{entrada.titulo}</h2>
              <p className="modulo-ibim-portada__tarjeta-texto">{entrada.descripcion}</p>
              <button
                type="button"
                className="modulo-ibim-portada__boton"
                onClick={(evento) => {
                  evento.stopPropagation();
                  onNavegar(entrada.id);
                }}
              >
                {entrada.boton}
                <span className="modulo-ibim-portada__boton-flecha" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ModuloIbimPortada;
