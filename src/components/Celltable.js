import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CellFiltered from './CellFiltered';

class Celltable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDrop: ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    };
  }
  
  static updateSortNumbers(dataMock, column, order, arrDrop) {
    if (arrDrop.includes(column)) {
      if (order === 'ASC') {
        dataMock.sort((a, b) => Number(a[column]) > Number(b[column]) ? 1 : -1);
      }
      if (order === 'DESC') {
        dataMock.sort((a, b) => Number(a[column]) < Number(b[column]) ? 1 : -1);
      }
    }
  }

  static updateSortStrings(dataMock, column, order, arrDrop) {
    if (!arrDrop.includes(column)) {
      if (order === 'ASC') {
        dataMock.sort((a, b) => a[column] > b[column] ? 1 : -1);
      }
      if (order === 'DESC') {
        dataMock.sort((a, b) => a[column] < b[column] ? 1 : -1);
      }
    }
  }

  render() {
    const { dataMock, dataMockFilterOn, orderReducer: { filters } } = this.props;
    const { arrDrop } = this.state;
    const columnFilter = [filters[0].column, filters[0].order];
    Celltable.updateSortNumbers(dataMock, columnFilter[0], columnFilter[1], arrDrop);
    Celltable.updateSortStrings(dataMock, columnFilter[0], columnFilter[1], arrDrop);
    if (dataMockFilterOn) {
      return (<CellFiltered columnsNum={arrDrop} />);
    }
    return (
      dataMock.map((result) => (
        <tbody key={result.name}>
          <tr>
            {Object.values(result).map((item, index) => {
              if (index !== 9) {
                return (
                  <td key={item}>{item}</td>
                );
              }
              return null;
            })}
          </tr>
        </tbody>
      ))
    );
  }
}

const mapStateToProps = ({
  loadReducer: { dataMock, dataMockFilterOn }, orderReducer }) => ({
    dataMock, dataMockFilterOn, orderReducer,
  });

export default connect(mapStateToProps)(Celltable);

Celltable.propTypes = {
  dataMock: PropTypes.instanceOf(Object).isRequired,
  dataMockFilterOn: PropTypes.bool.isRequired,
  orderReducer: PropTypes.instanceOf(Object).isRequired,
};
