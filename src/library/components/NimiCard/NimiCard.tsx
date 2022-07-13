import { FC, SVGProps } from 'react';
import styled from 'styled-components';

import { ReactComponent as EthereumLogo } from '../../assets/svg/blockchain/ethereum.svg';
import { ReactComponent as CopyClipboard } from '../../assets/svg/common/copy-clipboard.svg';
import { ReactComponent as ExternalLinkSvg } from '../../assets/svg/common/external-link.svg';
import { ReactComponent as LimoText } from '../../assets/svg/limo-text.svg';
import { ReactComponent as GithubLogo } from '../../assets/svg/links/github.svg';
import { ReactComponent as TwitterLogo } from '../../assets/svg/links/twitter.svg';
import { ReactComponent as NimiText } from '../../assets/svg/nimi-text.svg';
import { ReactComponent as NimiLanding } from '../../assets/svg/NimiLanding.svg';
import { ReactComponent as XIcon } from '../../assets/svg/x-icon.svg';
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
const LandingFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const XICOn = styled(XIcon)`
  margin: 0 42px;
`;
const MainLandingWrapper = styled.div`
  display: flex;
  max-width: 237px;
  gap: 24px;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 24px;
`;
const CommemorationText = styled.div`
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #bca8f9;
  font-weight: 600;
  font-size: 9px;
  line-height: 16px;
`;
const StyledTwitterLogo = styled(TwitterLogo)`
  path {
    fill: #8e85e0;
  }
`;
const StyledGithubLogo = styled(GithubLogo)`
  margin-left: 42px;
  path {
    fill: #8e85e0;
  }
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
        {staticIsLanding ? (
          <MainLandingWrapper>
            <LandingFooter>
              <a target="_blank" rel="noopener noreferrer" href="https://eth.limo/">
                <LimoText />
              </a>
              <XICOn />
              <a target="_blank" rel="noopener noreferrer" href="https://nimi.eth.limo/">
                <NimiLanding />
              </a>
            </LandingFooter>
            <CommemorationText>
              A collaboration between ETH.Limo & Nimi To make the web more decentrlized
            </CommemorationText>
            <LandingFooter>
              <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/0xNimi">
                <StyledTwitterLogo width={20} height={19} />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/nimi-app">
                <StyledGithubLogo width={19} height={15} />
              </a>
            </LandingFooter>
          </MainLandingWrapper>
        ) : (
          <>
            <NimiTextFooter />
            <Footer />
          </>
        )}
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
