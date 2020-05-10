import * as types from '../store/actionTypes';
import initialState from './initialState';

function resultTrue(state, action) {
  return {
    ...state,
    onLoad: true,
    data: action.data,
    dataMock: action.dataMock,
    dataMockFilter: action.dataMock,
    filters: [
      ...state.filters,
    ],
  };
}

function resultFalse(state, action) {
  return {
    ...state,
    onLoad: false,
    error: action.error,
  };
}

function resultPlanet(state, action) {
  return {
    ...state,
    dataMock: action.results,
    dataMockFilter: action.results,
    filters: [
      action.name,
      ...state.filters,
    ],
  };
}

function resultNumericValues(state, action) {
  return {
    ...state,
    dataMock: action.results,
    dataMockFilter: action.results,
    filters: action.numericValues,
  };
}

function resultPlanetFiltered(state, action) {
  return {
    ...state,
    dataMockFilter: action.results,
    filters: [
      action.name,
      ...state.filters,
    ],
  };
}

function resultAllFilters(state, action) {
  return {
    ...state,
    dataMock: action.results,
    dataMockFilter: action.results,
    dataMockFilterOn: action.dataMockFilterOn,
    filters: [
      ...state.filters,
      { numericValues: action.numericValues },
    ],
  };
}

function resultUpdateData(state, action) {
  return {
    ...state,
    dataMock: action.data,
    dataMockFilter: action.data,
  }
}

function resultTrueData(state, action) {
  return {
    ...state,
    dataMock: action.data,
    dataMockFilter: action.data,
  };
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case types.RESULT_TRUE:
      return resultTrue(state, action);
    case types.RESULT_TRUE_DATA:
      return resultTrueData(state, action);
    case types.RESULT_FALSE:
      return resultFalse(state, action);
    case types.RESULT_PLANET:
      return resultPlanet(state, action);
    case types.RESULT_NUMERIC_VALUES:
      return resultNumericValues(state, action);
    case types.RESULT_DATA_FILTERED:
      return resultPlanetFiltered(state, action);
    case types.RESULT_ALL_FILTERS:
      return resultAllFilters(state, action);
    case types.UPDATE_DATA:
      return resultUpdateData(state, action);
    default:
      return state;
  }
}
