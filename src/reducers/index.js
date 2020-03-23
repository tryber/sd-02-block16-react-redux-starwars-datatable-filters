import { combineReducers } from 'redux';
import planetsData from './planetsData';
import planetsFilters from './planetsFilters';

const rootReducer = combineReducers({
  planetsData,
  planetsFilters,
});

export default rootReducer;
