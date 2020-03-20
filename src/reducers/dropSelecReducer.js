import * as types from '../store/actionTypes';
import initialState from './initialState';

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case types.RESULT_FILTER_TYPE:
      return {
        ...state,
        dataMock: action.dataMock,
        filters: [
          ...state.filters,
          { numericValues: action.numericValues },
        ],
      };
    default:
      return state;
  }
}
