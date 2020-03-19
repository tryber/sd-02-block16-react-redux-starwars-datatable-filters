import {
  NAME_FILTER,
  NUMBER_FILTER,
  REMOVE_FILTER,
} from '../actions';

const INITIAL_STATE = {
  filters: [
    {
      name: '',
    },
    /* {
      numericValues: {
        column: 'orbital_period',
        comparison: 'maior que',
        value: '24',
      },
    },
    {
      numericValues: {
        column: 'surface_water',
        comparison: 'maior que',
        value: '0',
      },
    }, */
  ],
  columnsSelect: [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ],
};

const allFilters = (state = INITIAL_STATE, action) => {
  const [, ...rest] = state.filters;
  switch (action.type) {
    case NAME_FILTER: {
      return { ...state, filters: [{ name: action.filName }, ...rest] };
    }
    case NUMBER_FILTER: {
      console.log(state.filters);
      const columnFilter = state.columnsSelect.filter((item) => item !== action.column);
      return {
        ...state,
        filters: [...state.filters, { numericValues: action.numericValues }],
        columnsSelect: columnFilter,
      };
    }
    case REMOVE_FILTER: {
      console.log(state.filters);
      const onlyNumeric = state.filters.slice(1);
      const numericRemove = onlyNumeric.filter(
        (item) => item.numericValues.column !== action.column,
      );
      const optionsSelect = state.columnsSelect.concat(action.column);
      return {
        ...state,
        filters: [state.filters[0], ...numericRemove],
        columnsSelect: optionsSelect,
      };
    }
    default: return state;
  }
};

export default allFilters;
