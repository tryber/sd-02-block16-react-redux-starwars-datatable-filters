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
    case types.ADD_FILTER:
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
    case types.REMOVE_FILTER:
      const teste = [...state.filters];
      teste.splice(action.index, 0);
      return {
        filters: (state.filters.length === 1)
          ? [{
            numericValues: {
              column: '', comparison: '', value: '',
            },
          }]
          : [...teste],
      };
    default:
      return state;
  }
}
