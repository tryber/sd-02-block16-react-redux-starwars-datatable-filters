import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectorFilter } from '../actions/selectorFilter';
import { newSelectorFilter } from '../actions/newFilter';
import { removeFilter } from '../actions/removeFilter';
import './Selectors.css';

class Selectors extends Component {
  verificaEstadoFiltragem() {
    const { filters } = this.props;
    const filtros = filters.slice(1);
    const arrFiltros = [];
    filtros.forEach((filtro) => {
      if (filtro.numericValues.column !== 'coluna') arrFiltros.push(filtro);
    });
    return arrFiltros;
  }

  addFiltro() {
    const { addNewFilter, filters } = this.props;
    const { column, comparison, valueComparison } = filters[1].numericValues;
    if ((column !== 'coluna' && comparison !== '-' && valueComparison >= 0)) {
      addNewFilter(column, comparison, valueComparison);
    } else alert('escolha os três campos');
  }

  removeFilter(e) {
    const { removerFilter } = this.props;
    const { id, value } = e.target;
    removerFilter(id, value);
  }

  geraFiltro() {
    const { filters } = this.props;
    if (filters.length > 2) {
      const arrFilter = [...filters];
      arrFilter.splice(0, 2);
      return (
        <div className="filtros">
          {arrFilter.map((filtro, index) => (
            <div className="mini-filtros">
              <p>
                Filtro:{filtro.numericValues.column}
              </p>
              <p>
                Comparador: {filtro.numericValues.comparison}
              </p>
              <p>
                Valor: {filtro.numericValues.valueComparison}
              </p>
              <button
                onClick={(e) => this.removeFilter(e)}
                id={index + 2}
                value={filtro.numericValues.column}
              >X</button>
            </div>
          ))}
        </div>
      );
    }
    return '';
  }

  render() {
    console.log(this.props);
    const { selectors, filters } = this.props;
    const colunas = selectors || [];
    const valores = ['-', 'Maior que', 'Menor que', 'ou Igual a'];
    const { selectFilterDispatch } = this.props;
    const { numericValues: { column, comparison, valueComparison } } = filters[1];
    this.verificaEstadoFiltragem();
    return (
      <div>
        <div>
          Escolha o filtro:
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
          <button onClick={() => this.addFiltro()}>Filtrar</button>
        </div>
        {this.geraFiltro()}
      </div>
    );
  }
}

const mapStateToProps = ({ planets, searchFilterReducer: { filters, selectors } }) => ({
  planets,
  filters,
  selectors,
});

const mapDispatchToProps = (dispatch) => ({
  selectFilterDispatch: (e, i) => dispatch(selectorFilter(e, i)),
  addNewFilter: (col, comp, v) => dispatch(newSelectorFilter(col, comp, v)),
  removerFilter: (i, value) => dispatch(removeFilter(i, value)),
});

Selectors.propTypes = {
  selectFilterDispatch: PropTypes.func.isRequired,
  addNewFilter: PropTypes.func.isRequired,
  removerFilter: PropTypes.func.isRequired,
  filters: PropTypes.instanceOf(Array).isRequired,
  selectors: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Selectors);
