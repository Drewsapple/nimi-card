import { PropsWithChildren, useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

import { fetchPOAPs } from '../api';
import { POAPToken } from '../types';
import { StyledPOAPItem, StyledPOAPList } from './POAPWidget.styled';

export type POAPWidgetProps = PropsWithChildren<{
  address: string;
}>;

export function POAPWidget({ address }: POAPWidgetProps) {
  const [paopList, setPaopList] = useState<POAPToken[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    fetchPOAPs(address)
      .then((res) => {
        unstable_batchedUpdates(() => {
          setPaopList(res.slice(0, 9));
          setIsLoading(false);
        });
      })
      .catch((err) => console.error(err));
  }, [address]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <StyledPOAPList>
          {paopList.map((paop) => (
            <StyledPOAPItem
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://app.poap.xyz/token/${paop.tokenId}`}
              key={`${paop.tokenId}-${paop.event.id}`}
            >
              <img src={paop.event.image_url} />
            </StyledPOAPItem>
          ))}
        </StyledPOAPList>
      )}
    </div>
  );
}
