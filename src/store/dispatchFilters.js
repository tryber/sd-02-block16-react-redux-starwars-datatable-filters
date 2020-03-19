import * as types from './actionTypes';

function updateFilters(column, condition, value) {
  return {
    type: types.RESULT_FILTER_TYPE,
    numericValues: {
      column,
      condition,
      value,
    }
  };
}

const dispatchFilters = (column, condition, value, dataMock) => (
  (dispatch) => {
    const { dataMock } = this.props;
    console.log(dataMock)
    return dispatch(updateFilters(column, condition, value));
  }
);

export default dispatchFilters;
