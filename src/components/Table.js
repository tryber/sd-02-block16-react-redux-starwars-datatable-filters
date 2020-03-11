import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSWAPIPlanets, searchByName } from '../actions';
import './Table.css';

class Table extends Component {
  constructor(props) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    const { getSWAPIPlanets } = this.props;

    getSWAPIPlanets();
  }

  onChangeHandler(event) {
    const { searchPlanetsByName } = this.props;
    let { results } = this.props;
    const text = event.target.value.toLowerCase();
    searchPlanetsByName(text, results);
    results = searchPlanetsByName(text, results).results;
  }

  render() {
    const { results, resultsByName, isFetching } = this.props;
    if (isFetching) return <div>Carregando tabela e filtros...</div>;
    return (
      <div>
        <input onChange={this.onChangeHandler} />
        <table>
          <thead>
            <tr>
              {Object.keys(results[0] || []).map((key) => (key === 'residents' ? false : <th>{key}</th>))}
            </tr>
          </thead>
          <tbody>
            {resultsByName.length
              ? resultsByName.map((planet) => (
                <tr>
                  {Object.entries(planet).map(([key, value]) => (key === 'residents' ? false : <td>{value}</td>))}
                </tr>
              ))
              : results.map((planet) => (
                <tr>
                  {Object.entries(planet).map(([key, value]) => (key === 'residents' ? false : <td>{value}</td>))}
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
  resultsByName: PropTypes.instanceOf(Array),
  isFetching: PropTypes.bool.isRequired,
};

Table.defaultProps = {
  results: [],
  resultsByName: [],
};

const mapStateToProps = ({ data: { results, isFetching }, SearchByName: { resultsByName } }) => (
  { results, resultsByName, isFetching }
);

const mapDispatchToProps = (dispatch) => ({
  getSWAPIPlanets: () => dispatch(fetchSWAPIPlanets()),
  searchPlanetsByName: (text, results) => dispatch(searchByName(text, results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
