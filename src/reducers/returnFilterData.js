import {
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

const columnsFiltered = (columnsToFilter, columnUsed) => {
  const prevState = [...columnsToFilter];
  const indexColumn = prevState.indexOf(columnUsed);
  const newColumns = prevState.slice(0, indexColumn).concat(prevState.slice(indexColumn + 1));
  return newColumns;
};

const INITIAL_STATE = {
  filters: [],
  columnsSelect: columns,
};

const returnFilterData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
      console.log(state.filters);
      return {
        filters: [
          ...state.filters,
          { numericValues: action.numObj.numericValues },
        ],
        filteredData: action.filterData,
        columnsSelect: columnsFiltered(action.columnsToFilter, action.columnUsed),
      };
    default: return state;
  }
};

export default returnFilterData;
