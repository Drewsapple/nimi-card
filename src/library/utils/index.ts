import isValidUrl from '../../utils/isValidUrl';
import { NimiBlockchain, nimiBlockchainDetails, NimiLinkBaseDetails } from '../components/NimiCard/types';

/**
 * Given a blockchain and address, return the explorer url
 * @param blockchain - blockchain to get the explorer url for
 * @param address - address to get the explorer url for
 * @returns the explorer url
 */
export function getExplorerAddressLink(blockchain: NimiBlockchain, address: string): string {
  return nimiBlockchainDetails[blockchain].explorerAddressUrl[0] + address;
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
  }

  return nimi.url;
}
