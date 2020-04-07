export const FILTER_COLUMNS = 'FILTER_COLUMNS';
export const FILTER_COMPARISON = 'FILTER_COMPARISON';
export const FILTER_NUMBER = 'FILTER_NUMBER';

export const filterColumns = (column) => (
  { type: FILTER_COLUMNS, column }
);
export const filterComparison = (comparison) => (
  { type: FILTER_COMPARISON, comparison }
);
export const filterNumber = (value) => (
  { type: FILTER_NUMBER, value }
);
