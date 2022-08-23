import * as Yup from 'yup';

import { Nimi, NimiBlockchain, NimiBlockchainAddress } from '../types';
import { NimiWidgetType } from '../types/NimiWidget';
import { validators } from './blockchainAddress';
import { nimiImageValidator } from './image';
import { link } from './link';

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
export const ensAddress = Yup.string().required();

/**
 * The Ethereum address that the ENS resolves to
 */
export const resolvedAddress = Yup.string().optional();

/**
 *
 * @todo - add support for Markdown
 */
export const description = Yup.string().max(300, 'Maximum 300 characters').optional();

/**
 * Profile image url
 */
export const displayImageUrl = Yup.string()
  .test({
    name: 'isURL',
    message: '${path} must be a valid URL',
    test: (value) => {
      if (value) {
        const url = new URL(value as string);

        // data:image/png;base64,
        const allowedProtocols = ['http:', 'https:', 'data:'];

        if (!allowedProtocols.includes(url.protocol.toLowerCase())) {
          throw new Error('Invalid protocol');
        }
      }

      return true;
    },
  })
  .optional();

/**
 * A single Blockchain address
 */
export const blockchainWallet: Yup.SchemaOf<NimiBlockchainAddress> = Yup.object({
  blockchain: Yup.mixed().oneOf(Object.keys(NimiBlockchain)).required(),
  address: Yup.string()
    .required()
    .test({
      name: 'customNimiBlockchainAddressValidators',
      test: function customNimiBlockchainAddressValidators(value) {
        if (this.parent.blockchain === NimiBlockchain.BITCOIN) {
          return validators.isBitcoinAddress(value as string);
        }

        return validators.isEVMAddress(value as string);
      },
    }),
});

/**
 * List of Blockchain addresses
 */
export const blockchainAddresses = Yup.array().of(blockchainWallet);

/**
 *
 */
export const links = Yup.array().of(link);

/**
 * Nimi schema definition and validator
 */
export const nimiValidator = Yup.object().shape({
  displayName,
  ensName,
  isLanding,
  ensAddress,
  resolvedAddress,
  displayImageUrl,
  image: Yup.object()
    .test({
      name: 'customNimiImageValidator',
      test: function customNimiImageValidator(value) {
        if (value === null || value === undefined || JSON.stringify(value) === '{}') {
          return true;
        }

        const validatedImage = nimiImageValidator.validateSync(value, {
          abortEarly: true,
          stripUnknown: true,
        }) as Nimi['image'];

        if (validatedImage) {
          return true;
        }

        throw new Error('Invalid image');
      },
    })
    .transform(function customNimiImageTransfomer(value) {
      const validatedImage = nimiImageValidator.validateSync(value, {
        abortEarly: true,
        stripUnknown: true,
      }) as Nimi['image'];
      return validatedImage;
    }),
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

/**
 * NimiCard schema definition and validator
 * @deprecated use `nimiCardValidator` instead
 */
export const nimiCard = nimiValidator;
