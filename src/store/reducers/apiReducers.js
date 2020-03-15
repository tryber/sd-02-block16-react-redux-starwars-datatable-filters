const defaultState = {
  data: [],
  error: '',
  loading: true,
  filters: [
    {
      column: 'name',
      order: 'ASC',
      name: '',
    },
  ],
};

function sortName({ order }, data, value) {
  if (order === 'ASC') {
    return (data.sort((elementoA, elementB) => ((elementoA[value])
      > (elementB[value]) ? 1
      : -1)));
  }
  return (data.sort((elementoA, elementB) => ((elementoA[value])
    < (elementB[value]) ? 1
    : -1)));
}

function sortAvaliable({ filters, data }, { value }) {
  let result = [];
  const arrAux = ['rotation_period', 'orbital_period', 'diameter', 'surface_water', 'population', 'created', 'edited'];
  if (filters[0].order === 'ASC' && (arrAux.some((ele) => ele === value))) {
    result = (data.sort((elementoA, elementB) => (Number(elementoA[value])
      > Number(elementB[value]) ? 1
      : -1)));
  } else if (filters[0].order === 'DESC' && (arrAux.some((ele) => ele === value))) {
    result = (data.sort((elementoA, elementB) => (Number(elementoA[value])
      < Number(elementB[value]) ? 1
      : -1)));
  } else {
    result = sortName(filters[0], data, value);
  }

  return result;
}

const store = (state = defaultState, action) => {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        ...state,
        data: action.results.sort((elementoA, elementB) => ((elementoA.name)
          > (elementB.name) ? 1
          : -1)),
        filters: [{ ...state.filters[0], order: 'DESC' }],
        loading: false,
      };
    }
    case 'FAILURE':
      return { error: action.error };
    case 'NAMEFILTER':
      return {
        ...state, filters: [{ name: action.name }],
      };
    case 'SORT': {
      const arr = sortAvaliable(state, action);
      const filt = state.filters[0];
      filt.order = (state.filters[0].order === 'ASC') ? 'DESC' : 'ASC';
      filt.column = action.value;
      return {
        ...state, data: arr, filters: [filt],
      };
    }
    default: return state;
  }
};
export default store;
