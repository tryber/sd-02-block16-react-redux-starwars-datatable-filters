import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  filtersPropTypes, filtersDefault,
} from './PropTypes';
import './input.css';

function handleChange(e, id, filters) {
  const coisa = filters;
  coisa[id].numericValues.input = e.target.value;
  return {
    type: 'InputNumber',
    filters: coisa,
  };
}

class InputNumber extends Component {
  render() {
    const { filters, handle, id } = this.props;
    const { input } = filters[id].numericValues;
    return (
      <div className="comp_input">
        <p>Quantidade: </p>
        <input
          type="number"
          value={input}
          onChange={(e) => handle(e, id, filters)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filter.filters,
});

const mapDispatchToProps = (dispatch) => ({
  handle: (e, id, filters) => dispatch(handleChange(e, id, filters)),
});

InputNumber.propTypes = {
  handle: PropTypes.func.isRequired,
  filters: filtersPropTypes.filters,
  id: PropTypes.number.isRequired,
};

InputNumber.defaultProps = {
  filters: filtersDefault,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputNumber);
