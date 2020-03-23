import * as types from '../store/actionTypes';
import initialState from './initialState';

function resultTrue(state, action) {
  return {
    ...state,
    onLoad: true,
    data: action.data,
    dataMock: action.dataMock,
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
    dataMock: action.dataMock,
    dataMockFilter: action.dataMockFilter,
    filters: action.filters,
  };
}

function resultFilterType(state, action) {
  return {
    ...state,
    dataMock: action.dataMock,
    dataMockFilter: action.dataMockFilter,
    dataMockFilterOn: action.dataMockFilterOn,
    filters: [
      ...state.filters,
      { numericValues: action.numericValues },
    ],
  };
}

function resultDataFiltered(state, action) {
  return {
    ...state,
    dataMockFilter: action.dataMockFilter,
    filters: [
      ...state.filters,
      action.filters,
    ],
  };
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case types.RESULT_TRUE:
      return resultTrue(state, action);
    case types.RESULT_FALSE:
      return resultFalse(state, action);
    case types.RESULT_PLANET:
      return resultPlanet(state, action);
    case types.RESULT_FILTER_TYPE:
      return resultFilterType(state, action);
    case types.RESULT_DATA_FILTERED:
      return resultDataFiltered(state, action);
    default:
      return state;
  }
}
