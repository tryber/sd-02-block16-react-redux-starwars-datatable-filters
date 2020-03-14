import requestSWAPIdata from '../services/SWAPI';

export const REQUEST_SWAPI = 'REQUEST_SWAPI';
export const REQUEST_SWAPI_SUCCESS = 'REQUEST_SWAPI_SUCCESS';
export const REQUEST_SWAPI_FAILURE = 'REQUEST_SWAPI_FAILURE';
export const FILTER_PLANETS_WITH_NAME = 'FILTER_PLANETS_WITH_NAME';
export const FILTER_PLANETS_WITH_NUMBER = 'FILTER_PLANETS_WITH_NUMBER';
export const FILTER_PLANETS_WITH_NAME_AND_NUMBER = 'FILTER_PLANETS_WITH_NAME_AND_NUMBER';
export const SELECT_COLUMN_FILTER = 'SELECT_COLUMN_FILTER';
export const SELECT_COMPARISON_VALUE = 'SELECT_COMPARISON_VALUE';
export const SELECT_NUMBER_FILTER_VALUE = 'SELECT_NUMBER_FILTER_VALUE';

const filterFunction = (planetsData, userValue) => (
  planetsData.filter((planet) => (
    planet.name.toLowerCase().includes(userValue.toLowerCase())
  ))
);

const requestSwapi = () => ({
  type: REQUEST_SWAPI,
});

const requestSwapiSuccess = (data) => ({
  type: REQUEST_SWAPI_SUCCESS,
  data,
});

const requestSwapiFailure = (error) => ({
  type: REQUEST_SWAPI_FAILURE,
  error,
});

export const columnValue = (value) => ({
  type: SELECT_COLUMN_FILTER,
  column: value,
});

export const comparativeValue = (value) => ({
  type: SELECT_COMPARISON_VALUE,
  comparative: value,
});

export const numberValue = (value) => ({
  type: SELECT_NUMBER_FILTER_VALUE,
  numberFilter: value,
});

export const filterPlanetsWithName = (planetsData, userValue) => ({
  type: FILTER_PLANETS_WITH_NAME,
  name: userValue,
  filterData: filterFunction(planetsData, userValue),
});

const apiReturn = () => (
  (dispatch) => {
    dispatch(requestSwapi());
    return requestSWAPIdata().then(
      (values) => dispatch(requestSwapiSuccess(values)),
      (error) => dispatch(requestSwapiFailure(error)),
    );
  }
);

export default apiReturn;
