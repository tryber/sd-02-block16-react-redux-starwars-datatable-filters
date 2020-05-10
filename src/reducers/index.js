import { combineReducers } from 'redux';

import loadReducer from './loadReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  loadReducer,
  orderReducer,
});

export default rootReducer;
