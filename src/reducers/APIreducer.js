import { GET_PLANETS, GET_PLANETS_SUCCESS, GET_PLANETS_FAILURE } from '../actions/APIactions';

const initialState = {
  loading: true,
};

const APIreducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLANETS:
      return {
        ...state,
        loading: true,
      };
    case GET_PLANETS_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        data: action.data.results,
      };
    case GET_PLANETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default: return state;
  }
};

export default APIreducer;
