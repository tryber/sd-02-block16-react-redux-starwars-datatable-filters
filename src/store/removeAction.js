import * as types from '../store/actionTypes';
import verifyCondition from './switchCases/conditionCase';

function updateAllRender(results, numericValues) {
  return {
    type: types.RESULT_NUMERIC_VALUES,
    results,
    name: numericValues,
  };
}

const filtersRemove = (dataMock, filters) => (
  (dispatch) => {
    const mockMapped = dataMock.filter((result) => {
      let isValid = true;
      filters.forEach((filter) => {
        isValid = isValid && verifyCondition(Number(result[filter.numericValues.column]),
                                            filter.numericValues.condition,
                                            Number(filter.numericValues.value));
      });
      return isValid;
    });
    return (dispatch(updateAllRender(mockMapped, filters)));
  }
);


export default filtersRemove;
