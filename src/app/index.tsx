import { Suspense, useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import styled from 'styled-components';

import { filterEmptyLinks, Nimi, NimiCard, Container as NimiCardContainer, Providers } from '../library';
import { ReactComponent as NimiLogoMarkSvg } from '../library/assets/svg/nimi-logo-mark.svg';

const StyledCenteredContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledNimiLogoMarkSvg = styled(NimiLogoMarkSvg)`
  width: 100px;
  width: 25vw;
  max-width: 200px;
`;

/**
 * Main React Application component.
 */
export function App() {
  const [nimi, setNimi] = useState<Nimi>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const dataPath = process.env.NODE_ENV === 'production' ? './data.json' : './data.json';

    fetch(dataPath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const json = (await response.json()) as Nimi;
          const filteredNimi = filterEmptyLinks(json);

          unstable_batchedUpdates(() => {
            setNimi(filteredNimi);
            setIsLoading(false);
          });
        }
      })
      .catch((error) => {
        unstable_batchedUpdates(() => {
          setIsLoading(false);
          setError(error);
          console.error(error);
        });
      });
  }, []);

  if (isLoading) {
    return (
      <StyledCenteredContainer>
        <StyledNimiLogoMarkSvg />
      </StyledCenteredContainer>
    );
  }

  if (error || !nimi) {
    return (
      <StyledCenteredContainer>
        <StyledNimiLogoMarkSvg />
        <p>Something went wrong.</p>
      </StyledCenteredContainer>
    );
  }

  return (
    <Suspense fallback={null}>
      <NimiCardContainer>
        <Providers>
          <NimiCard nimi={nimi} />
        </Providers>
      </NimiCardContainer>
    </Suspense>
  );
}
