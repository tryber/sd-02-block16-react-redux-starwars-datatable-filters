import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class OrdenadorDeColunas extends Component {
  render() {
    const { dispatch } = this.props;

    const arrayColunas = ['name', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

    return (
      <div>
        <label htmlFor="order">
          <span className="order-text">Ordene alguma coluna:</span>
          <select
            defaultValue="name"
            onChange={(event) => dispatch({ type: 'ALTERAR_COLUNA_DE_ORDENAÇÃO', coluna: event.target.value })}
          >
            {arrayColunas.map((coluna) => <option value={coluna}>{coluna}</option>)}
          </select>
          <select
            defaultValue="ASC"
            onChange={(event) => dispatch({ type: 'ALTERAR_ORDEM_DE_ORDENAÇÃO', ordem: event.target.value })}
          >
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </label>
      </div>
    );
  }
}

OrdenadorDeColunas.propTypes = {
  dispatch: propTypes.func.isRequired,
};

export default connect()(OrdenadorDeColunas);
