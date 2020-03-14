import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAPI from '../actions/fetchAPI';

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
  if (value === '' || column === '') {
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

  return newData;
}

class Table extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  filterData() {
    const { data, name, arrayColumns } = this.props;

    let newData = data;
    for (let i = 0; i < arrayColumns.length; i += 1) {
      newData = filterDataByNumericValues(newData, this.props[`valueSelectedColumn${i + 1}`], this.props[`valueSelectedComparison${i + 1}`], this.props[`valueNumber${i + 1}`]);
    }

    return filterDataByName(newData, name);
  }

  render() {
    const dataTable = this.filterData();
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
  const data = state.data;
  const name = state.filters[0].name;
  const arrayColumns = state.filters.slice(1).map(item => item.numericValues.column);
  const objectStates = state.filters.slice(1).reduce((acc, current, i) => ({
    ...acc,
    [`valueSelectedColumn${i + 1}`]: current.numericValues.column,
    [`valueSelectedComparison${i + 1}`]: current.numericValues.comparison,
    [`valueNumber${i + 1}`]: current.numericValues.value,
  }), {});

  return { ...objectStates, data, name, arrayColumns };
};

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(fetchAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
