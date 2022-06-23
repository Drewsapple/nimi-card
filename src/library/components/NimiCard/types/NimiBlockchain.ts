/**
 * List of supported networks
 * Order matters
 */
export const blockchainList = ['ethereum', 'bitcoin', 'litecoin', 'polygon', 'dogecoin'] as const;

/**
 * Generated type of blockchainList
 */
export type NimiBlockchain = typeof blockchainList[number];

export interface NimiBlockchainAddress {
  address: string;
  blockchain: NimiBlockchain;
}

/**
 * Blockchain information
 */
export interface NimiBlockchainDetails {
  name: string;
  explorerAddressUrl: string[];
}

/**
 * Additional information about the Nimi blockchains
 */
export const nimiBlockchainDetails: Record<NimiBlockchain, NimiBlockchainDetails> = {
  ethereum: {
    name: 'Ethereum',
    explorerAddressUrl: ['https://etherscan.io/address/'],
  },
  bitcoin: {
    name: 'Bitcoin',
    explorerAddressUrl: ['https://blockstream.info/address/'],
  },
  litecoin: {
    name: 'Litecoin',
    explorerAddressUrl: ['https://blockchair.com/litecoin/address/'],
  },
  polygon: {
    name: 'Polygon',
    explorerAddressUrl: ['https://polygonscan.com/address/'],
  },
  dogecoin: {
    name: 'Dogecoin',
    explorerAddressUrl: ['https://dogechain.info/address/'],
  },
};
