import { combineReducers } from 'redux';
import showPlanetsReducer from './showPlanetsReducer';
import filterTextReducer from './filterTextReducer';
import { columnsReducer, deleteReducer } from './columnsReducer';

const rootReducer = combineReducers({
  showPlanetsReducer,
  filterTextReducer,
  columnsReducer,
  deleteReducer,
});

export default rootReducer;
