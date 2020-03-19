import { combineReducers } from 'redux';
import filterByNumericValue from './filterByNumericValue';
import filterByName from './filterByName';
import planetFetcher from './planetFetcher';

export default function rootReducer() {
  return combineReducers({
    filterByName,
    filterByNumericValue,
    planetFetcher,
  });
}
