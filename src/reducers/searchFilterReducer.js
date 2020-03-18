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
        valueComparison: '-',
      },
    },
  ],
  selectors: ['coluna', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
};

function searchFilterByName(action, state) {
  const { value } = action;
  return {
    ...state,
    filters: state.filters.map((elem, index) => {
      if (index === 0) {
        return { ...elem, name: value };
      }
      return elem;
    }),
  };
}

function selectorFilter(action, state) {
  const { value, part } = action;
  return {
    ...state,
    filters: state.filters.map((elem, index) => {
      if (index === 1) {
        return {
          ...elem,
          numericValues: { ...state.filters[1].numericValues, [part]: value },
        };
      }
      return elem;
    }),
  };
}

function newFilter(action, state) {
  const { column, comparison, valueComparison } = action;
  return {
    ...state,
    selectors: state.selectors.filter((elem) => elem !== column),
    filters: [...state.filters.map((elem, index) => {
      if (index === 1) {
        return {
          ...elem,
          numericValues: {
            column: 'coluna',
            comparison: '-',
            valueComparison: 0,
          },
        };
      }
      return elem;
    }), {
      numericValues: {
        column,
        comparison,
        valueComparison,
      },
    }],
  };
}

function removendoOFiltro(i, valor, state) {
  const nextFilter = [...state.filters];
  const nextSelector = [...state.selectors];
  nextFilter.splice(i, 1);
  nextSelector.push(valor);
  return { nextFilter, nextSelector };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FILTER: {
      return searchFilterByName(action, state);
    }
    case SELECTOR_FILTER: {
      return selectorFilter(action, state);
    }
    case NEW_FILTER: {
      return newFilter(action, state);
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
