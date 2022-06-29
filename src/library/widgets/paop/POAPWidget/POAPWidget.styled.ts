import styled from 'styled-components';

export const StyledPOAPList = styled.div`
  max-width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

export const StyledPOAPItem = styled.div`
  width: 100%;
  > img {
    max-width: 100%;
    border-radius: 50%;
  }
`;
