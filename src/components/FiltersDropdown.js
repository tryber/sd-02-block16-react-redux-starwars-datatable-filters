import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';


class FiltersDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      comparison: '',
      value: '',
    };
    this.adicionaFiltro = this.adicionaFiltro.bind(this);
  }

  adicionaFiltro() {
    const { dispatch } = this.props;
    dispatch({ type: 'ADICIONAR_FILTRO', valoresNumericos: this.state });
    this.setState({
      column: '',
      comparison: '',
      value: '',
    });
  }

  renderColumnDrowpdown(colunasRestantes, column) {
    return (
      <div>
        <select
          defaultValue=""
          value={column}
          onChange={(event) => this.setState({ column: event.target.value })}
        >
          <option value="" disabled>Selecione uma coluna</option>
          {colunasRestantes.map((coluna) => <option value={coluna}>{coluna}</option>)}
        </select>
      </div>
    );
  }

  renderComparisonDropdown(comparison) {
    return (
      <div>
        <select
          defaultValue=""
          value={comparison}
          onChange={(event) => this.setState({ comparison: event.target.value })}
        >
          <option value="" disabled>Selecione uma comparação</option>
          <option value="Maior que">Maior que</option>
          <option value="Menor que">Menor que</option>
          <option value="Igual a">Igual a</option>
        </select>
      </div>
    );
  }

  renderNumberComparison(value) {
    return (
      <div>
        <input
          type="number"
          value={value}
          placeholder="Digite um número"
          onChange={(event) => this.setState({ value: event.target.value })}
        />
      </div>
    );
  }

  renderComparButton(column, comparison, value) {
    return (
      <button
        type="button"
        className="filter-btn"
        onClick={this.adicionaFiltro}
        disabled={!(column && comparison && value)}
      >
        Filtrar
      </button>
    );
  }


  render() {
    const { arrayColunasJaSelecionadas } = this.props;

    const todasAsColunas = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water'];

    const colunasRestantes = todasAsColunas.filter((coluna) => (
      !(arrayColunasJaSelecionadas.includes(coluna))
      // (arrayColunasJaSelecionadas.includes(coluna)) ? false : true
    ));

    const { column, comparison, value } = this.state;

    return colunasRestantes.length !== 0 ? (
      <article>
        <section className="comparisons">
          {this.renderColumnDrowpdown(colunasRestantes, column)}
          {this.renderComparisonDropdown(comparison)}
          {this.renderNumberComparison(value)}
          {this.renderComparButton(column, comparison, value)}
        </section>
      </article>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  arrayColunasJaSelecionadas: state.filters.slice(1).map((obj) => obj.numericValues.column),
});

FiltersDropdown.propTypes = {
  dispatch: propTypes.func.isRequired,
  arrayColunasJaSelecionadas: propTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(FiltersDropdown);
