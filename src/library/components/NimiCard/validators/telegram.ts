const TELEGRAM_PATTERN = /.*[\W](@(?=.{5,64}(?:\s|$))(?![_])(?!.*[_]{2})[a-zA-Z0-9_]+(?<![_.])).*/;

/**
 * Checks if a value is a valid Telegram username
 * @param value
 * @returns
 */
export function isTelegramUsername(value: any): boolean {
  return TELEGRAM_PATTERN.test(value);
}
