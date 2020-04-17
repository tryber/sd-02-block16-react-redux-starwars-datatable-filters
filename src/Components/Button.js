import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  filtersPropTypes, filtersDefault,
} from './PropTypes';


function filtersAction(filters, type) {
  return {
    type,
    filters,
  };
}

function tagAction(tags, tag, filters, id) {
  const { numericValues: { name } } = filters[id];
  const coisas = tags;
  coisas.splice(coisas.indexOf(tag), 1);
  coisas.push(name);
  return {
    type: 'filterByName',
    tags: coisas,
  };
}

class Button extends Component {
  handleClick(e, id, filters, type) {
    const { name: tag } = e.target;
    const { tags } = this.props;
    this.filterSwitch(tag, id, filters, type, tags);
  }

  filterSwitch(tag, id, filters, type, tags) {
    switch (type) {
      case 'FilterByName':
        this.filterByName(tag, id, filters, type, tags);
        break;
      case 'FilterByCondition':
        this.filterByCondition(tag, id, filters, type);
        break;
      default:
        break;
    }
  }

  filterByName(tag, id, filters, type, tags) {
    const { dispatch } = this.props;
    dispatch(tagAction(tags, tag, filters, id));
    const filters2 = filters;
    filters2[id].numericValues.name = tag;
    dispatch(filtersAction(filters2, type));
  }

  filterByCondition(tag, id, filters, type) {
    const { dispatch } = this.props;
    const filters2 = filters;
    filters2[id].numericValues.condition = tag;
    dispatch(filtersAction(filters2, type));
  }

  render() {
    const {
      filters,
      name,
      type,
      id,
    } = this.props;
    return (
      <button
        type="button"
        name={name}
        onClick={(e) => this.handleClick(e, id, filters, type)}
      >
        {name}
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filter.filters,
  tags: state.filterByName.tags,
});


Button.propTypes = {
  filters: filtersPropTypes.filters,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Button.defaultProps = {
  filters: filtersDefault,
};

export default connect(mapStateToProps)(Button);
