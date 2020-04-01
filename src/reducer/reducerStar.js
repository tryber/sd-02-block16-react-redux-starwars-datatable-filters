import * as cases from '../store/actions/actionTypes';

const INICIAL_STATE = {
  data: [],
};

export default function reduce(state = INICIAL_STATE, action) {
  switch (action.type) {
    case cases.BANANA:
      return state;
    default:
      return state;
  }
}
