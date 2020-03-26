import {
  FILTER_PLANETS_WITH_NAME,
  FILTER_PLANETS_WITH_NUMBER,
} from '../actions';

const columns = [
  '-',
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const INITIAL_STATE = {
  filters: [],
  columnsSelect: columns,
};

const returnFilterData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_PLANETS_WITH_NAME:
      return {
        ...state,
        filters: [
          ...state.filters,
          { name: action.name },
        ],
        filteredData: action.filterData,
      };

    case FILTER_PLANETS_WITH_NUMBER:
      console.log(state.filters);
      return {
        filters: [
          ...state.filters,
          { numericValues: action.numObj.numericValues },
        ],
        filteredData: action.filterData,
      };
    default: return state;
  }
};

export default returnFilterData;
