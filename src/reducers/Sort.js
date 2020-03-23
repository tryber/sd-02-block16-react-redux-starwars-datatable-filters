import {
  SORT_COLUMN,
} from '../actions';

const INITIAL_FILTER_STATE = {
  sortColumn: {
    column: 'name',
    order: 'ASC',
  },
};

const sort = (state = INITIAL_FILTER_STATE, action) => {
  let columnOrder = 'ASC';
  if (action.value === state.sortColumn.column) {
    columnOrder = (state.sortColumn.order === 'ASC') ? 'DESC' : 'ASC';
  }
  switch (action.type) {
    case SORT_COLUMN:
      return {
        ...state,
        sortColumn: {
          column: action.value,
          order: columnOrder,
        },
      };
    default:
      return state;
  }
};

export default sort;
