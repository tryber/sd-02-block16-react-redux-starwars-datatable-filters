import { SEARCH_FILTER } from '../actions/searchFilter';
import { SELECTOR_FILTER } from '../actions/selectorFilter';
import { NEW_FILTER } from '../actions/newFilter';

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
  // console.log(nextFilter);
  console.log(action);
  switch (action.type) {
    case SEARCH_FILTER: {
      const nextFilter = state.filters;
      const { value } = action;
      nextFilter[0].name = value;
      return { ...state, filters: nextFilter };
    }
    case SELECTOR_FILTER: {
      const nextFilter = state.filters;
      const { value, part } = action;
      nextFilter[1].numericValues[part] = value;
      return { ...state, filters: nextFilter };
    }
    case NEW_FILTER: {
      const { column, comparison, valueComparison } = action;
      const nextFilter = state.filters;
      const nextSelector = state.selectors;
      nextSelector.splice(nextSelector.indexOf(column), 1);
      nextFilter[1].numericValues.column = 'coluna';
      nextFilter[1].numericValues.comparison = '-';
      nextFilter[1].numericValues.valueComparison = 0;
      const novoFiltro = {
        numericValues: {
          column,
          comparison,
          valueComparison,
        },
      };
      nextFilter.push(novoFiltro);
      return { ...state, filters: nextFilter, selectors: nextSelector };
    }
    default:
      return state;
  }
}
