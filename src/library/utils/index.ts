import { NimiBlockchain, NimiLinkBaseDetails } from '../components/NimiCard/types';
import { NIMI_BLOCKCHAIN_DETAILS, nimiLinkDetailsExtended } from '../constants';
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

/**
 * Given a blockchain and address, return the explorer url
 * @param blockchain - blockchain to get the explorer url for
 * @param address - address to get the explorer url for
 * @returns the explorer url
 */
export function getExplorerAddressLink(blockchain: NimiBlockchain, address: string): string {
  return NIMI_BLOCKCHAIN_DETAILS[blockchain].explorerAddressUrl[0] + address;
}

/**
 * Shorten the checksummed version of the input address to have 0x + 4 characters at start and end
 * @param address The input address
 * @param charsBefore The number of characters to show before the trimmed part
 * @param charsAfter The number of characters to show after the trimmed part
 * @returns The shortened address
 * @throws If the address is not checksummed
 */
export function shortenAddress(address: string, charsBefore = 4, charsAfter = 4): string {
  return `${address.substring(0, charsBefore + 2)}...${address.substring(42 - charsAfter)}`;
}

/**
 * Handles the Nimi link label/title/text
 * @param nimi - the Nimi link
 * @returns
 */
export function getNimiLinkLabel(nimi: NimiLinkBaseDetails): string {
  if (nimi.type === 'website' && isValidUrl(nimi.url)) {
    const { hostname } = new URL(nimi.url);
    return hostname;
  } else if (isValidUrl(nimi.url)) {
    console.log('HIT THE SSOPPP WHOAAA', nimi);
    const parts = nimi.url.split('/');
    return parts[parts.length - 1];
  }

  return nimi.url;
}

/**
 * Handles the Nimi link label/title/text
 * @param nimi - the Nimi link
 * @returns
 */
export function generateLink(type, url): string {
  if ((type !== 'website' || type !== 'email') && isValidUrl(url)) {
    return url;
  }
  return nimiLinkDetailsExtended[type].prepend + url;
}
