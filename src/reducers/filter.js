
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
  if (action.type === 'FilterByName' || action.type === 'InputNumber' || action.type === 'FilterByCondition') {
    const filters = [...action.filters];
    return {
      ...state, filters,
    };
  }

  if (action.type === 'add' || action.type === 'delete') {
    const filters = [...action.filters];
    return {
      ...state, filters,
    };
  }

  return state;
};
