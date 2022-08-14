const YOUTUBE_PATTERN = /[a-zA-Z0-9_-]/;

/**
 * Checks if a value is a valid Discord username
 * @param value
 * @returns
 */
export function isYoutubeUsername(value: any): boolean {
  return YOUTUBE_PATTERN.test(value);
}
