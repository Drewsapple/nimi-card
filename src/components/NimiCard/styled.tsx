import { Flex } from 'rebass';
import styled from 'styled-components/macro';

const NIMI_CARDS_WIDTH = 500;

export const StyledWrapper = styled(Flex)`
  display: flex;
  flex-direction: column;
  align-items: center;

  /** Spacing and padding */
  width: 100%;
  max-width: ${NIMI_CARDS_WIDTH}px;

  /** Mobile default style */
  overflow: hidden;
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

export const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 325px;
  width: 100%;
  align-items: center;
`;

export const PicBackgroundTop = styled.div`
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  opacity: 0.8;
  border-radius: 0px 0px 200px 200px;
  height: 188px;
  width: 100%;
`;

export const ProfilePicture = styled.div<{
  image: string;
}>(
  ({ image = 'https://pbs.twimg.com/profile_images/1466765692754083849/xltEmb3d_400x400.jpg' }) => `
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

export const DisplayName = styled.div`
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

export const AddressBar = styled.div`
  margin-top: 26px;
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 100%;
  /* identical to box height, or 22px */

  display: flex;
  align-items: center;
  text-align: center;
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
  font: inherit;
  font-size: 15px;
  margin: 25px 37px;
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
  @media (min-width: ${NIMI_CARDS_WIDTH}px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
`;

export const SectionItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const SectionItemLink = styled.a`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  font-size: 17px;
  font-weight: 400;
  color: rgba(47, 128, 237, 1);
`;

export const Footer = styled.footer`
  background: linear-gradient(291.35deg, #4368ea -25.85%, #c490dd 73.38%);
  border-radius: 200px 200px 0px 0px;
  opacity: 0.8;
  width: 100%;
  height: 75px;
`;
