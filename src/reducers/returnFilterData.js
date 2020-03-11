import { FILTER_PLANETS_WITH_NAME } from '../actions';

const returnFilterData = (state = [], action) => {
  switch (action.type) {
    case FILTER_PLANETS_WITH_NAME:
      return {
        filteredData: action.filterData,
      };
    default: return state;
  }
};

export default returnFilterData;
