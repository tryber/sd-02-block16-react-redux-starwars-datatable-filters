import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlanets } from '../actions';

class Table extends Component {
  componentDidMount() {
    const { getPlanets } = this.props;
    getPlanets();
    // console.log(this.props);
  }

  planetsFilteredByName(p) {
    const { name } = this.props.estado.searchFilterReducer.filters[0];
    if (!name) return p;
    return p.filter((planeta) => planeta.name.toLowerCase().includes(name.toLowerCase()));
  }

  verifyComparison(p, c, v) {
    console.log(this.props);
    console.log(p, c, v);
    switch (c) {
      case 'Maior que': {
        if (parseFloat(p) > parseFloat(v)) return true;
        return false;
      }
      case 'Menor que': {
        if (parseFloat(p) < parseFloat(v)) return true;
        return false;
      }
      default: {
        if (parseFloat(p) === parseFloat(v)) return true;
        return false;
      }
    }
  }

  planetsFilteredBySelect(p) {
    const { column, comparison, valueComparison } = this.props.estado.
      searchFilterReducer.filters[1].numericValues;
    if (column !== 'coluna' && comparison !== '-' && valueComparison > 0) {
      return p.filter((planeta) => (
        this.verifyComparison(planeta[column], comparison, valueComparison)));
    }
    return p;
  }

  tableRender() {
    console.log(this.props);
    let { planets } = this.props.estado.planets;
    const headerTable = planets ? Object.keys(planets[0]) : '';
    planets = (this.planetsFilteredByName(planets));
    planets = (this.planetsFilteredBySelect(planets));
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

const mapStateToProps = (state) => (
  {
    estado: state,
  }
);

const mapDispatchToProps = (dispatch) => ({
  getPlanets: () => dispatch(fetchPlanets()),
});

Table.propTypes = {
  getPlanets: PropTypes.func,
};

Table.defaultProps = {
  getPlanets: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
