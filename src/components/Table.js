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

  tableRender() {
    const { planets } = this.props.planets;
    console.log(planets);
    const headerTable = planets ? Object.keys(planets[0]) : '';
    console.log(headerTable);
    if (headerTable) {
      return (
        <table>
          <tr>
            {headerTable.map((header) => (
              header !== 'residents' ? <th key={header}>{header}</th> : null
            ))}
          </tr>
          {planets.map((planeta) => (
            <tr>
              {Object.keys(planeta).map((chave) => (
                chave !== 'residents' ? <td key={planeta[chave]}>{planeta[chave]}</td> : null
              ))}
            </tr>
          ))}
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

const mapStateToProps = ({ planets }) => (
  {
    planets,
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
