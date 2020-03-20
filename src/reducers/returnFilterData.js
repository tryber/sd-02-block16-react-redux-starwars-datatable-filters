import {
  FILTER_PLANETS_WITH_NAME,
  FILTER_PLANETS_WITH_NUMBER,
} from '../actions';

const INITIAL_STATE = {
  filters: [],
};

const filterName = (newFilter, prevState) => {
  const nextState = [prevState];
  console.log(nextState);
  nextState[0] = newFilter;
  console.log(nextState);
};

const returnFilterData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_PLANETS_WITH_NAME:
      filterName({ name: action.name }, state.filters);
      // console.log(state.filters);
      return {
        ...state,
        filters: [
          { name: action.name },
          ...state.filters,
        ],
        filteredData: action.filterData,
      };

    case FILTER_PLANETS_WITH_NUMBER:
      console.log(filterName());
      return {
        ...state,
        filters: [...state.filters, action.numericValuesObj],
      };

    default: return state;
  }
};

export default returnFilterData;
