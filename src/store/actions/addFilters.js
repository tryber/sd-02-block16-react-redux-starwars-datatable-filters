import * as types from './actionTypes';

const addFilters = (filters) => {
  const { column, comparison, value } = filters;
  return ({
    type: types.ADD_FILTER, column, comparison, value,
  });
};

export default addFilters;
