const defaultState = {
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

const store = (state = defaultState, action) => {
  switch (action.type) {
    case 'FilterNumber':
      return {
        ...state,
        filters: [...state.filters, {
          numericValues: {
            column: action.obj.column,
            comparison: action.obj.comparison,
            value: action.obj.value,
          },
        }],
      };
    default: return state;
  }
};
export default store;
