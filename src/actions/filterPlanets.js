export const NAME_INPUT = 'NAME_INPUT';
export const COLUMN_OPTION = 'COLUMN';

const filter = (name, data, column, comparison, value) => {
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
  let filteredResults = [];
  if (rest.length) {
    [filteredResults] = rest.map(({
      numericValues: {
        column,
        comparison,
        value,
      },
    }) => filter(name, data, column, comparison, value));
  } else {
    filteredResults = filter(name, data);
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
    filteredResults = filter(name, filteredData, column, comparison, value);
  } else {
    filteredResults = filter(name, data, column, comparison, value);
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

// export const deleteFilter = (name, data, column, comparison, value, filters, filteredData) => {

// }
