const MAIOR_QUE = 'Maior que';
const MENOR_QUE = 'Menor que';
const IGUAL_A = 'Igual a';

const conditionCase = (info, condition, value) => {
  switch (condition) {
    case MAIOR_QUE:
      const moreThan = (value < info);
      return moreThan;
    case MENOR_QUE:
      const lessThan = (value > info);
      return lessThan;
    case IGUAL_A:
      const equalThan = (value === info);
      return equalThan;
    default:
      return undefined;
  };
}

export default conditionCase;
