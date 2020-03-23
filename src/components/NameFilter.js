import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import changeNameFilter from '../actions/changeNameFilter';

class NameFilter extends Component {
  render() {
    const { valueInput, handleChange } = this.props;
    return (
      <div className="filter">
        <input
          placeholder="Search by name"
          value={valueInput}
          onChange={handleChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  valueInput: state.filters[0].name,
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: (event) => {
    dispatch(changeNameFilter(event));
  },
});

NameFilter.propTypes = {
  valueInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NameFilter);
