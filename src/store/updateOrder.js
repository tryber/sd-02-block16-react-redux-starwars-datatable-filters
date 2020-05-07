import * as types from './actionTypes';

function updateOrderFilters() {
  return {
    type: types.REMOVE_ORDER,
  };
}

function updateData(results) {
  return {
    type: types.UPDATE_DATA,
    results,
  }
}

const updateOrder = (data) => (
  (dispatch) => {
    dispatch(updateOrderFilters());
    return dispatch(updateData(data));
  }
);

export default updateOrder;