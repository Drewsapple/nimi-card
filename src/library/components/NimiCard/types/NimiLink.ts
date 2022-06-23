export const linkTypeList = [
  'twitter',
  'github',
  'medium',
  'linkedin',
  'reddit',
  'telegram',
  'facebook',
  'instagram',
  'youtube',
  'website',
  'email',
  'discord',
  'lenster',
] as const;

/**
 * Generated type of linkTypeList
 */
export type NimiLink = typeof linkTypeList[number];

export interface NimiLinkBaseDetails {
  type: NimiLink;
  label?: string;
  url: string;
}
