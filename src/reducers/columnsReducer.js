import {
  FILTER_COLUMNS,
  COMPARISON_PARAM_EQUAL,
  NUMBER_WRITTEN,
  DELETE_COLUMNS,
  DELETE_COMPARISON,
  DELETE_NUMBER,
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

export const columnsReducer = (state = initialTextState, action) => {
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

export const deleteReducer = (state = null, action) => {
  switch (action.type) {
    case DELETE_COLUMNS:
      return {
        filters: [{
          ...state.filters[0],
          numericValues: { column: action.column },
        }],
      };
    case DELETE_COMPARISON:
      return {
        ...state,
        filters: [{
          ...state.filters[0],
          numericValues: { comparison: action.comparison },
        }],
      };
    case DELETE_NUMBER:
      return {
        ...state,
        filters: [{
          ...state.filters[0],
          numericValues: { value: action.number },
        }],
      };
    default: return state;
  }
};
