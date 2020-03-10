const defaultState = {
  data: [],
  error: '',
};

const data = (state = defaultState, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        data: action.results,
      };
    case 'FAILURE':
      return {
        error: action.error,
      };
    default: return state;
  }
};
export default data;
