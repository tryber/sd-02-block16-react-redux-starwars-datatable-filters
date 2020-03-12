import { combineReducers } from 'redux';
import data from './data';
import filter from './filter';
import input from './input';
import button from './button';

const rootReducer = combineReducers({
  data,
  filter,
  input,
  button,
});

export default rootReducer;
