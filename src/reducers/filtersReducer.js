const INITIAL_STATE = [
  { name: '' },
];

const filtersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'DIGITACAO':
      return state.map((filtro, index) => (
        index !== 0 ? filtro : { name: action.texto }
      ));
    case 'ADICIONAR_FILTRO':
      return [...state, { numericValues: action.valoresNumericos }];
    default:
      return state;
  }
};

export default filtersReducer;
