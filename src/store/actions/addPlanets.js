import * as types from './actionTypes';

const addPlanets = (results) => {
  const planets = results.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  results.forEach((planet, index) => { delete planets[index].residents; });
  return ({ type: types.GET_PLANET, data: planets });
};

export default addPlanets;
