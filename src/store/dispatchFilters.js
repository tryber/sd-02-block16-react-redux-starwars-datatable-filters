import * as types from './actionTypes';
import verifyCondition from './switchCases/conditionCase';

function updateFilters(column, condition, value, results) {
  return {
    type: types.RESULT_FILTER_TYPE,    
    dataMock: {
      results,
    },
    numericValues: {
      column,
      condition,
      value,
    }
  };
}

const dispatchFilters = (column, condition, value, dataMock) => (
  (dispatch) => {
    const { results } = dataMock;
    const mappedMock = results.map((result) => {
      const filtered = (Object.keys(result).includes(column))
      && (verifyCondition(Number(result[column]), condition, Number(value)))
      ? result
      : undefined;
      return filtered;
    });
    const filteredWithoutUndefined = mappedMock.filter((element) => element !== undefined);
    return dispatch(updateFilters(column, condition, value, filteredWithoutUndefined));
  }
);

export default dispatchFilters;
