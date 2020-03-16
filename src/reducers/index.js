import { combineReducers } from 'redux';

import loadReducer from './loadReducer';

const rootReducer = combineReducers({
  loadReducer,
});

export default rootReducer;
