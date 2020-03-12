import React, { Component } from 'react';
import { connect } from 'react-redux';

const changeFilterByName = (event) => {
  const { value } = event.target;
  return {
    type: 'CHANGE_FILTER_BY_NAME',
    value: value,
  };
}

class FilterName extends Component {
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
  handleChange: function (event) {
    dispatch(changeFilterByName(event));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterName);
