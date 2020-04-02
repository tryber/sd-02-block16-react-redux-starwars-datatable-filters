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
        filters: (state.filters[0].numericValues.column === '')
          ? [{
            numericValues: {
              column: action.column, comparison: action.comparison, value: action.value,
            },
          }]
          : [...state.filters, {
            numericValues: {
              column: action.column, comparison: action.comparison, value: action.value,
            },
          }],
      };
    default:
      return state;
  }
}
