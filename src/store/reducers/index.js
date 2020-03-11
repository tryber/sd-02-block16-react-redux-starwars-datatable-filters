import { combineReducers } from 'redux';
import api from './apiReducers';
import filter from './filtersValues';

const rootReducer = combineReducers({
  api,
  filter,
});

export default rootReducer;
