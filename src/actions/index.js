import { infoAPI } from '../services/swAPI';

export const REQUEST_SW_DATA = 'REQUEST_SW_DATA';
export const RECEIVE_SW_DATA_SUCCESS = 'RECEIVE_SW_DATA_SUCCESS';
export const RECEIVE_SW_DATA_FAILURE = 'RECEIVE_SW_DATA_FAILURE';

const requestSWData = () => ({
  type: REQUEST_SW_DATA,
});

const receiveSWDataSuccess = (results) => (
  {
    type: results.RECEIVE_SW_DATA_SUCCESS,
    name: results.name,
    rotation_period: results.parseFloat(rotation_period),
    orbital_period: results.parseFloat(orbital_period),
    diameter: results.parseFloat(diameter),
    climate: results.climate,
    gravity: results.gravity,
    terrain: results.terrain,
    surface_water: results.parseFloat(surface_water),
    population: results.parseFloat(population),
    films: results.films,
    created: results.created,
    edited: results.edited,
    url: results.url,
  });

const receiveSWDataFailure = (error) => ({
  type: RECEIVE_SW_DATA_FAILURE,
  error,
});

export function fetchSWAPI() {
  return (dispatch) => {
    dispatch(requestSWData());
    return infoAPI()
      .then(
        (planet) => dispatch(receiveSWDataSuccess(planet)),
        (error) => dispatch(receiveSWDataFailure(error.message)),
      );
  };
}
