import { getAddress } from '@ethersproject/address';
import { Blockchain } from '../components/NimiCard/types';

const BLOCKCHAIN_ADDRESS_EXPLORER_URL: Record<Blockchain, string> = {
  ethereum: 'https://etherscan.io/address/',
  bitcoin: 'https://blockstream.info/address/',
  polygon: 'https://explorer.polygon.io/address/',
  'bnb-chain': 'https://bscscan.com/address/',
  dogecoin: 'https://dogechain.info/address/',
};

/**
 * Given a blockchain and address, return the explorer url
 * @param blockchain - blockchain to get the explorer url for
 * @param address - address to get the explorer url for
 * @returns the explorer url
 */
export function getExplorerAddressLink(blockchain: Blockchain, address: string): string {
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
  const parsed = getAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, charsBefore + 2)}...${parsed.substring(42 - charsAfter)}`;
}
