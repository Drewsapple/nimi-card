import styled from 'styled-components';

import { NIMI_CARDS_WIDTH } from '../../../constants';

export const StyledPOAPList = styled.div`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

export const StyledPOAPItem = styled.div`
  @media (min-width: ${NIMI_CARDS_WIDTH}px) {
    width: 20%;
  }
  width: 30%;
  > img {
    width: 100%;
    border-radius: 50%;
  }
`;
