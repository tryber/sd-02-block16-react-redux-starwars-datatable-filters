import {
  COLUMN_VALUES,
  COMPARISON_VALUES,
  VALUES,
  RESET_STATE_SELECTORS,
} from '../actions/selectors';

const INITIAL_SELECTOR_STATE = {
  selectedValues: {
    column: '',
    comparison: '',
    value: 0,
  },
};

const selectors = (state = INITIAL_SELECTOR_STATE, action) => {
  switch (action.type) {
    case COLUMN_VALUES: {
      return {
        ...state,
        selectedValues: { ...state.selectedValues, ...action.selectedValues },
      };
    }
    case COMPARISON_VALUES:
      return {
        ...state,
        selectedValues: { ...state.selectedValues, ...action.selectedValues },

      };
    case VALUES:
      return {
        ...state,
        selectedValues: { ...state.selectedValues, ...action.selectedValues },
      };
    case RESET_STATE_SELECTORS:
      return {
        ...state,
        selectedValues: action.selectedValues,
      };
    default:
      return state;
  }
};
export default selectors;
