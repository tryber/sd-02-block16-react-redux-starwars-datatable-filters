import requestSWAPIdata from '../services/SWAPI';

export const REQUEST_SWAPI = 'REQUEST_SWAPI';
export const REQUEST_SWAPI_SUCCESS = 'REQUEST_SWAPI_SUCCESS';
export const REQUEST_SWAPI_FAILURE = 'REQUEST_SWAPI_FAILURE';
export const FILTER_PLANETS_WITH_NAME = 'FILTER_PLANETS_WITH_NAME';
export const FILTER_NUMBERS = 'FILTER_PLANETS';
export const REMOVE_NUMERIC_FILTER = 'REMOVE_NUMERIC_FILTER';

const filterFunction = (planetsData, userValue) => (
  planetsData.filter((planet) => (
    planet.name.toLowerCase().includes(userValue.toLowerCase())
  )));


const returnIndex = (column, columns) => {
  const arrayColumns = [...columns];
  return arrayColumns.indexOf(column);
};

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

export const filterPlanetsWithName = (planetsData, userValue) => ({
  type: FILTER_PLANETS_WITH_NAME,
  name: userValue,
  filterData: filterFunction(planetsData, userValue),
});

export const filterNumbers = (column, comparison, value, columns) => ({
  type: FILTER_NUMBERS,
  filter: { column, comparison, value },
  column,
  columns,
  index: returnIndex(column, columns),
});

export const eraseNumberFilter = (filter, numericValues) => {
  const prevFilter = [...numericValues];
  const indexFilter = prevFilter.indexOf(filter);
  const returnColumn = filter.column;
  return {
    type: REMOVE_NUMERIC_FILTER,
    index: indexFilter,
    column: returnColumn,
    filters: numericValues,
  };
};

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
