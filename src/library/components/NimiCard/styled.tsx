import styled from 'styled-components';

import { ReactComponent as StyledNimiBigSvg } from '../../assets/svg/nimi-text.svg';
import { ReactComponent as Shitter } from '../../assets/svg/shitter.svg';
import { ExternalLink } from '../../components/ExternalLink';

// import { ReactComponent as NimiHeaderWave } from '../../assets/svg/nimi-header-wave.svg';

const NIMI_CARDS_WIDTH = 570;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: space-between;

  /** Spacing and padding */

  max-width: ${NIMI_CARDS_WIDTH}px;

  /** Mobile default style */
  background: #fff;

  /** Add blur on mobile */
  @media (max-width: ${NIMI_CARDS_WIDTH}px) {
    backdrop-filter: blur(20px);
  }

  /** Switch to card style */
  @media (min-width: ${NIMI_CARDS_WIDTH}px) {
    background: transparent;
    /** border-radius: 25px;
   box-shadow: 0px 5px 24px rgba(138, 143, 234, 0.12); **/
  }
`;

export const StyledInnerWrapper = styled.div`
  padding: 0px 20px;
  margin-top: 215px;
  @media (max-width: ${NIMI_CARDS_WIDTH}px) {
    max-width: 100vw;
  }
`;

export const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const PicBackgroundTop = styled.div`
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);

  position: absolute;

  border-radius: 0px 0px 200px 200px;
  height: 188px;
  width: 100%;
  @media (min-width: ${NIMI_CARDS_WIDTH}px) {
    border-radius: 50%;
    width: 100vw;
    bottom: 78vh;
    height: 100vw;
  }
`;

export const StyledNimiBig = styled(StyledNimiBigSvg)`
  margin-top: 22px;
  position: absolute;
  z-index: 1;

  @media (min-width: ${NIMI_CARDS_WIDTH}px) {
    width: 105px;
    height: 35px;
  }
`;

export const ProfilePicture = styled.div<{
  image?: string;
}>(
  ({ image = 'https://gateway.pinata.cloud/ipfs/QmRwFR4CXRWHd9cXy8xFbUcPHw5oeczg9HsEiP4qt96MZ9' }) => `
  background-image: url(${image});
  background-position: center, center;
  background-size: cover;
  border: 8px solid #FFFFFF;
  border-radius: 200px;
  height: 250px;
  width: 250px;
  margin-top: -140px;
  z-index: 1;
`
);

export const DisplayNameWrapper = styled.div`
  display: flex;
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
`;

export const DisplayName = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 31.818px;
  line-height: 100%;
  justify-content: center;
  margin-top: 33px;
  display: flex;
  align-items: center;
  color: #000000;
`;
export const EnsName = styled.div`
  font-size: 22px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`;
export const Divider = styled.div`
  height: 18px;
  width: 1.5px;
  background-color: #000000;
`;

export const AddressBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 24px;
`;

export const StyledExternalLink = styled(ExternalLink)`
  font-weight: 400;
  font-size: 17.8976px;
  line-height: 100%;
`;

export const VerticalSeparator = styled.div`
  margin-right: 30px;
  margin-left: 30px;
  &:after {
    content: '|';
    display: inline-block;
  }
`;

export const DescriptionWrapper = styled.div`
  font-size: 16px;
  color: #000000;
  overflow-wrap: break-word;
  margin: 19px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 38px 36px;
  background: #ffffff;
  box-shadow: 0px 8px 35px #e9e0ff;
  border-radius: 25px;
  width: 100%;
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h3`
  font-family: inherit;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 100%;
  margin-bottom: 32px;
`;

export const SectionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionItemContainerGrid = styled.div`
  display: grid;
  grid-row-gap: 27px;
  @media (min-width: ${NIMI_CARDS_WIDTH}px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 32px;
  }
`;

export const SectionItemLink = styled.a`
  display: flex;
  flex-direction: row;
  gap: 8px;
  font-size: 17px;
  font-weight: 400;
  color: rgba(47, 128, 237, 1);
  align-items: center;
`;

export const Footer = styled(Shitter)`
  /* background: linear-gradient(291.35deg, #4368ea -25.85%, #c490dd 73.38%);
  border-radius: 200px 200px 0px 0px;
  opacity: 0.8;
  width: 100%;
  height: 75px; */
  width: 100%;
  height: fit-content;
`;

/**
 *
 */
export const NimiLinkImage = styled.img`
  width: 22px;
  height: 22px;
`;
