export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const CREATE_RESULTS = 'CREATE_RESULTS';
export const ADD_FILTERS = 'ADD_FILTERS';
export const REMOVE_FILTER = 'REMOVE_FILTER';


const receiveResults = (results) => ({
  type: CREATE_RESULTS,
  results,
});

const receiveFilterByName = (name, results) => ({
  type: FILTER_BY_NAME,
  results,
  filters: [{ name }],
});

const addFilters = ({ column, comparison, value }, results, resultsByName) => ({
  type: ADD_FILTERS,
  resultsByName,
  results,
  filters: [{ numeric_values: { column, comparison, value } }],
});

const removeFilter = (index, results) => ({
  type: REMOVE_FILTER,
  results,
  index,
});

export function createResults(results) {
  return (dispatch) => (
    dispatch(receiveResults(results))
  );
}

export function filterByName({ target: { value } }, results) {
  return (dispatch) => (
    dispatch(receiveFilterByName(value.toLowerCase(), results))
  );
}

export function filterButton(filter, results, resultsByName) {
  return (dispatch) => (
    dispatch(addFilters(filter, results, resultsByName))
  );
}

export function getRemoveFilter(event, results) {
  const index = event.target.id;
  return (dispatch) => (
    dispatch(removeFilter((index), results))
  );
}
