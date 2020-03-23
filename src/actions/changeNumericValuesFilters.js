import { CHANGE_NUMERIC_VALUES_FILTERS } from '../reducers/filtersReducer';

const changeNumericValuesFilters = (event) => {
  const { value, name } = event.target;
  const { id } = event.target.parentNode;
  return {
    type: CHANGE_NUMERIC_VALUES_FILTERS,
    value,
    name,
    id: Number(id),
  };
};

export default changeNumericValuesFilters;
