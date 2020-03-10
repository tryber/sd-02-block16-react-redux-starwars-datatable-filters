export const numFilters = (results, column, comparison, value) => {
  if (column && comparison && value) {
    switch (comparison) {
      case 'maior que':
        return results.filter((planet) => planet[column] > parseInt(value, 10));
      case 'menor que':
        return results.filter((planet) => planet[column] < parseInt(value, 10));
      case 'igual a':
        console.log(results.filter((planet) => planet[column] === value));
        return results.filter((planet) => planet[column] === value);
      default:
        return results;
    }
  }
  return results;
};

export const nameFilters = (results, filters) => (
  results.filter((planet) => planet.name.match(filters[0].name))
);
