import * as types from '../store/actionTypes';

const initialState = {
  data: [],
  dataMock: [],
  onLoad: false,
  error: '',
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
    case types.RESULT_TRUE:
      return {
        ...state,
        onLoad: true,
        data: action.data,
        dataMock: action.data,
      };
    case types.RESULT_FALSE:
      return {
        ...state,
        onLoad: false,
        error: action.error,
      };
    case types.RESULT_PLANET:
      return {
        ...state,
        dataMock: action.dataMock,
        filters: action.filters,
      };
      case types.RESULT_FILTER_TYPE:
        return {
          ...state,
          dataMock: action.dataMock,
          filters: [
            ...state.filters,
            { numericValues: action.numericValues },
          ],
        };
    default:
      return state;
  }
}
