import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectorFilter } from '../actions/selectorFilter';
import { newSelectorFilter } from '../actions/newFilter';

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

  addFiltro() {
    const { addNewFilter } = this.props;
    console.log(this.props);
    alert('clicou');
    const { column, comparison, valueComparison }
      = this.props.state.searchFilterReducer.filters[1].numericValues;
    console.log(column, comparison, valueComparison);
    if ((column !== 'coluna' && comparison !== '-' && valueComparison >= 0)) {
      console.log('aui');
      addNewFilter(column, comparison, valueComparison);
    }
  }

  geraFiltro() {
    const { filters } = this.props.state.searchFilterReducer;
    if (filters.length > 2) {
      const arrFilter = [...filters];
      arrFilter.splice(0, 2);
      console.log(arrFilter);
      return arrFilter.map((filtro) => (
        <div>
          <p>
            Filtro:{filtro.numericValues.column}
          </p>
          <p>
            Comparador: {filtro.numericValues.comparison}
          </p>
          <p>
            Valor: {filtro.numericValues.valueComparison}
          </p>
          <button>X</button>
        </div>
      ));
    }
  }

  render() {
    const colunas = this.props.state.searchFilterReducer.selectors || [];
    const valores = ['-', 'Maior que', 'Menor que', 'ou Igual a'];
    const { selectFilterDispatch } = this.props;
    const { numericValues: { column, comparison, valueComparison } }
      = this.props.state.searchFilterReducer.filters[1];
    console.log(column, comparison, valueComparison);
    this.verificaEstadoFiltragem();
    return (
      <div>
        {this.geraFiltro()}
        <div>
          Digite o filtro:
          <select value={column} onChange={(e) => selectFilterDispatch(e.target.value, 'column')}>
            {colunas.map((coluna) => (<option value={coluna}>{coluna}</option>))}
          </select>
          <select value={comparison} onChange={(e) => selectFilterDispatch(e.target.value, 'comparison')}>
            {valores.map((valor) => (<option value={valor}>{valor}</option>))}
          </select>
          <input
            type="number"
            onChange={(e) => selectFilterDispatch(e.target.value, 'valueComparison')}
            value={valueComparison}
          />
          <button onClick={this.addFiltro.bind(this)}>Filtrar</button>
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
  addNewFilter: (col, comp, v) => dispatch(newSelectorFilter(col, comp, v)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selectors);
