import * as types from './actionTypes';

const addPlanets = (results) => {
  const planets = results;
  results.forEach((planet, index) => { delete planets[index].residents; });
  return ({ type: types.GET_PLANET, data: planets });
};

export default addPlanets;
