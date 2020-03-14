import React, { Component } from 'react';
import { connect } from 'react-redux';
import changeNameFilter from '../actions/changeNameFilter';

class NameFilter extends Component {
  constructor(props) {
    super(props);
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(NameFilter);
