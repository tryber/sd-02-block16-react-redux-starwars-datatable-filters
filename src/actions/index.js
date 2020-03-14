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

export const searchByName = (text, results) => ({
  type: SEARCH_BY_NAME,
  text,
  results: results.some((planet) => planet.name.toLowerCase().includes(text))
    ? results.filter((planet) => planet.name.toLowerCase().includes(text))
    : [''],
});

// const filter = (column, comparison, number, results) => {
//   const biggerThan = results
//     .map((planet) => Object.entries(planet)
//       .filter(([key, value]) => (key === column && value > number ? value : false)));
//   const smallerThan = results
//     .filter((planet) => Object.entries(planet)
//       .filter(([key, value]) => (key === column && value < number ? value : false)));
//   const equalTo = results
//     .filter((planet) => Object.entries(planet)
//       .filter(([key, value]) => (key === column && value === number ? value : false)));
//   switch (comparison) {
//     case 'Maior que':
//       console.log(biggerThan);
//       return biggerThan;
//     case 'Menor que':
//       return smallerThan;
//     case 'Igual a':
//       return equalTo;
//     default: return results;
//   }
// };

// export const searchByNumber = (column, comparison, value, results) => ({
//   type: SEARCH_BY_NUMBER,
//   column,
//   comparison,
//   value,
//   results: filter(column, comparison, value, results),
// });

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
