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

const returnFilterData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_PLANETS_WITH_NAME:
      return {
        filters: [
          // ...state,
          {
            name: action.name,
          },
        ],
        filteredData: action.filterData,
      };
    case FILTER_PLANETS_WITH_NUMBER:
      console.log(action.numericValues);
      return {
        ...state,
        filters: [action.filters],
      };

    default: return state;
  }
};

export default returnFilterData;
