import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlanets } from '../actions/getPlanets';
import SearchBar from './SearchBar';
import Selectors from './Selectors';
import './Table.css';

class Table extends Component {
  componentDidMount() {
    const { fetchPlanets } = this.props;

    fetchPlanets();
  }

  static renderTableHead(planets) {
    return (
      <thead>
        <tr>
          {Object.keys(planets[0] || []).map((key) => (
            key === 'residents'
              ? false
              : <th>{key.replace(/_/, ' ').toUpperCase()}</th>
          ))}
        </tr>
      </thead>
    );
  }

  static renderTableBody(planets) {
    return (
      <tbody>
        {planets.map((planet) => (
          <tr>
            {Object.entries(planet).map(([key, value]) => (
              key === 'residents'
                ? false
                : <td>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  render() {
    const { data, isFetching, filteredData, filters } = this.props;
    console.log(filteredData);
    if (isFetching) return <h1>Loading...</h1>;
    return (
      <section>
        <section>
          <SearchBar />
        </section>
        <section>
          <Selectors />
        </section>
        <table>
          {Table.renderTableHead(data)}
          {filters[0].name || filters[1]
            ? Table.renderTableBody(filteredData)
            : Table.renderTableBody(data)}
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchPlanets: PropTypes.func.isRequired,
  filteredData: PropTypes.instanceOf(Array),
  filters: PropTypes.instanceOf(Array).isRequired,
};

Table.defaultProps = {
  filteredData: [],
};

const mapStateToProps = (
  { planetsData: { data, isFetching }, planetsFilters: { filteredData, filters } },
) => ({ data, isFetching, filteredData, filters });

const mapDispatchToProps = (dispatch) => ({
  fetchPlanets: () => dispatch(getPlanets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
