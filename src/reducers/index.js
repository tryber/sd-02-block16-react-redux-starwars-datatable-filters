import { combineReducers } from 'redux';
import planetReducer from './planetReducer';
import wordReducer from './wordReducer';

const rootReducer = combineReducers({
  planetReducer,
  wordReducer,
});

export default rootReducer;
