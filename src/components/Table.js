import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import getPlanets from '../services/starwarsAPI';
import addPlanets from '../store/actions/addPlanets';
import filterNames from '../store/actions/filterName';
import orderPlanets from '../store/actions/orderPlanets';
import filterAscDes from '../store/actions/filterAscDes';

class Table extends Component {
  componentDidMount() {
    const { createPlanets } = this.props;
    getPlanets()
      .then(({ results }) => createPlanets(results));
  }

  async handleOrder(key) {
    const { sortAscDes } = this.props;
    await sortAscDes(key);
    const { sortPlanets, data, names } = this.props;
    const { column, order } = names[0];
    sortPlanets(column, order, data);
  }

  render() {
    const {
      data, wasFetched, filterPlanets, names, filters } = this.props;
    let filteredData = data.filter(({ name }) => name.match(new RegExp(names[0].name, 'i')));
    filters.forEach(({ numericValues: { column, comparison, value } }) => {
      filteredData = filteredData.filter((key) => {
        switch (comparison) {
          case 'maior que':
            return Number(key[column]) > Number(value);
          case 'menor que':
            return Number(key[column]) < Number(value);
          case 'igual a':
            return Number(key[column]) === Number(value);
          default:
            return [];
        }
      });
    });

    return (
      <div>
        <h1>StarWars Datatable with Filters:</h1>
        <input type="text" onChange={(e) => filterPlanets(e.target.value)} />
        <Dropdown />
        <table border="1px">
          <thead>
            <tr>
              {wasFetched && Object.keys(data[0]).map((key) => (
                <th key={key}>
                  <button type="button" value={key} onClick={() => this.handleOrder(key)}>{key}</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {wasFetched && filteredData.map((planet) => (
              <tr key={planet.name}>
                {Object.values(planet).map((planetValue) => (
                  <td key={planetValue}>{planetValue}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createPlanets: (results) => dispatch(addPlanets(results)),
  filterPlanets: (name) => dispatch(filterNames(name)),
  sortAscDes: (key) => dispatch(filterAscDes(key)),
  sortPlanets: (column, order, data) => dispatch(orderPlanets(column, order, data)),
});

const mapStateToProps = ({
  reducerData: { data, wasFetched },
  reducerName: { filters: names },
  reducerNumbers: { filters },
}) => ({
  data, wasFetched, names, filters,
});

Table.propTypes = {
  createPlanets: PropTypes.func.isRequired,
  filterPlanets: PropTypes.func.isRequired,
  sortPlanets: PropTypes.func.isRequired,
  sortAscDes: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array),
  wasFetched: PropTypes.bool.isRequired,
  names: PropTypes.instanceOf(Array),
  filters: PropTypes.instanceOf(Array),
};

Table.defaultProps = {
  data: [],
  filters: [],
  names: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
