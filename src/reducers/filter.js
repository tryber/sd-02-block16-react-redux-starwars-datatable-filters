
const INITIAL_STATE = {
  filters: [
    {
      name: '',
    },
    {
      numericValues: {
        name: 'population',
        condition: 'maior',
        input: undefined,
      },
    },
  ],
  order: {
    name: '',
    asc: '',
  },
};

const types = ['FilterByName', 'InputNumber', 'FilterByCondition', 'add', 'delete', 'Name'];

export default (state = INITIAL_STATE, action) => {
  function returnState() {
    const filters = [...action.filters];
    return {
      ...state, filters,
    };
  }

  if (types.some((type) => action.type === type)) {
    return returnState();
  }

  if (action.type === 'Order') {
    return {
      ...state,
      order: {
        ...state.action,
        ...action.order,
      },
    };
  }

  return state;
};
