import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nameToFilter } from '../store/actions';

class Filters extends Component {

  selectColuna() {
    const { column, valueToColumn } = this.props;
    return (
      <div>
        <select 
          onChange={(e) => valueToColumn(e.target.value)}
          value={column}
        >
          <option value="population">Population</option>
          <option value="orbital_period">Orbital period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation period</option>
          <option value="surface_water">Surface water</option>
        </select>
      </div>
    );
  }

  render() {
    const { name, valueToName } = this.props;
    return (
      <div>
        <p>Digite o nome do planeta:</p>
        <input
          type="text"
          placeholder="Digite aqui"
          onChange={(e) => valueToName(e.target.value)}
          value={name}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  allFilters: {
    filters: [{
      name,
    }],
  },
}) => ({
  name,
});

const mapDispatchToProps = (dispatch) => ({
  valueToName: (param) => dispatch(nameToFilter(param)),
});

Filters.propTypes = {
  valueToName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
