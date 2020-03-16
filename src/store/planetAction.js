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

const planetAction = (planet, data) => {
  return async (dispatch) => {
    const { results } = data
    const returnedAPI = [await getEndPointSwAPI()];
    //if (!findPlanet) return alert('Esse planeta não existe');
    const filteredResult = returnedAPI[0].results.map((result) => result.name.toLowerCase().slice(1).includes(planet.toLowerCase().slice(1))
    ? result 
    : console.log('filteredResult'));
    const filterUndefined = filteredResult.filter((element) => element !== undefined);
      // (
      // result.name.toLowerCase().slice(1) === planet.toLowerCase().slice(1))
      // && (result !== 'residents'));
    const planetCase = planet.charAt(0).toUpperCase() + planet.substring(1);
    dispatch(filterData(filterUndefined, planetCase));
  };
}

export default planetAction;
