import {
  FILTER_COLUMNS,
  COMPARISON_PARAM_EQUAL,
  NUMBER_WRITTEN,
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
  console.log('***columnsReducer actions:', action);
  switch (action.type) {
    case FILTER_COLUMNS:
      return {
        ...state,
        filters: [{ numericValues: { column: action.column } }],
      };
    // case COMPARISON_PARAM_GREATER:
    //   return {
    //     ...state,
    //     filters: [{ numericValues: { comparison: action.comparison } }],
    //   };
    // case COMPARISON_PARAM_LOWER:
    //   return {
    //     ...state,
    //     filters: [{ numericValues: { comparison: action.comparison } }],
    //   };
    case COMPARISON_PARAM_EQUAL:
      return {
        ...state,
        filters: [{ numericValues: { comparison: action.comparison } }],
      };
    case NUMBER_WRITTEN:
      return {
        ...state,
        filters: [{ numericValues: { value: action.number } }],
      };
    default: return state;
  }
};

export default columnsReducer;
