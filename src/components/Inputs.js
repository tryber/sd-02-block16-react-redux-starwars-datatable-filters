import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchFilter } from '../actions/searchFilter';

class Inputs extends Component {
  render() {
    const { value, searchFilterDispatch } = this.props;
    return (
      <div>
        <div>
          Digite o filtro:
          <input
            placeholder="Procurar planeta"
            onChange={(e) => searchFilterDispatch(e.target.value)}
            value={value}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ value }) => ({ value });

const mapDispatchToProps = (dispatch) => ({
  searchFilterDispatch: (e) => dispatch(searchFilter(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);
