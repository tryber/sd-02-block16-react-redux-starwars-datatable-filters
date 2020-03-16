import { SEARCH_BY_NAME, SEARCH_BY_NUMBER } from '../actions';

const INITIAL_FILTER = {
  filteredByName: [],
  filteredByNumber: [],
  activeFilter: '',
  filters: [
    {
      name: '',
    },
    {
      numericValues: {
        column: '',
        comparison: '',
        value: '',
      },
    },
  ],
};

const filterPlanets = (state = INITIAL_FILTER, action) => {
  const { column } = action;
  const { comparison } = action;
  const { value } = action;
  switch (action.type) {
    case SEARCH_BY_NAME:
      return {
        ...state,
        filteredByName: action.results,
        activeFilter: 'name',
        filters: [
          { name: action.text },
          { ...state.filters[1] },
        ],
      };
    case SEARCH_BY_NUMBER:
      return {
        ...state,
        filteredByNumber: action.results,
        activeFilter: 'number',
        filters: [
          { name: state.filters[0] },
          { numericValues: { ...state.filters[1], column, comparison, value } },
        ],
      };
    default: return state;
  }
};

export default filterPlanets;
