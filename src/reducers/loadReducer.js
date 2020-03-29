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
    filters: [
      {
        name: action.planet,
      },
    ],
  };
}

function resultFilterType(state, action) {
  return {
    ...state,
    dataMock: action.dataMock,
    dataMockFilter: action.dataMockFilter,
  };
}

function resultPlanetFiltered(state, action) {
  return {
    ...state,
    dataMockFilter: action.dataMockFilter,
    filters: [
      action.name,
      ...state.filters,
    ],
  };
}

function resultAllFilters(state, action) {
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
      return resultPlanetFiltered(state, action);
    case types.RESULT_ALL_FILTERS:
      return resultAllFilters(state, action);
    default:
      return state;
  }
}
