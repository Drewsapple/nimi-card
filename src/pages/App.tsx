import { Suspense } from 'react';

import exampleNimi from '../data/nimi-card.json';
import { Nimi, NimiCard, Container as NimiCardContainer } from '../library/components/NimiCard';

export function App() {
  return (
    <Suspense fallback={null}>
      <NimiCardContainer>
        <NimiCard nimi={exampleNimi as Nimi} />
      </NimiCardContainer>
    </Suspense>
  );
}
