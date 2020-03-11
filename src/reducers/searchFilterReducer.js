import { SEARCH_FILTER } from '../actions/searchFilter';
import { SELECTOR_FILTER } from '../actions/selectorFilter';
import { NUMBER_OF_SELECTORS_FILTER } from '../actions/numberOfSelectorsFilter';

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
  selectors: ['coluna', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
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
    case NUMBER_OF_SELECTORS_FILTER: {
      return state;
    }
    default:
      return state;
  }
}
