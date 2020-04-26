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
  (dispatch) => {
    const { results } = dataMock;
    const filterStore = store.getState().loadReducer.filters.filter((element) =>
      !Object.keys(element).includes('name'));
    const newFilterStore = filterStore.filter((filter) => filter.numericValues.column !== column);
    //console.log(newFilterStore)
    dispatch(updateNumericValues(newFilterStore));
    //return (dispatch(dispatchAllFilters(column, condition, value, dataMock)))
    
  });


export default filtersRemove;
