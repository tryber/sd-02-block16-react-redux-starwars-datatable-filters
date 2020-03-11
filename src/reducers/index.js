import { combineReducers } from 'redux';
import data from './data';
import SearchByName from './SearchByName';

const rootReducer = combineReducers({
  data,
  SearchByName,
});

export default rootReducer;
