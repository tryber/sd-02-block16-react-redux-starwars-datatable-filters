import { FILTER_COLUMNS, FILTER_COMPARISON, FILTER_NUMBER, GENERATE_FILTER } from '../actions/dropdownActions';

const initialFilter = {
  filters: [{
    numericValues: {
      column: '',
      comparison: '',
      value: '',
    },
  },
  ],
  columns: ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
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
  console.log(state);
  switch (action.type) {
    case FILTER_COLUMNS:
      return returnState(state, 'column', column);
    case FILTER_COMPARISON:
      return returnState(state, 'comparison', comparison);
    case FILTER_NUMBER:
      return returnState(state, 'value', value);
    case GENERATE_FILTER:
      return {
        ...state,
        filters: [
          ...state.filters,
          state.filters.push(action.newNumericValues),
        ],
        columns: state.columns.filter((criteria) => criteria !== action.newNumericValues.column),
      };
    default: return state;
  }
};

export default dropdownReducer;
