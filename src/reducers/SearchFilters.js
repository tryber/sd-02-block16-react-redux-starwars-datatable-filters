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
      console.log(state);
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
