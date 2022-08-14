const TWITCH_PATTERN = /^(#)?[a-zA-Z0-9]{4,25}$/;

/**
 * Checks if a value is a valid Discord username
 * @param value
 * @returns
 */
export function isTwitchUsername(value: any): boolean {
  return TWITCH_PATTERN.test(value);
}
