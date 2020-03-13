import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resultAPI from '../store/actions';


class Table extends Component {

  componentDidMount() {
    const { coxinha } = this.props;
    coxinha();
  }

  render() {
    // console.log(this.props.state.reducer.data.results);
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

Table.propTypes = {
  coxinha: PropTypes.func.isRequired,
};
