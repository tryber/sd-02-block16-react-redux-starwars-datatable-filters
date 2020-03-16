import * as types from '../store/actionTypes';

const initialState = {
  data: [],
  onLoad: false,
  error: '',
  filters: [
    {
      name: '',
    },
  ],
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case types.RESULT_TRUE:
      return {
        ...state,
        onLoad: true,
        data: action.data,
      };
    case types.RESULT_FALSE:
      return {
        ...state,
        onLoad: false,
        error: action.error,
      };
    case types.RESULT_PLANET:
      return {
        ...state,
        data: action.data,
        filters: action.filters,
      };
    default:
      return state;
  }
}
