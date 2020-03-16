import {
  REQUESTING_API,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
} from '../actions/APIactions';

const INITAL_STATE = {
  isFetching: true,
  results: [],
  error: '',
};

const data = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case REQUESTING_API:
      return {
        ...state,
        isFetching: true,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        results: action.results,
      };
    case REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
