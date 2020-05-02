import * as types from '../store/actionTypes';
import dispatchAllFilters from './dispatchFilters';
import store from '../store';

function updateNumericValues(numericValues) {
  return {
    type: types.RESULT_NUMERIC_VALUES,
    numericValues,
  };
}

const filtersRemove = (column, condition, value, dataMock) => (
  async (dispatch) => {
    const filterStore = store.getState().loadReducer.filters.filter((element) =>
      !Object.keys(element).includes('name'));
    const newFilterStore = filterStore.filter((filter) => filter.numericValues.column !== column);
    //await dispatch(updateNumericValues(newFilterStore));
    //return (dispatch(dispatchAllFilters(column, condition, value, dataMock)));
  });


export default filtersRemove;
