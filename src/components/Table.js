import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as types from '../store/actionTypes';
import { resultAPI } from '../store/actions';


class Table extends Component {

  componentDidMount() {
    resultAPI();
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <p>A esquerda </p>
        <input />
        <div>StarWars Datatable with Filters</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(Table);
