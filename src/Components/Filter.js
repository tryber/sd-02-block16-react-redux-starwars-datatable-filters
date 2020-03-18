import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  filtersPropTypes, filtersDefault,
} from './PropTypes';
import FilterByName from './FilterByName';
import FilterByCondition from './FilterByCondition';
import InputNumber from './InputNumber';


function handleClick(e, id, filters) {
  const coisa = filters;
  coisa.splice(id, 1);
  return {
    type: 'delete',
    filters: coisa,
  };
}

class Filter extends Component {
  render() {
    const { id, handle, filters } = this.props;
    return (
      <div className="comp_filter_cont" name={id}>
        <button type="button" onClick={(e) => handle(e, id, filters)}>
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
});

const mapDispatchToProps = (dispatch) => ({
  handle: (e, id, filters) => dispatch(handleClick(e, id, filters)),
});

Filter.propTypes = {
  handle: PropTypes.func.isRequired,
  filters: filtersPropTypes.filters,
  id: PropTypes.number.isRequired,
};

Filter.defaultProps = {
  filters: filtersDefault,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
