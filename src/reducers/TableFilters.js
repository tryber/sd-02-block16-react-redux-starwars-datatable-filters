import {
  FILTER_RESULTS,
} from '../actions/TableFilters';

const INITAL_FILTER_STATE = {
  filterResults: [],
  filters: {
    name: '',
  },
};

const tableFilters = (state = INITAL_FILTER_STATE, action) => {
  switch (action.type) {
    case FILTER_RESULTS:
      return {
        ...state,
        filterResults: action.filterResults,
      };
    default:
      return state;
  }
};

export default tableFilters;
