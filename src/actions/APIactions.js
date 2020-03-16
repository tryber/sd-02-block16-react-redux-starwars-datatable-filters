import Request from '../components/Request';

export const REQUESTING_API = 'REQUESTING_API';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';

const requestSWAPI = () => ({
  type: REQUESTING_API,
});

const requestSWAPISuccess = ({ results }) => ({
  type: REQUEST_SUCCESS,
  results,
});

const requestSWAPIFailure = (error) => ({
  type: REQUEST_FAILURE,
  error,
});

export function fetchSwPlanets() {
  return (dispatch) => {
    dispatch(requestSWAPI());

    return getPlanets()
      .then(
        (planets) => dispatch(requestSWAPISuccess(planets));
        (error) => dispatch(requestSWAPIFailure(error));
      );
  };
}
