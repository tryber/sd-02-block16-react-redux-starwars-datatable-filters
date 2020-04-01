import * as types from './actionTypes';

const filterNames = (name) => {
  return ({ type: types.FILTER_NAME, name });
};

export default filterNames;
