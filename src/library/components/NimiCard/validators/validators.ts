import * as Yup from 'yup';

import { linkTypeList, Nimi, NimiBlockchain, NimiBlockchainAddress, NimiLinkBaseDetails } from '../types';
import { NimiWidgetType } from '../types/NimiWidget';
import { bitcoinAddress as bitcoinAddressValidator, evmAddress as evmAddressValidator } from './blockchainAddress';
import { nimiImageUrl } from './image';

/**
 * Display name validator
 */
export const displayName = Yup.string().min(3, 'Minimum 3 characters').max(30, 'Maximum 30 characters').required();

/**
 * ENS name
 */
export const ensName = Yup.string().min(3, 'Minimum 3 characters').max(255, 'Maximum 255 characters').required();

/**
 * Is Landing
 */
export const isLanding = Yup.boolean().optional();

/**
 * The Ethereum address that holds the ENS
 */
export const ensAddress = evmAddressValidator.required();

/**
 *
 * @todo - add support for Markdown
 */
export const description = Yup.string().max(300, 'Maximum 300 characters').optional();

/**
 * Profile image url
 */
export const displayImageUrl = Yup.string().url('Invalid URL').optional();

/**
 * A single Blockchain address
 */
export const blockchainWallet: Yup.SchemaOf<NimiBlockchainAddress> = Yup.object({
  blockchain: Yup.mixed().oneOf(Object.keys(NimiBlockchain)).required(),
  address: Yup.string()
    .required()
    .when({
      is: NimiBlockchain.ETHEREUM,
      then: evmAddressValidator,
    })
    .when({
      is: NimiBlockchain.POLYGON,
      then: evmAddressValidator,
    })
    .when({
      is: NimiBlockchain.BITCOIN,
      then: bitcoinAddressValidator,
    }),
});

/**
 * List of Blockchain addresses
 */
export const blockchainAddresses = Yup.array().of(blockchainWallet);

/**
 * A single link definition and validator
 */
export const link: Yup.SchemaOf<NimiLinkBaseDetails> = Yup.object({
  type: Yup.mixed().oneOf(Array.from(linkTypeList)).required(),
  label: Yup.string().optional(),
  url: Yup.string().required(),
});

/**
 *
 */
export const links = Yup.array().of(link);

/**
 * NimiCard schema definition
 */
export const nimiCard: Yup.SchemaOf<Nimi> = Yup.object().shape({
  displayName,
  ensName,
  isLanding,
  ensAddress,
  displayImageUrl,
  image: Yup.mixed().oneOf([nimiImageUrl, nimiImageUrl]).optional(),
  description,
  links,
  addresses: blockchainAddresses,
  widgets: Yup.array()
    .of(
      Yup.object({
        type: Yup.mixed().oneOf([NimiWidgetType.POAP]).required(),
        address: Yup.string().required(),
      })
    )
    .optional(),
});
