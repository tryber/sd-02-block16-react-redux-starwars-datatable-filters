import fetchPlanetFromServices from '../services/swAPI';

export const GET_SW_PLANETS_ACTION = 'GET_SW_PLANETS_ACTION';
export const GET_SW_PLANETS_SUCCESS = 'GET_SW_PLANETS_SUCCESS';
export const GET_SW_PLANETS_FAILURE = 'GET_SW_PLANETS_FAILURE';

export const getSWPlanetsAction = () => (
  { type: GET_SW_PLANETS_ACTION, loading: true }
);
export const getSWPlanetsSuccess = (data) => (
  { type: GET_SW_PLANETS_SUCCESS, data: data.results }
);
export const getSWPlanetsFailure = (error) => (
  { type: GET_SW_PLANETS_FAILURE, error }
);

export function thunkPlanets() {
  return (dispatch) => {
    dispatch(getSWPlanetsAction());
    return fetchPlanetFromServices()
      .then(
        (planet) => dispatch(getSWPlanetsSuccess(planet)),
        (error) => dispatch(getSWPlanetsFailure(error.message)),
      );
  };
}
