import { SEARCH_BY_NAME } from '../actions';

const INITIAL_FILTER = {
  resultsByName: [],
  filters: [
    {
      name: '',
    },
  ],
};

const filterPlanets = (state = INITIAL_FILTER, action) => {
  switch (action.type) {
    case SEARCH_BY_NAME:
      return {
        ...state,
        resultsByName: action.results,
        filters: [
          { name: action.text },
        ],
      };
    default: return state;
  }
};

export default filterPlanets;
