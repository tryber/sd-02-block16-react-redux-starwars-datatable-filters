import { combineReducers } from 'redux';
import APIreducer from './APIreducer';
import textReducer from './filterReducer';

const rootReducer = combineReducers({
  APIreducer,
  textReducer,
});

export default rootReducer;
