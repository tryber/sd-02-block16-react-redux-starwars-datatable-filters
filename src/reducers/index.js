import { combineReducers } from 'redux';

import loadReducer from './loadReducer';
import dropSelecReducer from './dropSelecReducer';

const rootReducer = combineReducers({
  loadReducer,
  dropSelecReducer,
});

export default rootReducer;
