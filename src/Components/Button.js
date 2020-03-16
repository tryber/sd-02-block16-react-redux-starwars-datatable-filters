import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function handleClick(e, id, filters) {
  const coisa = filters;
  coisa[id].numericValues.name = e.target.name;
  return {
    type: 'FilterByName',
    filters: coisa,
  };
}

class Button extends Component {
  render() {
    const {
      filters,
      handle,
      btn,
      id,
    } = this.props;
    const { name } = filters[id].numericValues;
    return (
      <button
        type="button"
        name={name}
        onClick={(e) => handle(e, id, filters)}
      >
        {btn}
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filter.filters,
});

const mapDispatchToProps = (dispatch) => ({
  handle: (e, id, filters) => dispatch(handleClick(e, id, filters)),
});

Button.propTypes = {
  handle: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      numericValues: PropTypes.shape({
        name: PropTypes.string,
        condition: PropTypes.string,
        input: PropTypes.number,
      }).isRequired,
    }).isRequired,
  ),
  id: PropTypes.number.isRequired,
  btn: PropTypes.string.isRequired,
};

Button.defaultProps = {
  filters: [
    {
      numericValues: {
        name: '',
        condition: '',
        input: undefined,
      },
    },
  ],
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
