import {
  REQUEST_SW_PLANETS,
  REQUEST_SW_PLANETS_SUCCESS,
  REQUEST_SW_PLANETS_FAILURE,
  ADD_FILTERS,
} from '../actions';

import numFilters from '../../services/filters';

const INITIAL_SW_PLANETS_STATE = {
  isFetching: true,
  results: [],
  error: '',
  filters: [],
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
    case ADD_FILTERS:
      return {
        ...state,
        filters: [...state.filters, action.filters[0]],
      };
    default:
      return state;
  }
};

export default data;
