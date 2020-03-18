import {
  FILTER_PLANETS_WITH_NAME,
  FILTER_PLANETS_WITH_NUMBER,
} from '../actions';

// const INITIAL_STATE = {
//   filters: [
//     {
//       name: '',
//     },
//     {
//       numericValues: {
//         column: '',
//         comparison: '',
//         value: '',
//       },
//     },
//   ],
// };

const INITIAL_STATE = [];

const returnArray = [];

const returnFilterData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_PLANETS_WITH_NAME:
      return {
        filteredData: action.filterData,
      };
    case FILTER_PLANETS_WITH_NUMBER:
      returnArray.push(action.numericValues);
      return {
        ...state,
        filters: console.log(action.numericValues),
        teste: console.log(returnArray),
      };
    default: return state;
  }
};

export default returnFilterData;
