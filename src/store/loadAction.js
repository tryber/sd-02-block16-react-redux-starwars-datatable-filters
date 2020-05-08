import * as types from './actionTypes';
import getEndPointSwAPI from '../service/SwAPI';

function apiSucess(results) {
  return {
    type: types.RESULT_TRUE,
    data: results,
    dataMock: results,
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
