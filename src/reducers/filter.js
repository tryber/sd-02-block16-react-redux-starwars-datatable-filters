
const INITIAL_STATE = {
  filters: [
    {
      numericValues: {
        name: 'population',
        condition: 'maior',
        input: 2000,
      },
    },
  ],
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'FilterByName' || action.type === 'FilterByCondition' || action.type === 'InputNumber') {
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
  // if (action.type === 'FilterByCondition') {
  //   return {
  //     ...state,
  //     filters: {
  //       ...state.filters,
  //       [action.id]: {
  //         ...state.filters[action.id],
  //         numericValues: {
  //           ...state.filters[action.id].numericValues,
  //           condition: action.filter,
  //         },
  //       },
  //     },
  //   };
  // }
  // if (action.type === 'InputNumber') {
  //   return {
  //     ...state,
  //     filters: {
  //       ...state.filters,
  //       [action.id]: {
  //         ...state.filters[action.id],
  //         numericValues: {
  //           ...state.filters[action.id].numericValues,
  //           input: action.filter,
  //         },
  //       },
  //     },
  //   };
  // }
  return state;
};
