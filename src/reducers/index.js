import { combineReducers } from 'redux';
import planets from './planets';
import searchFilterReducer from './searchFilterReducer';

const rootReducer = combineReducers({
  planets,
  searchFilterReducer,
});

export default rootReducer;
