import verifyCondition from './switchCases/conditionCase';

const dispatchFilters = (column, condition, value, data) => {
  const mappedMock = data.map((result) => {
    const filtered = (Object.keys(result).includes(column))
    && (verifyCondition(Number(result[column]), condition, Number(value)))
    ? result
    : undefined;
    return filtered;
  });
  const filteredWithoutUndefined = mappedMock.filter((element) => element !== undefined);
  return filteredWithoutUndefined;
};

export default dispatchFilters;
