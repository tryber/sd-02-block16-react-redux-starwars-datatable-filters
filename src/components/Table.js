import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSWAPIPlanets, searchByName } from '../actions';
import './Table.css';
// import Selectors from './Selectors';
import SearchBar from './SearchBar';

class Table extends Component {
  componentDidMount() {
    const { getSWAPIPlanets } = this.props;

    getSWAPIPlanets();
  }

  render() {
    const { results, filteredResults, isFetching } = this.props;
    if (isFetching) return <div>Carregando tabela e filtros...</div>;
    return (
      <div>
        <SearchBar />
        {/* <Selectors /> */}
        <table>
          <thead>
            <tr>
              {Object.keys(results[0] || []).map((key) => (
                key === 'residents' || key === 'films' || key === 'created' || key === 'edited'
                  ? false
                  : <th>{key.replace(/_/, ' ').toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredResults.length
              ? filteredResults.map((planet) => (
                <tr>
                  {Object.entries(planet).map(([key, value]) => (
                    key === 'residents' || key === 'films' || key === 'created' || key === 'edited'
                      ? false
                      : <td>{value}</td>
                  ))}
                </tr>
              ))
              : results.map((planet) => (
                <tr>
                  {Object.entries(planet).map(([key, value]) => (
                    key === 'residents' || key === 'films' || key === 'created' || key === 'edited'
                      ? false
                      : <td>{value}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  getSWAPIPlanets: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array),
  searchPlanetsByName: PropTypes.func.isRequired,
  filteredResults: PropTypes.instanceOf(Array),
  isFetching: PropTypes.bool.isRequired,
};

Table.defaultProps = {
  results: [],
  filteredResults: [],
};

const mapStateToProps = (
  {
    data: { results, isFetching },
    SearchFilters: { filteredResults },
  },
) => ({
  results,
  filteredResults,
  isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getSWAPIPlanets: () => dispatch(fetchSWAPIPlanets()),
  searchPlanetsByName: (text, results) => dispatch(searchByName(text, results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
