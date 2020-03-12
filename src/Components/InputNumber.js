import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './input.css';

function handleChange(e, id) {
  return {
    type: 'InputNumber',
    id,
    filter: e.target.value,
  };
}

class InputNumber extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
  }

  render() {
    const { filters, handle } = this.props;
    const { input } = filters[this.id].numericValues;
    return (
      <div className="comp_input">
        <p>Quantidade: </p>
        <input type="text" value={input} onChange={(e) => handle(e, this.id)} />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  filters: state.filter.filters,
});

const mapDispatchToProps = (dispatch) => ({
  handle: (e, id) => dispatch(handleChange(e, id)),
});

InputNumber.propTypes = {
  handle: PropTypes.func.isRequired,
};

// InputNumber.defaultProps = {
//   input: undefined,
// };

export default connect(mapStateToProps, mapDispatchToProps)(InputNumber);
