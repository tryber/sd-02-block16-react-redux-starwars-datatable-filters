const INITIAL_STATE = {
  value: 'all',
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'filter') return { value: action.filter };
  return state;
};
