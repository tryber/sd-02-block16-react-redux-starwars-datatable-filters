import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Headtable extends Component {

  render() {
    const { results } = this.props;
    return (
      <thead>
        <tr>
          {Object.keys(results[0]).map((result) => ((result !== 'residents')
            ? <th className="headTable" key={result}>{result.replace(/_/g, ' ')}</th>
            : null))
          }
        </tr>
      </thead>
    );
  }
}

const mapStateToProps = ({ loadReducer: { data: { results } } }) => ({ results });

export default connect(mapStateToProps)(Headtable);

Headtable.propTypes = {
  results: PropTypes.instanceOf(Object).isRequired,
};
