/**
 * ReturnsRegExString
 * @param array
 */
export default function arrayToRegEx(array): RegExp {
  return new RegExp(`^(${array.join('|')})$`);
}
