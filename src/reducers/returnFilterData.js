import {
  FILTER_PLANETS_WITH_NAME,
  FILTER_PLANETS_WITH_NUMBER,
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

// const INITIAL_STATE = [];
const testArray = [];

const returnFilterData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_PLANETS_WITH_NAME:
      return {
        ...state,
        filteredData: action.filterData,
      };
    case FILTER_PLANETS_WITH_NUMBER:
      console.log(action.numericValuesObj);
      testArray.push(action.numericValuesObj);
      console.log(testArray);
      return {
        ...state,
      };
    default: return state;
  }
};

export default returnFilterData;
