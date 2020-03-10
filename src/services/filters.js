const switchFilters = (comparison, filterPlanets, column, value) => {
  switch (comparison) {
    case 'maior que':
      return filterPlanets.filter((planet) => planet[column] > parseInt(value, 10));
    case 'menor que':
      return filterPlanets.filter((planet) => planet[column] < parseInt(value, 10));
    case 'igual a':
      return filterPlanets.filter((planet) => planet[column] === value);
    default:
      return filterPlanets;
  }
};

const numFilters = (results, filters, column, comparison, value) => {
  const filterPlanets = results.filter((planet) => planet.name.match(filters[0].name));
  if (column && comparison && value) {
    return switchFilters(comparison, filterPlanets, column, value);
  }
  return filterPlanets;
};

export default numFilters;
