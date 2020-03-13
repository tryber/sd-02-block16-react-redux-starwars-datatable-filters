import * as types from '../store/actionTypes';

const initialState = {
  data: [],
  onSelection: false,
  error: '',
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case types.FIRST_RESULT:
      return {
        ...state,
        onSelection: true,
      };
    case types.RESULT_TRUE:
      return {
        ...state,
        onSelection: true,
        data: action.result,
      };
    case types.RESULT_FALSE:
      return {
        ...state,
        onSelection: false,
        error: action.error,
      };
    default:
      return state;
  }
}
