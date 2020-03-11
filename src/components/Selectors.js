import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectorFilter } from '../actions/selectorFilter';

class Selectors extends Component {
  render() {
    const colunas = ['coluna', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const valores = ['-', 'Maior que', 'Menor que', 'ou Igual a'];
    const { value, selectFilterDispatch } = this.props;
    return (
      <div>
        <div>
          Digite o filtro:
          <select onChange={(e) => selectFilterDispatch(e.target.value, 'coluna')}>
            {colunas.map((coluna) => (
              <option
                value={coluna}
              >
                {coluna}
              </option>
            ))}
          </select>
          <select onChange={(e) => selectFilterDispatch(e.target.value, 'comparacao')}>
            {valores.map((valor) => (
              <option
                value={valor}
              >
                {valor}
              </option>
            ))}
          </select>
          <input
            placeholder="Procurar planeta"
            type="number"
            onChange={(e) => selectFilterDispatch(e.target.value, 'n')}
          />
        </div>
      </div>
    );
  }
}

// const mapStateToProps = ({ value }) => ({ value });

const mapDispatchToProps = (dispatch) => ({
  selectFilterDispatch: (e, i) => dispatch(selectorFilter(e, i)),
});

export default connect(null, mapDispatchToProps)(Selectors);
