export const FILTER_COLUMNS = 'FILTER_COLUMN';
export const COMPARISON_PARAM_EQUAL = 'COMPARISON_PARAM_EQUAL';
export const NUMBER_WRITTEN = 'NUMBER_WRITTEN';
export const DELETE_COLUMNS = 'DELETE_COLUMNS';
export const DELETE_COMPARISON = 'DELETE_COMPARISON';
export const DELETE_NUMBER = 'DELETE_NUMBER';

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

export const deleteColumns = (hide, number, comparison, column) => (
  {
    type: DELETE_COLUMNS,
    hide,
    number,
    comparison,
    column,
  }
);

export const deleteComparison = (comparison) => (
  {
    type: DELETE_COMPARISON,
    comparison,
  }
);

export const deleteNumber = (number) => (
  {
    type: DELETE_NUMBER,
    number,
  }
);
