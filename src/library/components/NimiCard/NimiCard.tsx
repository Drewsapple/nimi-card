import { FC, SVGProps } from 'react';
import styled from 'styled-components';

import { ReactComponent as EthereumLogo } from '../../assets/svg/blockchain/ethereum.svg';
import { ReactComponent as CopyClipboard } from '../../assets/svg/common/copy-clipboard.svg';
import { ReactComponent as ExternalLinkSvg } from '../../assets/svg/common/external-link.svg';
import { ReactComponent as NimiText } from '../../assets/svg/nimi-text.svg';
import { blockchainLogoUrl, nimiLinkDetailsExtended } from '../../constants';
import { useToast } from '../../toast';
import { getExplorerAddressLink, getNimiLinkLabel, shortenAddress } from '../../utils';
import { Component as POAPWidget } from '../../widgets/paop';
import {
  AddressBar,
  AddressButton,
  ClaimYourNimi,
  DescriptionWrapper,
  DisplayName,
  Divider,
  EnsName,
  Footer,
  FooterWrapper,
  NimiTextFooter,
  PicBackgroundTop,
  PoapTitle,
  ProfilePicture,
  ProfilePictureContainer,
  Section,
  SectionItemContainer,
  SectionItemContainerGrid,
  SectionTitle,
  ShadowButton,
  StyledExternalLink,
  StyledInnerWrapper,
  StyledNimiBig,
  StyledWrapper,
} from './styled';
import { Nimi } from './types';
import { NimiWidgetType } from './types/NimiWidget';
import { nimiCard } from './validators';

interface NimiCardProps {
  nimi: Nimi;
}

function renderSVG(logo?: FC<SVGProps<SVGSVGElement>>) {
  if (!logo) return;
  const Logo = logo;

  return <Logo height={22} width={22} />;
}

function renderWidgets(nimiWidgetList: NimiCardProps['nimi']['widgets'], ensName: string) {
  return (
    nimiWidgetList &&
    nimiWidgetList.map((widget) => {
      switch (widget.type) {
        case NimiWidgetType.POAP:
          return (
            <Section key={widget.type + '-' + widget.address}>
              <PoapTitle>
                <SectionTitle>POAPs</SectionTitle>
                <ShadowButton
                  target="_blank"
                  rel="noopener noreferrer"
                  as="a"
                  href={`https://app.poap.xyz/scan/${ensName}`}
                  color="purple"
                >
                  View Full Collection <ExternalLinkSvg />
                </ShadowButton>
              </PoapTitle>

              <POAPWidget address={widget.address} />
            </Section>
          );
        default:
          return null;
      }
    })
  );
}
const StyledNimiText = styled(NimiText)`
  margin: 0 6px;
`;

export function NimiCard({ nimi }: NimiCardProps) {
  const validateNimi = nimiCard.validateSync(nimi);
  const toast = useToast();
  const copyTextShowToast = (value: string, text: string) => {
    navigator.clipboard.writeText(value);
    toast.open(text);
  };
  const staticIsLanding = true;

  const { ensAddress, displayName, displayImageUrl, image, addresses, description, ensName, links } =
    validateNimi as Nimi;

  return (
    <StyledWrapper>
      {!staticIsLanding && (
        <>
          <PicBackgroundTop />
          <StyledNimiBig />
        </>
      )}

      <StyledInnerWrapper>
        <ProfilePictureContainer>
          <ProfilePicture image={image ? image.url : displayImageUrl} />
        </ProfilePictureContainer>
        <DisplayName>{displayName}</DisplayName>
        <AddressBar>
          <StyledExternalLink color="shadow1" href={getExplorerAddressLink('ethereum', ensAddress)}>
            <EthereumLogo /> {shortenAddress(ensAddress, 2, 4)}
          </StyledExternalLink>
          <Divider />
          <EnsName onClick={() => copyTextShowToast(ensName, 'ENS name copied to clipboard!')}>
            {ensName}
            <CopyClipboard />
          </EnsName>
        </AddressBar>
        <DescriptionWrapper>{description}</DescriptionWrapper>
        {staticIsLanding && (
          <ClaimYourNimi
            as="a"
            href={`https://nimi.eth.limo/#/domains/${ensName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Claim Your <StyledNimiText width={'45'} height={'15'} /> Profile
          </ClaimYourNimi>
        )}

        {links && links.length > 0 && (
          <SectionItemContainerGrid>
            {links.map(({ label, type, url }) => (
              <>
                {type === 'website' ? (
                  <ShadowButton
                    color="shadow1"
                    title={label}
                    key={`${type}-${url}`}
                    onClick={() => copyTextShowToast(url, 'Website copied to the clipboard!')}
                  >
                    {renderSVG(nimiLinkDetailsExtended[type].logo)}
                    {getNimiLinkLabel({ label, type, url })}
                  </ShadowButton>
                ) : (
                  <ShadowButton
                    as="a"
                    color="shadow1"
                    href={nimiLinkDetailsExtended[type].prepend + url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    key={`${type}-${url}`}
                  >
                    {renderSVG(nimiLinkDetailsExtended[type].logo)}
                    {getNimiLinkLabel({ label, type, url })}
                  </ShadowButton>
                )}
              </>
            ))}
          </SectionItemContainerGrid>
        )}
        {renderWidgets(nimi.widgets, ensName)}
        {addresses && addresses.length > 0 && (
          <Section>
            <SectionItemContainer>
              {addresses.map(({ address, blockchain }) => (
                <AddressButton
                  onClick={() => copyTextShowToast(address, 'Address copied to the clipboard!')}
                  key={`${blockchain}-${address}`}
                  title={`Copy this address to clipboard`}
                >
                  {renderSVG(blockchainLogoUrl[blockchain])}
                </AddressButton>
              ))}
            </SectionItemContainer>
          </Section>
        )}
        {staticIsLanding && (
          <ClaimYourNimi
            as="a"
            href={`https://nimi.eth.limo/#/domains/${ensName}`}
            target="_blank"
            rel="noopener noreferrer"
            isBig
          >
            Claim Your <StyledNimiText width={'45'} height={'15'} /> Profile
          </ClaimYourNimi>
        )}
      </StyledInnerWrapper>
      <FooterWrapper>
        <NimiTextFooter />
        <Footer />
      </FooterWrapper>
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
