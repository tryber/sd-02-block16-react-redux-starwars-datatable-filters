const INITIAL_STATE = {
  arrPlanetas: [],
  isLoading: false,
  error: null,
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'COMECAR_REQUISICAO':
      return {
        ...state,
        isLoading: true,
      };
    case 'SUCESSO_NA_API':
      return {
        ...state,
        isLoading: false,
        arrPlanetas: action.arrayPlanetas,
      };
    case 'ERRO_NA_API':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default dataReducer;
