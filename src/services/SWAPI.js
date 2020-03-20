import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SWAPI extends Component {
  componentDidMount() {
    this.fetchPlanets();
  }

  fetchPlanets() {
    const { dispatch } = this.props;
    const LOADING = 'LOADING';
    const FETCH_PLANETS = 'FETCH_PLANETS';
    const URL = 'https://cors-anywhere.herokuapp.com/https://swapi.co/api/planets/';

    const requestPlanets = () => ({ type: LOADING });
    const receiveMovies = (planets) => ({ type: FETCH_PLANETS, planets });
    dispatch(requestPlanets());

    return fetch(URL)
      .then((response) => response.json())
      .then(({ results }) => {
        dispatch(receiveMovies(results.flat()));
        localStorage.setItem('planets', JSON.stringify(results.flat()));
      });
  }

  render() {
    return null;
  }
}

export default connect()(SWAPI);

SWAPI.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
