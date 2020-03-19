export const REMOVE_FILTER = 'REMOVE_FILTER';

export function removeFilter(i, value) {
  return { type: REMOVE_FILTER, i, value };
}
