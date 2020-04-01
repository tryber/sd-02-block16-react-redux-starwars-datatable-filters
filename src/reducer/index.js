import { combineReducers } from 'redux';
import reducerStar from './reducerStar';
import reducerFilter from './reducerFilter';

const rootReducer = combineReducers({
  reducerStar,
  reducerFilter,
});

export default rootReducer;
