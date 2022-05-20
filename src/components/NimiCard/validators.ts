import Joi from 'joi';
import { blockchainList, NimiLink, linkTypeList, NimiCard } from './types';

/**
 * Display name validator
 */
export const displayName = Joi.string().min(3).max(30).required();

/**
 * ENS name
 */
export const ensName = Joi.string().min(3).max(255).required();

/**
 * The Ethereum address that holds the ENS
 */
export const ensAddress = Joi.string().length(42).required();

/**
 *
 * @todo - add support for Markdown
 */
export const description = Joi.string().allow('').max(300).optional();

/**
 * Profile image url
 */
export const imageUrl = Joi.string().uri().optional();

/**
 * A single Blockchain address
 */
export const blockchainWallet = Joi.object({
  blockchain: Joi.string()
    .valid(...blockchainList)
    .required(),
  address: Joi.string().required(),
});

/**
 * List of Blockchain addresses
 */
export const blockchainAddresses = Joi.array().items(blockchainWallet);

/**
 * A single link definition and validator
 */
export const link = Joi.object<NimiLink>({
  type: Joi.string()
    .valid(...linkTypeList)
    .required(),
  label: Joi.string().optional(),
  url: Joi.string().uri().required(),
});

/**
 *
 */
export const links = Joi.array().items(link);

/**
 * NimiCard schema definition
 */
export const nimiCard = Joi.object<NimiCard>({
  displayName,
  ensAddress,
  ensName,
  description,
  links,
  addresses: blockchainAddresses,
});
