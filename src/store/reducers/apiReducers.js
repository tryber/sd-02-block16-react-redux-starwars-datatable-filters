const defaultState = {
  data: [],
  error: '',
  filters: [
    {
      name: '',
    },
  ],
};

const store = (state = defaultState, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        data: action.results,
      };
    case 'FAILURE':
      return {
        error: action.error,
      };
    case 'NAMEFILTER':
      return {
        ...state,
        filters: [{
          name: action.name,
        }],
      };
    default: return state;
  }
};
export default store;
