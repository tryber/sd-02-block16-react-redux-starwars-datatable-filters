import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as types from '../store/actionTypes';
import { resultAPI } from '../store/actions';


class Table extends Component {

  componentDidMount() {
    const { coxinha } = this.props
    coxinha();
  }

  render() {
    console.log(this.props.state.reducer.data.results)
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

const mapDispatchToProps = (dispatch) => ({
  coxinha: () => dispatch(resultAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
