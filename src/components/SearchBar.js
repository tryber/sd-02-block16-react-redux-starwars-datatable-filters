import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchByName } from '../actions';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    const { searchPlanetsByName } = this.props;
    let { results } = this.props;
    const text = event.target.value.toLowerCase();
    searchPlanetsByName(text, results);
    results = searchPlanetsByName(text, results).results;
  }

  render() {
    return (
      <input onChange={this.onChangeHandler} />
    );
  }
}

const mapStateToProps = (
  {
    data: { results, isFetching },
    SearchFilters: { filteredResults },
  },
) => ({
  results,
  filteredResults,
  isFetching,
});

SearchBar.propTypes = {
  results: PropTypes.instanceOf(Array),
  searchPlanetsByName: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  results: [],
};

const mapDispatchToProps = (dispatch) => ({
  searchPlanetsByName: (text, results) => dispatch(searchByName(text, results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
