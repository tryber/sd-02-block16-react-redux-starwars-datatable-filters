const initialstate = {
  filters: [
    {
      numericValues: {
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      },
    },
    {
      numericValues: {
        column: 'diameter',
        comparison: 'menor que',
        value: '8000',
      },
    },
  ],
};

const addNumValues = (arr) => {
  const newValues = {
    numericValues: {
      column: 'population',
      comparison: 'maior que',
      value: '100000',
    },
  };
  arr.push(newValues);
  return arr;
};

const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

const removeColumn = (arr, column) => {
  arr.splice(arr.indexOf(column), 1);
  return arr;
};

console.log(removeColumn(columns, 'diameter'));
