import React, { Component } from 'react';
import { connect } from 'react-redux';
import { node } from 'prop-types';

function acertaTitulo(aaa) {
  const palavras = aaa.split('_');
  const palavrasCapitalizadas = palavras.map(palavra => `${palavra[0].toUpperCase()}${palavra.substr(1)}`);
  const titulo = palavrasCapitalizadas.join(' ');
  return titulo;
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
  if (value === '') {
    return data;
  }
  const newData = data.reduce((acc, current) => {
    if (current[column] === 'unknown') {
      return acc;
    }
    if (window.eval(`${current[column]} ${comparison} ${value}`)) {
      return [...acc, current];
    }
    return acc;
  }, []);

  // if (newData.length === 0) {
  //   return [{}];
  // }

  return newData;
}

function filterData(data, name, column, comparison, value) {
  return filterDataByName(filterDataByNumericValues(data, column, comparison, value), name);
}

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, name, column, comparison, value } = this.props;
    const dataTable = filterData(data, name, column, comparison, value);
    //dataTable = filterDataByNumericValues(data, column, comparison, value);

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
                {valuesTable.map(value => {
                  if (Array.isArray(value)) {
                  return <td>{value.map(item => <div>{item}</div>)}</td>;
                  }
                  return <td>{value}</td>;
                })}
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  name: state.filters[0].name,
  column: state.filters[1].numericValues.column,
  comparison: state.filters[1].numericValues.comparison,
  value: state.filters[1].numericValues.value,
});

export default connect(mapStateToProps)(Table);
