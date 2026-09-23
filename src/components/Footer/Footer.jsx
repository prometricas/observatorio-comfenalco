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
 * pesado y su borde muy brusco) el pie es CLARO. Desde 0.46.0 (referencia:
 * pie de matriculascomfenalcoantioquia.com.co) es GRIS claro —se
 * distingue del degradado verde del portal— y arranca con una silueta de
 * MONTAÑAS hacia el centro (las que rodean a Medellín) con aves
 * sobrevolando, en tres capas de gris; listas con viñeta, redes en
 * círculos pistacho y las entidades del sector bajo un filete en la
 * columna "Síguenos". La franja de derechos va al pie del mismo bloque.
 */
import {
  OPCIONES_NAV_DESPLEGABLE,
  OPCIONES_NAV_FIJO,
  SECCION_INICIO,
} from '../../data/navegacion.js';
import { URL_COMFENALCO_ANTIOQUIA } from '../Logo/Logo.jsx';
import selloVigilado from '../../assets/marca/vigilado-supersubsidio.webp';
import logoMinTrabajo from '../../assets/marca/logo-ministerio-trabajo.webp';
import logoServicioEmpleo from '../../assets/marca/logo-servicio-publico-empleo.webp';
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

/* Entidades del sector en la franja legal (0.43.0, referencia del pie de
   Comfenalco Valle): Ministerio del Trabajo, Servicio Público de Empleo
   (la Agencia de Empleo de la caja hace parte de su red) y el sello
   "Vigilado Supersubsidio", obligatorio. Los logos son WebP con
   transparencia y solo se fija su altura. Para añadir otra entidad
   (p. ej. Vigilado Supersalud si Comfenalco lo confirma): una entrada. */
const ENTIDADES = [
  {
    id: 'mintrabajo',
    nombre: 'Ministerio del Trabajo',
    url: 'https://www.mintrabajo.gov.co/',
    imagen: logoMinTrabajo,
    ancho: 448,
    alto: 160,
  },
  {
    id: 'servicio-publico-empleo',
    nombre: 'Servicio Público de Empleo',
    url: 'https://www.serviciodeempleo.gov.co/',
    imagen: logoServicioEmpleo,
    ancho: 227,
    alto: 160,
  },
  {
    id: 'supersubsidio',
    nombre: 'Vigilado Supersubsidio (Superintendencia del Subsidio Familiar)',
    url: 'https://www.ssf.gov.co/',
    imagen: selloVigilado,
    ancho: 900,
    alto: 139,
  },
];

/* Silueta del borde superior (0.46.0, petición del cliente: montañas hacia
   el centro que evoquen las que rodean a Medellín, con aves; 0.46.1:
   perfiles SUAVES y aves en silueta repartidas a los lados). Lienzo
   1600×260: tres capas —cordillera lejana y media, colinas cercanas del
   color del pie— trazadas como curvas suaves por sus puntos (Catmull-Rom
   → Bézier), y cuatro aves pequeñas rellenas (gaviota planeando / ave
   aleteando, alguna en espejo). Para retocar el perfil basta editar los puntos;
   previsualización en el scratchpad marca/montanas.mjs. */
const ALTO_LIENZO = 260;
const redondear = (n) => Math.round(n * 10) / 10;

