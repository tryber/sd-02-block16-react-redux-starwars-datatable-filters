const INITIAL_STATE = {
  column: 'name',
  order: 'ASC',
};

const sortReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ALTERAR_COLUNA_DE_ORDENAÇÃO':
      return { ...state, column: action.coluna };
    case 'ALTERAR_ORDEM_DE_ORDENAÇÃO':
      return { ...state, order: action.ordem };
    default:
      return state;
  }
};

export default sortReducer;
