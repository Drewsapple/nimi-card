// import { NimiLinkType } from '../library';
import LensterLogo from '../assets/socialIcons/lenster.svg';
import InstagramLogo from '../assets/socialIcons/instagram.svg';
import TwitterLogo from '../assets/socialIcons/twitter.svg';
import EmailLogo from '../assets/socialIcons/mail.svg';
import LinkedInLogo from '../assets/socialIcons/linkedIn.svg';
import WebsiteLogo from '../assets/socialIcons/website.svg';
import TelegramLogo from '../assets/socialIcons/telegram.svg';

import Ethereum from '../assets/chainIcons/ether.svg';
import Bitcoin from '../assets/chainIcons/bitcoin.svg';
import Litecoin from '../assets/chainIcons/litecoin.svg';
import DogeCoin from '../assets/chainIcons/shitcoin.svg';
import Polygon from '../assets/chainIcons/polygon.svg';

export const socialsMapping = {
  twitter: { logo: TwitterLogo, prepend: 'https://twitter.com/' },
  lenster: { logo: LensterLogo, prepend: 'https://lenster.xyz/u/' },
  emai: { logo: EmailLogo, prepend: '' },
  instagram: { logo: InstagramLogo, prepend: 'https://instagram.com/' },
  linkedin: { logo: LinkedInLogo, prepend: 'https://linkedin.com/in/' },
  website: { logo: WebsiteLogo, prepend: '' },
  telegram: { logo: TelegramLogo, prepend: 'https://t.me/' },
  github: { logo: 'null', prepend: 'https://github.com/' },
  medium: { logo: 'null', prepend: 'https://medium.com/@' },
  reddit: { logo: 'null', prepend: 'https://reddit.com/user/' },
  facebook: { logo: 'null', prepend: 'https://facebook.com/' },
  youtube: { logo: 'null', prepend: 'https://youtube.com/' },
  discord: { logo: 'null', prepend: 'https://discord.com/' },
};
export const blockChainImagesMapping = {
  ethereum: Ethereum,
  bitcoin: Bitcoin,
  litecoin: Litecoin,
  dogecoin: DogeCoin,
  polygon: Polygon,
};
