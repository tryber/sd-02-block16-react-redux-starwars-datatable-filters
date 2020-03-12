import { SEARCH_FILTER } from '../actions/searchFilter';
import { SELECTOR_FILTER } from '../actions/selectorFilter';
import { NEW_FILTER } from '../actions/newFilter';
import { REMOVE_FILTER } from '../actions/removeFilter';

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

function newFilter(action, state) {
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
  return { nextFilter, nextSelector };
}

function removendoOFiltro(i, valor, state) {
  const nextFilter = state.filters;
  const nextSelector = state.selectors;
  nextFilter.splice(i, 1);
  nextSelector.push(valor);
  return { nextFilter, nextSelector };
}

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
      const { nextFilter, nextSelector } = newFilter(action, state);
      return { ...state, filters: nextFilter, selectors: nextSelector };
    }
    case REMOVE_FILTER: {
      const { i, value } = action;
      const { nextFilter, nextSelector } = removendoOFiltro(i, value, state);
      return { ...state, filters: nextFilter, selectors: nextSelector };
    }
    default:
      return state;
  }
}
