import swAPI from '../services/swAPI';

export const GET_PLANETS = 'GET_PLANETS';
export const GET_PLANETS_SUCCESS = 'GET_PLANETS_SUCCESS';
export const GET_PLANETS_FAILURE = 'GET_PLANETS_FAILURE';

export const getPlanets = () => (
  { type: GET_PLANETS, loading: true }
);

export const getPlanetsSuccess = (data) => (
  { type: GET_PLANETS_SUCCESS, loading: false, data }
);

export const getPlanetsFailure = (error) => (
  { type: GET_PLANETS_FAILURE, loading: false, error }
);

export function thunkPlanets() {
  return (dispatch) => {
    dispatch(getPlanets());
    return swAPI()
      .then(
        (planet) => dispatch(getPlanetsSuccess(planet)),
        (error) => dispatch(getPlanetsFailure(error.message)),
      );
  };
}
