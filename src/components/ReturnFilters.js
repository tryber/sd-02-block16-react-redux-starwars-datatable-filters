import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { eraseNumberFilter } from '../actions';
import '../styles/ReturnFilters.css';

class ReturnFilters extends React.Component {
  render() {
    const { numericValues, eraseFilter } = this.props;
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
      </div>
    );
  }
}

const mapStateToProps = ({
  allReducer: {
    numericValues,
  },
}) => ({
  numericValues,
});

const mapDispatchToProps = (dispatch) => ({
  eraseFilter: (filter, numericValues) => (
    dispatch(eraseNumberFilter(filter, numericValues))
  ),
});

ReturnFilters.propTypes = {
  numericValues: propTypes.arrayOf(propTypes.object),
  eraseFilter: propTypes.func.isRequired,
};

ReturnFilters.defaultProps = {
  numericValues: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnFilters);
