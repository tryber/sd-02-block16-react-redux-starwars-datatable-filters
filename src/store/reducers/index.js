import { combineReducers } from 'redux';
import reducerPlanets from './planets';

const rootReducer = combineReducers({
  reducerPlanets,
});

export default rootReducer;
