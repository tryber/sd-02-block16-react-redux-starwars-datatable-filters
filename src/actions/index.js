import { fetchSWAPI } from '../services/SWAPI';

export const REQUEST_SWAPI_PLANETS = 'REQUEST_SWAPI_PLANETS';
export const RECEIVE_SWAPI_PLANETS_SUCCESS = 'RECEIVE_SWAPI_PLANETS_SUCCESS';
export const RECEIVE_SWAPI_PLANETS_FAILURE = 'RECEIVE_SWAPI_PLANETS_FAILURE';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const SEARCH_BY_NUMBER = 'SEARCH_BY_NUMBER';

const requestSWAPIPlanets = () => ({
  type: REQUEST_SWAPI_PLANETS,
});

const receiveSWAPIPlanetsFailure = (error) => ({
  type: RECEIVE_SWAPI_PLANETS_FAILURE,
  error,
});

const receiveSWAPIPlanetsSuccess = ({ results }) => ({
  type: RECEIVE_SWAPI_PLANETS_SUCCESS,
  results,
});

export function fetchSWAPIPlanets() {
  return (dispatch) => {
    dispatch(requestSWAPIPlanets());

    return fetchSWAPI()
      .then(
        (results) => dispatch(receiveSWAPIPlanetsSuccess(results)),
        (error) => dispatch(receiveSWAPIPlanetsFailure(error)),
      );
  };
}

export const searchByName = (text, results) => ({
  type: SEARCH_BY_NAME,
  text,
  results: results.filter((planet) => planet.name.toLowerCase().match(text)),
});

const biggerThan = (column, number, results) => {
  switch (column) {
    case 'population':
      return results.filter((planet) => parseInt(planet.population, 10) > number);
    case 'orbital_period':
      return results.filter((planet) => parseInt(planet.orbital_period, 10) > number);
    case 'diameter':
      return results.filter((planet) => parseInt(planet.diameter, 10) > number);
    case 'rotation_period':
      return results.filter((planet) => parseInt(planet.rotation_period, 10) > number);
    case 'surface_water':
      return results.filter((planet) => parseInt(planet.surface_water, 10) > number);
    default: return results;
  }
};

const smallerThan = (column, number, results) => {
  switch (column) {
    case 'population':
      return results.filter((planet) => parseInt(planet.population, 10) < number);
    case 'orbital_period':
      return results.filter((planet) => parseInt(planet.orbital_period, 10) < number);
    case 'diameter':
      return results.filter((planet) => parseInt(planet.diameter, 10) < number);
    case 'rotation_period':
      return results.filter((planet) => parseInt(planet.rotation_period, 10) < number);
    case 'surface_water':
      return results.filter((planet) => parseInt(planet.surface_water, 10) < number);
    default: return results;
  }
};

const equalTo = (column, number, results) => {
  switch (column) {
    case 'population':
      return results
        .filter((planet) => parseInt(planet.population, 10) === parseInt(number, 10));
    case 'orbital_period':
      return results
        .filter((planet) => parseInt(planet.orbital_period, 10) === parseInt(number, 10));
    case 'diameter':
      return results
        .filter((planet) => parseInt(planet.diameter, 10) === parseInt(number, 10));
    case 'rotation_period':
      return results
        .filter((planet) => parseInt(planet.rotation_period, 10) === parseInt(number, 10));
    case 'surface_water':
      return results
        .filter((planet) => parseInt(planet.surface_water, 10) === parseInt(number, 10));
    default: return results;
  }
};

const filterButton = (column, comparison, number, results) => {
  switch (comparison) {
    case 'Maior que':
      return biggerThan(column, number, results);
    case 'Menor que':
      return smallerThan(column, number, results);
    case 'Igual a':
      return equalTo(column, number, results);
    default: return results;
  }
};

export const searchByNumber = (column, comparison, value, results) => ({
  type: SEARCH_BY_NUMBER,
  column,
  comparison,
  value,
  results: filterButton(column, comparison, value, results),
});
