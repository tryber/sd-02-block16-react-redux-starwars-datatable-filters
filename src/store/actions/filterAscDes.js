import * as types from './actionTypes';

const filterAscDes = (key) => ({ type: types.FILTER_ASC_DES, column: key });

export default filterAscDes;
