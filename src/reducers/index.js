import { combineReducers } from 'redux';
import data from './data';
import SearchFilters from './SearchFilters';

const rootReducer = combineReducers({
  data,
  SearchFilters,
});

export default rootReducer;
