import { SEARCH_FILTER } from '../actions/searchFilter';

const initialState = {
  filters: [
    {
      name: '',
    },
  ],
};

export default function reducer(state = initialState, action) {
  const previousFilter = state.filters;
  const { value } = action;
  previousFilter[0].name = value;
  console.log(previousFilter);
  switch (action.type) {
    case SEARCH_FILTER: {
      return { ...state, filters: previousFilter };
    }
    default:
      return state;
  }
}
