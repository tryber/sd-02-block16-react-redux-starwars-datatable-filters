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

const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const ordered = { column: 'name', order: 'ASC' };

const newColumns = (allColumns, i) => {
  const prevColumns = [...allColumns];
  return prevColumns.slice(0, i).concat(prevColumns.slice(i + 1));
};

const newFilters = (allFilters, i) => {
  const prevFilters = [...allFilters];
  return prevFilters.slice(0, i).concat(prevFilters.slice(i + 1));
};

const INITIAL_STATE = ({
  isFetching: false,
  columnsSelect: columns,
  filtersToShow: [],
  name: '',
  numericValues: [],
  sorted: ordered,
});

const allReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_SWAPI:
      return {
        ...state,
        isFetching: true,
      };
    case REQUEST_SWAPI_SUCCESS:
      return {
        ...state,
        isFetching: false,
        planetsData: action.data.results,
        filteredData: action.data.results,
      };
    case REQUEST_SWAPI_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case FILTER_PLANETS_WITH_NAME:
      return {
        ...state,
        name: { name: action.name },
        filteredData: action.filterData,
      };
    case FILTER_NUMBERS:
      return {
        ...state,
        numericValues: [
          ...state.numericValues,
          action.filter,
        ],
        columnsSelect: newColumns(action.columns, action.index),
      };
    case REMOVE_NUMERIC_FILTER:
      return {
        ...state,
        numericValues: newFilters(action.filters, action.index),
        columnsSelect: [...state.columnsSelect, action.column],
      };
    case ERASE_SORT:
      return {
        ...state,
        sorted: action.value,
      };
    case SORT_COLUMN:
      return {
        ...state,
        sorted: action.toSort,
      };
    default: return state;
  }
};

export default allReducer;
