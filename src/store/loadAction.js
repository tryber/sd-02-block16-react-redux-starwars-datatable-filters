import * as types from './actionTypes';
import getEndPointSwAPI from '../service/SwAPI';

function apiSucess(results) {
  const teste = [...results];
  teste.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return {
    type: types.RESULT_TRUE,
    data: results,
    dataMock: teste,
  };
}

function apiFailure(error) {
  return {
    type: types.RESULT_FALSE,
    error,
  };
}

const resultAPI = () => (
  (dispatch) => (
    getEndPointSwAPI()
      .then(
        (infos) => dispatch(() => {
          dispatch({ type: types.SET_INITIAL_ORDER });
          return dispatch(apiSucess(infos.results));
        }),
        (error) => dispatch(apiFailure(error.message)),
      )
  )
);

export default resultAPI;
