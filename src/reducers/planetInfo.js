import { REQUEST_SW_DATA, RECEIVE_SW_DATA_SUCCESS, RECEIVE_SW_DATA_FAILURE } from '../actions';

const INITIAL_SW_LOADING_STATE = {
  loading: false,
};

const planetInfo = (state = INITIAL_SW_LOADING_STATE, action) => {
  switch (action.type) {
    case REQUEST_SW_DATA:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_SW_DATA_SUCCESS:
      return {
        ...state,
        type: RECEIVE_SW_DATA_SUCCESS,
        name: action.name,
        rotation_period: parseFloat(action.rotation_period),
        orbital_period: parseFloat(action.orbital_period),
        diameter: parseFloat(action.diameter),
        climate: action.climate,
        gravity: action.gravity,
        terrain: action.terrain,
        surface_water: parseFloat(action.surface_water),
        population: parseFloat(action.population),
        films: action.films,
        created: action.created,
        edited: action.edited,
        url: action.url,
        loading: false,
      };
    case RECEIVE_SW_DATA_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default: return state;
  }
};

export default planetInfo;


// REQUEST_SW_DATA = 'REQUEST_SW_DATA';
// export const RECEIVE_SW_DATA_SUCCESS = 'RECEIVE_SW_DATA_SUCCESS';
// export const RECEIVE_SW_DATA_FAILURE = 'RECEIVE_SW_DATA_FAILURE';