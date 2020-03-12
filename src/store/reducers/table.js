import {
  FILTER_BY_NAME,
  CREATE_RESULTS,
  ADD_FILTERS,
  REMOVE_FILTER,
} from '../actions/table';

import { numFilters, removeFilters, switchFiltersNum } from '../../services/filters';

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
      const { comparison, column, value } = filters[filters.length - 1].numeric_values
        ? filters[filters.length - 1].numeric_values
        : { comparison: '', column: '', value: 0 };
      return {
        ...state,
        resultsByName: switchFiltersNum(action.results, comparison, column, value, filters),
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
    case REMOVE_FILTER: {
      const filters = removeFilters(action.index, state.filters);
      const { comparison, column, value } = filters[filters.length - 1].numeric_values
        ? filters[filters.length - 1].numeric_values
        : { comparison: '', column: '', value: 0 };
      const resultsByName = switchFiltersNum(
        action.results, comparison, column, value, filters,
      );
      return {
        ...state,
        resultsByName,
        filters,
      };
    }
    default:
      return state;
  }
};

export default table;
