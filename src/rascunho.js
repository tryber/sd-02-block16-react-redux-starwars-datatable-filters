const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

const removeColumn = (arr, column) => {
  arr.splice(arr.indexOf(column), 1);
  return arr;
};

console.log(removeColumn(columns, 'diameter'));
