import * as types from './actionTypes';

const orderASC = (toBeSorted, column, data) => {
  let sorted = data;
  if (toBeSorted.includes(column)) {
    sorted = data.sort(function (a, b) {
      if (Number(a[column]) > Number(b[column])) {
        return 1;
      }
      if (Number(a[column]) < Number(b[column])) {
        return -1;
      }
      return 0;
    });
  } else {
    sorted = data.sort(function (a, b) {
      if ((a[column]) > (b[column])) {
        return 1;
      }
      if ((a[column]) < (b[column])) {
        return -1;
      }
      return 0;
    });
  }
  return sorted;
};

const orderDESC = (toBeSorted, column, data) => {
  let sorted = data;
  if (toBeSorted.includes(column)) {
    sorted = data.sort(function (a, b) {
      if (Number(a[column]) < Number(b[column])) {
        return 1;
      }
      if (Number(a[column]) > Number(b[column])) {
        return -1;
      }
      return 0;
    });
  } else {
    sorted = data.sort(function (a, b) {
      if ((a[column]) < (b[column])) {
        return 1;
      }
      if ((a[column]) > (b[column])) {
        return -1;
      }
      return 0;
    });
  }
  return sorted;
};

const orderPlanets = (column, order, data) => {
  const toBeSorted = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const ascOrDesc = (order === 'ASC')
    ? orderASC(toBeSorted, column, data)
    : orderDESC(toBeSorted, column, data);
  return ({ type: types.ORDER_KEY, sorted: ascOrDesc });
};

export default orderPlanets;
