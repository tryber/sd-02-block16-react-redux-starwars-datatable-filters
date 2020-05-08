import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Celltable from './Celltable';

class CellFiltered extends Component {

  render() {
    const { dataMockFilter, orderReducer: { filters }, columnsNum } = this.props;
    const columnFilter = [filters[0].column, filters[0].order];
    Celltable.updateSortNumbers(dataMockFilter, columnFilter[0], columnFilter[1], columnsNum);
    Celltable.updateSortStrings(dataMockFilter, columnFilter[0], columnFilter[1], columnsNum);
    return (
      dataMockFilter.map((element) => (
        <tbody key={element.name}>
          <tr>
            {Object.values(element).map((item, index) => {
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
  loadReducer: { dataMockFilter }, orderReducer }) => ({
    dataMockFilter, orderReducer,
  });

export default connect(mapStateToProps)(CellFiltered);

CellFiltered.propTypes = {
  dataMockFilter: PropTypes.instanceOf(Object).isRequired,
  orderReducer: PropTypes.instanceOf(Object).isRequired,
};
