export const FILTER_COLUMNS = 'FILTER_COLUMNS';
export const FILTER_COMPARISON = 'FILTER_COMPARISON';
export const FILTER_NUMBER = 'FILTER_NUMBER';
export const GENERATE_FILTER = 'GENERATE_FILTER';
export const ERASE_FILTER = 'ERASE_FILTER';

export const filterColumns = (column) => (
  { type: FILTER_COLUMNS, column }
);
export const filterComparison = (comparison) => (
  { type: FILTER_COMPARISON, comparison }
);
export const filterNumber = (value) => (
  { type: FILTER_NUMBER, value }
);

export const generateFilter = (newNumericValues) => (
  { type: GENERATE_FILTER, newNumericValues }
);

export const eraseFilter = (array, column) => (
  {
    type: ERASE_FILTER,
    array: array.filter(({ numericValues }) => (numericValues.column !== column)),
    column,
  }
);
