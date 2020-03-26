import {
  REQUEST_SWAPI,
  REQUEST_SWAPI_SUCCESS,
  REQUEST_SWAPI_FAILURE,
} from '../actions';

const INITIAL_STATE = ({
  isFetching: false,
});

const returnInitialAPI = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_SWAPI:
      return {
        ...state,
        isFetching: true,
      };

    case REQUEST_SWAPI_SUCCESS:
      return {
        ...state,
        isFetching: false,
        planetsData: action.data.results,
        filteredData: action.data.results,
      };

    case REQUEST_SWAPI_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    default: return state;
  }
};

export default returnInitialAPI;
