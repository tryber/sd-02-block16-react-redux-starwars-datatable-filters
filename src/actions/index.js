import { fetchSWAPI } from '../services/SWAPI';

export const REQUEST_SWAPI_PLANETS = 'REQUEST_SWAPI_PLANETS';
export const RECEIVE_SWAPI_PLANETS_SUCCESS = 'RECEIVE_SWAPI_PLANETS_SUCCESS';
export const RECEIVE_SWAPI_PLANETS_FAILURE = 'RECEIVE_SWAPI_PLANETS_FAILURE';

const requestSWAPIPlanets = () => ({
  type: REQUEST_SWAPI_PLANETS,
});

const receiveSWAPIPlanetsFailure = (error) => ({
  type: RECEIVE_SWAPI_PLANETS_FAILURE,
  error,
});

const receiveSWAPIPlanetsSuccess = ({ results }) => ({
  type: RECEIVE_SWAPI_PLANETS_SUCCESS,
  results,
});

export function fetchSWAPIPlanets() {
  return (dispatch) => {
    dispatch(requestSWAPIPlanets());

    return fetchSWAPI()
      .then(
        (results) => dispatch(receiveSWAPIPlanetsSuccess(results)),
        (error) => dispatch(receiveSWAPIPlanetsFailure(error)),
      );
  };
}
