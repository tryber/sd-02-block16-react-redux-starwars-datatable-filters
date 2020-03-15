import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchAPI from '../actions/fetchAPI';

export function acertaTexto(texto) {
  const palavras = texto.split('_');
  const palavrasCapitalizadas = palavras.map((palavra) => `${palavra[0].toUpperCase()}${palavra.substr(1)}`);
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
  const newData = data.filter((item) => item.name.includes(name));

  if (newData.length === 0) {
    return [{}];
  }

  return newData;
}

function filterDataByNumericValues(data, column, comparison, value) {
  if (value === '' || column === '') {
    return data;
  }

  const newData = data.filter((item) => (
    !(item[column] === 'unknown') && comparaValores(Number(item[column]), Number(value), comparison)),
  );

  return newData;
}

class Table extends Component {
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
    let keysPlanet = Object.keys(dataTable[0]);
    const indexResidents = keysPlanet.indexOf('residents');
    keysPlanet = keysPlanet.slice(0, indexResidents);

    return (
      <div>
        <table>
          <thead>
            <tr>
              {keysPlanet.map((key, i) => <th key={`${key}${i}`}>{acertaTexto(key)}</th>)}
            </tr>
          </thead>
          <tbody>
            {dataTable.map((planet, i) => {
              let valuesPlanet = Object.values(planet);
              valuesPlanet = valuesPlanet.slice(0, indexResidents);
              return (
                <tr key={`${planet}${i}`}>
                  {valuesPlanet.map((valueColumn, i) => <td key={`${valueColumn}${i}`}>{valueColumn}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const data = state.data;
  const name = state.filters[0].name;
  const arrayColumns = state.filters.slice(1).map((item) => item.numericValues.column);
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

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  arrayColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  getData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
