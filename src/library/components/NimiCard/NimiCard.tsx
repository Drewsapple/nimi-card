import { getAddress } from '@ethersproject/address';

import { FC, SVGProps, useEffect, useMemo, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import styled from 'styled-components';

import { ReactComponent as Avatar } from '../../assets/svg/avatar-logo.svg';
import { ReactComponent as EthereumLogo } from '../../assets/svg/blockchain/ethereum.svg';
import { ReactComponent as SolanaLogo } from '../../assets/svg/blockchain/solana.svg';
import { ReactComponent as CopyClipboard } from '../../assets/svg/common/copy-clipboard.svg';
import { ReactComponent as ExternalLinkSvg } from '../../assets/svg/common/external-link.svg';
import { ReactComponent as LimoText } from '../../assets/svg/limo-text.svg';
import { ReactComponent as TwitterLogo } from '../../assets/svg/links/twitter.svg';
import { ReactComponent as NimiLanding } from '../../assets/svg/NimiLanding.svg';
import { ReactComponent as QrCodeLogo } from '../../assets/svg/qr-code.svg';
import { ReactComponent as XIcon } from '../../assets/svg/x-icon.svg';
import { NIMI_BLOCKCHAIN_LOGO_URL, nimiLinkDetailsExtended } from '../../constants';
import { useToast } from '../../toast';
import { Nimi, NimiBlockchain, NimiLinkType } from '../../types';
import { NimiWidgetType } from '../../types/NimiWidget';
import { generateLink, getExplorerAddressLink, getNimiLinkLabel, shortenAddress } from '../../utils';
import { nimiValidator } from '../../validators';
import { Component as POAPWidget } from '../../widgets/poap';
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
  LeftOfCenter,
  NimiTextFooter,
  PicBackgroundTop,
  PoapSection,
  PoapTitle,
  ProfilePicture,
  ProfilePictureContainer,
  Registration,
  RightOfCenter,
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

interface NimiCardProps {
  nimi: Nimi;
}

function renderSVG(logo?: FC<SVGProps<SVGSVGElement>>) {
  if (!logo) return;
  const Logo = logo;

  return <Logo height={22} width={22} />;
}

const nimiTextUrl = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA3MiAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5LjEwMzMgMy45NTU3OUMxOS4wMjg3IDIuOTAxMDkgMTguNjAyNiAyLjE5Nzk3IDE3LjgxNDIgMS44NDY0QzE3LjAxNTIgMS40OTQ4NCAxNi4yMjY5IDEuNDk0ODQgMTUuNDM4NSAxLjg0NjRDMTQuNjUwMiAyLjE5Nzk3IDE0LjIyNCAyLjkwMTA5IDE0LjE3MDggMy45NTU3OUMxNC4xODE0IDUuNjgxNjQgMTQuMTgxNCA3LjQwNzUgMTQuMTkyMSA5LjEzMzM2QzE0LjE5MjEgOS44Njg0NSAxNC4xOTIxIDEwLjYwMzUgMTQuMjAyNyAxMS4zMzg2QzExLjMzNjkgOC40NDA4OSA4LjE5NDE4IDUuODk0NzEgNC43NTMxMiAzLjY4OTQ1QzQuMTQ1ODcgMy4zMzc4OSAzLjU4MTI0IDMuMjIwNyAzLjA0ODU3IDMuMzU5MTlDMi45NTI2OSAzLjM2OTg1IDIuODY3NDYgMy4zOTExNSAyLjc4MjIzIDMuNDEyNDZDMi4wNzkxIDMuNjI1NTMgMS41ODkwNSA0LjAwOTA1IDEuMzIyNzEgNC41NzM2OUMxLjA0NTcyIDUuMTM4MzIgMC45NjA0OTMgNS43NTYyMiAxLjA1NjM3IDYuNDM4MDRDMS43NDg4NSAxMS41ODM3IDIuODc4MTEgMTYuNjMzNCA0LjQyMjg2IDIxLjU4NzJDNC43OTU3MyAyMi41NzggNS40MjQyOSAyMy4xMzIgNi4yODcyMiAyMy4yNTk4QzcuMTYwOCAyMy4zODc3IDcuOTE3MTkgMjMuMTg1MyA4LjU3NzcxIDIyLjYzMTNDOS4yMzgyMiAyMi4wODc5IDkuNDQwNjMgMjEuMjk5NiA5LjE3NDMgMjAuMjc2OUM4LjI0NzQ1IDE3LjMxNTIgNy40ODA0IDE0LjMyMTYgNi44NjI1IDExLjI5NkM5LjczODkzIDEzLjc1NyAxMi40MzQzIDE2LjQwOTcgMTQuOTQ4NSAxOS4yNjQ4QzE1Ljc1ODEgMjAuMDMxOCAxNi42NTMgMjAuMjAyMyAxNy42MDEyIDE5Ljc3NjJDMTguNTQ5MyAxOS4zNSAxOS4wNzEzIDE4LjYwNDMgMTkuMTQ1OSAxNy41MTc2QzE5LjEzNTMgMTMuMDAwNiAxOS4xMjQ2IDguNDgzNSAxOS4xMDMzIDMuOTU1NzlaTTI5LjY5ODQgMy40MDE4MUMyOS4wNTkyIDMuMjQyIDI4LjQzMDYgMy4zMTY1OCAyNy44MjM0IDMuNjM2MThDMjcuMjE2MSAzLjk1NTc5IDI2LjgzMjYgNC40NDU4NCAyNi42NzI4IDUuMTE3MDFDMjYuNTEzIDUuOTI2NjcgMjYuMzUzMiA2Ljc0Njk5IDI2LjE5MzQgNy41NTY2NUMyNS4zNzMxIDExLjY2ODkgMjQuNTYzNCAxNS43ODExIDIzLjc1MzggMTkuODkzM0MyMy42MjU5IDIwLjU2NDUgMjMuNzExMSAyMS4xOTMxIDIzLjk5ODggMjEuNzU3N0MyNC4yOTcxIDIyLjMyMjMgMjQuNzg3MSAyMi43MDU4IDI1LjQ2OSAyMi45MTg5QzI2LjExODggMjMuMDc4NyAyNi43NDc0IDIyLjk5MzUgMjcuMzQ0IDIyLjY3MzlDMjcuOTUxMiAyMi4zNjQ5IDI4LjMzNDcgMjEuODY0MiAyOC41MDUyIDIxLjE5MzFDMjguODI0OCAxOS41NTI0IDI5LjE1NSAxNy45MTE4IDI5LjQ3NDcgMTYuMjcxMkMzMC4xMjQ1IDEyLjk4OTkgMzAuNzc0NCA5LjcwODY1IDMxLjQyNDIgNi40MjczOEMzMS41NTIxIDUuNzQ1NTYgMzEuNDY2OCA1LjEyNzY2IDMxLjE2ODUgNC41NjMwM0MzMC44NzAzIDMuOTk4NCAzMC4zODAyIDMuNjA0MjIgMjkuNjk4NCAzLjQwMTgxWk01OC45MzcgMTQuNjczMkM1Ni4zOTA4IDEwLjY0NjEgNTQuMzY2NiA2LjM3NDEyIDUyLjg3NTIgMS44NDY0QzUyLjM4NTEgMC42NDI1NjQgNTEuNTk2NyAwLjA1NjYyNDYgNTAuNTMxNCAwLjA4ODU4NUM0OS40NTU0IDAuMTMxMTk5IDQ4LjY1NjQgMC43MTcxMzggNDguMTIzNyAxLjg0NjRMNDUuMzUzOCA4Ljk2MjlDNDMuNzIzOCA2Ljg0Mjg3IDQyLjA3MjYgNC43NDQxNCA0MC40IDIuNjU2MDdDMzkuNzgyMSAyLjAwNjIgMzkuMDE1IDEuNzkzMTQgMzguMTA5NSAyLjAxNjg2QzM3LjU2NjIgMi4xMTI3NCAzNy4wOTc0IDIuMzU3NzcgMzYuNzAzMiAyLjc0MTI5QzM2LjMxOTcgMy4xMzU0NyAzNi4wOTYgMy42NjgxNCAzNi4wNDI3IDQuMzQ5OTZDMzUuODA4MyA5LjQ5NTU4IDM1LjkzNjIgMTQuNjQxMiAzNi40MzY5IDE5Ljc3NjJDMzYuNTExNSAyMC40NTggMzYuNzU2NSAyMS4wNDM5IDM3LjE4MjYgMjEuNTIzM0MzNy42MDg4IDIyLjAwMjcgMzguMTg0MSAyMi4yMzcxIDM4Ljg5NzggMjIuMjM3MUMzOS41NDc3IDIyLjIzNzEgNDAuMTIzIDIyLjAwMjcgNDAuNjIzNyAyMS41MjMzQzQxLjEyNDQgMjEuMDQzOSA0MS4zNjk0IDIwLjQ2ODYgNDEuMzY5NCAxOS43NzYyQzQxLjM1ODggMTkuNjY5NiA0MS4zNTg4IDE5LjU3MzcgNDEuMzQ4MSAxOS40NjcyQzQxLjMzNzUgMTkuMjc1NCA0MS4zMjY4IDE5LjA3MyA0MS4zMTYyIDE4Ljg3MDZDNDEuMzA1NSAxOC42Nzg4IDQxLjI4NDIgMTguNDk3NyA0MS4yNDE2IDE4LjMzNzlDNDEuMDM5MiAxNS45NDA5IDQwLjkyMiAxMy41NTQ1IDQwLjg3OTQgMTEuMTY4MkM0MS45MDIxIDEyLjQ4OTIgNDIuOTI0OCAxMy44MjA5IDQzLjkyNjMgMTUuMTYzMkM0NC42NCAxNi4wMzY4IDQ1LjQ2MDQgMTYuNDIwMyA0Ni4zNzY2IDE2LjMxMzhDNDcuMjgyMSAxNi4xOTY2IDQ3Ljk3NDYgMTUuNjIxMyA0OC40MzI3IDE0LjU3NzNDNDkuMTE0NSAxMi44MDg4IDQ5LjgwNyAxMS4wNTEgNTAuNDg4OCA5LjI4MjUxQzUxLjY5MjYgMTIuMDA5OCA1My4wOTg5IDE0LjY0MTIgNTQuNjg2MiAxNy4xNjYxQzU1LjI5MzUgMTguMDI5IDU2LjAzOTIgMTguNDEyNSA1Ni45MTI4IDE4LjMwNkM1Ny43ODY0IDE4LjIxMDEgNTguNDY4MiAxNy44MTU5IDU4Ljk2ODkgMTcuMTEyOEM1OS40NTkgMTYuNDIwMyA1OS40NDgzIDE1LjYxMDcgNTguOTM3IDE0LjY3MzJaTTY5Ljg5NDIgMy40MDE4MUM2OS4yNTUgMy4yNDIgNjguNjI2NSAzLjMxNjU4IDY4LjAxOTIgMy42MzYxOEM2Ny40MTIgMy45NTU3OSA2Ny4wMjg1IDQuNDQ1ODQgNjYuODY4NyA1LjExNzAxQzY2LjcwODkgNS45MjY2NyA2Ni41NDkxIDYuNzQ2OTkgNjYuMzg5MyA3LjU1NjY1QzY1LjU2ODkgMTEuNjY4OSA2NC43NTkzIDE1Ljc4MTEgNjMuOTQ5NiAxOS44OTMzQzYzLjgyMTggMjAuNTY0NSA2My45MDcgMjEuMTkzMSA2NC4xOTQ3IDIxLjc1NzdDNjQuNDkyOSAyMi4zMjIzIDY0Ljk4MyAyMi43MDU4IDY1LjY2NDggMjIuOTE4OUM2Ni4zMTQ3IDIzLjA3ODcgNjYuOTQzMiAyMi45OTM1IDY3LjUzOTggMjIuNjczOUM2OC4xNDcxIDIyLjM2NDkgNjguNTMwNiAyMS44NjQyIDY4LjcwMTEgMjEuMTkzMUM2OS4wMjA3IDE5LjU1MjQgNjkuMzUwOSAxNy45MTE4IDY5LjY3MDUgMTYuMjcxMkM3MC4zMjA0IDEyLjk4OTkgNzAuOTcwMiA5LjcwODY1IDcxLjYyMDEgNi40MjczOEM3MS43NDc5IDUuNzQ1NTYgNzEuNjYyNyA1LjEyNzY2IDcxLjM2NDQgNC41NjMwM0M3MS4wNjYxIDMuOTk4NCA3MC41NzYxIDMuNjA0MjIgNjkuODk0MiAzLjQwMTgxWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==`;

const NimiTextLogo = () => (
  <img
    src={nimiTextUrl}
    width="45"
    height="15"
    style={{
      margin: '0 5px',
    }}
  />
);

function renderWidgets(nimiWidgetList: NimiCardProps['nimi']['widgets'], ensName: string) {
  return (
    nimiWidgetList &&
    nimiWidgetList.map((widget) => {
      switch (widget.type) {
        case NimiWidgetType.POAP:
          return (
            <PoapSection key={widget.type + '-' + widget.address}>
              <PoapTitle>
                <SectionTitle>POAPs</SectionTitle>
                <ShadowButton
                  target="_blank"
                  rel="noopener noreferrer"
                  as="a"
                  href={`https://app.poap.xyz/scan/${ensName}`}
                  color="purple"
                >
                  Full Collection <ExternalLinkSvg />
                </ShadowButton>
              </PoapTitle>

              <POAPWidget address={widget.address} />
            </PoapSection>
          );
        default:
          return null;
      }
    })
  );
}

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
  margin-top: 32px;
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

