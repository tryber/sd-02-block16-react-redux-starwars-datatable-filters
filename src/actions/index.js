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

export const filterPlanetsWithNumber = (buttonTag) => {
  const userInputName = buttonTag.previousElementSibling;
  const comparison = userInputName.previousElementSibling;
  const tableColumn = comparison.previousElementSibling;
  return ({
    type: FILTER_PLANETS_WITH_NUMBER,
    numericValues: {
      column: tableColumn.value,
      comparison: comparison.value,
      value: userInputName.value,
    },
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
