import {
  REQUEST_SWAPI,
  REQUEST_SWAPI_SUCCESS,
  REQUEST_SWAPI_FAILURE,
  FILTER_PLANETS_WITH_NAME,
  FILTER_NUMBERS,
  REMOVE_NUMERIC_FILTER,
  ERASE_SORT,
  SORT_COLUMN,
} from '../actions';

const ordered = { column: 'name', order: 'ASC' };

const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const INITIAL_STATE = ({
  isFetching: false,
  columnsSelect: columns,
  filtersToShow: [],
  name: '',
  numericValues: [],
  sorted: ordered,
});

const newColumns = (allColumns, i) => {
  const prevColumns = [...allColumns];
  return prevColumns.slice(0, i).concat(prevColumns.slice(i + 1));
};

const newFilters = (allFilters, i) => {
  const prevFilters = [...allFilters];
  return prevFilters.slice(0, i).concat(prevFilters.slice(i + 1));
};

const requestSwapi = (state) => ({
  ...state,
  isFetching: true,
});

const requestSwapiSuccess = (state, { data: { results } }) => ({
  ...state,
  isFetching: false,
  planetsData: results,
  filteredData: results,
});

const requestSwapiFailure = (state, message) => ({
  ...state,
  isFetching: false,
  error: message,
});

const filterPlanetsWithName = (state, action) => ({
  ...state,
  name: { name: action.name },
  filteredData: action.filterData,
});

const filterNumbers = (state, action) => ({
  ...state,
  numericValues: [
    ...state.numericValues,
    action.filter,
  ],
  columnsSelect: newColumns(action.columns, action.index),
});

const removeNumericFilter = (state, action) => ({
  ...state,
  numericValues: newFilters(action.filters, action.index),
  columnsSelect: [...state.columnsSelect, action.column],
});

const eraseSort = (state, action) => ({
  ...state,
  sorted: action.value,
});

const sortColumn = (state, action) => ({
  ...state,
  sorted: action.toSort,
});

const allReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_SWAPI:
      return requestSwapi(state);

    case REQUEST_SWAPI_SUCCESS:
      return requestSwapiSuccess(state, action);

    case REQUEST_SWAPI_FAILURE:
      return requestSwapiFailure(state, action.error);

    case FILTER_PLANETS_WITH_NAME:
      return filterPlanetsWithName(state, action);

    case FILTER_NUMBERS:
      return filterNumbers(state, action);

    case REMOVE_NUMERIC_FILTER:
      return removeNumericFilter(state, action);

    case ERASE_SORT:
      return eraseSort(state, action);

    case SORT_COLUMN:
      return sortColumn(state, action);

    default: return state;
  }
};

export default allReducer;
