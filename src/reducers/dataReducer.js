export const REQUEST_PLANETS = 'REQUEST_PLANETS';
export const RECEIVE_PLANETS = 'RECEIVE_PLANETS';

const initialState = [{ name: '' }];

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PLANETS:
      return state;
    case RECEIVE_PLANETS:
      return action.planets;
    default:
      return state;
  }
};

export default dataReducer;
