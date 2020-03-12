const INITIAL_STATE = {
  data: [],
  isFilteredByNumber: false,
  columnStatus: false,
  comparisonStatus: false,
  valueStatus: false,
  filters: [
    { filterCount: [['x']] },
    {
      selectors: [
        [
          ['', '   '],
          ['population', 'Population'],
          ['orbital_period', 'Orbital period'],
          ['diameter', 'Diameter'],
          ['rotation_period', 'Rotation period'],
          ['surface_water', 'Surface water'],
        ],
      ],
    },
    [
      {
        numericValues: {
          column: '',
          comparison: '',
          value: '',
        },
      },
    ],
  ],
};

const STORE_COLUMN_FILTER = 'STORE_COLUMN_FILTER';
const STORE_COMPARISON_FILTER = 'STORE_COMPARISON_FILTER';
const STORE_VALUE_FILTER = 'STORE_VALUE_FILTER';
const FILTER_BY_NUMBERS = 'FILTER_BY_NUMBER';

export default function filterByNumericValue(state = INITIAL_STATE,
  {
    type, value: newValue,
    filteredPlanets, filterSelectors, rowIndex,
  }) {
  const { filters } = state;
  const [filterCount, selectors] = filters;

  const updateNumericValues = (field) => ({
    ...state,
    [`${field}Status`]: true,
    filters: [...filters].map((item, index) => ((index === 2) ? item.map(
      (filterSet, setIndex) => (
        (setIndex === rowIndex) ? (
          { numericValues: { ...filterSet.numericValues, [field]: newValue } }) : filterSet),
    ) : item)),
  });

  if (type === STORE_COLUMN_FILTER) return updateNumericValues('column');
  if (type === STORE_COMPARISON_FILTER) return updateNumericValues('comparison');
  if (type === STORE_VALUE_FILTER) return updateNumericValues('value');
  if (type === FILTER_BY_NUMBERS) {
    return {
      ...state,
      isFilteredByNumber: true,
      data: filteredPlanets[filteredPlanets.length - 1],
      columnStatus: false,
      comparisonStatus: false,
      valueStatus: false,
      filters: [...filters].map((filter, index) => {
        if (index === 0) return { filterCount: filterCount.filterCount.concat([['x']]) };
        if (index === 1) return { selectors: selectors.selectors.concat([...filterSelectors]) };
        if (index === 2) return filter.concat({ numericValues: { column: '', comparison: '', value: '' } });
        return filter;
      }),
    };
  }
  return state;
}
