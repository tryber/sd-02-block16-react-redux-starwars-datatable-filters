import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlanets } from '../actions';
import TableHeader from './TableHeader';

class Table extends Component {
  static createRows(planet) {
    return (
      <tr key={planet.name}>
        <td>{planet.name}</td>
        <td>{planet.population}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.gravity}</td>
        <td>{planet.terrain}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.films.map((film) => <div key={film}>{film}</div>)}</td>
        <td>{planet.created}</td>
        <td>{planet.edited}</td>
        <td>{planet.url}</td>
      </tr>
    );
  }

  static comparisonCase(filters, data) {
    return filters.reduce((previousList, filter, index) => {
      const planetList = (index === 0) ? data : previousList;
      const obj = {
        bigger: planetList.filter((planet) => Number(planet[filter.column]) > filter.value),
        less: planetList.filter((planet) => Number(planet[filter.column]) < filter.value),
        equal: planetList.filter((planet) => planet[filter.column] === filter.value),
      };
      return obj[filter.comparison];
    }, []);
  }

  constructor(props) {
    super(props);
    this.filterPlanetsName = this.filterPlanetsName.bind(this);
    this.filterNumericNumber = this.filterNumericNumber.bind(this);
    this.changeColumnOrder = this.changeColumnOrder.bind(this);
    this.sortAscending = this.sortAscending.bind(this);
    this.sortDescending = this.sortDescending.bind(this);
  }

  componentDidMount() {
    const { getPlanets } = this.props;
    getPlanets();
  }

  sortAscending(planetsData, isNumeric) {
    const { sortColumn: { column } } = this.props;
    if (!isNumeric) {
      return planetsData.sort((a, b) => {
        if (a[column] > b[column]) return 1;
        if (b[column] > a[column]) return -1;
        return 0;
      });
    }
    return planetsData.sort((a, b) => {
      if (a[column] === 'unknown') return 1;
      if (b[column] === 'unknown') return -1;
      return Number(a[column]) - Number(b[column]);
    });
  }

  sortDescending(planetsData, isNumeric) {
    const { sortColumn: { column } } = this.props;
    if (!isNumeric) {
      return planetsData.sort((a, b) => {
        if (a[column] > b[column]) return -1;
        if (b[column] > a[column]) return 1;
        return 0;
      });
    }
    return planetsData.sort((a, b) => {
      if (a[column] === 'unknown') return -1;
      if (b[column] === 'unknown') return 1;
      return Number(b[column]) - Number(a[column]);
    });
  }

  changeColumnOrder(planetsData) {
    const { sortColumn: { column, order } } = this.props;
    const numericColumns = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    const isNumeric = numericColumns.includes(column);

    if (!column) return planetsData;

    if (order === 'ASC') return this.sortAscending(planetsData, isNumeric);
    return this.sortDescending(planetsData, isNumeric);
  }

  filterNumericNumber(planetsData) {
    // eslint-disable-next-line camelcase
    const { numeric_values } = this.props;
    if (numeric_values.length !== 0) {
      return Table.comparisonCase(numeric_values, planetsData);
    }
    return planetsData;
  }

  filterPlanetsName() {
    const { data, name } = this.props;
    if (name) {
      return data.filter((planet) => planet.name.toUpperCase().includes(name.toUpperCase()));
    }
    return data;
  }

  render() {
    const { isFetching, data } = this.props;
    const filteredPlanets = (data) ? this.filterNumericNumber(this.filterPlanetsName()) : false;
    const sortedPlanets = this.changeColumnOrder(filteredPlanets);
    return (
      <div className="table">
        {isFetching && 'Loading...'}
        <p>Para ordenar basta clicar em cima do titulo da coluna desejada.</p>
        <table>
          <tbody>
            <TableHeader />
            {sortedPlanets && sortedPlanets.map((planet) => Table.createRows(planet))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  getPlanets: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
  name: PropTypes.string,
  numeric_values: PropTypes.arrayOf(PropTypes.shape({})),
  sortColumn: PropTypes.shape({
    column: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  }).isRequired,
};

Table.defaultProps = {
  data: [],
  name: '',
  numeric_values: [],
};

const mapStateToProps = ({
  planets: { isFetching, data },
  // eslint-disable-next-line camelcase
  filters: { name, numeric_values },
  sort: { sortColumn },
}) => ({
  isFetching,
  data,
  name,
  numeric_values,
  sortColumn,
});

const mapDispatchToProps = (dispatch) => ({
  getPlanets: () => dispatch(fetchPlanets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
