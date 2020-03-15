const defaultState = {
  data: [],
  error: '',
  loading: true,
  filters: [
    {
      name: '',
    },
  ],
};

const store = (state = defaultState, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return { ...state, data: action.results, loading: false };
    case 'FAILURE':
      return { error: action.error };
    case 'NAMEFILTER':
      return {
        ...state, filters: [{ name: action.name }],
      };
    default: return state;
  }
};
export default store;
