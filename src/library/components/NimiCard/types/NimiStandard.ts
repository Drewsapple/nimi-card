import { NimiBlockchainAddress } from './NimiBlockchain';
import { NimiImage } from './NimiImage';
import { NimiLinkBaseDetails } from './NimiLink';

/**
 * Base defintion of a Nimi Card
 */
export interface Nimi {
  displayName: string;
  ensAddress: string;
  /**
   * @deprecated use `image` instead
   */
  displayImageUrl?: string;
  /**
   * Additional information about the Nimi Image
   * @since 0.6.0
   */
  image?: NimiImage;
  description?: string;
  ensName: string;
  links: NimiLinkBaseDetails[];
  addresses: NimiBlockchainAddress[];
}
