import callFetchPlanets from '../../services/swAPI';

export const REQUEST_PLANETS = 'REQUEST_PLANETS';
export const REQUEST_PLANETS_SUCCESS = 'REQUEST_PLANETS_SUCCESS';
export const REQUEST_PLANETS_FAILURE = 'REQUEST_PLANETS_FAILURE';
export const NAME_FILTER = 'NAME_FILTER';
export const COLUMNS_FILTER = 'COLUMNS_FILTER';

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

const nameFilter = (filName) => ({
  type: NAME_FILTER,
  filName,
});

const columnFilter = (column) => ({
  type: COLUMNS_FILTER,
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

export function nameToFilter(filName) {
  return (dispatch) => {
    dispatch(nameFilter(filName));
  };
}

export function columnToFilter(column) {
  return (dispatch) => {
    dispatch(columnFilter(column));
  };
}
