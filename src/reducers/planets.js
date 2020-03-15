import {
  REQUEST_PLANETS,
  REQUEST_PLANETS_SUCCESS,
  REQUEST_PLANETS_FAILURE,
  CHANGE_FILTER,
} from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  data: [],
  filteredData: [],
  error: '',
};

const reducerPlanets = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_PLANETS:
      return {
        ...state,
        isFetching: true,
      };
    case REQUEST_PLANETS_SUCCESS:
      return {
        ...state,
        data: action.swAPIInfo,
        filteredData: action.filtered,
        isFetching: false,
      };
    case REQUEST_PLANETS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case CHANGE_FILTER: {
      return {
        ...state,
        filteredData: action.array,
      };
    }
    default: return state;
  }
};

export default reducerPlanets;
