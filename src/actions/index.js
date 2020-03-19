import callFetchPlanets from '../services/swAPI';

export const REQUEST_PLANETS = 'REQUEST_PLANETS';
export const REQUEST_PLANETS_SUCCESS = 'REQUEST_PLANETS_SUCCESS';
export const REQUEST_PLANETS_FAILURE = 'REQUEST_PLANETS_FAILURE';
export const NAME_FILTER = 'NAME_FILTER';
export const NUMBER_FILTER = 'NUMBER_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';

export const requestPlanets = () => ({
  type: REQUEST_PLANETS,
});

export const requestPlanetsSuccess = ({ results }) => ({
  type: REQUEST_PLANETS_SUCCESS,
  swAPIInfo: results,
  filtered: results,
});

export const requestPlanetsFailure = (error) => ({
  type: REQUEST_PLANETS_FAILURE,
  error,
});

export const nameFilter = (filName) => ({
  type: NAME_FILTER,
  filName,
});

export const numberFilter = (column, comparison, value) => ({
  type: NUMBER_FILTER,
  numericValues: { column, comparison, value },
  column,
});

export const removeFilter = (column) => ({
  type: REMOVE_FILTER,
  column,
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
