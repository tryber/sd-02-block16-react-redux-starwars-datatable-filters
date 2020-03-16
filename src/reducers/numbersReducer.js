import { FILTER_SW_PLANETS } from '../actions';

const initialState = {
  filters: [
    {
      numericValues: {
        column: '',
        comparison: '',
        value: '',
      },
    },
  ],
};

const numberFilter = (state = initialState, action) => {
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

export default numberFilter;
