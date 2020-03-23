import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CellFiltered from './CellFiltered';

class Celltable extends Component {

  render() {
    const { results, dataMockFilterOn } = this.props;
    if (dataMockFilterOn) {
      return (<CellFiltered />);
    }
    return (
      results.map((result) => (
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
  loadReducer: { dataMock: { results }, dataMockFilterOn } }) => ({
    results, dataMockFilterOn,
  });

export default connect(mapStateToProps)(Celltable);

Celltable.propTypes = {
  results: PropTypes.instanceOf(Object).isRequired,
  dataMockFilterOn: PropTypes.bool.isRequired,
};
