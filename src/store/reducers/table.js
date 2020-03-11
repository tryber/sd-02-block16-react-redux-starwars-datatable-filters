import {
  FILTER_BY_NAME,
} from '../actions/table';

const INITIAL_NAME_STATE = {
  filters: [
    {
      name: '',
    },
  ],
};

const table = (state = INITIAL_NAME_STATE, action) => {
  switch (action.type) {
    case FILTER_BY_NAME:
      return {
        ...state,
        filters: [...action.filters],
      };
    default:
      return state;
  }
};

export default table;
