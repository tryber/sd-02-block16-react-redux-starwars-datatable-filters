import { combineReducers } from 'redux';
import showPlanetsReducer from './showPlanetsReducer';
import filterTextReducer from './filterTextReducer';
import columnsReducer from './columnsReducer';

const rootReducer = combineReducers({
  showPlanetsReducer,
  filterTextReducer,
  columnsReducer,
});

export default rootReducer;
