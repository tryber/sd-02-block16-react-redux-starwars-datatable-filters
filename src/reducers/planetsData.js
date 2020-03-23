import {
  REQUEST_PLANETS_SWAPI,
  RECEIVE_PLANETS_SWAPI_SUCCESS,
  RECEIVE_PLANETS_SWAPI_FAILURE,
} from '../actions/getPlanets';

const INTIAL_STATE = { isFetching: false, data: [] };

const planetsData = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_PLANETS_SWAPI:
      return { ...state, isFetching: true };
    case RECEIVE_PLANETS_SWAPI_SUCCESS:
      return { ...state, isFetching: false, data: action.results };
    case RECEIVE_PLANETS_SWAPI_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    default: return state;
  }
};

export default planetsData;
