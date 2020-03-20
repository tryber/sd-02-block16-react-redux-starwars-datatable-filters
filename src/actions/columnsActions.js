export const FILTER_COLUMNS = 'FILTER_COLUMN';
export const COMPARISON_PARAM_EQUAL = 'COMPARISON_PARAM_EQUAL';
export const NUMBER_WRITTEN = 'NUMBER_WRITTEN';
// export const ERASE_COLUMNS = 'ERASE_COLUMNS';

export const filterColumns = (column) => (
  {
    type: FILTER_COLUMNS,
    column,
  }
);

export const comparisonParamEqual = (comparison) => (
  {
    type: COMPARISON_PARAM_EQUAL,
    comparison,
  }
);

export const numberWritten = (number) => (
  {
    type: NUMBER_WRITTEN,
    number,
  }
);

// export const eraseColumns = () => ({
//   type: ERASE_COLUMNS,
// });