const LinksAndSocials = styled.div`
  color: #383838;
  font-weight: 500;
  font-size: 27.8408px;
  text-align: center;
  line-height: 100%;
`;
const NoLinks = styled.div`
  font-weight: 500;
  text-align: center;
  font-size: 14px;
  line-height: 21px;
  margin-top: 32px;
  color: #757575;
`;

const StyledQrCodeWrapper = styled.div`
  background-position: center, center;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-size: cover;
  border-radius: 200px;
  height: 185px;
  background-color: white;
  width: 185px;
  margin-top: -140px;
  z-index: 1;
`;

const QrCodeSvg = styled(QrCodeLogo)`
  position: absolute;
  z-index: 1;
  margin-left: 138px;
  margin-top: -4px;
`;
const AvatarSvg = styled(Avatar)`
  position: absolute;
  z-index: 1;
  margin-left: 138px;
  margin-top: 140px;
`;
const StyledQrCode = styled(QRCode)`
  box-shadow: 0px 26px 56px -20px rgba(74, 48, 140, 0.25);
  border-radius: 15px;
`;
export function NimiCard({ nimi }: NimiCardProps) {
  const validateNimi = nimiValidator.validateSync(nimi) as unknown as Nimi;
  const toast = useToast();
  const [isQrCode, setIsQrCode] = useState(false);
  const copyTextShowToast = (value: string, text: string) => {
    navigator.clipboard.writeText(value);
    toast.open(text);
  };
  const isLanding = nimi.isLanding && nimi.isLanding === true;

  const { ensAddress, displayName, resolvedAddress, displayImageUrl, image, addresses, description, ensName, links } =
    validateNimi;

  useEffect(() => {
    const textPath = document.querySelector('#animated-text-path');
    let p = 30;
    textPathAnimationLoop();
    function textPathAnimationLoop() {
      if (!textPath) return;
      p += 0.07; // change to tweak the speed
      if (p > 32.6) p = 0;
      textPath.setAttribute('startOffset', p + '%');
      setTimeout(() => {
        window.requestAnimationFrame(textPathAnimationLoop);
      }, 1000 / 60);
    }
  }, []);
  const isEthereum = useMemo(() => {
    try {
      return getAddress(ensAddress);
    } catch {
      return false;
    }
  }, [ensAddress]);

  return (
    <StyledWrapper>
      {!isLanding && (
        <>
          <PicBackgroundTop />

          <StyledNimiBig onClick={() => window.open('https://nimi.link/', '_black')} />
        </>
      )}

      <StyledInnerWrapper>
        <ProfilePictureContainer onClick={() => setIsQrCode(!isQrCode)}>
          {isQrCode ? (
            <>
              <StyledQrCodeWrapper>
                <StyledQrCode size={110} eyeRadius={15} qrStyle="squares" value={`https://${ensName}.limo`} />
                <AvatarSvg />
              </StyledQrCodeWrapper>
            </>
          ) : (
            <>
              <ProfilePicture image={image ? image.url : displayImageUrl} />
              <QrCodeSvg />
            </>
          )}
        </ProfilePictureContainer>

        <DisplayName>{displayName}</DisplayName>
        <>
          <AddressBar>
            <LeftOfCenter>
              {resolvedAddress ? (
                <StyledExternalLink
                  color="shadow1"
                  href={getExplorerAddressLink(NimiBlockchain.ETHEREUM, resolvedAddress)}
                >
                  <EthereumLogo /> {shortenAddress(resolvedAddress!, 2, 4)}
                </StyledExternalLink>
              ) : (
                <StyledExternalLink
                  color="shadow1"
                  href={
                    isEthereum
                      ? getExplorerAddressLink(NimiBlockchain.ETHEREUM, ensAddress)
                      : getExplorerAddressLink(NimiBlockchain.SOLANA, ensAddress)
                  }
                >
                  {isEthereum ? <EthereumLogo /> : <SolanaLogo />} {shortenAddress(ensAddress, 2, 4)}
                </StyledExternalLink>
              )}
            </LeftOfCenter>
            <Divider />
            <RightOfCenter>
              <EnsName onClick={() => copyTextShowToast(ensName, 'ENS name copied to clipboard!')}>
                {ensName}
                <CopyClipboard />
              </EnsName>
            </RightOfCenter>
          </AddressBar>
          {resolvedAddress && resolvedAddress != ensAddress ? (
            <Registration>
              <LeftOfCenter>Registered by:</LeftOfCenter>
              <RightOfCenter>
                <StyledExternalLink
                  color="shadow1"
                  href={
                    isEthereum
                      ? getExplorerAddressLink(NimiBlockchain.ETHEREUM, ensAddress)
                      : getExplorerAddressLink(NimiBlockchain.SOLANA, ensAddress)
                  }
                >
                  {isEthereum ? <EthereumLogo /> : <SolanaLogo />} {shortenAddress(ensAddress, 2, 4)}
                </StyledExternalLink>
              </RightOfCenter>
            </Registration>
          ) : (
            <></>
          )}
        </>
        <DescriptionWrapper>{description}</DescriptionWrapper>
        {isLanding && (
          <ClaimYourNimi as="a" href="https://nimi.link/" target="_blank" rel="noopener noreferrer">
            Claim Your <NimiTextLogo /> Profile
          </ClaimYourNimi>
        )}
        {links && links.length > 0 && (
          <SectionItemContainerGrid>
            {links.map(({ label, title, type, content }) => {
              // Title should have presdence over label
              title = title ? title : label;

              return (
                <>
                  {type === NimiLinkType.EMAIL || type === NimiLinkType.DISCORD ? (
                    <ShadowButton
                      color="shadow1"
                      title={title}
                      key={`${type}-${content}`}
                      onClick={() =>
                        copyTextShowToast(
                          generateLink({ label, type, content }),
                          `${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()} copied to the clipboard!`
                        )
                      }
                    >
                      {renderSVG(nimiLinkDetailsExtended[type].logo)}
                      {getNimiLinkLabel({ title, type, content })}
                    </ShadowButton>
                  ) : (
                    <ShadowButton
                      as="a"
                      color="shadow1"
                      href={generateLink({ title, type, content })}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={title}
                      key={`${type}-${content}`}
                    >
                      {renderSVG(nimiLinkDetailsExtended[type].logo)}
                      {getNimiLinkLabel({ title, type, content })}
                    </ShadowButton>
                  )}
                </>
              );
            })}
          </SectionItemContainerGrid>
        )}
        {isLanding && links && links.length === 0 && (
          <Section padding="56px 36px">
            <LinksAndSocials>Links & Socials</LinksAndSocials>
            <NoLinks>No Links Found :(</NoLinks>
          </Section>
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
                  {renderSVG(NIMI_BLOCKCHAIN_LOGO_URL[blockchain])}
                </AddressButton>
              ))}
            </SectionItemContainer>
          </Section>
        )}
        {isLanding && (
          <ClaimYourNimi as="a" href="https://nimi.link/" target="_blank" rel="noopener noreferrer" isBig>
            Claim Your <NimiTextLogo /> Profile
          </ClaimYourNimi>
        )}
      </StyledInnerWrapper>
      <FooterWrapper>
        {isLanding ? (
          <MainLandingWrapper>
            <LandingFooter>
              <a target="_blank" rel="noopener noreferrer" href="https://eth.limo/">
                <LimoText />
              </a>
              <XICOn />
              <a target="_blank" rel="noopener noreferrer" href="https://nimi.link/">
                <NimiLanding />
              </a>
            </LandingFooter>
            <CommemorationText>
              A collaboration between ETH.Limo & Nimi To make the web more decentralized
            </CommemorationText>
            <LandingFooter>
              <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/0xNimi">
                <StyledTwitterLogo width={20} height={19} />
              </a>
              {/* <a target="_blank" rel="noopener noreferrer" href="https://github.com/nimi-app">
                <StyledGithubLogo width={19} height={15} />
              </a> */}
            </LandingFooter>
          </MainLandingWrapper>
        ) : (
          <a target="_blank" rel="noopener noreferrer" href="https://nimi.link/">
            <NimiTextFooter />
            <Footer />
          </a>
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
