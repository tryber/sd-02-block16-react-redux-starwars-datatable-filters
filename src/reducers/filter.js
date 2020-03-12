
const INITIAL_STATE = {
  filters: [
    {
      numericValues: {
        name: 'population',
        condition: 'all',
        input: undefined,
      },
    },
  ],
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'FilterByName') {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.id]: {
          ...state.filters[action.id],
          numericValues: {
            ...state.filters[action.id].numericValues,
            name: action.filter,
          },
        },
      },
    };
  }
  if (action.type === 'FilterByCondition') {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.id]: {
          ...state.filters[action.id],
          numericValues: {
            ...state.filters[action.id].numericValues,
            condition: action.filter,
          },
        },
      },
    };
  }
  if (action.type === 'InputNumber') {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.id]: {
          ...state.filters[action.id],
          numericValues: {
            ...state.filters[action.id].numericValues,
            input: action.filter,
          },
        },
      },
    };
  }
  return state;
};
