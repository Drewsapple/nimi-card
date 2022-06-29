import { NimiBlockchainAddress } from './NimiBlockchain';
import { NimiImage } from './NimiImage';
import { NimiLinkBaseDetails } from './NimiLink';
import { NimiWidget } from './NimiWidget';

/**
 * Base defintion of a Nimi Card
 */
export interface Nimi {
  displayName: string;
  /**
   * @deprecated use `image` instead
   */
  displayImageUrl?: string;
  /**
   * Additional information about the Nimi Image
   * @since 0.6.0
   */
  image?: NimiImage;
  /**
   * Nimi description
   */
  description?: string;
  /**
   * ENS name of the Nimi. nimi.eth.
   */
  ensName: string;
  /**
   * ENS name of the Nimi. nimi.eth.
   */
  ensAddress: string;
  /**
   * List of Nimi Links
   */
  links: NimiLinkBaseDetails[];
  /**
   * Nimi Blockchain addresses
   */
  addresses: NimiBlockchainAddress[];
  /**
   * Supported widgets
   */
  widgets: NimiWidget[];
}