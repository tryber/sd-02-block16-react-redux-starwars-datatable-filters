const INITIAL_STATE = {
  data: [],
  isFilteredByName: false,
  filters: {
    name: '',
  },
};

const FILTER_BY_NAME = 'FILTER_BY_NAME';
const TOGGLE_FILTER = 'TOGGLE_FILTER';

export default function filterByName(state = INITIAL_STATE, {
  type, filteredResults, name,
}) {
  switch (type) {
    case FILTER_BY_NAME:
      return {
        ...state, isFilteredByName: true, data: [...filteredResults], filters: { name },
      };
    case TOGGLE_FILTER:
      return {
        ...state, isFilteredByName: false, data: [], filters: { name: '' },
      };
    default:
      return state;
  }
}
