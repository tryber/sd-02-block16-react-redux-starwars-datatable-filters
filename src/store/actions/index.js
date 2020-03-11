import callFetchPlanets from '../../services/swAPI';

export const REQUEST_PLANETS = 'REQUEST_PLANETS';
export const REQUEST_PLANETS_SUCCESS = 'REQUEST_PLANETS_SUCCESS';
export const REQUEST_PLANETS_FAILURE = 'REQUEST_PLANETS_FAILURE';

const requestPlanets = () => ({
  type: REQUEST_PLANETS,
});

const requestPlanetsSuccess = ({ results }) => ({
  type: REQUEST_PLANETS_SUCCESS,
  swAPIInfo: results,
});
const requestPlanetsFailure = (error) => ({
  type: REQUEST_PLANETS_FAILURE,
  error,
});

export function fetchPlanets() {
  return (dispatch) => {
    dispatch(requestPlanets());
    return callFetchPlanets()
      .then(
        (data) => dispatch(requestPlanetsSuccess(data)),
        (error) => dispatch(requestPlanetsFailure(error.message)),
      );
  };
}
