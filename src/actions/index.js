import callFetchPlanets from '../services/swAPI';

export const REQUEST_PLANETS = 'REQUEST_PLANETS';
export const REQUEST_PLANETS_SUCCESS = 'REQUEST_PLANETS_SUCCESS';
export const REQUEST_PLANETS_FAILURE = 'REQUEST_PLANETS_FAILURE';
export const NAME_FILTER = 'NAME_FILTER';
export const COLUMN_FILTER = 'COLUMN_FILTER';
export const COMPARISON_FILTER = 'COMPARISON_FILTER';
export const VALUE_FILTER = 'VALUE_FILTER';
export const CHANGE_FILTER = 'CHANGE_FILTER';

const requestPlanets = () => ({
  type: REQUEST_PLANETS,
});

const requestPlanetsSuccess = ({ results }) => ({
  type: REQUEST_PLANETS_SUCCESS,
  swAPIInfo: results,
  filtered: results,
});

const requestPlanetsFailure = (error) => ({
  type: REQUEST_PLANETS_FAILURE,
  error,
});

const nameFilter = (filName) => ({
  type: NAME_FILTER,
  filName,
});

const columnFilter = (column, selector) => ({
  type: COLUMN_FILTER,
  column,
  selector,
});

const comparisonFilter = (comparison, selector) => ({
  type: COMPARISON_FILTER,
  comparison,
  selector,
});

const valueFilter = (value, selector) => ({
  type: VALUE_FILTER,
  value,
  selector,
});

const changeFilter = (array) => ({
  type: CHANGE_FILTER,
  array,
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

export function columnToFilter(column, selector) {
  return (dispatch) => {
    dispatch(columnFilter(column, selector));
  };
}

export function comparisonToFilter(comparison, selector) {
  return (dispatch) => {
    dispatch(comparisonFilter(comparison, selector));
  };
}

export function valueToFilter(value, selector) {
  return (dispatch) => {
    dispatch(valueFilter(value, selector));
  };
}

export function changeToFilter(array) {
  return (dispatch) => {
    dispatch(changeFilter(array));
  };
}
