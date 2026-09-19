/**
 * CaracterizacionFactor — Caracterización prospectiva de un factor de cambio.
 *
 * Pieza compartida por las dos disposiciones del eje: la sección a ancho
 * completo bajo la rueda (escritorio) y el desplegable de cada factor en
 * el acordeón de pantallas angostas (modificador `--compacta`). Presenta,
 * con los datos del anexo del cliente (caracterizacion-factores.js):
 *  - el filtro de AGRUPACIÓN regional (Global / Colombia / Antioquia /
 *    Subregiones) como píldoras conmutables — el patrón de la barra de
 *    Tanques de pensamiento —; la elección la conserva el módulo, así al
 *    cambiar de factor se sigue leyendo la misma agrupación;
 *  - los TRES escenarios (pasado, presente, futuro) de esa agrupación:
 *    tres columnas en escritorio, apilados en la variante compacta;
 *  - la síntesis prospectiva del factor;
 *  - las fuentes de información como desplegable (patrón de acordeón del
 *    portal), con las URL como enlaces que muestran la propia dirección.
 * Los indicadores y las referencias bibliográficas del anexo no se
 * muestran (decisión del cliente).
 *
 * El catálogo llega por props (`catalogo`: el módulo de datos ya
 * importado de forma diferida) y NO se importa aquí: un import estático
 * arrastraría los 340 KB de texto al fragmento principal del eje.
 */
import { useId, useState } from 'react';
import './caracterizacion-factor.css';

/* Divide un texto en fragmentos alternos texto/URL; las URL se muestran
   como enlaces cuyo texto es la propia URL (regla de seguridad del portal:
   un enlace nunca disfraza su destino). */
const URL_EN_TEXTO = /(https?:\/\/[^\s]+)/g;

function renderizarConEnlaces(texto) {
  return texto.split(URL_EN_TEXTO).map((fragmento, indice) =>
    /^https?:\/\//.test(fragmento) ? (
      <a key={indice} href={fragmento} target="_blank" rel="noreferrer">
        {fragmento}
      </a>
    ) : (
      fragmento
    ),
  );
}

function CaracterizacionFactor({ catalogo, factorId, regionId, onCambiarRegion, compacta = false }) {
  const [fuentesAbiertas, setFuentesAbiertas] = useState(false);
  const idGrupo = useId();
  const idFuentes = useId();

  const datos = catalogo.CARACTERIZACION_FACTORES[factorId];
  if (!datos) return null;

  const regiones = catalogo.REGIONES_CARACTERIZACION;
  const region = regiones.find((r) => r.id === regionId) ?? regiones[0];
  const textos = datos.caracterizacion[region.id];

  /* Jerarquía de encabezados según dónde vive la pieza: bajo el h2 de la
     sección de escritorio o bajo el h4 del factor en el acordeón. */
  const Titulo = compacta ? 'h5' : 'h3';

  return (
    <div className={`caracterizacion-factor${compacta ? ' caracterizacion-factor--compacta' : ''}`}>
      {/* Filtro de agrupación regional: píldoras conmutables */}
      <div className="caracterizacion-factor__filtro">
        <span className="caracterizacion-factor__filtro-titulo" id={idGrupo}>
          Agrupación
        </span>
        <div className="caracterizacion-factor__regiones" role="group" aria-labelledby={idGrupo}>
          {regiones.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              className={`caracterizacion-factor__region${
                opcion.id === region.id ? ' caracterizacion-factor__region--activa' : ''
              }`}
              aria-pressed={opcion.id === region.id}
              aria-label={opcion.nombre !== opcion.etiqueta ? opcion.nombre : undefined}
              onClick={() => onCambiarRegion(opcion.id)}
            >
              {opcion.etiqueta}
            </button>
          ))}
        </div>
      </div>
      <p className="caracterizacion-factor__ambito">
        Ámbito: <strong>{region.nombre}</strong>
      </p>

      {/* Los tres escenarios de la agrupación elegida */}
      <div className="caracterizacion-factor__escenarios">
        {catalogo.ESCENARIOS_CARACTERIZACION.map((escenario) => (
          <article
            key={escenario.id}
            className={`caracterizacion-factor__escenario caracterizacion-factor__escenario--${escenario.id}`}
          >
            <Titulo className="caracterizacion-factor__escenario-titulo">
              {escenario.etiqueta}
              {escenario.descripcion && (
                <span className="caracterizacion-factor__escenario-detalle">
                  {escenario.descripcion}
                </span>
              )}
            </Titulo>
            {textos[escenario.id].map((parrafo, indice) => (
              /* El catálogo es fijo: la posición identifica al párrafo */
              <p key={indice} className="caracterizacion-factor__parrafo">
                {parrafo}
              </p>
            ))}
          </article>
        ))}
      </div>

      {/* Síntesis prospectiva del factor */}
      <div className="caracterizacion-factor__sintesis">
        <Titulo className="caracterizacion-factor__subtitulo">Síntesis prospectiva</Titulo>
        {datos.sintesis.map((parrafo, indice) => (
          <p key={indice} className="caracterizacion-factor__parrafo">
            {parrafo}
          </p>
        ))}
      </div>

      {/* Fuentes de información, plegadas por defecto */}
      <div className="caracterizacion-factor__fuentes">
        <Titulo className="caracterizacion-factor__fuentes-titulo">
          <button
            type="button"
            className="caracterizacion-factor__fuentes-boton"
            aria-expanded={fuentesAbiertas}
            aria-controls={idFuentes}
            onClick={() => setFuentesAbiertas((estado) => !estado)}
          >
            Fuentes de información
            <span className="caracterizacion-factor__fuentes-conteo">({datos.fuentes.length})</span>
            <span
              className={`caracterizacion-factor__cheuron${
                fuentesAbiertas ? ' caracterizacion-factor__cheuron--abierto' : ''
              }`}
              aria-hidden="true"
            />
          </button>
        </Titulo>
        {fuentesAbiertas && (
          <ul id={idFuentes} className="caracterizacion-factor__fuentes-lista">
            {datos.fuentes.map((fuente) => (
              <li key={fuente.nombre} className="caracterizacion-factor__fuente">
                <span className="caracterizacion-factor__fuente-nombre">{fuente.nombre}</span>
                {fuente.descripcion.map((parrafo, indice) => (
                  <p key={indice} className="caracterizacion-factor__fuente-texto">
                    {renderizarConEnlaces(parrafo)}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CaracterizacionFactor;
