const conditionCase = (info, condition, value) => {
  switch(condition) {
    case 'Maior que':
      const moreThan = (value < info);
      return moreThan;
    case 'Menor que':
      const lessThan = (value > info);
      return lessThan;
    case 'Igual a':
      const equalThan = (value === info);
      return equalThan;
    default:
      return undefined;
  }
}

export default conditionCase;
