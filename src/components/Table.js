import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlanets } from '../actions';
import './Table.css';

class Table extends Component {
  componentDidMount() {
    const { callFetchPlanets } = this.props;
    callFetchPlanets();
  }

  tableHead() {
    const { data } = this.props;
    return (
      <thead>
        <tr>
          {
            Object.keys(data[0] || []).map((header) => ((header !== 'residents')
              ? <th className="tableHeader" key={header}>{header}</th>
              : null))
          }
        </tr>
      </thead>
    );
  }

  tableData() {
    const { filteredData, name } = this.props;
    const planets = [...filteredData];
    const filterPlanet = planets.filter(
      (planet) => planet.name.toLowerCase().includes(name.toLowerCase()),
    );
    return (
      filterPlanet.map((info) => (
        <tbody key={info.name}>
          <tr>
            {Object.values(info).map((body, idx) => {
              if (idx !== 9) {
                return (
                  <td className="tableData" key={body}>{body}</td>
                );
              }
              return null;
            })}
          </tr>
        </tbody>
      )));
  }

  render() {
    const { isFetching } = this.props;
    if (isFetching) return <div><h1 className="title">Loading...</h1></div>;
    return (
      <div>
        <h1 className="title">StarWars Datatable with Filters</h1>
        <table className="containerTable">
          {this.tableHead()}
          {this.tableData()}
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({
  reducerPlanets: { data, filteredData, isFetching },
  allFilters: { filters: [{ name }] },
}) => ({ data, filteredData, isFetching, name });

const mapDispatchToProps = (dispatch) => ({
  callFetchPlanets: () => dispatch(fetchPlanets()),
});

Table.propTypes = {
  callFetchPlanets: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Array),
  filteredData: PropTypes.instanceOf(Array),
};

Table.defaultProps = {
  data: [],
  filteredData: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
