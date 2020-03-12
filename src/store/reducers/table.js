import {
  FILTER_BY_NAME,
  CREATE_RESULTS,
  ADD_FILTERS,
  REMOVE_FILTER,
} from '../actions/table';

import { numFilters, removeFilters, switchFiltersNum } from '../../services/filters';

function filtersValues(filters) {
  const { comparison, column, value } = filters[filters.length - 1].numeric_values
    ? filters[filters.length - 1].numeric_values
    : { comparison: '', column: '', value: 0 };
  return [comparison, column, value];
}

function caseFilterByName(state, action) {
  const [, ...rest] = state.filters;
  const filters = [...action.filters, ...rest];
  const values = filtersValues(filters);
  return {
    ...state,
    resultsByName: switchFiltersNum(action.results, values[0], values[1], values[2], filters),
    filters,
  };
}

function caseRemoveFilter(state, action) {
  const filters = removeFilters(action.index, state.filters);
  const values = filtersValues(filters);
  const resultsByName = switchFiltersNum(
    action.results, values[0], values[1], values[2], filters,
  );
  return {
    ...state,
    resultsByName,
    filters,
  };
}

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
      return caseFilterByName(state, action);
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
      return caseRemoveFilter(state, action);
    }
    default:
      return state;
  }
};



export default table;
