const INITIAL_STATE = {
  number: undefined,
  name: '',
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'InputNumber') return { ...state, number: action.value };
  if (action.type === 'InputName') return { ...state, name: action.value };
  return state;
};
