import * as types from './actionTypes';
import getEndPointSwAPI from '../service/SwAPI';

function firstResult() {
  return {
    type: types.FIRST_RESULT,
  };
}

function apiSucess(infos) {
  return {
    type: types.RESULT_TRUE,
    result: infos,
  };
}

function apiFailure(error) {
  return {
    type: types.RESULT_FALSE,
    error,
  };
}

export default function resultAPI() {
  return (dispatch) => {
    dispatch(firstResult());
    return getEndPointSwAPI()
      .then(
        (infos) => dispatch(apiSucess(infos)),
        (error) => dispatch(apiFailure(error.message)),
      );
  };
}
