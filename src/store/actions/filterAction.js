
export const CREATE_FILTER_RESULTS = 'CREATE_FILTER_RESULTS';
export const FILTER_RESULTS_BY_NAME = 'FILTER_RESULTS_BY_NAME';
export const FILTER_RESULTS_BY_COLUMN = 'FILTER_RESULTS_BY_COLUMN';


const receiveFilterResults = (filterResults) => ({
  type: CREATE_FILTER_RESULTS,
  filterResults,
});

const receiveFilterByName = (filterResults, name, filters) => ({
  type: FILTER_RESULTS_BY_NAME,
  filterResults,
  name,
  filters,
});

const receiveFilterByColumn = (filterResults, ...numericValues) => {
  const [value] = numericValues;
  return ({
    type: FILTER_RESULTS_BY_COLUMN,
    filterResults,
    numericValues: value,
  });
};

export const getResults = (results) => (dispatch) => (
  dispatch(receiveFilterResults(results))
);

function filtersByNumericValues(filterResults, name, column, comparison, value) {
  const newFilters = filterResults.filter((planet) => planet.name.match(new RegExp(name, 'i')));

  switch (comparison) {
    case 'maior que':
      return newFilters.filter((planet) => Number(planet[column]) > value);
    case 'menor que':
      return newFilters.filter((planet) => Number(planet[column]) < value);
    case 'igual a':
      return newFilters.filter((planet) => Number(planet[column]) === value);
    default:
      return newFilters;
  }
}

export const filterByName = (results, name, filters) => {
  const [, ...rest] = filters;
  let newFilters = results;
  rest.forEach(({ numericValues: { column, comparison, value } }) => {
    newFilters = filtersByNumericValues(newFilters, name, column, comparison, Number(value));
  });

  return (dispatch) => (
    dispatch(receiveFilterByName(newFilters, name, filters))
  );
};

export const filterByColumn = (filterResults, name, column, comparison, value) => {
  const newFilters = filtersByNumericValues(filterResults, name, column, comparison, Number(value));
  return (dispatch) => (
    dispatch(receiveFilterByColumn(newFilters, { column, comparison, value }))
  );
};

export const removeFilter = (results, filters, { value }) => {
  const [name, ...rest] = filters;
  let newFilters = rest.filter(({ numericValues: { column } }) => value !== column);
  if (newFilters.length === 0) {
    newFilters = [
      {
        numericValues:
        {
          column: '',
          comparison: '',
          value: 0,
        },
      }];
  }
  return (dispatch) => dispatch(filterByName(results, name.name, [name, ...newFilters]));
};
