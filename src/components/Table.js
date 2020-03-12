import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlanets } from '../actions';
import './Table.css';

class Table extends Component {
  componentDidMount() {
    const { getPlanets } = this.props;
    getPlanets();
  }

  planetsFilteredByName(p) {
    const { name } = this.props.filters[0];
    if (!name) return p;
    return p.filter((planeta) => planeta.name.toLowerCase().includes(name.toLowerCase()));
  }

  forDoFiltrar(boraFiltrar, p) {
    console.log(this.props);
    let final = p;
    boraFiltrar.forEach(({ numericValues: { column, comparison, valueComparison } }) => {
      if (column !== 'coluna' && comparison === 'Maior que' && valueComparison >= 0) {
        final = final.filter((pla) => (parseFloat(pla[column]) > parseFloat(valueComparison)));
      } else if (column !== 'coluna' && comparison === 'Menor que' && valueComparison >= 0) {
        final = final.filter((pla) => (parseFloat(pla[column]) < parseFloat(valueComparison)));
      } else if (column !== 'coluna' && comparison === 'ou Igual a' && valueComparison >= 0) {
        final = final.filter((pla) => (parseFloat(pla[column]) === parseFloat(valueComparison)));
      }
    });
    return final;
  }

  planetsFilteredBySelect(p) {
    const { filters } = this.props;
    const boraFiltrar = [...filters];
    boraFiltrar.splice(0, 2);
    const a = this.forDoFiltrar(boraFiltrar, p);
    if (!boraFiltrar.length) return p;
    return a;
  }

  tableRender() {
    let { planets } = this.props.planets;
    const headerTable = planets ? Object.keys(planets[0]) : '';
    planets = (this.planetsFilteredByName(planets));
    planets = this.planetsFilteredBySelect(planets);
    if (headerTable) {
      return (
        <table>
          <thead>
            <tr>
              {headerTable.map((header) => (
                header !== 'residents' ? <th key={header}>{header}</th> : null
              ))}
            </tr>
          </thead>
          <tbody>
            {planets.map((planeta) => (
              <tr>
                {Object.keys(planeta).map((chave) => (
                  chave !== 'residents' ? <td key={planeta[chave]}>{planeta[chave]}</td> : null
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return '';
  }

  render() {
    return (
      <div className="map">
        {this.tableRender()}
      </div>
    );
  }
}

const mapStateToProps = ({ planets, searchFilterReducer: { filters } }) => ({
  planets,
  filters,
});

const mapDispatchToProps = (dispatch) => ({
  getPlanets: () => dispatch(fetchPlanets()),
});

Table.propTypes = {
  getPlanets: PropTypes.func.isRequired,
  filters: PropTypes.instanceOf(Array).isRequired,
  planets: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
