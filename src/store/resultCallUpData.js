import * as types from './actionTypes';

function updateDataSort(results, name) {
  return {
    type: types.RESULT_TRUE_DATA,
    data: results,
  };
}

const resultCallUpData = (dataMock, dataMockFilter, name) => (
  (dispatch) => {
    return dispatch(updateDataSort(dataMock, name));
  }
);

export default resultCallUpData;