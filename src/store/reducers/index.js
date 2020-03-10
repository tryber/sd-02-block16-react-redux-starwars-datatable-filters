import { combineReducers } from 'redux';
import data from './apiReducers';

const rootReducer = combineReducers({
  data,
});

export default rootReducer;
