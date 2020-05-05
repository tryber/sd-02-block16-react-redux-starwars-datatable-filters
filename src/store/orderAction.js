import * as types from './actionTypes';

const updateName = (name, newOrder) => {
  return {
    type: types.SET_NEW_ORDER,
    name,
    newOrder,
  };
};

const orderAction = (data, dataMock, dataMockFilter, name, order) => (
  (dispatch) => {
    let newOrder = 'ASC';
    if (order === 'ASC') {
      newOrder = 'DESC';
    } else {
      newOrder = 'ASC';
    }
    dispatch(updateName(name, newOrder));
  }
);

export default orderAction;
