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

const planetAction = (planet, data, results, dataMockOn) => (
  (dispatch) => {
    let inputFilter = data.results;
    if (dataMockOn) inputFilter = results;
    const filteredResult = inputFilter.map((result) => {
      const filter = (result.name.toUpperCase().includes(planet.toUpperCase()))
    ? result
    : [];
      return filter;
    });
    const filterWithoutUndefined = filteredResult.filter((element) => element.length !== 0);
    const planetCase = planet.charAt(0).toUpperCase() + planet.substring(1);
    return dispatch(filterData(filterWithoutUndefined, planetCase));
  }
);

export default planetAction;
