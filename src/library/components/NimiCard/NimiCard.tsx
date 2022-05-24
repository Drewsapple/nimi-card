import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

import { nimiCard } from './validators';
import { Nimi } from './types';

import {
  StyledWrapper,
  StyledInnerWrapper,
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
  const validateNimi = nimiCard.validateSync(nimi);

  const { t } = useTranslation();

  const { displayName, displayImageUrl, addresses, description, ensName, links } = validateNimi;

  return (
    <StyledWrapper>
      <StyledInnerWrapper>
        <ProfilePictureContainer>
          <PicBackgroundTop />
          <ProfilePicture image={displayImageUrl} />
        </ProfilePictureContainer>
        <DisplayName>{displayName}</DisplayName>
        <AddressBar>
          <div>{ensName}</div>
        </AddressBar>
        <DescriptionWrapper>{description}</DescriptionWrapper>
        {links && (
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
        {addresses && (
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
      </StyledInnerWrapper>
      <Footer />
    </StyledWrapper>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
`;
