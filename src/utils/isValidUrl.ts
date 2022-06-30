/**
 * Returns true if value is proper url
 * @param urlString
 */
export function isValidUrl(urlString: string): boolean {
  let url: URL;

  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}
