import { resetStateSelectors } from './selectors';

export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const CREATE_RESULTS = 'CREATE_RESULTS';
export const ADD_FILTERS = 'ADD_FILTERS';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const ASC_DESC_ORDER = 'ASC_DESC_ORDER';

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

const ascendingOrder = (column, order) => ({
  type: ASC_DESC_ORDER,
  filter: {
    column,
    order,
  },
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

export function filterButton(filter, results, resultsByName, e) {
  const nodeElements = e.target.parentNode.parentNode.childNodes;
  e.target.parentNode.parentNode.childNodes[3].lastChild.value = null;
  nodeElements.forEach((element) => {
    if (element.id === 'select_content') {
      element.firstChild.selectedIndex = 0;
    }
  });
  return (dispatch) => {
    dispatch(addFilters(filter, results, resultsByName));
    dispatch(resetStateSelectors());
  };
}

export function getRemoveFilter(event, results) {
  const index = event.target.id;
  return (dispatch) => (
    dispatch(removeFilter((index), results))
  );
}

export function getAscendingColumn(event, order) {
  const column = event.target.value;
  const newOrder = order === 'ASC' ? 'DESC' : 'ASC';
  return (dispatch) => (
    dispatch(ascendingOrder(column, newOrder))
  );
}
