import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  filtersPropTypes, filtersDefault,
} from './PropTypes';
import './input.css';

function handleChange(e, filters) {
  const coisa = filters;
  coisa[0].name = e.target.value;
  return {
    type: 'Name',
    filters: coisa,
  };
}

class InputName extends Component {
  render() {
    const {
      handle, filters,
    } = this.props;
    const { name } = filters;
    return (
      <div className="comp_input">
        <p>Nome planeta: </p>
        <input type="text" value={name} onChange={(e) => handle(e, filters)} />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  filters: state.filter.filters,
});

const mapDispatchToProps = (dispatch) => ({
  handle: (e, filters) => dispatch(handleChange(e, filters)),
});

InputName.propTypes = {
  handle: PropTypes.func.isRequired,
  filters: filtersPropTypes.filters,
};

InputName.defaultProps = {
  filters: filtersDefault,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputName);
