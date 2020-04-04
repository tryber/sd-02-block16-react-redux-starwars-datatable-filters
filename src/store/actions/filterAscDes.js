import * as types from './actionTypes';

const filterAscDes = (key) => {
  return ({ type: types.FILTER_ASC_DES, column: key });
};

export default filterAscDes;
