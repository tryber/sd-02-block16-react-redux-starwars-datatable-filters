import getCurrentSWPlanets from '../services/SWAPI';

export const PLANETS_REQUESTING = 'PLANETS_REQUESTING';
export const PLANETS_REQUEST_SUCCESS = 'PLANETS_REQUEST_SUCCESS';
export const PLANETS_REQUEST_FAILURE = 'PLANETS_REQUEST_FAILURE';

const requestingSWPlanets = () => ({
  type: PLANETS_REQUESTING,
});

const requestSuccess = ({ results }) => ({
  type: PLANETS_REQUEST_SUCCESS,
  results,
});

const requestFailure = ({ error }) => ({
  type: PLANETS_REQUEST_FAILURE,
  error,
});

export function fetchSWPlanets() {
  return (dispatch) => {
    dispatch(requestingSWPlanets());

    return getCurrentSWPlanets()
      .then(
        (planets) => dispatch(requestSuccess(planets)),
        (error) => dispatch(requestFailure(error)),
      );
  };
}
