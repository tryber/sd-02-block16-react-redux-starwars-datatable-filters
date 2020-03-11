import { SEARCH_FILTER } from '../actions/searchFilter';
import { SELECTOR_FILTER } from '../actions/selectorFilter';

const initialState = {
  filters: [
    {
      name: '',
    },
    {
      numericValues: {
        column: 'coluna',
        comparison: '-',
        value: '0',
      },
    },
  ],
};

export default function reducer(state = initialState, action) {
  const previousFilter = state.filters;
  const { value } = action;
  previousFilter[0].name = value;
  // console.log(previousFilter);
  console.log(action);
  switch (action.type) {
    case SEARCH_FILTER: {
      return { ...state, filters: previousFilter };
    }
    case SELECTOR_FILTER: {
      return { ...state, filters: previousFilter };
    }
    default:
      return state;
  }
}
