
const INITIAL_STATE = {
  filters: [
    {
      name: '',
    },
    {
      column: 'name',
      order: 'ASC',
    },
    {
      numericValues: {
        name: 'population',
        condition: 'maior',
        input: '',
      },
    },
  ],
};

const types = [
  'FilterByName',
  'InputNumber',
  'FilterByCondition',
  'add',
  'delete',
  'Name',
  'Order',
];

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

  return state;
};
