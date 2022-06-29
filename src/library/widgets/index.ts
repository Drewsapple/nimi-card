export * from './interfaces';
import { NimiWidgetDefinition } from './interfaces';
import { widget as paopWidgetDefinition } from './paop';

export const widgets: Record<string, NimiWidgetDefinition> = {
  [paopWidgetDefinition.id]: paopWidgetDefinition,
};
