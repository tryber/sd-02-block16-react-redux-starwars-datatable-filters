import { combineReducers } from 'redux';
import APIreducer from './APIreducer';
import textReducer from './filterReducer';
import dropdownReducer from './dropdownReducer';

const rootReducer = combineReducers({
  APIreducer,
  textReducer,
  dropdownReducer,
});

export default rootReducer;
