import { Suspense } from 'react';

import { NimiCard, Container as NimiCardContainer, Nimi } from '../library/components/NimiCard';
import exampleNimi from '../data/nimi-card.json';

export function App() {
  return (
    <Suspense fallback={null}>
      <NimiCardContainer>
        <NimiCard nimi={exampleNimi as Nimi} />
      </NimiCardContainer>
    </Suspense>
  );
}
