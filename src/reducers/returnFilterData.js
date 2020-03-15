import {
  FILTER_PLANETS_WITH_NAME,
  FILTER_PLANETS_WITH_NUMBER,
  SELECT_COLUMN_FILTER,
} from '../actions';

const INITIAL_STATE = {
  filters: [
    {
      name: '',
    },
    {
      numericValues: {
        column: '',
        comparison: '',
        value: '',
      },
    },
  ],
};

const returnFilterData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_PLANETS_WITH_NAME:
      console.log(state);
      return {
        filters: [
          {
            name: action.name,
          },
        ],
        filteredData: action.filterData,
      };
    case FILTER_PLANETS_WITH_NUMBER:
      return {
        ...state,
        filters: [action.filters],
      };

    case SELECT_COLUMN_FILTER:
      console.log([...state.filters]);
      return { ...state };

    default: return state;
  }
};

export default returnFilterData;
