const REDDIT_PATTERN = /[A-Za-z0-9_-]+$/;
/**
 * Checks if a value is a valid Discord username
 * @param value
 * @returns
 */
export function isRedditUsername(value: any): boolean {
  return REDDIT_PATTERN.test(value);
}
