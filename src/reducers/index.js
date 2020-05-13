import { combineReducers } from 'redux';
import data from './data';
import filter from './filter';
import input from './input';
import filterByName from './filterByName';

const rootReducer = combineReducers({
  data,
  filter,
  input,
  filterByName,
});

export default rootReducer;
