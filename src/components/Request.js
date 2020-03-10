import React, { Component } from 'react';
import { connect } from 'react-redux';

import { REQUEST_PLANETS, RECEIVE_PLANETS, store } from '../store';

const requestPlanets = () => ({
  type: REQUEST_PLANETS,
});

const receivePlanets = (planets) => ({
  type: RECEIVE_PLANETS,
  planets,
});

function fetchPlanets() {
  return (dispatch) => {
    dispatch(requestPlanets());

    return fetch('https://swapi.co/api/planets')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        console.log(store);
        dispatch(receivePlanets(data.results));

      });
  }
}

class Request extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('montou');
    const { dispatch } = this.props;
    dispatch(fetchPlanets());

  }

  render() {
    console.log(store);
    return <div></div>;
  }
}

export default connect(null)(Request);
