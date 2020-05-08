import * as types from './actionTypes';

function updateOrderFilters() {
  return {
    type: types.REMOVE_ORDER,
  };
}

function updateData(results) {
  return {
    type: types.UPDATE_DATA,
    data: results,
  }
}

const updateOrder = (data, dataMock, dataMockFilterOn) => (
  (dispatch) => {
    let newData = data;
    if (dataMockFilterOn) {
      newData = dataMock;
    }
    dispatch(updateOrderFilters());
    return dispatch(updateData(newData));
  }
);

export default updateOrder;