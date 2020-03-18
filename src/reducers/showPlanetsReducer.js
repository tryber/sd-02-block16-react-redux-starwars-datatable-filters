import { GET_SW_PLANETS_ACTION, GET_SW_PLANETS_SUCCESS, GET_SW_PLANETS_FAILURE } from '../actions';

const initialState = {
  fetching: true,
};

const showPlanetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SW_PLANETS_ACTION:
      return {
        ...state,
        fetching: true,
      };
    case GET_SW_PLANETS_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.data,
      };
    case GET_SW_PLANETS_FAILURE:
      return {
        ...state,
        error: action.error,
        fetching: false,
      };
    default: return state;
  }
};

export default showPlanetsReducer;
