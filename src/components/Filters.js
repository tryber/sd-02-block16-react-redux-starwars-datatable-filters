import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  nameFilter,
  numberFilter,
} from '../actions';
import './Filters.css';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      comparison: '',
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.createFilter = this.createFilter.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  selectColumn() {
    const { column } = this.state;
    const { columnsSelect } = this.props;
    return (
      <div>
        <select
          onChange={(e) => this.handleChange(e)}
          name="column"
          value={column}
        >
          <option value="" hidden>Escolha uma coluna</option>
          {columnsSelect.map((item) => {
            const visual = item.substring(0, 1).toUpperCase()
              .concat(item.substring(1)).replace('_', ' ');
            return <option key={item} value={item}>{visual}</option>;
          })}
        </select>
      </div>
    );
  }

  selectComparison() {
    const { comparison } = this.state;
    return (
      <div>
        <select
          onChange={(e) => this.handleChange(e)}
          name="comparison"
          value={comparison}
        >
          <option value="" hidden>Escolha uma comparador</option>
          <option value="maior que">Maior que</option>
          <option value="menor que">Menor que</option>
          <option value="igual a">Igual a</option>
        </select>
      </div>
    );
  }

  inputValue() {
    const { value } = this.state;
    return (
      <div>
        <input
          type="number"
          placeholder="Digite aqui"
          onChange={(e) => this.handleChange(e)}
          name="value"
          value={value}
        />
      </div>
    );
  }

  createFilter() {
    const { column, comparison, value } = this.state;
    const { dispatchFilter } = this.props;
    dispatchFilter(column, comparison, value);
    this.setState({ column: '', comparison: '', value: '' });
  }

  buttonFilter() {
    const { column, comparison, value } = this.state;
    let off = false;
    if (column === '' || comparison === '' || value === '') off = true;
    return (
      <button
        type="button"
        disabled={off}
        onClick={() => this.createFilter()}
      >
        Fazer busca
      </button>
    );
  }

  renderNumValues() {
    const { columnsSelect } = this.props;
    if (columnsSelect.length === 0) return <div>Não sobraram filtros para utilizar!</div>;
    return (
      <div className="flexy-number-filters">
        {this.selectColumn()}
        {this.selectComparison()}
        {this.inputValue()}
        {this.buttonFilter()}
      </div>
    );
  }

  render() {
    const { name, passingName } = this.props;
    return (
      <div className="number-filters">
        {this.renderNumValues()}
        <span>Digite o nome do planeta: </span>
        <input
          type="text"
          placeholder="Digite aqui"
          onChange={(e) => passingName(e.target.value)}
          value={name}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  allFilters: {
    filters: [
      {
        name,
      },
    ],
    columnsSelect,
  },
}) => ({
  name, columnsSelect,
});

const mapDispatchToProps = (dispatch) => ({
  passingName: (param) => dispatch(nameFilter(param)),
  dispatchFilter: (column, comparison, value) => dispatch(numberFilter(column, comparison, value)),
});

Filters.propTypes = {
  passingName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dispatchFilter: PropTypes.func.isRequired,
  columnsSelect: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
