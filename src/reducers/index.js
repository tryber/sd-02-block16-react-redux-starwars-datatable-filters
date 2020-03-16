import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import filtersReducer from './filtersReducer';
import sortingReducer from './sortingReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  filters: filtersReducer,
  sorting: sortingReducer,
});

export default rootReducer;
