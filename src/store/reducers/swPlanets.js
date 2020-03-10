import {
  REQUEST_SW_PLANETS,
  REQUEST_SW_PLANETS_SUCCESS,
  REQUEST_SW_PLANETS_FAILURE,
  OTHER_FILTERS,
} from '../actions';

import numFilters from '../../services/filters';

const INITIAL_SW_PLANETS_STATE = {
  isFetching: true,
  results: [],
  error: '',
  filters: [
    {
      name: '',
    },
    {
      numeric_values:
      {
        column: '',
        comparison: '',
        value: 0,
      },
    },
  ],
};

const data = (state = INITIAL_SW_PLANETS_STATE, action) => {
  switch (action.type) {
    case REQUEST_SW_PLANETS:
      return {
        ...state,
        isFetching: true,
      };
    case REQUEST_SW_PLANETS_SUCCESS:
      return {
        ...state,
        results: action.results,
        isFetching: false,
      };
    case REQUEST_SW_PLANETS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case OTHER_FILTERS: {
      const { column, comparison, value } = action.filters[0].numeric_values;
      return {
        ...state,
        filters: [{ name: action.filters[0].name }, { numeric_values: { column, comparison, value } }],
        results: numFilters(action.results, action.filters, column, comparison, value)
          || action.results,
      };
    }
    default:
      return state;
  }
};

export default data;
