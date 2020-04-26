import { combineReducers } from 'redux';
import data from './dataReducer';
import filters from './filtersReducer';

const rootReducer = combineReducers({
  data,
  filters,
});

export default rootReducer;
