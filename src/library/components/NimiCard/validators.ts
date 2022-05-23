import * as Yup from 'yup';
import { NimiCard } from './NimiCard';

import { blockchainList, NimiLink, linkTypeList, Nimi } from './types';

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
export const imageUrl = Yup.string().url('Invalid URL').optional();

/**
 * A single Blockchain address
 */
export const blockchainWallet = Yup.object({
  blockchain: Yup.string().oneOf(blockchainList).required(),
  address: Yup.string().required(),
});

/**
 * List of Blockchain addresses
 */
export const blockchainAddresses = Yup.array().of(blockchainWallet);

/**
 * A single link definition and validator
 */
export const link = Yup.object({
  type: Yup.string().oneOf(linkTypeList).required(),
  label: Yup.string().optional(),
  url: Yup.string().url().required(),
});

/**
 *
 */
export const links = Yup.array().of(link);

/**
 * NimiCard schema definition
 */
export const nimiCard = Yup.object().shape({
  displayName,
  ensAddress,
  ensName,
  description,
  links,
  addresses: blockchainAddresses,
});
