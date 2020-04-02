import * as types from '../store/actions/actionTypes';

const INICIAL_STATE = {
  data: [],
  wasFetched: false,
};

export default function reduce(state = INICIAL_STATE, action) {
  switch (action.type) {
    case types.GET_PLANET:
      return { ...state, data: action.data, wasFetched: true };
    default:
      return state;
  }
}
