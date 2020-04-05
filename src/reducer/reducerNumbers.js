import * as types from '../store/actions/actionTypes';

const INICIAL_STATE = {
  filters: [
    {
      numericValues: {
        column: '',
        comparison: '',
        value: '',
      },
    },
  ],
};

export default function reduce(state = INICIAL_STATE, action) {
  const { column, comparison, value } = action;
  switch (action.type) {
    case types.ADD_FILTER:
      return {
        filters: (state.filters[0].numericValues.column === '')
          ? [{
            numericValues: { column, comparison, value },
          }]
          : [...state.filters, {
            numericValues: { column, comparison, value },
          }],
      };
    case types.REMOVE_FILTER:
      { const removed = [...state.filters];
      removed.splice(action.index, 1);
      return {
        filters: (state.filters.length === 1)
          ? [{
            numericValues: { column: '', comparison: '', value: '' },
          }]
          : [...removed],
      };
    }
    default:
      return state;
  }
}
