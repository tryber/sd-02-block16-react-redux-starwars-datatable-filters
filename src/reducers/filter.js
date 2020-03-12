
const INITIAL_STATE = {
  filters: [
    {
      numericValues: {
        name: 'population',
        condition: 'maior',
        input: undefined,
      },
    },
  ],
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'FilterByName') {
    const filters = [...action.filters];
    return {
      ...state, filters,
    };
  }

  if (action.type === 'InputNumber') {
    const filters = [...action.filters];
    return {
      ...state, filters,
    };
  }

  if (action.type === 'FilterByCondition') {
    const filters = [...action.filters];
    return {
      ...state, filters,
    };
  }

  if (action.type === 'add') {
    const filters = [...action.filters];
    return {
      ...state, filters,
    };
  }

  if (action.type === 'delete') {
    const filters = [...action.filters];
    return {
      ...state, filters,
    };
  }
  return state;
};
