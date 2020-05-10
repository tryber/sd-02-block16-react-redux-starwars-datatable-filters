import * as types from '../store/actionTypes';
import orderState from './orderState';

export default function reduce(state = orderState, action) {
  switch (action.type) {
    case types.SET_INITIAL_ORDER:
      return {
        ...state,
        filters: [
          {
            column: 'name',
            order: 'ASC',
          },
        ],
      };
    case types.SET_NEW_ORDER:
      return {
        ...state,
        filters: [
          {
            column: action.name,
            order: action.newOrder,
          },
        ],
      };
    case types.REMOVE_ORDER:
      return {
        filters: [{
          column: 'Coluna',
          order: 'Ordem',
        }],
      };
    default: return state;
  }
}
