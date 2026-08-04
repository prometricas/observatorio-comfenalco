/**
 * departamentos.js — Catálogo oficial de departamentos de Colombia.
 *
 * Mapea cada una de las 33 zonas del portal (32 departamentos + Bogotá D.C.)
 * con su código DANE, su nombre legible y el slug de archivo (kebab-case,
 * sin tildes) usado para los documentos Word en `public/data/`.
 *
 * Regla del proyecto: toda búsqueda en el Excel de población se hace por
 * `codigoDane` (columna DP), NUNCA por nombre, porque la columna DPNOM trae
 * variantes inconsistentes ("Quindio"/"Quindío", dos formas de San Andrés).
 */

export const DEPARTAMENTOS = [
  { codigoDane: 5, nombre: 'Antioquia', slugArchivo: 'antioquia' },
  { codigoDane: 8, nombre: 'Atlántico', slugArchivo: 'atlantico' },
  { codigoDane: 11, nombre: 'Bogotá D.C.', slugArchivo: 'bogota-dc' },
  { codigoDane: 13, nombre: 'Bolívar', slugArchivo: 'bolivar' },
  { codigoDane: 15, nombre: 'Boyacá', slugArchivo: 'boyaca' },
  { codigoDane: 17, nombre: 'Caldas', slugArchivo: 'caldas' },
  { codigoDane: 18, nombre: 'Caquetá', slugArchivo: 'caqueta' },
  { codigoDane: 19, nombre: 'Cauca', slugArchivo: 'cauca' },
  { codigoDane: 20, nombre: 'Cesar', slugArchivo: 'cesar' },
  { codigoDane: 23, nombre: 'Córdoba', slugArchivo: 'cordoba' },
  { codigoDane: 25, nombre: 'Cundinamarca', slugArchivo: 'cundinamarca' },
  { codigoDane: 27, nombre: 'Chocó', slugArchivo: 'choco' },
  { codigoDane: 41, nombre: 'Huila', slugArchivo: 'huila' },
  { codigoDane: 44, nombre: 'La Guajira', slugArchivo: 'la-guajira' },
  { codigoDane: 47, nombre: 'Magdalena', slugArchivo: 'magdalena' },
  { codigoDane: 50, nombre: 'Meta', slugArchivo: 'meta' },
  { codigoDane: 52, nombre: 'Nariño', slugArchivo: 'narino' },
  { codigoDane: 54, nombre: 'Norte de Santander', slugArchivo: 'norte-de-santander' },
  { codigoDane: 63, nombre: 'Quindío', slugArchivo: 'quindio' },
  { codigoDane: 66, nombre: 'Risaralda', slugArchivo: 'risaralda' },
  { codigoDane: 68, nombre: 'Santander', slugArchivo: 'santander' },
  { codigoDane: 70, nombre: 'Sucre', slugArchivo: 'sucre' },
  { codigoDane: 73, nombre: 'Tolima', slugArchivo: 'tolima' },
  { codigoDane: 76, nombre: 'Valle del Cauca', slugArchivo: 'valle-del-cauca' },
  { codigoDane: 81, nombre: 'Arauca', slugArchivo: 'arauca' },
  { codigoDane: 85, nombre: 'Casanare', slugArchivo: 'casanare' },
  { codigoDane: 86, nombre: 'Putumayo', slugArchivo: 'putumayo' },
  { codigoDane: 88, nombre: 'San Andrés y Providencia', slugArchivo: 'san-andres' },
  { codigoDane: 91, nombre: 'Amazonas', slugArchivo: 'amazonas' },
  { codigoDane: 94, nombre: 'Guainía', slugArchivo: 'guainia' },
  { codigoDane: 95, nombre: 'Guaviare', slugArchivo: 'guaviare' },
  { codigoDane: 97, nombre: 'Vaupés', slugArchivo: 'vaupes' },
  { codigoDane: 99, nombre: 'Vichada', slugArchivo: 'vichada' },
];

/**
 * Normaliza un nombre para compararlo sin tildes, mayúsculas ni signos:
 * "Bogotá D.C." → "bogota dc". Se usa para casar nombres de departamentos
 * escritos con variaciones (documentos del cliente, encabezados de Excel).
 */
export function normalizarNombre(nombre) {
  return String(nombre ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9ñ ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* Índice código DANE → departamento para consultas directas. */
const DEPARTAMENTOS_POR_CODIGO = new Map(
  DEPARTAMENTOS.map((departamento) => [departamento.codigoDane, departamento]),
);

/**
 * Devuelve el departamento correspondiente a un código DANE,
 * o `undefined` si el código no pertenece al catálogo.
 */
export function obtenerDepartamentoPorCodigo(codigoDane) {
  return DEPARTAMENTOS_POR_CODIGO.get(Number(codigoDane));
}
