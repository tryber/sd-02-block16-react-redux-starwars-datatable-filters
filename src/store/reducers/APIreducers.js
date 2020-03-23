import {
  RESQUEST_SW_PLANETS,
  RESQUEST_SW_PLANETS_SUCCESS,
  RESQUEST_SW_PLANETS_FAILURE,
} from '../actions/APIaction';

const INITIAL_SW_PLANETS_STATE = {
  isFetching: true,
  results: [],
  error: '',
};

const data = (state = INITIAL_SW_PLANETS_STATE, action) => {
  switch (action.type) {
    case RESQUEST_SW_PLANETS:
      return {
        ...state,
        isFetching: true,
      };
    case RESQUEST_SW_PLANETS_SUCCESS: {
      return {
        ...state,
        results: action.results,
        isFetching: false,
      };
    }
    case RESQUEST_SW_PLANETS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default data;
