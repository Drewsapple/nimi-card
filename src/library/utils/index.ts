import ReactDOMServer from 'react-dom/server';

import { NIMI_BLOCKCHAIN_DETAILS, nimiLinkDetailsExtended } from '../constants';
import { Nimi, NimiBlockchain, NimiLinkBaseDetails, NimiLinkType } from '../types';
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
export function shortenAddress(address?: string, charsBefore = 4, charsAfter = 4): string {
  if (!address) return '';
  return `${address.substring(0, charsBefore + 2)}...${address.substring(42 - charsAfter)}`;
}

/**
 * Handles the Nimi link label/title/text
 * @param nimi - the Nimi link
 * @returns
 */
export function getNimiLinkLabel(nimi: NimiLinkBaseDetails): string {
  if (nimi.type === NimiLinkType.URL && isValidUrl(nimi.content)) {
    const { hostname } = new URL(nimi.content);
    return hostname;
  } else if (isValidUrl(nimi.content)) {
    const url = new URL(nimi.content);

    return url.pathname.replace(new RegExp('/', 'g'), '');
  }

  return nimi.content;
}

/**
 * If its a link returns a link else prepends the base url for given social link
 * @param nimi - the Nimi link
 * @returns url
 */
export function generateLink({ type, content }: NimiLinkBaseDetails): string {
  if (isValidUrl(content)) {
    return content;
  }
  return nimiLinkDetailsExtended[type].prepend + content;
}

/**
 * Filters empty links
 * @param nimi - Nimi object
 * @returns Filtered nimi object
 */
export function filterEmptyLinks(nimi: Nimi): Nimi {
  if (nimi.links) nimi.links = nimi.links.filter(({ content }) => content !== '');

  return nimi;
}

/**
 * Encodes a SVG component to base64
 * @param reactElement - react element
 * @returns react element's innerHTML
 */
export function encodeSVGToDataURI(reactElement) {
  return 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup(reactElement));
}
