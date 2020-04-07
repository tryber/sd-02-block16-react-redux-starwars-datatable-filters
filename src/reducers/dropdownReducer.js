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

function returnState(state, string, param) {
  return {
    ...state,
    filters: [{
      ...state.filters[0],
      numericValues:
      {
        ...state.filters[0].numericValues,
        [string]: param,
      },
    }],
  };
}

const dropdownReducer = (state = initialFilter, action) => {
  const { column, comparison, value } = action;
  switch (action.type) {
    case FILTER_COLUMNS:
      return returnState(state, 'column', column);
    case FILTER_COMPARISON:
      return returnState(state, 'comparison', comparison);
    case FILTER_NUMBER:
      return returnState(state, 'value', value);
    default: return state;
  }
};

export default dropdownReducer;
