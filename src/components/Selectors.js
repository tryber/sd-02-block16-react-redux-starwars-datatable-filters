import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectorFilter } from '../actions/selectorFilter';

class Selectors extends Component {
  verificaEstadoFiltragem() {
    const filtros = (this.props.state.searchFilterReducer.filters).slice(1);
    console.log(filtros);
    const arrFiltros = [];
    filtros.forEach((filtro) => {
      if (filtro.numericValues.column !== 'coluna') arrFiltros.push(filtro);
    });
    return arrFiltros;
  }

  render() {
    const colunas = this.props.state.searchFilterReducer.selectors || [];
    const valores = ['-', 'Maior que', 'Menor que', 'ou Igual a'];
    const { selectFilterDispatch } = this.props;
    this.verificaEstadoFiltragem();
    return (
      <div>
        <div>
          Digite o filtro:
          <select onChange={(e) => selectFilterDispatch(e.target.value, 'column')}>
            {colunas.map((coluna) => (<option value={coluna}>{coluna}</option>))}
          </select>
          <select onChange={(e) => selectFilterDispatch(e.target.value, 'comparison')}>
            {valores.map((valor) => (<option value={valor}>{valor}</option>))}
          </select>
          <input
            type="number"
            onChange={(e) => selectFilterDispatch(e.target.value, 'valueComparison')}
          />
          <button>X</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  selectFilterDispatch: (e, i) => dispatch(selectorFilter(e, i)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selectors);
