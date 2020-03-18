import { combineReducers } from 'redux';
import showPlanetsReducer from './showPlanetsReducer';
import filterTextReducer from './filterTextReducer';

const rootReducer = combineReducers({
  showPlanetsReducer,
  filterTextReducer,
});

export default rootReducer;
