import * as types from './actionTypes';

const orderPlanets = (key, data) => {
  const toBeSorted = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  let sorted = data;
  if (toBeSorted.includes(key)) {
    sorted = data.sort(function (a, b) {
      if (Number(a[key]) > Number(b[key])) {
        return 1;
      }
      if (Number(a[key]) < Number(b[key])) {
        return -1;
      }
      return 0;
    });
  } else {
    sorted = data.sort(function (a, b) {
      if ((a[key]) > (b[key])) {
        return 1;
      }
      if ((a[key]) < (b[key])) {
        return -1;
      }
      return 0;
    });
  }
  return ({ type: types.ORDER_KEY, sorted });
};

export default orderPlanets;
