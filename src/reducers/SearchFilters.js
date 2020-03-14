import { SEARCH_BY_NAME, SEARCH_BY_NUMBER } from '../actions';

const INITIAL_FILTER = {
  filteredResults: [],
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
  switch (action.type) {
    case SEARCH_BY_NAME:
      return {
        ...state,
        filteredResults: action.results,
        filters: [
          { name: action.text },
        ],
      };
    case SEARCH_BY_NUMBER:
      // console.log(action.results)
      return {
        ...state,
        filteredResults: action.results,
        filters: [
          {
            ...state.filters[0],
          },
          {
            numericValues: {
              column: action.column,
              comparison: action.comparison,
              value: action.value,
            },
          },
        ],
      };
    default: return state;
  }
};

export default filterPlanets;
