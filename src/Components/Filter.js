import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  filtersPropTypes, filtersDefault,
} from './PropTypes';
import FilterByName from './FilterByName';
import FilterByCondition from './FilterByCondition';
import InputNumber from './InputNumber';

function actionTags(tags) {
  return {
    type: 'filterByName',
    tags,
  };
}

function actionDelete(filters) {
  return {
    type: 'delete',
    filters,
  };
}

class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    const { dispatch, filters, tags } = this.props;
    const coisa = filters;
    tags.push(coisa[id].numericValues.name);
    if (tags.length > 0) {
      dispatch(actionTags(tags));
    }
    coisa.splice(id, 1);
    dispatch(actionDelete(coisa));
  }

  render() {
    const { id } = this.props;
    return (
      <div className="comp_filter_cont" name={id}>
        <button type="button" onClick={() => this.handleClick(id)}>
          <i className="material-icons">
            close
          </i>
        </button>
        <FilterByName id={id} />
        <FilterByCondition id={id} />
        <InputNumber id={id} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filter.filters,
  tags: state.filterByName.tags,
});

Filter.propTypes = {
  filters: filtersPropTypes.filters,
  id: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,  
};

Filter.defaultProps = {
  filters: filtersDefault,
};

export default connect(mapStateToProps)(Filter);
