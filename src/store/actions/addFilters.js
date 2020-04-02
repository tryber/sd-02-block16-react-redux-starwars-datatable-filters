import * as types from './actionTypes';

const addFilters = (filters) => {
  const { column, comparison, value } = filters;
  return ({
    type: types.FILTER_NUMBERS, column, comparison, value,
  });
};

export default addFilters;
