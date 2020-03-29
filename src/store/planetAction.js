import * as types from '../store/actionTypes';

function filterData(results, planet) {
  return {
    type: types.RESULT_PLANET,
    dataMock: {
      results,
    },
    dataMockFilter: {
      results,
    },
    planet,
  };
}

function dataWithFilter(results, planet) {
  return {
    type: types.RESULT_DATA_FILTERED,
    dataMockFilter: {
      results,
    },
    name: {
      name: planet,
    }
  };
}

function filterResults(whosFilter, planet) {
  const filteredResult = whosFilter.map((result) => {
    const filter = (result.name.toUpperCase().includes(planet.toUpperCase()))
  ? result
  : [];
    return filter;
  });
  return filteredResult;
}

const planetAction = (planet, dataMock, dataMockFilterOn, data) => (
  (dispatch) => {
    let whosFilter = data.results;
    if (dataMockFilterOn) {
      whosFilter = dataMock.results;
    }
    const filteredResult = filterResults(whosFilter, planet);
    const filterWithoutUndefined = filteredResult.filter((element) => element.length !== 0);
    const planetCase = planet.charAt(0).toUpperCase() + planet.substring(1);
    if (dataMockFilterOn) {
      return dispatch(dataWithFilter(filterWithoutUndefined, planetCase));
    }
    return dispatch(filterData(filterWithoutUndefined, planetCase));
  }
);

export default planetAction;
