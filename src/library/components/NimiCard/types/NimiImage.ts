export enum NimiImageType {
  URL = 'URL',
  ERC721 = 'ERC721',
}

export interface NimiImageCommon {
  url: string;
}

export interface ImageERC721 extends NimiImageCommon {
  type: NimiImageType.ERC721;
  /**
   * The NFT contract address
   */
  contract: string;
  /**
   * The NFT token id
   */
  tokenId: number;
  /**
   * The NFT token URI
   */
  tokenUri: string;
}

export interface ImageUrl extends NimiImageCommon {
  type: NimiImageType.URL;
  url: string;
}

/**
 * Nimi Image
 */
export type NimiImage = ImageERC721 | ImageUrl;
