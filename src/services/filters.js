const filterByName = (name, results) => (
  results.filter((planet) => planet.name.toLowerCase().match(name))
);

export const switchFilters = (filterByColumn, comparison, column, value) => {
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

export const switchFiltersNum = (results, comparison, column, value, filters) => {
  let filterByColumn = filterByName(filters[0].name, results) || results;
  filters.forEach((filter) => {
    if (filter.numeric_values) {
      filterByColumn = switchFilters(
        filterByColumn,
        filter.numeric_values.comparison,
        filter.numeric_values.column,
        filter.numeric_values.value,
      );
    }
  });
  return filterByColumn;
};

const switchFiltersAll = (results, comparison, resultsByName, column, value, filters) => {
  let filterByColumn = resultsByName;
  if (filters[0].name) {
    filterByColumn = switchFiltersNum(results, comparison, column, value, filters);
  }
  return switchFilters(filterByColumn, comparison, column, value);
};


export const numFilters = (results, filters, resultsByName) => {
  const { column, comparison, value } = filters[filters.length - 1].numeric_values
    || { column: '', comparison: '', value: 0 };
  if (column && comparison && value) {
    return switchFiltersAll(results, comparison, resultsByName, column, value, filters);
  }
  return filterByName(filters[0].name, results);
};

export const removeFilters = (removedFilter, filters) => {
  const removedIndex = parseInt(removedFilter, 10) + 1;
  return (
    filters.filter((item, index) => {
      if (index === removedIndex) {
        return false;
      }

      return true;
    }));
};

export function orderColumn(resultsByName, column, order) {
  const newArray = resultsByName.slice();

  if (order === 'ASC') {
    return newArray.sort((firstPosition, secondPosition) => (
      firstPosition[column] > secondPosition[column] ? 1 : -1
    ));
  }
  return newArray.sort((firstPosition, secondPosition) => (
    firstPosition[column] < secondPosition[column] ? 1 : -1
  ));
}
