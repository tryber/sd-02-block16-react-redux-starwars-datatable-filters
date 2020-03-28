import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  filtersPropTypes, filtersDefault,
} from './PropTypes';

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
      type,
      id,
    } = this.props;
    return (
      <button
        type="button"
        name={name}
        onClick={(e) => handle(e, id, filters, type)}
      >
        {name}
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
  filters: filtersPropTypes.filters,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Button.defaultProps = {
  filters: filtersDefault,
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
