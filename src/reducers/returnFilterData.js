import {
  FILTER_PLANETS_WITH_NAME,
  FILTER_PLANETS_WITH_NUMBER,
} from '../actions';

const INITIAL_STATE = {
  filters: [],
};

const returnFilterData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_PLANETS_WITH_NAME:
      return {
        ...state,
        filters: [
          { name: action.name },
          ...state.filters,
        ],
        filteredData: action.filterData,
      };

    case FILTER_PLANETS_WITH_NUMBER:
      return {
        filteredData: action.filterData,
      };
    default: return state;
  }
};

export default returnFilterData;
