import { CHANGE_NAME_FILTER } from '../reducers/filtersReducer';

const changeNameFilter = (event) => {
  const { value } = event.target;
  return {
    type: CHANGE_NAME_FILTER,
    value: value,
  };
}

export default changeNameFilter;
