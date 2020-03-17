import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function handleClick(e, id, filters, type) {
  const coisa = filters;
  switch (type) {
    case 'FilterByName':
      coisa[id].numericValues.name = e.target.name;
      break;
    case 'FilterByCondition':
      coisa[id].numericValues.condition = e.target.name;
      break;
    default:
      break;
  }
  return {
    type,
    filters: coisa,
  };
}

class Button extends Component {
  render() {
    const {
      filters,
      handle,
      name,
      btn,
      type,
      id,
    } = this.props;
    return (
      <button
        type="button"
        name={name}
        onClick={(e) => handle(e, id, filters, type)}
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
  handle: (e, id, filters, type) => dispatch(handleClick(e, id, filters, type)),
});

Button.propTypes = {
  handle: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      numericValues: PropTypes.shape({
        name: PropTypes.string,
        condition: PropTypes.string,
        input: PropTypes.string,
      }).isRequired,
    }).isRequired,
  ),
  id: PropTypes.number.isRequired,
  btn: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
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
