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

  render() {
    const colunasDisponiveis = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water'];

    const { column, comparison, value } = this.state;
    return (
      <section>
        <div>
          <select
            defaultValue=""
            value={column}
            onChange={(event) => this.setState({ column: event.target.value })}
          >
            <option value="" disabled>Selecione uma coluna</option>
            {colunasDisponiveis.map((coluna) => <option value={coluna}>{coluna}</option>)}
          </select>
        </div>

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

        <div>
          <input
            type="number"
            value={value}
            placeholder="Digite um número"
            onChange={(event) => this.setState({ value: event.target.value })}
          />
        </div>
        <button
          type="button"
          onClick={this.adicionaFiltro}
          disabled={!(column && comparison && value)}
        >
          Filtrar
        </button>
      </section>
    );
  }
}

FiltersDropdown.propTypes = {
  dispatch: propTypes.func.isRequired,
};

export default connect()(FiltersDropdown);
