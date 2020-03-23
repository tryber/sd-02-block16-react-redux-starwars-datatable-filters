export const NAME_INPUT = 'NAME_INPUT';
export const COLUMN_OPTION = 'COLUMN_OPTION';
// export const DELETE_OPTION = 'DELETE_OPTION';

const filterAll = (name, data, column, comparison, value) => {
  const filtered = name ? data.filter((planet) => planet.name.toLowerCase().match(name)) : data;
  switch (comparison) {
    case 'Maior que':
      return filtered.filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10));
    case 'Menor que':
      return filtered.filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10));
    case 'Igual a':
      return filtered.filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10));
    default: return filtered;
  }
};

export const filterByName = (name, data, filters) => {
  const [, ...rest] = filters;
  let filteredResults = data;
  if (rest.length) {
    rest.forEach(({
      numericValues: {
        column,
        comparison,
        value,
      },
    }) => {
      filteredResults = filterAll(name, filteredResults, column, comparison, value);
    });
  } else {
    filteredResults = filterAll(name, data);
  }
  return {
    type: NAME_INPUT,
    name,
    filteredData: filteredResults,
  };
};

export const filterByColumn = (name, data, column, comparison, value, filters, filteredData) => {
  const [, ...rest] = filters;
  let filteredResults = [];
  if (rest.length) {
    filteredResults = filterAll(name, filteredData, column, comparison, value);
  } else {
    filteredResults = filterAll(name, data, column, comparison, value);
  }
  return {
    type: COLUMN_OPTION,
    numericValues: {
      column,
      comparison,
      value,
    },
    filteredData: filteredResults,
  };
};

// export const deleteFilters = (data, column, filters) => {
//   const [name, ...rest] = filters;
//   const filteredFilters = rest.filter(({ numericValues }) => numericValues.column !== column);
//   console.log(filteredFilters)
//   let filteredResults = data;
//   if (filteredFilters.length) {
//     filteredFilters.forEach(({
//       numericValues,
//     }) => {
//       filteredResults = filterAll(
//         name.name,
//         data,
//         numericValues.column,
//         numericValues.comparison,
//         numericValues.value,
//       );
//     });
//   } else {
//     filteredResults = filterAll(name.name, data);
//   }
//   return {
//     type: DELETE_OPTION,
//     numericValues: filteredFilters,
//     filteredData: filteredResults,
//   };
// };
