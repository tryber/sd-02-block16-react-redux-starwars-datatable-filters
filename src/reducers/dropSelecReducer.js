import * as types from '../store/actionTypes';

const initialState = {
  dataMock: [],
  dataMockOn: false,
  filters: [
    {
      name: '',
    },
    {
      numericValues: {
        column: '',
        condition: '',
        value: '',
      },
    },
  ],
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case types.RESULT_FILTER_TYPE:
      return {
        ...state,
        dataMock: action.dataMock,
        dataMockOn: true,
        filters: [
          ...state.filters,
          { numericValues: action.numericValues },
        ],
      };
    default:
      return state;
  }
}
