import { combineReducers } from 'redux';
import reducerPlanets from './planets';
import allFilters from './allFilters';

const rootReducer = combineReducers({
  reducerPlanets,
  allFilters,
});

export default rootReducer;
