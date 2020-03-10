import {
  REQUEST_SWAPI_PLANETS,
  RECEIVE_SWAPI_PLANETS_SUCCESS,
  RECEIVE_SWAPI_PLANETS_FAILURE,
} from '../actions';

const INITIAL_SWAPI_PLANETS = {
  isFetching: false,
};

const data = (state = INITIAL_SWAPI_PLANETS, action) => {
  switch (action.type) {
    case REQUEST_SWAPI_PLANETS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_SWAPI_PLANETS_SUCCESS:
      return {
        ...state,
        results: action.results,
        isFetching: false,
      };
    case RECEIVE_SWAPI_PLANETS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default: return state;
  }
};

export default data;
