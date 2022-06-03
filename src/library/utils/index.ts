import { NimiBlockchain } from '../components/NimiCard/types';

const BLOCKCHAIN_ADDRESS_EXPLORER_URL: Record<NimiBlockchain, string> = {
  ethereum: 'https://etherscan.io/address/',
  bitcoin: 'https://blockstream.info/address/',
  polygon: 'https://explorer.polygon.io/address/',
  litecoin: 'https://blockchair.com/litecoin/address/',
  dogecoin: 'https://dogechain.info/address/',
};

/**
 * Given a blockchain and address, return the explorer url
 * @param blockchain - blockchain to get the explorer url for
 * @param address - address to get the explorer url for
 * @returns the explorer url
 */
export function getExplorerAddressLink(blockchain: NimiBlockchain, address: string): string {
  return BLOCKCHAIN_ADDRESS_EXPLORER_URL[blockchain] + address;
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
