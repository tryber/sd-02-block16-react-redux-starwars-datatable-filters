import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { eraseNumberFilter, eraseSortedFilter } from '../actions';
import '../styles/ReturnFilters.css';

class ReturnFilters extends React.Component {
  render() {
    const {
      numericValues,
      eraseFilter,
      sorted,
      eraseSorted,
    } = this.props;
    return (
      <div className="Return_Filters-father">
        {numericValues.map((filter) => (
          <div
            className="Return_Filters-data"
            key={`show filter ${filter.column}`}
          >
            <p className="Return_Filter-text">{`${filter.column} | ${filter.comparison} | ${filter.value}`}</p>

            <button
              className="Return_Filter-button"
              type="button"
              onClick={() => eraseFilter(filter, numericValues)}
            >
              X
            </button>
          </div>
        ))}
        {sorted.column
          ? (
            <div className="Return_Filters-sort">
              <p className="Return_Filter-text">{`${sorted.column} | ${sorted.order}`}</p>
              <button
                className="Return_Filter-button"
                type="button"
                onClick={() => eraseSorted()}
              >
                X
              </button>
            </div>
          ) : <p>No Sorted</p>}
      </div>
    );
  }
}

const mapStateToProps = ({
  allReducer: {
    numericValues,
    sorted,
  },
}) => ({
  numericValues,
  sorted,
});

const mapDispatchToProps = (dispatch) => ({
  eraseFilter: (filter, numericValues) => (
    dispatch(eraseNumberFilter(filter, numericValues))
  ),
  eraseSorted: (sorted) => (
    dispatch(eraseSortedFilter(sorted))
  ),
});

ReturnFilters.propTypes = {
  numericValues: propTypes.arrayOf(propTypes.object),
  eraseFilter: propTypes.func.isRequired,
  eraseSorted: propTypes.func.isRequired,
  sorted: propTypes.objectOf(propTypes.string).isRequired,
};

ReturnFilters.defaultProps = {
  numericValues: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnFilters);
