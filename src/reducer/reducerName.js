import * as types from '../store/actions/actionTypes';

const INICIAL_STATE = {
  filters: [
    {
      name: '',
      column: 'Name',
      order: 'ASC',
    },
  ],
};

export default function reduce(state = INICIAL_STATE, action) {
  switch (action.type) {
    case types.FILTER_NAME:
      return { filters: [{ name: action.name }] };
    case types.FILTER_ASC_DES:
      return { filters: }
    default:
      return state;
  }
}
