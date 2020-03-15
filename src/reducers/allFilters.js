import {
  NAME_FILTER,
  COLUMN_FILTER,
  COMPARISON_FILTER,
  VALUE_FILTER,
} from '../actions';

const INITIAL_STATE = {
  filters: [
    {
      name: '',
    },
    {
      numericValues: {
        column: '',
        comparison: '',
        value: '',
      },
    },
  ],
};

const allFilters = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_FILTER: {
      const nextFilter = [...state.filters];
      nextFilter[0].name = action.filName;
      return {
        ...state, filters: nextFilter,
      };
    }
    case COLUMN_FILTER: {
      const nextFilter = [...state.filters];
      nextFilter[1].numericValues[action.selector] = action.column;
      return {
        ...state, filters: nextFilter,
      };
    }

    case COMPARISON_FILTER: {
      const nextFilter = [...state.filters];
      nextFilter[1].numericValues[action.selector] = action.comparison;
      return {
        ...state, filters: nextFilter,
      };
    }

    case VALUE_FILTER: {
      const nextFilter = [...state.filters];
      nextFilter[1].numericValues[action.selector] = action.value;
      return {
        ...state, filters: nextFilter,
      };
    }
    default: return state;
  }
};

export default allFilters;
