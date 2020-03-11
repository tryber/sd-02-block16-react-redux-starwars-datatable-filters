import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './input.css';

function handleChange(e) {
  return {
    type: 'InputNumber',
    value: e.target.value,
  };
}

class InputNumber extends Component {
  render() {
    const {
      handle, input,
    } = this.props;
    return (
      <div className="comp_input">
        <p>Quantidade: </p>
        <input type="text" value={input} onChange={(e) => handle(e)} />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  input: state.input.number,
});

const mapDispatchToProps = (dispatch) => ({
  handle: (e) => dispatch(handleChange(e)),
});

InputNumber.propTypes = {
  handle: PropTypes.func.isRequired,
  input: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputNumber);
