export const SELECTOR_FILTER = 'SELECTOR_FILTER';

export function selectorFilter(value, part) {
  return { type: SELECTOR_FILTER, value, part };
}
