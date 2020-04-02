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
  switch (action.type) {
    case types.FILTER_NUMBERS:
      return {
        filters: [{
          numericValues: {
            column: action.column, comparison: action.comparison, value: action.comparison,
          }
        }]
      };
    default:
      return state;
  }
}
