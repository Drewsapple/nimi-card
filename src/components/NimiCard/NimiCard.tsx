import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { Flex } from 'rebass';

import { nimiCard as nimiCardSchema } from './validators';
import { NimiCard as Nimi } from './types';

import {
  StyledWrapper,
  AddressBar,
  SectionItemContainer,
  SectionItemContainerGrid,
  SectionItemLink,
  DescriptionWrapper,
  DisplayName,
  Footer,
  PicBackgroundTop,
  ProfilePicture,
  ProfilePictureContainer,
  Section,
  SectionTitle,
} from './styled';
import { getExplorerAddressLink, shortenAddress } from '../../utils';

interface NimiCardProps {
  nimi: Nimi;
}

export function NimiCard({ nimi }: NimiCardProps) {
  const { value: validatedNimi } = nimiCardSchema.validate(nimi);

  const { t } = useTranslation();

  const { displayName, displayImageUrl, addresses, description, ensName, links } = validatedNimi as Nimi;

  return (
    <StyledWrapper>
      <ProfilePictureContainer>
        <PicBackgroundTop />
        <ProfilePicture image={displayImageUrl} />
      </ProfilePictureContainer>
      <DisplayName>{displayName}</DisplayName>
      <AddressBar>
        <div>{ensName}</div>
      </AddressBar>
      <DescriptionWrapper>{description}</DescriptionWrapper>
      {links.length > 0 && (
        <Section>
          <SectionTitle>{t('socials')}</SectionTitle>
          <SectionItemContainerGrid>
            {links.map(({ label, type, url }) => (
              <SectionItemLink
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                key={`${type}-${url}`}
              >
                {label}
              </SectionItemLink>
            ))}
          </SectionItemContainerGrid>
        </Section>
      )}
      {addresses.length > 0 && (
        <Section>
          <SectionTitle>{t('addresses')}</SectionTitle>
          <SectionItemContainer>
            {addresses.map(({ address, blockchain }) => (
              <SectionItemLink
                key={`${blockchain}-${address}`}
                href={getExplorerAddressLink(blockchain, address)}
                target="_blank"
                rel="noopener noreferrer"
                title={`View ${address} address on the explorer`}
              >
                {shortenAddress(address, 7, 9)}
              </SectionItemLink>
            ))}
          </SectionItemContainer>
        </Section>
      )}
      <Footer />
    </StyledWrapper>
  );
}

export const Container = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
`;
