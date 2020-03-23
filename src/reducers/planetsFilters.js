import { NAME_INPUT, COLUMN_OPTION } from '../actions/filterPlanets';

const INITIAL_STATE = {
  filteredData: [],
  filters: [
    { name: '' },
  ],
};

const planetsFilters = (state = INITIAL_STATE, action) => {
  const [, ...rest] = state.filters;
  switch (action.type) {
    case NAME_INPUT:
      return {
        ...state,
        filteredData: action.filteredData,
        filters: [{ name: action.name }, ...rest],
      };
    case COLUMN_OPTION:
      return {
        ...state,
        filteredData: action.filteredData,
        filters: [
          ...state.filters,
          {
            numericValues: action.numericValues,
          },
        ],
      };
    // case DELETE_OPTION:
    //   return {
    //     ...state,
    //     filteredData: action.filteredData,
    //     filters: [
    //       ...state.filters[0],
    //       {
    //         numericValues: action.numericValues,
    //       },
    //     ],
    //   };
    default: return state;
  }
};

export default planetsFilters;
