import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchByNumber } from '../actions';


class Selectors extends Component {
  static searchByNumberCalculator(column, comparison, value) {
    if (comparison === /Maior que/i) return `${column} > ${value}`;
    if (comparison === /Menor que/i) return `${column} < ${value}`;
    if (comparison === /Igual a/i) return `${column} === ${value}`;
    return false;
  }

  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {

  }

  render() {
    return (
      <section>
        <select>
          <option value="" label=" " selected="selected" />
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select>
          <option value="Maior que" selected="selected">Maior que</option>
          <option value="Menor que">Menor que</option>
          <option value="Igual a">Igual a</option>
        </select>
        <input type="number" />
        <button type="button" onClick={this.onClickHandler}>Filtrar</button>
      </section>
    );
  }
}

const mapStateToProps = ({ re }) => ({

});

const mapDispatchToProps = (dispatch) => ({
  searchPlanetsByNumber: (column,
    comparison,
    value,
    results) => dispatch(searchByNumber(column, comparison, value, results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selectors);
