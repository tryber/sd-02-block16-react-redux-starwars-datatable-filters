import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchByNumber } from '../actions';


class Selectors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      column: '',
      comparison: '',
      value: null,
    };

    this.onChangeColumn = this.onChangeColumn.bind(this);
    this.onChangeComparison = this.onChangeComparison.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onChangeColumn(event) {
    const { value } = event.target;
    this.setState({ column: value });
  }

  onChangeComparison(event) {
    const { value } = event.target;
    this.setState({ comparison: value });
  }

  onChangeValue(event) {
    const { value } = event.target;
    this.setState({ value });
  }

  onClickHandler() {
    const { searchPlanetsByNumber } = this.props;
    let { results, filteredByName, filteredByNumber } = this.props;
    const { column, comparison, value } = this.state;
    console.log(this.props);

    if (!column || !comparison || !value) alert('Preencha todos os campos');
    if (filteredByName.length) {
      searchPlanetsByNumber(column, comparison, value, filteredByName);
      filteredByName = searchPlanetsByNumber(column, comparison, value, filteredByName).results;
    } if (filteredByNumber.length) {
      searchPlanetsByNumber(column, comparison, value, filteredByNumber);
      filteredByNumber = searchPlanetsByNumber(column, comparison, value, filteredByNumber).results;
    } else {
      searchPlanetsByNumber(column, comparison, value, results);
      results = searchPlanetsByNumber(column, comparison, value, results).results;
    }
  }

  render() {
    const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const { filters } = this.props;
    const selectedColumn = filters.map((el) => (
      el.numericValues
        ? el.numericValues.column
        : false
    ));
    return (
      <section>
        <select onChange={this.onChangeColumn}>
          <option value="" label=" " />
          {columns.map((element) => (
            selectedColumn.includes(element)
              ? false
              : <option value={element}>{element}</option>
          ))}
        </select>
        <select onChange={this.onChangeComparison}>
          <option value="" label=" " />
          <option value="Maior que">Maior que</option>
          <option value="Menor que">Menor que</option>
          <option value="Igual a">Igual a</option>
        </select>
        <input type="number" onChange={this.onChangeValue} />
        <button type="button" onClick={this.onClickHandler}>Filtrar</button>
      </section>
    );
  }
}

Selectors.propTypes = {
  searchPlanetsByNumber: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array),
  filteredByName: PropTypes.instanceOf(Array),
  filteredByNumber: PropTypes.instanceOf(Array),
  filters: PropTypes.instanceOf(Array),
};

Selectors.defaultProps = {
  results: [],
  filteredByName: [],
  filteredByNumber: [],
  filters: [],
};

const mapStateToProps = ({
  data: { results },
  SearchFilters: { filteredByName, filteredByNumber, filters },
}) => ({
  results,
  filteredByName,
  filters,
  filteredByNumber,
});

const mapDispatchToProps = (dispatch) => ({
  searchPlanetsByNumber: (column,
    comparison,
    value,
    results) => dispatch(searchByNumber(column, comparison, value, results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selectors);
