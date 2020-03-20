import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterByName } from '../actions/filterPlanets';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    const { value } = event.target;
    const { filterPlanetsByName, data, filters } = this.props;

    filterPlanetsByName(value, data, filters);
  }

  render() {
    return (
      <div className="group">
        <input onChange={this.onChangeHandler} id="search-bar" required />
        <span className="highlight" />
        <span className="bar" />
        <label htmlFor="search-bar">Search by planet name</label>
      </div>
    );
  }
}

SearchBar.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  filterPlanetsByName: PropTypes.func.isRequired,
  filters: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = ({ planetsData: { data }, planetsFilters: { filteredData, filters } }) => ({
  data,
  filteredData,
  filters,
});

const mapDispatchToProps = (dispatch) => ({
  filterPlanetsByName: (name, data, filters) => dispatch(filterByName(name, data, filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
