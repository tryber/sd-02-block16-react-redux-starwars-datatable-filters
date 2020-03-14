import React, { Component } from 'react';
import { connect } from 'react-redux';

import { REQUEST_PLANETS, RECEIVE_PLANETS } from '../reducers/dataReducer';

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
        console.log('retorno do fetch ta aqui:', data.results);
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
    return <div></div>;
  }
}

export default connect(null)(Request);
