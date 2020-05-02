import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CellFiltered from './CellFiltered';

class Celltable extends Component {

  render() {
    const { dataMock, dataMockFilterOn } = this.props;
    if (dataMockFilterOn) {
      return (<CellFiltered />);
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
  loadReducer: { dataMock, dataMockFilterOn } }) => ({
    dataMock, dataMockFilterOn,
  });

export default connect(mapStateToProps)(Celltable);

Celltable.propTypes = {
  dataMock: PropTypes.instanceOf(Object).isRequired,
  dataMockFilterOn: PropTypes.bool.isRequired,
};
