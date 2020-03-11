import { combineReducers } from 'redux';
import data from './data';
import filter from './filter';
import input from './input';

const rootReducer = combineReducers({
  data,
  filter,
  input,
});

export default rootReducer;
