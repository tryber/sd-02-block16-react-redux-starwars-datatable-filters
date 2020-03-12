const defaultState = {
  arrayFilter: ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
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
      return (state.filters[0].numericValues.column === '') ? {
        arrayFilter: action.arrayFilter,
        filters: [{
          numericValues: {
            column: action.obj.column,
            comparison: action.obj.comparison,
            value: action.obj.value,
          },
        }],
      }
        : {
          arrayFilter: action.arrayFilter,
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
