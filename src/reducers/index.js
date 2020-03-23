import { combineReducers } from 'redux';
import planets from './Planets';
import filters from './Filters';
import sort from './Sort';

const rootReducer = combineReducers({
  planets,
  filters,
  sort,
});

export default rootReducer;
