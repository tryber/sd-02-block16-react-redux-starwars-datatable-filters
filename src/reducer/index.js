import { combineReducers } from 'redux';
import reducerData from './reducerData';
import reducerName from './reducerName';
import reducerNumbers from './reducerNumbers'

const rootReducer = combineReducers({
  reducerData,
  reducerName,
  reducerNumbers,
});

export default rootReducer;
