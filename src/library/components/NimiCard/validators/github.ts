const DISCORD_USERNAME_PATTERN = /\w+#\d{4}/i;

/**
 * Checks if a value is a valid Discord username
 * @param value
 * @returns
 */
export function isGithubUsername(value: any): boolean {
  return DISCORD_USERNAME_PATTERN.test(value);
}
