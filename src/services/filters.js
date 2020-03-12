const filterByName = (name, results) => (
  results.filter((planet) => planet.name.toLowerCase().match(name))
);

const switchFilters = (results, comparison, resultsByName, column, value, filters) => {
  console.log(!filters[0].name);
  const filterByColumn = !filters[0].name
    ? results
    : filterByName(filters[0].name, resultsByName);
  switch (comparison) {
    case 'maior que':
      return filterByColumn.filter((planet) => planet[column] > parseInt(value, 10));
    case 'menor que':
      return filterByColumn.filter((planet) => planet[column] < parseInt(value, 10));
    case 'igual a':
      return filterByColumn.filter((planet) => planet[column] === value);
    default:
      return filterByColumn;
  }
};


const numFilters = (results, filters, resultsByName) => {
  const { column, comparison, value } = filters[filters.length - 1].numeric_values
    || { column: '', comparison: '', value: 0 };
  if (column && comparison && value) {
    return switchFilters(results, comparison, resultsByName, column, value, filters);
  }
  return filterByName(filters[0].name, results);
};

export default numFilters;
