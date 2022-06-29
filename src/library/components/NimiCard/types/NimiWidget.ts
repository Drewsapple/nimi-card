export enum NimiWidgetType {
  POAP = 'PAOP',
}

/**
 * Nimi POAP Widget
 * @since 0.6.0
 */
export interface NimiPOAPWidget {
  type: NimiWidgetType.POAP;
  address: string;
}

/**
 * Nimi Widget
 * @since 0.6.0
 */
export type NimiWidget = NimiPOAPWidget;
