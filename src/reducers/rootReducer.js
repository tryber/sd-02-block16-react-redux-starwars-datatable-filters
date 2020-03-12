import { combineReducers } from 'redux';

import filterByName from './filterByName';
import planetFetcher from './planetFetcher';
import filterByNumericValue from './filterByNumericValue';

const rootReducer = () => combineReducers({
  filterByName,
  planetFetcher,
  filterByNumericValue,
});

export default rootReducer;
