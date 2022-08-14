import * as Yup from 'yup';

import { isValidUrl } from '../../../utils';
import { Nimi, NimiBlockchain, NimiBlockchainAddress, NimiLinkBaseDetails, NimiLinkType } from '../types';
import { NimiWidgetType } from '../types/NimiWidget';
import { validators as addressValidators, evmAddress as evmAddressValidator } from './blockchainAddress';
import { isDiscordUsername } from './discord';
import { isEmail } from './email';
import { isGithubUsername } from './github';
import { nimiImageUrl } from './image';
import { isInstagramUsername } from './instagram';
import { isLensterUsername } from './lenster';
import { isLinkedInUsername } from './linkedin';
import { isMediumUsername } from './medium';
import { isRedditUsername } from './reddit';
import { isTelegramUsername } from './telegram';
import { isTwitterUsername } from './twitter';
import { isYoutubeUsername } from './youtube';

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
          return addressValidators.isBitcoinAddress(value as string);
        }

        return addressValidators.isEVMAddress(value as string);
      },
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
  type: Yup.mixed().oneOf(Object.values(NimiLinkType)).required(),
  label: Yup.string().optional(),
  content: Yup.string()
    .required()
    .test({
      name: 'customNimiLinkValidator',
      message: '${path} must be a valid Nimi link',
      test: function customNimiLinkValidator(value) {
        const linkType = this.parent.type;

        if (process.env.NODE_ENV !== 'production') {
          console.log({
            type: this.parent.type,
            value,
            // eslint-disable-next-line prefer-rest-params
            arguments,
          });
        }

        if (arguments.length === 0) {
          throw new Error('Validation failed: customNimiLinkValidator requires arguments');
        }

        // Invalid link type
        if (!NimiLinkType[linkType]) {
          throw new Error('Invalid NimiLinkType');
        }

        // URL
        if (linkType === NimiLinkType.URL) {
          if (!isValidUrl(value as any)) {
            throw new Error('Invalid URL');
          }
          return true;
        }

        // Email
        if (linkType === NimiLinkType.EMAIL) {
          if (!isEmail(value)) {
            throw new Error('Invalid email address');
          }
          return true;
        }

        //Twitter
        if (linkType === NimiLinkType.TWITTER) {
          if (!isTwitterUsername(value)) {
            throw new Error('Invalid twitter username');
          }
          return true;
        }

        //Instagram
        if (linkType === NimiLinkType.INSTAGRAM) {
          if (!isInstagramUsername(value)) {
            throw new Error('Invalid instagram username');
          }
          return true;
        }

        //LinkedIn
        if (linkType === NimiLinkType.LINKEDIN) {
          if (!isLinkedInUsername(value)) {
            throw new Error('Invalid linkedin username');
          }
          return true;
        }

        //Youtube
        if (linkType === NimiLinkType.YOUTUBE_CHANNEL) {
          if (!isYoutubeUsername(value)) {
            throw new Error('Invalid youtube channel');
          }
          return true;
        }

        //Twitch
        if (linkType === NimiLinkType.TWITCH) {
          if (!isTwitterUsername(value)) {
            throw new Error('Invalid twitch username');
          }
          return true;
        }

        //Github
        if (linkType === NimiLinkType.GITHUB) {
          if (!isGithubUsername(value)) {
            throw new Error('Invalid github username');
          }
          return true;
        }

        //Medium
        if (linkType === NimiLinkType.MEDIUM) {
          if (!isMediumUsername(value)) {
            throw new Error('Invalid medium username');
          }
          return true;
        }

        // Lenster
        if (linkType === NimiLinkType.LENSTER) {
          if (!isLensterUsername(value)) {
            throw new Error('Invalid Lenster username');
          }
          return true;
        }

        //Telegram
        if (linkType === NimiLinkType.TELEGRAM) {
          if (!isTelegramUsername(value)) {
            throw new Error('Invalid telegram username');
          }
          return true;
        }

        //Reddit
        if (linkType === NimiLinkType.REDDIT) {
          if (!isRedditUsername(value)) {
            throw new Error('Invalid reddit username');
          }
          return true;
        }

        // Discord
        if (linkType === NimiLinkType.DISCORD) {
          if (!isDiscordUsername(value)) {
            throw new Error('Invalid Discord username');
          }
          return true;
        }

        return true;
      },
    }),
  title: Yup.string()
    .optional()
    .test({
      test: function defaultBack(value) {
        if (arguments.length === 0) {
          return this.parent.label;
        }

        if (value) {
          return value.length <= 60;
        }

        return true;
      },
    }),
});

/**
 *
 */
export const links = Yup.array().of(link);

/**
 * Nimi schema definition and validator
 * @deprecated use `nimiCardValidator` instead
 */
export const nimiCardValidator: Yup.SchemaOf<Nimi> = Yup.object().shape({
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

/**
 * NimiCard schema definition and validator
 * @deprecated use `nimiCardValidator` instead
 */
export const nimiCard = nimiCardValidator;
