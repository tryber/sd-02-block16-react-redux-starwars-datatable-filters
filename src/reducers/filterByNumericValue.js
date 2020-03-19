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

const STORE_COLUMN_FILTER = 'STORE_COLUMN_FILTER';
const STORE_COMPARISON_FILTER = 'STORE_COMPARISON_FILTER';
const STORE_VALUE_FILTER = 'STORE_VALUE_FILTER';
const REMOVE_FILTER = 'REMOVE_FILTER';
const UPDATE_VALUE_STATUS = 'UPDATE_VALUE_STATUS';

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
    default:
      return state;
  }
}
