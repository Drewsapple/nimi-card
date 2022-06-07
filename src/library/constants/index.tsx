import { FC, SVGProps } from 'react';

import { ReactComponent as LensterLogo } from '../assets/svg/links/lenster.svg';
import { ReactComponent as InstagramLogo } from '../assets/svg/links/instagram.svg';
import { ReactComponent as TwitterLogo } from '../assets/svg/links/twitter.svg';
import { ReactComponent as EmailLogo } from '../assets/svg/links/mail.svg';
import { ReactComponent as LinkedInLogo } from '../assets/svg/links/linkedIn.svg';
import { ReactComponent as WebsiteLogo } from '../assets/svg/links/website.svg';
import { ReactComponent as TelegramLogo } from '../assets/svg/links/telegram.svg';
import { ReactComponent as GitHubMarkLogo } from '../assets/svg/links/github.svg';

import { ReactComponent as EtherLogoUrl } from '../assets/svg/blockchain/ether.svg';
import { ReactComponent as BitcoinLogoUrl } from '../assets/svg/blockchain/bitcoin.svg';
import { ReactComponent as LitecoinLogoUrl } from '../assets/svg/blockchain/litecoin.svg';
import { ReactComponent as DogecoinLogoUrl } from '../assets/svg/blockchain/dogecoin.svg';
import { ReactComponent as PolygonLogoUrl } from '../assets/svg/blockchain/polygon.svg';
import { NimiBlockchain, NimiLink } from '../components/NimiCard/types';

export const nimiLinkDetailsExtended: Record<
  NimiLink,
  {
    logo?: FC<SVGProps<SVGSVGElement>>;
    prepend: string;
  }
> = {
  twitter: { logo: TwitterLogo, prepend: 'https://twitter.com/' },
  lenster: { logo: LensterLogo, prepend: 'https://lenster.xyz/u/' },
  email: { logo: EmailLogo, prepend: '' },
  instagram: { logo: InstagramLogo, prepend: 'https://instagram.com/' },
  linkedin: { logo: LinkedInLogo, prepend: 'https://linkedin.com/in/' },
  website: { logo: WebsiteLogo, prepend: '' },
  telegram: { logo: TelegramLogo, prepend: 'https://t.me/' },
  github: { logo: GitHubMarkLogo, prepend: 'https://github.com/' },
  medium: { prepend: 'https://medium.com/@' },
  reddit: { prepend: 'https://reddit.com/user/' },
  facebook: { prepend: 'https://facebook.com/' },
  youtube: { prepend: 'https://youtube.com/' },
  discord: { prepend: 'https://discord.com/' },
};

/**
 * Blockchain logo mapping
 */
export const blockchainLogoUrl: Record<NimiBlockchain, FC<SVGProps<SVGSVGElement>>> = {
  ethereum: EtherLogoUrl,
  bitcoin: BitcoinLogoUrl,
  litecoin: LitecoinLogoUrl,
  dogecoin: DogecoinLogoUrl,
  polygon: PolygonLogoUrl,
};
