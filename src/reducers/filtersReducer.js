export const CHANGE_NAME_FILTER = 'CHANGE_NAME_FILTER';
export const CHANGE_NUMERIC_VALUES_FILTERS = 'CHANGE_NUMERIC_VALUES_FILTERS';
export const DELETE_NUMERIC_VALUES_FILTERS = 'DELETE_NUMERIC_VALUES_FILTERS';

const initialState = 
  [
    {
      name: '',
    },
    {
      numericValues: {
        column: '',
        comparison: '>',
        value: '',
      },
    },
  ];

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAME_FILTER:
      return [
          { name: action.value },
          ...state.slice(1),
        ];

    case CHANGE_NUMERIC_VALUES_FILTERS:
      state.splice(action.id, 1, {
        numericValues: {
          ...state[action.id].numericValues,
          [action.name]: action.value
        }
      });
      return state.concat(
        action.id === state.length - 1 && action.id < 5
          ? [{ numericValues: { column: '', comparison: '>', value: '' } }]
          : [],
      );

    case DELETE_NUMERIC_VALUES_FILTERS:
      return state.filter((item, index) => action.id !== index)
    default:
      return state;
  }
};

export default filtersReducer;
