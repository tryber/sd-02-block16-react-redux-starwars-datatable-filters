import { combineReducers } from 'redux';
import data from './data';
import filter from './filter';

const rootReducer = combineReducers({
  data,
  filter,
});

export default rootReducer;
