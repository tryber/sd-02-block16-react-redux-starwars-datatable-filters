import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function handleChange(e) {
  return {
    type: 'Input',
    input: e.target.value,
  };
}

class Input extends Component {
  render() {
    const {
      handle, input,
    } = this.props;
    return (
      <div>
        <input type="text" value={input} onChange={(e) => handle(e)} />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  input: state.input.value,
});

const mapDispatchToProps = (dispatch) => ({
  handle: (e) => dispatch(handleChange(e)),
});

Input.propTypes = {
  handle: PropTypes.func.isRequired,
  input: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
