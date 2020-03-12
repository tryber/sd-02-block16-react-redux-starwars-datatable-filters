import {
  REQUEST_SW_PLANETS,
  REQUEST_SW_PLANETS_SUCCESS,
  REQUEST_SW_PLANETS_FAILURE,
} from '../actions';

const INITIAL_SW_PLANETS_STATE = {
  isFetching: true,
  results: [],
  error: '',
  filters: [
    {
      name: '',
    },
  ],
};

const data = (state = INITIAL_SW_PLANETS_STATE, action) => {
  switch (action.type) {
    case REQUEST_SW_PLANETS:
      return {
        ...state,
        isFetching: true,
      };
    case REQUEST_SW_PLANETS_SUCCESS:
      return {
        ...state,
        results: action.results,
        isFetching: false,
      };
    case REQUEST_SW_PLANETS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    // case OTHER_FILTERS:
    //   return {
    //     ...state,
    //     results: numFilters(),
    //   };
    default:
      return state;
  }
};

export default data;
