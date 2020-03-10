import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const REQUEST_PLANETS = 'REQUEST_PLANETS';
export const RECEIVE_PLANETS = 'RECEIVE_PLANETS';

const initialState = { data: [] };

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_PLANETS:
      console.log(action);
      return state;
    case RECEIVE_PLANETS:
      console.log(action);
      return { data: action.planets };
    default: return state;
  }
}

export const store = createStore(reducer, applyMiddleware(thunk));
