import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class InputFilter extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <input
          type="text"
          className="input-SW"
          placeholder="Pesquise um planeta"
          onChange={(event) => dispatch({ type: 'DIGITACAO', texto: event.target.value })}
        />
      </div>
    );
  }
}

InputFilter.propTypes = {
  dispatch: propTypes.func.isRequired,
};

export default connect()(InputFilter);
