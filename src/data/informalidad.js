/**
 * informalidad.js — Catálogo de ciudades de la tendencia Informalidad laboral.
 *
 * La base de informalidad (DANE-GEIH + proyección Lee-Carter) trae datos de
 * las 23 ciudades principales, no de departamentos. Este catálogo mapea el
 * código DANE del departamento seleccionado en el mapa a su ciudad capital
 * en la base, con el nombre EXACTO que usa el Excel. El mapeo proviene de
 * los títulos del documento del Observatorio ("Ciudad (Departamento)").
 *
 * Los departamentos sin ciudad en la base (Cundinamarca, Arauca, Casanare,
 * Putumayo, San Andrés, Amazonas, Guainía, Guaviare, Vaupés y Vichada) no
 * tienen datos en esta tendencia y el módulo lo informa con un aviso.
 */
import { normalizarNombre } from './departamentos.js';

/** Código DANE del departamento → nombre de ciudad tal como está en el Excel. */
export const CIUDAD_POR_DEPARTAMENTO = new Map([
  [5, 'Medellín'],
  [8, 'Barranquilla'],
  [11, 'Bogotá D.C.'],
  [13, 'Cartagena'],
  [15, 'Tunja'],
  [17, 'Manizales'],
  [18, 'Florencia'],
  [19, 'Popayán'],
  [20, 'Valledupar'],
  [23, 'Montería'],
  [27, 'Quibdó'],
  [41, 'Neiva'],
  [44, 'Riohacha'],
  [47, 'Santa Marta'],
  [50, 'Villavicencio'],
  [52, 'Pasto'],
  [54, 'Cúcuta'],
  [63, 'Armenia'],
  [66, 'Pereira'],
  [68, 'Bucaramanga'],
  [70, 'Sincelejo'],
  [73, 'Ibagué'],
  [76, 'Cali'],
]);

/**
 * Ciudad de la base de informalidad para un departamento,
 * o null si el departamento no está cubierto por la base.
 */
export function obtenerCiudadDeDepartamento(codigoDane) {
  return CIUDAD_POR_DEPARTAMENTO.get(Number(codigoDane)) ?? null;
}

/* Índice inverso ciudad → departamento, con claves normalizadas para
   tolerar variaciones de tildes entre el Excel y el catálogo. */
const DEPARTAMENTO_POR_CIUDAD = new Map(
  [...CIUDAD_POR_DEPARTAMENTO].map(([codigoDane, ciudad]) => [
    normalizarNombre(ciudad),
    codigoDane,
  ]),
);

/**
 * Código DANE del departamento al que pertenece una ciudad de la base,
 * o null si la ciudad no está en el catálogo. Permite que el selector de
 * ciudad mueva la selección del mapa.
 */
export function obtenerDepartamentoDeCiudad(nombreCiudad) {
  return DEPARTAMENTO_POR_CIUDAD.get(normalizarNombre(nombreCiudad)) ?? null;
}
