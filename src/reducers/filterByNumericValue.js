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
const REMOVE_FILTER = 'REMOVE_FILTER';

export default function filterByNumericValue(state = INITIAL_STATE,
  {
    type, value: newValue,
    filteredPlanets, filterSelectors, rowIndex,
  }) {
  const { storageData, filters } = state;
  const [{ filterCount }, { selectors }, numericValues] = filters;

  const updateNumericValues = (field) => ({
    ...state,
    [`${field}Status`]: true,
    filters: [
      filters[0],
      filters[1],
      filters[2].map((filterSet, setIndex) => (
        (setIndex === rowIndex) ? (
          { numericValues: { ...filterSet.numericValues, [field]: newValue } }
        )
          : filterSet)),
    ],
  });

  switch (type) {
    case STORE_COLUMN_FILTER:
      return updateNumericValues('column');
    case STORE_COMPARISON_FILTER:
      return updateNumericValues('comparison');
    case STORE_VALUE_FILTER:
      return updateNumericValues('value');
    case REMOVE_FILTER:
      return {
        ...state,
        isFilteredByNumber: true,
        data: storageData,
        filters: [
          { filterCount: filterCount.filter((item, index) => index !== rowIndex) },
          { selectors: selectors.filter((item, index) => index !== rowIndex) },
          numericValues.filter((item, index) => index !== rowIndex),
        ],
      };
    case FILTER_BY_NUMBERS:
      return {
        ...state,
        isFilteredByNumber: true,
        storageData: filteredPlanets[0],
        data: filteredPlanets[filteredPlanets.length - 1],
        columnStatus: false,
        comparisonStatus: false,
        valueStatus: false,
        filters: [
          { filterCount: filterCount.concat([['x']]) },
          { selectors: selectors.concat([...filterSelectors]) },
          filters[2].concat({ numericValues: { column: '', comparison: '', value: '' } }),
        ],
      };
    default:
      return state;
  }
}
