import { combineReducers } from 'redux';
import data from './swPlanets';
import selectors from './selectors';
import table from './table';

const rootReducer = combineReducers({
  data,
  selectors,
  table,
});

export default rootReducer;
