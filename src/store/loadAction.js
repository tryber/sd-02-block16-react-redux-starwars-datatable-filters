import * as types from './actionTypes';
import getEndPointSwAPI from '../service/SwAPI';

function apiSucess(infos) {
  return {
    type: types.RESULT_TRUE,
    data: infos,
    dataMock: infos,
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
          const sorted = infos.results.sort((a, b) => a.name < b.name ? -1 : 1);
          return dispatch(apiSucess(sorted));
        }),
        (error) => dispatch(apiFailure(error.message)),
      )
  )
);

export default resultAPI;
