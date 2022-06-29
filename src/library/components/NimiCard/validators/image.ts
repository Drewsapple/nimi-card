import * as Yup from 'yup';

import { NimiImageType } from '../types';

export const nimiImageERC721 = Yup.object().shape({
  type: Yup.string().oneOf([NimiImageType.ERC721]).required(),
  contract: Yup.string().required(),
  tokenId: Yup.number().required(),
  tokenUri: Yup.string().required(),
  url: Yup.string().url().required(),
});

export const nimiImageUrl = Yup.object().shape({
  type: Yup.string().oneOf([NimiImageType.URL]).required(),
  url: Yup.string().url().required(),
});
