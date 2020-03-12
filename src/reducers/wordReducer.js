import { FILTER_SW_PLANETS } from '../actions';

const initialState = {
  filters: [
    {
      name: '',
    },
  ],
};

const visibilityFilter = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_SW_PLANETS: {
      const searchCriteria = [...state.filters];
      searchCriteria[0].name = action.typing;
      return {
        ...state, filters: searchCriteria,
      };
    }
    default: return state;
  }
};

export default visibilityFilter;
