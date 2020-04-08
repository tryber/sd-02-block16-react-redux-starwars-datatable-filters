export const FILTER_COLUMNS = 'FILTER_COLUMNS';
export const FILTER_COMPARISON = 'FILTER_COMPARISON';
export const FILTER_NUMBER = 'FILTER_NUMBER';
export const GENERATE_FILTER = 'GENERATE_FILTER';

export const filterColumns = (column) => (
  { type: FILTER_COLUMNS, column }
);
export const filterComparison = (comparison) => (
  { type: FILTER_COMPARISON, comparison }
);
export const filterNumber = (value) => (
  { type: FILTER_NUMBER, value }
);

export const generateFilter = (chosenColumn, arrayColumns) => (
  {
    type: GENERATE_FILTER,
    chosenColumn,
    newColumns: arrayColumns.splice(arrayColumns.indexOf(chosenColumn), 1),
    newValues: {
      numericValues: {
        column: '',
        comparison: '',
        value: '',
      },
    },
  }
);
