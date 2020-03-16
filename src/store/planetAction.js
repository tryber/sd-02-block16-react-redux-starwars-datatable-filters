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
      },
    ],
  };
}

const planetAction = (planet) => (
  async (dispatch) => {
    const returnedAPI = [await getEndPointSwAPI()];
    const filteredResult = returnedAPI[0].results.map((result) => {
      return result.name.toLowerCase().slice(1).includes(planet.toLowerCase().slice(1))
    ? result
    : [] });
    const filterUndefined = filteredResult.filter((element) => element !== undefined);
    const planetCase = planet.charAt(0).toUpperCase() + planet.substring(1);
    return dispatch(filterData(filterUndefined, planetCase));
  }
)

export default planetAction;
