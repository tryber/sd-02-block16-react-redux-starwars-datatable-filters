import React, { Component } from 'react';
import { connect } from 'react-redux';
import getPlanets from '../services/starwarsAPI';

class Table extends Component {
  componentDidMount() {
    getPlanets()
      .then((data) => console.log(data));
  }

  render() {
    return (
      <div>StarWars Datatable with Filters</div>
    );
  }
}

export default connect()(Table);
