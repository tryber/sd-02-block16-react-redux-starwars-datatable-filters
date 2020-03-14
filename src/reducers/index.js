import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import filtersReducer from './filtersReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  filters: filtersReducer,
});

export default rootReducer;
