import {
  REQUEST_SWAPI,
  REQUEST_SWAPI_SUCCESS,
  REQUEST_SWAPI_FAILURE,
  FILTER_PLANETS_WITH_NAME,
  FILTER_PLANETS_WITH_NUMBER,
} from '../actions';

const columns = [
  '-',
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const INITIAL_STATE = ({
  isFetching: false,
  filters: [],
  columnsSelect: columns,
  filtersToShow: [],
});

const columnsFiltered = (columnsToFilter, columnUsed) => {
  const prevState = [...columnsToFilter];
  const indexColumn = prevState.indexOf(columnUsed);
  const newColumns = prevState.slice(0, indexColumn).concat(prevState.slice(indexColumn + 1));
  return newColumns;
};

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
        filters: [
          ...state.filters,
          { name: action.name },
        ],
        filteredData: action.filterData,
      };

    case FILTER_PLANETS_WITH_NUMBER:
      return {
        ...state,
        filters: [
          ...state.filters,
          { numericValues: action.numObj.numericValues },
        ],
        filtersToShow: [
          ...state.filtersToShow,
          { numericValues: action.numObj.numericValues },
        ],
        filteredData: action.filterData,
        columnsSelect: columnsFiltered(action.columnsToFilter, action.columnUsed),
      };

    default: return state;
  }
};

export default allReducer;
