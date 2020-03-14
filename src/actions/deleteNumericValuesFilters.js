import { DELETE_NUMERIC_VALUES_FILTERS } from '../reducers/filtersReducer';

const deleteNumericValuesFilters = (event) => {
  const { id } = event.target.parentNode;
  return {
    type: DELETE_NUMERIC_VALUES_FILTERS,
    id: Number(id),
  };
};

export default deleteNumericValuesFilters;
