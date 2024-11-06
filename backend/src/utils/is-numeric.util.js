/**
 *
 * @param {unknown} value Can be anything
 * @returns {value is number}
 */
export function isNumeric(value) {
  return Number.isFinite(value);
}
