import { isAddress } from '@ethersproject/address';

import * as Yup from 'yup';

export const ethereumAddress = Yup.string()
  .required()
  .test({
    name: 'isEthereumAddress',
    test: (value) => isAddress(value as string),
    message: '${path} is not an Ethereum address',
  });
