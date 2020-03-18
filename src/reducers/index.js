import { combineReducers } from 'redux';
import showPlanetsReducer from './showPlanetsReducer';

const rootReducer = combineReducers({
  showPlanetsReducer,
});

export default rootReducer;
