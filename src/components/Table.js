import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSWAPIPlanets, searchByName } from '../actions';
import './Table.css';
import Selectors from './Selectors';
import SearchBar from './SearchBar';

class Table extends Component {
  componentDidMount() {
    const { getSWAPIPlanets } = this.props;

    getSWAPIPlanets();
  }

  renderAllPlanets(results) {
    const { filteredByName, filteredByNumber, activeFilter } = this.props;
    if (activeFilter === 'name') {
      return (
        <tbody>
          {filteredByName.map((planet) => (
            <tr>
              {Object.entries(planet).map(([key, value]) => (key === 'residents' ? false : <td>{value}</td>))}
            </tr>
          ))}
        </tbody>
      );
    } if (activeFilter === 'number') {
      return (
        <tbody>
          {filteredByNumber.map((planet) => (
            <tr>
              {Object.entries(planet).map(([key, value]) => (key === 'residents' ? false : <td>{value}</td>))}
            </tr>
          ))}
        </tbody>
      );
    } return (
      <tbody>
        {results.map((planet) => (
          <tr>
            {Object.entries(planet).map(([key, value]) => (key === 'residents' ? false : <td>{value}</td>))}
          </tr>
        ))}
      </tbody>
    );
  }

  render() {
    const { results, isFetching } = this.props;
    if (isFetching) return <div>Carregando tabela e filtros...</div>;
    return (
      <div>
        <SearchBar />
        <Selectors />
        <table>
          <thead>
            <tr>
              {Object.keys(results[0] || []).map((key) => (
                key === 'residents'
                  ? false
                  : <th>
                    {key.replace(/_/, ' ').toUpperCase()}
                  </th>
              ))}
            </tr>
          </thead>
          {this.renderAllPlanets(results)}
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  getSWAPIPlanets: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array),
  filteredByName: PropTypes.instanceOf(Array),
  filteredByNumber: PropTypes.instanceOf(Array),
  isFetching: PropTypes.bool.isRequired,
  activeFilter: PropTypes.string,
};

Table.defaultProps = {
  results: [],
  filteredByName: [],
  filteredByNumber: [],
  activeFilter: '',
};

const mapStateToProps = (
  {
    data: { results, isFetching },
    SearchFilters: { filteredByName, filteredByNumber, activeFilter },
  },
) => ({
  results,
  filteredByName,
  isFetching,
  activeFilter,
  filteredByNumber,
});

const mapDispatchToProps = (dispatch) => ({
  getSWAPIPlanets: () => dispatch(fetchSWAPIPlanets()),
  searchPlanetsByName: (text, results) => dispatch(searchByName(text, results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
