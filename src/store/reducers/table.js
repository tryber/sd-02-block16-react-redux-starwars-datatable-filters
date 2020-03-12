import {
  FILTER_BY_NAME,
  CREATE_RESULTS,
  ADD_FILTERS,
} from '../actions/table';

import numFilters from '../../services/filters';

const INITIAL_SW_PLANETS_STATE = {
  resultsByName: [],
  filters: [
    {
      name: '',
    },
  ],
};

const table = (state = INITIAL_SW_PLANETS_STATE, action) => {
  switch (action.type) {
    case CREATE_RESULTS:
      return {
        ...state,
        resultsByName: action.results,
      };
    case FILTER_BY_NAME: {
      const [, ...rest] = state.filters;
      const filters = [...action.filters, ...rest];
      return {
        ...state,
        resultsByName: numFilters(action.results, filters, state.resultsByName),
        filters,
      };
    }
    case ADD_FILTERS: {
      const filters = [...state.filters, ...action.filters];
      return {
        ...state,
        resultsByName: numFilters(action.results, filters, action.resultsByName),
        filters,
      };
    }
    default:
      return state;
  }
};

export default table;