/** Ruta cerrada contra el borde inferior que pasa suavemente por `puntos`. */
function siluetaSuave(puntos) {
  const p = puntos;
  let d = `M0 ${ALTO_LIENZO}V${redondear(p[0][1])}L${p[0][0]} ${redondear(p[0][1])}`;
  for (let i = 0; i < p.length - 1; i += 1) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${redondear(c1[0])} ${redondear(c1[1])} ${redondear(c2[0])} ${redondear(c2[1])} ${p2[0]} ${redondear(p2[1])}`;
  }
  return `${d}V${ALTO_LIENZO}Z`;
}

const CORDILLERA_LEJANA = siluetaSuave([
  [0, 214], [120, 198], [250, 186], [360, 166], [430, 178], [520, 136], [600, 154], [680, 108],
  [760, 128], [820, 82], [900, 116], [960, 102], [1040, 144], [1110, 130], [1200, 168],
  [1300, 182], [1420, 196], [1600, 212],
]);
const CORDILLERA_MEDIA = siluetaSuave([
  [0, 234], [150, 224], [300, 212], [400, 214], [500, 176], [580, 192], [660, 160], [740, 176],
  [830, 148], [910, 168], [990, 154], [1080, 190], [1180, 204], [1300, 212], [1450, 222],
  [1600, 232],
]);
const COLINAS_CERCANAS = siluetaSuave([
  [0, 246], [200, 236], [400, 222], [560, 212], [700, 226], [860, 208], [1000, 214],
  [1160, 232], [1320, 226], [1480, 238], [1600, 244],
]);

/* Aves en silueta: gaviota planeando y ave con las alas altas (76 y 72 de
   envergadura en el lienzo). */
const AVE_PLANEA =
  'M0 10C10 2 20 0 30 6C34 8 36 11 38 14C40 11 42 8 46 6C56 0 66 2 76 10C66 8 58 9 50 13C46 15 42 18 38 22C34 18 30 15 26 13C18 9 10 8 0 10Z';
const AVE_ALETEA =
  'M4 18C10 6 20 0 30 4C34 6 36 10 38 14C40 10 42 6 46 4C56 0 66 6 72 18C64 11 56 9 50 13C46 15 42 18 38 22C34 18 30 15 26 13C20 9 12 11 4 18Z';
/* [x, y, escala, aleteando, espejo]: cuatro aves PEQUEÑAS (0.46.2, escala
   0,2–0,3 → 15–25 px de envergadura en escritorio: tamaño creíble a la
   distancia de las montañas), repartidas a ambos lados y al centro */
const AVES = [
  [260, 104, 0.26, false, false],
  [720, 58, 0.3, true, false],
  [960, 80, 0.22, false, true],
  [1340, 100, 0.2, false, false],
];

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
      {/* Borde superior: cordilleras suaves hacia el centro (las montañas que
          rodean a Medellín) con aves sobrevolando a ambos lados. Tres capas
          de gris, de la más lejana a las colinas cercanas del color del pie.
          El cuerpo del pie se superpone a la franja baja del dibujo (fondo
          transparente en esa franja), así alguna cresta pasa por DETRÁS de
          los títulos. El SVG conserva su proporción; en pantallas angostas
          recorta los lados para que las montañas centrales se vean. */}
      <svg
        className="footer__montanas"
        viewBox={`0 0 1600 ${ALTO_LIENZO}`}
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        focusable="false"
      >
        <path className="footer__cordillera footer__cordillera--lejana" d={CORDILLERA_LEJANA} />
        <path className="footer__cordillera footer__cordillera--media" d={CORDILLERA_MEDIA} />
        <path className="footer__cordillera footer__cordillera--cercana" d={COLINAS_CERCANAS} />
        <g className="footer__aves">
          {AVES.map(([x, y, escala, aletea, espejo]) => (
            <path
              key={`${x}-${y}`}
              d={aletea ? AVE_ALETEA : AVE_PLANEA}
              transform={`translate(${x} ${y}) scale(${espejo ? -escala : escala} ${escala})`}
            />
          ))}
        </g>
      </svg>

      <div className="footer__cuerpo">
        <div className="footer__contenido">
          {/* Columna 1: qué es el Observatorio */}
          <section className="footer__columna footer__columna--presentacion">
            <h2 className="footer__titulo">Observatorio prospectivo del bienestar integral</h2>
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

          {/* Columna 4: redes sociales y, bajo un filete, las entidades del
              sector (disposición del pie de matriculascomfenalcoantioquia) */}
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

            <ul className="footer__entidades" aria-label="Entidades del sector">
              {ENTIDADES.map((entidad) => (
                <li key={entidad.id} className="footer__entidad">
                  <a
                    className="footer__entidad-enlace"
                    href={entidad.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="footer__entidad-logo"
                      src={entidad.imagen}
                      alt={entidad.nombre}
                      width={entidad.ancho}
                      height={entidad.alto}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="oculto-accesible">(se abre en una pestaña nueva)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Aviso de transparencia (petición del cliente 2026-09-23): uso
            ético de IA en textos, imágenes y gráficas, y respeto a los
            autores originales; al final del pie, en tono muy discreto */}
        <p className="footer__aviso">
          Aviso de transparencia. En la redacción de algunos artículos del
          Observatorio, y en el diseño de algunas imágenes y gráficas, se
          emplearon herramientas de inteligencia artificial de manera ética y
          bajo revisión editorial del equipo. Las ideas, cifras y hallazgos
          pertenecen a sus autores y fuentes originales, a quienes se reconoce
          y cita en las referencias bibliográficas que acompañan cada contenido.
        </p>

        {/* Línea de derechos reservados */}
        <p className="footer__derechos">
          © {anioActual} Caja de Compensación Familiar Comfenalco Antioquia · Observatorio.
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
