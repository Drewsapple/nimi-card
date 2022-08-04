import { Nimi, NimiCard } from '../components/NimiCard';
import { Providers } from '../providers';

export interface CardAppProps {
  nimi: Nimi;
}

/**
 * Handles all logic for the NimiCard component:
 * Providers, necessary data, and rendering.
 */
export function CardApp({ nimi }: CardAppProps) {
  //filter empty links
  if (nimi.links) nimi.links = nimi.links.filter(({ content }) => content !== '');
  return (
    <Providers>
      <NimiCard nimi={nimi} />
    </Providers>
  );
}
