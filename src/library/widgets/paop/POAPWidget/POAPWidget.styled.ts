import styled from 'styled-components';

export const StyledPOAPList = styled.div`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

export const StyledPOAPItem = styled.div`
  width: 30%;
  > img {
    width: 100%;
    border-radius: 50%;
  }
`;
