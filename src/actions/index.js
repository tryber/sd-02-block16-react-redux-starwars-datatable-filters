import requestSWAPIdata from '../services/SWAPI';

export const REQUEST_SWAPI = 'REQUEST_SWAPI';
export const REQUEST_SWAPI_SUCCESS = 'REQUEST_SWAPI_SUCCESS';
export const REQUEST_SWAPI_FAILURE = 'REQUEST_SWAPI_FAILURE';
export const FILTER_PLANETS_WITH_NAME = 'FILTER_PLANETS_WITH_NAME';
export const FILTER_PLANETS_WITH_NUMBER = 'FILTER_PLANETS_WITH_NUMBER';
export const REMOVE_NUMERIC_FILTER = 'REMOVE_NUMERIC_FILTER';

const filterFunction = (planetsData, userValue) => (
  planetsData.filter((planet) => (
    planet.name.toLowerCase().includes(userValue.toLowerCase())
  ))
);

const columnsSelect = [
  '-',
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const filterNumber = (column, comparison, value, planetsData) => {
  const readWithNumberValue = (planet) => planet[column];
  let filteredNumber = [];
  // Não é para acessar a store aqui. É pra enviar a coluna como parâmetro, rodar e retirar.
  // Inserir aqui a filtragem do nome e trazê-la para filteredNumber;
  // Utilizar o mapStateToProps para enviar informações do store;
  // Depois que pegar as informações da Store, iterar no store.filters;
  // o Array do Column deve permanecer na store, pois quando eu clicar no valor para fechar,
  // deve ser reinserido no select.
  switch (comparison) {
    case ('bigger_than'):
      filteredNumber = planetsData.filter((planet) => readWithNumberValue(planet) > value);
      return filteredNumber;
    case ('less_than'):
      filteredNumber = planetsData.filter((planet) => readWithNumberValue(planet) < value);
      return filteredNumber;
    case ('equal_to'):
      filteredNumber = planetsData.filter((planet) => readWithNumberValue(planet) === value);
      return filteredNumber;
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
    numObj: newFilter(column, comparison, value),
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
