export const COLUMN_VALUES = 'COLUMN_VALUES';
export const COMPARISON_VALUES = 'COMPARISON_VALUES';
export const VALUES = 'VALUES';
export const RESET_STATE_SELECTORS ='RESET_STATE_SELECTORS';

const selectedColumn = (column) => ({
  type: COLUMN_VALUES,
  selectedValues: { column },
});

const selectedComparison = (comparison) => ({
  type: COMPARISON_VALUES,
  selectedValues: { comparison },
});

const selectedValue = (value) => ({
  type: VALUES,
  selectedValues: { value },
});

export const resetStateSelectors = () => ({
  type: RESET_STATE_SELECTORS,
  selectedValues: { column: '', comparison: '', value: 0 },
});

export const setSessionStorage = ({ target: { value } }, i) => {
  if (i === 0) {
    return (dispatch) => (
      dispatch(selectedColumn(value))
    );
  }
  if (i === 1) {
    return (dispatch) => (
      dispatch(selectedComparison(value))
    );
  }
  if (i === 2) {
    return (dispatch) => (
      dispatch(selectedValue(value))
    );
  }

  return null;
};
