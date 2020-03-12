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
    )
      : item)),
  });

  switch (type) {
    case STORE_COLUMN_FILTER:
      return updateNumericValues('column');
    case STORE_COMPARISON_FILTER:
      return updateNumericValues('comparison');
    case STORE_VALUE_FILTER:
      return updateNumericValues('value');

    case FILTER_BY_NUMBERS:
      console.log(filteredPlanets);
      return {
        ...state,
        isFilteredByNumber: true,
        data: filteredPlanets[filteredPlanets.length - 1],
        columnStatus: false,
        comparisonStatus: false,
        valueStatus: false,
        filters: [...filters].map((filter, index) => {
          switch (index) {
            case 0:
              return { filterCount: filterCount.filterCount.concat([['x']]) };
            case 1:
              return { selectors: selectors.selectors.concat([...filterSelectors]) };
            case 2:
              return filter.concat({ numericValues: { column: '', comparison: '', value: '' } });
            default:
              return filter;
          }
        }),
      };
    default:
      return state;
  }
}
