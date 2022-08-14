import { Nimi, NimiCard } from '../components/NimiCard';
import { Providers } from '../providers';
import { filterEmptyLinks } from '../utils';

export interface CardAppProps {
  nimi: Nimi;
}

/**
 * Handles all logic for the NimiCard component:
 * Providers, necessary data, and rendering.
 */
export function CardApp({ nimi }: CardAppProps) {
  const filteredNimi = filterEmptyLinks(nimi);
  return (
    <Providers>
      <NimiCard nimi={filteredNimi} />
    </Providers>
  );
}
