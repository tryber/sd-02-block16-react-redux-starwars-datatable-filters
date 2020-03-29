import * as types from './actionTypes';
import verifyCondition from './switchCases/conditionCase';
import dispatchFilters from './dispatchFilters';
import store from '../store';

function allFiltersAction(results, column, condition, value) {
  return {
    type: types.RESULT_ALL_FILTERS,
    dataMock: {
      results,
    },
    dataMockFilter: {
      results,
    },
    dataMockFilterOn: true,
    numericValues: {
      column,
      condition,
      value,
    },
  };
}

function updateDataMock(results) {
  return {
    type: types.RESULT_FILTER_TYPE,
    dataMock: {
      results,
    },
    dataMockFilter: {
      results,
    },
  };
}

// function verifyFilterStore(result, filterStore) {
//   for (let i = 0; filterStore.length > i; i += 1) {
//     if (!verifyCondition(Number(result[filterStore[i].numericValues.column]),
//                              filterStore[i].numericValues.condition,
//                              Number(filterStore[i].numericValues.value))) {
//       return false;
//     }
//   }
// }

const dispatchAllFilters = (column, condition, value, data) => (
  (dispatch) => {
    const dataMock = dispatchFilters(column, condition, value, data);
    dispatch(updateDataMock(dataMock, column, condition, value));
    const filterStore = store.getState().loadReducer.filters.filter((element) =>
      !Object.keys(element).includes('name'));
    const mappedMock = dataMock.filter((result) => {
      let isValid = true;
      filterStore.forEach((filter) => {
        isValid = isValid && verifyCondition(Number(result[filter.numericValues.column]),
                                            filter.numericValues.condition,
                                            Number(filter.numericValues.value));
      });
      return isValid;
    });
    return (dispatch(allFiltersAction(mappedMock, column, condition, value)));
  });

export default dispatchAllFilters;
