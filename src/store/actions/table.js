export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const CREATE_RESULTS = 'CREATE_RESULTS';
export const ADD_FILTERS = 'ADD_FILTERS';


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
