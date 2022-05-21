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
  'email',
  'discord',
] as const;

/**
 * Generated type of linkTypeList
 */
export type NimiLinkType = typeof linkTypeList[number];

export interface NimiLink {
  type: NimiLinkType;
  label: string;
  url: string;
}

/**
 * List of supported networks
 * Order matters
 */
export const blockchainList = ['ethereum', 'bitcoin', 'polygon', 'bnb-chain', 'dogecoin'] as const;

/**
 * Generated type of blockchainList
 */
export type Blockchain = typeof blockchainList[number];

interface NimiBlockchainAddress {
  address: string;
  blockchain: Blockchain;
}

/**
 * Base defintion of a Nimi Card
 */
export interface Nimi {
  displayName: string;
  displayImageUrl: string;
  description: string;
  ensAddress: string;
  ensName: string;
  links: NimiLink[];
  addresses: NimiBlockchainAddress[];
}
