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
function criaObj({ column, comparison, value }) {
  return {
    numericValues: {
      column,
      comparison,
      value,
    },
  };
}
const store = (state = defaultState, action) => {
  switch (action.type) {
    case 'FilterNumber':
      return (state.filters[0].numericValues.column === '') ? {
        arrayFilter: action.arrayFilter,
        filters: [criaObj(action.obj)],
      }
        : {
          arrayFilter: action.arrayFilter,
          filters: [...state.filters, criaObj(action.obj)],
        };
    default: return state;
  }
};
export default store;
