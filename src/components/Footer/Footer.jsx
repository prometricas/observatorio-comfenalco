/**
 * Footer — Pie de página institucional del portal.
 *
 * Cuatro columnas (distribución del pie del observatorio del Ceplan,
 * petición del cliente 2026-09-21): presentación del Observatorio, enlaces
 * de interés a todas las secciones (navegan por el estado interno de la
 * App), contacto de Comfenalco Antioquia (sede administrativa, líneas de
 * atención, horario y portal, tomados de su sitio institucional) y redes
 * sociales. Cierra con una franja blanca con los derechos reservados y el
 * sello "Vigilado Supersubsidio" —obligatorio para las cajas de
 * compensación— enlazado a la Superintendencia del Subsidio Familiar.
 *
 * Desde 0.42.0 (ajuste del cliente: el pie verde oscuro resultaba muy
 * pesado y su borde muy brusco) el pie es CLARO —verde tenue sobre el
 * degradado del portal— y arranca con una curva cóncava (SVG estirado a
 * lo ancho) en vez de una línea recta, como el pie del portal de
 * Comfenalco Antioquia.
 */
import {
  OPCIONES_NAV_DESPLEGABLE,
  OPCIONES_NAV_FIJO,
  SECCION_INICIO,
} from '../../data/navegacion.js';
import { URL_COMFENALCO_ANTIOQUIA } from '../Logo/Logo.jsx';
import selloVigilado from '../../assets/marca/vigilado-supersubsidio.webp';
import './footer.css';

/* Datos de contacto publicados por Comfenalco Antioquia en su portal
   (canales de atención y listado de sedes, consultados el 2026-09-21). */
const CONTACTO = {
  sede: 'Sede Administrativa Palacé',
  direccion: 'Carrera 50 # 53-43, Medellín, Antioquia',
  telefonos: [
    { etiqueta: 'Área Metropolitana', numero: '(604) 444 71 10', tel: '+576044447110' },
    { etiqueta: 'Resto del departamento', numero: '01 8000 427 111', tel: '018000427111' },
  ],
  horario: 'Lunes a viernes de 7:00 a. m. a 5:00 p. m. y sábados de 8:00 a. m. a 12:00 m.',
  sitio: { etiqueta: 'www.comfenalcoantioquia.com.co', url: URL_COMFENALCO_ANTIOQUIA },
};

/* Redes sociales oficiales de Comfenalco Antioquia. Los pictogramas son
   trazos propios simplificados (sin librerías ni recursos externos). */
const REDES_SOCIALES = [
  {
    id: 'facebook',
    nombre: 'Facebook',
    url: 'https://www.facebook.com/ComfenalcoAnt',
    icono: (
      <path d="M13.6 22v-8.1h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.5v3.2h2.7V22h3.4z" />
    ),
  },
  {
    id: 'instagram',
    nombre: 'Instagram',
    url: 'https://www.instagram.com/comfenalcoant/',
    icono: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.3" cy="6.7" r="1.3" />
      </>
    ),
  },
  {
    id: 'x',
    nombre: 'X',
    url: 'https://x.com/ComfenalcoAnt',
    icono: (
      <path
        d="M4.5 4.5l15 15M19.5 4.5l-15 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    ),
  },
  {
    id: 'youtube',
    nombre: 'YouTube',
    url: 'https://www.youtube.com/@comfenalcoantioquia',
    icono: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10 9.2v5.6l5-2.8z" className="footer__red-hueco" />
      </>
    ),
  },
  {
    id: 'tiktok',
    nombre: 'TikTok',
    url: 'https://www.tiktok.com/@comfenalcoantioquia',
    icono: (
      <path d="M16.2 3c.3 2.4 1.9 4 4.3 4.2v3.1c-1.6 0-3.1-.5-4.3-1.4v6.2c0 3.3-2.7 5.9-5.9 5.9S4.4 18.4 4.4 15.1s2.7-5.9 5.9-5.9c.3 0 .6 0 .9.1v3.2c-.3-.1-.6-.2-.9-.2-1.5 0-2.8 1.3-2.8 2.8s1.3 2.8 2.8 2.8 2.8-1.3 2.8-2.8V3h3.1z" />
    ),
  },
  {
    id: 'linkedin',
    nombre: 'LinkedIn',
    url: 'https://www.linkedin.com/company/comfenalco-antioquia/',
    icono: (
      <path d="M6.6 9.6h-3V21h3V9.6zM5.1 4.4a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM21 21h-3v-5.7c0-1.6-.6-2.5-1.9-2.5-1.2 0-1.9.8-1.9 2.5V21h-3V9.6h3V11c.6-1 1.7-1.7 3.2-1.7 2.4 0 3.6 1.5 3.6 4.3V21z" />
    ),
  },
];

