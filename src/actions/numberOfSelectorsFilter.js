export const NUMBER_OF_SELECTORS_FILTER = 'NUMBER_OF_SELECTORS_FILTER';

export function searchFilter(value) {
  return { type: NUMBER_OF_SELECTORS_FILTER, value };
}
