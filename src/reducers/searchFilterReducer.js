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
        valueComparison: '0',
      },
    },
  ],
};

export default function reducer(state = initialState, action) {

  // console.log(previousFilter);
  console.log(action);
  switch (action.type) {
    case SEARCH_FILTER: {
      const previousFilter = state.filters;
      const { value } = action;
      previousFilter[0].name = value;
      return { ...state, filters: previousFilter };
    }
    case SELECTOR_FILTER: {
      const previousFilter = state.filters;
      const { value, part } = action;
      previousFilter[1].numericValues[part] = value;
      return { ...state, filters: previousFilter };
    }
    default:
      return state;
  }
}
