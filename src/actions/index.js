import { planetsData } from '../swapiFetch';

export const RECEIVE_PLANETS_SUCCESS = 'RECEIVE_PLANETS_SUCCESS';
export const RECEIVE_PLANETS_FAILURE = 'RECEIVE_PLANETS_FAILURE';
export const REQUEST_PLANETS = 'REQUEST_PLANETS';
export const FILTER_PLANET_NAME = 'FILTER_PLANET_NAME';
export const ADD_FILTERS = 'ADD_FILTERS';
export const REMOVE_FILTERS = 'REMOVE_FILTERS';
export const SORT_COLUMN = 'SORT_COLUMN';

export const sortColumn = (value) => ({
  type: SORT_COLUMN,
  value,
});

export const removeFilters = (value) => ({
  type: REMOVE_FILTERS,
  value,
});

export const addFilters = (value) => ({
  type: ADD_FILTERS,
  value,
});

export const planetFilterName = (value) => ({
  type: FILTER_PLANET_NAME,
  value,
});

const requestPlanets = () => ({
  type: REQUEST_PLANETS,
});

const receivePlanetsSuccess = ({ results }) => ({
  type: RECEIVE_PLANETS_SUCCESS,
  data: results,
});

const receivePlanetsFailure = (error) => ({
  type: RECEIVE_PLANETS_FAILURE,
  error,
});

export function fetchPlanets() {
  return (dispatch) => {
    dispatch(requestPlanets());
    return planetsData()
      .then(
        (data) => dispatch(receivePlanetsSuccess(data)),
        (error) => dispatch(receivePlanetsFailure(error.message)),
      );
  };
}
