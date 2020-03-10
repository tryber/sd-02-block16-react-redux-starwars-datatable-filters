import getPlanets from '../services/SWAPI';

export const REQUEST_PLANETS = 'REQUEST_ISS_LOCATION';
export const RECEIVE_PLANETS_SUCCESS = 'RECEIVE_PLANETS_SUCCESS';
export const RECEIVE_PLANETS_FAILURE = 'RECEIVE_PLANETS_FAILURE';

const requestPlanets = () => ({
  type: REQUEST_PLANETS,
});

const receivePlanets = ({ results }) => ({
  type: RECEIVE_PLANETS_SUCCESS,
  planets: results,
});

const receivePlanetsFailure = (error) => ({
  type: RECEIVE_PLANETS_FAILURE,
  error,
});

export function fetchPlanets() {
  return (dispatch) => {
    dispatch(requestPlanets());
    return getPlanets()
      .then(
        (planets) => dispatch(receivePlanets(planets)),
        (error) => dispatch(receivePlanetsFailure(error.message)),
      );
  };
}
