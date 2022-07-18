import { PropsWithChildren, useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

import { fetchPOAPs } from '../api';
import { POAPToken } from '../types';
import { StyledPOAPItem, StyledPOAPList } from './POAPWidget.styled';

export type POAPWidgetProps = PropsWithChildren<{
  address: string;
  numberOfPOAPs?: number;
}>;

const defaultNumberOfPOAPs = 8;

export function POAPWidget({ address, numberOfPOAPs = defaultNumberOfPOAPs }: POAPWidgetProps) {
  const [poapList, setPoapList] = useState<POAPToken[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    fetchPOAPs(address)
      .then((res) => {
        unstable_batchedUpdates(() => {
          setPoapList(res.slice(0, numberOfPOAPs));
          setIsLoading(false);
        });
      })
      .catch((err) => console.error(err));
  }, [address, numberOfPOAPs]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <StyledPOAPList>
          {poapList.map((poap) => (
            <StyledPOAPItem
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://app.poap.xyz/token/${poap.tokenId}`}
              key={`${poap.tokenId}-${poap.event.id}`}
            >
              <img src={poap.event.image_url} />
            </StyledPOAPItem>
          ))}
        </StyledPOAPList>
      )}
    </div>
  );
}
