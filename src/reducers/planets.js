import { REQUEST_PLANETS, RECEIVE_PLANETS_SUCCESS } from '../actions';

const INITIAL_PLANETS_STATE = {
  isFetching: false,
};

const getPlanets = (state = INITIAL_PLANETS_STATE, action) => {
  // console.log('received action: ', action);
  switch (action.type) {
    case REQUEST_PLANETS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_PLANETS_SUCCESS:
      return {
        ...state,
        planets: action.planets,
        isFetching: false,
      };
    default: return state;
  }
};

export default getPlanets;
