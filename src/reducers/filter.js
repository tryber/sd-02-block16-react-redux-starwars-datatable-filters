const INITIAL_STATE = {
  name: 'all',
  condition: 'all',
  input: undefined,
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'FilterByName') return { ...state, name: action.filter };
  if (action.type === 'FilterByCondition') return { ...state, condition: action.filter };
  if (action.type === 'Input') return { ...state, input: action.filter };
  return state;
};
