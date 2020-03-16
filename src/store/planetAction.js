import * as types from '../store/actionTypes';

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
  return (dispatch) => {
    let { results } = data;
    const filteredData = results.filter((info) => info.name === planet);
    results = filteredData
    dispatch(filterData(results, planet));
  };
}

export default planetAction;
