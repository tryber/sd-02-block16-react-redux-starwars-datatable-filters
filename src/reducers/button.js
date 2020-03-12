const id = (new Date()).toString();

const INITIAL_STATE = {
  filters_comp: [id],
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'btnAdd') {
    return { ...state, filters_comp: [...state.filters_comp, action.value] };
  }
  return state;
};
