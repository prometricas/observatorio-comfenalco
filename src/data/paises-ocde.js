/**
 * paises-ocde.js — Nombres en español de los países de la base OCDE.
 *
 * La base llega con los nombres en inglés ("Germany", "Switzerland"); el
 * portal es en español, así que se traducen para mostrarlos.
 *
 * La traducción se busca por CÓDIGO ISO y no por nombre: el código es el
 * identificador estable del archivo, igual que se hace con el código DANE
 * en los módulos de tendencias. Si un país no está en el catálogo —porque
 * el cliente amplíe la base— se muestra su nombre original sin romper
 * nada.
 */

const NOMBRES_ES = {
  AUS: 'Australia',
  AUT: 'Austria',
  BEL: 'Bélgica',
  CAN: 'Canadá',
  CHL: 'Chile',
  COL: 'Colombia',
  CRI: 'Costa Rica',
  CZE: 'Chequia',
  DNK: 'Dinamarca',
  EST: 'Estonia',
  FIN: 'Finlandia',
  FRA: 'Francia',
  DEU: 'Alemania',
  GRC: 'Grecia',
  HUN: 'Hungría',
  ISL: 'Islandia',
  IRL: 'Irlanda',
  ISR: 'Israel',
  ITA: 'Italia',
  JPN: 'Japón',
  LVA: 'Letonia',
  LTU: 'Lituania',
  LUX: 'Luxemburgo',
  MEX: 'México',
  NLD: 'Países Bajos',
  NZL: 'Nueva Zelanda',
  NOR: 'Noruega',
  POL: 'Polonia',
  PRT: 'Portugal',
  SVK: 'Eslovaquia',
  SVN: 'Eslovenia',
  KOR: 'Corea del Sur',
  ESP: 'España',
  SWE: 'Suecia',
  CHE: 'Suiza',
  TUR: 'Turquía',
  GBR: 'Reino Unido',
  USA: 'Estados Unidos',
};

/**
 * Nombre en español de un país a partir de su código ISO. Si el código no
 * está catalogado, devuelve el nombre original del archivo.
 */
export function nombreEsPais(codigo, nombreOriginal) {
  return NOMBRES_ES[codigo] ?? nombreOriginal;
}
