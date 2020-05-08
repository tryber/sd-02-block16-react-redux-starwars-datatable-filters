import * as types from './actionTypes';

function updateDataSort(results, name) {
  const teste = [...results];
  teste.sort((a, b) => {
    console.log(a)
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return {
    type: types.RESULT_TRUE_DATA,
    data: teste,
  };
}

const resultCallUpData = (dataMock, dataMockFilter, name) => (
  (dispatch) => {
    return dispatch(updateDataSort(dataMock, name));
  }
);

export default resultCallUpData;