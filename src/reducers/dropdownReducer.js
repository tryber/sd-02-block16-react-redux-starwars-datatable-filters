import { FILTER_COLUMNS, FILTER_COMPARISON, FILTER_NUMBER } from '../actions/dropdownActions';

const initialFilter = {
  filters: [{
    numericValues: {
      column: '',
      comparison: '',
      value: '',
    },
  },
  ],
};

const dropdownReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case FILTER_COLUMNS:
      return {
        ...state,
        filters: [{
          ...state.filters[0],
          numericValues:
          {
            ...state.filters[0].numericValues,
            column: action.column,
          },
        }],
      };
    case FILTER_COMPARISON:
      return {
        ...state,
        filters: [{
          ...state.filters[0],
          numericValues:
          {
            ...state.filters[0].numericValues,
            comparison: action.comparison,
          },
        }],
      };
    case FILTER_NUMBER:
      return {
        ...state,
        filters: [{
          ...state.filters[0],
          numericValues:
          {
            ...state.filters[0].numericValues,
            value: action.value,
          },
        }],
      };
    default: return state;
  }
};

export default dropdownReducer;
