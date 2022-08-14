const MEDIUM_USERNAME = /^[@][A-Za-z0-9_]{7,29}$/;

/**
 * Checks if a value is a valid Discord username
 * @param value
 * @returns
 */
export function isMediumUsername(value: any): boolean {
  return MEDIUM_USERNAME.test(value);
}
