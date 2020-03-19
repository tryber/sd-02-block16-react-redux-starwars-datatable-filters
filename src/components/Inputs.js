import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchFilter } from '../actions/searchFilter';

class Inputs extends Component {
  render() {
    const { value, searchFilterDispatch } = this.props;
    return (
      <div>
        <div>
          Digite a palavra:
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

Inputs.propTypes = {
  searchFilterDispatch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);
