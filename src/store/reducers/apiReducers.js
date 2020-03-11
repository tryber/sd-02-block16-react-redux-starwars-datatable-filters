const defaultState = {
  data: [],
  error: '',
  filters: [
    {
      name: '',
    },
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
    case 'SUCCESS':
      return { ...state, data: action.results };
    case 'FAILURE':
      return { error: action.error };
    case 'NAMEFILTER':
      return {
        ...state, filters: [{ name: action.name }],
      };
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
