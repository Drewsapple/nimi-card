import LensterLogo from '../assets/svg/links/lenster.svg';
import InstagramLogo from '../assets/svg/links/instagram.svg';
import TwitterLogo from '../assets/svg/links/twitter.svg';
import EmailLogo from '../assets/svg/links/mail.svg';
import LinkedInLogo from '../assets/svg/links/linkedIn.svg';
import WebsiteLogo from '../assets/svg/links/website.svg';
import TelegramLogo from '../assets/svg/links/telegram.svg';
import GitHubMarkLogo from '../assets/svg/links/github.svg';

import EtherLogoUrl from '../assets/svg/blockchain/ether.svg';
import BitcoinLogoUrl from '../assets/svg/blockchain/bitcoin.svg';
import LitecoinLogoUrl from '../assets/svg/blockchain/litecoin.svg';
import DogecoinLogoUrl from '../assets/svg/blockchain/dogecoin.svg';
import PolygonLogoUrl from '../assets/svg/blockchain/polygon.svg';
import { NimiBlockchain, NimiLink } from '../components/NimiCard';

export const nimiLinkDetailsExtended: Record<
  NimiLink,
  {
    logo?: string;
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
export const blockchainLogoUrl: Record<NimiBlockchain, string> = {
  ethereum: EtherLogoUrl,
  bitcoin: BitcoinLogoUrl,
  litecoin: LitecoinLogoUrl,
  dogecoin: DogecoinLogoUrl,
  polygon: PolygonLogoUrl,
};
