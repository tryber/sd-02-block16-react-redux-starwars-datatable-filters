import {
  FILTER_COLUMNS,
  COMPARISON_PARAM_EQUAL,
  NUMBER_WRITTEN,
  // ERASE_COLUMNS,
} from '../actions/columnsActions';

const initialTextState = {
  filters: [
    {
      numericValues: {
        column: '',
        comparison: '',
        value: '',
      },
    },
  ],
};

const columnsReducer = (state = initialTextState, action) => {
  switch (action.type) {
    case FILTER_COLUMNS:
      return {
        ...state,
        filters: [{
          ...state.filters[0],
          numericValues: { ...state.filters[0].numericValues, column: action.column },
        }],
      };
    case COMPARISON_PARAM_EQUAL:
      return {
        ...state,
        filters: [{
          ...state.filters[0],
          numericValues: { ...state.filters[0].numericValues, comparison: action.comparison },
        }],
      };
    case NUMBER_WRITTEN:
      return {
        ...state,
        filters: [{
          ...state.filters[0],
          numericValues: { ...state.filters[0].numericValues, value: action.number },
        }],
      };
    default: return state;
  }
};

export default columnsReducer;
