import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchByName } from '../actions';
import './SearchBar.css';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    const { searchPlanetsByName } = this.props;
    let { results, filteredByNumber } = this.props;
    const text = event.target.value.toLowerCase();
    if (filteredByNumber.length) {
      filteredByNumber = searchPlanetsByName(text, filteredByNumber).results;
      return true;
    }
    searchPlanetsByName(text, results);
    results = searchPlanetsByName(text, results).results;
    return true;
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

const mapStateToProps = (
  {
    data: { results },
    SearchFilters: { filteredByNumber },
  },
) => ({
  results,
  filteredByNumber,
});

SearchBar.propTypes = {
  results: PropTypes.instanceOf(Array),
  filteredByNumber: PropTypes.instanceOf(Array),
  searchPlanetsByName: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  results: [],
  filteredByNumber: [],
};

const mapDispatchToProps = (dispatch) => ({
  searchPlanetsByName: (text, results) => dispatch(searchByName(text, results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
