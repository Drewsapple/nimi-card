/**
 * Returns true if value is proper url
 * @param urlString
 */
export default function isValidUrl(urlString: string): boolean {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
}
