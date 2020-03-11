const INITIAL_STATE = {
  value: 0,
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'Input') return { value: action.input };
  return state;
};
