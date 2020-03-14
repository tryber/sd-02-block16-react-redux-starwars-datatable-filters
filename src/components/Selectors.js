import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchByNumber } from '../actions';


class Selectors extends Component {
  constructor(props) {
    super(props);

    this.onChangeColumn = this.onChangeColumn.bind(this);
    this.onChangeComparison = this.onChangeComparison.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeColumn(event) {
    const { value } = event.target;
    console.log(this.props);
    return value;
  }

  onChangeComparison(event) {
    const { value } = event.target;
    console.log(this.props);
    return value;
  }

  onChangeValue(event) {
    const { value } = event.target;
    console.log(this.props);
    return value;
  }

  onClickHandler() {
    const { searchPlanetsByNumber } = this.props;
    const { results } = this.props;
    searchPlanetsByNumber('population', 'Maior que', 1000000000, results);
  }

  render() {
    return (
      <section>
        <select onChange={this.onChangeColumn}>
          <option value="" label=" " selected="selected" />
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select onChange={this.onChangeComparison}>
          <option value="" label=" " selected="selected" />
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

const mapStateToProps = ({
  data: { results },
  SearchFilters: { filteredResults },
}) => ({
  results,
  filteredResults,
});

const mapDispatchToProps = (dispatch) => ({
  searchPlanetsByNumber: (column,
    comparison,
    value,
    results) => dispatch(searchByNumber(column, comparison, value, results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selectors);
