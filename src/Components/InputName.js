import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './input.css';

function handleChange(e) {
  return {
    type: 'InputName',
    value: e.target.value,
  };
}

class InputName extends Component {
  render() {
    const {
      handle, input,
    } = this.props;
    return (
      <div className="comp_input">
        <p>Nome planeta: </p>
        <input type="text" value={input} onChange={(e) => handle(e)} />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  input: state.input.name,
});

const mapDispatchToProps = (dispatch) => ({
  handle: (e) => dispatch(handleChange(e)),
});

InputName.propTypes = {
  handle: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputName);
