import * as types from '../store/actionTypes';
import getEndPointSwAPI from '../service/SwAPI';

function filterData(results, planet) {
  return {
    type: types.RESULT_PLANET,
    data: {
      results,
    },
    filters: [
      {
        name: planet,
      }
    ],
  };
}

const planetAction = (planet) => {
  return async (dispatch) => {
    if (planet.length === 0) return alert('Insira um planeta válido');
    const returnedAPI = [await getEndPointSwAPI()];
    const findPlanet = returnedAPI[0].results.find((element) =>
      element.name.toLowerCase() === planet.toLowerCase());
    if (!findPlanet) return alert('Esse planeta não existe');
    const filteredResult = returnedAPI[0].results.filter((result) => (
      result.name.toLowerCase().slice(1) === planet.toLowerCase().slice(1))
      && (delete result.residents));
    const planetCase = planet.charAt(0).toUpperCase() + planet.substring(1);
    dispatch(filterData(filteredResult, planetCase));
  };
}

export default planetAction;
