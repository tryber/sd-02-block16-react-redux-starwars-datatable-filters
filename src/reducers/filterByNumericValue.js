import {
  STORE_COLUMN_FILTER,
  STORE_COMPARISON_FILTER,
  STORE_VALUE_FILTER,
  REMOVE_FILTER,
} from '../components/FiltersByNumber';
import { ADD_NEW_FIELD } from '../components/Table';

const INITIAL_STATE = {
  selectors: [
    ['', '   '],
    ['population', 'Population'],
    ['orbital_period', 'Orbital period'],
    ['diameter', 'Diameter'],
    ['rotation_period', 'Rotation period'],
    ['surface_water', 'Surface water'],
  ],
  filters: [
    {
      numericValues: {
        column: '',
        comparison: '',
        value: '',
      },
    },
  ],
};

export default function filterByNumericValue(state = INITIAL_STATE,
  {
    type, value: newValue, rowIndex,
  }) {
  const updateNumericValue = (field) => ({
    ...state,
    filters: state.filters.map((filter, index) => {
      if (index === rowIndex) {
        return {
          numericValues:
          { ...filter.numericValues, [[field]]: newValue },
        };
      }
      return filter;
    }),
  });

  switch (type) {
    case STORE_COLUMN_FILTER:
      return updateNumericValue('column');
    case STORE_COMPARISON_FILTER:
      return updateNumericValue('comparison');
    case STORE_VALUE_FILTER:
      return updateNumericValue('value');
    case ADD_NEW_FIELD:
      return {
        ...state,
        filters: [
          ...state.filters, {
            numericValues: { column: '', comparison: '', value: '' },
          },
        ],
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filters: state.filters.filter((el, index) => {
          if (index !== rowIndex) return true;
          return false;
        }),
      };
    default:
      return state;
  }
}
