import * as Yup from 'yup';

import { blockchainList, linkTypeList, Nimi, NimiBlockchainAddress, NimiLinkBaseDetails } from './types';

/**
 * Display name validator
 */
export const displayName = Yup.string().min(3, 'Minimum 3 characters').max(30, 'Maximum 30 characters').required();

/**
 * ENS name
 */
export const ensName = Yup.string().min(3, 'Minimum 3 characters').max(255, 'Maximum 255 characters').required();

/**
 * The Ethereum address that holds the ENS
 */
export const ensAddress = Yup.string().length(42).required();

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
  blockchain: Yup.mixed().oneOf(Array.from(blockchainList)).required(),
  address: Yup.string().required(),
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
  ensAddress,
  displayImageUrl,
  image: Yup.mixed()
    .oneOf([
      Yup.object().shape({
        type: Yup.mixed().oneOf(['image']).required(),
        url: Yup.string().required(),
      }),
      Yup.object().shape({
        type: Yup.mixed().oneOf(['erc721']).required(),
        contract: Yup.string().required(),
        tokenId: Yup.number().required(),
      }),
    ])
    .optional(),
  description,
  ensName,
  links,
  addresses: blockchainAddresses,
});
