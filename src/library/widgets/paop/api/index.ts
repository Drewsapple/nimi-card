import { POAPToken } from '../types';

/**
 * Fetches the POAP data from the given address and renders it.
 * @param address
 * @returns
 */
export function fetchPOAPs(address: string): Promise<POAPToken[]> {
  return fetch(`https://api.poap.tech/actions/scan/${address}`).then((res) => res.json());
}
