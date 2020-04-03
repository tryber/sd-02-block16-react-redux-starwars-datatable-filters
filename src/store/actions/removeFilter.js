import * as types from './actionTypes';

const removeFilter = (index) => ({
  type: types.REMOVE_FILTER, index,
});

export default removeFilter;
