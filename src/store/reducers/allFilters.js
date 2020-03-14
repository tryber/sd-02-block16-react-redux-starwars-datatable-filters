import { NAME_FILTER } from '../actions';

const INITIAL_STATE = {
  filters: [
    {
      name: '',
    },
  ],
};

const allFilters = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_FILTER:
      return {
        ...state,
        filters: [{
          name: action.filName,
        }],
      };
    default: return state;
  }
};

export default allFilters;
