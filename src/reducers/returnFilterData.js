import {
  FILTER_PLANETS_WITH_NAME,
  FILTER_PLANETS_WITH_NUMBER,
} from '../actions';

const returnFilterData = (state = [], action) => {
  console.log([action]);
  switch (action.type) {
    case FILTER_PLANETS_WITH_NAME:
      console.log(state);
      return {
        ...state,
        filters: [
          {
            name: action.name,
          },
          {
            numericValues: {
              column: '',
              comparison: '',
              value: '',
            },
          },
        ],
        filteredData: action.filterData,
      };
    case FILTER_PLANETS_WITH_NUMBER:
      return {
        ...state,
        filters: [action.filters],
      };
    default: return state;
  }
};

export default returnFilterData;
