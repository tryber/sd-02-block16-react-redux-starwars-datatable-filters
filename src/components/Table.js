import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
      data, wasFetched, filterPlanets, filters,
    } = this.props;
    console.log(filters);
    return (
      <div>
        <h1>StarWars Datatable with Filters:</h1>
        <input type="text" onChange={(e) => filterPlanets(e.target.value)} />
        <table border="1px">
          <tr>
            {wasFetched && Object.keys(data[0]).map((key, index) => <th key={index}>{key}</th>)}
          </tr>
          {wasFetched && data.map((planet, index) => (
            <tr key={index}>
              {Object.values(planet).map((value) => <td key={value}>{value}</td>)}
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createPlanets: (results) => dispatch(addPlanets(results)),
  filterPlanets: (name) => dispatch(filterNames(name)),
});

const mapStateToProps = ({ reducerStar: { data, wasFetched }, reducerFilter: { filters } }) => ({
  data, wasFetched, filters,
});

Table.propTypes = {
  createPlanets: PropTypes.func.isRequired,
  filterPlanets: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array),
  wasFetched: PropTypes.bool.isRequired,
  filters: PropTypes.instanceOf(Array),
};

Table.defaultProps = {
  data: [],
  filters: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
