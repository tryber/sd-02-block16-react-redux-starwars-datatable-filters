import { combineReducers } from 'redux';
import data from './dataReducer';
import filters from './filtersReducer';
import sort from './sortReducer';

const rootReducer = combineReducers({
  data,
  filters,
  sort,
});

export default rootReducer;
