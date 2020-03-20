import { fetchPlanets } from '../services/fetchPlanets';

export const REQUEST_PLANETS_SWAPI = 'REQUEST_PLANETS_SWAPI';
export const RECEIVE_PLANETS_SWAPI_SUCCESS = 'RECEIVE_PLANETS_SWAPI_SUCCESS';
export const RECEIVE_PLANETS_SWAPI_FAILURE = 'RECEIVE_PLANETS_SWAPI_FAILURE';

const requestPlanetsSWAPI = () => ({
  type: REQUEST_PLANETS_SWAPI,
});

const receivePlanetsSWAPISuccess = ({ results }) => ({
  type: RECEIVE_PLANETS_SWAPI_SUCCESS,
  results,
});

const receivePlanetsSWAPIFailure = (error) => ({
  type: RECEIVE_PLANETS_SWAPI_FAILURE,
  error,
});

export function getPlanets() {
  return (dispatch) => {
    dispatch(requestPlanetsSWAPI());

    return fetchPlanets()
      .then(
        (results) => dispatch(receivePlanetsSWAPISuccess(results)),
        (error) => dispatch(receivePlanetsSWAPIFailure(error)),
      );
  };
}

export default getPlanets;
