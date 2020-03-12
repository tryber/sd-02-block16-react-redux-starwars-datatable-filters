const INITIAL_STATE = {
  name: '',
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'InputName') return { ...state, name: action.value };
  return state;
};
