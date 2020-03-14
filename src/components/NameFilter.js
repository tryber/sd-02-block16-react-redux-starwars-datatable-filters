import React, { Component } from 'react';
import { connect } from 'react-redux';
import changeNameFilter from '../actions/changeNameFilter';
import PropTypes from 'prop-types';

class NameFilter extends Component {
  render() {
    const { valueInput, handleChange } = this.props;
    return (
      <div>
        <input
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
  }
});

NameFilter.propTypes = {
  valueInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(NameFilter);
