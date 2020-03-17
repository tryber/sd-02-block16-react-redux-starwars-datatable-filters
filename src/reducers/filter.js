
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
  order: {
    name: '',
    asc: '',
  },
};

const types = ['FilterByName', 'InputNumber', 'FilterByCondition', 'add', 'delete'];

export default (state = INITIAL_STATE, action) => {
  function returnState() {
    console.log(action)
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
        ...state.order,
      },
    };
  }

  return state;
};
