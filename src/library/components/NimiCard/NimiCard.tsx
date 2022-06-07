import styled from 'styled-components';
import { FC, SVGProps } from 'react';

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
import { getExplorerAddressLink, getNimiLinkLabel, shortenAddress } from '../../utils';
import { blockchainLogoUrl, nimiLinkDetailsExtended } from '../../constants';

interface NimiCardProps {
  nimi: Nimi;
}

function renderSVG(logo?: FC<SVGProps<SVGSVGElement>>) {
  if (!logo) return;
  const Logo = logo;

  return <Logo height={22} width={22} />;
}

export function NimiCard({ nimi }: NimiCardProps) {
  const validateNimi = nimiCard.validateSync(nimi);

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
            <SectionTitle>Socials</SectionTitle>
            <SectionItemContainerGrid>
              {links.map(({ label, type, url }) => (
                <SectionItemLink
                  href={nimiLinkDetailsExtended[type].prepend + url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  key={`${type}-${url}`}
                >
                  {renderSVG(nimiLinkDetailsExtended[type].logo)}
                  {getNimiLinkLabel({ label, type, url })}
                </SectionItemLink>
              ))}
            </SectionItemContainerGrid>
          </Section>
        )}
        {addresses && addresses.length > 0 && (
          <Section>
            <SectionTitle>Addresses</SectionTitle>
            <SectionItemContainer>
              {addresses.map(({ address, blockchain }) => (
                <SectionItemLink
                  key={`${blockchain}-${address}`}
                  href={getExplorerAddressLink(blockchain, address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`View ${address} address on the explorer`}
                >
                  {renderSVG(blockchainLogoUrl[blockchain])}
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
