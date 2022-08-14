const LINKEDIN_PATTERN = /^[a-zA-Z0-9._-]+$/;

/**
 * Checks if a value is a valid Discord username
 * @param value
 * @returns
 */
export function isLinkedInUsername(value: any): boolean {
  return LINKEDIN_PATTERN.test(value);
}
