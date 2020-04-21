import { combineReducers } from 'redux';
import data from './APIReducer';

const rootReducer = combineReducers({
  data,
});

export default rootReducer;
