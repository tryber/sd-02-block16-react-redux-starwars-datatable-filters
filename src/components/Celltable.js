import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Celltable extends Component {

  render() {
    let { results, dataMock } = this.props;
    return (
      (results || dataMock).map((result) => (
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
  loadReducer: { dataMock: { results } }, dropSelecReducer: { dataMock, dataMockOn } }) => ({
    results, dataMock, dataMockOn
  });

export default connect(mapStateToProps)(Celltable);

Celltable.propTypes = {
  results: PropTypes.instanceOf(Object).isRequired,
};
