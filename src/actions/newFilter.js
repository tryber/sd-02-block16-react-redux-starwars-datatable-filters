export const NEW_FILTER = 'NEW_FILTER';

export function newSelectorFilter(column, comparison, valueComparison) {
  return { type: NEW_FILTER, column, comparison, valueComparison };
}