/** Superintendencia del Subsidio Familiar: destino obligatorio del sello. */
const URL_SUPERSUBSIDIO = 'https://www.ssf.gov.co/';

/* Enlaces de interés: todas las secciones de los dos menús, sin "Inicio"
   (el título del portal ya lleva a la portada). */
const ENLACES_INTERES = [
  ...OPCIONES_NAV_DESPLEGABLE,
  ...OPCIONES_NAV_FIJO.filter((opcion) => opcion.id !== SECCION_INICIO),
];

function Footer({ onNavegar }) {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Borde superior cóncavo: el fondo del portal se asoma en el centro */}
      <svg
        className="footer__curva"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 0C30 14 70 14 100 0v12H0z" />
      </svg>

      <div className="footer__cuerpo">
        <div className="footer__contenido">
          {/* Columna 1: qué es el Observatorio */}
          <section className="footer__columna footer__columna--presentacion">
            <h2 className="footer__titulo">Observatorio Comfenalco Antioquia</h2>
            <p className="footer__descripcion">
              Plataforma de inteligencia estratégica sobre tendencias,
              indicadores, factores de cambio, riesgos y oportunidades del
              entorno social y económico, al servicio de la toma de
              decisiones con perspectiva de futuro.
            </p>
          </section>

          {/* Columna 2: accesos a todas las secciones */}
          <nav className="footer__columna" aria-label="Enlaces de interés">
            <h2 className="footer__titulo">Enlaces de interés</h2>
            <ul className="footer__lista footer__lista--enlaces">
              {ENLACES_INTERES.map((opcion) => (
                <li key={opcion.id} className="footer__elemento">
                  <button
                    type="button"
                    className="footer__enlace"
                    onClick={() => onNavegar(opcion.id)}
                  >
                    {opcion.etiqueta}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Columna 3: contacto institucional */}
          <section className="footer__columna">
            <h2 className="footer__titulo">Contacto</h2>
            <address className="footer__contacto">
              <p className="footer__contacto-linea">
                <span className="footer__contacto-rotulo">Comfenalco Antioquia</span>
                Caja de Compensación Familiar
              </p>
              <p className="footer__contacto-linea">
                <span className="footer__contacto-rotulo">{CONTACTO.sede}</span>
                {CONTACTO.direccion}
              </p>
              {CONTACTO.telefonos.map((telefono) => (
                <p key={telefono.tel} className="footer__contacto-linea">
                  <span className="footer__contacto-rotulo">{telefono.etiqueta}</span>
                  <a className="footer__enlace footer__enlace--en-linea" href={`tel:${telefono.tel}`}>
                    {telefono.numero}
                  </a>
                </p>
              ))}
              <p className="footer__contacto-linea">
                <span className="footer__contacto-rotulo">Horario de atención</span>
                {CONTACTO.horario}
              </p>
              <p className="footer__contacto-linea">
                <a
                  className="footer__enlace footer__enlace--en-linea"
                  href={CONTACTO.sitio.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {CONTACTO.sitio.etiqueta}
                </a>
              </p>
            </address>
          </section>

          {/* Columna 4: redes sociales */}
          <section className="footer__columna">
            <h2 className="footer__titulo">Síguenos</h2>
            <ul className="footer__redes">
              {REDES_SOCIALES.map((red) => (
                <li key={red.id} className="footer__red">
                  <a
                    className="footer__red-enlace"
                    href={red.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${red.nombre} de Comfenalco Antioquia (se abre en una pestaña nueva)`}
                  >
                    <svg
                      className="footer__red-icono"
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      {red.icono}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Franja inferior: derechos reservados y sello de vigilancia */}
      <div className="footer__legal">
        <div className="footer__legal-contenido">
          <p className="footer__derechos">
            © {anioActual} Caja de Compensación Familiar Comfenalco Antioquia ·
            Observatorio. Todos los derechos reservados.
          </p>
          <a
            className="footer__vigilado"
            href={URL_SUPERSUBSIDIO}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="footer__vigilado-sello"
              src={selloVigilado}
              alt="Vigilado Supersubsidio"
              width="900"
              height="139"
              loading="lazy"
              decoding="async"
            />
            <span className="oculto-accesible">
              Superintendencia del Subsidio Familiar (se abre en una pestaña nueva)
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
