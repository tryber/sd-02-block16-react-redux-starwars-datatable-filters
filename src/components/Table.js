import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSWAPIPlanets } from '../actions';
import './Table.css';

class Table extends Component {
  componentDidMount() {
    const { getSWAPIPlanets } = this.props;

    getSWAPIPlanets();
  }

  render() {
    const { results } = this.props;

    return (
      <table>
        <thead>
          <tr>
            {Object.keys(results[0] || []).map((key) => (key === 'residents' ? false : <th>{key}</th>))}
          </tr>
        </thead>
        <tbody>
          {results.map((planet) => (
            <tr>
              {Object.entries(planet).map(([key, value]) => (key === 'residents' ? false : <td>{value}</td>))}
            </tr>
          ))}
        </tbody>
      </table>

    );
  }
}

Table.propTypes = {
  getSWAPIPlanets: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array),
};

Table.defaultProps = {
  results: [],
};

const mapStateToProps = ({ data: { results } }) => ({ results });

const mapDispatchToProps = (dispatch) => ({
  getSWAPIPlanets: () => dispatch(fetchSWAPIPlanets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
