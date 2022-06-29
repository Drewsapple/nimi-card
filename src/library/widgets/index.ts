import { NimiWidgetDefinition } from './interfaces';
import { widget as paopWidget } from './paop';

export const widgets: Record<string, NimiWidgetDefinition> = {
  [paopWidget.id]: paopWidget,
};
