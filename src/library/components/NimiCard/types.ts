export const linkTypeList = [
  'twitter',
  'github',
  'medium',
  'linkedin',
  'reddit',
  'telegram',
  'facebook',
  'instagram',
  'youtube',
  'website',
  'email',
  'discord',
  'lenster',
] as const;

/**
 * Generated type of linkTypeList
 */
export type NimiLink = typeof linkTypeList[number];

export interface NimiLinkBaseDetails {
  type: NimiLink;
  label?: string;
  url: string;
}

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

/**
 * Base defintion of a Nimi Card
 */
export interface Nimi {
  displayName: string;
  ensAddress: string;
  displayImageUrl?: string;
  description?: string;
  ensName: string;
  links: NimiLinkBaseDetails[];
  addresses: NimiBlockchainAddress[];
}
