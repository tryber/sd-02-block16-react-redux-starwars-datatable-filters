import { SEARCH_BY_NAME, SEARCH_BY_NUMBER } from '../actions';

const INITIAL_FILTER = {
  filteredByName: [],
  filteredByNumber: [],
  activeFilter: '',
  filters: [
    {
      name: '',
    },
  ],
};

const filterPlanets = (state = INITIAL_FILTER, action) => {
  const { column } = action;
  const { comparison } = action;
  const { value } = action;
  const [, ...rest] = state.filters;
  switch (action.type) {
    case SEARCH_BY_NAME:
      return {
        ...state,
        filteredByName: action.results,
        activeFilter: 'name',
        filters: [
          { name: action.text },
          ...rest,
        ],
      };
    case SEARCH_BY_NUMBER:
      if (!action.column || !action.comparison || !action.value) {
        return { ...state };
      }
      return {
        ...state,
        filteredByNumber: action.results,
        activeFilter: 'number',
        filters: [...state.filters,
          { numericValues: { column, comparison, value } }],
      };
    default: return state;
  }
};

export default filterPlanets;
