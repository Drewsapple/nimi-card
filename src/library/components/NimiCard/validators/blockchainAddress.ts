import { isAddress as isEVMAddress } from '@ethersproject/address';

import { validate as isBitcoinAddress } from 'bitcoin-address-validation';
import * as Yup from 'yup';

export const evmAddress = Yup.string().test({
  name: 'isEVMAddress',
  test: (value) => isEVMAddress(value as string),
  message: '${path} is not an EVM address',
});

export const bitcoinAddress = Yup.string().test({
  name: 'isBitcoinAddress',
  test: (value) => isBitcoinAddress(value as string),
  message: '${path} is not a Bitcoin address',
});
