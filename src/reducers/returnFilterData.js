import {
  FILTER_PLANETS_WITH_NAME,
  FILTER_PLANETS_WITH_NUMBER,
} from '../actions';

const INITIAL_STATE = {
  filters: [],
};

const filterName = (newFilter, prevState) => {
  const nextState = [prevState];
  nextState[0] = newFilter;
};

const returnFilterData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_PLANETS_WITH_NAME:
      filterName({ name: action.name }, state.filters);
      return {
        ...state,
        filters: [
          { name: action.name },
          ...state.filters,
        ],
        filteredData: action.filterData,
      };

    case FILTER_PLANETS_WITH_NUMBER:
      console.log(action.filterData);
      return '';
    default: return state;
  }
};

export default returnFilterData;
