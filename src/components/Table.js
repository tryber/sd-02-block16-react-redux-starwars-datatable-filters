import React, { Component } from 'react';
import { connect } from 'react-redux';
import { node } from 'prop-types';

function acertaTitulo(aaa) {
  const palavras = aaa.split('_');
  const palavrasCapitalizadas = palavras.map(palavra => `${palavra[0].toUpperCase()}${palavra.substr(1)}`);
  const titulo = palavrasCapitalizadas.join(' ');
  return titulo;
}

function comparaValores(arg1, arg2, comparison) {
  switch (comparison) {
    case '>':
      return arg1 > arg2;
    case '<':
      return arg1 < arg2;
    case '===':
      return arg1 === arg2;
    default:
      return false;
  }
}

function filterDataByName(data, name) {
  const newData = data.reduce((acc, current) => {
    if (current.name.includes(name)) {
      return [...acc, current];
    }
    return acc;
  }, []);

  if (newData.length === 0) {
    return [{}];
  }

  return newData;
}

function filterDataByNumericValues(data, column, comparison, value) {
  if (value === '') {  //provavelmente mudar aqui
    return data;
  }
  const newData = data.reduce((acc, current) => {
    if (current[column] === 'unknown') {
      return acc;
    }
    if (comparaValores(Number(current[column]), Number(value), comparison)) {
      return [...acc, current];
    }
    return acc;
  }, []);

  // if (newData.length === 0) {
  //   return [{}];
  // }

  return newData;
}

// function filterData(data, name, column, comparison, value) {
//   return filterDataByName(filterDataByNumericValues(data, column, comparison, value), name);
// }

class Table extends Component {
  constructor(props) {
    super(props);
  }

  filterData() {
    const { data, name, column, comparison, value, arrayValues, arrayColumns } = this.props;

    let newData = data;
    for (let i = 0; i < arrayColumns.length; i += 1) {
      newData = filterDataByNumericValues(newData, this.props[`valueSelectedColumn${i + 1}`], this.props[`valueSelectedComparison${i + 1}`], this.props[`valueNumber${i + 1}`]);
    }

    return filterDataByName(newData, name);
  }

  render() {
    const { data, name, column, comparison, value } = this.props;
    //let dataTable = filterData(data, name, column, comparison, value);
    //dataTable = filterDataByNumericValues(data, column, comparison, value);
    const dataTable = this.filterData();

    console.log('o novo data é', dataTable)
    const keysPlanet = Object.keys(dataTable[0]);
    const indexResidents = keysPlanet.indexOf('residents');
    const keysTable = keysPlanet.slice(0, indexResidents).concat(keysPlanet.slice(indexResidents + 1));
    return (
      <div>
        <table>
          <tr>
            {keysTable.map(key => <th>{acertaTitulo(key)}</th>)}
          </tr>
          {dataTable.map((planet) => {
            const valuesPlanet = Object.values(planet);
            const valuesTable = valuesPlanet.slice(0, indexResidents).concat(valuesPlanet.slice(indexResidents + 1));
            return (
              <tr>
                {valuesTable.map(valueColumn => {
                  if (Array.isArray(valueColumn)) {
                  return <td>{valueColumn.map(item => <div>{item}</div>)}</td>;
                  }
                  return <td>{valueColumn}</td>;
                })}
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const objectStates = state.filters.slice(1).reduce((acc, current, i) => ({
    ...acc,
    [`valueSelectedColumn${i + 1}`]: current.numericValues.column,
    [`valueSelectedComparison${i + 1}`]: current.numericValues.comparison,
    [`valueNumber${i + 1}`]: current.numericValues.value,
  }), {});
  const arrayValues = state.filters.slice(1).map(item => item.numericValues.value );
  const arrayColumns = state.filters.slice(1).map(item => item.numericValues.column);

  return { ...objectStates, data: state.data, name: state.filters[0].name, arrayColumns, arrayValues }
  // column: state.filters[1].numericValues.column,
  // comparison: state.filters[1].numericValues.comparison,
  // value: state.filters[1].numericValues.value,
};

export default connect(mapStateToProps)(Table);
