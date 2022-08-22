import { Nimi, NimiImageType } from '../types';
import { nimiValidator } from './validators';

describe('Nimi Validators', () => {
  describe('Nimi', () => {
    test('resolves optional Nimi fields', () => {
      const nimiPayload: Nimi = {
        description: '',
        displayName: 'test.eth',
        ensName: 'test.eth',
        ensAddress: '0x123',
        addresses: [],
        links: [],
        widgets: [],
      };
      expect(nimiValidator.validate(nimiPayload)).resolves;
    });

    test('resolves optional Nimi fields when defined', () => {
      const nimiPayload: Nimi = {
        description: '',
        displayName: 'test.eth',
        ensName: 'test.eth',
        ensAddress: '0x123',
        addresses: [],
        links: [],
        widgets: [],
        image: {
          type: 'URL' as NimiImageType.URL,
          url: 'https://example.com/image.png',
        },
      };
      expect(nimiValidator.validate(nimiPayload)).resolves;
    });
  });
});
