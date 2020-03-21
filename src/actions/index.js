import requestSWAPIdata from '../services/SWAPI';

export const REQUEST_SWAPI = 'REQUEST_SWAPI';
export const REQUEST_SWAPI_SUCCESS = 'REQUEST_SWAPI_SUCCESS';
export const REQUEST_SWAPI_FAILURE = 'REQUEST_SWAPI_FAILURE';
export const FILTER_PLANETS_WITH_NAME = 'FILTER_PLANETS_WITH_NAME';
export const FILTER_PLANETS_WITH_NUMBER = 'FILTER_PLANETS_WITH_NUMBER';

const filterFunction = (planetsData, userValue) => (
  planetsData.filter((planet) => (
    planet.name.toLowerCase().includes(userValue.toLowerCase())
  ))
);

const filterNumber = (column, comparison, value, planetsData) => {
  const readWithNumberValue = (planet) => planet[column];
  let filtered = [];
  // inserir aqui a filtragem do nome e trazê-la para filtered;
  switch (comparison) {
    case ('bigger_than'):
      filtered = planetsData.filter((planet) => readWithNumberValue(planet) > value);
      return filtered;
    case ('less_than'):
      filtered = planetsData.filter((planet) => readWithNumberValue(planet) < value);
      return filtered;
    case ('equal_to'):
      filtered = planetsData.filter((planet) => readWithNumberValue(planet) === value);
      return filtered;
    default: return planetsData;
  }
};

const newFilter = (column, comparison, value) => ({
  numericValues: {
    column,
    comparison,
    value,
  },
});

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

export const filterPlanetsWithNumber = (column, comparison, value, planetsData) => {
  console.log(column, comparison, value);
  return ({
    type: FILTER_PLANETS_WITH_NUMBER,
    numericValuesObj: newFilter(column, comparison, value),
    filterData: filterNumber(column, comparison, value, planetsData),
  });
  // Aqui limparia as seleções e o input.
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
