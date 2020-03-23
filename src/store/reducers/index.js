import { combineReducers } from 'redux';
import data from './APIreducers';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
  data,
  filterReducer,
});

export default rootReducer;
