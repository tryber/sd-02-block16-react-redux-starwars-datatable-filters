import { FILTER_SW_PLANETS } from '../actions';

const initialState = {
  filters: [
    {
      name: '',
    },
    {
      numericValues: {
        column: '',
        comparison: '',
        value: 0,
      },
    },
  ],
};

const visibilityFilter = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_SW_PLANETS: {
      return {
        ...state,
        filtered: action.results,
        filters: [
          { name: action.typing },
        ],
      };
    }
    default: return state;
  }
};

export default visibilityFilter;
