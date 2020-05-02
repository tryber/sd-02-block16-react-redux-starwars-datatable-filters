import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Headtable extends Component {

  render() {
    const { data } = this.props;
    return (
      <thead>
        <tr>
          {Object.keys(data[0]).map((result) => ((result !== 'residents')
            ? <th className="headTable" key={result}>{result.replace(/_/g, ' ')}</th>
            : null))
          }
        </tr>
      </thead>
    );
  }
}

const mapStateToProps = ({ loadReducer: { data } }) => ({ data });

export default connect(mapStateToProps)(Headtable);

Headtable.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};
