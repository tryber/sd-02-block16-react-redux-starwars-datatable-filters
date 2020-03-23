import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { acertaTexto } from './Table';
import changeSorting from '../actions/changeSorting';

class SortingSelection extends Component {
  renderColumnsSelect() {
    const { handleChange } = this.props;
    const columns = ['name', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

    return (
      <select name="column" onChange={handleChange} defaultValue="">
        <option value="" disabled>Select column</option>
        {columns.map((column) => (
          <option key={column} value={column}>{acertaTexto(column)}</option>
        ))}
      </select>
    );
  }

  renderOrderSelect() {
    const { handleChange } = this.props;
    return (
      <select name="order" onChange={handleChange} defaultValue="ASC">
        <option value="ASC">asc. order</option>
        <option value="DESC">desc. order</option>
      </select>
    );
  }

  render() {
    return (
      <div className="sorting">
        {this.renderColumnsSelect()}
        {this.renderOrderSelect()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleChange: (event) => {
    dispatch(changeSorting(event));
  },
});

SortingSelection.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SortingSelection);
