export const GENERATE_FILTER = 'GENERATE_FILTER';

export const generateFilter = (chosenColumn, arrayColumns) => (
  {
    type: GENERATE_FILTER,
    chosenColumn,
    newColumns: arrayColumns.splice(arrayColumns.indexOf(chosenColumn), 1),
    numericValues: {},
  }
);
