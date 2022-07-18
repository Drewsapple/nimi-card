export * from './interfaces';
import { NimiWidgetDefinition } from './interfaces';
import { widget as poapWidgetDefinition } from './poap';

export const widgets: Record<string, NimiWidgetDefinition> = {
  [poapWidgetDefinition.id]: poapWidgetDefinition,
};
