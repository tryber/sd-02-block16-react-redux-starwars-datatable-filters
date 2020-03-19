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
        valueComparison: 0,
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

function removeFilter(action, state) {
  const { i, value } = action;
  console.log(i, value);
  console.log(state.filters);
  return {
    ...state,
    selectors: [...state.selectors, value],
    filters: state.filters.filter((elem, index) => index !== parseInt(i, 10)),
  };
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
      return removeFilter(action, state);
    }
    default:
      return state;
  }
}
