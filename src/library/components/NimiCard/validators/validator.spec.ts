import { NimiLinkBaseDetails, NimiLinkType } from '../types';
import { link } from './validators';

describe('Validators', () => {
  describe('Link', () => {
    test('throws an error when email invalid', () => {
      const linkPayload: NimiLinkBaseDetails = {
        type: NimiLinkType.EMAIL,
        label: '',
        content: '',
        title: '',
      };
      expect(link.validate(linkPayload)).rejects.toThrow();
    });

    test('throws an error when URL is invalid', () => {
      const linkPayload: NimiLinkBaseDetails = {
        type: NimiLinkType.URL,
        label: '',
        content: 'aaaaaa',
        title: '',
      };
      expect(link.validate(linkPayload)).rejects.toThrow();
    });

    test('returns the validated payload when URL is valid', () => {
      const linkPayload: NimiLinkBaseDetails = {
        type: NimiLinkType.URL,
        label: '',
        content: 'https://example.com',
        title: '',
      };
      expect(link.validate(linkPayload)).resolves.toEqual({
        type: NimiLinkType.URL,
        label: '',
        content: 'https://example.com',
        title: '',
      });
    });

    test('returns the validated payload when URL is valid', () => {
      const linkPayload: NimiLinkBaseDetails = {
        type: NimiLinkType.DISCORD,
        label: '',
        content: 'adam',
        title: '',
      };
      expect(link.validate(linkPayload)).rejects.toThrow();
    });

    test('throws when Discord name is invalid', () => {
      const linkPayload: NimiLinkBaseDetails = {
        type: NimiLinkType.DISCORD,
        label: '',
        content: 'adam#14',
        title: '',
      };
      expect(link.validate(linkPayload)).rejects.toThrow();
    });

    test('returns the validated payload when Discord name is valid', () => {
      const linkPayload: NimiLinkBaseDetails = {
        type: NimiLinkType.DISCORD,
        label: '',
        content: 'adam#1234',
        title: '',
      };
      expect(link.validate(linkPayload)).resolves.toEqual({
        type: NimiLinkType.DISCORD,
        label: '',
        content: 'adam#1234',
        title: '',
      });
    });

    test('throws when the link type is not registered ', () => {
      const linkPayload: NimiLinkBaseDetails = {
        type: 'NOT_REGISTERED' as any,
        label: '',
        content: 'adam#1234',
        title: '',
      };
      expect(link.validate(linkPayload)).rejects.toThrow();
    });
  });
});
