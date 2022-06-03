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
