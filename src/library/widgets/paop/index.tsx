import { NimiWidgetDefinition } from '../interfaces/widgets.interfaces';
export { POAPWidget as Component } from './POAPWidget/POAPWidget';

export const widget: NimiWidgetDefinition = {
  id: 'poap',
  name: 'POAP',
  description: 'Show off your most recent POAPs',
  version: '0.0.1',
};
