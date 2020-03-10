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

  planetsFiltered(p) {
    const { name } = this.props.estado.searchFilterReducer.filters[0];
    if (!name) return p;
    return p.filter((planeta) => planeta.name.toLowerCase().includes(name.toLowerCase()));
  }

  tableRender() {
    console.log(this.props);
    let { planets } = this.props.estado.planets;
    // console.log(planets);
    const headerTable = planets ? Object.keys(planets[0]) : '';
    // console.log(headerTable);
    planets = (this.planetsFiltered(planets));
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
