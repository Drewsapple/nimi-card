export enum NimiLinkType {
  /**
   * Generic link to a webpage
   */
  URL = 'URL',
  /**
   * Email address
   */
  EMAIL = 'EMAIL',
  /**
   * Twitter
   */
  TWITTER = 'TWITTER',
  /**
   * Instagram page
   */
  INSTAGRAM = 'INSTAGRAM',
  /**
   * LinkedIn page
   */
  LINKEDIN = 'LINKEDIN',
  /**
   * YouTube channel
   */
  YOUTUBE_CHANNEL = 'YOUTUBE_CHANNEL',
  /**
   * Twitch Channel
   */
  TWITCH = 'TWITCH',
  /**
   * GitHub Profile
   */
  GITHUB = 'GITHUB',
  /**
   * Medium Profile
   */
  MEDIUM = 'MEDIUM',
  /**
   * Lenster Profile
   */
  LENSTER = 'LENSTER',
  /**
   * Telegram Profile
   */
  TELEGRAM = 'TELEGRAM',
  /**
   * Reddit Profile
   */
  REDDIT = 'REDDIT',
  /**
   * Discord Profile
   */
  DISCORD = 'DISCORD',
}

export interface NimiLinkBaseDetails {
  /**
   * Link Type
   */
  type: NimiLinkType;
  /**
   * Link label
   * @deprecated use `title` instead
   */
  label?: string;
  /**
   * Link title
   */
  title?: string;
  /**
   * Link value
   */
  content: string;
}
