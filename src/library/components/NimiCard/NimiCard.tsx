import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

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
  EnsName,
  Divider,
  StyledExternalLink,
  StyledNimiBig,
} from './styled';
import { getExplorerAddressLink, shortenAddress } from '../../utils';
import { blockChainImagesMapping, socialsMapping } from '../../../contstants';

interface NimiCardProps {
  nimi: Nimi;
}

export function NimiCard({ nimi }: NimiCardProps) {
  const validateNimi = nimiCard.validateSync(nimi);

  const { t } = useTranslation();

  const { ensAddress, displayName, displayImageUrl, addresses, description, ensName, links } = validateNimi;

  return (
    <StyledWrapper>
      <PicBackgroundTop />
      <StyledNimiBig />
      <StyledInnerWrapper>
        <ProfilePictureContainer>
          <ProfilePicture image={displayImageUrl} />
        </ProfilePictureContainer>
        <DisplayName>{displayName}</DisplayName>
        <AddressBar>
          <EnsName>{ensName}</EnsName>
          <Divider />
          <StyledExternalLink color="shadow1" href={getExplorerAddressLink('ethereum', ensAddress)}>
            {shortenAddress(ensAddress, 2, 4)}
          </StyledExternalLink>
        </AddressBar>
        <DescriptionWrapper>{description}</DescriptionWrapper>

        {links && links.length > 0 && (
          <Section>
            <SectionTitle>{t('socials')}</SectionTitle>
            <SectionItemContainerGrid>
              {links.map(({ label, type, url }) => (
                <SectionItemLink
                  href={socialsMapping[type].prepend + url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  key={`${type}-${url}`}
                >
                  <img src={socialsMapping[type].logo} />
                  {url}
                </SectionItemLink>
              ))}
            </SectionItemContainerGrid>
          </Section>
        )}
        {addresses && addresses.length > 0 && (
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
                  <img src={blockChainImagesMapping[blockchain]} />
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
  align-items: center;
  width: 100%;
  min-height: 100vh;
  flex: 1;
`;
