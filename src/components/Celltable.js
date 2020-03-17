import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Celltable extends Component {

  render() {
    const { results } = this.props;
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

const mapStateToProps = ({ loadReducer: { dataMock: { results } } }) => ({ results });

export default connect(mapStateToProps)(Celltable);

Celltable.propTypes = {
  results: PropTypes.instanceOf(Object).isRequired,
};
