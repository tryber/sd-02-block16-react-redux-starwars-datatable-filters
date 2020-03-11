import {
  REQUEST_PLANETS,
  REQUEST_PLANETS_SUCCESS,
  REQUEST_PLANETS_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  data: [],
  error: '',
  filters: [
    {
      name: '',
    },
    {
      numeric_values:
      {
        column: '',
        comparison: '',
        value: 0,
      },
    },
  ],
};

const reducerPlanets = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case REQUEST_PLANETS:
      return {
        ...state,
        isFetching: true,
      };
    case REQUEST_PLANETS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.swAPIInfo,
      };
    case REQUEST_PLANETS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default: return state;
  }
};

export default reducerPlanets;
