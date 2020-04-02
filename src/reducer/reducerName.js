import * as types from '../store/actions/actionTypes';

const INICIAL_STATE = {
  filters: [
    {
      name: '',
    },
  ],
};

export default function reduce(state = INICIAL_STATE, action) {
  switch (action.type) {
    case types.FILTER_NAME:
      return { filters: [{ name: action.name }] };
    default:
      return state;
  }
}
