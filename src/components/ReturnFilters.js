import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ReturnFilters.css';
import { connect } from 'react-redux';
import { removeFilter } from '../actions';

const orderComp = (filter, toRemove, filtersToShow) => (
  <div
    key={`numeric values ${filter.column}`}
    className="Return_Filters-data"
  >
    <p className="Return_Filter-text">
      {filter.column}
      <span className="Return_Filter-text">|</span>
    </p>
    <p className="Return_Filter-text">
      {filter.order}
    </p>
    <button
      className="Return_Filter-button"
      type="button"
      onClick={() => toRemove(filter.column, filter, filtersToShow)}
    >
      X
    </button>
  </div>
);

const numericComp = (filter, toRemove, filtersToShow) => (
  <div
    key={`numeric values ${filter.numericValues.column}`}
    className="Return_Filters-data"
  >
    <p className="Return_Filter-text">
      {filter.numericValues.column}
      <span className="Return_Filter-text">|</span>
    </p>
    <p className="Return_Filter-text">
      {filter.numericValues.comparison}
      <span className="Return_Filter-text">|</span>
    </p>
    <p className="Return_Filter-text">
      {filter.numericValues.value}
    </p>
    <button
      className="Return_Filter-button"
      type="button"
      onClick={() => toRemove(filter.numericValues.column, filter, filtersToShow)}
    >
      X
    </button>
  </div>
);

class ReturnFilters extends React.Component {
  render() {
    const { filtersToShow, toRemove } = this.props;
    return (
      <div className="Return_Filters-father">
        {
          filtersToShow.map((filter) => {
            const isOrdered = Object.prototype.hasOwnProperty.call(filter, 'order');
            if (isOrdered) {
              return orderComp(filter, toRemove, filtersToShow);
            }
            return numericComp(filter, toRemove, filtersToShow);
          })
        }
      </div>
    );
  }
}

const mapStateToProps = ({
  allReducer: {
    filtersToShow,
  },
}) => ({
  filtersToShow,
});

const mapDispatchToProps = (dispatch) => ({
  toRemove: (column, filter, allFilters) => (
    dispatch(removeFilter(column, filter, allFilters))
  ),
});

ReturnFilters.propTypes = {
  filtersToShow: PropTypes.arrayOf(PropTypes.object),
  toRemove: PropTypes.func.isRequired,
};

ReturnFilters.defaultProps = {
  filtersToShow: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnFilters);
