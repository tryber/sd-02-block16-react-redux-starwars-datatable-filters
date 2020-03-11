import { RECEIVE_SW_PLANETS, SHOW_SW_PLANETS, ERROR_SW_PLANETS } from '../actions';

const LOADING_SW_INFO = {
  isfetching: false,
};

const planetReducer = (state = LOADING_SW_INFO, action) => {
  switch (action.type) {
    case RECEIVE_SW_PLANETS:
      return {
        ...state,
        isfetching: true,
      };
    case SHOW_SW_PLANETS:
      return {
        ...state,
        isfetching: false,
        data: action.planets,
      };
    case ERROR_SW_PLANETS:
      return {
        ...state,
        error: action.error,
        isfetching: false,
      };
    default: return state;
  }
};

export default planetReducer;
