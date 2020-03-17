import * as types from '../store/actionTypes';

function filterData(results, planet) {
  return {
    type: types.RESULT_PLANET,
    dataMock: {
      results,
    },
    filters: [
      {
        name: planet,
      },
    ],
  };
}

const planetAction = (planet, data) => (
  (dispatch) => {
    const { results } = data;
    const filteredResult = results.map((result) =>
      (result.name.toUpperCase().includes(planet.toUpperCase()))
    ? result
    : []);
    const filterUndefined = filteredResult.filter((element) => element.length !== 0);
    const planetCase = planet.charAt(0).toUpperCase() + planet.substring(1);
    return dispatch(filterData(filterUndefined, planetCase));
  }
);

export default planetAction;
