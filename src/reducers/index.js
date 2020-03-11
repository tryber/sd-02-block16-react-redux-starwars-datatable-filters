import { combineReducers } from 'redux';
import returnInitialAPI from './returnInitialAPI';
import returnFilterData from './returnFilterData';

const rootReducer = combineReducers({
  returnInitialAPI,
  returnFilterData,
});

export default rootReducer;
