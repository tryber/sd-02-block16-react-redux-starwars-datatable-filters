import * as types from './actionTypes';
import getEndPointSwAPI from '../service/SwAPI';

function apiSucess(infos) {
  return {
    type: types.RESULT_TRUE,
    data: infos,
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
        (infos) => dispatch(apiSucess(infos)),
        (error) => dispatch(apiFailure(error.message)),
      )
  )
);

export default resultAPI;
