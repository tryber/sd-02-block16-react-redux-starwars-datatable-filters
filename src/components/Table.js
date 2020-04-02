import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import getPlanets from '../services/starwarsAPI';
import addPlanets from '../store/actions/addPlanets';
import filterNames from '../store/actions/filterName';


class Table extends Component {
  componentDidMount() {
    const { createPlanets } = this.props;
    getPlanets()
      .then(({ results }) => createPlanets(results));
  }

  render() {
    const {
      data, wasFetched, filterPlanets, names, filters,
    } = this.props;
    const { column, comparison, value } = filters[0].numericValues;
    let filteredData = data.filter(({ name }) => name.match(new RegExp(names[0].name, 'i')));
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

    return (
      <div>
        <h1>StarWars Datatable with Filters:</h1>
        <input type="text" onChange={(e) => filterPlanets(e.target.value)} />
        <Dropdown />
        <table border="1px">
          <thead>
            <tr>
              {wasFetched && Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {wasFetched && filteredData.map((planet) => (
              <tr key={planet.name}>
                {Object.values(planet).map((planetValue) => <td key={planetValue}>{planetValue}</td>)}
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
