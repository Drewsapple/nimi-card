const INSTAGRAM_PATTERN = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;

/**
 * Checks if a value is a valid Discord username
 * @param value
 * @returns
 */
export function isInstagramUsername(value: any): boolean {
  return INSTAGRAM_PATTERN.test(value);
}
