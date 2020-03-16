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
  const newData = data.filter((item) => item.name.toUpperCase().includes(name.toUpperCase()));

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
  constructor(props) {
    super(props);
    this.sortArray = this.sortArray.bind(this);
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

  sortArray(obj1, obj2) {
    const { columnToBeSorted, order } = this.props;
    if (obj1[columnToBeSorted] === 'unknown' && obj2[columnToBeSorted] ==='unknown') return 0;
    if (obj1[columnToBeSorted] === 'unknown') return 1;
    if (obj2[columnToBeSorted] === 'unknown') return -1;
    if (Number(obj1[columnToBeSorted]) === Number(obj2[columnToBeSorted])) return 0;
    if (Number(obj1[columnToBeSorted]) > Number(obj2[columnToBeSorted]) && order === 'ASC') return 1;
    if (Number(obj1[columnToBeSorted]) < Number(obj2[columnToBeSorted]) && order === 'DESC') return 1;
    return -1;
  }

  filterAndSortData() {
    const { columnToBeSorted, order } = this.props;
    const filteredData = this.filterData();

    if (columnToBeSorted === 'name') {
      const filteredColumns = filteredData.map((object) => object[columnToBeSorted]);
      filteredColumns.sort();
      const sortedData = filteredColumns.map((column) => {
        return filteredData.find((object) => object[columnToBeSorted] === column);
      });

      if (order === 'DESC') {
        sortedData.reverse();
      }
  
      return sortedData;
    }

    filteredData.sort(this.sortArray);
    return filteredData;
    // newColumns.sort();
    //   // newColumns = newColumns.map((column) => Number(column))
    //   // newColumns.sort((a,b) => Number(a) - Number(b))
    // }

    // const sortedData = newColumns.map((column) => {
    //   return filteredData.find((object) => object[columnToBeSorted] === column);
    // });

    // if (order === 'DESC') {
    //   sortedData.reverse();
    // }

    // return sortedData;
  }

  render() {
    const dataTable = this.filterAndSortData();
    let keysPlanet = Object.keys(dataTable[0]);
    const indexResidents = keysPlanet.indexOf('residents');
    keysPlanet = keysPlanet.slice(0, indexResidents);

    return (
      <div>
        <table>
          <thead>
            <tr>
              {keysPlanet.map((key) => <th key={key}>{acertaTexto(key)}</th>)}
            </tr>
          </thead>
          <tbody>
            {dataTable.map((planet) => {
              let valuesPlanet = Object.values(planet);
              valuesPlanet = valuesPlanet.slice(0, indexResidents);
              return (
                <tr key={planet.name}>
                  {valuesPlanet.map((valueColumn) => <td key={valueColumn}>{valueColumn}</td>)}
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
  const columnToBeSorted = state.sorting.column;
  const order = state.sorting.order;
  const arrayColumns = state.filters.slice(1).map((item) => item.numericValues.column);
  const objectStates = state.filters.slice(1).reduce((acc, current, i) => ({
    ...acc,
    [`valueSelectedColumn${i + 1}`]: current.numericValues.column,
    [`valueSelectedComparison${i + 1}`]: current.numericValues.comparison,
    [`valueNumber${i + 1}`]: current.numericValues.value,
  }), {});

  return { ...objectStates, data, name, columnToBeSorted, order, arrayColumns };
};

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(fetchAPI()),
});

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  columnToBeSorted: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  arrayColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  getData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
