const TWITER_PATTER = /^[a-zA-Z0-9_]{1,15}$/;

/**
 * Checks if a value is a valid Discord username
 * @param value
 * @returns
 */
export function isTwitterUsername(value: any): boolean {
  return TWITER_PATTER.test(value);
}
