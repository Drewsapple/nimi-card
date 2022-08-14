const GITHUB_PATTERN = /^[a-zA-Z0-9._-]+$/;

/**
 * Checks if a value is a valid Discord username
 * @param value
 * @returns
 */
export function isGithubUsername(value: any): boolean {
  return GITHUB_PATTERN.test(value);
}
