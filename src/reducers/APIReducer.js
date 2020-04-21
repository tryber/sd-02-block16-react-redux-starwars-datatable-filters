import {
  PLANETS_REQUESTING,
  PLANETS_REQUEST_SUCCESS,
  PLANETS_REQUEST_FAILURE,
} from '../actions/APIActions';

const INITIAL_SW_STATE = {
  isFetching: true,
  results: [],
  error: '',
};

const data = (state = INITIAL_SW_STATE, action) => {
  switch (action.type) {
    case PLANETS_REQUESTING:
      return {
        ...state,
        isFetching: true,
      };
    case PLANETS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        results: action.results,
      };
    case PLANETS_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default data;
